import React from 'react'

export default function ProjectCard({ project, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group cursor-pointer text-left"
    >
      <div className="relative overflow-hidden rounded-lg mb-4 h-64 bg-gray-200">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = '/images/placeholder.jpg' }}
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
