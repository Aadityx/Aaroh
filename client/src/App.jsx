import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Background from './components/Background'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import CreatePost from './pages/CreatePost'
import History from './pages/History'
import Settings from './pages/Settings'
import { page } from './motion'

export default function App() {
  const [active, setActive] = useState('dashboard')
  const views = {
    dashboard: <Dashboard onNavigate={setActive} />,
    create: <CreatePost />,
    history: <History />,
    drafts: <History initial="draft" />,
    settings: <Settings />,
  }
  return (
    <div className="flex min-h-screen">
      <Background />
      <Sidebar active={active} onNavigate={setActive} />
      <main className="mx-auto w-full max-w-6xl flex-1 overflow-x-hidden p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div key={active} {...page}>{views[active]}</motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}