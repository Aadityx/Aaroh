import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Wand2, Eraser, Loader2 } from 'lucide-react'
import { container, item } from '../motion'
import { PageHeader } from '../components/ui'
import ImageUploader from '../components/ImageUploader'
import PostPreview from '../components/PostPreview'
import { generatePost } from '../services/api'
import { useApp } from '../context/AppContext'

export default function CreatePost() {
    const { profile, addPost } = useApp()
    const [report, setReport] = useState('')
    const [context, setContext] = useState('')
    const [images, setImages] = useState([])
    const [result, setResult] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPreview, setShowPreview] = useState(false)

    const run = async () => {
        setLoading(true); setShowPreview(true); setError('')
        try {
            const text = await generatePost({ report, context, profile, imageCount: images.length })
            setResult(text)
            addPost({ text, report, status: 'generated', images: images.length })
        } catch { setError('Something went wrong. Please try again.') }
        finally { setLoading(false) }
    }
    const reset = () => { setReport(''); setContext(''); setImages([]); setResult(''); setShowPreview(false); setError('') }

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="pb-24 md:pb-0">
            <PageHeader title="Create post" sub="Describe what you did, add photos, and Aaroh drafts the post." />
            <div className="grid gap-5 xl:grid-cols-2">
                <motion.div variants={item} className="space-y-4">
                    <div className="glass p-5">
                        <textarea className="field" rows={9} value={report} onChange={e => setReport(e.target.value.slice(0, 3000))}
                            placeholder="What happened? Describe the event, project or experience, what you did and what you learned…" />
                        <p className="muted mt-1 text-right text-xs">{report.length} / 3000</p>
                        <input className="field mt-3" value={context} onChange={e => setContext(e.target.value)} placeholder="Optional instructions (e.g. mention my team, keep it short)" />
                    </div>
                    <div className="glass p-5"><ImageUploader images={images} setImages={setImages} /></div>
                    <div className="flex gap-3">
                        <motion.button whileHover={{ y: -2 }} whileTap={{ scale: .97 }} className="btn btn-primary" disabled={loading || report.trim().length < 20} onClick={run}>
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}{loading ? 'Writing…' : 'Generate LinkedIn post'}</motion.button>
                        <button className="btn" onClick={reset}><Eraser size={16} />Clear</button>
                    </div>
                    {error && <p role="alert" className="text-sm" style={{ color: '#f87171' }}>{error}</p>}
                </motion.div>
                <motion.div variants={item}>
                    <AnimatePresence mode="wait">
                        {showPreview ? (
                            <motion.div key="p" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                                <PostPreview text={result} setText={setResult} images={images} loading={loading} onRegenerate={run}
                                    onSave={() => addPost({ text: result, report, status: 'draft', images: images.length })} />
                            </motion.div>
                        ) : (
                            <motion.div key="e" exit={{ opacity: 0 }} className="glass muted grid min-h-72 place-items-center p-8 text-center text-sm">Your post preview will appear here.</motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    )
}