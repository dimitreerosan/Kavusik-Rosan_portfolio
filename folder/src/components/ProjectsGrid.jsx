import React, { useMemo, useState, useCallback } from 'react'
import obscuraImg from '../Obscura Arcanum.jpg'
import dravionImg from '../Obscura Dravion.jpg'
import linkShiftImg from '../Link Shift.jpg'
import deeplynkImg from '../deepLynk.jpg'
import AutoformAssistImg from '../Autoform Assist.jpg' 
import VirtualNavigator from '../VirtualNavigator.jpg'
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
      id: 1,
      title: 'Virtual Navigator',
      description:
        'Real-time hand-gesture navigation system that uses computer vision to interpret hand movements for controlling applications without touch.',
      image: VirtualNavigator,
      year: 'July 2024',
      tags: ['Gesture Control', 'Python'],
      role: 'OpenCV',
      impact: 'Computer Vision',
      link: '#',
    },
    {
      id: 1,
      title: 'Obscura Arcanum',
      description:
        'Anti-AI image protection system using adversarial ML with encryption. Shortlisted among top 100 nationally (AICTE APF 2025). Built with Python, TensorFlow, cryptography libs.',
      image: obscuraImg,
      year: 'Aug 2024',
      tags: ['AI/ML', 'SECURITY'],
      role: 'Lead',
      impact: 'Top 100',
      link: '#',
    },
    {
      id: 2,
      title: 'Autoform Assist',
      description:
        'AI-powered mobile app that auto-fills forms using OCR and NLP for faster, accurate submissions.',
      image: AutoformAssistImg,
      year: 'JAN 2025',
      tags: ['MOBILE', 'OCR/NLP'],
      role: 'Developer',
      impact: 'UX +',
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
      link: '#',
    },
    {
      id: 4,
      title: 'Link Shift',
      description:
        'Serverless end-to-end encrypted P2P messaging and file transfer using direct WebRTC device-to-device connection.',
      image: linkShiftImg,
      year: 'NOV 2025',
      tags: ['P2P', 'WEBRTC'],
      role: 'Full-stack',
      impact: 'E2E',
      link: '#',
    },
    {
      id: 5,
      title: 'Obscura Dravion',
      description:
        'Biometric intelligence system for rapid video archive search with privacy safeguards.',
      image: dravionImg,
      year: 'AUG 2025',
      tags: ['CV/BIOMETRICS'],
      role: 'Research',
      impact: 'Privacy',
      link: '#',
    },
  ], [])

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
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white" style={{ letterSpacing: '-0.04em' }}>Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {projects.map((p) => (
            <Card
              key={p.id}
              as="button"
              type="button"
              onClick={() => handleOpen(p)}
              ariaLabel={`Open project: ${p.title}`}
            >
              <div className="overflow-hidden rounded-t-xl">
                <div className="relative w-full aspect-[16/9] bg-black">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    width="1280"
                    height="720"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:transition-none"
                    draggable={false}
                    onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
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
                </div>
                <h3 className="text-left text-xl md:text-2xl font-black tracking-tight text-white mb-2" style={{ letterSpacing: '-0.02em' }}>{p.title}</h3>
                <p className="text-left text-gray-400 text-sm md:text-base leading-relaxed">{p.description}</p>
              </div>
            </Card>
          ))}

          <ProjectModal open={open} onClose={handleClose} project={selected} />
        </div>
      </div>
    </section>
  )
}
