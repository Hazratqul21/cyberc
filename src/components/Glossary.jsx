import { useState } from 'react'
import { GLOSSARY } from '../data/mockData.js'
import Icon from './Icon.jsx'

export default function Glossary({ onClose }) {
  const [q, setQ] = useState('')
  const low = q.toLowerCase()
  const list = GLOSSARY.filter(
    (g) => g.term.toLowerCase().includes(low) || g.full.toLowerCase().includes(low) || g.def.toLowerCase().includes(low),
  )

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-black/50 backdrop-blur-[2px]" onClick={onClose}>
      <div
        className="flex h-full w-full max-w-[480px] flex-col overflow-hidden border-r border-line bg-navy shadow-2xl shadow-black/60"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/25 text-accent-bright ring-1 ring-accent/50">
            <Icon name="book-open" size={17} />
          </div>
          <div className="flex-1">
            <h2 className="text-[14px] font-bold">Atamalar lug'ati</h2>
            <p className="text-[10px] text-ink-faint">Kiberxavfsizlik qisqartmalari va tushunchalari</p>
          </div>
          <button onClick={onClose} className="rounded p-1.5 text-ink-faint hover:bg-surface hover:text-ink">
            <Icon name="x" size={16} />
          </button>
        </div>

        <div className="border-b border-line p-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Atama qidirish... (masalan: SIEM, C2, MITRE)"
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-[12px] text-ink placeholder-ink-faint outline-none focus:border-accent/70"
          />
        </div>

        <div className="flex-1 space-y-2.5 overflow-y-auto p-3.5">
          {list.map((g) => (
            <div key={g.term} className="rounded-xl border border-line bg-surface/50 p-3.5">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[13px] font-bold text-accent-bright">{g.term}</span>
                <span className="text-[10px] text-ink-faint">{g.full}</span>
              </div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-ink-dim">{g.def}</p>
            </div>
          ))}
          {list.length === 0 && (
            <div className="py-10 text-center text-[12px] text-ink-faint">«{q}» bo'yicha atama topilmadi</div>
          )}
        </div>

        <div className="border-t border-line px-4 py-2.5 text-center text-[10px] text-ink-faint">
          Jami {GLOSSARY.length} ta atama · KiberQalqon bilimlar bazasi
        </div>
      </div>
    </div>
  )
}
