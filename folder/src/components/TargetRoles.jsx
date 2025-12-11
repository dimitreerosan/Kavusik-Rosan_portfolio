import React from 'react'

export default function TargetRoles() {
  const roles = [
    'Deep Learning',
    'Machine Learning',
    'Computer Vision',
    'Artificial Intelligence',
    'Data Science',
    'Software Development',
    'Ethical and Responsible AI',
    'Mobile App and Web Development',
  ]

  return (
    <section className="py-24 px-8 md:px-16 bg-black border-t border-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-white" style={{ letterSpacing: '-0.04em' }}>Target Roles</h2>
          <div className="h-px bg-gray-800 flex-1" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {roles.map((r) => (
            <div key={r} className="text-gray-300 text-sm md:text-base">• {r}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
