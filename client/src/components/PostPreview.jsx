import { useState } from 'react'
import { motion } from 'motion/react'
import { Copy, Check, RefreshCw, Save, Globe } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function PostPreview({ text, setText, images, loading, onRegenerate, onSave }) {
    const { profile } = useApp()
    const [copied, setCopied] = useState(false)
    const copy = async () => {
        try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch { /* clipboard blocked */ }
    }
    const shown = images.slice(0, 4)

    return (
        <div className="glass overflow-hidden p-5">
            <div className="flex items-center gap-3">
                <div className="display grid h-11 w-11 place-items-center rounded-full font-semibold" style={{ background: 'var(--grad)', color: 'var(--accent-fg)' }}>{profile.name[0]}</div>
                <div><p className="text-sm font-semibold">{profile.name}</p>
                    <p className="muted flex items-center gap-1 text-xs">{profile.headline} · Now · <Globe size={11} /></p></div>
            </div>
            {loading ? (
                <div className="mt-5 space-y-3">{[100, 92, 96, 60].map((w, i) => <div key={i} className="skeleton h-4" style={{ width: `${w}%` }} />)}</div>
            ) : (
                <textarea value={text} onChange={e => setText(e.target.value)} rows={12} aria-label="Generated post" className="field mt-4 !bg-transparent !p-0 !border-0 text-[.95rem] leading-relaxed" />
            )}
            {shown.length > 0 && !loading && (
                <div className={`mt-3 grid gap-1 overflow-hidden rounded-lg ${shown.length > 1 ? 'grid-cols-2' : ''}`}>
                    {shown.map(i => <img key={i.id} src={i.url} alt="" className="aspect-video w-full object-cover" />)}
                </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                <motion.button whileTap={{ scale: .95 }} className="btn" onClick={copy} disabled={loading}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Copied' : 'Copy'}</motion.button>
                <motion.button whileTap={{ scale: .95 }} className="btn" onClick={onRegenerate} disabled={loading}><RefreshCw size={15} />Regenerate</motion.button>
                <motion.button whileTap={{ scale: .95 }} className="btn" onClick={onSave} disabled={loading}><Save size={15} />Save draft</motion.button>
            </div>
        </div>
    )
}