import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronsLeft, Sparkles } from 'lucide-react';
import ThemeSelector from './ThemeSelector'
import { useApp } from '../context/AppContext'

import { NAV } from './sidebarConstants'


export default function Sidebar({ active, onNavigate }) {
    const [open, setOpen] = useState(true)
    const { profile } = useApp()
    return (
        <>
            <motion.aside animate={{ width: open ? 248 : 76 }} transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                className="glass sticky top-3 m-3 hidden h-[calc(100vh-1.5rem)] shrink-0 flex-col p-3 md:flex">
                <div className="flex items-center gap-3 px-2 py-2">
                    <motion.div whileHover={{ rotate: 12 }} className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
                        style={{ background: 'var(--grad)', color: 'var(--accent-fg)', boxShadow: 'var(--glow)' }}><Sparkles size={18} /></motion.div>
                    {open && <span className="display text-xl font-semibold">Aaroh</span>}
                    <button onClick={() => setOpen(o => !o)} aria-label="Toggle sidebar" className="navbtn muted ml-auto cursor-pointer">
                        <motion.span animate={{ rotate: open ? 0 : 180 }} className="block"><ChevronsLeft size={18} /></motion.span>
                    </button>
                </div>
                <nav className="mt-6 flex flex-col gap-1">
                    {NAV.map(n => (
                        <button key={n.id} onClick={() => onNavigate(n.id)} title={n.label}
                            className="navbtn relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium"
                            style={{ color: active === n.id ? 'var(--text)' : 'var(--muted)' }}>
                            {active === n.id && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-xl"
                                style={{ background: 'var(--surface-2)', boxShadow: 'inset 2px 0 0 var(--accent)' }}
                                transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                            <n.icon size={18} className="relative shrink-0" />
                            <AnimatePresence>{open && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative whitespace-nowrap">{n.label}</motion.span>}</AnimatePresence>
                        </button>
                    ))}
                </nav>
                <div className="mt-auto space-y-3">
                    {open && <div className="px-2"><ThemeSelector compact /></div>}
                    <div className="flex items-center gap-3 rounded-xl p-2" style={{ background: 'var(--surface)' }}>
                        <div className="display grid h-9 w-9 shrink-0 place-items-center rounded-full font-semibold" style={{ background: 'var(--grad)', color: 'var(--accent-fg)' }}>{profile.name[0]}</div>
                        {open && <div className="min-w-0"><p className="truncate text-sm font-medium">{profile.name}</p><p className="muted truncate text-xs">{profile.headline}</p></div>}
                    </div>
                </div>
            </motion.aside>
            <nav className="glass fixed inset-x-3 bottom-3 z-20 flex justify-around p-2 md:hidden">
                {NAV.map(n => (
                    <button key={n.id} onClick={() => onNavigate(n.id)} aria-label={n.label} className="navbtn rounded-lg p-2.5"
                        style={{ color: active === n.id ? 'var(--accent)' : 'var(--muted)', background: active === n.id ? 'var(--surface-2)' : 'transparent' }}>
                        <n.icon size={20} />
                    </button>
                ))}
            </nav>
        </>
    )
}