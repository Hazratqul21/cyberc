import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

const CHART = {
  dark: { grid: '#24344F', axis: '#5B7194', tipBg: '#16233C', tipBorder: '#24344F', tipText: '#E6EDF6', cursor: 'rgba(74,155,212,0.08)' },
  light: { grid: '#E2E9F2', axis: '#8496AE', tipBg: '#FFFFFF', tipBorder: '#D7E0EC', tipText: '#16233C', cursor: 'rgba(46,111,158,0.08)' },
}

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

export const useTheme = () => useContext(ThemeContext)
