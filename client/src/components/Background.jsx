import { motion } from 'motion/react'

const blobs = [
    { c: '--blob1', s: 560, x: ['-10%', '8%', '-10%'], y: ['-10%', '10%', '-10%'], p: { left: '-8%', top: '-12%' } },
    { c: '--blob2', s: 480, x: ['6%', '-8%', '6%'], y: ['0%', '-12%', '0%'], p: { right: '-6%', top: '20%' } },
    { c: '--blob3', s: 420, x: ['0%', '10%', '0%'], y: ['6%', '-6%', '6%'], p: { left: '30%', bottom: '-18%' } },
]

export default function Background() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
            {blobs.map((b, i) => (
                <motion.div key={i} className="absolute rounded-full"
                    style={{ ...b.p, width: b.s, height: b.s, background: `var(${b.c})`, opacity: 'var(--blob-op)', filter: 'blur(110px)' }}
                    animate={{ x: b.x, y: b.y }} transition={{ duration: 18 + i * 5, repeat: Infinity, ease: 'easeInOut' }} />
            ))}
        </div>
    )
}