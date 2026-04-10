import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, Users, MessageSquare, Check, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import PageHeader from '../components/shared/PageHeader'
import { useDirectorioStore } from '../store/directorio'
import { useInviteStore } from '../store/invite'
import { useNegocioStore } from '../store/negocio'
import { daysSince } from '../utils/helpers'
import { diaSemanaActual, INVITE_PREVIEW_TOKENS, sms } from '../utils/sms-templates'
import WizardInterventionCard from '../components/shared/WizardInterventionCard'

const PLANTILLAS = [
  { id: 'v1', label: '"Hace tiempo"', fn: sms.inviteV1 },
  { id: 'v2', label: `"El ${diaSemanaActual()} está tranquilo"`, fn: sms.inviteV2 },
  { id: 'v5', label: '"Hay disponibilidad"', fn: sms.inviteV5 },
]

const PREVIEW_TOKEN_CLASS = 'font-bold italic text-purple-600 dark:text-purple-400'

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function InvitePreviewText({ text, nombreCliente, nombreBarberia, className }) {
  const tokens = Object.values(INVITE_PREVIEW_TOKENS)
  const pattern = new RegExp(`(${tokens.map(escapeRegExp).join('|')})`, 'g')
  const parts = text.split(pattern).filter(Boolean)

  return (
    <p className={className}>
      {parts.map((part, index) => {
        if (part === INVITE_PREVIEW_TOKENS.cliente) {
          return (
            <span key={`${part}-${index}`} className={PREVIEW_TOKEN_CLASS}>
              {nombreCliente}
            </span>
          )
        }

        if (part === INVITE_PREVIEW_TOKENS.barberia) {
          return (
            <span key={`${part}-${index}`} className={PREVIEW_TOKEN_CLASS}>
              {nombreBarberia}
            </span>
          )
        }

        if (part === INVITE_PREVIEW_TOKENS.whatsapp) {
          return (
            <span key={`${part}-${index}`} className={PREVIEW_TOKEN_CLASS}>
              WhatsApp
            </span>
          )
        }

        return <Fragment key={`${part}-${index}`}>{part}</Fragment>
      })}
    </p>
  )
}

