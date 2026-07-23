import { useEffect, useState } from 'react'
import { initialAlerts, makeAlert, SEVERITIES, STATUSES } from '../data/mockData.js'
import { useTheme } from '../context/themeStore.js'
import Icon from '../components/Icon.jsx'

const timeStr = (d) =>
  d.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

const repColor = (r) => (r >= 80 ? '#E5484D' : r >= 50 ? '#F76B15' : r >= 25 ? '#FFB224' : '#46A758')

// MITRE texnika kodini rasmiy havolaga aylantiradi (T1110.001 → T1110/001)
const mitreUrl = (id) => `https://attack.mitre.org/techniques/${id.replace('.', '/')}/`

function Field({ label, children, mono }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint">{label}</div>
      <div className={`mt-0.5 text-[12px] text-ink ${mono ? 'font-mono text-[11px]' : ''}`}>{children}</div>
    </div>
  )
}

function AlertDetail({ alert, onClose }) {
  const { chart } = useTheme()
  const sev = SEVERITIES[alert.severity]
  const st = STATUSES[alert.status]

  // Escape tugmasi bilan yopish
  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/50 backdrop-blur-[2px]" onClick={onClose}>
      <div
        className="flex h-full w-full max-w-[460px] flex-col overflow-hidden border-l border-line bg-navy shadow-2xl shadow-black/60"
        onClick={(e) => e.stopPropagation()}
        role="dialog" aria-modal="true" aria-label="Ogohlantirish tafsiloti"
      >
        <div className="border-b border-line p-4" style={{ background: sev.bg }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                  style={{ color: sev.color, background: chart.badgeBg }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: sev.color }} />
                  {sev.label}
                </span>
                <span className="font-mono text-[11px] text-ink-dim">{alert.id}</span>
                <span className="text-[11px] font-medium" style={{ color: st.color }}>{st.label}</span>
              </div>
              <h2 className="mt-2 text-[14px] font-bold leading-snug text-ink">{alert.title}</h2>
            </div>
            <button onClick={onClose} aria-label="Yopish"
              className="shrink-0 rounded p-1.5 text-ink-faint hover:bg-base/40 hover:text-ink">
              <Icon name="x" size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Aniqlangan vaqt" mono>{alert.time.toLocaleDateString('uz-UZ')} {timeStr(alert.time)}</Field>
            <Field label="Manba tizim">{alert.source}</Field>
            <Field label="Obyekt" mono>{alert.host}</Field>
            <Field label="Mas'ul tahlilchi">{alert.analyst}</Field>
          </div>

          <div className="rounded-xl border border-line bg-surface/60 p-3.5">
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-ink-faint">Tahdid manbasi (IP razvedkasi)</h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[13px] font-bold text-ink">{alert.ip}</span>
                <span className="flex items-center gap-2">
                  <span className="text-[10px] text-ink-faint">Reputatsiya xavfi</span>
                  <span className="rounded px-2 py-0.5 font-mono text-[11px] font-bold"
                    style={{ color: repColor(alert.rep), background: repColor(alert.rep) + '22' }}>
                    {alert.rep}/100
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <Field label="Egasi / tashkilot">{alert.ipOwner}</Field>
                <Field label="ASN" mono>{alert.asn}</Field>
                <Field label="Geolokatsiya">{alert.geo}</Field>
                <Field label="Birinchi ko'rilgan" mono>{alert.firstSeen}</Field>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-surface/60 p-3.5">
            <h3 className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-ink-faint">MITRE ATT&CK klassifikatsiyasi</h3>
            <div className="flex flex-wrap gap-1.5">
              {alert.mitre.map((m) => (
                <a key={m.id} href={mitreUrl(m.id)} target="_blank" rel="noopener noreferrer"
                  title={`${m.id} — attack.mitre.org saytida ochish`}
                  className="flex items-center gap-1 rounded-md border border-accent/40 bg-accent/15 px-2 py-1 font-mono text-[10px] font-semibold text-accent-bright hover:bg-accent/25">
                  {m.id} · {m.name}
                  <Icon name="external-link" size={10} />
                </a>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px]">
              <span className="text-ink-faint">Kill chain bosqichi:</span>
              <span className="font-semibold text-ink">{alert.stage}</span>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-faint">Texnik dalillar (log)</h3>
            <div className="space-y-1.5">
              {alert.evidence.map((e, i) => (
                <div key={i} className="rounded-lg bg-base/80 px-3 py-2 font-mono text-[10.5px] leading-relaxed text-ink-dim">
                  {e}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-faint">Javob choralari</h3>
            <div className="space-y-1.5">
              {alert.actions.map((a, i) => (
                <div key={i} className="flex items-start gap-2 text-[12px] text-ink-dim">
                  <Icon name="check" size={14} className="mt-0.5 shrink-0 text-sev-low" />
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 border-t border-line p-3.5">
          <button className="flex-1 rounded-lg bg-accent px-3 py-2.5 text-[12px] font-bold text-white hover:bg-accent-bright">
            Incident ochish
          </button>
          <button className="flex-1 rounded-lg border border-line bg-surface px-3 py-2.5 text-[12px] font-semibold text-ink-dim hover:text-ink">
            Playbook tayinlash
          </button>
          <button className="rounded-lg border border-line bg-surface px-3 py-2.5 text-[12px] font-semibold text-ink-faint hover:text-ink">
            False positive
          </button>
        </div>
      </div>
    </div>
  )
}

export default function LiveAlerts({ tenant }) {
  const { chart } = useTheme()
  // Tenant almashganda komponent App'dagi key orqali qayta mount bo'ladi
  const [alerts, setAlerts] = useState(() => initialAlerts(Math.max(6, Math.round(18 * tenant.mult))))
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [paused, setPaused] = useState(false)

  // Jonli oqim — kichik mijozda kamroq alert keladi
  useEffect(() => {
    if (paused) return
    let timer
    const tick = () => {
      setAlerts((prev) => [makeAlert(), ...prev].slice(0, 60))
      timer = setTimeout(tick, (2500 + Math.random() * 3000) / Math.max(0.35, tenant.mult))
    }
    timer = setTimeout(tick, 2500)
    return () => clearTimeout(timer)
  }, [paused, tenant])

  const shown = alerts.filter((a) => filter === 'all' || a.severity === filter)
  const counts = alerts.reduce((m, a) => ((m[a.severity] = (m[a.severity] || 0) + 1), m), {})

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h1 className="text-lg font-bold tracking-tight">Jonli ogohlantirishlar oqimi</h1>
          <p className="text-[12px] text-ink-dim">{tenant.name} · SIEM + EDR + Cloud korrelyatsiyasi · qatorni bosib to'liq tafsilotni oching</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-1.5 text-[11px] font-medium ${paused ? 'text-sev-medium' : 'text-sev-low'}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${paused ? 'bg-sev-medium' : 'pulse-dot bg-sev-low'}`} />
            {paused ? 'Oqim to\'xtatilgan' : 'Oqim ulangan'} · {alerts.length} ta yozuv
          </span>
          <button onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Oqimni davom ettirish' : "Oqimni to'xtatib turish"}
            className={`rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition-colors ${
              paused
                ? 'border-sev-low/50 bg-sev-low/15 text-sev-low hover:bg-sev-low/25'
                : 'border-line bg-surface text-ink-dim hover:text-ink'
            }`}>
            {paused ? '▶ Davom ettirish' : '❚❚ Pauza'}
          </button>
        </div>
      </div>

      {/* Severity filtrlar */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilter('all')}
          className={`rounded-full border px-3.5 py-1.5 text-[12px] font-semibold ${filter === 'all' ? 'border-accent bg-accent/20 text-accent-bright' : 'border-line bg-surface text-ink-dim hover:text-ink'}`}>
          Barchasi ({alerts.length})
        </button>
        {Object.entries(SEVERITIES).map(([k, s]) => (
          <button key={k} onClick={() => setFilter(k)}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold ${filter === k ? 'text-ink' : 'text-ink-dim hover:text-ink'}`}
            style={{
              borderColor: filter === k ? s.color : chart.chipBorder,
              background: filter === k ? s.bg : chart.chip,
            }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
            {s.label} ({counts[k] || 0})
          </button>
        ))}
      </div>

      {/* Jadval */}
      <div className="overflow-x-auto rounded-xl border border-line bg-navy/70">
        <div className="grid min-w-[820px] grid-cols-[90px_70px_1fr_150px_120px_130px] gap-3 border-b border-line bg-surface/60 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-ink-faint">
          <div>Vaqt</div><div>Manba</div><div>Tavsif</div><div>Obyekt</div><div>Severity</div><div>Status</div>
        </div>
        <div className="max-h-[calc(100vh-300px)] min-w-[820px] overflow-y-auto">
          {shown.map((a, i) => {
            const sev = SEVERITIES[a.severity]
            const st = STATUSES[a.status]
            return (
              <div key={a.id} onClick={() => setSelected(a)}
                className={`grid cursor-pointer grid-cols-[90px_70px_1fr_150px_120px_130px] items-center gap-3 border-b border-line/50 px-4 py-2.5 text-[12px] hover:bg-surface/50 ${i === 0 && !paused ? 'row-in' : ''}`}>
                <div className="font-mono text-[11px] text-ink-dim">{timeStr(a.time)}</div>
                <div><span className="rounded bg-accent/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-accent-bright">{a.source}</span></div>
                <div className="truncate text-ink" title={a.title}>{a.title}</div>
                <div className="truncate font-mono text-[11px] text-ink-dim">{a.host}</div>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ color: sev.color, background: sev.bg }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: sev.color }} />
                    {sev.label}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: st.color }}>
                  {a.status === 'new' && <span className="pulse-dot h-1.5 w-1.5 rounded-full" style={{ background: st.color }} />}
                  {st.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {selected && <AlertDetail alert={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
