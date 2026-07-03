import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import './LegalNotice.css'

export default function LegalNotice({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div className="ln-overlay" role="dialog" aria-modal="true" aria-label="Legal Notice" onClick={onClose}>
      <div className="ln-panel" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="ln-header">
          <div className="ln-header__left">
            <span className="ln-header__label">[ LEGAL NOTICE ]</span>
            <h2 className="ln-header__title">Legal Notice</h2>
          </div>
          <button className="ln-close" onClick={onClose} aria-label="Close legal notice">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="ln-divider" />

        {/* Body */}
        <div className="ln-body">

          <section className="ln-section">
            <h3 className="ln-section__heading">© 2026 Kavusik Rosan. All Rights Reserved.</h3>
            <p className="ln-section__text">
              This website and its contents — including but not limited to source code, design,
              layout, graphics, images, icons, animations, documentation, projects, written content,
              and other intellectual property — are owned by Kavusik Rosan unless otherwise stated.
            </p>
          </section>

          <section className="ln-section">
            <h3 className="ln-section__heading">Permitted Use</h3>
            <p className="ln-section__text">
              You may view this website for <strong>personal, educational, or recruitment purposes only</strong>.
              No part of this website may be copied, reproduced, modified, distributed, published,
              sold, licensed, or used for commercial purposes without prior written permission from the owner.
            </p>
          </section>

          <section className="ln-section">
            <h3 className="ln-section__heading">Prohibited Use</h3>
            <p className="ln-section__text">
              Any unauthorized use, redistribution, or misrepresentation of the content is strictly
              prohibited and may violate applicable copyright and intellectual property laws.
            </p>
          </section>

          <section className="ln-section">
            <h3 className="ln-section__heading">Third-Party References</h3>
            <p className="ln-section__text">
              All third-party trademarks, logos, and brand names displayed on this website remain
              the property of their respective owners and are used solely for identification or
              demonstration purposes.
            </p>
          </section>

          <section className="ln-section">
            <h3 className="ln-section__heading">Modifications</h3>
            <p className="ln-section__text">
              The owner reserves the right to modify, update, or remove any content on this website
              without prior notice.
            </p>
          </section>

          <section className="ln-section">
            <h3 className="ln-section__heading">Contact</h3>
            <p className="ln-section__text">
              For permissions or inquiries, contact{' '}
              <a href="mailto:kavusikbalu2006@gmail.com" className="ln-link">
                kavusikbalu2006@gmail.com
              </a>
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="ln-divider" />
        <div className="ln-footer">
          <span className="ln-footer__copy">© 2026 Kavusik Rosan</span>
          <button className="ln-footer__btn" onClick={onClose}>Close</button>
        </div>

      </div>
    </div>,
    document.body
  )
}
