import React from 'react'

const Icon = ({ children }) => (
  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
    {children}
  </div>
)

const Badge = ({ level }) => {
  const map = {
    Advanced: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    Intermediate: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    Beginner: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  }
  return (
    <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded border ${map[level] || 'bg-white/10 text-gray-300 border-white/10'}`}>
      {level}
    </span>
  )
}

export default function TechnicalSkills() {
  const skills = [
    {
      label: 'Languages',
      value: 'Python',
      level: 'Advanced',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" />
        </svg>
      ),
    },
    {
      label: 'Mobile & Web Development',
      value: 'React, Bootstrap, Dart (Flutter), Firebase',
      level: 'Advanced',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="14" y="4" width="7" height="14" rx="2" strokeWidth="2" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17.5 16h0" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 18h9" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 14h5" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h7a2 2 0 0 1 2 2v8" />
        </svg>
      ),
    },
    {
      label: 'AI / ML',
      value: 'TensorFlow, PyTorch, Scikit-learn, OpenCV',
      level: 'Intermediate',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 3v3M15 3v3M9 18v3M15 18v3" />
          <rect x="7" y="7" width="10" height="10" rx="2" strokeWidth="2" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 9h3M4 15h3M17 9h3M17 15h3" />
        </svg>
      ),
    },
    {
      label: 'Computer Vision',
      value: 'YOLO, Mask R-CNN, Deepfake Prevention, Facial Landmarks',
      level: 'Intermediate',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 7h4l2-2h6l2 2h4v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
          <circle cx="12" cy="13" r="3" strokeWidth="2" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 13h0M15 13h0" />
        </svg>
      ),
    },
    {
      label: 'Security & Cryptography',
      value: 'Cryptography, Encryption Protocols, Adversarial ML',
      level: 'Intermediate',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 7l3 1.5v2.5c0 2-1.5 4-3 5-1.5-1-3-3-3-5V8.5l3-1.5z" />
        </svg>
      ),
    },
    {
      label: 'Tools & Platforms',
      value: 'Git, Supabase, Firebase, VS Code, Android Studio',
      level: 'Advanced',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.12 2.12 0 1 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9l-3.8 3.8z" />
        </svg>
      ),
    },
    {
      label: 'AI Coding Tools',
      value: 'Claude, GitHub Copilot, Cursor, Windsurf, Gemini',
      level: 'Advanced',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 3l1.2 3.7L17 8l-3.8 1.3L12 13l-1.2-3.7L7 8l3.8-1.3L12 3z" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 12l.8 2.4L22 15l-2.2.6L19 18l-.8-2.4L16 15l2.2-.6L19 12z" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 14l.8 2.4L8 17l-2.2.6L5 20l-.8-2.4L2 17l2.2-.6L5 14z" />
        </svg>
      ),
    },
    {
      label: 'Backend / APIs',
      value: 'Node.js, REST APIs (Express), Authentication',
      level: 'Intermediate',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="4" y="4" width="16" height="6" rx="2" strokeWidth="2" />
          <rect x="4" y="14" width="16" height="6" rx="2" strokeWidth="2" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 7h0M8 17h0" />
        </svg>
      ),
    },
    {
      label: 'Digital Marketing & SEO',
      value: 'Keyword Research, On-Page SEO, Technical SEO, Content Optimization, Search Analytics, Website Optimization, Organic Growth Strategies, Digital Branding, Google Search Console',
      level: 'Advanced',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" strokeWidth="2" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 11h6M11 8v6" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-24 px-6 md:px-10 bg-black border-t border-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white" style={{ letterSpacing: '-0.04em' }}>Technical Skills</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((s) => (
            <div key={s.label} className="group rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-colors p-4">
              <div className="flex items-center gap-3 mb-2">
                <Icon>{s.icon}</Icon>
                <h3 className="text-white font-semibold tracking-tight">{s.label}</h3>
                <div className="ml-auto"><Badge level={s.level} /></div>
              </div>
              <p className="text-gray-400 text-xs font-poppins leading-relaxed">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
