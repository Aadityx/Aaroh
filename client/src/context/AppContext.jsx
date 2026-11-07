import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const Ctx = createContext(null)

export function AppProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('aaroh-theme', 'aurora')
  const [posts, setPosts] = useLocalStorage('aaroh-posts', [])
  const [profile, setProfile] = useLocalStorage('aaroh-profile', {
    name: 'Aditya', headline: 'Member, Lumivision', tone: 'Professional', length: 'Medium', hashtags: true, emoji: false,
  })

  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])

  const addPost = useCallback(p => setPosts(s => [{ id: crypto.randomUUID(), createdAt: Date.now(), ...p }, ...s]), [setPosts])
  const updatePost = useCallback((id, patch) => setPosts(s => s.map(p => (p.id === id ? { ...p, ...patch } : p))), [setPosts])
  const removePost = useCallback(id => setPosts(s => s.filter(p => p.id !== id)), [setPosts])

  const value = useMemo(() => ({ theme, setTheme, posts, addPost, updatePost, removePost, profile, setProfile }),
    [theme, setTheme, posts, addPost, updatePost, removePost, profile, setProfile])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(Ctx)