import { motion } from 'motion/react'
import { item } from '../motion'

export function PageHeader({ title, sub, action }) {
    return (
        <motion.div variants={item} className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><h1 className="display text-3xl font-semibold md:text-4xl">{title}</h1>{sub && <p className="muted mt-1.5 max-w-xl">{sub}</p>}</div>
            {action}
        </motion.div>
    )
}

export function StatCard({ icon: Icon, label, value }) {
    return (
        <motion.div variants={item} whileHover={{ y: -4 }} className="glass p-5">
            <Icon size={18} style={{ color: 'var(--accent)' }} />
            <p className="display mt-4 text-4xl font-semibold">{value}</p>
            <p className="muted mt-1 text-sm">{label}</p>
        </motion.div>
    )
}