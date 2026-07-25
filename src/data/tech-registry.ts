/**
 * Central registry of known technologies with their brand colors.
 * Use the tech name in your config and the color is resolved automatically.
 *
 * To add a custom technology, add it here with its brand color.
 */
const TECH_REGISTRY = {
  // ===== Frontend Frameworks =====
  'React': { color: '#61DAFB' },
  'Angular': { color: '#DD0031' },
  'Vue': { color: '#4FC08D' },
  'Vue.js': { color: '#4FC08D' },
  'Svelte': { color: '#FF3E00' },
  'Next.js': { color: '#000000' },
  'Nuxt': { color: '#00DC82' },
  'Nuxt.js': { color: '#00DC82' },
  'Astro': { color: '#FF5D01' },
  'Solid': { color: '#2C4F7C' },
  'SolidJS': { color: '#2C4F7C' },
  'Qwik': { color: '#18B6F6' },
  'Gatsby': { color: '#663399' },
  'Remix': { color: '#000000' },
  'Ember': { color: '#E04E39' },
  'Preact': { color: '#673AB8' },
  'Alpine.js': { color: '#8BC0D0' },
  'htmx': { color: '#3366CC' },

  // ===== Languages =====
  'TypeScript': { color: '#3178C6' },
  'JavaScript': { color: '#F7DF1E' },
  'Python': { color: '#FFD43B' },
  'Java': { color: '#007396' },
  'Go': { color: '#00ADD8' },
  'Golang': { color: '#00ADD8' },
  'Rust': { color: '#DEA584' },
  'Ruby': { color: '#CC342D' },
  'PHP': { color: '#777BB4' },
  'C': { color: '#A8B9CC' },
  'C++': { color: '#341B6E' },
  'C#': { color: '#512BD4' },
  'Swift': { color: '#F05138' },
  'Kotlin': { color: '#7F52FF' },
  'Dart': { color: '#0175C2' },
  'Elixir': { color: '#4B275F' },
  'Scala': { color: '#DC322F' },
  'Haskell': { color: '#5D4F85' },
  'Lua': { color: '#2C2D72' },
  'R': { color: '#276DC3' },
  'Perl': { color: '#39457E' },
  'Clojure': { color: '#5881D8' },
  'Zig': { color: '#F7A41D' },
  'OCaml': { color: '#EC6813' },

  // ===== Backend Frameworks =====
  'Node.js': { color: '#339933' },
  'NodeJS': { color: '#339933' },
  'Express': { color: '#000000' },
  'Express.js': { color: '#000000' },
  'NestJS': { color: '#E0234E' },
  'Fastify': { color: '#000000' },
  'Django': { color: '#092E20' },
  'Flask': { color: '#000000' },
  'FastAPI': { color: '#009688' },
  'Spring': { color: '#6DB33F' },
  'Spring Boot': { color: '#6DB33F' },
  'Rails': { color: '#CC0000' },
  'Ruby on Rails': { color: '#CC0000' },
  'Laravel': { color: '#FF2D20' },
  'Symfony': { color: '#000000' },
  'ASP.NET': { color: '#512BD4' },
  '.NET': { color: '#512BD4' },
  'Deno': { color: '#000000' },
  'Bun': { color: '#FBF0DF' },

  // ===== Mobile =====
  'React Native': { color: '#61DAFB' },
  'Flutter': { color: '#02569B' },
  'Ionic': { color: '#3880FF' },
  'SwiftUI': { color: '#F05138' },
  'Expo': { color: '#000020' },

  // ===== Databases =====
  'PostgreSQL': { color: '#4169E1' },
  'pgvector': { color: '#2F6F9F' },
  'MongoDB': { color: '#47A248' },
  'MySQL': { color: '#4479A1' },
  'Redis': { color: '#DC382D' },
  'SQLite': { color: '#003B57' },
  'Elasticsearch': { color: '#005571' },
  'Firebase': { color: '#FFCA28' },
  'Supabase': { color: '#3FCF8E' },
  'DynamoDB': { color: '#4053D6' },
  'MariaDB': { color: '#003545' },
  'Neo4j': { color: '#4581C3' },
  'Cassandra': { color: '#1287B1' },
  'CouchDB': { color: '#E42528' },
  'PlanetScale': { color: '#000000' },
  'Neon': { color: '#00E599' },

  // ===== DevOps & Cloud =====
  'Docker': { color: '#2496ED' },
  'Kubernetes': { color: '#326CE5' },
  'AWS': { color: '#FF9900' },
  'GCP': { color: '#4285F4' },
  'Google Cloud': { color: '#4285F4' },
  'Azure': { color: '#0078D4' },
  'Terraform': { color: '#7B42BC' },
  'GitHub Actions': { color: '#6D071A' },
  'GitLab CI': { color: '#FC6D26' },
  'Azure DevOps': { color: '#374151' },
  'Jenkins': { color: '#D24939' },
  'Vercel': { color: '#000000' },
  'Netlify': { color: '#00C7B7' },
  'Cloudflare': { color: '#F38020' },
  'Heroku': { color: '#430098' },
  'DigitalOcean': { color: '#0080FF' },
  'Nginx': { color: '#009639' },
  'Linux': { color: '#FCC624' },

  // ===== CSS & UI =====
  'Tailwind CSS': { color: '#06B6D4' },
  'Tailwind': { color: '#06B6D4' },
  'SASS': { color: '#CC6699' },
  'SCSS': { color: '#CC6699' },
  'CSS': { color: '#1572B6' },
  'HTML': { color: '#E34F26' },
  'Styled Components': { color: '#DB7093' },
  'Material UI': { color: '#007FFF' },
  'MUI': { color: '#007FFF' },
  'Chakra UI': { color: '#319795' },
  'Ant Design': { color: '#0170FE' },
  'Bootstrap': { color: '#7952B3' },
  'Radix': { color: '#111111' },
  'shadcn/ui': { color: '#000000' },
  'Framer Motion': { color: '#0055FF' },

  // ===== Tools & Others =====
  'Git': { color: '#374151' },
  'CI/CD': { color: '#374151' },
  'Service Bus': { color: '#CA8A04' },
  'Claude': { color: '#DA7756' },
  'Agile Methods': { color: '#16A34A' },
  'GitHub': { color: '#374151' },
  'GitLab': { color: '#374151' },
  'GraphQL': { color: '#E10098' },
  'REST': { color: '#009688' },
  'Prisma': { color: '#2D3748' },
  'tRPC': { color: '#2596BE' },
  'Vite': { color: '#646CFF' },
  'Webpack': { color: '#8DD6F9' },
  'Rollup': { color: '#EC4A3F' },
  'esbuild': { color: '#FFCF00' },
  'Turbopack': { color: '#000000' },
  'Storybook': { color: '#FF4785' },
  'Figma': { color: '#F24E1E' },
  'Stripe': { color: '#635BFF' },

  // ===== Testing =====
  'Jest': { color: '#C21325' },
  'Vitest': { color: '#6E9F18' },
  'Cypress': { color: '#69D3A7' },
  'Playwright': { color: '#2EAD33' },
  'Testing Library': { color: '#E33332' },
  'Mocha': { color: '#8D6748' },
  'Selenium': { color: '#43B02A' },

  // ===== AI & Data =====
  'TensorFlow': { color: '#FF6F00' },
  'PyTorch': { color: '#EE4C2C' },
  'OpenAI': { color: '#412991' },
  'LangChain': { color: '#1C3C3C' },
  'Pandas': { color: '#150458' },
  'NumPy': { color: '#013243' },

  // ===== CMS & Others =====
  'WordPress': { color: '#21759B' },
  'Strapi': { color: '#4945FF' },
  'Sanity': { color: '#F03E2F' },
  'Contentful': { color: '#2478CC' },

  // ===== Messaging & Realtime =====
  'RabbitMQ': { color: '#FF6600' },
  'Kafka': { color: '#231F20' },
  'Socket.io': { color: '#010101' },
  'WebSocket': { color: '#010101' },

  // ===== Legacy / Enterprise =====
  'J2EE': { color: '#007396' },
  'JSP': { color: '#007396' },
  'JSF': { color: '#007396' },
  'jQuery': { color: '#0769AD' },
} as const satisfies Record<string, { color: string }>

