import { useEffect, useState } from 'react'
import { CHART, ThemeContext } from './themeStore.js'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('kq-theme') || 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('kq-theme', theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle, chart: CHART[theme] }}>
      {children}
    </ThemeContext.Provider>
  )
}
