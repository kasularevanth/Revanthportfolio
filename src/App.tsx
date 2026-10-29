import { useCallback, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { Background } from '@/components/layout/Background'
import { Navbar } from '@/components/layout/Navbar'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { Footer } from '@/components/layout/Footer'
import { Preloader } from '@/components/layout/Preloader'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Manifesto } from '@/components/sections/Manifesto'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()
  const [ready, setReady] = useState(false)
  const onIntroDone = useCallback(() => setReady(true), [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-amber focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to work
      </a>
      <Preloader onDone={onIntroDone} />
      <Background />
      <ScrollProgress />
      <Navbar />
      <main id="top">
        <Hero ready={ready} />
        <Manifesto />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
