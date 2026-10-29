import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react'
import { profile } from '@/data/profile'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { RotatingText } from '@/components/ui/RotatingText'
import { Button } from '@/components/ui/Button'
import { fadeUp, stagger } from '@/lib/motion'

const BARS = [0.35, 0.7, 1, 0.55, 0.85, 0.4, 0.95, 0.6, 0.3, 0.75, 0.5, 0.9]

function NowBuilding() {
  return (
    <motion.div variants={fadeUp} className="glass w-full max-w-sm p-5 md:p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">Currently building</p>
        <span className="flex items-center gap-2 text-xs text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live
        </span>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="font-display text-lg font-semibold">HeyCLO</p>
        <p className="text-sm text-muted">Voice-first AI confidant</p>
        <div className="mt-4 flex h-10 items-end gap-1" aria-hidden="true">
          {BARS.map((h, i) => (
            <span
              key={i}
              className="w-full origin-bottom animate-bar rounded-full bg-gradient-to-t from-sky/40 to-sky"
              style={{ height: `${h * 100}%`, animationDelay: `${i * 0.09}s` }}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="font-display text-lg font-semibold">Vyspar AI</p>
        <p className="text-sm text-muted">Healthcare professional network</p>
        <div className="mt-4 flex -space-x-2" aria-hidden="true">
          {['from-amber to-amber/40', 'from-violet to-violet/40', 'from-sky to-sky/40', 'from-paper to-paper/40'].map((g) => (
            <span key={g} className={`h-7 w-7 rounded-full border-2 border-ink-2 bg-gradient-to-br ${g}`} />
          ))}
          <span className="grid h-7 place-items-center rounded-full border-2 border-ink-2 bg-white/10 px-2 text-[11px] text-paper">
            Real-time
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative mx-auto flex min-h-[100svh] max-w-content items-center px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger(0.12, 0.3)}
        className="grid w-full items-center gap-12 lg:grid-cols-[1.4fr_1fr]"
      >
        <div>
          <motion.p
            variants={fadeUp}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-paper/90"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            {profile.status}
          </motion.p>

          <AnimatedText
            as="h1"
            id="hero-title"
            text={profile.name}
            by="letter"
            immediate
            delay={0.4}
            className="mt-6 font-display text-[clamp(3rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.04em]"
          />

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-xl leading-relaxed text-muted md:text-2xl">
            {profile.role} building{' '}
            <RotatingText words={profile.rotating} className="font-medium text-gradient" />
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="#work" icon={<ArrowDownRight size={16} />}>
              View my work
            </Button>
            <Button href={`mailto:${profile.email}`} variant="glass" icon={<ArrowUpRight size={16} />}>
              Email me
            </Button>
            <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={14} /> {profile.location}
            </span>
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <NowBuilding />
        </div>
      </motion.div>
    </section>
  )
}
