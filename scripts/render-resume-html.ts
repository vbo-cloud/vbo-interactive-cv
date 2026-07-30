import fs from 'fs'
import path from 'path'
import type { ResumeConfig } from '../src/data/types'
import { presets } from '../src/data/presets'
import { getTechColor, getTechTier } from '../src/data/tech-registry'

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function resolveThemeColors(config: ResumeConfig) {
  const preset = presets[config.theme?.preset ?? 'minimal']
  return { ...preset, ...config.theme?.colors }
}

/** Inlines public/images/FullImage.png as a data URI so the PDF is self-contained (no network fetch at print time). */
/**
 * Inline SVG twins of the sidebar icons in src/components/icons/index.tsx. Kept as raw
 * markup rather than imported, since those are JSX components this script cannot render.
 * Attributes are kebab-case here: this is real SVG, not JSX.
 */
const INLINE_ICONS: Record<string, string> = {
  linkedin:
    '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>',
  website:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>',
}

/**
 * Renders an icon slot. The slot is emitted even when no icon matches, so every line in
 * a list starts its text at the same x whether or not it carries one.
 */
function iconSlot(name: string | null, color: string): string {
  const svg = name ? INLINE_ICONS[name] : undefined
  return `<span style="display: inline-block; width: 14px; height: 14px; margin-right: 0.5rem; vertical-align: -2px; color: ${color};">${svg ?? ''}</span>`
}

/**
 * The PDF is printed from `page.setContent()` with no base URL, so relative image
 * paths never resolve — every image has to be inlined as a data URI.
 */
function getImageDataUri(fileName: string): string | null {
  try {
    const imgPath = path.resolve(process.cwd(), 'public', 'images', fileName)
    const buffer = fs.readFileSync(imgPath)
    return `data:image/png;base64,${buffer.toString('base64')}`
  } catch {
    return null
  }
}

/**
 * The web timeline lists experiences top (most recent) to bottom (oldest), so each
 * period reads "recent - older" (e.g. "Present - 09/2025") to match that flow. The PDF
 * is a flat, linear document without that visual cue, so the same string reads
 * backwards there — flip it to "older - recent" for PDF-only rendering.
 */
function reverseDateRange(period: string): string {
  const parts = period.split(' - ')
  return parts.length === 2 ? `${parts[1]} - ${parts[0]}` : period
}

/**
 * Relative luminance (WCAG 2.0), mirrors src/components/Resume/TechBadge.tsx.
 * Duplicated locally: this script runs under `tsx` without the `@/` alias, and only
 * needs the light-mode branch (the PDF/noscript body is always rendered on white).
 */
function getLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

function mixColors(a: string, b: string, t: number): string {
  const channel = (hex: string, i: number) => parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16)
  const mixed = [0, 1, 2].map((i) => Math.round(channel(a, i) + (channel(b, i) - channel(a, i)) * t))
  return `#${mixed.map((c) => c.toString(16).padStart(2, '0')).join('')}`
}

function darkenColor(hex: string, amount: number): string {
  const channel = (i: number) => parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16)
  const darkened = [0, 1, 2].map((i) => Math.round(channel(i) * (1 - amount)))
  return `#${darkened.map((c) => c.toString(16).padStart(2, '0')).join('')}`
}

/** Mirrors TechBadge.tsx's `ensureLightModeReadable` — same 0.14 target, same reasoning. */
function ensureLightModeReadable(hex: string): string {
  let color = hex
  let luminance = getLuminance(color)
  let step = 0
  while (luminance > 0.14 && step < 10) {
    color = darkenColor(color, 0.2)
    luminance = getLuminance(color)
    step++
  }
  return color
}

const WORKFLOW_DARK_GRAY = '#374151' // TechBadge.tsx's light-theme `workflow` badge — dark gray, not black

