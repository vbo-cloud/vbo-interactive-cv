import { useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import { assetUrl } from '@/lib/utils'
import { detectedAssets } from 'virtual:detected-assets'
import { ExperienceItem } from './ExperienceItem'
import { ProjectItem } from './ProjectItem'
import { EducationItem } from './EducationItem'
import { ProfilePhoto } from './ProfilePhoto'
import { SidebarSection } from './SidebarSection'
import { ContactItem } from './ContactItem'

export function MainContent() {
  const { resolve, resolveArray } = useTranslation()
  const { personal, contact, experiences, projects, education, labels } = resumeConfig
  const [expandedExp, setExpandedExp] = useState<string | null>(null)

  const toggleExp = (id: string) => {
    setExpandedExp(expandedExp === id ? null : id)
  }

  const experienceLabels = {
    mainTasks: resolve(labels.experience.mainTasks),
    moreTasks: resolve(labels.experience.moreTasks),
    training: labels.experience.training ? resolve(labels.experience.training) : undefined,
    technologies: resolve(labels.experience.technologies),
  }

  return (
    <div className="md:w-[62%] p-8">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-4 md:block">
          {/* Photo — mobile only, shown to the left of the name; desktop photo lives in Sidebar */}
          <ProfilePhoto
            photo={(personal.photo || detectedAssets.photo) ? assetUrl(personal.photo || detectedAssets.photo!) : undefined}
            name={personal.name}
            emoji={personal.photoBackEmoji}
            size="sm"
            className="md:hidden"
          />
          <h1 className="flex-1 text-left md:text-center text-3xl md:text-4xl font-bold tracking-[0.15em] text-resume-text">
            {personal.name.toUpperCase()}
          </h1>
        </div>
        <div className="text-center">
          <p className="text-base text-resume-text-secondary tracking-widest mt-2">
            {resolve(personal.title).toUpperCase()}
          </p>
          {personal.tagline && (
            <p className="text-xs uppercase tracking-wide text-resume-text-secondary/70 mt-1">
              {resolve(personal.tagline)}
            </p>
          )}
          {personal.subtitle && (
            <p className="text-sm text-resume-text-secondary italic text-left mt-5">{resolve(personal.subtitle)}</p>
          )}
        </div>
      </div>

      {/* Contact — mobile only, shown between the tagline and Experience; desktop contact lives in Sidebar */}
      <SidebarSection title={resolve(labels.sections.contact)} className="md:hidden">
        <div className="space-y-3">
          {contact.map((item) => (
            <ContactItem key={`${item.type}-${item.label}`} type={item.type} label={item.label} href={item.href} />
          ))}
        </div>
      </SidebarSection>

      {/* Experiences */}
      <div className="relative">
        <h2 className="text-sm font-bold tracking-widest text-resume-text mb-6 pb-2 border-b border-resume-primary/20">
          {resolve(labels.sections.experience)}
        </h2>
        <div className="space-y-2">
          {experiences.map((exp) => (
            <ExperienceItem
              key={exp.id}
              year={resolve(exp.period)}
              company={resolve(exp.company)}
              type={exp.type ? resolve(exp.type) : undefined}
              role={resolve(exp.role)}
              description={resolve(exp.description)}
              techs={exp.techs}
              expanded={expandedExp === exp.id}
              onToggle={() => toggleExp(exp.id)}
              details={
                exp.details
                  ? {
                      tasks: exp.details.tasks ? resolveArray(exp.details.tasks) : undefined,
                      training: exp.details.training ? resolveArray(exp.details.training) : undefined,
                    }
                  : undefined
              }
              subItem={
                exp.subItem
                  ? {
                      title: resolve(exp.subItem.title),
                      description: resolve(exp.subItem.description),
                    }
                  : undefined
              }
              labels={experienceLabels}
              isHighlighted={exp.isHighlighted}
            />
          ))}
        </div>
      </div>

      {/* Projects */}
      {projects && projects.length > 0 && labels.sections.projects && (
        <div className="mt-8">
          <h2 className="text-sm font-bold tracking-widest text-resume-text mb-4 pb-2 border-b border-resume-primary/20">
            {resolve(labels.sections.projects)}
          </h2>
          <div className="space-y-1">
            {projects.map((project) => (
              <ProjectItem
                key={project.id}
                title={resolve(project.title)}
                description={resolve(project.description)}
                techs={project.techs}
                url={project.url}
                github={project.github}
              />
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      <div className="mt-8">
        <h2 className="text-sm font-bold tracking-widest text-resume-text mb-4 pb-2 border-b border-resume-primary/20">
          {resolve(labels.sections.education)}
        </h2>
        <div className="space-y-4">
          {education.map((edu, i) => (
            <EducationItem
              key={`${resolve(edu.school)}-${resolve(edu.degree)}-${edu.period ?? i}`}
              school={resolve(edu.school)}
              degree={resolve(edu.degree)}
              specialty={edu.specialty ? resolve(edu.specialty) : undefined}
              period={edu.period}
              logo={edu.logo}
              badge={edu.badge ? resolve(edu.badge) : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
