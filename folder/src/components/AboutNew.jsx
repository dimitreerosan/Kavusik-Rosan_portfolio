import React from 'react'
import profileImg from '../profile.jpg'

export default function AboutNew() {
  const badges = ['Computer Science & Engineer', 'Privacy Engineering', 'Adversarial ML', 'AI Safety']
  const education = [
    {
      school: 'BE in Computer Science & Engineering',
      place: 'Sri Shakthi Institute of Engineering and Technology',
      years: '2023 - 2027',
    },
    {
      school: 'HSC (State Board)',
      place: 'Senior Secondary Education',
      years: '2021 - 2023',
      extra: 'Percentage: 70%'
    },
    {
      school: 'SSLC (Matriculation)',
      place: 'Secondary Education',
      years: '2020 - 2021',
      extra: 'Result: Pass'
    },
  ]

  return (
    <section id="about" className="py-24 px-8 md:px-16 bg-black border-t border-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-white" style={{ letterSpacing: '-0.04em' }}>About</h2>
          <div className="h-px bg-gray-800 flex-1" />
        </div>

        <div className="w-full rounded-xl border border-gray-900 bg-[#0b0b0b] p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
              <img
                src={profileImg}
                alt="Profile"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                draggable={false}
                onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onMouseDown={(e) => { if (e.button === 2) { e.preventDefault(); e.stopPropagation(); } }}
              />
            </div>

            <div className="flex-1">
              <div className="flex items-baseline gap-4">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white" style={{ letterSpacing: '-0.04em' }}>
                  Kavusik Rosan
                </h3>
              </div>

              <p className="text-gray-400 leading-relaxed mt-3 text-sm md:text-base" style={{ letterSpacing: '-0.01em' }}>
                Computer Science student and privacy engineer specializing in adversarial ML and AI‑resistant
                systems. Creator of Obscura Arcanum - shortlisted for AICTE APF 2025 & Yukti Challenge 2025 - an advanced
                media protection platform combating unauthorized AI exploitation. Campus leader organizing
                hackathons, mentoring 200+ students and building privacy‑first tools: secure mobile apps,
                encrypted P2P platforms and biometric systems. Driven to safeguard digital identities through
                accessible, ethical technology.
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {badges.map((b) => (
                  <span key={b} className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase bg-gray-900 text-gray-300 border border-gray-800">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 mb-8">
          <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase" style={{ letterSpacing: '-0.04em' }}>My Education</h3>
          <div className="h-px bg-gray-800 flex-1" />
        </div>

        <ol className="relative border-l border-gray-800 pl-6 space-y-6">
          {education.map((ed, idx) => (
            <li key={idx} className="relative pl-0 grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-center gap-2 md:gap-6">
              <div className="absolute -left-[28px] top-1.5 w-3 h-3 rounded-full bg-white shadow-md animate-pulse" />
              <div>
                <p className="text-sm md:text-base font-semibold tracking-tight text-white" style={{ letterSpacing: '-0.01em' }}>{ed.school}</p>
                <p className="text-xs md:text-sm text-gray-500">{ed.place}</p>
                {ed.extra && (
                  <p className="text-xs md:text-sm text-gray-500">{ed.extra}</p>
                )}
              </div>
              <span className="text-xs md:text-sm text-gray-500 md:justify-self-end">{ed.years}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
