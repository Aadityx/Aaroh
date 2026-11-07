import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ImagePlus, X } from 'lucide-react'

export default function ImageUploader({ images, setImages }) {
    const [drag, setDrag] = useState(false)
    const input = useRef(null)

    const add = files => {
        const fresh = [...files].filter(f => f.type.startsWith('image/')).map(f => ({ id: crypto.randomUUID(), url: URL.createObjectURL(f), name: f.name, progress: 0 }))
        setImages(s => [...s, ...fresh])
        fresh.forEach(img => {
            const t = setInterval(() => {
                setImages(s => s.map(i => (i.id === img.id ? { ...i, progress: Math.min(100, i.progress + 20) } : i)))
            }, 160)
            setTimeout(() => clearInterval(t), 900) // simulated upload; wire real upload later
        })
    }
    const remove = id => setImages(s => { const x = s.find(i => i.id === id); if (x) URL.revokeObjectURL(x.url); return s.filter(i => i.id !== id) })

    return (
        <div>
            <motion.div onDragOver={e => { e.preventDefault(); setDrag(true) }} onDragLeave={() => setDrag(false)}
                onDrop={e => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files) }}
                animate={{ scale: drag ? 1.02 : 1 }} onClick={() => input.current.click()} role="button" tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && input.current.click()}
                className="navbtn flex cursor-pointer flex-col items-center gap-2 rounded-2xl p-6 text-center"
                style={{ border: `1.5px dashed ${drag ? 'var(--accent)' : 'var(--border)'}`, background: drag ? 'var(--surface-2)' : 'var(--surface)' }}>
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 3 }}><ImagePlus style={{ color: 'var(--accent)' }} /></motion.div>
                <p className="text-sm font-medium">Drop photos here or click to browse</p>
                <p className="muted text-xs">PNG, JPG, WebP · multiple allowed</p>
                <input ref={input} type="file" accept="image/*" multiple hidden onChange={e => { add(e.target.files); e.target.value = '' }} />
            </motion.div>
            <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
                <AnimatePresence>
                    {images.map(i => (
                        <motion.div key={i.id} layout initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .8 }}
                            className="group relative aspect-square overflow-hidden rounded-xl">
                            <img src={i.url} alt={i.name} className="h-full w-full object-cover" />
                            {i.progress < 100 && (
                                <div className="absolute inset-0 grid place-items-end bg-black/50 p-2">
                                    <div className="h-1 w-full overflow-hidden rounded bg-white/30"><motion.div className="h-full" style={{ background: 'var(--accent)' }} animate={{ width: `${i.progress}%` }} /></div>
                                </div>
                            )}
                            <button onClick={() => remove(i.id)} aria-label={`Remove ${i.name}`}
                                className="absolute right-1.5 top-1.5 grid h-6 w-6 cursor-pointer place-items-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100 focus:opacity-100"><X size={14} /></button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}