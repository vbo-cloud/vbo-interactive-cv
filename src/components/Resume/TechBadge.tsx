import { getTechColor, getTechTier, type TechTier } from '@/data/tech-registry'

interface TechBadgeProps {
  tech: string
  /** Override color. If not provided, resolved from tech-registry. An override forces the 'brand' tier. */
  color?: string
}

/**
 * Returns relative luminance of a hex color (0 = black, 1 = white).
 * Based on WCAG 2.0 formula: https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
function getLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

/**
 * Lighten a hex color by mixing it with white.
 * amount: 0 = no change, 1 = fully white
 */
function lightenColor(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  const lr = Math.round(r + (255 - r) * amount)
  const lg = Math.round(g + (255 - g) * amount)
  const lb = Math.round(b + (255 - b) * amount)

  return `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb.toString(16).padStart(2, '0')}`
}

/**
 * Darken a hex color by mixing it with black.
 * amount: 0 = no change, 1 = fully black
 */
function darkenColor(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  const dr = Math.round(r * (1 - amount))
  const dg = Math.round(g * (1 - amount))
  const db = Math.round(b * (1 - amount))

  return `#${dr.toString(16).padStart(2, '0')}${dg.toString(16).padStart(2, '0')}${db.toString(16).padStart(2, '0')}`
}

/**
 * Linearly interpolates between two hex colors.
 * t: 0 = fully `a`, 1 = fully `b`
 */
function mixColors(a: string, b: string, t: number): string {
  const ar = parseInt(a.slice(1, 3), 16)
  const ag = parseInt(a.slice(3, 5), 16)
  const ab = parseInt(a.slice(5, 7), 16)
  const br = parseInt(b.slice(1, 3), 16)
  const bg = parseInt(b.slice(3, 5), 16)
  const bb = parseInt(b.slice(5, 7), 16)

  const mr = Math.round(ar + (br - ar) * t)
  const mg = Math.round(ag + (bg - ag) * t)
  const mb = Math.round(ab + (bb - ab) * t)

  return `#${mr.toString(16).padStart(2, '0')}${mg.toString(16).padStart(2, '0')}${mb.toString(16).padStart(2, '0')}`
}

/**
 * Ensures a color has enough luminance to be readable on dark backgrounds.
 * Progressively lightens dark colors until they reach an acceptable level.
 */
function ensureDarkModeReadable(hex: string): string {
  let color = hex
  let luminance = getLuminance(color)

  // Target: luminance > 0.25 ensures good readability on dark backgrounds
  let step = 0
  while (luminance < 0.25 && step < 10) {
    color = lightenColor(color, 0.2)
    luminance = getLuminance(color)
    step++
  }

  return color
}

/**
 * Ensures a color has low enough luminance to stay ≥4.5:1 against the pale, mostly-white
 * badge backgrounds used in light mode. Progressively darkens light/saturated colors
 * until they clear the target — the light-mode mirror of `ensureDarkModeReadable`.
 */
function ensureLightModeReadable(hex: string): string {
  let color = hex
  let luminance = getLuminance(color)

  // Target chosen empirically: guarantees ≥4.5:1 against every brand-tint background
  // this file produces (composited over the #fafaf9 page background).
  let step = 0
  while (luminance > 0.14 && step < 10) {
    color = darkenColor(color, 0.2)
    luminance = getLuminance(color)
    step++
  }

  return color
}

/**
 * Flat, theme-inverted colors for the `workflow` tier — not brand colors, shared by every
 * VCS/CI tool. Dark gray badge on light theme, flipped to a light badge on dark theme.
 */
const WORKFLOW_DARK_GRAY = '#374151'
const WORKFLOW_LIGHT_GRAY = '#e5e7eb'
/** Slate the `support` tier's brand hue is mixed toward, per theme. */
const SUPPORT_SLATE_DARK = '#94a3b8'
const SUPPORT_SLATE_LIGHT = '#64748b'
/** Flat text/background for the `muted` tier, per theme. */
const MUTED_TEXT_DARK = '#7d838c'
// Darkened from the spec's #6b7280 (4.38:1 on its own translucent bg) to clear WCAG AA (4.5:1).
const MUTED_TEXT_LIGHT = '#4b5563'
const MUTED_BG_DARK = 'rgba(255, 255, 255, 0.045)'
const MUTED_BG_LIGHT = 'rgba(0, 0, 0, 0.045)'

interface TierStyle {
  bg: string
  fg: string
  border: string
}

/**
 * Pure per-tier, per-theme style resolver. `color` is the tech's resolved brand color
 * (only meaningful for the `brand` and `support` tiers — `workflow` and `muted` ignore it).
 */
function resolveTierStyle(tier: TechTier, color: string, mode: 'light' | 'dark'): TierStyle {
  switch (tier) {
    case 'brand': {
      if (mode === 'dark') {
        const fg = ensureDarkModeReadable(color)
        return { bg: `${fg}20`, fg, border: `${fg}59` }
      }
      return { bg: `${color}20`, fg: ensureLightModeReadable(color), border: `${color}59` }
    }
    case 'workflow': {
      // Inverted between themes: dark-gray badge on light theme, light-gray badge on dark theme.
      return mode === 'dark'
        ? { bg: WORKFLOW_LIGHT_GRAY, fg: WORKFLOW_DARK_GRAY, border: 'rgba(0, 0, 0, 0.3)' }
        : { bg: WORKFLOW_DARK_GRAY, fg: WORKFLOW_LIGHT_GRAY, border: 'rgba(255, 255, 255, 0.3)' }
    }
    case 'support': {
      const fg =
        mode === 'dark'
          ? mixColors(ensureDarkModeReadable(color), SUPPORT_SLATE_DARK, 0.7)
          : ensureLightModeReadable(mixColors(color, SUPPORT_SLATE_LIGHT, 0.7))
      return { bg: `${fg}1f`, fg, border: 'transparent' }
    }
    case 'muted':
    default:
      return mode === 'dark'
        ? { bg: MUTED_BG_DARK, fg: MUTED_TEXT_DARK, border: 'transparent' }
        : { bg: MUTED_BG_LIGHT, fg: MUTED_TEXT_LIGHT, border: 'transparent' }
  }
}

export function TechBadge({ tech, color: colorOverride }: TechBadgeProps) {
  const tier: TechTier = colorOverride ? 'brand' : getTechTier(tech)
  const color = colorOverride ?? getTechColor(tech)
  const light = resolveTierStyle(tier, color, 'light')
  const dark = resolveTierStyle(tier, color, 'dark')

  return (
    <>
      {/* Light mode */}
      <span
        className="px-2 py-1 rounded text-xs font-medium border dark:hidden"
        style={{
          backgroundColor: light.bg,
          color: light.fg,
          borderColor: light.border,
        }}
      >
        {tech}
      </span>
      {/* Dark mode */}
      <span
        className="px-2 py-1 rounded text-xs font-medium border hidden dark:inline"
        style={{
          backgroundColor: dark.bg,
          color: dark.fg,
          borderColor: dark.border,
        }}
      >
        {tech}
      </span>
    </>
  )
}