function ContactoBtn({ c, onToggle }) {
  const seleccionado = c.enInviteList
  const dias = daysSince(c.ultimaVisita)
  return (
    <button
      onClick={() => onToggle(c.id)}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all text-left ${
        seleccionado
          ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
        seleccionado ? 'bg-purple-600 border-purple-600' : 'border-gray-300 dark:border-gray-600'
      }`}>
        {seleccionado && <Check size={11} className="text-white" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-900 dark:text-white text-sm font-semibold truncate">{c.nombre}</p>
        <p className="text-gray-400 text-xs mt-0.5">
          {dias === Infinity ? 'Sin visitas registradas' : `Última visita hace ${dias} días`}
        </p>
      </div>
      {c.totalNoShows > 0 && (
        <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-md shrink-0 font-semibold">
          {c.totalNoShows} NS
        </span>
      )}
    </button>
  )
}

export default function Invite({ previewWizard = null }) {
  const navigate = useNavigate()
  const contactos = useDirectorioStore(s => s.contactos)
  const toggleInviteList = useDirectorioStore(s => s.toggleInviteList)
  const enviarCampana = useInviteStore(s => s.enviarCampana)
  const nombreBarberia = useNegocioStore(s => s.nombreBarberia)

  const [paso, setPaso] = useState(1)
  const [plantillaId, setPlantillaId] = useState('v1')
  const [enviado, setEnviado] = useState(false)
  const [wizardOpen, setWizardOpen] = useState(previewWizard === 'intro')

  const sugeridos = contactos.filter(c => daysSince(c.ultimaVisita) >= 30)
  const recientes = contactos.filter(c => daysSince(c.ultimaVisita) < 30)
  const seleccionados = contactos.filter(c => c.enInviteList)
  const plantilla = PLANTILLAS.find(p => p.id === plantillaId)
  const mensajeEjemplo = plantilla?.fn({
    nombre: INVITE_PREVIEW_TOKENS.cliente,
    barberia: INVITE_PREVIEW_TOKENS.barberia,
    whatsapp: INVITE_PREVIEW_TOKENS.whatsapp,
  })

  const handleEnviar = () => {
    if (seleccionados.length === 0) return
    enviarCampana({ audiencia: seleccionados.map(c => c.id), mensaje: plantilla.fn('[Nombre]'), plantillaId, enviados: seleccionados.length })
    setEnviado(true)
  }

  // ── Enviado ──
  if (enviado) {
    return (
      <div className="flex flex-col bg-gray-50 dark:bg-gray-950 min-h-full">
        <PageHeader title="Invitar" subtitle="Reactiva clientes que no te han visitado en 30+ días" icon={Send} />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center py-16">
          <div className="w-16 h-16 bg-green-700 dark:bg-green-600 rounded-full flex items-center justify-center mb-4">
            <Check size={32} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">¡Mensaje enviado!</h2>
          <p className="text-gray-500 text-sm mb-8">
            {seleccionados.length} cliente{seleccionados.length > 1 ? 's' : ''} {seleccionados.length > 1 ? 'recibieron' : 'recibió'} tu mensaje exitosamente
          </p>
          <button onClick={() => navigate('/calendario')} className="bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold px-8 py-3 rounded-xl text-sm hover:bg-gray-800 transition-colors">
            Regresar a calendario
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-gray-50 dark:bg-gray-950">
      <PageHeader title="Invitar" subtitle="Reactiva clientes que no te han visitado en 30+ días" icon={Send} />

      {/* Step indicator + CTA */}
      <div className="px-5 pt-4 pb-3 bg-gray-50 dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 shrink-0">
        <div className="flex gap-2">
          {paso > 1 && (
            <button onClick={() => setPaso(p => p - 1)} className="flex items-center gap-1.5 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <ArrowLeft size={16} />Atrás
            </button>
          )}
          {paso === 1 && (
            <button onClick={() => setPaso(p => p + 1)} disabled={seleccionados.length === 0}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-3 rounded-xl text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              Elegir mensaje<ArrowRight size={16} />
            </button>
          )}
          {paso === 2 && (
            <button onClick={() => setPaso(p => p + 1)}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-3 rounded-xl text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
              Revisar mensaje y contactos<ArrowRight size={16} />
            </button>
          )}
          {paso === 3 && (
            <button onClick={handleEnviar} disabled={seleccionados.length === 0}
              className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white font-bold py-3 rounded-xl text-sm hover:bg-purple-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <Send size={16} />{seleccionados.length === 1 ? 'Enviar invitación' : 'Enviar invitaciones'}
            </button>
          )}
        </div>
      </div>

      {/* Contenido scrollable */}
      <div className="flex-1 overflow-y-auto px-5 py-5 pb-20 md:pb-5">
        {paso === 1 && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wide flex items-center gap-1.5">
                  <Users size={13} />Auto-sugeridos ({sugeridos.length})
                </p>
                <p className="text-xs text-gray-400">30+ días sin visita</p>
              </div>
              {sugeridos.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl px-4 py-6 text-center border border-gray-100 dark:border-gray-700">
                  <p className="text-gray-400 text-sm">Todos tus clientes han visitado recientemente</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {sugeridos.map(c => <ContactoBtn key={c.id} c={c} onToggle={toggleInviteList} />)}
                </div>
              )}
            </div>
            {recientes.length > 0 && (
              <div>
                <div className="mb-3">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wide flex items-center gap-1.5">
                    <Users size={13} />Clientes
                  </p>
                </div>
                <div className="space-y-2">
                  {recientes.map(c => <ContactoBtn key={c.id} c={c} onToggle={toggleInviteList} />)}
                </div>
              </div>
            )}
          </div>
        )}

        {paso === 2 && (
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <MessageSquare size={13} />Selecciona un mensaje
            </p>
            <div className="space-y-3">
              {PLANTILLAS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPlantillaId(p.id)}
                  className={`w-full text-left px-4 py-4 rounded-xl border transition-all ${
                    plantillaId === p.id
                      ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <p className={`text-xs font-bold mb-2 ${plantillaId === p.id ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'}`}>{p.label}</p>
                  <InvitePreviewText
                    text={p.fn({
                      nombre: INVITE_PREVIEW_TOKENS.cliente,
                      barberia: INVITE_PREVIEW_TOKENS.barberia,
                      whatsapp: INVITE_PREVIEW_TOKENS.whatsapp,
                    })}
                    nombreCliente="Nombre"
                    nombreBarberia={nombreBarberia}
                    className={`text-sm leading-relaxed ${plantillaId === p.id ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {paso === 3 && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wide flex items-center gap-1.5">
                  <MessageSquare size={13} />Mensaje seleccionado
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Cada contacto recibirá su mensaje con su propio nombre y su acceso por WhatsApp.
                </p>
              </div>
              <div className="px-4 py-3">
                <p className="text-xs text-gray-400 font-semibold mb-2">{plantilla?.label}</p>
                {mensajeEjemplo && (
                  <InvitePreviewText
                    text={mensajeEjemplo}
                    nombreCliente="Nombre"
                    nombreBarberia={nombreBarberia}
                    className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                  />
                )}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wide flex items-center gap-1.5">
                  <Users size={13} />{seleccionados.length} contacto{seleccionados.length > 1 ? 's' : ''}
                </p>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {seleccionados.map(c => (
                  <div key={c.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-gray-700 dark:text-gray-300 font-bold text-xs">{c.nombre[0]}</span>
                    </div>
                    <p className="text-gray-900 dark:text-white text-sm font-medium">{c.nombre}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <WizardInterventionCard
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
        title="Invitar"
        description={
          <div className="flex items-start gap-3">
            <CheckCircle2
              size={16}
              strokeWidth={2.2}
              className="mt-1 shrink-0"
              style={{ color: '#1B7DE2' }}
            />
            <p className="leading-6 text-gray-600 dark:text-gray-300">
              ¿Tienes <strong className="font-bold text-gray-900 dark:text-white">días con pocos clientes</strong>? Manda un <strong className="font-bold text-gray-900 dark:text-white">SMS</strong> a quienes no te han visitado y <strong className="font-bold text-gray-900 dark:text-white">llena esos espacios</strong>
            </p>
          </div>
        }
        ctaLabel="Explorar la sección de Invitar"
        ctaClassName="bg-[#1B7DE2] hover:bg-[#166BC1] dark:bg-[#1B7DE2] dark:hover:bg-[#166BC1] dark:text-white"
        contentClassName="gap-6"
      />
    </div>
  )
}
