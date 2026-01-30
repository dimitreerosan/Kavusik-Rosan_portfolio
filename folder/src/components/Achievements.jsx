import React from 'react'
import './Achievements.css'

// Technical Icons using inline SVGs
const Icon = ({ name, className = 'w-6 h-6' }) => {
  const common = 'stroke-current fill-none';
  const w = "1.5";
  switch (name) {
    case 'award':
      return (
        <svg className={className} viewBox="0 0 24 24" strokeWidth={w}>
          <circle cx="12" cy="8" r="4" />
          <path d="M10 12 7 21l5-3 5 3-3-9" />
        </svg>
      )
    case 'shield':
      return (
        <svg className={className} viewBox="0 0 24 24" strokeWidth={w}>
          <path d="M12 3l7 3v6c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V6l7-3Z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'megaphone':
      return (
        <svg className={className} viewBox="0 0 24 24" strokeWidth={w}>
          <path d="M3 10v4m0-4 12-5v14L3 14m6 2 1 4" />
          <path d="M18 9l2-1m-2 4 2 1" />
        </svg>
      )
    case 'users':
      return (
        <svg className={className} viewBox="0 0 24 24" strokeWidth={w}>
          <circle cx="8" cy="8" r="3" />
          <path d="M2 20a6 6 0 0 1 12 0" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M13.5 20a5.5 5.5 0 0 1 8.5 0" />
        </svg>
      )
    case 'mortarboard':
      return (
        <svg className={className} viewBox="0 0 24 24" strokeWidth={w}>
          <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0-1.66 0z" />
          <path d="M22 10v6" />
          <path d="M6 12.5V16a6 3 0 0 0 12 0v-4" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg className={className} viewBox="0 0 24 24" strokeWidth={w}>
          <path d="M12 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4Z" />
          <path d="m19 13 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z" />
        </svg>
      )
    case 'newspaper':
      return (
        <svg className={className} viewBox="0 0 24 24" strokeWidth={w}>
          <path d="M4 5h12v14H5a1 1 0 0 1-1-1V5Z" />
          <path d="M16 7h3v11a1 1 0 0 1-1 1h-2V7ZM7 9h7M7 12h7M7 15h5" />
        </svg>
      )
    case 'video':
      return (
        <svg className={className} viewBox="0 0 24 24" strokeWidth={w}>
          <path d="M3 7h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
          <path d="m17 10 4-2v8l-4-2v-4Z" />
        </svg>
      )
    default:
      return null
  }
}

const StarField = () => {
  const stars = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 2 + 1}px`,
    duration: `${Math.random() * 3 + 2}s`,
    delay: `${Math.random() * 5}s`,
  }));

  return (
    <div className="stars-container">
      {stars.map((s) => (
        <div
          key={`star-${s.id}`}
          className="star"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            '--duration': s.duration,
            '--delay': s.delay,
          }}
        />
      ))}
    </div>
  );
};

export default function Achievements() {
  const items = [
    {
      title: 'HCL GUVI Campus Ambassador',
      icon: 'mortarboard',
      role: 'CAMPUS AMBASSADOR',
      year: '2026',
      impact: 'NATION WIDE',
      detail: 'Selected as a Campus Ambassador for HCL GUVI under Mission Upskill India, promoting industry-relevant tech education and creating impactful learning opportunities across campus.',
      span: 'span-12'
    },
    {
      title: 'Obscura Arcanum',
      icon: 'shield',
      role: 'FOUNDER',
      year: '2025',
      impact: 'TOP 100',
      detail: 'Shortlisted for AICTE APF 2025 and Yukti Innovation Challenge 2025, recognizing national-level innovation in AI safety, privacy engineering and adversarial ML.',
      span: 'span-6'
    },
    {
      title: 'Department Overall Coordinator',
      icon: 'users',
      role: 'LEAD',
      year: '2024',
      impact: '20+ TEAM',
      detail: 'Managed end-to-end logistics for technical symposiums and workshops, coordinated 20+ volunteers and liaised between students, faculty and stakeholders.',
      span: 'span-6'
    },
    {
      title: 'Department Hackathon Coordinator',
      icon: 'award',
      role: 'COORDINATOR',
      year: '2023',

      detail: 'Planned and executed department technical events, workshops, and innovation challenges. Handled scheduling, registrations, and on-ground coordination while mentoring student teams to foster a problem-solving culture across campus.',
      span: 'span-6'
    },
    {
      title: 'Department Promotional Coordinator',
      icon: 'megaphone',
      role: 'COORDINATOR',
      year: '2024',
      detail: 'Led marketing campaigns reaching 5,000+ students, created digital content and coordinated with faculty for event growth.',
      span: 'span-6'
    },

    {
      title: 'College Media Guild Video Editor',
      icon: 'video',
      role: 'EXECUTIVE',
      year: '2023',
      detail: 'Produced high-impact promotional content and recognized for enhancing media visibility.',
      span: 'span-6'
    },
    {
      title: 'Department Newsletter & Magazine Head',
      icon: 'newspaper',
      role: 'HEAD',
      year: '2023',
      impact: 'EDITORIAL',
      detail: 'Managed editorial direction, content design and publishing pipeline.',
      span: 'span-6'
    },
  ]

  return (
    <section id="achievements" className="relative py-20 px-6 md:px-10 bg-[#050505] overflow-hidden">
      <StarField />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-20">
          <span className="system-tag text-white/20 mb-4 tracking-[0.3em]">/// ACHV_SPEC_V2.0</span>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
            Achievements
          </h2>
          <div className="h-px bg-white/10 w-full mt-6"></div>
        </div>

        <div className="blueprint-grid">
          {items.map((it, idx) => (
            <div key={idx} className={`blueprint-module ${it.span}`}>
              <div className="bracket-bottom"></div>
              <div className="noise-overlay"></div>
              <div className="scanline"></div>

              <div className="blueprint-icon-box">
                <Icon name={it.icon} className="w-12 h-12 text-white" />
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap gap-4 mb-3">
                  <span className="system-tag">[ ROLE: {it.role} ]</span>
                  <span className="system-tag">[ YEAR: {it.year} ]</span>
                  {it.impact && <span className="system-tag">[ IMPACT: {it.impact} ]</span>}
                </div>

                <h3 className="blueprint-title">{it.title}</h3>
                <p className="blueprint-desc">{it.detail}</p>

                <div className="mt-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
                  <span className="system-tag mb-0">MODULE_ACTIVE</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
