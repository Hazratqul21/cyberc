import { useEffect, useRef, useState } from 'react'
import { AI_CANNED, AI_DEFAULT } from '../data/mockData.js'
import Icon from './Icon.jsx'

const INITIAL = [
  {
    role: 'ai',
    text: "Assalomu alaykum! Men KiberQalqon AI tahlilchisiman. Tizim holati, hodisalar va compliance bo'yicha tabiiy tilda savol berishingiz mumkin.\n\nMasalan: «Oxirgi 24 soatda qaysi serverlar shubhali ulanish qildi?»",
  },
]

function findAnswer(q) {
  const low = q.toLowerCase()
  let best = null
  let bestScore = 0
  for (const c of AI_CANNED) {
    const score = c.match.filter((m) => low.includes(m)).length
    if (score > bestScore) { best = c; bestScore = score }
  }
  return bestScore >= 1 ? best.answer : AI_DEFAULT
}

// Oddiy **bold** va satr bo'linishlarini render qilish
function renderText(text) {
  return text.split('\n').map((line, i) => (
    <p key={i} className={line === '' ? 'h-2' : ''}>
      {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
        part.startsWith('**') ? <strong key={j} className="font-bold text-ink">{part.slice(2, -2)}</strong> : part,
      )}
    </p>
  ))
}

export default function AiAssistant({ onClose }) {
  const [messages, setMessages] = useState(INITIAL)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottom = useRef(null)

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text) => {
    const q = (text ?? input).trim()
    if (!q || typing) return
    setMessages((m) => [...m, { role: 'user', text: q }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'ai', text: findAnswer(q) }])
      setTyping(false)
    }, 1200 + Math.random() * 900)
  }

  return (
    <aside className="flex w-80 shrink-0 flex-col border-l border-line bg-navy/60">
      <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/25 text-accent-bright ring-1 ring-accent/50">
          <Icon name="sparkles" size={17} />
        </div>
        <div className="flex-1">
          <div className="text-[13px] font-bold">AI tahlilchi</div>
          <div className="flex items-center gap-1.5 text-[10px] text-sev-low">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-sev-low" /> Onlayn · barcha qatlamlarga ulangan
          </div>
        </div>
        <button onClick={onClose} className="rounded p-1 text-ink-faint hover:bg-surface hover:text-ink">
          <Icon name="x" size={16} />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-3.5">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[92%] space-y-0.5 rounded-xl px-3 py-2.5 text-[12px] leading-relaxed ${
                m.role === 'user'
                  ? 'rounded-br-sm bg-accent/30 text-ink'
                  : 'rounded-bl-sm border border-line bg-surface text-ink-dim'
              }`}
            >
              {renderText(m.text)}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="rounded-xl rounded-bl-sm border border-line bg-surface px-3.5 py-2.5 text-[12px] text-ink-faint">
              Tahlil qilinmoqda<span className="blink">▍</span>
            </div>
          </div>
        )}
        <div ref={bottom} />
      </div>

      <div className="space-y-2 border-t border-line p-3">
        <div className="flex flex-wrap gap-1.5">
          {['Shubhali ulanishlar?', 'Fishing holati', 'Compliance holati'].map((s) => (
            <button key={s} onClick={() => send(s)}
              className="rounded-full border border-line bg-surface px-2.5 py-1 text-[10px] font-medium text-ink-dim hover:border-accent/60 hover:text-accent-bright">
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Savol yozing..."
            className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-[12px] text-ink placeholder-ink-faint outline-none focus:border-accent/70"
          />
          <button onClick={() => send()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-white hover:bg-accent-bright disabled:opacity-40"
            disabled={typing}>
            <Icon name="send" size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}
