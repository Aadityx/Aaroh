import { motion } from 'motion/react'
import { container, item } from '../motion'
import { PageHeader } from '../components/ui'
import ThemeSelector from '../components/ThemeSelector'
import { useApp } from '../context/AppContext'

// Section component moved to module scope to satisfy react-hooks/static-components rule
const Section = ({ title, children }) => (
  <motion.section variants={item} className="glass mb-5 p-5">
    <h2 className="display mb-4 font-semibold">{title}</h2>
    {children}
  </motion.section>
);

export default function Settings() {
  const { profile, setProfile } = useApp()
  const set = (k, v) => setProfile(p => ({ ...p, [k]: v }))
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl pb-24 md:pb-0">
      <PageHeader title="Settings" />
      <Section title="Theme"><ThemeSelector /></Section>
      <Section title="Profile">
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="field" value={profile.name} onChange={e => set('name', e.target.value || 'You')} aria-label="Name" />
          <input className="field" value={profile.headline} onChange={e => set('headline', e.target.value)} aria-label="Headline" />
        </div>
      </Section>
      <Section title="Generation preferences">
        <div className="grid gap-3 sm:grid-cols-2">
          <select className="field" value={profile.tone} onChange={e => set('tone', e.target.value)} aria-label="Tone">
            {['Professional', 'Conversational', 'Inspirational'].map(t => <option key={t}>{t}</option>)}
          </select>
          <select className="field" value={profile.length} onChange={e => set('length', e.target.value)} aria-label="Length">
            {['Short', 'Medium', 'Long'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        {[['hashtags', 'Add hashtags'], ['emoji', 'Use emoji']].map(([k, l]) => (
          <label key={k} className="mt-3 flex cursor-pointer items-center gap-3 text-sm">
            <input type="checkbox" checked={profile[k]} onChange={e => set(k, e.target.checked)} style={{ accentColor: 'var(--accent)' }} />{l}
          </label>
        ))}
      </Section>
      <Section title="Account"><p className="muted text-sm">Account management and LinkedIn connection are not available yet.</p></Section>
    </motion.div>
  )
}
