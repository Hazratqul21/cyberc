import { useEffect, useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
} from 'recharts'
import { BASE_KPI, HOURLY_EVENTS, SEVERITY_DIST, SOURCE_DIST } from '../data/mockData.js'
import { useTheme } from '../context/ThemeContext.jsx'
import Icon from '../components/Icon.jsx'

const fmt = (n) => n.toLocaleString('uz-UZ').replace(/,/g, ' ')

// KPI karta uchun mini sparkline (dekorativ trend chizig'i)
function Spark({ color, seed }) {
  const pts = Array.from({ length: 16 }, (_, i) => 10 - Math.sin(i / 2 + seed) * 5 - (i % 3) * 1.1)
  const d = pts.map((y, i) => `${i === 0 ? 'M' : 'L'}${(i / 15) * 72},${y}`).join(' ')
  return (
    <svg viewBox="0 0 72 20" className="h-5 w-full" preserveAspectRatio="none">
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
    </svg>
  )
}

function KpiCard({ title, value, sub, trend, color = '#4A9BD4', icon, seed = 0 }) {
  return (
    <div className="group rounded-xl border border-line bg-navy/70 p-4 transition-colors hover:border-accent/40">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 text-[10px] font-semibold uppercase leading-tight tracking-wider text-ink-faint">{title}</div>
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: color + '22', color }}>
          <Icon name={icon} size={15} />
        </div>
      </div>
      <div className="mt-1.5 whitespace-nowrap font-mono text-[21px] font-bold tracking-tight" style={{ color }}>{value}</div>
      <div className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-[10px] text-ink-dim">
        {trend != null && (
          <span className={`shrink-0 font-semibold ${trend < 0 ? 'text-sev-low' : 'text-sev-high'}`}>
            {trend < 0 ? '▼' : '▲'} {Math.abs(trend)}%
          </span>
        )}
        <span className="truncate">{sub}</span>
      </div>
      <div className="mt-2 opacity-70"><Spark color={color} seed={seed} /></div>
    </div>
  )
}

export default function Overview({ tenant }) {
  const { chart } = useTheme()
  const tooltipStyle = {
    background: chart.tipBg, border: `1px solid ${chart.tipBorder}`, borderRadius: 8,
    fontSize: 12, color: chart.tipText,
  }
  const [kpi, setKpi] = useState(BASE_KPI)

  // Tenant almashganda va har 5 soniyada raqamlar "jonli" o'zgaradi
  useEffect(() => {
    const compute = () => ({
      activeAlerts: Math.round(BASE_KPI.activeAlerts * tenant.mult * (0.97 + Math.random() * 0.06)),
      endpoints: Math.round(BASE_KPI.endpoints * tenant.mult),
      openIncidents: Math.max(1, Math.round(BASE_KPI.openIncidents * tenant.mult * (0.9 + Math.random() * 0.2))),
      compliance: Math.min(99, Math.round(BASE_KPI.compliance + (tenant.mult - 0.5) * 6)),
      blockedToday: Math.round(BASE_KPI.blockedToday * tenant.mult * (0.97 + Math.random() * 0.06)),
      mttr: Math.max(4, Math.round(BASE_KPI.mttr * (0.9 + Math.random() * 0.25))),
    })
    setKpi(compute())
    const t = setInterval(() => setKpi(compute()), 5000)
    return () => clearInterval(t)
  }, [tenant])

  return (
    <div className="space-y-5">
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight">Umumiy ko'rinish</h1>
          <p className="text-[12px] text-ink-dim">{tenant.name} · real vaqt telemetriyasi</p>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-sev-low">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-sev-low" /> Jonli oqim faol
        </span>
      </div>

      {/* KPI kartalar */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-6 lg:grid-cols-3">
        <KpiCard title="Faol ogohlantirishlar" value={fmt(kpi.activeAlerts)} sub="so'nggi 24 soat" trend={8} color="#F76B15" icon="bell" seed={0.5} />
        <KpiCard title="Himoyalangan endpointlar" value={fmt(kpi.endpoints)} sub="agent qamrovi 99.4%" trend={-2} color="#4A9BD4" icon="shield-check" seed={1.2} />
        <KpiCard title="Ochiq incidentlar" value={fmt(kpi.openIncidents)} sub="3 tasi kritik" trend={-12} color="#E5484D" icon="alert-triangle" seed={2.1} />
        <KpiCard title="Compliance ball" value={kpi.compliance + '%'} sub="6 ta reglament" trend={-3} color="#46A758" icon="badge-check" seed={3.4} />
        <KpiCard title="Bloklangan hujumlar" value={fmt(kpi.blockedToday)} sub="bugun, avtomatik" trend={14} color="#FFB224" icon="shield-ban" seed={4.7} />
        <KpiCard title="O'rtacha javob vaqti" value={kpi.mttr + ' daq'} sub="MTTR · maqsad: 15" trend={-9} color="#4A9BD4" icon="clock" seed={5.9} />
      </div>

      {/* Grafiklar */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-xl border border-line bg-navy/70 p-4 xl:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-[13px] font-bold">So'nggi 24 soatlik hodisalar</h2>
              <p className="text-[11px] text-ink-faint">Aniqlangan va bloklangan hujumlar dinamikasi</p>
            </div>
            <div className="flex gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-ink-dim"><span className="h-2 w-2 rounded-full bg-accent-bright" /> Hodisalar</span>
              <span className="flex items-center gap-1.5 text-ink-dim"><span className="h-2 w-2 rounded-full bg-sev-low" /> Bloklangan</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={HOURLY_EVENTS} margin={{ top: 4, right: 4, bottom: 0, left: -18 }}>
              <defs>
                <linearGradient id="gEv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4A9BD4" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#4A9BD4" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gBl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#46A758" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#46A758" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={chart.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="hour" tick={{ fill: chart.axis, fontSize: 10 }} tickLine={false} axisLine={{ stroke: chart.grid }} interval={2} />
              <YAxis tick={{ fill: chart.axis, fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="hodisalar" name="Hodisalar" stroke="#4A9BD4" strokeWidth={2} fill="url(#gEv)" />
              <Area type="monotone" dataKey="bloklangan" name="Bloklangan" stroke="#46A758" strokeWidth={2} fill="url(#gBl)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-line bg-navy/70 p-4">
          <h2 className="text-[13px] font-bold">Severity bo'yicha taqsimot</h2>
          <p className="mb-2 text-[11px] text-ink-faint">Faol ogohlantirishlar</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={SEVERITY_DIST} dataKey="value" nameKey="name" innerRadius={52} outerRadius={78} paddingAngle={3} strokeWidth={0}>
                {SEVERITY_DIST.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ color: '#8FA3BF', fontSize: 11 }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 border-t border-line pt-3">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">Manba bo'yicha (%)</div>
            <ResponsiveContainer width="100%" height={110}>
              <BarChart data={SOURCE_DIST} margin={{ top: 0, right: 4, bottom: 0, left: -26 }}>
                <CartesianGrid stroke={chart.grid} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: chart.axis, fontSize: 9 }} tickLine={false} axisLine={{ stroke: chart.grid }} />
                <YAxis tick={{ fill: chart.axis, fontSize: 9 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: chart.cursor }} />
                <Bar dataKey="value" name="Ulush" fill="#2E6F9E" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
