import { lazy, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { profile } from '@/data/profile'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { RotatingText } from '@/components/ui/RotatingText'
import { ScrambleText } from '@/components/ui/ScrambleText'
import { Button } from '@/components/ui/Button'
import { fadeUp, stagger } from '@/lib/motion'

// three.js is the heaviest dependency, so the orb loads after first paint
const ParticleOrb = lazy(() => import('@/components/three/ParticleOrb'))

export function Hero({ ready }: { ready: boolean }) {
  const { scrollY } = useScroll()
  // as the page scrolls, the orb sinks and fades while the copy lifts away
  const orbY = useTransform(scrollY, [0, 800], [0, 180])
  const orbOpacity = useTransform(scrollY, [0, 700], [1, 0.15])
  const copyY = useTransform(scrollY, [0, 600], [0, -80])
  const copyOpacity = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <motion.div style={{ y: orbY, opacity: orbOpacity }} className="absolute inset-0">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={ready ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* soft halo behind the particles */}
          <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(124_92_255/0.35),transparent)]" />
          <Suspense fallback={null}>
            <ParticleOrb className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full" />
          </Suspense>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
        variants={stagger(0.12, 0.2)}
        className="relative z-10 mx-auto flex max-w-content flex-col items-center px-4 pt-24 text-center sm:px-6"
      >
        <motion.p
          variants={fadeUp}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-paper/90"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {profile.status}
        </motion.p>

        <AnimatedText
          as="h1"
          id="hero-title"
          text={profile.name}
          by="letter"
          immediate
          play={ready}
          delay={0.35}
          className="mt-8 font-display text-[clamp(3.25rem,11vw,9.5rem)] font-bold leading-[0.9] tracking-[-0.045em] [text-shadow:0_10px_60px_rgb(12_10_29/0.6)]"
        />

        <motion.p variants={fadeUp} className="mt-6 text-xl text-muted md:text-2xl">
          <span className="font-serif text-2xl italic text-paper md:text-3xl">Full-stack engineer</span> building{' '}
          <RotatingText words={profile.rotating} className="font-medium text-gradient" />
        </motion.p>

        {ready && (
          <motion.p variants={fadeUp} className="mt-3 text-sm text-muted/80">
            <ScrambleText text="React · TypeScript · FastAPI · Node.js · PostgreSQL · AI" delay={900} duration={1200} />
          </motion.p>
        )}

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="#work" icon={<ArrowDown size={16} />}>
            View my work
          </Button>
          <Button href={`mailto:${profile.email}`} variant="glass" icon={<ArrowUpRight size={16} />}>
            Email me
          </Button>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted">
          <MapPin size={14} /> {profile.location}
        </motion.p>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <span className="flex h-11 w-7 justify-center rounded-full border border-white/20 pt-2">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-2 w-1 rounded-full bg-paper"
          />
        </span>
      </motion.a>
    </section>
  )
}
