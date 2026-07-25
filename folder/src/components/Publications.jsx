import React, { useEffect, useRef, useState } from 'react'
import './Publications.css'

const PUBS = [
  {
    num: '01',
    displayNum: '01',
    type: 'Research Paper',
    accent: '#a78bfa',
    year: '2025',
    title: 'Link Shift – Decentralized P2P Communication Platform',
    venue: 'Journal of Research and Review: Future Internet & Hyperconnectivity · HBRP Publication',
    description: "Co-authored a research paper on a decentralized peer-to-peer communication platform featuring end-to-end encryption, anonymous link sharing and privacy-focused digital communication. Addresses key challenges in modern surveillance-resistant networking.",
    tags: ['P2P Networking', 'E2E Encryption', 'Anonymity', 'Privacy Engineering', 'Decentralization'],
    link: 'https://hbrppublication.com/OJS/index.php/JRRFIH/article/view/8999',
    linkLabel: 'View Publication',
    linkDomain: 'hbrppublication.com',
  },
  {
    num: '02',
    displayNum: '02',
    type: 'Technical Blog',
    accent: '#34d399',
    year: '2025',
    title: 'Windsurf AI: Features, Capabilities, Benefits and Use Cases Explained',
    venue: 'AI Blogathon · HCL GUVI Platform',
    description: "Authored a technical blog officially published on HCL GUVI's platform as part of the AI Blogathon. Dives deep into Windsurf AI's feature set, real-world capabilities, and practical use cases — contributing AI-focused insights for the global developer community.",
    tags: ['Artificial Intelligence', 'Developer Tools', 'AI Tooling', 'Windsurf AI', 'Technical Writing'],
    link: 'https://www.guvi.in/blog/windsurf-ai-guide-for-beginners/',
    linkLabel: 'Read Article',
    linkDomain: 'guvi.in',
  },
]

const TICKER_ITEMS = [
  'LINK SHIFT — HBRP PUBLICATION',
  'AI BLOGATHON — HCL GUVI',
  'PEER-TO-PEER ENCRYPTION',
  'PRIVACY-FOCUSED COMMUNICATION',
  'WINDSURF AI — DEVELOPER INSIGHTS',
  'FUTURE INTERNET & HYPERCONNECTIVITY',
]

function PubLink({ href, label, domain }) {
  const handleClick = () => {
    window.open(href, '_blank', 'noopener,noreferrer')
  }
  return (
    <div className="pub-cta-wrap">
      <span className="pub-cta-wrap__platform">{domain}</span>
      <button
        type="button"
        onClick={handleClick}
        className="pub-cta"
        aria-label={label + ' — opens in new tab'}
      >
        <span className="pub-cta__text">{label}</span>
        <span className="pub-cta__iconbox" aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </span>
      </button>
    </div>
  )
}

export default function Publications() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    // Force visible immediately — content-visibility:auto on LazyMount
    // can prevent IntersectionObserver from firing correctly
    setInView(true)
  }, [])

  const v = inView ? ' pub--in' : ''

  return (
    <section ref={sectionRef} className="pub-section" id="publications" aria-labelledby="pub-heading">

      <div className="pub-wrapper">

        {/* ── LABEL ── */}
        <div className={'pub-label pub-reveal pub-d0' + v}>
          <span className="pub-label__index" style={{display:'none'}} />
          <h2 className="pub-label__heading" id="pub-heading">Publications</h2>
          <p className="pub-label__sub">
            Research &amp; technical writing across academic journals and industry platforms.
          </p>
        </div>

        {/* ── SPOTLIGHT BANDS ── */}
        <div className={'pub-bands pub-reveal pub-d1' + v}>
          {PUBS.map((pub) => (
            <article
              key={pub.num}
              className="pub-band"
              style={{ '--band-accent': pub.accent }}
              aria-label={pub.title}
            >
<div className="pub-band__inner">

                {/* Vertical strip hidden */}

                {/* Centre content */}
                <div className="pub-band__content">
                  <div className="pub-band__top">
                    <h3 className="pub-band__title">{pub.title}</h3>
                    <p className="pub-band__venue">{pub.venue}</p>
                  </div>
                  <p className="pub-band__desc">{pub.description}</p>
                  <div className="pub-band__tags" aria-label="Topics">
                    {pub.tags.map(t => <span key={t} className="pub-tag">{t}</span>)}
                  </div>
                </div>

                {/* Right meta */}
                <div className="pub-band__meta">
                  <div className="pub-band__meta-top">
                    <span className="pub-band__meta-year">{pub.year}</span>
                    <span className="pub-band__meta-label">Published</span>
                  </div>
                  <PubLink
                    href={pub.link}
                    label={pub.linkLabel}
                    domain={pub.linkDomain}
                  />
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>

      {/* ── TICKER ── */}
      <div className="pub-ticker" aria-hidden="true">
        <div className="pub-ticker__track">
          {[0, 1, 2].map(r => (
            <span key={r} className="pub-ticker__set">
              {TICKER_ITEMS.map(item => (
                <span key={item} className="pub-ticker__item">
                  <span className="pub-ticker__bullet">&#9670;</span>
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

    </section>
  )
}
