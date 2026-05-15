#!/usr/bin/env node
/**
 * Copies src/profile.png → public/images/kavusik-rosan-official-portrait.png
 * so crawlers get a stable same-domain portrait (higher priority than LinkedIn thumbnails).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')
const src = path.join(projectRoot, 'src', 'profile.png')
const destDir = path.join(projectRoot, 'public', 'images')
const dest = path.join(destDir, 'kavusik-rosan-official-portrait.png')

if (!fs.existsSync(src)) {
  console.warn('⚠ sync-official-portrait: src/profile.png not found — skip')
  process.exit(0)
}

fs.mkdirSync(destDir, { recursive: true })
fs.copyFileSync(src, dest)
console.log(`✓ Official portrait synced → public/images/${path.basename(dest)}`)
