import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Pencil, Trash2, X } from 'lucide-react'
import { container, item } from '../motion'
import { PageHeader } from '../components/ui'
import { useApp } from '../context/AppContext'

export default function History({ initial = 'all' }) {
    const { posts, updatePost, removePost } = useApp()
    const [q, setQ] = useState('')
    const [filter, setFilter] = useState(initial)
    const [editing, setEditing] = useState(null)
    const list = posts.filter(p => (filter === 'all' || p.status === filter) && p.text.toLowerCase().includes(q.toLowerCase()))

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="pb-24 md:pb-0">
            <PageHeader title={initial === 'draft' ? 'Saved drafts' : 'Post history'} sub="Search, edit and manage everything you've generated." />
            <motion.div variants={item} className="mb-5 flex flex-wrap gap-3">
                <div className="relative min-w-56 flex-1"><Search size={16} className="muted absolute left-3 top-3.5" />
                    <input className="field !pl-9" placeholder="Search posts" value={q} onChange={e => setQ(e.target.value)} /></div>
                {['all', 'generated', 'draft'].map(f => (
                    <button key={f} onClick={() => setFilter(f)} className="btn capitalize" style={filter === f ? { background: 'var(--surface-2)', borderColor: 'var(--accent)' } : undefined}>{f}</button>
                ))}
            </motion.div>
            <div className="space-y-3">
                <AnimatePresence>
                    {list.map(p => (
                        <motion.article key={p.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -30 }} whileHover={{ y: -2 }} className="glass flex gap-4 p-5">
                            <div className="min-w-0 flex-1">
                                <p className="muted mb-1 text-xs capitalize">{p.status} · {new Date(p.createdAt).toLocaleString()}</p>
                                <p className="line-clamp-3 whitespace-pre-line text-sm">{p.text}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button className="btn !p-2" aria-label="Edit" onClick={() => setEditing({ ...p })}><Pencil size={15} /></button>
                                <button className="btn !p-2" aria-label="Delete" onClick={() => removePost(p.id)}><Trash2 size={15} /></button>
                            </div>
                        </motion.article>
                    ))}
                </AnimatePresence>
                {list.length === 0 && <p className="muted glass p-8 text-center text-sm">No posts match.</p>}
            </div>
            <AnimatePresence>
                {editing && (
                    <motion.div className="fixed inset-0 z-30 grid place-items-center bg-black/60 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditing(null)}>
                        <motion.div role="dialog" aria-modal className="glass w-full max-w-xl !bg-[var(--bg)] p-5" initial={{ scale: .95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .95, opacity: 0 }} onClick={e => e.stopPropagation()}>
                            <div className="mb-3 flex justify-between"><h2 className="display font-semibold">Edit post</h2><button aria-label="Close" onClick={() => setEditing(null)}><X size={18} /></button></div>
                            <textarea className="field" rows={10} value={editing.text} onChange={e => setEditing({ ...editing, text: e.target.value })} />
                            <button className="btn btn-primary mt-3" onClick={() => { updatePost(editing.id, { text: editing.text }); setEditing(null) }}>Save changes</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}