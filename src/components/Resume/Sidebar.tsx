import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { assetUrl } from '@/lib/utils'
import { detectedAssets } from 'virtual:detected-assets'
import { ExternalLinkIcon, LinkedInIcon } from '@/components/icons'
import { SidebarSection } from './SidebarSection'
import { ContactItem } from './ContactItem'
import { ProfilePhoto } from './ProfilePhoto'
import { SkillCategory } from './SkillCategory'
import { TechBadge } from './TechBadge'

export function Sidebar() {
  const { resolve } = useTranslation()
  const { personal, contact, skills, values, hobbies, referents, labels } = resumeConfig

  return (
    <div className="md:w-[38%] bg-gradient-to-b from-resume-sidebar-from to-resume-sidebar-to p-8">
      {/* Photo / Profile image — priority: config > auto-detected > emoji fallback */}
      {/* Hidden on mobile: shown next to the name in MainContent instead */}
      <ProfilePhoto
        photo={(personal.photo || detectedAssets.photo) ? assetUrl(personal.photo || detectedAssets.photo!) : undefined}
        name={personal.name}
        emoji={personal.photoBackEmoji}
        className="hidden md:flex justify-center mb-6"
      />

      {/* Contact — hidden on mobile: shown between the tagline and Experience in MainContent instead */}
      <SidebarSection title={resolve(labels.sections.contact)} className="hidden md:block">
        <div className="space-y-3">
          {contact.map((item) => (
            <ContactItem key={`${item.type}-${item.label}`} type={item.type} label={item.label} href={item.href} />
          ))}
        </div>
      </SidebarSection>

      {/* Referents */}
      {referents?.length && labels.sections.referent ? (
        <SidebarSection title={resolve(labels.sections.referent)}>
          <div className="flex flex-col gap-2">
            {referents.map((referent) => (
              <div key={referent.name}>
                {referent.href ? (
                  <a
                    href={referent.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 font-medium text-sm text-resume-text-secondary hover:text-resume-primary transition-colors duration-200"
                  >
                    <span className="text-resume-primary group-hover:scale-115 transition-transform duration-200">
                      <LinkedInIcon className="w-4 h-4" />
                    </span>
                    <span className="relative inline-flex items-center gap-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-resume-primary after:origin-left after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
                      {referent.name}
                      <ExternalLinkIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0" />
                    </span>
                  </a>
                ) : (
                  <p className="font-medium text-sm text-resume-text">{referent.name}</p>
                )}
                <p className="text-xs text-resume-text-secondary">{resolve(referent.title)}</p>
              </div>
            ))}
          </div>
        </SidebarSection>
      ) : null}

      {/* Skills */}
      <SidebarSection title={resolve(labels.sections.skills)}>
        <div className="space-y-4">
          {skills.map((category, i) => (
            <SkillCategory key={`${resolve(category.title)}-${i}`} title={resolve(category.title)}>
              {category.type === 'badges' && (
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((item) => {
                    const techName = typeof item.name === 'string' ? item.name : Object.values(item.name)[0]
                    return <TechBadge key={techName} tech={techName} color={item.color} />
                  })}
                </div>
              )}
              {category.type === 'text' && (
                <p className="text-xs text-resume-text-secondary">
                  {category.items
                    .map((item) => (typeof item.name === 'string' ? item.name : resolve(item.name)))
                    .join(', ')}
                </p>
              )}
              {category.type === 'languages' && (
                <div className="flex items-center gap-3 text-sm flex-wrap">
                  {category.items.map((item, j) => {
                    const name = typeof item.name === 'string' ? item.name : resolve(item.name)
                    return (
                      <span key={`${name}-${j}`} className="flex items-center gap-1">
                        <span className="text-resume-text-secondary">
                          {name} {item.level ? resolve(item.level) : ''}
                          {item.details && (
                            <span className="text-xs opacity-70 ml-1">{item.details}</span>
                          )}
                        </span>
                      </span>
                    )
                  })}
                </div>
              )}
            </SkillCategory>
          ))}
        </div>
      </SidebarSection>

      {/* Values */}
      {values && values.length > 0 && labels.sections.values && (
        <SidebarSection title={resolve(labels.sections.values)}>
          <div className="space-y-1">
            {values.map((value, i) => (
              <p key={i} className="text-sm text-resume-text-secondary">
                {resolve(value)}
              </p>
            ))}
          </div>
        </SidebarSection>
      )}

      {/* Hobbies */}
      {hobbies && hobbies.length > 0 && labels.sections.hobbies && (
        <SidebarSection title={resolve(labels.sections.hobbies)}>
          <div className="grid grid-cols-2 gap-3">
            {hobbies.map((hobby, i) => (
              <div key={`${resolve(hobby.title)}-${i}`}>
                <p className="font-medium text-sm text-resume-text">{resolve(hobby.title)}</p>
                {hobby.details?.map((detail, j) => (
                  <p key={j} className="text-xs text-resume-text-secondary">
                    {resolve(detail)}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </SidebarSection>
      )}
    </div>
  )
}
