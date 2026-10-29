import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { profile } from '@/data/profile'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { fadeUp, stagger, viewport } from '@/lib/motion'

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // the portrait drifts slightly slower than the page
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <SectionHeading id="about" title="About me" />

      <div ref={ref} className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal className="glass overflow-hidden p-2">
          <div className="overflow-hidden rounded-[20px]">
            <motion.img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              style={{ y, scale: 1.18 }}
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>

        <div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={stagger(0.12)}
            className="space-y-5 text-lg leading-relaxed text-paper/85 md:text-xl"
          >
            {profile.about.map((para) => (
              <motion.p key={para} variants={fadeUp}>
                {para}
              </motion.p>
            ))}
          </motion.div>

          <motion.dl
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={stagger(0.1, 0.2)}
            className="mt-10 grid gap-3 sm:grid-cols-3"
          >
            {profile.facts.map((f) => (
              <motion.div key={f.label} variants={fadeUp} className="glass flex flex-col-reverse p-5">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="mb-1 font-display text-3xl font-bold tracking-tight">{f.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  )
}
