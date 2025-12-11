import React, { useEffect, useState } from 'react'

export default function Hero() {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    const full = 'KAVUSIK ROSAN'
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setTyped(full)
      return
    }
    let i = 0
    let deleting = false
    let pause = 0
    const stepMs = 150 // slower, smoother typing speed
    setTyped('')
    const id = setInterval(() => {
      if (pause > 0) {
        pause -= 1
        return
      }
      if (!deleting) {
        i = Math.min(i + 1, full.length)
        setTyped(full.slice(0, i))
        if (i === full.length) {
          deleting = true
          pause = Math.round(1400 / stepMs) // slightly longer pause at full text
        }
      } else {
        i = Math.max(i - 1, 0)
        setTyped(full.slice(0, i))
        if (i === 0) {
          deleting = false
          pause = Math.round(1000 / stepMs) // pause at empty
        }
      }
    }, stepMs)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen pt-24 pb-24 bg-black select-none overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(1200px 600px at 50% 0%, rgba(255,255,255,0.08), rgba(0,0,0,0) 60%), radial-gradient(800px 400px at 0% 100%, rgba(255,255,255,0.05), rgba(0,0,0,0) 60%), radial-gradient(700px 350px at 100% 50%, rgba(255,255,255,0.06), rgba(0,0,0,0) 60%)',
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.08]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect width="80" height="80" fill="#0b0b0b" />
              <path d="M0 0H80M0 40H80M0 80H80M0 0V80M40 0V80M80 0V80" stroke="#1a1a1a" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg> 
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 md:px-12 text-center gap-8 max-w-5xl mx-auto">
        <div className="relative">
          <div className="pointer-events-none absolute -inset-x-16 -top-12 h-32 blur-3xl opacity-60" style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.18), transparent 60%)' }} />
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none text-white whitespace-nowrap"
            style={{ letterSpacing: '-0.04em' }}
          >
            <span>{typed}</span>
            <span className="w-[2px] h-[0.9em] bg-white inline-block ml-1 align-middle animate-pulse motion-reduce:animate-none" />
          </h1>
        </div>
        <div className="flex gap-4 md:gap-6 justify-center flex-wrap">
          <a
            href="#projects"
            className="text-sm font-semibold uppercase tracking-tight px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors duration-200"
            style={{ letterSpacing: '-0.02em' }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="text-sm font-semibold uppercase tracking-tight px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-200"
            style={{ letterSpacing: '-0.02em' }}
          >
            Contact
          </a>
        </div>
      </div>

      <div className="hidden md:flex flex-col gap-3 absolute left-6 bottom-10 z-10">
        <a
          href="mailto:kavusikbalu2006@gmail.com"
          className="p-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          aria-label="Email"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
        <a
          href="https://github.com/dimitreerosan"
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          aria-label="GitHub"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12 24 5.373 18.627 0 12 0z" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/kavusik-rosan-dimitree-creator-of-obscura-arcanum"
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          aria-label="LinkedIn"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732A1.768 1.768 0 116.5 3.2a1.768 1.768 0 010 3.532zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
          </svg>
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce motion-reduce:animate-none">
        <p className="text-xs text-gray-500 uppercase tracking-widest">Scroll</p>
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
