import { ExternalLinkIcon, LinkedInIcon } from '@/components/icons'

interface ReferentItemProps {
  name: string
  title: string
  href?: string
}

export function ReferentItem({ name, title, href }: ReferentItemProps) {
  return (
    <div>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 font-medium text-sm text-resume-text-secondary hover:text-resume-primary transition-colors duration-200"
        >
          <span className="text-resume-primary group-hover:scale-115 transition-transform duration-200">
            <LinkedInIcon className="w-4 h-4" />
          </span>
          <span className="relative inline-flex items-center gap-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-resume-primary after:origin-left after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
            {name}
            <ExternalLinkIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0" />
          </span>
        </a>
      ) : (
        <p className="font-medium text-sm text-resume-text">{name}</p>
      )}
      <p className="text-xs text-resume-text-secondary">{title}</p>
    </div>
  )
}
