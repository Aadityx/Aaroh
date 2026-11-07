import { motion } from 'motion/react'
import { ArrowRight, FileText, Bookmark, CalendarDays } from 'lucide-react'
import { container, item } from '../motion'
import { StatCard } from '../components/ui'
import { useApp } from '../context/AppContext'

import { useState } from 'react'

export default function Dashboard({ onNavigate }) {
    const { posts, profile } = useApp()
    const [now] = useState(() => Date.now())
    const week = posts.filter(p => now - p.createdAt < 6048e5).length
    return (
        <motion.div variants={container} initial="hidden" animate="show">
            <motion.section variants={item} className="glass relative overflow-hidden p-8 md:p-12">
                <motion.div className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-40 blur-3xl" style={{ background: 'var(--grad)' }}
                    animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity }} />
                <p className="muted relative text-sm">Welcome back</p>
                <h1 className="display relative mt-2 text-4xl font-semibold md:text-6xl">Hello, <span className="gradient-text">{profile.name}</span>.</h1>
                <p className="muted relative mt-4 max-w-lg">Turn a rough note about what you did into a polished LinkedIn post, written in your voice and ready to edit.</p>
                <motion.button whileHover={{ y: -2 }} whileTap={{ scale: .97 }} onClick={() => onNavigate('create')} className="btn btn-primary relative mt-7">
                    Create new post <ArrowRight size={16} /></motion.button>
            </motion.section>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <StatCard icon={FileText} label="Total posts" value={posts.length} />
                <StatCard icon={Bookmark} label="Saved drafts" value={posts.filter(p => p.status === 'draft').length} />
                <StatCard icon={CalendarDays} label="This week" value={week} />
            </div>
            <motion.section variants={item} className="mt-8 pb-24 md:pb-0">
                <h2 className="display mb-3 text-lg font-semibold">Recent activity</h2>
                {posts.length === 0 ? <p className="muted glass p-6 text-sm">Nothing yet. Your first post will show up here.</p> :
                    <div className="space-y-2">{posts.slice(0, 4).map(p => (
                        <div key={p.id} className="glass flex items-center justify-between gap-4 p-4">
                            <p className="truncate text-sm">{p.text}</p>
                            <span className="muted shrink-0 text-xs">{p.status} · {new Date(p.createdAt).toLocaleDateString()}</span>
                        </div>))}</div>}
            </motion.section>
        </motion.div>
    )
}