/** Light-mode-only counterpart to TechBadge.tsx's `resolveTierStyle` (the PDF/noscript body has no dark mode). */
function renderTechBadges(techs: string[]): string {
  if (techs.length === 0) return ''
  const badges = techs
    .map((tech) => {
      const tier = getTechTier(tech)
      const color = getTechColor(tech)
      let background: string
      let fg: string
      let border: string

      if (tier === 'workflow') {
        background = WORKFLOW_DARK_GRAY
        fg = '#e5e7eb'
        border = 'rgba(255, 255, 255, 0.3)'
      } else if (tier === 'support') {
        fg = ensureLightModeReadable(mixColors(color, '#64748b', 0.7))
        background = `${fg}1f`
        border = 'transparent'
      } else if (tier === 'muted') {
        fg = '#4b5563' // darkened from the spec's #6b7280 to clear WCAG AA (4.5:1)
        background = 'rgba(0, 0, 0, 0.045)'
        border = 'transparent'
      } else {
        fg = ensureLightModeReadable(color)
        background = `${color}20`
        border = `${color}59`
      }

      return `<span style="display: inline-block; margin: 0 0.35rem 0.35rem 0; padding: 0.15rem 0.55rem; border-radius: 4px; font-size: 0.8rem; font-weight: 500; background: ${background}; color: ${fg}; border: 1px solid ${border};">${escapeHtml(tech)}</span>`
    })
    .join('')
  return `<div style="margin: 0.35rem 0;">${badges}</div>`
}

/**
 * Renders the full resume as a flat, semantic HTML fragment for a given language —
 * a single reading column (deliberately no sidebar/multi-column layout, which can
 * scramble text order for ATS parsers), lightly themed with the site's colors.
 * Used both as the <noscript> SEO/ATS fallback and as the source for PDF generation
 * (scripts/generate-pdfs.ts).
 */
