import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Browsers restore scroll position on reload by default. This site's load
// veil + hero entrance are time-based, not visibility-gated, so a restored
// deep scroll position let whatever was on screen reveal (and finish)
// silently behind the still-opaque veil — the user never saw it happen.
// Opting out here, as early as possible, so every load starts at the top
// like a fresh navigation does.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
