import React from 'react'

export default function ProjectCard({ project, onClick }) {
  const handleImageHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.transform = 'scale(1.1) translate3d(0, 0, 0)'
      e.currentTarget.style.filter = 'brightness(1.06)'
    } else {
      e.currentTarget.style.transform = 'scale(1) translate3d(0, 0, 0)'
      e.currentTarget.style.filter = 'brightness(1)'
    }
  }

  return (
    <button
      onClick={onClick}
      className="group cursor-pointer text-left"
    >
      <div className="relative overflow-hidden rounded-lg mb-4 h-64 bg-gray-200">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          style={{
            willChange: 'transform, filter',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => handleImageHover(e, true)}
          onMouseLeave={(e) => handleImageHover(e, false)}
          onError={(e) => {
            const img = e.currentTarget
            img.onerror = null
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
          }}
        />
      </div>
      <span className="inline-block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        {project.category}
      </span>
      <h3 className="text-xl font-bold mb-2 group-hover:opacity-70 transition-opacity">
        {project.title}
      </h3>
      <p className="text-gray-600 text-sm line-clamp-2">
        {project.description}
      </p>
    </button>
  )
}
