import { useState } from 'react'
import { Users, Search, ArrowLeft, Zap, Send, ChevronRight } from 'lucide-react'
import { useDirectorioStore } from '../store/directorio'
import { useCitasStore } from '../store/citas'
import { daysSince, formatDate } from '../utils/helpers'
import { ESTADO_CONFIG } from '../utils/estados'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/shared/PageHeader'

export default function Directorio() {
  const contactos = useDirectorioStore(s => s.contactos)
  const toggleInviteList = useDirectorioStore(s => s.toggleInviteList)
  const [busqueda, setBusqueda] = useState('')
  const [contactoSeleccionado, setContactoSeleccionado] = useState(null)
  const navigate = useNavigate()

  const filtrados = contactos
    .filter(c => c.nombre.toLowerCase().includes(busqueda.toLowerCase()) || c.celular.includes(busqueda))
    .sort((a, b) => a.nombre.localeCompare(b.nombre))

  if (contactoSeleccionado) {
    return (
      <ContactoPantalla
        contacto={contactoSeleccionado}
        onClose={() => setContactoSeleccionado(null)}
        onToggleInvite={() => {
          toggleInviteList(contactoSeleccionado.id)
          setContactoSeleccionado(prev => ({ ...prev, enInviteList: !prev.enInviteList }))
        }}
        onQuickBook={() => { setContactoSeleccionado(null); navigate('/quickbook') }}
      />
    )
  }

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-950 flex flex-col">
      <PageHeader title="Clientes" subtitle={`${contactos.length} contactos`} icon={Users} />
      <div className="px-5 pt-4 pb-2 bg-white dark:bg-gray-900">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o celular..."
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:border-gray-900 dark:focus:border-gray-400 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
        {filtrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Users size={40} className="text-gray-200 dark:text-gray-700 mb-3" />
            <p className="text-gray-400 font-medium">Sin resultados</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtrados.map(contacto => (
              <button
                key={contacto.id}
                onClick={() => setContactoSeleccionado(contacto)}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-gray-700 dark:text-gray-300 font-bold text-sm">{contacto.nombre[0]}</span>
                </div>
                <p className="flex-1 text-gray-900 dark:text-white font-semibold text-sm">{contacto.nombre}</p>
                <ChevronRight size={16} className="text-gray-300 dark:text-gray-600 shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ContactoPantalla({ contacto, onClose, onToggleInvite, onQuickBook }) {
  const getCitasPorCliente = useCitasStore(s => s.getCitasPorCliente)
  const historial = getCitasPorCliente(contacto.celular).slice(0, 5)
  const dias = daysSince(contacto.ultimaVisita)

  return (
    <div className="fixed inset-0 max-w-md mx-auto bg-white dark:bg-gray-900 z-50 flex flex-col">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          <ArrowLeft size={22} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{contacto.nombre}</h1>
        </div>
        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shrink-0">
          <span className="text-gray-700 dark:text-gray-300 font-bold text-base">{contacto.nombre[0]}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2.5 border border-gray-100 dark:border-gray-700">
          <Row label="Celular" value={contacto.celular} />
          <Row label="Última visita" value={contacto.ultimaVisita ? formatDate(contacto.ultimaVisita) : 'Sin visitas'} />
          <Row label="No-shows" value={
            <span className={contacto.totalNoShows > 0 ? 'text-red-500 font-semibold' : 'text-gray-900 dark:text-white font-semibold'}>
              {contacto.totalNoShows}
            </span>
          } />
          {dias > 30 && dias !== Infinity && (
            <Row label="Sin visita" value={<span className="text-gray-500 dark:text-gray-400 font-semibold">{dias} días</span>} />
          )}
          {contacto.nota && <Row label="Nota" value={contacto.nota} />}
        </div>

        {historial.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-2">Historial reciente</p>
            <div className="space-y-2">
              {historial.map(cita => {
                const cfg = ESTADO_CONFIG[cita.estado] || {}
                return (
                  <div key={cita.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2.5 border border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="text-gray-900 dark:text-white text-sm font-semibold">{formatDate(cita.fecha)} · {cita.hora}</p>
                      {cita.nota && <p className="text-gray-400 text-xs mt-0.5">{cita.nota}</p>}
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${cfg.badge || 'bg-gray-100 text-gray-500'}`}>
                      {cfg.label || cita.estado}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="space-y-2 pt-2">
          <button onClick={onQuickBook} className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-3.5 rounded-xl text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            <Zap size={16} />
            Nueva cita
          </button>
          <button
            onClick={onToggleInvite}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold border transition-colors ${
              contacto.enInviteList
                ? 'bg-purple-100 dark:bg-purple-900/40 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-purple-300 hover:text-purple-600'
            }`}
          >
            <Send size={16} />
            {contacto.enInviteList ? '✓ En lista INVITE' : 'Agregar a INVITE'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-gray-400 font-semibold shrink-0">{label}</span>
      <span className="text-sm text-gray-900 dark:text-white text-right">{value}</span>
    </div>
  )
}
