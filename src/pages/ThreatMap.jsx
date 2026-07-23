import { useEffect, useMemo, useState } from 'react'
import { MAP_SOURCES } from '../data/mockData.js'
import { UZ_PATH, MAP_CITIES } from '../data/uzMap.js'

const NEIGHBORS = [
  { name: "QOZOG'ISTON", x: 300, y: 88 },
  { name: 'TURKMANISTON', x: 225, y: 330 },
  { name: "AFG'ONISTON", x: 465, y: 395 },
  { name: 'TOJIKISTON', x: 565, y: 330 },
  { name: "QIRG'IZISTON", x: 665, y: 200 },
]

function randomAttacks(n = 7) {
  const list = []
  for (let i = 0; i < n; i++) {
    const src = MAP_SOURCES[Math.floor(Math.random() * MAP_SOURCES.length)]
    const dst = MAP_CITIES[Math.floor(Math.random() * MAP_CITIES.length)]
    list.push({ id: `${src.id}-${dst.id}-${i}`, src, dst })
  }
  return list
}

const ATTACK_TYPES = [
  { type: 'DDoS', color: '#E5484D', count: 34 },
  { type: 'Brute-force', color: '#F76B15', count: 128 },
  { type: 'Port scan', color: '#FFB224', count: 412 },
  { type: 'Malware C2', color: '#4A9BD4', count: 17 },
]

export default function ThreatMap({ tenant }) {
  const [attacks, setAttacks] = useState(() => randomAttacks())
  const [total, setTotal] = useState(591)

  useEffect(() => {
    const t = setInterval(() => {
      setAttacks(randomAttacks(5 + Math.floor(Math.random() * 5)))
      setTotal((v) => v + Math.floor(Math.random() * 9) + 1)
    }, 3000)
    return () => clearInterval(t)
  }, [])

  const topCities = useMemo(
    () => [...MAP_CITIES].sort((a, b) => b.weight - a.weight).slice(0, 4),
    [],
  )

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight">Hujum xaritasi — real vaqt</h1>
          <p className="text-[12px] text-ink-dim">{tenant.name} · geografik hujum oqimlari (so'nggi 60 daqiqa)</p>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-sev-critical">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-sev-critical" /> {total} faol hujum manbasi kuzatilmoqda
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_280px]">
        {/* Xarita */}
        <div className="relative overflow-hidden rounded-xl border border-line bg-navy/70">
          <svg viewBox="0 0 800 460" className="w-full">
            {/* Fon nuqta-to'ri */}
            <defs>
              <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#24344F" />
              </pattern>
              <radialGradient id="uzGlow" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#2E6F9E" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#2E6F9E" stopOpacity="0.05" />
              </radialGradient>
            </defs>
            <rect width="800" height="460" fill="url(#dots)" />

            {/* Qo'shni davlatlar yorlig'i */}
            {NEIGHBORS.map((n) => (
              <text key={n.name} x={n.x} y={n.y} fill="#3A4E6E" fontSize="11" fontWeight="600" letterSpacing="2" textAnchor="middle">
                {n.name}
              </text>
            ))}

            {/* O'zbekiston konturi */}
            <path d={UZ_PATH} fill="url(#uzGlow)" stroke="#2E6F9E" strokeWidth="1.5" strokeLinejoin="round" />
            <text x="355" y="192" fill="#8FA3BF" fontSize="14" fontWeight="700" letterSpacing="4" textAnchor="middle">
              O'ZBEKISTON
            </text>

            {/* Hujum chiziqlari */}
            {attacks.map((a) => {
              const mx = (a.src.x + a.dst.x) / 2
              const my = Math.min(a.src.y, a.dst.y) - 40
              return (
                <g key={a.id}>
                  <path
                    d={`M${a.src.x},${a.src.y} Q${mx},${my} ${a.dst.x},${a.dst.y}`}
                    fill="none" stroke="#E5484D" strokeWidth="1.3" opacity="0.75"
                    className="attack-line"
                  />
                  <circle cx={a.src.x} cy={a.src.y} r="3" fill="#E5484D" />
                  <text x={a.src.x + 6} y={a.src.y - 6} fill="#E5484D" fontSize="9" fontFamily="monospace" opacity="0.85">
                    {a.src.label}
                  </text>
                </g>
              )
            })}

            {/* Shaharlar */}
            {MAP_CITIES.map((c) => (
              <g key={c.id}>
                <circle cx={c.x} cy={c.y} r="3" fill="#4A9BD4" className="ping-ring" opacity="0.6" />
                <circle cx={c.x} cy={c.y} r="3.5" fill="#4A9BD4" stroke="#0F1A2E" strokeWidth="1.5" />
                <text x={c.x + 8} y={c.y + 4} fill="#B7C7DC" fontSize="10.5" fontWeight="600">{c.name}</text>
              </g>
            ))}
          </svg>

          <div className="absolute bottom-3 left-3 flex gap-4 rounded-lg border border-line bg-base/85 px-3.5 py-2 text-[10px] backdrop-blur">
            <span className="flex items-center gap-1.5 text-ink-dim"><span className="h-1.5 w-4 rounded bg-sev-critical" /> Faol hujum oqimi</span>
            <span className="flex items-center gap-1.5 text-ink-dim"><span className="h-2 w-2 rounded-full bg-accent-bright" /> Himoyalangan tugun</span>
          </div>
        </div>

        {/* Yon statistika */}
        <div className="space-y-4">
          <div className="rounded-xl border border-line bg-navy/70 p-4">
            <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wider text-ink-faint">Hujum turlari (60 daq)</h3>
            <div className="space-y-3">
              {ATTACK_TYPES.map((t) => (
                <div key={t.type}>
                  <div className="mb-1 flex justify-between text-[12px]">
                    <span className="text-ink-dim">{t.type}</span>
                    <span className="font-mono font-semibold" style={{ color: t.color }}>{t.count}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface">
                    <div className="h-full rounded-full" style={{ width: `${Math.min(100, t.count / 4.2)}%`, background: t.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-line bg-navy/70 p-4">
            <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wider text-ink-faint">Eng ko'p nishon bo'lgan hududlar</h3>
            <div className="space-y-2.5">
              {topCities.map((c, i) => (
                <div key={c.id} className="flex items-center gap-3 text-[12px]">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-surface font-mono text-[11px] font-bold text-accent-bright">{i + 1}</span>
                  <span className="flex-1 text-ink">{c.name}</span>
                  <span className="font-mono text-[11px] text-ink-dim">{Math.round(c.weight * 87)} hujum</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-sev-critical/30 bg-sev-critical/10 p-4">
            <div className="flex items-center gap-2 text-[12px] font-bold text-sev-critical">
              <span className="pulse-dot h-2 w-2 rounded-full bg-sev-critical" />
              Faol DDoS to'lqini
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-ink-dim">
              14:02 dan beri Toshkent data-markaziga yo'naltirilgan L7 DDoS. Cho'qqi: 42 Gbps.
              Trafik scrubbing markazi orqali filtrlanmoqda — xizmatlar barqaror.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
