import { useNavigate } from 'react-router-dom'
import { Settings, ChevronRight } from 'lucide-react'
import { useNegocioStore } from '../store/negocio'
import { addDays, formatDate } from '../utils/helpers'

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
  const navigate = useNavigate()
  const { plan, fechaRegistro } = useNegocioStore()

  const esTrial = plan === 'trial'
  const dias = diasRestantes(fechaRegistro)
  const urgente = dias <= 5
  const proximaRenovacion = formatDate(addDays(fechaRegistro, 30))

  return (
    <div className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div className="px-5 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
        <div className="flex items-center gap-2">
          <Settings size={20} className="text-gray-900 dark:text-white" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Ajustes</h1>
        </div>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-0.5">Gestiona tu negocio y cuenta</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24">

        {/* Mi perfil */}
        <SectionLabel label="Mi perfil" />
        <Group>
          <Row label="Editar perfil" chevron onPress={() => navigate('/settings/profile')} />
        </Group>

        {/* Suscripción */}
        <SectionLabel label="Suscripción" />
        <Group>
          <Row
            label="Suscripción actual"
            value={
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={esTrial ? { background: '#FFFBEB', color: '#B45309' } : { background: '#F0FDF4', color: '#166534' }}
                >
                  {esTrial ? 'Prueba gratuita' : 'Monster Plus'}
                </span>
                {esTrial && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={urgente ? { background: '#FEF2F2', color: '#E63946' } : { background: '#FFFBEB', color: '#B45309' }}
                  >
                    {dias === 0 ? 'Expirado' : dias === 1 ? '1 día restante' : `${dias} días restantes`}
                  </span>
                )}
              </div>
            }
          />
          {!esTrial && <Row label="Próxima renovación" value={proximaRenovacion} />}
          <Row label="Administrar suscripción" chevron onPress={() => navigate('/settings/subscription')} />
        </Group>

        {esTrial && (
          <div className="mt-3 rounded-xl overflow-hidden" style={{ border: `1.5px solid ${ACCENT}` }}>
            <div className="px-4 py-3 bg-white dark:bg-gray-900 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
              <span className="text-sm text-gray-900 dark:text-white">Precio mensual</span>
              <span className="text-sm font-bold" style={{ color: ACCENT }}>$199 MXN / mes</span>
            </div>
            <button
              onClick={() => useNegocioStore.getState().activarSuscripcion()}
              className="w-full px-4 py-4 text-sm font-bold text-white transition-all active:opacity-80"
              style={{ background: ACCENT }}
            >
              Activar suscripción
            </button>
          </div>
        )}

        {/* Ayuda (FAQ) */}
        <SectionLabel label="Ayuda" />
        <Group>
          <Row
            label="Preguntas frecuentes"
            chevron
            onPress={() => navigate('/faq')}
          />
        </Group>

        {/* Contacto */}
        <SectionLabel label="Contacto" />
        <Group>
          <button
            onClick={() => window.open('https://wa.me/528135470864', '_blank')}
            className="flex items-center justify-between px-4 py-3 w-full text-left bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="text-sm text-gray-900 dark:text-white">WhatsApp</span>
            <ChevronRight size={14} className="text-gray-300 dark:text-gray-600" />
          </button>
          <button
            onClick={() => window.location.href = 'mailto:hola@barbermonster.com'}
            className="flex items-center justify-between px-4 py-3 w-full text-left bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="text-sm text-gray-900 dark:text-white">Correo</span>
            <ChevronRight size={14} className="text-gray-300 dark:text-gray-600" />
          </button>
        </Group>

        {/* Logo */}
        <div className="flex flex-col items-center pt-6 pb-2 gap-1.5">
          <img src="/logo.webp" alt="BarberMonster" className="h-7 dark:hidden opacity-25" />
          <img src="/logo-white.webp" alt="BarberMonster" className="h-7 hidden dark:block opacity-25" />
        </div>

      </div>
    </div>
  )
}