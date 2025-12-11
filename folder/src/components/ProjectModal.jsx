import React, { useEffect } from 'react'

const Chip = ({ children, color = 'slate' }) => {
  const map = {
    slate: 'bg-white/5 text-gray-300 border-white/10',
    violet: 'bg-violet-500/15 text-violet-200 border-violet-500/30',
    teal: 'bg-teal-500/15 text-teal-200 border-teal-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/30',
  }
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] tracking-widest uppercase border ${map[color] || map.slate}`}>
      {children}
    </span>
  )
}

export default function ProjectModal({ open, onClose, project }) {
  useEffect(() => {
    if (open) {
      document.documentElement.classList.add('overflow-hidden')
    } else {
      document.documentElement.classList.remove('overflow-hidden')
    }
    return () => document.documentElement.classList.remove('overflow-hidden')
  }, [open])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.()
  }

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleOverlayClick}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-300`}
        onClick={handleOverlayClick}
      >
        <div
          className={`relative w-[95vw] md:w-[65vw] max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0b0b0b]/95 text-white shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-transform duration-300 ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" aria-hidden="true">
              <path className="stroke-current" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {/* Content */}
          {project && (
            <div className="flex flex-col">
              {/* Image */}
              <div className="relative w-full aspect-[16/9] bg-black rounded-t-2xl overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                  onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                />
              </div>

              {/* Meta */}
              <div className="p-5 md:p-6 text-left">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {project.year && <Chip color="teal">{project.year}</Chip>}
                  {project.tags?.map((t) => (
                    <Chip key={t} color="slate">{t}</Chip>
                  ))}
                  {project.role && <Chip color="violet">{project.role}</Chip>}
                  {project.impact && <Chip color="emerald">{project.impact}</Chip>}
                </div>
                <h3 className="text-left text-2xl md:text-3xl font-black tracking-tight mb-3" style={{ letterSpacing: '-0.02em' }}>{project.title}</h3>
                <p className="text-left text-gray-300 text-sm md:text-base leading-relaxed">{project.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
