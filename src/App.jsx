import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import BottomNav from './components/shared/BottomNav'
import QuickBook from './pages/QuickBook'
import Calendario from './pages/Calendario'
import Directorio from './pages/Directorio'
import Invite from './pages/Invite'
import Bienvenida from './pages/Bienvenida'

function AppContent() {
  const location = useLocation()
  const enBienvenida = location.pathname === '/bienvenida'
  const vistaPreviamente = localStorage.getItem('bm-bienvenida-vista') === 'true'

  if (location.pathname === '/' && vistaPreviamente) {
    return <Navigate to="/quickbook" replace />
  }

  if (enBienvenida && vistaPreviamente) {
    return <Navigate to="/quickbook" replace />
  }

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col relative shadow-xl">
      <main className={`flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 ${enBienvenida ? '' : 'pb-20'}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/bienvenida" replace />} />
          <Route path="/bienvenida" element={<Bienvenida />} />
          <Route path="/quickbook" element={<QuickBook />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/directorio" element={<Directorio />} />
          <Route path="/invite" element={<Invite />} />
        </Routes>
      </main>
      {!enBienvenida && <BottomNav />}
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <AppContent />
    </div>
  )
}
