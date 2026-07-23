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
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { TENANTS } from './data/mockData.js'

export default function App() {
  // Splash sessiya davomida bir marta — qayta yuklanganda takrorlanmaydi
  const [booted, setBooted] = useState(() => sessionStorage.getItem('kq-booted') === '1')
  const [page, setPage] = useState('overview')
  const [tenant, setTenant] = useState(TENANTS[0])
  // Tor ekranlarda AI paneli yopiq boshlanadi
  const [aiOpen, setAiOpen] = useState(() => window.innerWidth >= 1280)

  const finishBoot = () => {
    sessionStorage.setItem('kq-booted', '1')
    setBooted(true)
  }

  // Boot tugamaguncha dashboard umuman mount qilinmaydi (taymerlar yurmaydi)
  if (!booted) {
    return (
      <ThemeProvider>
        <BootScreen onDone={finishBoot} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div className="flex h-screen overflow-hidden bg-base">
          <Sidebar page={page} setPage={setPage} />
          <div className="flex min-w-0 flex-1 flex-col">
            <Topbar tenant={tenant} setTenant={setTenant} aiOpen={aiOpen} setAiOpen={setAiOpen} />
            <div className="flex min-h-0 flex-1">
              <main className="min-w-0 flex-1 overflow-y-auto p-5">
                {page === 'overview' && <Overview tenant={tenant} />}
                {page === 'alerts' && <LiveAlerts key={tenant.id} tenant={tenant} />}
                {page === 'map' && <ThreatMap tenant={tenant} />}
                {page === 'soar' && <Soar tenant={tenant} />}
                {page === 'compliance' && <Compliance tenant={tenant} />}
              </main>
              {aiOpen && <AiAssistant onClose={() => setAiOpen(false)} />}
            </div>
          </div>
        </div>
        <Watermark />
      </ErrorBoundary>
    </ThemeProvider>
  )
}
