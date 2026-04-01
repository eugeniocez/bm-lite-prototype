import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        Ya estás dentro. Ahora pruébalo registrando tu primera cita.
      </h1>

      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-10">
        No necesita ser una cita real — usa tu número o el de un amigo y ve cómo le llega el SMS de confirmación.
      </p>

      <button
        onClick={handleEmpezar}
        className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-xl text-base hover:bg-gray-800 dark:hover:bg-gray-100 active:scale-95 transition-all shadow-sm"
      >
        Crear cita de prueba
        <ArrowRight size={18} />
      </button>

      <div className="mt-4 text-sm text-gray-400 dark:text-gray-500">
        <span>¿Ya tienes una cita real? </span>
        <button
          onClick={handleEmpezar}
          className="inline-flex items-center gap-1 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <span>Regístrala aquí también</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}