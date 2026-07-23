import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext.jsx'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import Overview from './pages/Overview.jsx'
import LiveAlerts from './pages/LiveAlerts.jsx'
import ThreatMap from './pages/ThreatMap.jsx'
import Soar from './pages/Soar.jsx'
import Compliance from './pages/Compliance.jsx'
import AiAssistant from './components/AiAssistant.jsx'
import BootScreen from './components/BootScreen.jsx'
import Watermark from './components/Watermark.jsx'
import { TENANTS } from './data/mockData.js'

export default function App() {
  const [booted, setBooted] = useState(false)
  const [page, setPage] = useState('overview')
  const [tenant, setTenant] = useState(TENANTS[0])
  const [aiOpen, setAiOpen] = useState(true)

  return (
    <ThemeProvider>
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
      <div className="flex h-screen overflow-hidden bg-base">
        <Sidebar page={page} setPage={setPage} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar tenant={tenant} setTenant={setTenant} aiOpen={aiOpen} setAiOpen={setAiOpen} />
          <div className="flex min-h-0 flex-1">
            <main className="min-w-0 flex-1 overflow-y-auto p-5">
              {page === 'overview' && <Overview tenant={tenant} />}
              {page === 'alerts' && <LiveAlerts tenant={tenant} />}
              {page === 'map' && <ThreatMap tenant={tenant} />}
              {page === 'soar' && <Soar tenant={tenant} />}
              {page === 'compliance' && <Compliance tenant={tenant} />}
            </main>
            {aiOpen && <AiAssistant onClose={() => setAiOpen(false)} />}
          </div>
        </div>
      </div>
      <Watermark />
    </ThemeProvider>
  )
}
