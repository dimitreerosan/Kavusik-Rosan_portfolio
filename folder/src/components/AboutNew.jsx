import React from 'react'
import { certBadgeWebpUrl, portraitSrcSet, portraitWebpUrl } from '../constants/seo'
import './AboutNew.css'

export default function AboutNew() {
  return (
    <section id="about" className="py-20 px-6 md:px-10 bg-black border-t border-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-6">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase" style={{ letterSpacing: '-0.04em' }}>
            About
          </h2>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="about-card mt-10 rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_60px_rgba(0,0,0,0.6)]">
          <div className="academy-badge">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              <img
                src={certBadgeWebpUrl()}
                alt="Certification badge"
                width="110"
                height="90"
                loading="lazy"
                decoding="async"
                draggable={false}
                className="w-[80px] md:w-[110px] h-auto object-contain"
              />
              <span style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '9px',
                fontWeight: '700',
                letterSpacing: '0.15em',
                color: '#b8bcc4',
                textTransform: 'uppercase',
                textAlign: 'center',
                lineHeight: 1.2,
              }}>
                SEO Certified
              </span>
            </div>
          </div>

          <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8 md:gap-10">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden border border-white/10 bg-black/40 flex-shrink-0 relative">
              <picture>
                <source
                  srcSet={portraitSrcSet()}
                  sizes="(min-width: 768px) 128px, 112px"
                  type="image/webp"
                />
                <img
                  src={portraitWebpUrl()}
                  alt="Kavusik Rosan — official portrait photograph, Final Year Computer Science Engineering student and AI Security Engineer"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width="128"
                  height="128"
                  itemProp="image"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </div>

            <div className="flex-1 min-w-0 about-card-content">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase" style={{ letterSpacing: '-0.03em' }}>
                KAVUSIK ROSAN
              </h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-gray-400 font-sans about-bio" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem' }}>
                Final year Computer Science Engineering student at Sri Shakthi Institute of Engineering and Technology, HCL GUVI Campus Ambassador
                and privacy engineer specializing in adversarial ML and AI-resistant systems. Creator of Obscura Arcanum – shortlisted for
                AICTE APF 2025 & Yukti Challenge 2025 – an advanced media protection platform combating unauthorized AI exploitation. Campus
                leader organizing hackathons,  mentoring 200+ students and building privacy-first tools: secure mobile apps, encrypted P2P
                platforms and biometric systems. Driven to safeguard digital identities through accessible, ethical technology.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <button type="button" className="px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-full bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 transition-colors cursor-default" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Computer Science Engineer
                </button>
                <button type="button" className="px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-full bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 transition-colors cursor-default" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  HCL GUVI Campus Ambassador
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-6">
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase" style={{ letterSpacing: '-0.02em' }}>
            My Education
          </h3>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="mt-8 space-y-8">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="mt-2 w-2 h-2 rounded-full bg-gray-500" />
              <div>
                <p className="text-white font-semibold text-sm md:text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>BE in Computer Science & Engineering</p>
                <p className="text-gray-500 mt-1" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem' }}>Sri Shakthi Institute of Engineering and Technology</p>
              </div>
            </div>
            <p className="text-gray-600 mt-1 whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem' }}>2023 - 2027</p>
          </div>

          <div className="flex items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="mt-2 w-2 h-2 rounded-full bg-gray-500" />
              <div>
                <p className="text-white font-semibold text-sm md:text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>HSC (State Board)</p>
                <p className="text-gray-500 mt-1" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem' }}>Higher Secondary Education</p>
              </div>
            </div>
            <p className="text-gray-600 mt-1 whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem' }}>2021 - 2023</p>
          </div>

          <div className="flex items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="mt-2 w-2 h-2 rounded-full bg-gray-500" />
              <div>
                <p className="text-white font-semibold text-sm md:text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>SSLC (Matriculation)</p>
                <p className="text-gray-500 mt-1" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem' }}>Secondary Education</p>
              </div>
            </div>
            <p className="text-gray-600 mt-1 whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem' }}>2020 - 2021</p>
          </div>
        </div>
      </div>
    </section>
  )
}
