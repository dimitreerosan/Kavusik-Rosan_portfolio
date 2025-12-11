import React from 'react'

export default function KeyStrengths() {
  const points = [
    { label: 'AI & Privacy Engineering', desc: 'Adversarial ML, computer vision, cryptography and AI‑resistant systems' },
    { label: 'Rapid Innovation', desc: 'Strong problem‑solving, rapid prototyping and privacy‑first product design' },
    { label: 'Technical Communication', desc: 'Simplifying complex AI concepts for diverse audiences through teaching and workshops' },
    { label: 'Leadership & Mentorship', desc: 'Organizing hackathons, coordinating teams and building ethical AI communities' },
    { label: 'Full‑Stack Development', desc: 'Python, Flutter, TensorFlow; expertise in mobile and web application development' },
    { label: 'Creative Production', desc: 'Video editing, media content creation and digital storytelling' },
    { label: 'Adaptive Learning', desc: 'Continuous exploration of emerging technologies in cybersecurity and AI ethics' },
  ]

  return (
    <section className="py-24 px-8 md:px-16 bg-black border-t border-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-white" style={{ letterSpacing: '-0.04em' }}>Key Strengths</h2>
          <div className="h-px bg-gray-800 flex-1" />
        </div>
        <ul className="space-y-4">
          {points.map((p, i) => (
            <li key={i} className="text-gray-400 text-sm md:text-base leading-relaxed">
              • <span className="text-white font-semibold">{p.label}:</span> {p.desc}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
