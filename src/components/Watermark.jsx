// Doimiy "preliminary" ogohlantirish belgisi — namuna ekanini bildiradi
export default function Watermark() {
  return (
    <div className="pointer-events-none fixed bottom-2.5 left-1/2 z-[60] -translate-x-1/2 select-none">
      <div className="flex items-center gap-1.5 rounded-full border border-sev-medium/30 bg-sev-medium/10 px-3 py-1 text-[10px] font-semibold text-sev-medium backdrop-blur-sm">
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-sev-medium" />
        PRELIMINARY DEMO · real ma'lumot emas · maxfiy namuna
      </div>
    </div>
  )
}
