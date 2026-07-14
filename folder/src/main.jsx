// Critical weights loaded eagerly (above-fold text)
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-700.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Defer non-critical font weights to avoid render-blocking
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    import('@fontsource/poppins/latin-500.css')
    import('@fontsource/poppins/latin-600.css')
    import('@fontsource/poppins/latin-800.css')
  })
}

const container = document.getElementById('root')

if (container && container.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    container,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
