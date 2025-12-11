import React from 'react'

export default function Nav() {
  const links = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="w-full py-6 px-8 md:px-16 flex items-center justify-between bg-black/50 backdrop-blur-sm fixed top-0 left-0 z-40">
      <a href="#" className="text-lg font-bold tracking-tight uppercase" style={{letterSpacing: '-0.04em'}}>
        KAVUSIK
      </a>
      <div className="hidden md:flex gap-12">
        {links.map(link => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm font-medium uppercase tracking-tight hover:opacity-60 transition-opacity duration-200"
            style={{letterSpacing: '-0.02em'}}
          >
            {link.label}
          </a>
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
