/** Canonical identity URLs — same-domain portrait has highest priority for search/AI. */
export const SITE_ORIGIN = 'https://dimitreerosan.github.io'
export const SITE_BASE = `${SITE_ORIGIN}/Kavusik-Rosan_portfolio`
export const OFFICIAL_PORTRAIT_FILE = 'kavusik-rosan-official-portrait.png'

/** Absolute URL (meta tags, JSON-LD, llms.txt). */
export const OFFICIAL_PORTRAIT_URL = `${SITE_BASE}/images/${OFFICIAL_PORTRAIT_FILE}`

/** Path for Vite `import.meta.env.BASE_URL` (e.g. /Kavusik-Rosan_portfolio/). */
export function portraitUrl(base = import.meta.env.BASE_URL) {
  const root = base.endsWith('/') ? base : `${base}/`
  return `${root}images/${OFFICIAL_PORTRAIT_FILE}`
}
