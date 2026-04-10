import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import BottomNav from './components/shared/BottomNav'
import Sidebar from './components/shared/Sidebar'
import Modal from './components/shared/Modal'
import TrialNoticeContent, { TRIAL_DAYS_DEMO } from './components/shared/TrialNoticeContent'
import QuickBook from './pages/QuickBook'
import Calendario from './pages/Calendario'
import Clientes from './pages/Clientes'
import Invite from './pages/Invite'
import InviteBlocked from './pages/InviteBlocked'
import Inicio from './pages/Inicio'
import Registro from './pages/Registro'
import Login from './pages/Login'
import AvisoTrial from './pages/AvisoTrial'
import QuickConfirm from './pages/QuickConfirm'
import SettingsPage from './pages/Settings'
import SettingsProfilePage from './pages/SettingsProfile'
import SettingsSubscriptionPage from './pages/SettingsSubscription'
import SettingsCancelSubscriptionPage from './pages/SettingsCancelSubscription'
import FAQPage from './pages/FAQ'
import WizardPreviewIndex from './pages/WizardPreviewIndex'
import Toast from './components/shared/Toast'
import { useNegocioStore } from './store/negocio'
import { useToastStore } from './store/toast'

function AppContent() {
  const location = useLocation()
  const navigate = useNavigate()
  const sinNav = ['/inicio', '/registro', '/login', '/aviso-trial', '/quickconfirm'].includes(location.pathname)
  const sinNavApp = ['/settings/profile', '/settings/subscription', '/settings/subscription/cancel', '/faq'].includes(location.pathname)
  const sinNavPreview = location.pathname === '/wizard-preview'
  const { visible, mensaje, ocultar } = useToastStore()
  const nombreBarberia = useNegocioStore(s => s.nombreBarberia)
  const plan = useNegocioStore(s => s.plan)
  const vistaPreviamente = localStorage.getItem('bm-inicio-vista') === 'true'
  const [isDesktopOrTablet, setIsDesktopOrTablet] = useState(() => window.innerWidth >= 768)
  const [trialModalOpen, setTrialModalOpen] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const handleChange = (event) => setIsDesktopOrTablet(event.matches)

    setIsDesktopOrTablet(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  if (location.pathname === '/' && vistaPreviamente) {
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
          <Route path="/aviso-trial" element={<AvisoTrial />} />
          <Route path="/quickconfirm" element={<QuickConfirm />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/profile" element={<SettingsProfilePage />} />
          <Route path="/settings/subscription" element={<SettingsSubscriptionPage />} />
          <Route path="/settings/subscription/cancel" element={<SettingsCancelSubscriptionPage />} />
        </Routes>
      </div>
    )
  }

  const mostrarAvisoTrialModal =
    isDesktopOrTablet &&
    trialModalOpen &&
    plan === 'trial' &&
    TRIAL_DAYS_DEMO <= 5 &&
    !sinNav &&
    !sinNavApp &&
    !sinNavPreview

  // App principal — con nav
  return (
    <div className="h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 flex">

      {/* Sidebar — tablet y desktop */}
      {!sinNavApp && !sinNavPreview && <Sidebar />}

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">

        {/* En móvil: columna centrada max-w-md. En md+: full width */}
        <div className="flex-1 flex flex-col h-full w-full max-w-md mx-auto md:max-w-none md:mx-0 relative overflow-hidden">
          <main className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-950 flex flex-col">
            <Routes>
              <Route path="/" element={<Navigate to="/quickbook" replace />} />
              <Route path="/wizard-preview" element={<WizardPreviewIndex />} />
              <Route path="/quickbook/preview/primer-uso" element={<QuickBook previewWizard="first-use" />} />
              <Route path="/calendario/preview/primer-uso" element={<Calendario previewWizard="colors" />} />
              <Route path="/clientes/preview/primer-uso" element={<Clientes previewWizard="intro" />} />
              <Route path="/invite/preview/primer-uso" element={<Invite previewWizard="intro" />} />
              <Route path="/quickbook" element={<QuickBook />} />
              <Route path="/calendario" element={<Calendario />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/invite" element={<Invite />} />
              <Route path="/invite-bloqueada" element={<InviteBlocked />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/settings/profile" element={<SettingsProfilePage />} />
              <Route path="/settings/subscription" element={<SettingsSubscriptionPage />} />
              <Route path="/settings/subscription/cancel" element={<SettingsCancelSubscriptionPage />} />
              <Route path="/faq" element={<FAQPage />} />
            </Routes>
          </main>

          {/* BottomNav — solo móvil */}
          {!sinNavApp && !sinNavPreview && <BottomNav />}
        </div>
      </div>
      {mostrarAvisoTrialModal && (
        <Modal
          isOpen={mostrarAvisoTrialModal}
          onClose={() => setTrialModalOpen(false)}
          closeOnBackdrop={false}
          scrollContent={false}
          panelClassName="sm:max-w-[40rem] lg:max-w-[42rem] rounded-[2rem]"
          panelStyle={{ maxHeight: '88vh' }}
          contentClassName="p-0"
        >
          <TrialNoticeContent
            dias={TRIAL_DAYS_DEMO}
            nombreBarberia={nombreBarberia || 'tu barbería'}
            variant="modal"
            onActivate={() => {
              setTrialModalOpen(false)
              navigate('/settings/subscription')
            }}
            onRemindLater={() => setTrialModalOpen(false)}
          />
        </Modal>
      )}
      <Toast visible={visible} mensaje={mensaje} onClose={ocultar} />
    </div>
  )
}

export default function App() {
  return <AppContent />
}
