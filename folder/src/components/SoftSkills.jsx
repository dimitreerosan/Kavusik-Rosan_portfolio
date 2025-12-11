import React from 'react'

export default function SoftSkills() {
  const skills = [
    'Problem Solving',
    'Team Leadership',
    'Public Speaking',
    'Critical Thinking & Decision Making',
    'Creative Design',
    'Rapid Prototyping',
  ]

  return (
    <section className="py-24 px-8 md:px-16 bg-black border-t border-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-white" style={{ letterSpacing: '-0.04em' }}>Soft Skills</h2>
          <div className="h-px bg-gray-800 flex-1" />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skills.map((s) => (
            <li key={s} className="text-gray-300 text-sm md:text-base">• {s}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
