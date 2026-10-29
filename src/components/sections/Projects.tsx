import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ThinkingOrb, type OrbState } from 'thinking-orbs'
import { projects } from '@/data/projects'
import type { Accent, Project } from '@/types'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { TiltCard } from '@/components/ui/TiltCard'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/cn'

const accent: Record<Accent, { rgb: string; hex: string; text: string; dot: string }> = {
  amber: { rgb: '255 181 71', hex: '#ffb547', text: 'text-amber', dot: 'bg-amber' },
  sky: { rgb: '127 216 255', hex: '#7fd8ff', text: 'text-sky', dot: 'bg-sky' },
  violet: { rgb: '167 139 250', hex: '#a78bfa', text: 'text-violet', dot: 'bg-violet' },
}

// Each product gets the orb animation that matches what it does.
const orbState: Record<string, OrbState> = {
  vyspar: 'connecting',
  heyclo: 'listening',
  chainreach: 'weaving',
  oracle: 'solving',
}

const listItem = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
}

function CardBody({ project, solid }: { project: Project; solid?: boolean }) {
  const a = accent[project.accent]
  return (
    <SpotlightCard
      glow={a.rgb}
      // stacked cards sit on top of each other, so they need an opaque base
      className={cn('p-6 md:p-10', solid && 'bg-[#16132e] shadow-[0_-20px_60px_-20px_rgb(0_0_0/0.8)]')}
    >
      <motion.article
        aria-labelledby={`${project.id}-name`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
        className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12"
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-white/10 bg-black/30">
              <ThinkingOrb state={orbState[project.id] ?? 'working'} size={64} theme="dark" color={a.hex} />
            </div>
            <p className={cn('text-sm font-medium', a.text)}>{project.kind}</p>
          </div>
          <h3 id={`${project.id}-name`} className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
            {project.name}
          </h3>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-paper/80">{project.summary}</p>
          <ul className="mt-auto flex flex-wrap gap-2 pt-8" aria-label={`${project.name} tech stack`}>
            {project.stack.map((s) => (
              <motion.li
                key={s}
                variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } }}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-paper/80 transition-colors duration-300 hover:border-white/30 hover:text-paper"
              >
                {s}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5 md:p-6">
          <h4 className="text-sm font-medium text-muted">What I built</h4>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((h) => (
              <motion.li key={h} variants={listItem} className="flex gap-3 text-[15px] leading-relaxed text-paper/85">
                <span className={cn('mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full', a.dot)} />
                {h}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.article>
    </SpotlightCard>
  )
}

/** Desktop: cards pin one after another and the ones underneath recede. */
function StackedCard({ project, index, total, progress }: { project: Project; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total
  const targetScale = 1 - (total - 1 - index) * 0.045
  const scale = useTransform(progress, [start, 1], [1, targetScale])
  const brightness = useTransform(progress, [start, start + 1 / total, 1], [1, 1, index === total - 1 ? 1 : 0.45])
  const filter = useTransform(brightness, (b) => `brightness(${b})`)

  return (
    <div className="sticky top-0 flex h-[100svh] items-center [perspective:1400px]">
      {/* scroll-driven: shrink and dim as later cards land on top */}
      <motion.div style={{ scale, filter, top: `${index * 22}px` }} className="relative w-full origin-top">
        {/* one-off entrance: the card swings up into place */}
        <motion.div
          initial={{ y: 120, rotateX: 18, opacity: 0 }}
          whileInView={{ y: 0, rotateX: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease }}
        >
          <TiltCard max={4}>
            <CardBody project={project} solid />
          </TiltCard>
        </motion.div>
      </motion.div>
    </div>
  )
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const desktop = useMediaQuery('(min-width: 1024px)')
  const reduce = useReducedMotion()
  const stack = desktop && !reduce

  return (
    <section id="work" aria-labelledby="work-title" className="section pb-0">
      <SectionHeading
        id="work"
        title="Selected work"
        description="Products I have architected and shipped, from voice AI and healthcare networks to on-chain escrow and enterprise commerce."
      />

      {stack ? (
        <div ref={ref} className="relative">
          {projects.map((p, i) => (
            <StackedCard key={p.id} project={p} index={i} total={projects.length} progress={scrollYProgress} />
          ))}
        </div>
      ) : (
        <div ref={ref} className="space-y-5 pb-24">
          {projects.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: 60, opacity: 0, scale: 0.97 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, ease }}
            >
              <CardBody project={p} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
