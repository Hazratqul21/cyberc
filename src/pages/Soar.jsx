import { useEffect, useState } from 'react'
import { PLAYBOOKS, PB_STATUS } from '../data/mockData.js'
import Icon from '../components/Icon.jsx'

const STAT_CARDS = [
  { label: 'Bugun ishga tushdi', value: 47, color: '#4A9BD4' },
  { label: 'Muvaffaqiyatli', value: 44, color: '#46A758' },
  { label: 'Tasdiq kutmoqda', value: 2, color: '#FFB224' },
  { label: "O'rtacha bajarilish", value: '4.2s', color: '#8FA3BF' },
]

export default function Soar({ tenant }) {
  const [playbooks, setPlaybooks] = useState(PLAYBOOKS)

  // "Bajarilmoqda" playbook qadamlari sekin oldinga siljiydi
  useEffect(() => {
    const t = setInterval(() => {
      setPlaybooks((prev) =>
        prev.map((p) => {
          if (p.status !== 'running') return p
          const next = Math.min(p.steps, p.stepsDone + 1)
          return next === p.steps
            ? { ...p, stepsDone: next, status: 'done', duration: '18.6s' }
            : { ...p, stepsDone: next }
        }),
      )
    }, 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight">SOAR — Avtomatik javob markazi</h1>
          <p className="text-[12px] text-ink-dim">{tenant.name} · playbook orkestratsiyasi</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg border border-accent/60 bg-accent/20 px-3.5 py-2 text-[12px] font-semibold text-accent-bright hover:bg-accent/30">
          <Icon name="plus" size={15} /> Yangi playbook
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STAT_CARDS.map((s) => (
          <div key={s.label} className="rounded-xl border border-line bg-navy/70 p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">{s.label}</div>
            <div className="mt-1 font-mono text-[24px] font-bold" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-line bg-navy/70">
        <div className="grid min-w-[880px] grid-cols-[90px_1fr_1fr_170px_130px_80px] gap-3 border-b border-line bg-surface/60 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-ink-faint">
          <div>ID</div><div>Playbook</div><div>Trigger</div><div>Bajarilish</div><div>Status</div><div>Vaqt</div>
        </div>
        {playbooks.map((p) => {
          const st = PB_STATUS[p.status]
          const pct = Math.round((p.stepsDone / p.steps) * 100)
          return (
            <div key={p.id} className="grid min-w-[880px] grid-cols-[90px_1fr_1fr_170px_130px_80px] items-center gap-3 border-b border-line/50 px-4 py-3 text-[12px] hover:bg-surface/50">
              <div className="font-mono text-[11px] text-accent-bright">{p.id}</div>
              <div className="font-medium text-ink">{p.name}</div>
              <div className="truncate text-ink-dim" title={p.trigger}>{p.trigger}</div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: st.color }} />
                </div>
                <span className="font-mono text-[10px] text-ink-faint">{p.stepsDone}/{p.steps}</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium" style={{ color: st.color }}>
                {p.status === 'running' && <span className="pulse-dot h-1.5 w-1.5 rounded-full" style={{ background: st.color }} />}
                {st.label}
                {p.status === 'awaiting' && (
                  <button className="ml-1 rounded border border-sev-medium/50 bg-sev-medium/15 px-1.5 py-0.5 text-[10px] font-bold text-sev-medium hover:bg-sev-medium/25">
                    Tasdiqlash
                  </button>
                )}
              </div>
              <div className="font-mono text-[11px] text-ink-dim">{p.time}</div>
            </div>
          )
        })}
      </div>

      <div className="rounded-xl border border-line bg-navy/70 p-4">
        <h3 className="mb-2 text-[12px] font-bold uppercase tracking-wider text-ink-faint">So'nggi avtomatik harakatlar</h3>
        <div className="grid grid-cols-1 gap-2 text-[12px] lg:grid-cols-2">
          {[
            ['14:32', 'IP 45.147.230.18 perimetr firewallda bloklandi (barcha segmentlar)'],
            ['14:18', "Akkaunt s.rashidova muzlatildi, 3 ta faol sessiya majburiy uzildi"],
            ['14:15', 'SRV-FIN-012 tarmoqdan izolyatsiya qilindi, snapshot olindi'],
            ['13:57', '214 ta pochta qutisidan fishing xat avtomatik o\'chirildi'],
            ['13:22', 'WAF: CVE-2026-31114 uchun virtual patch qoidasi joylandi'],
            ['13:20', 'Zaxira nusxalar yaxlitligi tasdiqlandi (8/8 tekshiruv OK)'],
          ].map(([t, msg]) => (
            <div key={t + msg} className="flex items-start gap-2.5 rounded-lg bg-surface/60 px-3 py-2">
              <span className="mt-0.5 font-mono text-[10px] text-ink-faint">{t}</span>
              <span className="text-ink-dim">{msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
