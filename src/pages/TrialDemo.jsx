import { useNavigate } from 'react-router-dom'

/**
 * TrialDemo — Acceso rápido para previsualizar /trial
 * Ruta: /trial-demo
 * Eliminar cuando ya no se necesite.
 */
export default function TrialDemo() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-xs text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
          Demo — Trial Expirando
        </p>
        <button
          onClick={() => navigate('/trial')}
          className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-2xl text-sm hover:bg-gray-800 transition-colors"
        >
          Ver página
        </button>
      </div>
    </div>
  )
}
