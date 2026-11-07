import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'

try { document.documentElement.dataset.theme = JSON.parse(localStorage.getItem('aaroh-theme')) || 'aurora' } catch { /* default */ }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <AppProvider><App /></AppProvider>
    </MotionConfig>
  </StrictMode>,
)