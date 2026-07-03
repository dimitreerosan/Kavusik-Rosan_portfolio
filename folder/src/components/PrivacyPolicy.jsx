import { useEffect } from 'react'
import './LegalNotice.css' // reuse same modal styles

export default function PrivacyPolicy({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="ln-overlay" role="dialog" aria-modal="true" aria-label="Privacy Policy" onClick={onClose}>
      <div className="ln-panel" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="ln-header">
          <div className="ln-header__left">
            <span className="ln-header__label">[ PRIVACY POLICY ]</span>
            <h2 className="ln-header__title">Privacy Policy</h2>
          </div>
          <button className="ln-close" onClick={onClose} aria-label="Close privacy policy">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="ln-divider" />

        {/* Body */}
        <div className="ln-body">

          <section className="ln-section">
            <h3 className="ln-section__heading">Effective Date</h3>
            <p className="ln-section__text">July 2, 2026. Thank you for visiting this portfolio website.</p>
          </section>

          <section className="ln-section">
            <h3 className="ln-section__heading">Information Collected</h3>
            <p className="ln-section__text">
              This website does not intentionally collect personal information unless you voluntarily
              provide it through contact forms, email, or other communication methods.
              Information you may voluntarily provide includes:
            </p>
            <ul className="ln-list">
              <li>Name</li>
              <li>Email address</li>
              <li>Message content</li>
              <li>Any additional information you choose to share</li>
            </ul>
          </section>

          <section className="ln-section">
            <h3 className="ln-section__heading">Automatically Collected Information</h3>
            <p className="ln-section__text">
              Like most websites, basic technical information such as IP address, browser type,
              operating system, referring pages, and access time may be collected by the hosting
              provider or analytics services for security and performance purposes.
            </p>
          </section>

          <section className="ln-section">
            <h3 className="ln-section__heading">Use of Information</h3>
            <p className="ln-section__text">Any information provided is used only to:</p>
            <ul className="ln-list">
              <li>Respond to inquiries</li>
              <li>Communicate regarding professional opportunities</li>
              <li>Improve the website experience</li>
            </ul>
            <p className="ln-section__text" style={{ marginTop: '0.5rem' }}>
              Your information will not be sold or intentionally shared with third parties
              except where required by law.
            </p>
          </section>

          <section className="ln-section">
            <h3 className="ln-section__heading">External Links</h3>
            <p className="ln-section__text">
              This website may contain links to third-party websites. The owner is not responsible
              for the privacy practices, content, or security of external websites.
            </p>
          </section>

          <section className="ln-section">
            <h3 className="ln-section__heading">Intellectual Property</h3>
            <p className="ln-section__text">
              All original content on this website is protected by applicable copyright and
              intellectual property laws. Unauthorized copying, reproduction, or commercial use
              is prohibited without prior written permission.
            </p>
          </section>

          <section className="ln-section">
            <h3 className="ln-section__heading">Security</h3>
            <p className="ln-section__text">
              Reasonable measures are taken to maintain the security of this website. However,
              no website or internet transmission can be guaranteed to be completely secure.
            </p>
          </section>

          <section className="ln-section">
            <h3 className="ln-section__heading">Changes to This Policy</h3>
            <p className="ln-section__text">
              This Privacy Policy may be updated at any time without prior notice. Continued use
              of the website constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="ln-section">
            <h3 className="ln-section__heading">Contact</h3>
            <p className="ln-section__text">
              For questions regarding this Privacy Policy or permission requests, please contact:{' '}
              <a href="mailto:kavusikbalu2006@gmail.com" className="ln-link">
                kavusikbalu2006@gmail.com
              </a>
            </p>
          </section>

        </div>

        <div className="ln-divider" />
        <div className="ln-footer">
          <span className="ln-footer__copy">Effective July 2, 2026</span>
          <button className="ln-footer__btn" onClick={onClose}>Close</button>
        </div>

      </div>
    </div>
  )
}