export function renderResumeHtml(
  config: ResumeConfig,
  lang: string,
  base: string,
  pdfPath: string | null = null,
  siteUrl: string | null = null,
): string {
  const resolve = (ls: Record<string, string>) => ls[lang] ?? Object.values(ls)[0] ?? ''
  const colors = resolveThemeColors(config)
  // siteUrl is only ever passed when generating the downloadable PDF, never for the <noscript> fallback.
  const isPdf = Boolean(siteUrl)
  const sectionTitle = (label: string) =>
    `<h2 style="font-size: 1.1rem; text-transform: uppercase; color: ${colors.text}; border-bottom: 2px solid ${colors.primary}40; padding-bottom: 0.25rem; margin-bottom: 0.5rem;">${escapeHtml(label)}</h2>`

  const { personal, contact, skills, experiences, education, projects, values, hobbies, referents } = config
  const lines: string[] = []

  const indent = '      '
  lines.push(`${indent}<div style="max-width: 800px; margin: 2rem auto; padding: 2rem; font-family: system-ui, -apple-system, sans-serif; color: ${colors.text}; line-height: 1.6;">`)

  // Hero banner — only on the generated PDF (siteUrl is only passed there, never for the <noscript> fallback),
  // so a recruiter opening the file immediately sees and can click through to the interactive version.
  if (siteUrl) {
    const previewDataUri = getImageDataUri('FullImage.png')
    const qrCodeDataUri = getImageDataUri('qr-code.png')
    const ctaLabel = resolve(config.labels.actions.viewInteractive ?? { en: 'View the interactive resume', fr: 'Voir le CV interactif' })
    const heroHeadline = lang === 'fr'
      ? 'Ce CV existe aussi en version interactive'
      : 'This resume also exists as an interactive version'

    lines.push(`${indent}  <a href="${escapeHtml(siteUrl)}" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; padding: 1.25rem; border-radius: 14px; background: ${colors.primary}12; border: 1px solid ${colors.primary}40; text-decoration: none;">`)
    if (previewDataUri) {
      lines.push(`${indent}    <img src="${previewDataUri}" alt="${escapeHtml(personal.name)} - ${escapeHtml(heroHeadline)}" style="width: 130px; height: auto; border-radius: 8px; box-shadow: 0 6px 16px rgba(0,0,0,0.3); flex-shrink: 0;" />`)
    }
    lines.push(`${indent}    <span style="display: flex; flex-direction: column; align-items: flex-start; align-self: flex-start; gap: 0.6rem;">`)
    lines.push(`${indent}      <span style="font-size: 1rem; font-weight: 700; color: ${colors.text}; white-space: nowrap;">✨ ${escapeHtml(heroHeadline)}</span>`)
    lines.push(`${indent}      <span style="display: inline-block; padding: 0.65rem 1.4rem; border-radius: 8px; background: ${colors.primary}; color: #ffffff; font-weight: 600; font-size: 0.95rem;">${escapeHtml(ctaLabel)} →</span>`)
    lines.push(`${indent}      <span style="font-size: 0.8rem; color: ${colors.textSecondary};">${escapeHtml(siteUrl)}</span>`)
    lines.push(`${indent}    </span>`)
    if (qrCodeDataUri) {
      // Bottom-right corner: margin-left auto pushes it right, align-self flex-end drops
      // it to the padding edge, so it clears the border by the same 1.25rem as the
      // thumbnail opposite. Widths are tuned so it never spills into that padding.
      lines.push(`${indent}    <img src="${qrCodeDataUri}" alt="${escapeHtml(siteUrl)}" style="width: 124px; height: 124px; margin-left: auto; align-self: flex-end; flex-shrink: 0;" />`)
    }
    lines.push(`${indent}  </a>`)
  }

  // Header
  lines.push(`${indent}  <header style="margin-bottom: 2rem; border-bottom: 2px solid ${colors.primary}; padding-bottom: 1rem;">`)
  lines.push(`${indent}    <h1 style="margin: 0 0 0.25rem 0; font-size: 1.75rem; color: ${colors.text};">${escapeHtml(personal.name)}</h1>`)
  lines.push(`${indent}    <p style="margin: 0 0 0.25rem 0; font-size: 1.1rem; color: ${colors.primary}; font-weight: 600;">${escapeHtml(resolve(personal.title))}</p>`)
  if (personal.tagline) {
    lines.push(`${indent}    <p style="margin: 0 0 0.25rem 0; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.03em; color: ${colors.textSecondary}b3;">${escapeHtml(resolve(personal.tagline))}</p>`)
  }
  if (personal.subtitle) {
    lines.push(`${indent}    <p style="margin: 1rem 0 0.25rem 0; color: ${colors.textSecondary}; font-style: italic;">${escapeHtml(resolve(personal.subtitle))}</p>`)
  }
  if (personal.location) {
    lines.push(`${indent}    <p style="margin: 0; color: ${colors.textSecondary};">${escapeHtml(personal.location)}</p>`)
  }
  lines.push(`${indent}  </header>`)

  // Contact
  if (contact.length > 0) {
    lines.push(`${indent}  <section style="margin-bottom: 1.5rem;">`)
    lines.push(`${indent}    ${sectionTitle(resolve(config.labels.sections.contact))}`)
    lines.push(`${indent}    <ul style="list-style: none; padding: 0; margin: 0;">`)
    for (const c of contact) {
      const slot = iconSlot(c.type in INLINE_ICONS ? c.type : null, colors.primary)
      if (c.href) {
        const linkedinBold = isPdf && c.type === 'linkedin' ? ' font-weight: 600;' : ''
        lines.push(`${indent}      <li style="margin-bottom: 0.25rem;">${slot}<a href="${escapeHtml(c.href)}" style="color: ${colors.primary};${linkedinBold}">${escapeHtml(c.label)}</a></li>`)
      } else {
        lines.push(`${indent}      <li style="margin-bottom: 0.25rem;">${slot}${escapeHtml(c.label)}</li>`)
      }
    }
    lines.push(`${indent}    </ul>`)
    lines.push(`${indent}  </section>`)
  }

  // Referents
  if (referents?.length && config.labels.sections.referent) {
    lines.push(`${indent}  <section style="margin-bottom: 1.5rem;">`)
    lines.push(`${indent}    ${sectionTitle(resolve(config.labels.sections.referent))}`)
    referents.forEach((referent, index) => {
      const referentName = referent.href
        ? `<a href="${escapeHtml(referent.href)}" style="color: ${colors.text}; font-weight: 600; text-decoration: ${isPdf ? 'underline' : 'none'};">${escapeHtml(referent.name)}</a>`
        : `<span style="font-weight: 600;">${escapeHtml(referent.name)}</span>`
      // Space each entry apart from the previous one, so the second name never
      // butts against the first one's title (both <p> tags have margin: 0).
      const spacing = index > 0 ? ' margin-top: 0.5rem;' : ''
      // Icon on the name line only, title left flush underneath, mirroring the sidebar.
      const slot = iconSlot(referent.href ? 'linkedin' : null, colors.primary)
      lines.push(`${indent}    <p style="margin: 0;${spacing}">${slot}${referentName}</p>`)
      lines.push(`${indent}    <p style="margin: 0; color: ${colors.textSecondary};">${escapeHtml(resolve(referent.title))}</p>`)
    })
    lines.push(`${indent}  </section>`)
  }

  // Skills
  if (skills.length > 0) {
    lines.push(`${indent}  <section style="margin-bottom: 1.5rem;">`)
    lines.push(`${indent}    ${sectionTitle(resolve(config.labels.sections.skills))}`)
    for (const cat of skills) {
      lines.push(`${indent}    <p style="margin: 0.5rem 0 0.25rem 0; font-weight: 600;">${escapeHtml(resolve(cat.title))}</p>`)
      if (cat.type === 'badges') {
        const names = cat.items.map((item) => (typeof item.name === 'string' ? item.name : resolve(item.name)))
        lines.push(`${indent}    ${renderTechBadges(names)}`)
      } else {
        const skillNames = cat.items.map((item) => {
          const name = typeof item.name === 'string' ? item.name : resolve(item.name)
          if (cat.type === 'languages' && item.level) {
            return `${name} (${resolve(item.level)})`
          }
          return name
        })
        lines.push(`${indent}    <p style="margin: 0; color: ${colors.textSecondary};">${escapeHtml(skillNames.join(' · '))}</p>`)
      }
    }
    lines.push(`${indent}  </section>`)
  }

  // Experiences
  if (experiences.length > 0) {
    lines.push(`${indent}  <section style="margin-bottom: 1.5rem;">`)
    lines.push(`${indent}    ${sectionTitle(resolve(config.labels.sections.experience))}`)
    for (const exp of experiences) {
      lines.push(`${indent}    <article style="margin-bottom: 1.25rem;">`)
      lines.push(`${indent}      <h3 style="margin: 0 0 0.15rem 0; font-size: 1rem; color: ${colors.text};">${escapeHtml(resolve(exp.role))} - ${escapeHtml(resolve(exp.company))}</h3>`)
      if (exp.url) {
        lines.push(`${indent}      <p style="margin: 0 0 0.15rem 0; font-size: 0.9rem;"><a href="${escapeHtml(exp.url)}" style="color: ${colors.primary}; text-decoration: ${isPdf ? 'underline' : 'none'};">${escapeHtml(exp.url)}</a></p>`)
      }
      const periodText = resolve(exp.period)
      const meta = [isPdf ? reverseDateRange(periodText) : periodText]
      if (exp.type) meta.push(resolve(exp.type))
      lines.push(`${indent}      <p style="margin: 0 0 0.25rem 0; color: ${colors.primary}; font-size: 0.9rem; font-weight: 500;">${escapeHtml(meta.join(' · '))}</p>`)
      lines.push(`${indent}      <p style="margin: 0 0 0.25rem 0;">${escapeHtml(resolve(exp.description))}</p>`)
      lines.push(`${indent}      ${renderTechBadges(exp.techs)}`)
      if (exp.details?.tasks) {
        const tasks = exp.details.tasks[lang] ?? Object.values(exp.details.tasks)[0]
        if (tasks && tasks.length > 0) {
          lines.push(`${indent}      <ul style="margin: 0.5rem 0 0 1rem; padding: 0;">`)
          for (const task of tasks) {
            lines.push(`${indent}        <li style="margin-bottom: 0.15rem; font-size: 0.9rem;">${escapeHtml(task)}</li>`)
          }
          lines.push(`${indent}      </ul>`)
        }
      }
      lines.push(`${indent}    </article>`)
    }
    lines.push(`${indent}  </section>`)
  }

  // Education
  if (education.length > 0) {
    lines.push(`${indent}  <section style="margin-bottom: 1.5rem;">`)
    lines.push(`${indent}    ${sectionTitle(resolve(config.labels.sections.education))}`)
    for (const edu of education) {
      lines.push(`${indent}    <div style="margin-bottom: 0.75rem;">`)
      const degreeLine = edu.badge
        ? `${escapeHtml(resolve(edu.degree))} <span style="color: #b91c1c; font-size: 0.8rem; font-weight: 500;">(${escapeHtml(resolve(edu.badge))})</span>`
        : escapeHtml(resolve(edu.degree))
      lines.push(`${indent}      <p style="margin: 0; font-weight: 600; color: ${colors.text};">${degreeLine}</p>`)
      if (edu.specialty) {
        lines.push(`${indent}      <p style="margin: 0; color: ${colors.textSecondary};">${escapeHtml(resolve(edu.specialty))}</p>`)
      }
      const eduMeta = [resolve(edu.school)]
      if (edu.period) eduMeta.push(edu.period)
      lines.push(`${indent}      <p style="margin: 0; color: ${colors.primary}; font-size: 0.9rem;">${escapeHtml(eduMeta.join(' · '))}</p>`)
      lines.push(`${indent}    </div>`)
    }
    lines.push(`${indent}  </section>`)
  }

  // Projects
  if (projects && projects.length > 0 && config.labels.sections.projects) {
    lines.push(`${indent}  <section style="margin-bottom: 1.5rem;">`)
    lines.push(`${indent}    ${sectionTitle(resolve(config.labels.sections.projects))}`)
    for (const proj of projects) {
      lines.push(`${indent}    <div style="margin-bottom: 0.75rem;">`)
      const titleHtml = proj.url
        ? `<a href="${escapeHtml(proj.url)}" style="color: ${colors.primary};">${escapeHtml(resolve(proj.title))}</a>`
        : escapeHtml(resolve(proj.title))
      lines.push(`${indent}      <p style="margin: 0; font-weight: 600; color: ${colors.text};">${titleHtml}</p>`)
      lines.push(`${indent}      <p style="margin: 0; color: ${colors.textSecondary};">${escapeHtml(resolve(proj.description))}</p>`)
      lines.push(`${indent}      ${renderTechBadges(proj.techs)}`)
      lines.push(`${indent}    </div>`)
    }
    lines.push(`${indent}  </section>`)
  }

  // Values
  if (values && values.length > 0 && config.labels.sections.values) {
    lines.push(`${indent}  <section style="margin-bottom: 1.5rem;">`)
    lines.push(`${indent}    ${sectionTitle(resolve(config.labels.sections.values))}`)
    lines.push(`${indent}    <p style="margin: 0; color: ${colors.textSecondary};">${escapeHtml(values.map((v) => resolve(v)).join(' · '))}</p>`)
    lines.push(`${indent}  </section>`)
  }

  // Hobbies
  if (hobbies && hobbies.length > 0 && config.labels.sections.hobbies) {
    lines.push(`${indent}  <section style="margin-bottom: 1.5rem;">`)
    lines.push(`${indent}    ${sectionTitle(resolve(config.labels.sections.hobbies))}`)
    const hobbyNames = hobbies.map((h) => resolve(h.title))
    lines.push(`${indent}    <p style="margin: 0; color: ${colors.textSecondary};">${escapeHtml(hobbyNames.join(' · '))}</p>`)
    lines.push(`${indent}  </section>`)
  }

  // PDF download link — resolved by the caller (config override or folder auto-detect); omitted entirely when rendering the PDF itself
  if (pdfPath) {
    const pdfHref = pdfPath.startsWith('/') ? `${base.replace(/\/$/, '')}${pdfPath}` : pdfPath
    lines.push(`${indent}  <p style="margin-top: 2rem; text-align: center;"><a href="${escapeHtml(pdfHref)}" style="color: ${colors.primary}; font-weight: 500;">📄 Download PDF</a></p>`)
  }

  lines.push(`${indent}</div>`)

  return lines.join('\n')
}
