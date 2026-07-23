import { Component } from 'react'

// Demo paytida bitta xato butun ekranni oqartirib yubormasligi uchun
export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('KiberQalqon — kutilmagan xato:', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-base p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sev-critical/15 text-sev-critical ring-1 ring-sev-critical/40">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z" />
            <path d="M12 9v4M12 17h.01" />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold text-ink">Kutilmagan xato yuz berdi</h1>
          <p className="mt-1 max-w-md text-[13px] text-ink-dim">
            Interfeys komponentida nosozlik aniqlandi. Sahifani qayta yuklang — boshqaruv paneli tiklanadi.
          </p>
          <p className="mt-2 font-mono text-[11px] text-ink-faint">{String(this.state.error?.message || this.state.error)}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-accent px-5 py-2.5 text-[13px] font-bold text-white hover:bg-accent-bright"
        >
          Sahifani qayta yuklash
        </button>
      </div>
    )
  }
}
