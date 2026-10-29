import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Award, Briefcase, GraduationCap } from 'lucide-react'
import { experience } from '@/data/experience'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

export function Experience() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <SectionHeading id="experience" title="Experience" />

      <ol ref={ref} className="relative ml-3 space-y-8 border-l border-white/10 pl-8 md:ml-4 md:pl-12">
        {/* progress line that fills as you scroll through the timeline */}
        <motion.span
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute -left-px top-0 h-full w-px origin-top bg-gradient-to-b from-amber via-violet to-sky"
        />
        {experience.map((job, i) => {
          const Icon = job.points.length === 0 ? GraduationCap : Briefcase
          return (
            <li key={job.company} className="relative">
              <span className="absolute -left-[49px] top-6 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-ink-2 text-amber md:-left-[65px]">
                <Icon size={14} />
              </span>
              <Reveal delay={i * 0.05} className="glass p-6 md:p-8">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{job.company}</h3>
                  <p className="text-sm text-muted">{job.period}</p>
                </div>
                <p className="mt-1 text-paper/85">
                  {job.role}
                  <span className="ml-2 text-sm text-muted">{job.place}</span>
                </p>
                {job.points.length > 0 && (
                  <ul className="mt-5 grid gap-2.5 md:grid-cols-2 md:gap-x-8">
                    {job.points.map((pt) => {
                      const isAward = pt.toLowerCase().includes('award')
                      return (
                        <li key={pt} className="flex gap-3 text-sm leading-relaxed text-paper/75">
                          {isAward ? (
                            <Award size={14} className="mt-1 shrink-0 text-amber" />
                          ) : (
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-paper/50" />
                          )}
                          {pt}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </Reveal>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
