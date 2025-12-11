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
      label: 'Programming Languages',
      value: 'Python, Dart (Flutter), JavaScript, TypeScript',
      level: 'Advanced',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" />
        </svg>
      ),
    },
    {
      label: 'AI / ML Frameworks',
      value: 'PyTorch, TensorFlow, Scikit-learn, OpenCV',
      level: 'Advanced',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="4" r="1.5" fill="currentColor" />
          <circle cx="6" cy="12" r="1.5" fill="currentColor" />
          <circle cx="18" cy="12" r="1.5" fill="currentColor" />
          <circle cx="12" cy="20" r="1.5" fill="currentColor" />
          <path strokeWidth="1.5" d="M12 5.5v3M7.5 11.5h3M13.5 11.5h3M12 18.5v-3M10 12l-2 6M14 12l2 6" />
        </svg>
      ),
    },
    {
      label: 'Mobile Development',
      value: 'Flutter and Android Studio',
      level: 'Advanced',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="7" y="2" width="10" height="20" rx="2" />
        </svg>
      ),
    },
    {
      label: 'Security & Privacy Engineering',
      value:
        'Cryptography Libraries, Encryption Protocols, Adversarial Machine Learning, AI‑Resistant Media Protection, Identity Distortion Protocols',
      level: 'Advanced',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 2L4 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4z" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      ),
    },
    {
      label: 'Web Technologies',
      value: 'HTML, CSS, Bootstrap, React, Firebase, Node.js',
      level: 'Advanced',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
    {
      label: 'Networking & Communication',
      value:
        'WebRTC, Serverless P2P Connections, Real‑time Encrypted Messaging & File Transfer',
      level: 'Intermediate',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="6" cy="6" r="1.5" fill="currentColor" />
          <circle cx="18" cy="6" r="1.5" fill="currentColor" />
          <circle cx="12" cy="18" r="1.5" fill="currentColor" />
          <path strokeWidth="1.5" d="M7 7l5 10M17 7l-5 10M6 6h12" />
        </svg>
      ),
    },
    {
      label: 'Computer Vision & Biometrics',
      value:
        'Facial Landmarking, Object/Region Segmentation (YOLO / Mask R‑CNN / U‑Net), Re‑identification Defense, Deepfake & Synthetic Prevention',
      level: 'Advanced',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" strokeWidth="2" />
        </svg>
      ),
    },
    {
      label: 'Tools & Platforms',
      value:
        'Git, GitHub, VS Code, Windsurf, Cursor, Coder, Trae, Void, Android Studio, Supabase and Docker',
      level: 'Advanced',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 1 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
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
              <p className="text-gray-400 text-sm leading-relaxed">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
