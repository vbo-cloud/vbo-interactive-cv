import { TechBadge } from './TechBadge'

interface ExperienceDetailsContentProps {
  tasks?: string[]
  training?: string[]
  techs?: string[]
  projectLink?: { label: string; url: string }
  labels: {
    mainTasks: string
    moreTasks: string
    training?: string
    technologies: string
  }
  variant: 'inline' | 'modal'
}

export function ExperienceDetailsContent({
  tasks,
  training,
  techs,
  projectLink,
  labels,
  variant,
}: ExperienceDetailsContentProps) {
  const MAX_INLINE_TASKS = 6

  return (
    <div className="space-y-3">
      {variant === 'modal' && techs && techs.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-resume-text mb-2">{labels.technologies}</p>
          <div className="flex flex-wrap gap-2">
            {techs.map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>
        </div>
      )}

      {tasks && tasks.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-resume-text mb-2">{labels.mainTasks}</p>
          <ul className="text-xs text-resume-text-secondary space-y-1">
            {(variant === 'inline' ? tasks.slice(0, MAX_INLINE_TASKS) : tasks).map((task, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-resume-primary">&#8226;</span>
                <span className="whitespace-pre-line">{task}</span>
              </li>
            ))}
            {variant === 'inline' && tasks.length > MAX_INLINE_TASKS && (
              <li className="text-resume-primary italic">
                +{tasks.length - MAX_INLINE_TASKS} {labels.moreTasks}
              </li>
            )}
          </ul>
          {projectLink && (
            <p className="text-xs text-resume-text-secondary mt-2">
              {projectLink.label}{' '}
              <a
                href={projectLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-resume-primary hover:underline"
              >
                {projectLink.url}
              </a>
            </p>
          )}
        </div>
      )}

      {training && training.length > 0 && labels.training && (
        <div>
          <p className="text-xs font-semibold text-resume-text mb-2">{labels.training}</p>
          <ul className="text-xs text-resume-text-secondary space-y-1">
            {training.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-resume-primary">&#8226;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
