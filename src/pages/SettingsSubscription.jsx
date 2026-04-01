import { ArrowLeft, Shield, CalendarCheck, BookUser, ClipboardList, MessageSquareText, BellRing, PhoneCall, Megaphone, BadgeCheck } from 'lucide-react'

const BENEFICIOS = [
  { icon: CalendarCheck, text: 'Citas ilimitadas' },
  { icon: BookUser, text: 'Directorio de clientes automático' },
  { icon: ClipboardList, text: 'Historial de clientes' },
  { icon: MessageSquareText, text: 'Confirmaciones por SMS automáticas' },
  { icon: BellRing, text: 'Recordatorios automáticos 24h antes' },
  { icon: PhoneCall, text: 'Llamadas automáticas anti-ausencias' },
  { icon: Megaphone, text: 'Campañas de marketing para recuperar clientes' },
  { icon: BadgeCheck, text: 'Estado Monster Plus y soporte prioritario' },
]
import { useNavigate } from 'react-router-dom'
import { useNegocioStore } from '../store/negocio'
import { addDays, formatDate } from '../utils/helpers'
import BrandSignature from '../components/shared/BrandSignature'

const ACCENT = '#E63946'

function diasRestantes(fechaRegistro) {
  const inicio = new Date(`${fechaRegistro}T12:00:00`)
  const hoy = new Date()
  const diff = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24))
  return Math.max(0, 30 - diff)
}

function SectionLabel({ label }) {
  return (
    <div className="px-1 pt-4 pb-1">
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">{label}</p>
    </div>
  )
}

function Group({ children }) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
      {children}
    </div>
  )
}

function Row({ label, value, onPress, chevron, danger }) {
  const base = "flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900"
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
  const urgente = dias <= 5
  const proximaRenovacion = formatDate(addDays(fechaRegistro, 30))

  return (
    <div className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-950 overflow-hidden">
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

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {esTrial && (
          <>
            <SectionLabel label="Estado" />
            <Group>
              <Row
                label="Suscripción actual"
                value={
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: '#FFFBEB', color: '#B45309' }}
                    >
                      Prueba gratuita
                    </span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={urgente ? { background: '#FEF2F2', color: '#E63946' } : { background: '#FFFBEB', color: '#B45309' }}
                    >
                      {dias === 0 ? 'Expirado' : dias === 1 ? '1 dia restante' : `${dias} dias restantes`}
                    </span>
                  </div>
                }
              />
            </Group>
          </>
        )}

        {esTrial && (
          <>
            <SectionLabel label="Suscripcion" />
            <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${ACCENT}` }}>
              <div className="px-4 py-3 bg-white dark:bg-gray-900 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                <span className="text-sm text-gray-900 dark:text-white">Precio mensual</span>
                <span className="text-sm font-bold" style={{ color: ACCENT }}>$199 MXN / mes</span>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                <p className="text-xs text-gray-400">SMS · Recordatorios · Llamadas · Invitar · Todo incluido</p>
              </div>
              <button
                onClick={activarSuscripcion}
                className="w-full px-4 py-3 text-sm font-bold text-white transition-all active:opacity-80"
                style={{ background: ACCENT }}
              >
                Activar suscripción
              </button>
            </div>
          </>
        )}

        {!esTrial && (
          <>
            <SectionLabel label="Suscripción" />
            <Group>
              <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900">
                <Shield size={16} className="text-green-600 shrink-0" />
                <span className="text-sm text-gray-900 dark:text-white">Monster Plus activo</span>
                <span className="text-sm text-gray-400 ml-auto">$199 MXN / mes</span>
              </div>
              <Row label="Proxima renovacion" value={proximaRenovacion} />
              <Row label="Cambiar método de pago" chevron onPress={() => alert('Aqui podras actualizar tu metodo de pago.')} />
              <Row label="Cancelar suscripción" chevron danger onPress={() => navigate('/settings/subscription/cancel')} />
            </Group>

            <SectionLabel label="Mis beneficios" />
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 space-y-3">
              {BENEFICIOS.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.text} className="flex items-center gap-3">
                    <Icon size={15} className="text-green-600 shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}