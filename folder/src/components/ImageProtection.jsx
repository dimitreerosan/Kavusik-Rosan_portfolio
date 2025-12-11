import React, { useEffect } from 'react'

export default function ImageProtection() {
  useEffect(() => {
    const checkNode = (node) => {
      if (!node || node === document || node === window) return { allow: false, protected: false }
      if (node.dataset && node.dataset.allowContextMenu === 'true') return { allow: true, protected: false }
      const tag = node.tagName
      if (tag === 'IMG' || tag === 'VIDEO') return { allow: false, protected: true }
      return { allow: false, protected: false }
    }

    const isProtectedTarget = (el, x, y) => {
      // First check the composed path
      const path = typeof el?.composedPath === 'function' ? el.composedPath() : null
      if (Array.isArray(path) && path.length) {
        for (const n of path) {
          const res = checkNode(n)
          if (res.allow) return false
          if (res.protected) return true
        }
      }
      // Fallback to geometric hit testing
      if (typeof x === 'number' && typeof y === 'number') {
        const list = document.elementsFromPoint ? document.elementsFromPoint(x, y) : []
        for (const n of list) {
          const res = checkNode(n)
          if (res.allow) return false
          if (res.protected) return true
        }
      }
      // Walk ancestors from the target
      let node = el
      while (node && node !== document) {
        const res = checkNode(node)
        if (res.allow) return false
        if (res.protected) return true
        node = node.parentElement
      }
      return false
    }

    const onContextMenu = (e) => {
      if (isProtectedTarget(e.target, e.clientX, e.clientY)) {
        e.preventDefault()
        e.stopPropagation()
        if (e.stopImmediatePropagation) e.stopImmediatePropagation()
      }
    }

    const onDragStart = (e) => {
      if (isProtectedTarget(e.target, e.clientX, e.clientY)) {
        e.preventDefault()
        e.stopPropagation()
        if (e.stopImmediatePropagation) e.stopImmediatePropagation()
      }
    }

    const imgHandlers = new WeakMap()
    const attachImgGuards = (img) => {
      if (!img || imgHandlers.has(img)) return
      const h = {
        ctx: (e) => { e.preventDefault(); e.stopPropagation(); if (e.stopImmediatePropagation) e.stopImmediatePropagation() },
        drag: (e) => { e.preventDefault(); e.stopPropagation(); if (e.stopImmediatePropagation) e.stopImmediatePropagation() },
      }
      try { img.setAttribute('draggable', 'false') } catch {}
      img.addEventListener('contextmenu', h.ctx, true)
      img.addEventListener('dragstart', h.drag, true)
      imgHandlers.set(img, h)
    }

    const detachImgGuards = (img) => {
      const h = imgHandlers.get(img)
      if (!h) return
      img.removeEventListener('contextmenu', h.ctx, true)
      img.removeEventListener('dragstart', h.drag, true)
      imgHandlers.delete(img)
    }

    const makeImgsUndraggable = (root = document) => {
      const imgs = root.querySelectorAll ? root.querySelectorAll('img') : []
      imgs.forEach((img) => attachImgGuards(img))
    }
    makeImgsUndraggable()

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes && m.addedNodes.forEach((n) => {
          if (n.nodeType === 1) {
            if (n.tagName === 'IMG') attachImgGuards(n)
            else makeImgsUndraggable(n)
          }
        })
        m.removedNodes && m.removedNodes.forEach((n) => {
          if (n.nodeType === 1 && n.tagName === 'IMG') detachImgGuards(n)
        })
      }
    })
    observer.observe(document.documentElement, { childList: true, subtree: true })

    const onMouseOrPointerDown = (e) => {
      if (e.button === 2 && isProtectedTarget(e.target, e.clientX, e.clientY)) {
        e.preventDefault()
        e.stopPropagation()
        if (e.stopImmediatePropagation) e.stopImmediatePropagation()
      }
    }
    const onAuxClick = (e) => {
      if (e.button === 1 && isProtectedTarget(e.target, e.clientX, e.clientY)) {
        e.preventDefault()
        e.stopPropagation()
        if (e.stopImmediatePropagation) e.stopImmediatePropagation()
      }
    }

    const onKeyDown = (e) => {
      const isKbdMenu = (e.key === 'ContextMenu') || (e.shiftKey && (e.key === 'F10'))
      if (isKbdMenu && isProtectedTarget(e.target)) {
        e.preventDefault()
        e.stopPropagation()
        if (e.stopImmediatePropagation) e.stopImmediatePropagation()
      }
    }

    document.addEventListener('contextmenu', onContextMenu, true)
    document.addEventListener('dragstart', onDragStart, true)
    document.addEventListener('mousedown', onMouseOrPointerDown, true)
    document.addEventListener('pointerdown', onMouseOrPointerDown, true)
    document.addEventListener('auxclick', onAuxClick, true)
    document.addEventListener('keydown', onKeyDown, true)
    if (document.body) document.body.addEventListener('contextmenu', onContextMenu, true)
    if (window) window.addEventListener('contextmenu', onContextMenu, true)

    return () => {
      document.removeEventListener('contextmenu', onContextMenu, true)
      document.removeEventListener('dragstart', onDragStart, true)
      document.removeEventListener('mousedown', onMouseOrPointerDown, true)
      document.removeEventListener('pointerdown', onMouseOrPointerDown, true)
      document.removeEventListener('auxclick', onAuxClick, true)
      document.removeEventListener('keydown', onKeyDown, true)
      if (document.body) document.body.removeEventListener('contextmenu', onContextMenu, true)
      if (window) window.removeEventListener('contextmenu', onContextMenu, true)
      observer.disconnect()
    }
  }, [])

  return null
}
