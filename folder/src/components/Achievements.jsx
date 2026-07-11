import { useEffect, useRef, useState } from 'react'
import './Achievements.css'

const items = [
  {
    role: 'Campus Ambassador',
    year: '2026',
    impact: 'Nation Wide',
    title: 'HCL GUVI Campus Ambassador',
    detail:
      'Selected as a Campus Ambassador for HCL GUVI under Mission Upskill India, promoting industry-relevant tech education and creating impactful learning opportunities across campus, while fostering a culture of innovation and technological advancement among students and faculty. This role enables me to bridge the gap between academia and industry, empowering students with the latest technological skills and knowledge to excel in their careers.',
  },
  {
    role: 'Founder',
    year: '2025',
    impact: 'Top 100',
    title: 'Obscura Arcanum',
    detail:
      'Shortlisted for AICTE APF 2025 and Yukti Innovation Challenge 2025, recognizing national-level innovation in AI safety, privacy engineering and adversarial ML.',
  },
  {
    role: 'Lead',
    year: '2024',
    impact: '200+',
    title: 'Overall & Promotional Coordinator',
    detail:
      'Orchestrated logistics for technical department symposiums and workshops, managing a team of 20+ volunteers and executing campaigns that reached 5,000+ students.',
  },
  {
    role: 'Executive',
    year: '2023',
    title: 'College Media Guild Video Editor',
    detail:
      'Produced high-impact promotional content and recognized for enhancing media visibility.',
  },
  {
    role: 'Head',
    year: '2023',
    impact: 'Editorial',
    title: 'Newsletter & Magazine Head',
    detail:
      'Managed Department Newsletter & Magazine, overseeing editorial direction, content design and publishing pipeline.',
  },
]

const ENTER_PX        = 220
const HOLD_PX         = 350
const EXIT_PX         = 180
const ZONE_PX         = ENTER_PX + HOLD_PX + EXIT_PX  // 750
const TOTAL_SCROLL_PX = ZONE_PX * items.length
const MOBILE_BREAKPOINT = 768

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)) }
function easeOutExpo(t)   { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t) }
function easeInExpo(t)    { return t === 0 ? 0 : Math.pow(2, 10 * t - 10) }

function getItemState(i, scrolled) {
  const zoneStart  = i * ZONE_PX
  const enterStart = zoneStart
  const holdStart  = enterStart + ENTER_PX
  const exitStart  = holdStart  + HOLD_PX
  const exitEnd    = exitStart  + EXIT_PX

  if (scrolled < enterStart)
    return { phase: 'before', progress: 0, opacity: 0, translateY: 40 }

  if (scrolled < holdStart) {
    const raw = (scrolled - enterStart) / ENTER_PX
    const t   = easeOutExpo(raw)
    return {
      phase: 'enter', progress: t, opacity: t,
      translateY: (1 - t) * 40, blur: (1 - t) * 6,
      meta:  clamp((t - 0.00) / 0.50, 0, 1),
      title: clamp((t - 0.20) / 0.55, 0, 1),
      body:  clamp((t - 0.40) / 0.60, 0, 1),
    }
  }

  if (scrolled < exitStart)
    return { phase: 'hold', progress: 1, opacity: 1, translateY: 0, blur: 0, meta: 1, title: 1, body: 1 }

  if (scrolled < exitEnd) {
    const raw = (scrolled - exitStart) / EXIT_PX
    const t   = easeInExpo(raw)
    return {
      phase: 'exit', progress: 1 - t, opacity: 1 - t,
      translateY: -t * 40, blur: t * 6,
      meta:  clamp(1 - (t - 0.00) / 0.60, 0, 1),
      title: clamp(1 - (t - 0.20) / 0.55, 0, 1),
      body:  clamp(1 - (t - 0.40) / 0.50, 0, 1),
    }
  }

  return { phase: 'after', progress: 0, opacity: 0, translateY: -40 }
}

