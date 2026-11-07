// MOCK generation only. No AI or LinkedIn publishing is connected.
const delay = ms => new Promise(r => setTimeout(r, ms))

async function mockGenerate({ report, context, profile }) {
    await delay(1800)
    const lines = report.trim().split(/\n+/).filter(Boolean)
    const body = lines.map(l => (l.length > 160 ? l.slice(0, 160) + '…' : l)).join('\n\n')
    const tags = profile.hashtags ? '\n\n#Learning #Growth #Community' : ''
    const em = profile.emoji ? '🚀 ' : ''
    return `${em}Excited to share a recent experience.\n\n${body}\n\nKey takeaway: showing up and building with others compounds faster than working alone.${context ? `\n\n(${context})` : ''}\n\nWhat has been your biggest learning lately?${tags}`
}

// Future wiring: point this at the existing server.
async function realGenerate(payload) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/generate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Generation failed')
    return (await res.json()).text // adjust to your server's response shape
}

export const generatePost = import.meta.env.VITE_USE_REAL_API === 'true' ? realGenerate : mockGenerate