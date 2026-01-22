import React from 'react'

export default function KeyStrengths() {
  const row1 = [
    "AI & PRIVACY ENGINEERING",
    "RAPID INNOVATION",
    "TECHNICAL COMMUNICATION",
    "LEADERSHIP & MENTORSHIP"
  ]

  const row2 = [
    "FULL-STACK DEVELOPMENT",
    "CREATIVE PRODUCTION",
    "ADAPTIVE LEARNING",
    "ADVERSARIAL ML"
  ]

  return (
    <section className="py-20 bg-black overflow-hidden border-t border-gray-900 border-b relative">
      <style>{`
        :root {
          --ks-marquee-duration: 28s;
        }
        @keyframes scroll-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes scroll-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .marquee-track {
          width: max-content;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        .marquee-group {
          flex: 0 0 auto;
          min-width: max-content;
        }
        .animate-scroll-left {
          animation: scroll-left var(--ks-marquee-duration) linear infinite;
          will-change: transform;
        }
        .animate-scroll-right {
          animation: scroll-right var(--ks-marquee-duration) linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-blue-900/5 pointer-events-none" />

      {/* Row 1 - Scrolling Left */}
      <div className="w-full overflow-hidden mb-8">
        <div className="flex whitespace-nowrap animate-scroll-left marquee-track">
          <div className="marquee-group flex items-center gap-8 md:gap-16 pr-8 md:pr-16">
            {row1.map((item, i) => (
              <div key={i} className="flex items-center">
                <span
                  className="text-6xl md:text-8xl font-black text-[#2563EB] whitespace-nowrap"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {item}
                </span>
                <svg className="w-8 h-8 md:w-12 md:h-12 text-gray-800 ml-8 md:ml-16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            ))}
          </div>
          <div className="marquee-group flex items-center gap-8 md:gap-16 pr-8 md:pr-16" aria-hidden="true">
            {row1.map((item, i) => (
              <div key={i} className="flex items-center">
                <span
                  className="text-6xl md:text-8xl font-black text-[#2563EB] whitespace-nowrap"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {item}
                </span>
                <svg className="w-8 h-8 md:w-12 md:h-12 text-gray-800 ml-8 md:ml-16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 - Scrolling Right */}
      <div className="w-full overflow-hidden">
        <div className="flex whitespace-nowrap animate-scroll-right marquee-track">
          <div className="marquee-group flex items-center gap-8 md:gap-16 pr-8 md:pr-16">
            {row2.map((item, i) => (
              <div key={i} className="flex items-center">
                <span
                  className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-white/5 whitespace-nowrap"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    WebkitTextStroke: '1px rgba(255,255,255,0.2)'
                  }}
                >
                  {item}
                </span>
                <svg className="w-8 h-8 md:w-12 md:h-12 text-blue-900/30 ml-8 md:ml-16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
            ))}
          </div>
          <div className="marquee-group flex items-center gap-8 md:gap-16 pr-8 md:pr-16" aria-hidden="true">
            {row2.map((item, i) => (
              <div key={i} className="flex items-center">
                <span
                  className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-white/5 whitespace-nowrap"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    WebkitTextStroke: '1px rgba(255,255,255,0.2)'
                  }}
                >
                  {item}
                </span>
                <svg className="w-8 h-8 md:w-12 md:h-12 text-blue-900/30 ml-8 md:ml-16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