export default function Achievements() {
  const sectionRef    = useRef(null)
  const rafRef        = useRef(null)
  const sectionTopRef = useRef(null)
  const [scrolled, setScrolled] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const cacheTop = () => {
    const el = sectionRef.current
    if (!el) return
    sectionTopRef.current = el.getBoundingClientRect().top + window.scrollY
  }

  const update = () => {
    if (window.innerWidth < MOBILE_BREAKPOINT) { setIsMobile(true); return }
    setIsMobile(false)
    if (sectionTopRef.current === null) cacheTop()
    if (sectionTopRef.current === null) return
    const s = clamp(window.scrollY - sectionTopRef.current, 0, TOTAL_SCROLL_PX)
    setScrolled(s)
  }

  const onScroll = () => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => { rafRef.current = null; update() })
  }

  useEffect(() => {
    const timers = [50, 150, 300, 600].map((d) =>
      setTimeout(() => { cacheTop(); update() }, d)
    )
    window.addEventListener('scroll', onScroll, { passive: true })
    const onResize = () => { sectionTopRef.current = null; cacheTop(); update() }
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const activeIdx = !isMobile
    ? items.reduce((found, _, i) => {
        const s = getItemState(i, scrolled)
        return (s.phase === 'hold' || s.phase === 'enter' || s.phase === 'exit') ? i : found
      }, 0)
    : 0

  const activeState = getItemState(activeIdx, scrolled)
  const overallPct  = clamp((scrolled / TOTAL_SCROLL_PX) * 100, 0, 100)

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="achv-section"
      style={isMobile ? {} : { height: `calc(100vh + ${TOTAL_SCROLL_PX}px)` }}
    >
      <div className="achv-sticky">
        {/* Scanlines */}
        <div className="achv-scanlines" aria-hidden="true" />

        <div className="achv-inner">

          {/* ── LEFT PANEL ── */}
          <div className="achv-left">
            <div className="achv-left__grid" aria-hidden="true" />
        
            {/* Ghost number */}
            {!isMobile && (
              <div
                className="achv-ghost-num"
                aria-hidden="true"
                style={{ opacity: 0.18 + activeState.progress * 0.12 }}
              >
                {String(activeIdx + 1).padStart(2, '0')}
              </div>
            )}

            {/* Corner brackets */}
            <div className="achv-corner achv-corner--tl" aria-hidden="true" />
            <div className="achv-corner achv-corner--br" aria-hidden="true" />

            {/* Heading */}
            <h2 className="achv-heading">
              ACHIEVEMENTS
            </h2>





            {/* Vertical progress track */}
            {!isMobile && (
              <div className="achv-vtrack" aria-hidden="true">
                <div className="achv-vtrack__fill" style={{ height: `${overallPct}%` }} />
              </div>
            )}


          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="achv-right">
            <div className="achv-frame achv-frame--tl" aria-hidden="true" />
            <div className="achv-frame achv-frame--tr" aria-hidden="true" />
            <div className="achv-frame achv-frame--bl" aria-hidden="true" />
            <div className="achv-frame achv-frame--br" aria-hidden="true" />



            <div className="achv-viewport">
              {isMobile
                ? items.map((item) => (
                    <div key={item.title} className="achv-item-mobile">
                      <div className="achv-meta">
                        <span className="achv-meta__tag">[ ROLE: {item.role.toUpperCase()} ]</span>
                        <span className="achv-meta__tag">[ YEAR: {item.year} ]</span>
                        {item.impact && (
                          <span className="achv-meta__tag">[ IMPACT: {item.impact.toUpperCase()} ]</span>
                        )}
                      </div>
                      <h3 className="achv-title">{item.title}</h3>
                      <p className="achv-detail">{item.detail}</p>
                    </div>
                  ))
                : items.map((item, i) => {
                    const s = getItemState(i, scrolled)
                    if (s.phase === 'before' || s.phase === 'after') return null

                    return (
                      <div
                        key={item.title}
                        className={`achv-item${s.phase === 'hold' ? ' achv-item--locked' : ''}`}
                        style={{
                          opacity: s.opacity,
                          transform: `translate(-50%, calc(-50% + ${s.translateY}px))`,
                          filter: s.blur ? `blur(${s.blur}px)` : 'none',
                        }}
                      >
                        <div
                          className="achv-meta"
                          style={{
                            opacity: s.meta ?? s.opacity,
                            transform: `translateY(${(1 - (s.meta ?? 1)) * 18}px)`,
                          }}
                        >
                          <span className="achv-meta__tag">[ ROLE: {item.role.toUpperCase()} ]</span>
                          <span className="achv-meta__tag">[ YEAR: {item.year} ]</span>
                          {item.impact && (
                            <span className="achv-meta__tag">[ IMPACT: {item.impact.toUpperCase()} ]</span>
                          )}
                        </div>
                        <h3
                          className="achv-title"
                          style={{
                            opacity: s.title ?? s.opacity,
                            transform: `translateY(${(1 - (s.title ?? 1)) * 22}px)`,
                          }}
                        >
                          {item.title}
                        </h3>
                        <div
                          className="achv-item__body"
                          style={{
                            opacity: s.body ?? s.opacity,
                            transform: `translateY(${(1 - (s.body ?? 1)) * 26}px)`,
                          }}
                        >
                          <p className="achv-detail">{item.detail}</p>
                        </div>

                        {s.phase === 'hold' && (
                          <div className="achv-lock-bar" aria-hidden="true">
                            <div
                              className="achv-lock-bar__fill"
                              style={{
                                width: `${clamp(
                                  ((scrolled - (i * ZONE_PX + ENTER_PX)) / HOLD_PX) * 100,
                                  0, 100
                                )}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}
            </div>
          </div>

        </div>
        {/* end achv-inner */}

        {/* Bottom ticker tape */}
        {!isMobile && (
          <div className="achv-ticker" aria-hidden="true">
            <div className="achv-ticker__track">
              {[...Array(3)].map((_, r) => (
                <span key={r} className="achv-ticker__set">
                  {items.map((item) => (
                    <span key={item.title} className="achv-ticker__item">
                      <span className="achv-ticker__bullet">◆</span>
                      {item.title.toUpperCase()}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
