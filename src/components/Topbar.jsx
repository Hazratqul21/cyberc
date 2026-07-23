import { useEffect, useRef, useState } from 'react'
import { TENANTS } from '../data/mockData.js'
import { useTheme } from '../context/themeStore.js'
import Icon from './Icon.jsx'

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      title={theme === 'dark' ? "Yorug' rejim" : "Tungi rejim"}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-ink-dim hover:text-accent-bright"
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
    </button>
  )
}

function Clock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  // Doim Toshkent vaqti — foydalanuvchi qaysi mamlakatda bo'lishidan qat'i nazar
  const TZ = 'Asia/Tashkent'
  return (
    <div className="font-mono text-[12px] text-ink-dim">
      {now.toLocaleDateString('uz-UZ', { timeZone: TZ })}{' '}
      <span className="text-ink">{now.toLocaleTimeString('uz-UZ', { timeZone: TZ })}</span>
      <span className="ml-1 text-ink-faint">UTC+5</span>
    </div>
  )
}

export default function Topbar({ tenant, setTenant, aiOpen, setAiOpen }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-line bg-navy/40 px-5">
      {/* Tenant tanlagich */}
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2.5 rounded-lg border border-line bg-surface px-3.5 py-2 text-[13px] font-medium hover:border-accent/60"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-accent/25 text-[10px] font-bold text-accent-bright">
            {tenant.short[0]}
          </span>
          <span className="max-w-[140px] truncate whitespace-nowrap lg:max-w-[280px]">{tenant.name}</span>
          <Icon name="chevron-down" size={15} className={`text-ink-faint transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="absolute left-0 top-full z-50 mt-1.5 w-72 overflow-hidden rounded-lg border border-line bg-navy shadow-2xl shadow-black/50">
            <div className="border-b border-line px-3.5 py-2 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
              Himoyalanayotgan obyektlar
            </div>
            {TENANTS.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTenant(t); setOpen(false) }}
                className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[13px] hover:bg-surface ${
                  t.id === tenant.id ? 'bg-accent/15 text-ink' : 'text-ink-dim'
                }`}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded bg-accent/25 text-[10px] font-bold text-accent-bright">
                  {t.short[0]}
                </span>
                {t.name}
                {t.id === tenant.id && <Icon name="check" size={16} className="ml-auto text-accent-bright" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="hidden items-center gap-1.5 rounded-full border border-sev-critical/40 bg-sev-critical/10 px-3 py-1 text-[11px] font-semibold text-sev-critical lg:flex">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-sev-critical" />
          DEFCON 3 — Kuchaytirilgan kuzatuv
        </div>
        <Clock />
        <ThemeToggle />
        <button
          onClick={() => setAiOpen(!aiOpen)}
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[12px] font-semibold transition-colors ${
            aiOpen ? 'border-accent/60 bg-accent/20 text-accent-bright' : 'border-line bg-surface text-ink-dim hover:text-ink'
          }`}
        >
          <Icon name="sparkles" size={16} />
          AI tahlilchi
        </button>
        <div className="flex items-center gap-2.5 border-l border-line pl-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/30 text-[12px] font-bold text-accent-bright ring-1 ring-accent/50">
            AK
          </div>
          <div className="hidden xl:block">
            <div className="text-[12px] font-semibold leading-tight">A. Karimov</div>
            <div className="text-[10px] text-ink-faint">SOC boshlig'i · L3</div>
          </div>
        </div>
      </div>
    </header>
  )
}
