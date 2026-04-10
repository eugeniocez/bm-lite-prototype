import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const BARBERIA = 'BarberMonster'

export default function Inicio() {
  const navigate = useNavigate()

  // Evento de conversión — en producción reemplazar con analytics real
  useEffect(() => {
    console.log('[conversión] registro_completado', { timestamp: new Date().toISOString() })
  }, [])

  const handleEmpezar = () => {
    localStorage.setItem('bm-inicio-vista', 'true')
    navigate('/quickbook')
  }

  return (
    <div className="fixed inset-0 max-w-md mx-auto bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-8 text-center">
      {/* Logo isotipo */}
      <img
        src="/apple-touch-icon.png"
        alt="BarberMonster"
        className="w-24 h-24 mb-8"
      />

      {/* Inicio */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
        Ya estás dentro. Ahora pruébalo registrando tu primera cita.
      </h1>

          <ul className="mb-7 mx-auto w-fit max-w-xs space-y-2.5 text-sm text-gray-500 dark:text-gray-400 text-left">
        <li className="flex items-start gap-2.5">
          <CheckCircle2
            size={16}
            strokeWidth={2.2}
            className="mt-0.5 shrink-0"
            style={{ color: '#1b7de2' }}
          />
          <span>No necesita ser una cita real</span>
        </li>
        <li className="flex items-start gap-2.5">
          <CheckCircle2
            size={16}
            strokeWidth={2.2}
            className="mt-0.5 shrink-0"
            style={{ color: '#1b7de2' }}
          />
          <span>Puedes usar tu número o el de un amigo</span>
        </li>
        <li className="flex items-start gap-2.5">
          <CheckCircle2
            size={16}
            strokeWidth={2.2}
            className="mt-0.5 shrink-0"
            style={{ color: '#1b7de2' }}
          />
          <span>Ve cómo llega el SMS de confirmación en segundos</span>
        </li>
      </ul>

      <button
        onClick={handleEmpezar}
        className="w-full flex items-center justify-center gap-2 bg-[#1b7de2] text-white font-bold py-4 rounded-xl text-base hover:bg-[#166bc1] active:scale-95 transition-all shadow-sm"
      >
        Crear cita de prueba
        <ArrowRight size={18} />
      </button>
    </div>
  )
}