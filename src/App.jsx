import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import Waveform from './components/Waveform.jsx'
import Cursor from './components/Cursor.jsx'
import Magnetic from './components/Magnetic.jsx'
import { projects, earlier, skills, links, experience } from './data.js'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const NAME = ['Revanth', 'Kasula']
const ABOUT =
  'I am a full-stack engineer from Telangana and the co-founder and backend lead at Persist Ventures. I spent two years at Argano making Oracle Commerce faster and more reliable for global clients. Now I build products end to end: the React interface, the FastAPI or Node service behind it, the database, the payments, and the AI that makes it feel personal.'

export default function App() {
  const root = useRef(null)
  const energy = useRef(1)

  // Smooth scrolling, kept in step with ScrollTrigger
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      e.preventDefault()
      lenis.scrollTo(a.getAttribute('href'), { offset: 0 })
    }
    document.addEventListener('click', onClick)
    return () => {
      gsap.ticker.remove(tick)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [])

  useGSAP(() => {
    // Pin distances depend on text width, so measure again once fonts arrive
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Page load: letters rise out of the waveform
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('.hero .char', { yPercent: 115, rotate: 6, duration: 1.4, stagger: 0.035 })
        .from('.hero .lede', { y: 24, opacity: 0, duration: 1 }, '-=0.9')
        .from('.hero .hint, .nav', { opacity: 0, duration: 1 }, '-=0.7')
        .from('.wave', { opacity: 0, scaleY: 0, duration: 1.6, ease: 'power3.out' }, 0)

      // Wave quietens as the hero scrolls away; the name stretches wide
      ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => { energy.current = 1 - self.progress * 0.85 },
      })
      gsap.to('.hero h1', {
        fontVariationSettings: '"wdth" 75, "wght" 800',
        yPercent: -30,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      // About: words light up as you read
      gsap.fromTo('.about .word', { opacity: 0.16 }, {
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: { trigger: '.about p', start: 'top 80%', end: 'bottom 45%', scrub: true },
      })
      gsap.from('.about figure', {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.4,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: '.about', start: 'top 70%' },
      })

      // Experience: the timeline rail draws itself as you read down it
      gsap.from('.timeline-rail', {
        scaleY: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: true },
      })
      gsap.utils.toArray('.job').forEach((job) => {
        gsap.from(job, {
          x: 40, opacity: 0, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: job, start: 'top 80%' },
        })
      })

      // Skills: each group's items cascade in once
      gsap.utils.toArray('.skill-group').forEach((g) => {
        gsap.from(g.querySelectorAll('li'), {
          y: 18, opacity: 0, stagger: 0.03, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: g, start: 'top 85%' },
        })
      })

      // Contact: the email slides together from both sides
      gsap.from('.contact .split-a', { xPercent: -30, opacity: 0, scrollTrigger: { trigger: '.contact', start: 'top 80%', end: 'top 30%', scrub: true } })
      gsap.from('.contact .split-b', { xPercent: 30, opacity: 0, scrollTrigger: { trigger: '.contact', start: 'top 80%', end: 'top 30%', scrub: true } })
    })

    // Work: pinned horizontal track on wide screens
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const track = document.querySelector('.work-track')
      const distance = () => track.scrollWidth - window.innerWidth
      const scroller = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: '.work',
          start: 'top top',
          end: () => '+=' + distance(),
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
      gsap.to('.work-progress span', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.work', start: 'top top', end: () => '+=' + distance(), scrub: true },
      })
      // Each panel's title drifts slower than the panel: parallax inside the track
      gsap.utils.toArray('.panel').forEach((panel) => {
        gsap.from(panel.querySelector('.panel-name'), {
          xPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scroller,
            start: 'left right',
            end: 'left left',
            scrub: true,
          },
        })
        gsap.from(panel.querySelectorAll('.built li'), {
          opacity: 0, y: 16, stagger: 0.06, duration: 0.5,
          scrollTrigger: { trigger: panel, containerAnimation: scroller, start: 'left 60%' },
        })
      })
    })

    mm.add('(max-width: 899px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('.panel').forEach((panel) => {
        gsap.from(panel, { y: 60, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: panel, start: 'top 85%' } })
      })
    })
  }, { scope: root })

  return (
    <div ref={root}>
      <Cursor />
      <a className="skip" href="#work">Skip to work</a>

      <header className="nav">
        <a href="#top" className="nav-name">Revanth Kasula</a>
        <nav aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <Waveform energyRef={energy} />
          <h1 id="hero-title" aria-label="Revanth Kasula">
            {NAME.map((word) => (
              <span className="line" key={word} aria-hidden="true">
                {[...word].map((c, i) => <span className="char" key={i}>{c}</span>)}
              </span>
            ))}
          </h1>
          <p className="lede">
            Full-stack engineer and backend lead. I built <a href="#vyspar">Vyspar AI</a>, a network
            for healthcare providers, and <a href="#heyclo">HeyCLO</a>, an AI you can talk to out loud.
          </p>
          <p className="hint">Move your cursor across the wave</p>
        </section>

        <section className="about" aria-labelledby="about-title">
          <figure>
            <img src={`${import.meta.env.BASE_URL}revanth.jpg`} alt="Portrait of Revanth Kasula" width="560" height="700" />
          </figure>
          <div>
            <h2 id="about-title">About</h2>
            <p>
              {ABOUT.split(' ').map((w, i) => <span className="word" key={i}>{w} </span>)}
            </p>
          </div>
        </section>

        <section className="work" id="work" aria-labelledby="work-title">
          <div className="work-head">
            <h2 id="work-title">Selected work</h2>
            <div className="work-progress" aria-hidden="true"><span /></div>
          </div>
          <div className="work-track">
            {projects.map((p) => (
              <article className={`panel hue-${p.hue}`} id={p.id} key={p.id}>
                <p className="panel-kind">{p.kind}</p>
                <h3 className="panel-name">{p.name}</h3>
                <p className="panel-summary">{p.summary}</p>
                <h4>What I built</h4>
                <ul className="built">
                  {p.built.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <ul className="stack" aria-label={`${p.name} tech stack`}>
                  {p.stack.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </article>
            ))}
            <article className="panel panel-earlier">
              <h3 className="panel-name">Earlier</h3>
              <ul className="earlier">
                {earlier.map((e) => (
                  <li key={e.name}><strong>{e.name}</strong><span>{e.note}</span></li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="experience" id="experience" aria-labelledby="experience-title">
          <h2 id="experience-title">Experience</h2>
          <div className="timeline">
            <span className="timeline-rail" aria-hidden="true" />
            <ol className="jobs">
            {experience.map((job) => (
              <li className="job" key={job.company}>
                <p className="job-period">{job.period}</p>
                <div>
                  <h3>{job.company}</h3>
                  <p className="job-role">{job.role}<span>{job.place}</span></p>
                  {job.points.length > 0 && (
                    <ul>{job.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                  )}
                </div>
              </li>
            ))}
            </ol>
          </div>
        </section>

        <section className="skills" id="skills" aria-labelledby="skills-title">
          <h2 id="skills-title">Skills</h2>
          <div className="skill-grid">
            {skills.map((g) => (
              <div className="skill-group" key={g.group}>
                <h3>{g.group}</h3>
                <ul>{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title">Have something to build? Write to me.</h2>
          <Magnetic>
            <a className="mail" href={`mailto:${links.email}`}>
              <span className="split-a">kasularevanth1</span><span className="split-b">@gmail.com</span>
            </a>
          </Magnetic>
          <ul className="socials">
            <li><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href={links.github} target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href={links.leetcode} target="_blank" rel="noreferrer">LeetCode</a></li>
            <li><a href={links.hackerrank} target="_blank" rel="noreferrer">HackerRank</a></li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Revanth Kasula</p>
        <a href="#top">Back to top</a>
      </footer>
    </div>
  )
}
