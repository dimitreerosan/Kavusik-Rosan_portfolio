import http from 'node:http'
import path from 'node:path'
import fs from 'node:fs/promises'
import { existsSync, createReadStream } from 'node:fs'
import puppeteer from 'puppeteer-core'

const DIST_DIR = path.resolve(process.cwd(), 'dist')
const BASE_PATH = '/Kavusik-Rosan_portfolio/'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function getMime(filePath) {
  return MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream'
}

function stripBase(urlPath) {
  if (urlPath === BASE_PATH) return '/'
  if (urlPath === BASE_PATH.slice(0, -1)) return '/'
  if (urlPath.startsWith(BASE_PATH)) return urlPath.slice(BASE_PATH.length - 1)
  return urlPath
}

function candidateBrowserPaths() {
  const candidates = []

  if (process.env.PUPPETEER_EXECUTABLE_PATH) candidates.push(process.env.PUPPETEER_EXECUTABLE_PATH)
  if (process.env.CHROME_PATH) candidates.push(process.env.CHROME_PATH)
  if (process.env.EDGE_PATH) candidates.push(process.env.EDGE_PATH)

  if (process.platform === 'win32') {
    const pf = process.env.PROGRAMFILES || 'C:\\Program Files'
    const pf86 = process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)'
    const local = process.env.LOCALAPPDATA

    candidates.push(path.join(pf, 'Google', 'Chrome', 'Application', 'chrome.exe'))
    candidates.push(path.join(pf86, 'Google', 'Chrome', 'Application', 'chrome.exe'))
    if (local) candidates.push(path.join(local, 'Google', 'Chrome', 'Application', 'chrome.exe'))

    candidates.push(path.join(pf, 'Microsoft', 'Edge', 'Application', 'msedge.exe'))
    candidates.push(path.join(pf86, 'Microsoft', 'Edge', 'Application', 'msedge.exe'))
    if (local) candidates.push(path.join(local, 'Microsoft', 'Edge', 'Application', 'msedge.exe'))
  } else if (process.platform === 'darwin') {
    candidates.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
    candidates.push('/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge')
    candidates.push('/Applications/Chromium.app/Contents/MacOS/Chromium')
  } else {
    candidates.push('/usr/bin/google-chrome')
    candidates.push('/usr/bin/google-chrome-stable')
    candidates.push('/usr/bin/chromium')
    candidates.push('/usr/bin/chromium-browser')
    candidates.push('/snap/bin/chromium')
    candidates.push('/usr/bin/microsoft-edge')
    candidates.push('/usr/bin/microsoft-edge-stable')
  }

  return candidates
}

function findBrowserExecutable() {
  const candidates = candidateBrowserPaths()
  for (const p of candidates) {
    if (!p) continue
    try {
      if (existsSync(p)) return p
    } catch {
      // ignore
    }
  }

  throw new Error(
    'No Chrome/Edge/Chromium executable found for prerendering. ' +
      'Install Google Chrome or Microsoft Edge (recommended) or set PUPPETEER_EXECUTABLE_PATH to your browser executable.'
  )
}

async function startStaticServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url || '/', 'http://localhost')
      const rawPath = decodeURIComponent(url.pathname)
      const mapped = stripBase(rawPath)

      const safePath = mapped.split('?')[0]
      const relPath = safePath.replace(/^\/+/, '')
      const filePath = path.join(DIST_DIR, relPath)

      if (relPath === '') {
        const indexPath = path.join(DIST_DIR, 'index.html')
        const data = await fs.readFile(indexPath)
        res.writeHead(200, { 'Content-Type': getMime(indexPath) })
        res.end(data)
        return
      }

      if (!filePath.startsWith(DIST_DIR)) {
        res.writeHead(403)
        res.end('Forbidden')
        return
      }

      if (existsSync(filePath)) {
        res.writeHead(200, { 'Content-Type': getMime(filePath) })
        createReadStream(filePath).pipe(res)
        return
      }

      res.writeHead(404)
      res.end('Not found')
    } catch (e) {
      res.writeHead(500)
      res.end('Server error')
    }
  })

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const address = server.address()
  if (!address || typeof address === 'string') throw new Error('Failed to start server')
  const origin = `http://127.0.0.1:${address.port}`

  return {
    origin,
    close: () => new Promise((resolve) => server.close(() => resolve())),
  }
}

async function scrollToBottom(page) {
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((r) => setTimeout(r, ms))
    let lastHeight = 0
    for (let i = 0; i < 40; i++) {
      window.scrollBy(0, Math.max(300, Math.floor(window.innerHeight * 0.9)))
      await delay(250)
      const h = document.documentElement.scrollHeight
      if (h === lastHeight && (window.innerHeight + window.scrollY) >= h - 2) break
      lastHeight = h
    }
    window.scrollTo(0, 0)
    await delay(250)
  })
}

async function main() {
  const indexPath = path.join(DIST_DIR, 'index.html')
  if (!existsSync(indexPath)) {
    throw new Error('dist/index.html not found. Run `vite build` first.')
  }

  try {
    const verifySrc = path.resolve(process.cwd(), '..', 'googlec914f1a6e947a4b4.html')
    const verifyDest = path.join(DIST_DIR, 'googlec914f1a6e947a4b4.html')
    if (existsSync(verifySrc)) {
      await fs.copyFile(verifySrc, verifyDest)
    }
  } catch {
    // ignore
  }

  const delay = (ms) => new Promise((r) => setTimeout(r, ms))

  const server = await startStaticServer()

  let browser
  try {
    browser = await puppeteer.launch({
      headless: true,
      executablePath: findBrowserExecutable(),
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
  } catch (e) {
    console.warn(
      '[prerender] Skipping prerender: no Chrome/Edge/Chromium executable found. ' +
        'Set PUPPETEER_EXECUTABLE_PATH if you want prerendering enabled.'
    )
    await server.close()
    return
  }

  try {
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(120_000)

    await page.setRequestInterception(true)
    page.on('request', (req) => {
      const type = req.resourceType()
      if (type === 'media') {
        req.abort()
        return
      }
      req.continue()
    })

    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])

    const url = `${server.origin}${BASE_PATH}`
    await page.goto(url, { waitUntil: 'domcontentloaded' })

    await page.waitForNetworkIdle({ idleTime: 750, timeout: 120_000 })

    await scrollToBottom(page)

    await page.waitForNetworkIdle({ idleTime: 750, timeout: 120_000 })

    await page.waitForSelector('#about', { timeout: 120_000 })
    await page.waitForSelector('#projects', { timeout: 120_000 })
    await page.waitForSelector('#contact', { timeout: 120_000 })

    await delay(1500)

    let html = await page.content()
    if (!/^<!doctype html>/i.test(html)) {
      html = `<!DOCTYPE html>\n${html}`
    }

    await fs.writeFile(indexPath, html, 'utf8')
  } finally {
    await browser.close()
    await server.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
