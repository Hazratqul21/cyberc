import { useState } from 'react'
import Glossary from './Glossary.jsx'
import Icon from './Icon.jsx'
import { GLOSSARY } from '../data/mockData.js'

const NAV = [
  { id: 'overview', label: "Umumiy ko'rinish", ru: 'Обзор', icon: 'dashboard' },
  { id: 'alerts', label: 'Jonli ogohlantirishlar', ru: 'Оповещения', icon: 'bell' },
  { id: 'map', label: 'Hujum xaritasi', ru: 'Карта атак', icon: 'radar' },
  { id: 'soar', label: 'SOAR / Avtomatik javob', ru: 'Автоответ', icon: 'zap' },
  { id: 'compliance', label: 'Compliance / Hisobotlar', ru: 'Отчёты', icon: 'file-check' },
]

// Chap panelda ko'rsatiladigan tez-tez uchraydigan atamalar
const QUICK_TERMS = ['SIEM', 'EDR', 'XDR', 'SOAR', 'C2', 'MITRE ATT&CK', 'MTTR', 'IOC']

export default function Sidebar({ page, setPage }) {
  const [glossaryOpen, setGlossaryOpen] = useState(false)

  return (
    <>
      <aside className="flex w-60 shrink-0 flex-col border-r border-line bg-navy/60">
        <div className="flex items-center gap-3 border-b border-line px-4 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/25 text-accent-bright ring-1 ring-accent/50">
            <Icon name="shield-check" size={20} strokeWidth={2} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[15px] font-bold tracking-tight">KiberQalqon</span>
              <span className="rounded bg-sev-medium/20 px-1.5 py-px text-[8px] font-bold uppercase tracking-wide text-sev-medium">Beta</span>
            </div>
            <div className="text-[10px] font-medium uppercase tracking-widest text-ink-faint">Milliy SOC platformasi</div>
          </div>
        </div>

        <nav className="space-y-1 p-3">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition-colors ${
                page === item.id
                  ? 'bg-accent/20 text-ink ring-1 ring-accent/40'
                  : 'text-ink-dim hover:bg-surface hover:text-ink'
              }`}
            >
              <Icon name={item.icon} size={18} className={`shrink-0 ${page === item.id ? 'text-accent-bright' : 'text-ink-faint'}`} />
              <span className="flex-1">
                {item.label}
                <span className="block text-[10px] font-normal text-ink-faint">{item.ru}</span>
              </span>
            </button>
          ))}
        </nav>

        {/* Atamalar lug'ati */}
        <div className="mt-1 flex min-h-0 flex-1 flex-col border-t border-line px-3 pt-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">Atamalar lug'ati</span>
            <button onClick={() => setGlossaryOpen(true)} className="text-[10px] font-semibold text-accent-bright hover:underline">
              Barchasi →
            </button>
          </div>
          <div className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
            {QUICK_TERMS.map((t) => {
              const g = GLOSSARY.find((x) => x.term === t)
              return (
                <button
                  key={t}
                  onClick={() => setGlossaryOpen(true)}
                  className="group w-full rounded-lg bg-surface/40 px-2.5 py-1.5 text-left hover:bg-surface"
                  title={g?.def}
                >
                  <div className="font-mono text-[11px] font-semibold text-accent-bright">{t}</div>
                  <div className="truncate text-[9.5px] leading-tight text-ink-faint">{g?.full}</div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="border-t border-line p-4">
          <div className="rounded-lg bg-surface p-3">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-sev-low">
              <span className="pulse-dot h-2 w-2 rounded-full bg-sev-low" />
              Barcha tizimlar ishlamoqda
            </div>
            <div className="mt-1.5 text-[10px] leading-relaxed text-ink-faint">
              SIEM · XDR · SOAR · Zero-Trust
              <br />Qamrov: 99.97% · SLA: OK
            </div>
          </div>
          <div className="mt-3 text-center text-[10px] text-ink-faint">v0.9.4-beta · build 2026.07</div>
        </div>
      </aside>

      {glossaryOpen && <Glossary onClose={() => setGlossaryOpen(false)} />}
    </>
  )
}
