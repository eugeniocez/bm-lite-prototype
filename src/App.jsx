import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import BottomNav from './components/shared/BottomNav'
import Sidebar from './components/shared/Sidebar'
import QuickBook from './pages/QuickBook'
import Calendario from './pages/Calendario'
import Clientes from './pages/Clientes'
import Invite from './pages/Invite'
import Inicio from './pages/Inicio'
import Registro from './pages/Registro'
import Login from './pages/Login'
import TrialExpirando from './pages/TrialExpirando'
import TrialDemo from './pages/TrialDemo'
import QuickConfirm from './pages/QuickConfirm'
import SettingsPage from './pages/Settings'
import SettingsProfilePage from './pages/SettingsProfile'
import SettingsSubscriptionPage from './pages/SettingsSubscription'
import SettingsCancelSubscriptionPage from './pages/SettingsCancelSubscription'
import FAQPage from './pages/FAQ'
import Toast from './components/shared/Toast'
import { useToastStore } from './store/toast'

function AppContent() {
  const location = useLocation()
  const sinNav = ['/inicio', '/registro', '/login', '/trial', '/trial-demo', '/quickconfirm'].includes(location.pathname)
  const sinNavApp = ['/settings/profile', '/settings/subscription', '/settings/subscription/cancel', '/faq'].includes(location.pathname)
  const { visible, mensaje, ocultar } = useToastStore()
  const vistaPreviamente = localStorage.getItem('bm-inicio-vista') === 'true'

  if (location.pathname === '/' && vistaPreviamente) {
    return <Navigate to="/quickbook" replace />
  }
  if (location.pathname === '/inicio' && vistaPreviamente) {
    return <Navigate to="/quickbook" replace />
  }

  // Pantallas de auth — sin nav, centradas
  if (sinNav) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/trial" element={<TrialExpirando />} />
          <Route path="/trial-demo" element={<TrialDemo />} />
          <Route path="/quickconfirm" element={<QuickConfirm />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/profile" element={<SettingsProfilePage />} />
          <Route path="/settings/subscription" element={<SettingsSubscriptionPage />} />
          <Route path="/settings/subscription/cancel" element={<SettingsCancelSubscriptionPage />} />
        </Routes>
      </div>
    )
  }

  // App principal — con nav
  return (
    <div className="h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 flex">

      {/* Sidebar — tablet y desktop */}
      {!sinNavApp && <Sidebar />}

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">

        {/* En móvil: columna centrada max-w-md. En md+: full width */}
        <div className="flex-1 flex flex-col h-full w-full max-w-md mx-auto md:max-w-none md:mx-0 relative overflow-hidden">
          <main className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-950 flex flex-col">
            <Routes>
              <Route path="/" element={<Navigate to="/quickbook" replace />} />
              <Route path="/quickbook" element={<QuickBook />} />
              <Route path="/calendario" element={<Calendario />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/invite" element={<Invite />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/settings/profile" element={<SettingsProfilePage />} />
              <Route path="/settings/subscription" element={<SettingsSubscriptionPage />} />
              <Route path="/settings/subscription/cancel" element={<SettingsCancelSubscriptionPage />} />
              <Route path="/faq" element={<FAQPage />} />
            </Routes>
          </main>

          {/* BottomNav — solo móvil */}
          {!sinNavApp && <BottomNav />}
        </div>
      </div>
    <Toast visible={visible} mensaje={mensaje} onClose={ocultar} />
    </div>
  )
}

export default function App() {
  return <AppContent />
}
