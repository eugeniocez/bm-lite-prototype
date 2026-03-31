import { Settings, Shield, ChevronRight } from 'lucide-react'
import { useNegocioStore } from '../store/negocio'
import PageHeader from '../components/shared/PageHeader'

const ACCENT = '#E63946'

function diasRestantes(fechaRegistro) {
  const inicio = new Date(`${fechaRegistro}T12:00:00`)
  const hoy = new Date()
  const diff = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24))
  return Math.max(0, 30 - diff)
}

function SectionLabel({ label, sub }) {
  return (
    <div className="px-1 pt-4 pb-1">
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">{label}</p>
      {sub && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>}
    </div>
  )
}

function Row({ label, value, chevron, onPress, danger }) {
  const base = "flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900"
  return onPress ? (
    <button onClick={onPress} className={`${base} w-full text-left active:bg-gray-100 dark:active:bg-gray-800 transition-colors`}>
      <span className={`text-sm ${danger ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{label}</span>
      <span className="flex items-center gap-1">
        {value && <span className="text-sm text-gray-400 dark:text-gray-500">{value}</span>}
        {chevron && <ChevronRight size={14} className="text-gray-300 dark:text-gray-600" />}
      </span>
    </button>
  ) : (
    <div className={base}>
      <span className="text-sm text-gray-900 dark:text-white">{label}</span>
      {value && <span className="text-sm text-gray-400 dark:text-gray-500">{value}</span>}
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

export default function SettingsPage() {
  const { nombreBarberia, plan, fechaRegistro, activarSuscripcion } = useNegocioStore()
  const esTrial = plan === 'trial'
  const dias = diasRestantes(fechaRegistro)
  const urgente = dias <= 5

  return (
    <div className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <PageHeader title="Ajustes" subtitle={nombreBarberia} icon={Settings} />

      <div className="flex-1 overflow-y-auto px-4 pb-24">

        {/* Barbería */}
        <SectionLabel label="Tu barbería" />
        <Group>
          <Row label="Nombre" value={nombreBarberia} />
        </Group>

        {/* Plan */}
        <SectionLabel label="Plan" />
        <Group>
          <Row
            label="Plan actual"
            value={
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={esTrial ? { background: '#FFFBEB', color: '#B45309' } : { background: '#F0FDF4', color: '#166534' }}
              >
                {esTrial ? 'Trial' : 'Activo'}
              </span>
            }
          />
          {esTrial && <Row label="Días restantes" value={dias === 0 ? 'Expirado' : `${dias} días`} />}
        </Group>

        {/* CTA — solo trial */}
        {esTrial && (
          <>
            <SectionLabel label="Suscripción" />
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: `1.5px solid ${ACCENT}` }}
            >
              <div className="px-4 py-3 bg-white dark:bg-gray-900 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                <span className="text-sm text-gray-900 dark:text-white">Precio mensual</span>
                <span className="text-sm font-bold" style={{ color: ACCENT }}>$199 MXN / mes</span>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                <p className="text-xs text-gray-400">SMS · Recordatorios · Llamadas · INVITE · Todo incluido</p>
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

        {/* Activo */}
        {!esTrial && (
          <>
            <SectionLabel label="Suscripción" />
            <Group>
              <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900">
                <Shield size={16} className="text-green-600 shrink-0" />
                <span className="text-sm text-gray-900 dark:text-white">Suscripción activa</span>
                <span className="text-sm text-gray-400 ml-auto">$199 MXN / mes</span>
              </div>
            </Group>
          </>
        )}

        {/* Soporte */}
        <SectionLabel label="Soporte" />
        <Group>
          <Row label="Teléfono" value="+52 81 1234 5678" />
          <Row label="Correo" value="soporte@barbermonster.com" />
        </Group>

        {/* Demo */}
        <SectionLabel label="Demo" sub="Solo para encender y apagar estados del prototipo" />
        <Group>
          <Row
            label={esTrial ? 'Simular cuenta pagada' : 'Simular trial'}
            chevron
            onPress={esTrial ? activarSuscripcion : () => useNegocioStore.setState({ plan: 'trial' })}
          />
        </Group>

        {/* Logo */}
        <div className="flex flex-col items-center pt-6 pb-2 gap-1.5">
          <img src="/logo.webp" alt="BarberMonster" className="h-7 dark:hidden opacity-25" />
          <img src="/logo-white.webp" alt="BarberMonster" className="h-7 hidden dark:block opacity-25" />
          <p className="text-xs text-gray-300 dark:text-gray-700">barbermonster.com</p>
        </div>

      </div>
    </div>
  )
}