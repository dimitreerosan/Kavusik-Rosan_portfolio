/** Canonical identity URLs — same-domain portrait has highest priority for search/AI. */
export const SITE_ORIGIN = 'https://dimitreerosan.github.io'
export const SITE_BASE = `${SITE_ORIGIN}/Kavusik-Rosan_portfolio`
export const OFFICIAL_PORTRAIT_FILE = 'kavusik-rosan-official-portrait.png'
export const OFFICIAL_PORTRAIT_WEBP = 'kavusik-rosan-official-portrait.webp'
export const PORTRAIT_DISPLAY_WIDTHS = [128, 256]

/** Absolute URL (meta tags, JSON-LD, llms.txt) — keep PNG for OG/Twitter meta tags for max compatibility. */
export const OFFICIAL_PORTRAIT_URL = `${SITE_BASE}/images/${OFFICIAL_PORTRAIT_FILE}`

function assetRoot(base = import.meta.env.BASE_URL) {
  return base.endsWith('/') ? base : `${base}/`
}

/** WebP path for a specific display width (128 / 256). */
export function portraitWebpUrl(base = import.meta.env.BASE_URL, width = 256) {
  const root = assetRoot(base)
  const file =
    width === 256
      ? OFFICIAL_PORTRAIT_WEBP
      : `${OFFICIAL_PORTRAIT_FILE.replace('.png', '')}-${width}.webp`
  return `${root}images/${file}`
}

/** Responsive srcset for in-page portrait (WebP only). */
export function portraitSrcSet(base = import.meta.env.BASE_URL) {
  return PORTRAIT_DISPLAY_WIDTHS.map(
    (width) => `${portraitWebpUrl(base, width)} ${width}w`
  ).join(', ')
}

/** PNG fallback path for legacy crawlers (not used in <img> — SEO meta only). */
export function portraitUrl(base = import.meta.env.BASE_URL) {
  const root = assetRoot(base)
  return `${root}images/${OFFICIAL_PORTRAIT_FILE}`
}

export function certBadgeWebpUrl(base = import.meta.env.BASE_URL) {
  const root = assetRoot(base)
  return `${root}images/seo-cert-badge.webp`
}
