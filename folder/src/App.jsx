import React, { Suspense, lazy } from 'react'
import './index.css'
import Hero from './components/Hero'
import OfflineOverlay from './components/OfflineOverlay'
import ImageProtection from './components/ImageProtection'
const About = lazy(() => import('./components/AboutNew'))
const ProjectsGrid = lazy(() => import('./components/ProjectsGrid'))
const Achievements = lazy(() => import('./components/Achievements'))
const TechnicalSkills = lazy(() => import('./components/TechnicalSkills'))
const KeyStrengths = lazy(() => import('./components/KeyStrengths'))
const SoftSkills = lazy(() => import('./components/SoftSkills'))
const FutureScope = lazy(() => import('./components/FutureScope'))
const ContactForm = lazy(() => import('./components/ContactForm'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  return (
    <>
      <OfflineOverlay />
      <ImageProtection />
      <main>
        <Hero />
        <Suspense fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
          <About />
        </Suspense>
        <Suspense fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
          <ProjectsGrid />
        </Suspense>
        <Suspense fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
          <Achievements />
        </Suspense>
        <Suspense fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
          <TechnicalSkills />
        </Suspense>
        <Suspense fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
          <KeyStrengths />
        </Suspense>
        <Suspense fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
          <SoftSkills />
        </Suspense>
        <Suspense fallback={<div className="h-64 md:h-80 animate-pulse bg-gray-900 rounded-lg" />}>
          <FutureScope />
        </Suspense>
        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-900 rounded-lg" />}>
          <ContactForm />
          <Footer />
        </Suspense>
      </main>
    </>
  )
}

export default App
