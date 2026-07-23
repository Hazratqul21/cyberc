import { createContext, useContext } from 'react'

// Mavzuga bog'liq, Tailwind tokenlariga tushmaydigan ranglar
// (SVG xarita, Recharts, inline style'lar uchun)
export const CHART = {
  dark: {
    grid: '#24344F', axis: '#5B7194', tipBg: '#16233C', tipBorder: '#24344F',
    tipText: '#E6EDF6', cursor: 'rgba(74,155,212,0.08)', legend: '#8FA3BF',
    mapText: '#B7C7DC', mapDim: '#3A4E6E', mapTitle: '#8FA3BF', mapDots: '#24344F',
    mapNodeRing: '#0F1A2E', chip: '#16233C', chipBorder: '#24344F', badgeBg: '#0F1A2E',
  },
  light: {
    grid: '#E2E9F2', axis: '#8496AE', tipBg: '#FFFFFF', tipBorder: '#D7E0EC',
    tipText: '#16233C', cursor: 'rgba(46,111,158,0.08)', legend: '#47597A',
    mapText: '#2B3B55', mapDim: '#8496AE', mapTitle: '#47597A', mapDots: '#C7D4E4',
    mapNodeRing: '#FFFFFF', chip: '#EEF3F9', chipBorder: '#D7E0EC', badgeBg: '#FFFFFF',
  },
}

export const ThemeContext = createContext(null)

export const useTheme = () => useContext(ThemeContext)
