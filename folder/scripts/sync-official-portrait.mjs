#!/usr/bin/env node
/**
 * Syncs and optimizes portfolio images for Lighthouse performance:
 * - PNG portrait (≤800px) for OG/JSON-LD crawlers
 * - Responsive WebP variants (128w, 256w) for in-page display
 * - Compressed certification badge WebP
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')
const srcPortrait = path.join(projectRoot, 'src', 'profile.png')
const srcCert = path.join(projectRoot, 'src', '2f1dcbfc1d894.png')
const destDir = path.join(projectRoot, 'public', 'images')

const PORTRAIT_WIDTHS = [128, 256]
const PORTRAIT_BASE = 'kavusik-rosan-official-portrait'

async function optimizePortrait() {
  if (!fs.existsSync(srcPortrait)) {
    console.warn('⚠ sync-official-portrait: src/profile.png not found — skip portrait')
    return
  }

  fs.mkdirSync(destDir, { recursive: true })

  const pngDest = path.join(destDir, `${PORTRAIT_BASE}.png`)
  await sharp(srcPortrait)
    .rotate()
    .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toFile(pngDest)

  for (const width of PORTRAIT_WIDTHS) {
    const webpDest = path.join(destDir, `${PORTRAIT_BASE}-${width}.webp`)
    await sharp(srcPortrait)
      .rotate()
      .resize(width, width, { fit: 'cover' })
      .webp({ quality: 82, effort: 6 })
      .toFile(webpDest)
  }

  const defaultWebp = path.join(destDir, `${PORTRAIT_BASE}.webp`)
  await fs.promises.copyFile(
    path.join(destDir, `${PORTRAIT_BASE}-256.webp`),
    defaultWebp
  )

  console.log(`✓ Portrait optimized → public/images/${PORTRAIT_BASE}.{png,webp}`)
}

async function optimizeCertBadge() {
  if (!fs.existsSync(srcCert)) {
    console.warn('⚠ sync-official-portrait: cert PNG not found — skip badge')
    return
  }

  fs.mkdirSync(destDir, { recursive: true })

  const webpDest = path.join(destDir, 'seo-cert-badge.webp')
  await sharp(srcCert)
    .resize(220, 220, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(webpDest)

  console.log('✓ Certification badge optimized → public/images/seo-cert-badge.webp')
}

await optimizePortrait()
await optimizeCertBadge()
