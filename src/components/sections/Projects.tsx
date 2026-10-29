import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import type { Accent, Project } from '@/types'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { fadeUp, stagger, viewport } from '@/lib/motion'
import { cn } from '@/lib/cn'

const accentRgb: Record<Accent, string> = {
  amber: '255 181 71',
  sky: '127 216 255',
  violet: '167 139 250',
}

const accentText: Record<Accent, string> = {
  amber: 'text-amber',
  sky: 'text-sky',
  violet: 'text-violet',
}

const accentDot: Record<Accent, string> = {
  amber: 'bg-amber',
  sky: 'bg-sky',
  violet: 'bg-violet',
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard
      variants={fadeUp}
      glow={accentRgb[project.accent]}
      className={cn('h-full p-6 md:p-8', project.featured && 'lg:col-span-2')}
    >
      <article aria-labelledby={`${project.id}-name`} className={cn(project.featured && 'lg:grid lg:grid-cols-2 lg:gap-10')}>
        <div>
          <p className={cn('text-sm font-medium', accentText[project.accent])}>{project.kind}</p>
          <h3 id={`${project.id}-name`} className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
            {project.name}
          </h3>
          <p className="mt-4 max-w-prose leading-relaxed text-paper/80">{project.summary}</p>
        </div>

        <div className={cn('mt-6', project.featured && 'lg:mt-0')}>
          <h4 className="text-sm font-medium text-muted">What I built</h4>
          <ul className="mt-3 space-y-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-paper/85">
                <span className={cn('mt-2 h-1.5 w-1.5 shrink-0 rounded-full', accentDot[project.accent])} />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-6 flex lg:col-span-2 flex-wrap gap-2" aria-label={`${project.name} tech stack`}>
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-paper/80 transition-colors duration-300 group-hover:border-white/20"
            >
              {s}
            </li>
          ))}
        </ul>
      </article>
    </SpotlightCard>
  )
}

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="section">
      <SectionHeading
        id="work"
        title="Selected work"
        description="Products I have architected and shipped, from voice AI and healthcare networks to on-chain escrow and enterprise commerce."
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger(0.12)}
        className="grid gap-5 lg:grid-cols-2"
      >
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </motion.div>
    </section>
  )
}
