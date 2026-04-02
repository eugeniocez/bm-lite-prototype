import { ArrowRight, Check, Crown, MessageSquare, Send, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/shared/PageHeader'
import { useDirectorioStore } from '../store/directorio'
import { useNegocioStore } from '../store/negocio'
import { daysSince } from '../utils/helpers'

const ACCENT = '#E63946'

const BENEFICIOS = [
  { icon: Users, texto: 'Tus clientes y su historial siguen disponibles' },
]

const PREVIEW_CONTACTS = [
  { id: 'demo-1', nombre: 'Miguel Torres', ultimaVisita: '2026-01-15', totalNoShows: 1 },
  { id: 'demo-2', nombre: 'Fernando Ríos', ultimaVisita: '2025-12-20', totalNoShows: 2 },
  { id: 'demo-3', nombre: 'Alejandro Vega', ultimaVisita: '2025-11-30', totalNoShows: 0 },
]

const PREVIEW_TEMPLATES = [
  {
    id: 'v1',
    label: '"Hace tiempo"',
    text: 'Hola, Miguel. Hace tiempo que no te vemos en Barbería El Tigre. Si quieres agendar, te aparto tu lugar por WhatsApp.',
  },
  {
    id: 'v2',
    label: '"Hay disponibilidad"',
    text: 'Hola, Miguel. Esta semana hay espacios disponibles en Barbería El Tigre. Si quieres venir, respóndeme y te ayudo a reservar.',
  },
]

function ContactPreview({ contacto }) {
  const dias = daysSince(contacto.ultimaVisita)

  return (
    <div className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-left">
      <div className="w-5 h-5 rounded-full border-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 flex items-center justify-center shrink-0">
        <Check size={11} className="text-gray-300 dark:text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-900 dark:text-white text-sm font-semibold truncate">{contacto.nombre}</p>
        <p className="text-gray-400 text-xs mt-0.5">
          {dias === Infinity ? 'Sin visitas registradas' : `Última visita hace ${dias} días`}
        </p>
      </div>
      {contacto.totalNoShows > 0 && (
        <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-md shrink-0 font-semibold">
          {contacto.totalNoShows} NS
        </span>
      )}
    </div>
  )
}

function TemplatePreview({ template }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4">
      <p className="text-xs font-bold mb-2 text-gray-400">{template.label}</p>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{template.text}</p>
    </div>
  )
}

export default function InviteBlocked() {
  const navigate = useNavigate()
  const nombreBarberia = useNegocioStore(s => s.nombreBarberia) || 'tu barbería'
  const contactos = useDirectorioStore(s => s.contactos)

  const contactosInactivos = contactos
    .filter(contacto => daysSince(contacto.ultimaVisita) >= 30)
    .slice(0, 3)

  const previewContacts = contactosInactivos.length > 0 ? contactosInactivos : PREVIEW_CONTACTS

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-gray-50 dark:bg-gray-950">
      <PageHeader
        title="Invitar"
        subtitle="Reactiva clientes que no te han visitado en 30+ días"
        icon={Send}
      />

      <div className="flex-1 overflow-y-auto px-5 py-5 pb-20 md:pb-5">
        <div className="space-y-6">
          <section className="max-w-2xl pt-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 dark:bg-red-500/10 px-3 py-1.5 mb-4">
              <Crown size={14} style={{ color: ACCENT }} />
              <span className="text-xs font-bold uppercase tracking-wide" style={{ color: ACCENT }}>
                Monster Plus
              </span>
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-3">
              Invitar ya no está disponible con tu{' '}
              <span style={{ color: ACCENT }}>plan actual.</span>
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5 max-w-2xl">
              Tu prueba gratuita terminó. Las campañas de mensajes para reactivar clientes forman parte de Monster Plus. Activa tu suscripción para que {nombreBarberia} pueda seguir enviando invitaciones desde aquí.
            </p>

            <button
              onClick={() => navigate('/settings/subscription')}
              className="inline-flex items-center justify-center gap-2 text-white font-bold px-5 py-3.5 rounded-2xl text-sm transition-all active:scale-[.98]"
              style={{ background: ACCENT }}
            >
              Activar suscripción
              <ArrowRight size={18} />
            </button>

            <div className="space-y-3 mt-6">
              {BENEFICIOS.map((beneficio) => {
                const IconComponent = beneficio.icon

                return (
                  <div key={beneficio.texto} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: '#FEF2F2' }}
                    >
                      <IconComponent size={15} style={{ color: ACCENT }} />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{beneficio.texto}</p>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 opacity-55 pointer-events-none">
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400 mb-1">Paso 1</p>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Elegir clientes</p>
                </div>
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400 mb-1">Paso 2</p>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Elegir mensaje</p>
                </div>
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400 mb-1">Paso 3</p>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Enviar invitaciones</p>
                </div>
              </div>
            </div>

            <div className="px-5 py-5 opacity-45 pointer-events-none select-none">
              <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-5">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide flex items-center gap-1.5">
                      <Users size={13} />Clientes sugeridos
                    </p>
                    <p className="text-xs text-gray-400">30+ días sin visita</p>
                  </div>
                  <div className="space-y-2">
                    {previewContacts.map(contacto => (
                      <ContactPreview key={contacto.id} contacto={contacto} />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-3 flex items-center gap-1.5">
                    <MessageSquare size={13} />Selecciona un mensaje
                  </p>
                  <div className="space-y-3">
                    {PREVIEW_TEMPLATES.map(template => (
                      <TemplatePreview key={template.id} template={template} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  disabled
                  className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-3 rounded-2xl text-sm opacity-60 cursor-not-allowed"
                >
                  <Send size={16} />Enviar invitaciones
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}