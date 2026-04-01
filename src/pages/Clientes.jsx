import { useEffect, useState } from 'react'
import { Users, Search, ArrowLeft, Zap, Send, ChevronRight, X, Plus, PencilLine, Check } from 'lucide-react'
import { useDirectorioStore } from '../store/directorio'
import { useCitasStore } from '../store/citas'
import { daysSince, formatDate, todayStr } from '../utils/helpers'
import { ESTADO_CONFIG } from '../utils/estados'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/shared/PageHeader'
import PhoneInput from '../components/shared/PhoneInput'

export default function Clientes() {
  const contactos = useDirectorioStore(s => s.contactos)
  const toggleInviteList = useDirectorioStore(s => s.toggleInviteList)
  const agregarOActualizar = useDirectorioStore(s => s.agregarOActualizar)
  const actualizarContacto = useDirectorioStore(s => s.actualizarContacto)
  const [busqueda, setBusqueda] = useState('')
  const [contactoSeleccionado, setContactoSeleccionado] = useState(null)
  const [agregandoCliente, setAgregandoCliente] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const celular = searchParams.get('celular')
    if (!celular) return
    const match = contactos.find(c => c.celular === celular)
    if (match) setContactoSeleccionado(match)
  }, [searchParams, contactos])

  const filtrados = contactos
    .filter(c => c.nombre.toLowerCase().includes(busqueda.toLowerCase()) || c.celular.includes(busqueda))
    .sort((a, b) => a.nombre.localeCompare(b.nombre))

  const handleToggleInvite = () => {
    toggleInviteList(contactoSeleccionado.id)
    setContactoSeleccionado(prev => ({ ...prev, enInviteList: !prev.enInviteList }))
  }

  const AgregarBtn = (
    <button
      onClick={() => setAgregandoCliente(true)}
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
    >
      <Plus size={15} />
      Agregar
    </button>
  )

  return (
    <div className="flex flex-1 overflow-hidden bg-white dark:bg-gray-900">

      {/* Lista — siempre visible */}
      <div className={`flex flex-col overflow-hidden ${contactoSeleccionado ? 'hidden md:flex md:w-80 lg:w-96 border-r border-gray-100 dark:border-gray-800' : 'flex-1'}`}>
        <PageHeader title="Clientes" subtitle={`${contactos.length} contactos`} icon={Users} action={AgregarBtn} />
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
        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 pb-20 md:pb-0">
          {filtrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Users size={40} className="text-gray-200 dark:text-gray-700 mb-3" />
              <p className="text-gray-400 font-medium">Sin resultados</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtrados.map(contacto => {
                const activo = contactoSeleccionado?.id === contacto.id
                return (
                  <button
                    key={contacto.id}
                    onClick={() => {
                      setContactoSeleccionado(contacto)
                      setSearchParams({ celular: contacto.celular }, { replace: true })
                    }}
                    className={`w-full flex items-center gap-3 px-5 py-4 transition-colors text-left ${
                      activo
                        ? 'bg-gray-100 dark:bg-gray-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100'
                    }`}
                  >
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-gray-700 dark:text-gray-300 font-bold text-sm">{contacto.nombre[0]}</span>
                    </div>
                    <p className="flex-1 text-gray-900 dark:text-white font-semibold text-sm">{contacto.nombre}</p>
                    <ChevronRight size={16} className="text-gray-300 dark:text-gray-600 shrink-0" />
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Panel de detalle */}
      {contactoSeleccionado ? (
        <>
          {/* Mobile — pantalla completa */}
          <div className="md:hidden fixed inset-0 max-w-md mx-auto bg-white dark:bg-gray-900 z-50 flex flex-col">
            <ContactoDetalle
              contacto={contactoSeleccionado}
              onClose={() => {
                setContactoSeleccionado(null)
                setSearchParams({}, { replace: true })
              }}
              onToggleInvite={handleToggleInvite}
              onGuardarEdicion={(payload) => {
                actualizarContacto(contactoSeleccionado.id, payload)
                setContactoSeleccionado(prev => ({ ...prev, ...payload }))
              }}
              onQuickBook={() => { setContactoSeleccionado(null); navigate('/quickbook') }}
            />
          </div>
          {/* Desktop — panel lateral */}
          <div className="hidden md:flex flex-1 flex-col overflow-y-auto">
            <ContactoDetalle
              contacto={contactoSeleccionado}
              onClose={() => {
                setContactoSeleccionado(null)
                setSearchParams({}, { replace: true })
              }}
              onToggleInvite={handleToggleInvite}
              onGuardarEdicion={(payload) => {
                actualizarContacto(contactoSeleccionado.id, payload)
                setContactoSeleccionado(prev => ({ ...prev, ...payload }))
              }}
              onQuickBook={() => { setContactoSeleccionado(null); navigate('/quickbook') }}
              esPanel
            />
          </div>
        </>
      ) : (
        <div className="hidden md:flex flex-1 flex-col items-center justify-center text-center px-8">
          <Users size={48} className="text-gray-200 dark:text-gray-700 mb-4" />
          <p className="text-gray-400 font-medium text-sm">Selecciona un cliente para ver su perfil</p>
        </div>
      )}

      {/* Agregar cliente — móvil: fixed overlay, desktop: se muestra igual */}
      {agregandoCliente && (
        <div className="fixed inset-0 max-w-md mx-auto md:max-w-none md:inset-auto md:absolute md:right-0 md:top-0 md:bottom-0 md:w-96 bg-white dark:bg-gray-900 z-50 flex flex-col border-l border-gray-100 dark:border-gray-800">
          <NuevoClientePantalla
            onClose={() => setAgregandoCliente(false)}
            onGuardar={(nombre, celular) => {
              agregarOActualizar({ nombre, celular: `52${celular}` })
              setAgregandoCliente(false)
            }}
          />
        </div>
      )}
    </div>
  )
}

function NuevoClientePantalla({ onClose, onGuardar }) {
  const [nombre, setNombre] = useState('')
  const [celular, setCelular] = useState('')

  const handleGuardar = () => {
    if (!nombre.trim() || celular.length !== 10) return
    onGuardar(nombre.trim(), celular)
  }

  const inputClass = "w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-base focus:outline-none focus:border-gray-900 dark:focus:border-gray-400 transition-all"

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 pt-12 md:pt-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors md:hidden">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white flex-1">Nuevo Cliente</h1>
        <button onClick={onClose} className="hidden md:block p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Nombre *</label>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Nombre del cliente"
            className={inputClass}
            autoComplete="off"
            autoFocus
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Celular *</label>
          <PhoneInput value={celular} onChange={setCelular} />
        </div>
      </div>

      <div className="px-5 pb-8 pt-3 space-y-2 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={handleGuardar}
          disabled={!nombre.trim() || celular.length !== 10}
          className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-3.5 rounded-xl text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Guardar
        </button>
        <button
          onClick={onClose}
          className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3.5 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

function ContactoDetalle({ contacto, onClose, onToggleInvite, onQuickBook, onGuardarEdicion, esPanel = false }) {
  const getCitasPorCliente = useCitasStore(s => s.getCitasPorCliente)
  const todasLasCitas = getCitasPorCliente(contacto.celular)
  const historial = todasLasCitas
  const [editando, setEditando] = useState(false)
  const [nombreEdit, setNombreEdit] = useState(contacto.nombre)
  const [celularEdit, setCelularEdit] = useState(contacto.celular.slice(-10))
  const [notaEdit, setNotaEdit] = useState(contacto.nota || '')

  useEffect(() => {
    setEditando(false)
    setNombreEdit(contacto.nombre)
    setCelularEdit(contacto.celular.slice(-10))
    setNotaEdit(contacto.nota || '')
  }, [contacto.id])

  // Calcular última visita real desde citas confirmadas o walk-in
  const hoy = todayStr()

  // Solo citas pasadas (o de hoy) confirmadas/walk-in como última visita
  const citasVisitadas = todasLasCitas.filter(c =>
    (c.estado === 'Confirmada' || c.estado === 'WalkIn') && c.fecha <= hoy
  )
  const ultimaVisitaReal = citasVisitadas.length > 0
    ? citasVisitadas.reduce((latest, c) =>
        c.fecha > latest ? c.fecha : latest, citasVisitadas[0].fecha
      )
    : contacto.ultimaVisita

  const dias = daysSince(ultimaVisitaReal)

  // Próxima cita — solo fechas estrictamente futuras, estados activos
  const proximaCita = todasLasCitas
    .filter(c => c.fecha >= hoy && !['Cancelada', 'NoShow'].includes(c.estado))
    .sort((a, b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora))[0] || null

  const inputClass = "w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-gray-900 dark:focus:border-gray-400"

  const handleGuardarEdicion = () => {
    if (!nombreEdit.trim() || celularEdit.length !== 10) return
    onGuardarEdicion({
      nombre: nombreEdit.trim(),
      celular: `52${celularEdit}`,
      nota: notaEdit.trim() || null,
    })
    setEditando(false)
  }

  return (
    <div className="flex flex-col h-full">
      <div className={`flex items-center gap-3 px-5 border-b border-gray-100 dark:border-gray-800 ${esPanel ? 'pt-6 pb-4' : 'pt-12 pb-4'}`}>
        {!esPanel && (
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={22} />
          </button>
        )}
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{contacto.nombre}</h1>
        </div>
        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shrink-0">
          <span className="text-gray-700 dark:text-gray-300 font-bold text-base">{contacto.nombre[0]}</span>
        </div>
        {esPanel && (
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors ml-1">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 pb-24 md:pb-5 space-y-5">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2.5 border border-gray-100 dark:border-gray-700">
          <Row label="Celular" value={contacto.celular} />
          <Row label="Última visita" value={ultimaVisitaReal ? formatDate(ultimaVisitaReal) : 'Sin visitas'} />
          <Row label="No-shows" value={
            <span className={contacto.totalNoShows > 0 ? 'text-red-500 font-semibold' : 'text-gray-900 dark:text-white font-semibold'}>
              {contacto.totalNoShows}
            </span>
          } />
          {proximaCita ? (
            <Row label="Próxima visita" value={
              <span className="text-green-700 dark:text-green-400 font-bold text-xs bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-lg">
                ✓ {formatDate(proximaCita.fecha)} · {proximaCita.hora}
              </span>
            } />
          ) : dias !== Infinity && (
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

        <div className="space-y-2 pt-1">
          {!editando ? (
            <button
              onClick={() => setEditando(true)}
              className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3.5 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <PencilLine size={16} />Editar datos del cliente
            </button>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Nombre *</label>
                <input type="text" value={nombreEdit} onChange={e => setNombreEdit(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Celular *</label>
                <PhoneInput value={celularEdit} onChange={setCelularEdit} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Nota</label>
                <input type="text" value={notaEdit} onChange={e => setNotaEdit(e.target.value)} className={inputClass} placeholder="Agregar nota del cliente" />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleGuardarEdicion}
                  disabled={!nombreEdit.trim() || celularEdit.length !== 10}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-3 rounded-xl text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Check size={16} />Guardar
                </button>
                <button
                  onClick={() => {
                    setEditando(false)
                    setNombreEdit(contacto.nombre)
                    setCelularEdit(contacto.celular.slice(-10))
                    setNotaEdit(contacto.nota || '')
                  }}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          <button onClick={onQuickBook} className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-3.5 rounded-xl text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            <Zap size={16} />Nueva cita
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
