import React, { useState } from 'react'
import LegalNotice from './LegalNotice'
import PrivacyPolicy from './PrivacyPolicy'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [showLegal, setShowLegal] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  return (
    <>
      <footer className="w-full py-16 px-8 md:px-16 bg-black border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-black uppercase text-gray-600 mb-4" style={{letterSpacing: '-0.04em'}}>Kavusik Rosan</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-poppins">
                Computer Science student, HCL GUVI Campus Ambassador & privacy engineer focusing on adversarial ML, encrypted P2P systems and biometric security. Building privacy-first, accessible technology.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-sm font-bold uppercase mb-4 text-gray-400" style={{letterSpacing: '0.08em', fontFamily: "'Inter', sans-serif"}}>Navigation</h4>
              <ul className="space-y-2">
                <li><button type="button" onClick={() => { const el = document.querySelector('#'); if (el) el.scrollIntoView({behavior: 'smooth'}) }} className="text-sm text-gray-500 hover:text-white transition-colors bg-transparent border-none p-0" style={{fontFamily: "'Poppins', sans-serif"}}>Home</button></li>
                <li><button type="button" onClick={() => { const el = document.querySelector('#about'); if (el) el.scrollIntoView({behavior: 'smooth'}) }} className="text-sm text-gray-500 hover:text-white transition-colors bg-transparent border-none p-0" style={{fontFamily: "'Poppins', sans-serif"}}>About</button></li>
                <li><button type="button" onClick={() => { const el = document.querySelector('#projects'); if (el) el.scrollIntoView({behavior: 'smooth'}) }} className="text-sm text-gray-500 hover:text-white transition-colors bg-transparent border-none p-0" style={{fontFamily: "'Poppins', sans-serif"}}>Projects</button></li>
                <li><button type="button" onClick={() => { const el = document.querySelector('#contact'); if (el) el.scrollIntoView({behavior: 'smooth'}) }} className="text-sm text-gray-500 hover:text-white transition-colors bg-transparent border-none p-0" style={{fontFamily: "'Poppins', sans-serif"}}>Contact</button></li>
              </ul>
            </div>

            {/* Contact & Networks */}
            <div>
              <h4 className="text-sm font-bold uppercase mb-4 text-gray-400" style={{letterSpacing: '0.08em', fontFamily: "'Inter', sans-serif"}}>Contact & Networks</h4>
              <ul className="space-y-2">
                <li><button type="button" onClick={() => window.location.href = 'mailto:kavusikbalu2006@gmail.com'} className="text-sm text-gray-500 hover:text-white transition-colors bg-transparent border-none p-0" style={{fontFamily: "'Poppins', sans-serif"}}>Mail</button></li>
                <li><button type="button" onClick={() => window.open('https://www.linkedin.com/in/kavusik-rosan-dimitree-creator-of-obscura-arcanum', '_blank', 'noopener,noreferrer')} className="text-sm text-gray-500 hover:text-white transition-colors bg-transparent border-none p-0" style={{fontFamily: "'Poppins', sans-serif"}}>LinkedIn</button></li>
                <li><button type="button" onClick={() => window.open('https://github.com/dimitreerosan', '_blank', 'noopener,noreferrer')} className="text-sm text-gray-500 hover:text-white transition-colors bg-transparent border-none p-0" style={{fontFamily: "'Poppins', sans-serif"}}>GitHub</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600">© {currentYear} Kavusik Rosan. All rights reserved.</p>
            <div className="flex gap-4 text-xs text-gray-600">
              <button
                type="button"
                onClick={() => setShowLegal(true)}
                className="hover:text-white transition-colors bg-transparent border-none p-0"
              >
                Legal Notice
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setShowPrivacy(true)}
                className="hover:text-white transition-colors bg-transparent border-none p-0"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {showLegal && <LegalNotice onClose={() => setShowLegal(false)} />}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
    </>
  )
}
