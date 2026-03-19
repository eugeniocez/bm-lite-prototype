import { Routes, Route, Navigate } from 'react-router-dom'
import BottomNav from './components/shared/BottomNav'
import QuickBook from './pages/QuickBook'
import Calendario from './pages/Calendario'
import Directorio from './pages/Directorio'
import Invite from './pages/Invite'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="w-full max-w-md mx-auto min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col relative shadow-xl">
        <main className="flex-1 overflow-y-auto pb-20 bg-gray-50 dark:bg-gray-950">
          <Routes>
            <Route path="/" element={<Navigate to="/quickbook" replace />} />
            <Route path="/quickbook" element={<QuickBook />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/directorio" element={<Directorio />} />
            <Route path="/invite" element={<Invite />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
