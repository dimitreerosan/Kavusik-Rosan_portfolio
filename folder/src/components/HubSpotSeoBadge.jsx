import React from 'react'
import './HubSpotSeoBadge.css'

export default function HubSpotSeoBadge({
  name = 'KAVUSIK ROSAN',
  href = 'https://app-na2.hubspot.com/academy/achievements/r14ln2mx/en/1/kavusik-rosan/seo-certified',
  className = '',
}) {
  const handleClick = () => {
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`hubspot-seo-badge ${className}`.trim()}
      title="SEO Certified"
      aria-label={`HubSpot Academy SEO Certified — ${name}`}
    >
      <span className="hubspot-seo-badge__icon" aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 4L54.6 17V47L32 60 9.4 47V17L32 4Z" fill="#FAD9C8" />
          <path
            d="M32 16c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16Z"
            fill="#FF7A59"
          />
          <path
            d="M32 20.5c6.351 0 11.5 5.149 11.5 11.5S38.351 43.5 32 43.5 20.5 38.351 20.5 32 25.649 20.5 32 20.5Z"
            fill="#FAD9C8"
          />
          <circle cx="29" cy="29" r="5.25" stroke="#FF7A59" strokeWidth="2.4" />
          <path
            d="M33.2 33.2L38.8 38.8"
            stroke="#FF7A59"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <span className="hubspot-seo-badge__brand">
        <span className="hubspot-seo-badge__hubspot">HubSpot</span>
        <span className="hubspot-seo-badge__academy">Academy</span>
      </span>

      <span className="hubspot-seo-badge__title">SEO Certified</span>
      <span className="hubspot-seo-badge__name">{name}</span>
    </button>
  )
}
