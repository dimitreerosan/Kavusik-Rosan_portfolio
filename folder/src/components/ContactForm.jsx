import React, { useEffect, useState } from 'react'
import profileImg from '../profile.png'
import resumePdf from '../Kavusik Rosan_Resume.pdf'
import signatureMark from '../Copy of O.png'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
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

    // Auto-expand message textarea as user types
    if (name === 'message') {
      const el = e.target
      if (el) {
        el.style.height = 'auto'
        el.style.height = `${el.scrollHeight}px`
      }
    }
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!formData.name.trim()) nextErrors.name = 'Please enter your full name.'
    if (!formData.message.trim()) nextErrors.message = 'Please enter a message.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    if (formData.company && formData.company.trim() !== '') return
    const elapsed = Date.now() - startedAt
    if (elapsed < 3000) return

    setLoading(true)
    try {
      if (FORMSPREE_ID) {
        const subject = `Portfolio Contact from ${formData.name}`
        const composed = `New message from portfolio\n\nName: ${formData.name}\nTime on page: ${Math.round(elapsed / 1000)}s\n\nMessage:\n${formData.message}`
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject,
            name: formData.name,
            message: composed,
            _honeypot: formData.company,
            _elapsed: elapsed,
          }),
        })
        if (!res.ok) throw new Error('Form submit failed')
      } else {
        const subject = `Portfolio Contact from ${formData.name}`
        const body = `New message from portfolio\n\nName: ${formData.name}\n\nMessage:\n${formData.message}`
        const mailtoLink = `mailto:kavusikbalu2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.location.href = mailtoLink
      }
      setSubmitted(true)
      setFormData({ name: '', message: '', company: '' })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      // Fallback
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="pt-20 pb-10 px-6 md:px-10 bg-black relative overflow-hidden border-t border-gray-900 selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto w-full relative z-10 px-4">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">

          {/* Column 1: Contact Us */}
          <div className="md:col-span-5 space-y-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight uppercase" style={{ letterSpacing: '-0.04em' }}>
                Contact Us
              </h2>

              {/* Reference Header Social Icons */}
              <div className="flex gap-6 mb-12">
                <button type="button" onClick={() => window.open('https://github.com/dimitreerosan', '_blank', 'noopener,noreferrer')} className="opacity-60 hover:opacity-100 transition-opacity bg-transparent border-none p-0">
                  <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12 24 5.373 18.627 0 12 0z" /></svg>
                </button>
                <button type="button" onClick={() => window.open('https://www.linkedin.com/in/kavusik-rosan-dimitree-creator-of-obscura-arcanum', '_blank', 'noopener,noreferrer')} className="opacity-60 hover:opacity-100 transition-opacity bg-transparent border-none p-0">
                  <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </button>
                <button type="button" onClick={() => window.location.href = 'mailto:kavusikbalu2006@gmail.com'} className="opacity-60 hover:opacity-100 transition-opacity bg-transparent border-none p-0">
                  <svg className="w-6 h-6 fill-none stroke-current text-white" viewBox="0 0 24 24" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </button>
              </div>

              <div className="space-y-10">
                <div className="flex gap-4 items-start translate-x-[-4px]">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
                      <path d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-neutral-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">Inquiry</h4>
                    <p className="text-white text-base font-medium tracking-tight">kavusikbalu2006@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start translate-x-[-4px]">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-neutral-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">Status</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)] animate-blink" />
                      <p className="text-white text-base font-medium tracking-tight">Online</p>
                    </div>
                  </div>
                </div>

                {/* Download Resume Button */}
                <div className="pt-1">
                  <div className="flex flex-col justify-center">

                    <button
                      onClick={() => {
                        const link = document.createElement('a')
                        link.href = resumePdf
                        link.download = 'Kavusik_Rosan_Resume.pdf'
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                      }}
                      className="relative inline-flex items-center justify-center gap-3 px-10 py-3.5 rounded-full bg-white text-black text-sm font-semibold tracking-wide shadow-sm hover:bg-neutral-100 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all duration-300 cursor-pointer border-none"
                    >
                      <span className="relative z-10 whitespace-nowrap">
                        Download Resume
                      </span>

                      <div className="relative z-10 w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-300">
                        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                        </svg>
                      </div>
                    </button>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <img
                      src={signatureMark}
                      alt="Personal mark"
                      loading="lazy"
                      decoding="async"
                      className="w-full max-w-sm h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Send Message */}
          <div className="md:col-span-7 lg:pl-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-10 tracking-tight uppercase" style={{ letterSpacing: '-0.04em' }}>
              Send Us A Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8" autoComplete="off">
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-neutral-500 focus:outline-none focus:border-white/60 text-lg font-light transition-colors"
                />
                {errors.name && <p className="mt-2 font-sans text-sm font-light tracking-tight text-red-500/80">{errors.name}</p>}
              </div>
              <div className="relative group">
                <textarea
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="1"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-neutral-500 focus:outline-none focus:border-white/60 resize-none overflow-hidden text-lg font-light min-h-[180px] transition-colors"
                />
                {errors.message && <p className="mt-2 font-sans text-sm font-light tracking-tight text-red-500/80">{errors.message}</p>}
              </div>

              {/* Honeypot */}
              <input type="text" name="company" className="hidden" value={formData.company} onChange={handleChange} />

              <div className="pt-10">
                <button
                  type="submit"
                  disabled={loading}
                  className="relative inline-flex items-center justify-center gap-3 px-10 py-3.5 rounded-full bg-white text-black text-sm font-semibold tracking-wide shadow-sm hover:bg-neutral-100 hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all duration-300"
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    <span className={loading ? 'opacity-70 animate-pulse' : ''}>
                      {loading ? 'Sending…' : 'Send Message'}
                    </span>
                    {!loading && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    )}
                  </div>
                </button>
              </div>

              {submitted && (
                <div className="flex items-center justify-center gap-2 text-green-400 text-xs font-bold tracking-[0.2em] uppercase animate-in fade-in slide-in-from-bottom-2">
                  <span>✓</span>
                  <span>Transmission Received</span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  )
}
