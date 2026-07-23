import { useEffect, useRef, useState } from 'react'

const LINES = [
  { t: 'ok', m: 'KiberQalqon yadrosi ishga tushirildi' },
  { t: 'ok', m: 'SIEM korrelyatsiya dvigateli ulandi · 14 manba' },
  { t: 'ok', m: "EDR/XDR agent tarmog'i onlayn · 48 210 endpoint" },
  { t: 'ok', m: 'Zero-Trust siyosat mesh faollashtirildi' },
  { t: 'ok', m: 'SOAR playbook orkestratori tayyor · 32 playbook' },
  { t: 'ok', m: 'Tahdid razvedkasi feed sinxron · UZ-CERT' },
  { t: 'warn', m: 'DEFCON 3 — kuchaytirilgan kuzatuv rejimi yoqildi' },
]

export default function BootScreen({ onDone }) {
  const canvasRef = useRef(null)
  const [shown, setShown] = useState(0)
  const [fading, setFading] = useState(false)

  // Matrix kod yomg'iri (brend rangida)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, W, H, cols, drops
    const chars = 'アカサタナハマヤラ0123456789ABCDEF<>[]{}#$%/\\=+*!?'.split('')
    const font = 14
    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      cols = Math.floor(W / font)
      drops = Array(cols).fill(0).map(() => (Math.random() * -H) / font)
    }
    resize()
    window.addEventListener('resize', resize)
    const draw = () => {
      ctx.fillStyle = 'rgba(9,15,26,0.10)'
      ctx.fillRect(0, 0, W, H)
      ctx.font = `${font}px "JetBrains Mono", monospace`
      for (let i = 0; i < cols; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)]
        const x = i * font
        const y = drops[i] * font
        ctx.fillStyle = Math.random() > 0.975 ? '#9AD8FF' : 'rgba(74,155,212,0.5)'
        ctx.fillText(ch, x, y)
        if (y > H && Math.random() > 0.975) drops[i] = 0
        drops[i] += 0.5
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Boot-log qatorlarini birma-bir ochish
  useEffect(() => {
    if (shown >= LINES.length) return
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 450 : 330)
    return () => clearTimeout(t)
  }, [shown])

  const enter = () => {
    setFading(true)
    setTimeout(onDone, 650)
  }

  // Barcha qatorlar ochilgach avtomatik kirish
  useEffect(() => {
    if (shown >= LINES.length) {
      const t = setTimeout(enter, 1600)
      return () => clearTimeout(t)
    }
  }, [shown]) // eslint-disable-line

  const pct = Math.round((shown / LINES.length) * 100)

  return (
    <div className={`fixed inset-0 z-[100] overflow-hidden bg-[#090F1A] transition-opacity duration-700 ${fading ? 'opacity-0' : 'opacity-100'}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#090F1A]/50 via-transparent to-[#090F1A]" />

      <button onClick={enter} className="absolute right-5 top-5 z-10 font-mono text-[11px] text-[#5B7194] hover:text-[#9AD8FF]">
        o'tkazib yuborish →
      </button>

      <div className="relative flex h-full flex-col items-center justify-center px-6">
        <div className="boot-glow mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4A9BD4]/15 ring-1 ring-[#4A9BD4]/40">
          <svg viewBox="0 0 24 24" className="h-9 w-9 fill-[#9AD8FF]">
            <path d="M12 1 3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4zm0 2.2 7 3.1V11c0 4.5-3 8.9-7 10-4-1.1-7-5.5-7-10V6.3l7-3.1zM11 7v5l4 2.3.8-1.4-3.3-1.9V7H11z" />
          </svg>
        </div>
        <h1 className="boot-title text-center text-[26px] font-extrabold text-white sm:text-3xl">KIBERQALQON</h1>
        <p className="mt-2 text-center text-[10px] font-medium uppercase tracking-[0.45em] text-[#4A9BD4]">Milliy Kiberxavfsizlik Markazi</p>

        <div className="mt-8 h-[188px] w-full max-w-lg overflow-hidden rounded-xl border border-[#4A9BD4]/20 bg-[#0B1220]/70 p-4 font-mono text-[12px] leading-relaxed backdrop-blur">
          {LINES.slice(0, shown).map((l, i) => (
            <div key={i} className="fade-in flex items-center gap-2">
              <span className={l.t === 'warn' ? 'text-[#FFB224]' : 'text-[#46A758]'}>
                [{l.t === 'warn' ? 'WARN' : ' OK '}]
              </span>
              <span className="text-[#B7C7DC]">{l.m}</span>
            </div>
          ))}
          {shown < LINES.length && <span className="text-[#4A9BD4]">&gt; <span className="blink">▊</span></span>}
        </div>

        <div className="mt-5 w-full max-w-lg">
          <div className="mb-1.5 flex justify-between font-mono text-[10px] text-[#5B7194]">
            <span>TIZIM YUKLANMOQDA</span><span>{pct}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-[#1B2A4A]">
            <div className="h-full rounded-full bg-gradient-to-r from-[#2E6F9E] to-[#9AD8FF] transition-all duration-500" style={{ width: pct + '%' }} />
          </div>
        </div>

        {shown >= LINES.length && (
          <button onClick={enter} className="boot-enter mt-7 rounded-lg border border-[#4A9BD4]/50 bg-[#4A9BD4]/15 px-6 py-2.5 text-[13px] font-bold tracking-wide text-[#9AD8FF] hover:bg-[#4A9BD4]/25">
            BOSHQARUV MARKAZIGA KIRISH →
          </button>
        )}
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-[10px] text-[#3A4E6E]">
        v0.9.4-beta · PRELIMINARY · maxfiy namuna — real ma'lumot emas
      </div>
    </div>
  )
}