export type TechName = keyof typeof TECH_REGISTRY

/**
 * Resolves the color for a given tech name.
 * Priority: registry → fallback gray.
 */
export function getTechColor(name: string): string {
  const registered = TECH_REGISTRY[name as TechName]
  if (registered) return registered.color

  return '#6b7280'
}

/**
 * Badge color is not decorative — it encodes how much a tech should stand out on
 * the CV, from "this is the pitch" down to "true but not the point". Any tech not
 * explicitly classified below falls to `muted` on purpose: the default is discreet.
 */
export type TechTier = 'brand' | 'workflow' | 'support' | 'muted'

/**
 * Brand tier — the actual sales pitch for a DevOps / Cloud Engineer (Azure) role.
 * Full brand color + outline: these are what should catch the eye first.
 */
const BRAND_TECHS = new Set([
  'Azure',
  'Terraform',
  'Python',
  'Service Bus',
  'OpenAI',
  'Claude',
  'pgvector',
  'Docker',
  'Agile Methods',
  // fr label for the same skill — the sidebar badge text isn't currently
  // language-resolved for this entry (see Sidebar.tsx), but classify both
  // so tiering stays correct if that gets fixed later.
  'Méthodes Agiles',
])

/**
 * Workflow tier — the versioning/CI-CD substrate. Read as one object rather than
 * distinct tools: flat black background, one shared text color, no brand colors.
 */
const WORKFLOW_TECHS = new Set(['Git', 'CI/CD', 'GitHub', 'GitLab', 'Azure DevOps'])

/**
 * Support tier — genuinely used, but not the argument for hiring: real second-plan
 * credibility. Desaturated so it reads as "also true" rather than competing with brand tier.
 */
const SUPPORT_TECHS = new Set(['FastAPI', 'PostgreSQL', 'C#'])

/**
 * Resolves the visual tier for a tech name. Anything not classified above is `muted`
 * — historical or off-trajectory skills: visible and factual, never salient.
 */
export function getTechTier(name: string): TechTier {
  if (BRAND_TECHS.has(name)) return 'brand'
  if (WORKFLOW_TECHS.has(name)) return 'workflow'
  if (SUPPORT_TECHS.has(name)) return 'support'
  return 'muted'
}
