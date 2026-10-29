import { motion } from 'framer-motion'
import { skills } from '@/data/skills'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { fadeUp, stagger, viewport } from '@/lib/motion'

const chip = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <SectionHeading
        id="skills"
        title="Skills"
        description="The tools I reach for across the stack, from the interface to the database, payments and AI."
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger(0.08)}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skills.map((g) => (
          <SpotlightCard key={g.group} variants={fadeUp} className="p-6">
            <h3 className="font-display text-lg font-semibold">{g.group}</h3>
            <motion.ul variants={stagger(0.03, 0.2)} className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <motion.li
                  key={s}
                  variants={chip}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-paper/85 transition-colors duration-300 hover:border-amber/50 hover:text-paper"
                >
                  {s}
                </motion.li>
              ))}
            </motion.ul>
          </SpotlightCard>
        ))}
      </motion.div>
    </section>
  )
}
