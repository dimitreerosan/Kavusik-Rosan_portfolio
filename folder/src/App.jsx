import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import './index.css'
import Hero from './components/Hero'
import OfflineOverlay from './components/OfflineOverlay'
import ImageProtection from './components/ImageProtection'
import WelcomeScreen from './components/WelcomeScreen'
const About = lazy(() => import('./components/AboutNew'))
const ProjectsGrid = lazy(() => import('./components/ProjectsGrid'))
const Achievements = lazy(() => import('./components/Achievements'))
const Gallery = lazy(() => import('./components/Gallery'))
const TechnicalSkills = lazy(() => import('./components/TechnicalSkills'))
const KeyStrengths = lazy(() => import('./components/KeyStrengths'))
const SoftSkills = lazy(() => import('./components/SoftSkills'))
const FutureScope = lazy(() => import('./components/FutureScope'))
const ContactForm = lazy(() => import('./components/ContactForm'))
const Footer = lazy(() => import('./components/Footer'))

function LazyMount({ children, fallback, rootMargin = '300px 0px' }) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || show) return

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, show])

  return <div ref={ref}>{show ? children : fallback}</div>
}

function App() {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // Primary OG / Twitter / JSON-LD live in index.html (static). Avoid client-side
    // overrides that replaced homepage tags with achievement-only URLs and images.
  }, [])

  return (
    <>
      <WelcomeScreen />
      <OfflineOverlay />
      <ImageProtection />
      <main>
        <Hero />
        <LazyMount fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
          <Suspense fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
            <About />
          </Suspense>
        </LazyMount>
        <LazyMount fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
          <Suspense fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
            <ProjectsGrid />
          </Suspense>
        </LazyMount>
        <LazyMount fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
          <Suspense fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
            <Achievements />
          </Suspense>
        </LazyMount>
        <LazyMount fallback={<div className="h-96 animate-pulse bg-gray-900 rounded-lg" />}>
          <Suspense fallback={<div className="h-96 animate-pulse bg-gray-900 rounded-lg" />}>
            <Gallery />
          </Suspense>
        </LazyMount>
        <LazyMount fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
          <Suspense fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
            <TechnicalSkills />
          </Suspense>
        </LazyMount>
        <LazyMount fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
          <Suspense fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
            <KeyStrengths />
          </Suspense>
        </LazyMount>
        <LazyMount fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
          <Suspense fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
            <SoftSkills />
          </Suspense>
        </LazyMount>
        <LazyMount fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
          <Suspense fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
            <FutureScope />
          </Suspense>
        </LazyMount>
        <LazyMount fallback={<div className="h-96 animate-pulse bg-gray-900 rounded-lg" />}>
          <Suspense fallback={<div className="h-96 animate-pulse bg-gray-900 rounded-lg" />}>
            <ContactForm />
            <Footer />
          </Suspense>
        </LazyMount>
      </main>
    </>
  )
}

export default App
