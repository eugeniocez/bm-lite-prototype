import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'

const CODIGO_DEMO = '1234'

export default function Login() {
  const navigate = useNavigate()
  const [paso, setPaso] = useState(1)
  const [telefono, setTelefono] = useState('')
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState('')

  const handleTelefono = (val) => {
    setTelefono(val.replace(/\D/g, '').slice(0, 10))
  }

  const handleSiguiente = (e) => {
    e.preventDefault()
    setError('')
    if (paso === 1) {
      setPaso(2)
    } else if (paso === 2) {
      if (codigo === CODIGO_DEMO) {
        navigate('/quickbook')
      } else {
        setError('Código incorrecto. Usa 1234 para este demo.')
      }
    }
  }

  const inputClass = "w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-base focus:outline-none focus:border-gray-900 dark:focus:border-gray-400 transition-all"

  return (
    <div className="fixed inset-0 max-w-md mx-auto bg-white dark:bg-gray-900 flex flex-col px-8 justify-center">

      {/* PASO 1 — Teléfono */}
      {paso === 1 && (
        <>
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <img src="/logo.webp" alt="BarberMonster" className="h-10 dark:hidden" />
              <img src="/logo-white.webp" alt="BarberMonster" className="h-10 hidden dark:block" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Bienvenido de vuelta</h1>
            <p className="text-gray-400 text-sm text-center">Ingresa tu número para recibir un código de acceso.</p>
          </div>
          <form onSubmit={handleSiguiente} className="space-y-4" autoComplete="off">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Teléfono *</label>
              <input
                type="text"
                inputMode="numeric"
                value={telefono}
                onChange={e => handleTelefono(e.target.value)}
                placeholder="10 dígitos"
                required
                className={inputClass}
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-4 rounded-xl text-base hover:bg-gray-800 dark:hover:bg-gray-100 active:scale-95 transition-all mt-2"
            >
              Enviar código
              <ArrowRight size={18} />
            </button>
          </form>
          <p className="text-center text-gray-400 text-sm mt-6">
            ¿No tienes cuenta?{' '}
            <button onClick={() => navigate('/registro')} className="text-gray-900 dark:text-white font-semibold underline">
              Regístrate
            </button>
          </p>
        </>
      )}

      {/* PASO 2 — Código SMS */}
      {paso === 2 && (
        <>
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <img src="/logo.webp" alt="BarberMonster" className="h-10 dark:hidden" />
              <img src="/logo-white.webp" alt="BarberMonster" className="h-10 hidden dark:block" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Revisa tu teléfono</h1>
            <p className="text-gray-400 text-sm text-center">Enviamos un código al <span className="text-gray-900 dark:text-white font-semibold">{telefono}</span>. Ingrésalo abajo.</p>
            <p className="text-gray-400 text-xs mt-2 text-center">Demo: usa el código <span className="font-bold text-gray-900 dark:text-white">1234</span></p>
          </div>
          <form onSubmit={handleSiguiente} className="space-y-4" autoComplete="off">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Código de verificación *</label>
              <input
                type="text"
                inputMode="numeric"
                value={codigo}
                onChange={e => setCodigo(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="4 dígitos"
                required
                className={inputClass}
                autoComplete="off"
              />
              {error && <p className="text-red-500 text-xs mt-1.5 ml-1">{error}</p>}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPaso(1)}
                className="flex items-center gap-1.5 px-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft size={16} />Atrás
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-4 rounded-xl text-base hover:bg-gray-800 dark:hover:bg-gray-100 active:scale-95 transition-all"
              >
                Entrar
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </>
      )}

    </div>
  )
}
