import React from 'react'

export default function Nav() {
  const links = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="w-full py-6 px-8 md:px-16 flex items-center justify-between bg-black/50 backdrop-blur-sm fixed top-0 left-0 z-40">
      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-lg font-bold tracking-tight uppercase bg-transparent border-none p-0" style={{letterSpacing: '-0.04em'}}>
        KAVUSIK
      </button>
      <div className="hidden md:flex gap-12">
          {links.map(link => (
            <button
              key={link.label}
              type="button"
              onClick={() => {
                const el = typeof link.href === 'string' && link.href.startsWith('#') ? document.querySelector(link.href) : null
                if (el) el.scrollIntoView({ behavior: 'smooth' })
                else if (typeof link.href === 'string') window.location.href = link.href
              }}
              className="text-sm font-medium uppercase tracking-tight hover:opacity-60 transition-opacity duration-200 bg-transparent border-none p-0"
              style={{letterSpacing: '-0.02em'}}
            >
              {link.label}
            </button>
          ))}
      </div>
      <div className="md:hidden flex flex-col gap-1 cursor-pointer">
        <div className="w-6 h-0.5 bg-white"></div>
        <div className="w-6 h-0.5 bg-white"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </div>
    </nav>
  )
}
