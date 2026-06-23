import React, { useMemo, useState, useCallback } from 'react'

import obscuraImg from '../Obscura Arcanum.jpg'

import linkShiftImg from '../Link shift.jfif'

import deeplynkImg from '../deeplynk.jpg'

import AutoformAssistImg from '../Autoform Assist.jpg'

import Card from './Card'

import ProjectModal from './ProjectModal'



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



export default function ProjectsGrid() {

  const [open, setOpen] = useState(false)

  const [selected, setSelected] = useState(null)



  const projects = useMemo(() => [

    {

      id: 6,

      title: 'Obscura Arcanum',

      description:

        'Anti-AI image protection system using adversarial ML with encryption. Shortlisted among top 100 nationally (AICTE APF 2025). Built with Python, TensorFlow, cryptography libs.',

      image: obscuraImg,

      year: 'APR 2024',

      tags: ['AI/ML', 'SECURITY'],

      role: 'Lead',

      impact: 'Top 100',

      live: true,

      link: '#',

    },

    {

      id: 2,

      title: 'Autoform Assist',

      description:

        'AI-powered mobile app that auto-fills forms using OCR and NLP for faster, accurate submissions.',

      image: AutoformAssistImg,

      year: 'NOV 2025',

      tags: ['MOBILE', 'OCR/NLP'],

      role: 'Developer',

      impact: 'UX +',

      completed: true,

      link: '#',

    },

    {

      id: 3,

      title: 'DeepLynk',

      description:

        'Android safety app that scans links and media before opening to block hidden trackers, ads and phishing.',

      image: deeplynkImg,

      year: 'JUL 2025',

      tags: ['ANDROID', 'SECURITY'],

      role: 'Engineer',

      impact: 'Safety',

      completed: true,

      link: '#',

    },

    {

      id: 4,

      title: 'Link Shift',

      description:

        'Serverless end-to-end encrypted P2P messaging and file transfer using direct WebRTC device-to-device connection.',

      image: linkShiftImg,

      year: 'JUL 2025',

      tags: ['P2P', 'WEBRTC'],

      role: 'Full-stack',

      impact: 'E2E',

      completed: true,

      link: '#',

    },

  ], [])



  const sortedProjects = useMemo(() => {

    const monthIndex = {

      JAN: 0,

      FEB: 1,

      MAR: 2,

      APR: 3,

      MAY: 4,

      JUN: 5,

      JUL: 6,

      AUG: 7,

      SEP: 8,

      OCT: 9,

      NOV: 10,

      DEC: 11,

    }



    const toSortable = (yearStr) => {

      if (!yearStr) return 0

      const parts = String(yearStr).trim().toUpperCase().split(/\s+/)

      if (parts.length === 1) {

        const y = Number(parts[0])

        return Number.isFinite(y) ? new Date(y, 0, 1).getTime() : 0

      }



      const [m, yRaw] = parts

      const y = Number(yRaw)

      const mi = monthIndex[m]

      if (!Number.isFinite(y) || mi === undefined) return 0

      return new Date(y, mi, 1).getTime()

    }



    return [...projects].sort((a, b) => toSortable(a.year) - toSortable(b.year))

  }, [projects])



  const handleOpen = useCallback((project) => {

    setSelected(project)

    setOpen(true)

  }, [])



  const handleClose = useCallback(() => {

    setOpen(false)

    setTimeout(() => setSelected(null), 300) // wait for fade-out

  }, [])



  return (

    <section id="projects" className="py-24 px-6 md:px-10 bg-black border-t border-gray-900">

      <div className="max-w-6xl mx-auto w-full">

        <div className="mb-12">

          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ letterSpacing: '-0.04em' }}>PROJECT</h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

          {sortedProjects.map((p) => (

            <Card

              key={p.id}

              as="button"

              type="button"

              onClick={() => handleOpen(p)}

              ariaLabel={`Open project: ${p.title}`}

            >

              <div className="overflow-hidden">

                <div className="relative w-full aspect-[16/9] bg-gray-900 overflow-hidden">

                  {/* Shimmer effect */}

                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-pulse" />



                  {p.live && (
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-2 rounded-full bg-black/60 px-2.5 py-1 border border-white/10">
                      <span className="relative inline-flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                      </span>
                      <span className="text-xs font-semibold tracking-widest uppercase text-white/90 font-sans">Live</span>
                    </div>
                  )}

                  <img
                    src={p.image}
                    alt={`${p.title} - Project by Kavusik Rosan`}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    width="1280"
                    height="720"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500 motion-reduce:transition-none z-10"
                    draggable={false}
                    onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onLoad={(e) => e.target.style.opacity = 1}
                    style={{ opacity: 0 }}
                  />
                </div>
              </div>
              <div className="p-4 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <Chip color="teal">{p.year}</Chip>
                  {p.tags?.map((t) => (
                    <Chip key={t} color="slate">{t}</Chip>
                  ))}
                  {p.role && <Chip color="violet">{p.role}</Chip>}
                  {p.impact && <Chip color="emerald">{p.impact}</Chip>}
                  
                  {p.completed && !p.live && (
                    <div className="flex items-center gap-2 rounded-full bg-white/5 px-2 py-0.5 border border-white/10">
                      <span className="relative inline-flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                      </span>
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-white/70 font-sans">Completed</span>
                    </div>
                  )}
                </div>

                <h3 className="text-left text-xl md:text-2xl font-black tracking-tight text-white mb-2" style={{ letterSpacing: '-0.02em' }}>{p.title}</h3>
                <p className="text-left text-gray-400 leading-relaxed font-sans" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem' }}>{p.description}</p>
              </div>

            </Card>

          ))}



          <ProjectModal open={open} onClose={handleClose} project={selected} />

        </div>

      </div>

    </section>

  )

}

