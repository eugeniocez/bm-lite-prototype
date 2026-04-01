import { useState } from 'react'
import { Settings, Shield, ChevronRight, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useNegocioStore } from '../store/negocio'
import PageHeader from '../components/shared/PageHeader'
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

function EditableRow({ label, value, placeholder, onSave }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  const handleSave = () => {
    onSave(draft)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="flex items-center justify-between px-4 py-2.5 bg-white dark:bg-gray-900 gap-3">
        <span className="text-sm text-gray-900 dark:text-white shrink-0">{label}</span>
        <div className="flex items-center gap-2 flex-1 justify-end">
          <input
            autoFocus
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder={placeholder}
            className="text-sm text-right bg-transparent text-gray-900 dark:text-white placeholder-gray-300 focus:outline-none flex-1 min-w-0"
          />
          <button onClick={handleSave} className="w-6 h-6 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center shrink-0">
            <Check size={12} className="text-white dark:text-gray-900" strokeWidth={3} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => { setDraft(value); setEditing(true) }}
      className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 w-full text-left active:bg-gray-100 dark:active:bg-gray-800 transition-colors"
    >
      <span className="text-sm text-gray-900 dark:text-white">{label}</span>
      <span className="flex items-center gap-1.5">
        <span className="text-sm text-gray-400 dark:text-gray-500">
          {value || <span className="text-gray-300 dark:text-gray-600">{placeholder}</span>}
        </span>
        <ChevronRight size={14} className="text-gray-300 dark:text-gray-600" />
      </span>
    </button>
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
  const {
    nombreBarberia, email, direccion,
    plan, fechaRegistro,
    setNombreBarberia, setEmail, setDireccion,
    activarSuscripcion, cancelarSuscripcion
  } = useNegocioStore()

  const esTrial = plan === 'trial'
  const dias = diasRestantes(fechaRegistro)
  const urgente = dias <= 5
  const proximaRenovacion = formatDate(addDays(fechaRegistro, 30))
  const [confirmandoCancelar, setConfirmandoCancelar] = useState(false)

  return (
    <div className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div className="px-5 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
        <div className="flex items-center gap-2">
          <Settings size={20} className="text-gray-900 dark:text-white" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Ajustes</h1>
        </div>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-0.5">Edita tus datos, suscripción y explora preguntas frecuentes</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24">

        {/* Barbería */}
        <SectionLabel label="Tu barbería" />
        <Group>
          <EditableRow label="Nombre" value={nombreBarberia} placeholder="Nombre de tu barbería" onSave={setNombreBarberia} />
          <EditableRow label="Email" value={email} placeholder="Opcional" onSave={setEmail} />
          <EditableRow label="Dirección" value={direccion} placeholder="Opcional" onSave={setDireccion} />
        </Group>

        {/* Plan */}
        <SectionLabel label="Plan" />
        <Group>
          <Row
            label="Plan actual"
            value={
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={esTrial ? { background: '#FFFBEB', color: '#B45309' } : { background: '#F0FDF4', color: '#166534' }}
                >
                  {esTrial ? 'Trial' : 'Activo'}
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
        </Group>

        {/* CTA — solo trial */}
        {esTrial && (
          <>
            <SectionLabel label="Suscripción" />
            <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${ACCENT}` }}>
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

        {/* Activo — cancelar */}
        {!esTrial && (
          <>
            <SectionLabel label="Suscripción" />
            <Group>
              <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900">
                <Shield size={16} className="text-green-600 shrink-0" />
                <span className="text-sm text-gray-900 dark:text-white">Suscripción activa</span>
                <span className="text-sm text-gray-400 ml-auto">$199 MXN / mes</span>
              </div>
              {!confirmandoCancelar ? (
                <Row label="Cancelar suscripción" danger onPress={() => setConfirmandoCancelar(true)} chevron />
              ) : (
                <div className="px-4 py-3 bg-white dark:bg-gray-900 space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">¿Seguro que quieres cancelar? Tu cuenta seguirá activa hasta el {proximaRenovacion}.</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setConfirmandoCancelar(false)}
                      className="flex-1 py-2 text-xs font-bold rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      No, conservar
                    </button>
                    <button
                      onClick={() => { cancelarSuscripcion(); setConfirmandoCancelar(false) }}
                      className="flex-1 py-2 text-xs font-bold rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600"
                    >
                      Sí, cancelar
                    </button>
                  </div>
                </div>
              )}
            </Group>
          </>
        )}

        {/* Soporte */}
        <SectionLabel label="Soporte" />
        <Group>
          <Row label="Teléfono" value="+52 81 1234 5678" />
          <Row label="Correo" value="soporte@barbermonster.com" />
          <Row label="Preguntas frecuentes" chevron onPress={() => navigate('/faq')} />
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
        </div>

      </div>
    </div>
  )
}