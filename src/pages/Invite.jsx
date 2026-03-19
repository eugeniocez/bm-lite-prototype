import { useState } from 'react'
import { Send, Users, MessageSquare, Check, ArrowLeft, ArrowRight } from 'lucide-react'
import PageHeader from '../components/shared/PageHeader'
import { useDirectorioStore } from '../store/directorio'
import { useInviteStore } from '../store/invite'
import { daysSince } from '../utils/helpers'
import { sms } from '../utils/sms-templates'
import SMSModal from '../components/shared/SMSModal'

const PLANTILLAS = [
  { id: 'v1', label: '"Hace tiempo"', fn: sms.inviteV1 },
  { id: 'v2', label: '"El martes está tranquilo"', fn: sms.inviteV2 },
]

const PASOS = ['Contactos', 'Mensaje', 'Confirmar']

function StepIndicator({ paso }) {
  return (
    <div className="flex items-center justify-center mb-4">
      {PASOS.map((label, i) => {
        const num = i + 1
        const activo = num === paso
        const completado = num < paso
        return (
          <div key={i} className="flex items-center">
            <div className="flex items-center gap-1.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                completado || activo ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}>
                {completado ? <Check size={12} /> : num}
              </div>
              <span className={`text-xs font-semibold whitespace-nowrap ${activo ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                {label}
              </span>
            </div>
            {i < PASOS.length - 1 && (
              <div className={`w-8 h-px mx-2 ${completado ? 'bg-gray-900 dark:bg-white' : 'bg-gray-200 dark:bg-gray-700'}`} />
            )}
          </div>
        )
      })}
    </div>
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

export default function Invite() {
  const contactos = useDirectorioStore(s => s.contactos)
  const toggleInviteList = useDirectorioStore(s => s.toggleInviteList)
  const enviarCampana = useInviteStore(s => s.enviarCampana)

  const [paso, setPaso] = useState(1)
  const [plantillaId, setPlantillaId] = useState('v1')
  const [enviado, setEnviado] = useState(false)
  const [smsPreview, setSmsPreview] = useState(null)

  const sugeridos = contactos.filter(c => daysSince(c.ultimaVisita) >= 30)
  const recientes = contactos.filter(c => daysSince(c.ultimaVisita) < 30)
  const seleccionados = contactos.filter(c => c.enInviteList)
  const plantilla = PLANTILLAS.find(p => p.id === plantillaId)

  const handleEnviar = () => {
    if (seleccionados.length === 0) return
    enviarCampana({ audiencia: seleccionados.map(c => c.id), mensaje: plantilla.fn('[Nombre]'), plantillaId, enviados: seleccionados.length })
    const ultimo = seleccionados[seleccionados.length - 1]
    setSmsPreview({ to: ultimo.celular, mensaje: plantilla.fn(ultimo.nombre), titulo: `Campaña enviada a ${seleccionados.length} contacto${seleccionados.length > 1 ? 's' : ''}` })
    setEnviado(true)
  }

  const handleReset = () => { setEnviado(false); setPaso(1); setPlantillaId('v1') }

  // ── Enviado ──
  if (enviado) {
    return (
      <>
        <div className="flex flex-col bg-gray-50 dark:bg-gray-950 min-h-full">
          <PageHeader title="INVITE" subtitle="Reactiva clientes que no te han visitado en 30+ días" icon={Send} />
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center py-16">
            <div className="w-16 h-16 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center mb-4">
              <Check size={32} className="text-white dark:text-gray-900" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">¡Campaña enviada!</h2>
            <p className="text-gray-500 text-sm mb-1">
              {seleccionados.length} mensaje{seleccionados.length > 1 ? 's' : ''} despachado{seleccionados.length > 1 ? 's' : ''}
            </p>
            <p className="text-gray-400 text-xs mb-8">Las reservas generadas aparecerán etiquetadas en el calendario</p>
            <button onClick={handleReset} className="bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold px-8 py-3 rounded-xl text-sm hover:bg-gray-800 transition-colors">
              Nueva campaña
            </button>
          </div>
        </div>
        <SMSModal isOpen={!!smsPreview} onClose={() => setSmsPreview(null)} to={smsPreview?.to} mensaje={smsPreview?.mensaje} titulo={smsPreview?.titulo} />
      </>
    )
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <PageHeader title="INVITE" subtitle="Reactiva clientes que no te han visitado en 30+ días" icon={Send} />

      {/* Step indicator + CTA — siempre visible */}
      <div className="px-5 pt-4 pb-3 bg-gray-50 dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 shrink-0">
        <StepIndicator paso={paso} />
        <div className="flex gap-2">
          {paso > 1 && (
            <button onClick={() => setPaso(p => p - 1)} className="flex items-center gap-1.5 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <ArrowLeft size={16} />Atrás
            </button>
          )}
          {paso < 3 ? (
            <button onClick={() => setPaso(p => p + 1)} disabled={paso === 1 && seleccionados.length === 0}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-3 rounded-xl text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              Siguiente<ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handleEnviar} disabled={seleccionados.length === 0}
              className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white font-bold py-3 rounded-xl text-sm hover:bg-purple-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <Send size={16} />Enviar campaña
            </button>
          )}
        </div>
      </div>

      {/* Contenido — solo esta área hace scroll */}
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
                  <p className={`text-sm leading-relaxed ${plantillaId === p.id ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{p.fn('[Nombre]')}</p>
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
              </div>
              <div className="px-4 py-3">
                <p className="text-xs text-gray-400 font-semibold mb-2">{plantilla?.label}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{plantilla?.fn('[Nombre]')}</p>
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
    </div>
  )
}
