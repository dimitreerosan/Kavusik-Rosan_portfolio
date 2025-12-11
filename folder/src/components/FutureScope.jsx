import React from 'react'

export default function FutureScope() {
  return (
    <section className="py-24 px-8 md:px-16 bg-black border-t border-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-6 mb-6">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-white" style={{ letterSpacing: '-0.04em' }}>Future Scope</h2>
          <div className="h-px bg-gray-800 flex-1" />
        </div>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed" style={{ letterSpacing: '-0.01em' }}>
          I envision a future where AI benefits every individual, not just big systems. My goal is to build
          technology that empowers people, protects identity and respects privacy. I believe AI should enhance
          human freedom and safety while remaining ethical, accessible and useful for everyone.
        </p>
      </div>
    </section>
  )
}
