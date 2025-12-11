import React, { useEffect, useState } from 'react'
import profileImg from '../profile.jpg'
import resumePdf from '../Kavusik Rosan_Resume.pdf'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '', // honeypot
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [startedAt, setStartedAt] = useState(Date.now())
  const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID

  useEffect(() => {
    setStartedAt(Date.now())
  }, [])

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic field validation
    const nextErrors = {}
    if (!formData.name.trim()) nextErrors.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = 'Please enter a valid email address.'
    if (!formData.message.trim()) nextErrors.message = 'Please enter a message.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // Anti-spam: honeypot (should remain empty)
    if (formData.company && formData.company.trim() !== '') {
      return // silently drop
    }
    // Anti-spam: time-to-submit (require at least 3 seconds on page)
    const elapsed = Date.now() - startedAt
    if (elapsed < 3000) {
      return // likely a bot
    }

    setLoading(true)
    try {
      if (FORMSPREE_ID) {
        const subject = `Portfolio Contact from ${formData.name}`
        const composed = `New message from portfolio\n\nName: ${formData.name}\nEmail: ${formData.email}\nTime on page: ${Math.round(elapsed / 1000)}s\n\nMessage:\n${formData.message}`
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject,
            name: formData.name,
            email: formData.email,
            message: composed,
            _honeypot: formData.company,
            _elapsed: elapsed,
          }),
        })
        if (!res.ok) throw new Error('Form submit failed')
      } else {
        const subject = `Portfolio Contact from ${formData.name}`
        const body = `New message from portfolio\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        const mailtoLink = `mailto:kavusikbalu2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.location.href = mailtoLink
      }
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '', company: '' })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      try {
        const subject = `Portfolio Contact from ${formData.name}`
        const body = `New message from portfolio\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        const fallbackMail = `mailto:kavusikbalu2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.location.href = fallbackMail
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '', company: '' })
        setTimeout(() => setSubmitted(false), 3000)
      } catch {}
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-32 px-8 md:px-16 bg-black min-h-screen flex items-center border-t border-gray-900">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left: Profile & Links */}
        <div className="flex flex-col">
          <div
            className="w-32 h-32 md:w-40 md:h-40 bg-gray-800 rounded-full mb-8 overflow-hidden flex-shrink-0"
            onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onMouseDown={(e) => { if (e.button === 2) { e.preventDefault(); e.stopPropagation(); } }}
          >
            <img
              src={profileImg}
              alt="Profile"
              loading="lazy"
              decoding="async"
              sizes="(min-width: 768px) 160px, 128px"
              width="320"
              height="320"
              className="w-full h-full object-cover"
              draggable={false}
              onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onMouseDown={(e) => { if (e.button === 2) { e.preventDefault(); e.stopPropagation(); } }}
            />
          </div>
          <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2 uppercase text-white" style={{letterSpacing: '-0.04em'}}>
            Kavusik Rosan
          </h3>
          <span className="px-3 py-1 bg-gray-900 text-green-400 text-xs rounded-full w-fit mb-8" style={{letterSpacing: '0.05em'}}><span className="animate-blink">●</span> AVAILABLE</span>
          
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">Email: kavusikbalu2006@gmail.com</p>
          <div className="mb-8">
            <a
              href={resumePdf}
              download="Kavusik_Rosan_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold uppercase tracking-tight hover:bg-gray-200 transition-colors text-xs"
              aria-label="Download resume"
            >
              Download Resume
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
              </svg>
            </a>
          </div>
          
          <div className="space-y-4 mt-auto">
            <p className="text-gray-600 text-xs uppercase tracking-wider" style={{letterSpacing: '0.08em'}}>Useful links:</p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/kavusik-rosan-dimitree-creator-of-obscura-arcanum" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn profile">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://github.com/dimitreerosan" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub profile">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12 24 5.373 18.627 0 12 0z" />
                </svg>
              </a>
              <a href="mailto:kavusikbalu2006@gmail.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Email">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="space-y-2 mt-8">
            <p className="text-gray-600 text-xs uppercase tracking-wider" style={{letterSpacing: '0.08em'}}>Languages</p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 bg-gray-900 text-gray-400 text-[10px] tracking-widest border border-gray-800 rounded">English</span>
              <span className="px-2 py-1 bg-gray-900 text-gray-400 text-[10px] tracking-widest border border-gray-800 rounded">Tamil</span>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8 uppercase" style={{letterSpacing: '-0.04em'}}>Send me a message</h2>

          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form" autoComplete="off">
            <div className="grid grid-cols-1 gap-6">
              <label htmlFor="fullName" className="sr-only">Full Name</label>
              <input
                type="text"
                name="name"
                id="fullName"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={`w-full px-4 py-3 bg-gray-900 text-white placeholder-gray-600 border ${errors.name ? 'border-red-500' : 'border-gray-800'} focus:border-white focus:outline-none transition-colors text-sm`}
              />
              {errors.name && <p id="name-error" className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>

            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              autoComplete="off"
              className={`w-full px-4 py-3 bg-gray-900 text-white placeholder-gray-600 border ${errors.email ? 'border-red-500' : 'border-gray-800'} focus:border-white focus:outline-none transition-colors text-sm`}
            />
            {errors.email && <p id="email-error" className="text-xs text-red-400 mt-1">{errors.email}</p>}

            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
              name="message"
              id="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
              rows="5"
              className={`w-full px-4 py-3 bg-gray-900 text-white placeholder-gray-600 border ${errors.message ? 'border-red-500' : 'border-gray-800'} focus:border-white focus:outline-none transition-colors resize-none text-sm`}
            />
            {errors.message && <p id="message-error" className="text-xs text-red-400 mt-1">{errors.message}</p>}

            {/* Honeypot field (hidden from users) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading ? 'true' : 'false'}
              className={`inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold uppercase tracking-tight hover:bg-gray-200 transition-colors text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{letterSpacing: '-0.02em'}}
            >
              Send
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            {submitted && (
              <div className="p-4 bg-green-900/20 text-green-400 rounded text-sm" role="status" aria-live="polite">
                Thanks for your message! I'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
