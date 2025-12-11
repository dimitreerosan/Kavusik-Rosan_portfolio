import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="w-full py-16 px-8 md:px-16 bg-black border-t border-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-black uppercase text-gray-600 mb-4" style={{letterSpacing: '-0.04em'}}>Kavusik Rosan</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Computer Science student & privacy engineer focusing on adversarial ML, encrypted P2P systems and biometric security. Building privacy-first, accessible technology.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase mb-4 text-gray-400" style={{letterSpacing: '0.08em'}}>Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-sm text-gray-500 hover:text-white transition-colors">About</a></li>
              <li><a href="#projects" className="text-sm text-gray-500 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-sm text-gray-500 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact & Networks */}
          <div>
            <h4 className="text-sm font-bold uppercase mb-4 text-gray-400" style={{letterSpacing: '0.08em'}}>Contact & Networks</h4>
            <ul className="space-y-2">
              <li><a href="mailto:kavusikbalu2006@gmail.com" className="text-sm text-gray-500 hover:text-white transition-colors">Mail</a></li>
              <li><a href="https://www.linkedin.com/in/kavusik-rosan-dimitree-creator-of-obscura-arcanum" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/dimitreerosan" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-white transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">© {currentYear} Kavusik Rosan. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-gray-600">
            <a href="#" className="hover:text-white transition-colors">Legal Mention</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
