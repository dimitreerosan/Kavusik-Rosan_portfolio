import React, { useEffect, useRef, useState } from 'react'
import videoSrc from '../video-1.mp4'

export default function OfflineOverlay() {
  const [offline, setOffline] = useState(!navigator.onLine)
  const [blobUrl, setBlobUrl] = useState(null)
  const videoRef = useRef(null)
  const [autoPlayFailed, setAutoPlayFailed] = useState(false)
  const preloadingRef = useRef(false)
  const [errorReason, setErrorReason] = useState(() => (
    navigator.onLine ? 'Cannot reach server. Please try again.' : 'No internet connection. Please check your network.'
  ))

  useEffect(() => {
    const onOnline = () => {
      setOffline(false)
      setErrorReason(null)
    }
    const onOffline = () => {
      setOffline(true)
      setErrorReason('No internet connection. Please check your network.')
    }
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
    const onKey = (e) => {
      if (e.altKey && e.key && e.key.toLowerCase() === 'o') setOffline((s) => !s)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    let revoked = false
    const preload = async () => {
      if (preloadingRef.current) return
      preloadingRef.current = true
      try {
        const res = await fetch(videoSrc, { cache: 'force-cache' })
        if (!res.ok) throw new Error('video fetch failed')
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        if (!revoked) setBlobUrl((prev) => {
          if (prev && prev !== url) URL.revokeObjectURL(prev)
          return url
        })
      } catch (e) {
        // swallow; we'll try again when back online
      } finally {
        preloadingRef.current = false
      }
    }
    if (navigator.onLine) preload()
    const onOnline = () => preload()
    window.addEventListener('online', onOnline)
    return () => {
      revoked = true
      window.removeEventListener('online', onOnline)
    }
  }, [])

  useEffect(() => {
    const tryPlay = () => {
      if (!videoRef.current) return
      const p = videoRef.current.play()
      if (p && typeof p.then === 'function') {
        p.then(() => setAutoPlayFailed(false)).catch(() => setAutoPlayFailed(true))
      }
    }

    if (videoRef.current) {
      videoRef.current.load()
      if (offline) tryPlay()
    }

    const onInteract = () => {
      if (offline) tryPlay()
    }
    window.addEventListener('click', onInteract, { once: true })
    return () => {
      window.removeEventListener('click', onInteract)
    }
  }, [offline, blobUrl])

  if (!offline) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2147483647,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '16px',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '480px',
          marginBottom: '10vh', // lift video a bit up
        }}
      >
        <video
          ref={videoRef}
          key={blobUrl || videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={autoPlayFailed}
          onLoadedData={() => { try { if (videoRef.current) videoRef.current.play() } catch (e) {} }}
          onCanPlay={() => { try { if (videoRef.current && videoRef.current.paused) videoRef.current.play() } catch (e) {} }}
          onPlay={() => { setAutoPlayFailed(false); console.debug('OfflineOverlay: video playing') }}
          onError={(e) => { setAutoPlayFailed(true); console.debug('OfflineOverlay: video error', e?.currentTarget?.error) }}
          style={{ width: 'min(420px, 90vw)', maxWidth: '90vw', maxHeight: '55vh', borderRadius: '12px', background: '#000000' }}
        >
          <source src={blobUrl || videoSrc} type="video/mp4" />
        </video>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '16px 24px',
          textAlign: 'center',
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          fontWeight: 800,
          fontSize: '1rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#ffffff',
          borderTop: '1px solid #222222',
          background: 'rgba(0, 0, 0, 0.9)',
        }}
      >
        OFFLINE: {errorReason || 'chk network connection'}
      </div>
    </div>
  )
}
