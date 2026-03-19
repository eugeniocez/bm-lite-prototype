import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'

const BARBERIA = 'BarberMonster'

export default function Bienvenida() {
  const navigate = useNavigate()

  // Evento de conversión — en producción reemplazar con analytics real
  useEffect(() => {
    console.log('[conversión] registro_completado', { timestamp: new Date().toISOString() })
  }, [])

  const handleEmpezar = () => {
    localStorage.setItem('bm-bienvenida-vista', 'true')
    navigate('/quickbook')
  }

  return (
    <div className="fixed inset-0 max-w-md mx-auto bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-8 text-center">
      {/* Ícono de éxito */}
      <div className="w-20 h-20 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center mb-8 shadow-lg">
        <Check size={40} className="text-white dark:text-gray-900" strokeWidth={2.5} />
      </div>

      {/* Bienvenida */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        ¡Bienvenido a {BARBERIA}!
      </h1>

      {/* Mini-tip */}
      <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-10">
        Agenda tu primera cita y ve cómo funciona.
      </p>

      {/* CTA */}
      <button
        onClick={handleEmpezar}
        className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-xl text-base hover:bg-gray-800 dark:hover:bg-gray-100 active:scale-95 transition-all shadow-sm"
      >
        Agendar mi primera cita
        <ArrowRight size={18} />
      </button>
    </div>
  )
}
