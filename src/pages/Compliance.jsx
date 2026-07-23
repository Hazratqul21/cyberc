import { COMPLIANCE } from '../data/mockData.js'
import Icon from '../components/Icon.jsx'

const scoreColor = (s) => (s >= 90 ? '#46A758' : s >= 80 ? '#FFB224' : '#F76B15')

const REPORTS = [
  { name: 'Haftalik SOC hisoboti (rahbariyat uchun)', date: '2026-07-21', size: '2.4 MB', type: 'PDF' },
  { name: 'Oylik incidentlar tahlili — iyun 2026', date: '2026-07-03', size: '5.1 MB', type: 'PDF' },
  { name: 'PCI DSS oraliq audit hisoboti', date: '2026-06-28', size: '8.7 MB', type: 'PDF' },
  { name: 'Zaifliklar skaneri natijalari (Q2)', date: '2026-06-30', size: '3.2 MB', type: 'XLSX' },
]

export default function Compliance({ tenant }) {
  const avg = Math.round(COMPLIANCE.reduce((s, c) => s + c.score, 0) / COMPLIANCE.length)

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight">Compliance va hisobotlar</h1>
          <p className="text-[12px] text-ink-dim">{tenant.name} · normativ talablarga muvofiqlik</p>
        </div>
        <div className="flex items-center gap-2 text-[12px]">
          <span className="text-ink-dim">Umumiy ball:</span>
          <span className="rounded-lg border border-sev-low/40 bg-sev-low/15 px-3 py-1 font-mono text-[15px] font-bold text-sev-low">{avg}%</span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-line bg-navy/70">
        <div className="grid min-w-[840px] grid-cols-[1fr_180px_220px_110px_110px] gap-3 border-b border-line bg-surface/60 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-ink-faint">
          <div>Reglament / standart</div><div>Organ</div><div>Bajarilish</div><div>Controllar</div><div>So'nggi audit</div>
        </div>
        {COMPLIANCE.map((c) => (
          <div key={c.name} className="grid min-w-[840px] grid-cols-[1fr_180px_220px_110px_110px] items-center gap-3 border-b border-line/50 px-4 py-3.5 text-[12px] hover:bg-surface/50">
            <div className="font-medium text-ink">{c.name}</div>
            <div className="text-ink-dim">{c.org}</div>
            <div className="flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface">
                <div className="h-full rounded-full transition-all" style={{ width: `${c.score}%`, background: scoreColor(c.score) }} />
              </div>
              <span className="w-9 text-right font-mono text-[12px] font-bold" style={{ color: scoreColor(c.score) }}>{c.score}%</span>
            </div>
            <div className="font-mono text-[11px] text-ink-dim">{c.controls}</div>
            <div className="font-mono text-[11px] text-ink-faint">{c.audit}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-xl border border-line bg-navy/70 p-4">
          <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wider text-ink-faint">Tayyor hisobotlar</h3>
          <div className="space-y-2">
            {REPORTS.map((r) => (
              <div key={r.name} className="flex items-center gap-3 rounded-lg bg-surface/60 px-3.5 py-2.5 text-[12px] hover:bg-surface">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-accent/20 font-mono text-[9px] font-bold text-accent-bright">{r.type}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-ink">{r.name}</div>
                  <div className="text-[10px] text-ink-faint">{r.date} · {r.size}</div>
                </div>
                <button className="flex items-center gap-1 rounded border border-line px-2.5 py-1 text-[11px] font-semibold text-ink-dim hover:border-accent/60 hover:text-accent-bright">
                  <Icon name="download" size={13} /> Yuklab olish
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-line bg-navy/70 p-4">
          <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wider text-ink-faint">Yaqinlashayotgan muddatlar</h3>
          <div className="space-y-2.5 text-[12px]">
            {[
              ['2026-08-15', 'Markaziy bank — choraklik xavfsizlik hisoboti', '#FFB224', '23 kun qoldi'],
              ['2026-09-01', "O'zDSt 2814 — yillik qayta sertifikatlash", '#FFB224', '40 kun qoldi'],
              ['2026-10-12', 'PCI DSS — yillik tashqi audit (QSA)', '#4A9BD4', '81 kun qoldi'],
              ['2026-11-05', 'ISO 27001 — kuzatuv auditi', '#4A9BD4', '105 kun qoldi'],
            ].map(([date, name, color, left]) => (
              <div key={name} className="flex items-center gap-3 rounded-lg bg-surface/60 px-3.5 py-2.5">
                <span className="font-mono text-[11px] text-ink-faint">{date}</span>
                <span className="flex-1 text-ink-dim">{name}</span>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ color, background: color + '22' }}>{left}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-accent/30 bg-accent/10 p-3 text-[11px] leading-relaxed text-ink-dim">
            <span className="font-semibold text-accent-bright">AI tavsiyasi:</span> NIST CSF bo'yicha 8 ta control avtomatlashtirish
            orqali 2 hafta ichida yopilishi mumkin — bu umumiy ballni 87% dan 91% ga ko'taradi.
          </div>
        </div>
      </div>
    </div>
  )
}
