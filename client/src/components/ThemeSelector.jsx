import { motion } from 'motion/react'
import { useApp } from '../context/AppContext'

import { THEMES } from './themeConstants'

export default function ThemeSelector({ compact = false }) {
    const { theme, setTheme } = useApp()
    return (
        <div className={compact ? 'flex gap-2' : 'grid gap-3 sm:grid-cols-3'} role="radiogroup" aria-label="Theme">
            {THEMES.map(t => (
                <button key={t.id} role="radio" aria-checked={theme === t.id} title={t.name} onClick={() => setTheme(t.id)}
                    className={compact ? 'relative h-7 w-7 rounded-full cursor-pointer' : 'btn relative flex-col !items-start !p-3 text-left'}
                    style={compact ? { background: t.sw } : undefined}>
                    {!compact && <span className="block h-14 w-full rounded-md" style={{ background: t.sw }} />}
                    {!compact && <span className="text-sm">{t.name}</span>}
                    {theme === t.id && (
                        <motion.span layoutId={compact ? 'ring-c' : 'ring'} className="absolute -inset-0.5 rounded-[inherit] pointer-events-none"
                            style={{ border: '2px solid var(--accent)' }} transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                    )}
                </button>
            ))}
        </div>
    )
}