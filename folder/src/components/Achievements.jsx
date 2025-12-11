import React from 'react'
import Card from './Card'

// Lightweight icon set using inline SVGs to avoid extra deps
const Icon = ({ name, className = 'w-5 h-5 text-white' }) => {
  const common = 'stroke-current';
  switch (name) {
    // Recognition / award
    case 'award':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" aria-hidden="true">
          <circle className={common} cx="12" cy="8" r="4"/>
          <path className={common} d="M10 12 7 21l5-3 5 3-3-9"/>
        </svg>
      )
    // Security / privacy / AI safety
    case 'shield':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" aria-hidden="true">
          <path className={common} d="M12 3l7 3v6c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V6l7-3Z"/>
          <path className={common} d="M9 12l2 2 4-4"/>
        </svg>
      )
    // Marketing / promotions / outreach
    case 'megaphone':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" aria-hidden="true">
          <path className={common} d="M3 10v4m0-4 12-5v14L3 14m6 2 1 4"/>
          <path className={common} d="M18 9l2-1m-2 4 2 1"/>
        </svg>
      )
    // Team / coordination / leadership
    case 'users':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" aria-hidden="true">
          <circle className={common} cx="8" cy="8" r="3"/>
          <path className={common} d="M2 20a6 6 0 0 1 12 0"/>
          <circle className={common} cx="17" cy="9" r="2.5"/>
          <path className={common} d="M13.5 20a5.5 5.5 0 0 1 8.5 0"/>
        </svg>
      )
    // Innovation / hackathon
    case 'sparkles':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" aria-hidden="true">
          <path className={common} d="M12 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4Z"/>
          <path className={common} d="m19 13 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z"/>
        </svg>
      )
    // Editorial / publishing
    case 'newspaper':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" aria-hidden="true">
          <path className={common} d="M4 5h12v14H5a1 1 0 0 1-1-1V5Z"/>
          <path className={common} d="M16 7h3v11a1 1 0 0 1-1 1h-2V7ZM7 9h7M7 12h7M7 15h5"/>
        </svg>
      )
    // Media / video production
    case 'video':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" aria-hidden="true">
          <path className={common} d="M3 7h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"/>
          <path className={common} d="m17 10 4-2v8l-4-2v-4Z"/>
        </svg>
      )
    default:
      return null
  }
}

const Chip = ({ children, color = 'slate' }) => {
  const map = {
    slate: 'bg-white/5 text-gray-300 border-white/10',
    violet: 'bg-violet-500/15 text-violet-200 border-violet-500/30',
    teal: 'bg-teal-500/15 text-teal-200 border-teal-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/30',
  }
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] tracking-widest uppercase border ${map[color] || map.slate}`}>
      {children}
    </span>
  )
}

export default function Achievements() {
  const items = [
    {
      title: 'Obscura Arcanum',
      icon: 'shield',
      detail:
        'Shortlisted for AICTE APF 2025 and Yukti Innovation Challenge 2025, recognizing national-level innovation in AI safety, privacy engineering and adversarial ML.',
      year: '2025',
      role: 'Founder',
      impact: 'Top 100',
    },
    {
      title: 'Department Overall Coordinator',
      icon: 'users',
      detail:
        'Managed end-to-end logistics for technical symposiums and workshops, coordinated 20+ volunteers and liaised between students, faculty and stakeholders.',
      year: '2024',
      role: 'Lead',
      impact: '20+ Team',
    },
    {
      title: 'Department Promotional Coordinator',
      icon: 'megaphone',
      detail:
        'Led marketing campaigns reaching 5,000+ students, created digital content and coordinated with faculty for event growth.',
      year: '2024',
      role: 'Coordinator',
      impact: '5k+ Reach',
    },
    {
      title: 'Department Hackathon Coordinator',
      icon: 'sparkles',
      detail:
        'Organized innovation challenges, mentored student teams and fostered problem‑solving culture across campus.',
      year: '2023',
      role: 'Mentor',
      impact: 'Campus',
    },
    {
      title: 'College Media Guild Executive Video Editor',
      icon: 'video',
      detail:
        'Produced high‑impact promotional content and recognized for enhancing media visibility.',
      year: '2023',
      role: 'Executive',
      impact: 'Media',
    },
    {
      title: 'Department Newsletter & Magazine Head',
      icon: 'newspaper',
      detail:
        'Managed editorial direction, content design and publishing pipeline.',
      year: '2023',
      role: 'Head',
      impact: 'Editorial',
    },
  ]

  return (
    <section id="achievements" className="py-24 px-6 md:px-10 bg-black border-t border-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ letterSpacing: '-0.04em' }}>Achievements</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((it) => (
            <Card key={it.title} ariaLabel={`Achievement: ${it.title}`} noHover>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  {it.year && <Chip color="teal">{it.year}</Chip>}
                  {it.role && <Chip color="violet">{it.role}</Chip>}
                  {it.impact && <Chip color="emerald">{it.impact}</Chip>}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  <span className="inline-flex items-center gap-2">
                    {it.icon && <Icon name={it.icon} className="w-5 h-5 text-white" />}
                    {it.title}
                  </span>
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">{it.detail}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
