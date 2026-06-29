import React, { useState, useEffect, useRef } from 'react'

export default function FutureScope() {
  const [stage, setStage] = useState('IDLE') // IDLE, TYPING, EXECUTING, DONE
  const [typedCommand, setTypedCommand] = useState('')
  const [showOutput, setShowOutput] = useState(false)
  const sectionRef = useRef(null)

  const command = "./reveal_trajectory.sh --secure"

  // macOS Traffic Lights
  const controls = [
    { color: 'bg-[#FF5F57]', border: 'border-[#E0443E]' }, // Close (Red)
    { color: 'bg-[#FEBC2E]', border: 'border-[#D89E24]' }, // Minimize (Yellow)
    { color: 'bg-[#28C840]', border: 'border-[#1AAB29]' }, // Maximize (Green)
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && stage === 'IDLE') {
          startTerminalSequence()
        }
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [stage])

  const startTerminalSequence = async () => {
    setStage('TYPING')

    // Simulate typing the command
    for (let i = 0; i <= command.length; i++) {
      // Random typing speed for realism
      await new Promise(r => setTimeout(r, 50 + Math.random() * 50))
      setTypedCommand(command.slice(0, i))
    }

    await new Promise(r => setTimeout(r, 500))
    setStage('EXECUTING')

    await new Promise(r => setTimeout(r, 800))
    setShowOutput(true)
    setStage('DONE')
  }

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 md:px-10 bg-black border-t border-gray-900 relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 transition-transform duration-700">

        {/* Terminal Window */}
        <div className="bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/80 ring-1 ring-white/5">

          {/* Header / Title Bar */}
          <div className="bg-[#2D2B2E] px-4 py-3 flex items-center justify-between border-b border-white/5 relative">
            {/* Traffic Lights */}
            <div className="flex gap-2">
              {controls.map((c, i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${c.color} ${c.border}`} />
              ))}
            </div>

            {/* Title (Centered) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center opacity-80">
              <span className="text-gray-400 text-xs font-medium font-mono flex items-center gap-2">
                {/* Folder Icon SVG */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500">
                  <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
                </svg>
                Future Scope
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8 font-mono text-sm md:text-base min-h-[420px] text-gray-300 selection:bg-gray-700 leading-relaxed">

            {/* Command Prompt Line */}
            <div className="flex flex-wrap items-center gap-2 mb-6 text-sm md:text-base">
              <span className="text-emerald-400 font-bold">➜</span>
              <span className="text-cyan-400 font-bold">~</span>
              <span className="text-[#a5b6cf]">user@rozz-portfolio %</span>
              <span className="text-white tracking-wide">{typedCommand}</span>
              {stage === 'TYPING' && (
                <span className="w-2.5 h-5 bg-gray-500 animate-pulse block" />
              )}
            </div>

            {/* Output */}
            <div className={`transition-opacity duration-700 ${showOutput ? 'opacity-100' : 'opacity-0'}`}>
              {showOutput && (
                <div className="space-y-8">
                  <div className="text-gray-500 text-xs font-mono tracking-wide">
                    [System] Authenticated. Decrypting vision packet...
                  </div>

                  <div className="pl-4 border-l-2 border-indigo-500/20 space-y-4">
                    <p className="leading-relaxed text-[#e0e0e0]">
                      <span className="text-gray-500">"</span>I envision a future where <span className="text-white font-bold">AI benefits every individual</span> not just big systems.<span className="text-gray-500">"</span>
                    </p>
                    <p className="leading-relaxed text-[#e0e0e0]">
                      <span className="text-gray-500">"</span>My goal is to build technology that <span className="text-cyan-300 font-medium">empowers people</span>, protects identity and <span className="text-cyan-300 font-medium">respects privacy</span>.<span className="text-gray-500">"</span>
                    </p>
                    <p className="leading-relaxed text-[#e0e0e0]">
                      <span className="text-gray-500">"</span>AI should enhance human freedom and safety while remaining <span className="text-emerald-300 font-medium">ethical</span>, <span className="text-emerald-300 font-medium">accessible</span> and <span className="text-emerald-300 font-medium">useful</span> for everyone.<span className="text-gray-500">"</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-8 opacity-80">
                    <span className="text-emerald-400 font-bold">➜</span>
                    <span className="text-cyan-400 font-bold">~</span>
                    <span className="text-[#a5b6cf]">user@rozz-portfolio %</span>
                    <span className={`w-2.5 h-5 bg-gray-400 animate-pulse block ${stage === 'DONE' ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
