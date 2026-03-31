import { Settings, CreditCard, Shield, Zap, X, ChevronRight } from 'lucide-react'
import { useNegocioStore } from '../store/negocio'
import PageHeader from '../components/shared/PageHeader'

const ACCENT = '#E63946'

function diasRestantes(fechaRegistro) {
  const inicio = new Date(`${fechaRegistro}T12:00:00`)
  const hoy = new Date()
  const diff = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24))
  return Math.max(0, 30 - diff)
}

export default function SettingsPage() {
  const { nombreBarberia, plan, fechaRegistro, activarSuscripcion } = useNegocioStore()
  const esTrial = plan === 'trial'
  const dias = diasRestantes(fechaRegistro)
  const urgente = dias <= 5

  return (
    <div className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <PageHeader
        title="Ajustes"
        subtitle={nombreBarberia}
        icon={Settings}
      />

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 pb-24">

        {/* Badge de plan */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Plan actual</p>
            <p className="text-base font-bold text-gray-900 dark:text-white">
              {esTrial ? 'Prueba gratuita' : 'Suscripción activa'}
            </p>
          </div>
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide"
            style={esTrial
              ? { background: '#FFFBEB', color: '#B45309' }
              : { background: '#F0FDF4', color: '#166534' }
            }
          >
            {esTrial ? 'Trial' : 'Activo'}
          </span>
        </div>

        {/* CTA suscripción — solo en trial */}
        {esTrial && (
          <div
            className="rounded-2xl p-5 space-y-4"
            style={{ border: `2px solid ${ACCENT}`, background: '#FFF5F5' }}
          >
            {/* Contador */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">Días restantes del trial</p>
              <span
                className="text-sm font-extrabold px-3 py-1 rounded-full"
                style={urgente
                  ? { background: '#FEF2F2', color: ACCENT }
                  : { background: '#FFFBEB', color: '#B45309' }
                }
              >
                {dias === 0 ? 'Expirado' : dias === 1 ? '1 día' : `${dias} días`}
              </span>
            </div>

            {/* Barra de progreso */}
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: `${Math.max(4, (dias / 30) * 100)}%`,
                  background: urgente ? ACCENT : '#F59E0B'
                }}
              />
            </div>

            {/* Precio */}
            <div className="flex items-end gap-2">
              <p className="text-3xl font-extrabold leading-none" style={{ color: ACCENT }}>$199</p>
              <p className="text-gray-400 text-sm mb-0.5">MXN / mes</p>
            </div>
            <p className="text-xs text-gray-400">SMS · Recordatorios · Llamadas · INVITE · Todo incluido</p>

            {/* Botón */}
            <button
              onClick={activarSuscripcion}
              className="w-full text-white font-bold py-3.5 rounded-xl text-sm transition-all active:scale-[.98]"
              style={{ background: ACCENT }}
            >
              Activar suscripción
            </button>
          </div>
        )}

        {/* Plan activo — confirmación */}
        {!esTrial && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 px-4 py-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
              <Shield size={18} className="text-green-700" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Suscripción activa</p>
              <p className="text-xs text-gray-400 mt-0.5">$199 MXN / mes · Todo incluido</p>
            </div>
          </div>
        )}

        {/* Sección info barbería */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Tu barbería</p>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">Nombre</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{nombreBarberia}</p>
          </div>
        </div>

        {/* Demo — toggle plan */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Demo</p>
          </div>
          <button
            onClick={esTrial ? activarSuscripcion : () => useNegocioStore.setState({ plan: 'trial' })}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {esTrial ? 'Simular cuenta pagada' : 'Simular trial'}
            </p>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
        </div>

      </div>
    </div>
  )
}