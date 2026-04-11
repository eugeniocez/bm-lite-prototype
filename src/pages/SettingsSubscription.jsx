import { ArrowLeft, CheckCircle2 } from 'lucide-react'

const BENEFICIOS = [
  'Citas ilimitadas',
  'Directorio de clientes automático',
  'Historial de clientes',
  'Confirmaciones por SMS automáticas',
  'Recordatorios automáticos 24h antes',
  'Llamadas automáticas anti-ausencias',
  'Campañas de marketing para recuperar clientes',
  'Estado Monster Plus y soporte prioritario',
]
import { useNavigate } from 'react-router-dom'
import { useNegocioStore } from '../store/negocio'
import { addDays, formatDate } from '../utils/helpers'
import BrandSignature from '../components/shared/BrandSignature'

function diasRestantes(fechaRegistro) {
  const inicio = new Date(`${fechaRegistro}T12:00:00`)
  const hoy = new Date()
  const diff = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24))
  return Math.max(0, 30 - diff)
}

function Row({ label, value, onPress, chevron, danger }) {
  const base = "flex items-center justify-between px-5 py-4 bg-white dark:bg-gray-900"
  if (onPress) {
    return (
      <button onClick={onPress} className={`${base} w-full text-left active:bg-gray-100 dark:active:bg-gray-800 transition-colors`}>
        <span className={`text-sm ${danger ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{label}</span>
        <span className="flex items-center gap-1">
          {value && <span className="text-sm text-gray-400 dark:text-gray-500">{value}</span>}
          {chevron && <span className="text-gray-300 dark:text-gray-600">›</span>}
        </span>
      </button>
    )
  }

  return (
    <div className={base}>
      <span className="text-sm text-gray-900 dark:text-white">{label}</span>
      {value && <span className="text-sm text-gray-400 dark:text-gray-500">{value}</span>}
    </div>
  )
}

export default function SettingsSubscriptionPage() {
  const navigate = useNavigate()
  const { plan, fechaRegistro, activarSuscripcion } = useNegocioStore()

  const esTrial = plan === 'trial'
  const dias = diasRestantes(fechaRegistro)
  const proximaRenovacion = formatDate(addDays(fechaRegistro, 30))

  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="px-5 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Suscripción</h1>
          </div>
          <BrandSignature variant="lockup" size="sm" subdued className="shrink-0 md:hidden" />
        </div>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-0.5">Administra tu suscripción desde la app</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 pb-24">
        {esTrial && (
          <>
            <div className="divide-y divide-gray-100 dark:divide-gray-800 border-b border-gray-100 dark:border-gray-800">
              <Row label="Plan actual" value={<span className="text-amber-700 dark:text-amber-400">Prueba gratuita</span>} />
              <Row
                label="Días restantes"
                value={
                  <span className={dias === 0 ? 'text-red-600 dark:text-red-400' : 'text-amber-700 dark:text-amber-400'}>
                    {dias === 0 ? 'Expirada' : dias === 1 ? '1 día' : `${dias} días`}
                  </span>
                }
              />
            </div>
            <div className="px-4 pt-4">
              <button
                onClick={activarSuscripcion}
                className="w-full rounded-lg bg-[#1B7DE2] px-4 py-3 text-sm font-bold text-white transition-all active:opacity-80"
              >
                Activar suscripción por $199 MXN/mes
              </button>
            </div>
          </>
        )}

        {!esTrial && (
          <>
            <div className="divide-y divide-gray-100 dark:divide-gray-800 border-b border-gray-100 dark:border-gray-800">
              <Row label="Plan actual" value={<span className="text-[#1B7DE2]">Monster Plus</span>} />
              <Row label="Proxima renovacion" value={proximaRenovacion} />
              <Row label="Cambiar método de pago" chevron onPress={() => alert('Aqui podras actualizar tu metodo de pago.')} />
              <Row label="Cancelar suscripción" chevron danger onPress={() => navigate('/settings/subscription/cancel')} />
              <div className="px-5 py-4 bg-white dark:bg-gray-900">
                <span className="text-sm text-gray-900 dark:text-white">Beneficios</span>
                <div className="mt-3 space-y-2">
                  {BENEFICIOS.map((item) => {
                    return (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#1B7DE2]" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}