import { TechBadge } from './TechBadge'

interface ExperienceDetailsContentProps {
  tasks?: string[]
  training?: string[]
  techs?: string[]
  labels: {
    mainTasks: string
    training?: string
    technologies: string
  }
  variant: 'inline' | 'modal'
}

export function ExperienceDetailsContent({
  tasks,
  training,
  techs,
  labels,
  variant,
}: ExperienceDetailsContentProps) {
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
            {tasks.map((task, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-resume-primary">&#8226;</span>
                <span className="whitespace-pre-line">{task}</span>
              </li>
            ))}
          </ul>
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
