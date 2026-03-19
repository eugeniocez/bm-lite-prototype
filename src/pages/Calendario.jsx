import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Calendar, Users, Plus, Trash2, ChevronRight as ChevronR, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCitasStore } from '../store/citas'
import { useDirectorioStore } from '../store/directorio'
import { todayStr, addDays, formatDateLong, formatDate } from '../utils/helpers'
import { ESTADO_CONFIG, TRANSICIONES, ACCION_LABELS } from '../utils/estados'
import { calcularLayout } from '../utils/overlap'
import { sms } from '../utils/sms-templates'
import Modal from '../components/shared/Modal'
import SMSModal from '../components/shared/SMSModal'

const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const HOUR_START = 7
const HOUR_END = 21
const HOURS = Array.from({ length: HOUR_END - HOUR_START }, (_, i) => HOUR_START + i)
const CELL_HEIGHT = 64

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}
function minutesToPx(min) {
  return ((min - HOUR_START * 60) / 60) * CELL_HEIGHT
}
function getCurrentTimePx() {
  const now = new Date()
  return minutesToPx(now.getHours() * 60 + now.getMinutes())
}
function getDayLabel(dateStr) {
  const d = new Date(`${dateStr}T12:00:00`)
  return DIAS[d.getDay()]
}

const USUARIOS_SEED = [
  { id: 'u1', nombre: 'Tú', rol: 'Administrador', esAdmin: true, telefono: '' },
  { id: 'u2', nombre: 'Juan Pérez', rol: 'Miembro', esAdmin: false, telefono: '8112340001' },
  { id: 'u3', nombre: 'Carlos Ruiz', rol: 'Miembro', esAdmin: false, telefono: '8112340002' },
]

function UsuariosPantalla({ onClose }) {
  const [usuarios, setUsuarios] = useState(USUARIOS_SEED)
  const [vista, setVista] = useState('lista')
  const [seleccionado, setSeleccionado] = useState(null)
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [nuevoTel, setNuevoTel] = useState('')
  const [editNombre, setEditNombre] = useState('')
  const [editTel, setEditTel] = useState('')

  const admins = usuarios.filter(u => u.esAdmin)
  const miembros = usuarios.filter(u => !u.esAdmin)

  const handleEditar = (u) => { setSeleccionado(u); setEditNombre(u.nombre); setEditTel(u.telefono); setVista('editar') }
  const handleGuardar = () => { setUsuarios(prev => prev.map(u => u.id === seleccionado.id ? { ...u, nombre: editNombre, telefono: editTel } : u)); setVista('lista') }
  const handleEliminar = (id) => { setUsuarios(prev => prev.filter(u => u.id !== id)); setVista('lista') }
  const handleAgregar = () => { if (!nuevoNombre.trim()) return; setUsuarios(prev => [...prev, { id: `u${Date.now()}`, nombre: nuevoNombre, rol: 'Miembro', esAdmin: false, telefono: nuevoTel }]); setNuevoNombre(''); setNuevoTel(''); setVista('lista') }
  const goBack = () => vista === 'lista' ? onClose() : setVista('lista')

  return (
    <div className="fixed inset-0 max-w-md mx-auto bg-white dark:bg-gray-900 z-50 flex flex-col">
      <div className="flex items-center gap-3 px-5 pt-12 pb-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={goBack} className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><ArrowLeft size={22} /></button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">{vista === 'lista' ? 'Usuarios' : vista === 'editar' ? 'Editar Miembro' : 'Agregar Miembro'}</h1>
      </div>

      {vista === 'lista' && (
        <div className="flex-1 overflow-y-auto pb-8">
          <div className="px-5 pt-5 pb-1"><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tú (Administrador)</p></div>
          {admins.map(u => (
            <button key={u.id} onClick={() => handleEditar(u)} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 text-left transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0"><Users size={18} className="text-blue-500" /></div>
              <div className="flex-1"><p className="text-gray-900 dark:text-white font-semibold text-sm">{u.nombre}</p><p className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide font-medium mt-0.5">{u.rol}</p></div>
              <ChevronR size={16} className="text-gray-300" />
            </button>
          ))}
          {miembros.length > 0 && (<>
            <div className="px-5 pt-6 pb-1"><p className="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">Miembros</p></div>
            {miembros.map(u => (
              <button key={u.id} onClick={() => handleEditar(u)} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 text-left transition-colors">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0"><Users size={18} className="text-gray-400" /></div>
                <div className="flex-1"><p className="text-gray-900 dark:text-white font-semibold text-sm">{u.nombre}</p><p className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide font-medium mt-0.5">{u.rol}</p></div>
                <ChevronR size={16} className="text-gray-300" />
              </button>
            ))}
          </>)}
          <div className="px-5 pt-6">
            <button onClick={() => setVista('agregar')} className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-4 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
              <Plus size={18} />Agregar Miembro
            </button>
          </div>
        </div>
      )}

      {vista === 'editar' && seleccionado && (
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Nombre</label>
            <input type="text" value={editNombre} onChange={e => setEditNombre(e.target.value)} disabled={seleccionado.esAdmin} className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-gray-900 dark:focus:border-gray-400 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:text-gray-500" />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 italic">Los cambios se guardan automáticamente</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Teléfono</label>
            <input type="tel" value={editTel} onChange={e => setEditTel(e.target.value)} placeholder="10 dígitos" disabled={seleccionado.esAdmin} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3.5 text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:border-gray-900 dark:focus:border-gray-400 disabled:cursor-not-allowed" />
          </div>
          {!seleccionado.esAdmin && (<>
            <button onClick={handleGuardar} className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-3.5 rounded-xl text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">Guardar cambios</button>
            <button onClick={() => handleEliminar(seleccionado.id)} className="w-full flex items-center justify-center gap-2 bg-red-50 border border-red-100 text-red-600 font-bold py-3.5 rounded-xl text-sm hover:bg-red-100 transition-colors"><Trash2 size={16} />Eliminar Usuario</button>
          </>)}
        </div>
      )}

      {vista === 'agregar' && (
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Nombre *</label>
            <input type="text" value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)} placeholder="Nombre del barbero" className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-gray-900 dark:focus:border-gray-400" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Teléfono</label>
            <input type="tel" value={nuevoTel} onChange={e => setNuevoTel(e.target.value)} placeholder="10 dígitos" className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-gray-900 dark:focus:border-gray-400" />
          </div>
          <button onClick={handleAgregar} className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors mt-2"><Plus size={18} />Agregar Miembro</button>
        </div>
      )}
    </div>
  )
}

function CitaBlock({ cita, onClick }) {
  const cfg = ESTADO_CONFIG[cita.estado] || ESTADO_CONFIG.Apartada
  const startMin = timeToMinutes(cita.hora)
  const top = minutesToPx(startMin)
  const height = Math.max(CELL_HEIGHT * 0.75, 44)
  if (startMin < HOUR_START * 60 || startMin >= HOUR_END * 60) return null

  const left = cita._left ?? 0
  const width = cita._width ?? 1
  const numCols = cita._numCols ?? 1
  const compact = numCols > 1

  return (
    <button
      onClick={() => onClick(cita)}
      style={{
        top: `${top}px`,
        height: `${height}px`,
        left: `${left * 100}%`,
        width: `calc(${width * 100}% - 2px)`,
        marginLeft: left > 0 ? '2px' : '2px',
      }}
      className={`absolute rounded-lg px-1.5 py-1 flex flex-col justify-center text-left overflow-hidden shadow-sm active:scale-95 transition-transform z-10 ${cfg.cardBg} ${cfg.cardBorder}`}
    >
      <p className={`font-bold truncate leading-tight ${cfg.cardText}`} style={{ fontSize: compact ? '10px' : '11px' }}>
        {cita.hora}
      </p>
      {!compact && (
        <p className={`truncate leading-tight mt-0.5 ${cfg.cardText}`} style={{ fontSize: '10px', opacity: 0.85 }}>
          {cita.nombreCliente}
        </p>
      )}
      {compact && (
        <p className={`truncate leading-tight mt-0.5 ${cfg.cardText}`} style={{ fontSize: '9px', opacity: 0.8 }}>
          {cita.nombreCliente.split(' ')[0]}
        </p>
      )}
    </button>
  )
}

function ScrollCluster({ cluster, innerWidthPct, colWidthPct, onClick }) {
  const [scrolled, setScrolled] = useState(false)

  return (
    <div className="absolute left-0 right-0 z-10" style={{ top: `${cluster.topPx}px`, height: `${cluster.heightPx + 8}px` }}>
      <div
        className="absolute inset-0 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
        onScroll={e => setScrolled(e.currentTarget.scrollLeft > 10)}
      >
        <div style={{ width: `${innerWidthPct}%`, height: "100%", position: "relative" }}>
          {cluster.citas.map(cita => {
            const cfg = ESTADO_CONFIG[cita.estado] || ESTADO_CONFIG.Apartada
            return (
              <button
                key={cita.id}
                onClick={() => onClick(cita)}
                style={{
                  top: `${cita._topInCluster + 2}px`,
                  height: `${cita._height}px`,
                  left: `calc(${cita._colIdx * colWidthPct}% + 2px)`,
                  width: `calc(${colWidthPct}% - 4px)`,
                  position: "absolute",
                }}
                className={`rounded-lg px-1.5 py-1 flex flex-col justify-center text-left overflow-hidden shadow-sm active:scale-95 transition-transform ${cfg.cardBg} ${cfg.cardBorder}`}
              >
                <p className={`font-bold truncate leading-tight ${cfg.cardText}`} style={{ fontSize: "10px" }}>{cita.hora}</p>
                <p className={`truncate leading-tight mt-0.5 ${cfg.cardText}`} style={{ fontSize: "9px", opacity: 0.85 }}>{cita.nombreCliente.split(" ")[0]}</p>
              </button>
            )
          })}
        </div>
      </div>
      {/* Fade + badge — se ocultan al hacer scroll */}
      <div
        className="absolute top-0 right-0 bottom-0 pointer-events-none z-20 transition-opacity duration-200"
        style={{
          width: "30%",
          background: "linear-gradient(to right, transparent, var(--scroll-fade, rgba(255,255,255,0.97)))",
          opacity: scrolled ? 0 : 1,
        }}
      />
      <div
        className="absolute right-2 pointer-events-none z-30 flex items-center justify-center transition-opacity duration-200"
        style={{
          top: `${cluster.citas[0]._topInCluster + cluster.citas[0]._height / 2}px`,
          transform: "translateY(-50%)",
          opacity: scrolled ? 0 : 1,
        }}
      >
        <span className="bg-gray-900 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
          +{cluster.hiddenCount}
        </span>
      </div>
    </div>
  )
}

function CalendarColumn({ citas, onClick, onAddNew, esHoy, nowPx, showNowDot = true }) {
  const { normal, scrollClusters } = calcularLayout(citas)

  return (
    <div className="flex-1 relative border-l border-gray-200 dark:border-gray-800">
      {/* Hour grid lines */}
      {HOURS.map(hour => (
        <div key={hour} style={{ height: `${CELL_HEIGHT}px` }} className="border-b border-gray-100 dark:border-gray-800">
          <div className="border-b border-gray-50 h-1/2" />
        </div>
      ))}
      {esHoy && <div className="absolute inset-0 bg-blue-50/30 dark:bg-blue-900/10 pointer-events-none" />}
      {/* Time line */}
      {esHoy && nowPx >= 0 && nowPx <= HOURS.length * CELL_HEIGHT && (
        <>
          <div style={{ top: `${nowPx}px` }} className="absolute left-0 right-0 flex items-center pointer-events-none z-20">
            {showNowDot && <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-1.5 shrink-0" />}
            <div className="flex-1 h-px bg-red-400" />
          </div>
          <button
            onClick={onAddNew}
            style={{ top: `${nowPx + 6}px`, height: "40px" }}
            className="absolute left-1 right-1 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 flex items-center justify-center z-10 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 transition-colors"
          >
            <span className="text-xs text-gray-400 dark:text-gray-600 font-medium">+ Agregar cita</span>
          </button>
        </>
      )}
      {/* Normal citas — full width divided equally */}
      <div className="absolute inset-0">
        {normal.map(cita => <CitaBlock key={cita.id} cita={cita} onClick={onClick} />)}
      </div>
      {/* Scroll clusters — >3 citas simultáneas, scroll horizontal */}
      {scrollClusters.map((cluster, i) => {
        const MAX_COLS = 3
        const innerWidthPct = cluster.totalCols / MAX_COLS * 100
        const colWidthPct = 100 / cluster.totalCols
        return (
          <ScrollCluster
            key={i}
            cluster={cluster}
            innerWidthPct={innerWidthPct}
            colWidthPct={colWidthPct}
            onClick={onClick}
          />
        )
      })}
    </div>
  )
}

export default function Calendario() {
  const navigate = useNavigate()
  const [vista, setVista] = useState('dia')
  const [fechaActual, setFechaActual] = useState(todayStr())
  const [citaSeleccionada, setCitaSeleccionada] = useState(null)
  const [smsModal, setSmsModal] = useState(null)
  const [usuariosOpen, setUsuariosOpen] = useState(false)
  const [nowPx, setNowPx] = useState(getCurrentTimePx())
  const scrollRef = useRef(null)

  const getCitasPorFecha = useCitasStore(s => s.getCitasPorFecha)
  const cambiarEstado = useCitasStore(s => s.cambiarEstado)
  const incrementarNoShows = useDirectorioStore(s => s.incrementarNoShows)
  const actualizarUltimaVisita = useDirectorioStore(s => s.actualizarUltimaVisita)

  const tresDias = Array.from({ length: 3 }, (_, i) => addDays(fechaActual, i))

  useEffect(() => {
    const interval = setInterval(() => setNowPx(getCurrentTimePx()), 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = Math.max(0, nowPx - 100)
  }, [vista])

  const handleCambiarEstado = (cita, nuevoEstado) => {
    cambiarEstado(cita.id, nuevoEstado)
    if (nuevoEstado === 'NoShow') { incrementarNoShows(cita.celular); setSmsModal({ to: cita.celular, mensaje: sms.noShow(cita.nombreCliente), titulo: 'SMS de no-show' }) }
    else if (nuevoEstado === 'Cancelada') { setSmsModal({ to: cita.celular, mensaje: sms.cancelacion(cita.nombreCliente), titulo: 'SMS de cancelación' }) }
    else if (nuevoEstado === 'Confirmada') { actualizarUltimaVisita(cita.celular) }
    setCitaSeleccionada(prev => prev ? { ...prev, estado: nuevoEstado } : null)
  }

  const tituloNav = vista === 'dia' ? formatDateLong(fechaActual) : `${formatDate(tresDias[0])} — ${formatDate(tresDias[2])}`

  return (
    <div className="fixed inset-0 max-w-md mx-auto bg-white dark:bg-gray-900 flex flex-col overflow-hidden">
      {usuariosOpen && <UsuariosPantalla onClose={() => setUsuariosOpen(false)} />}

      {/* Header */}
      <div className="px-4 pt-6 pb-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">

        {/* Row 1: título | toggle + usuarios */}
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar size={20} />
            Calendario
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
              {['dia', '3dias'].map(v => (
                <button key={v} onClick={() => setVista(v)} className={`px-2.5 py-1.5 rounded-md text-xs font-bold transition-colors whitespace-nowrap ${vista === v ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
                  {v === 'dia' ? 'Día' : '3 días'}
                </button>
              ))}
            </div>
            <button onClick={() => setUsuariosOpen(true)} className="flex items-center gap-0.5 p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors">
              <Users size={17} className="text-gray-600 dark:text-gray-400" />
              <Plus size={13} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Row 2: navegación de fecha centrada */}
        <div className="flex items-center justify-between">
          <button onClick={() => setFechaActual(prev => addDays(prev, vista === 'dia' ? -1 : -3))} className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 capitalize">{tituloNav}</span>
          <button onClick={() => setFechaActual(prev => addDays(prev, vista === 'dia' ? 1 : 3))} className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>

      </div>

      {/* ── VISTA DÍA ── */}
      {vista === 'dia' && (
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="flex" style={{ minHeight: `${HOURS.length * CELL_HEIGHT}px` }}>
            <div className="w-14 shrink-0 select-none">
              {HOURS.map(hour => (
                <div key={hour} style={{ height: `${CELL_HEIGHT}px` }} className="flex items-start justify-end pr-3 pt-1">
                  <span className="text-xs text-gray-400 dark:text-gray-600 font-medium tabular-nums">
                    {hour === 12 ? '12pm' : hour > 12 ? `${hour - 12}pm` : `${hour}am`}
                  </span>
                </div>
              ))}
            </div>
            <CalendarColumn
              citas={getCitasPorFecha(fechaActual)}
              onClick={setCitaSeleccionada}
              onAddNew={() => navigate('/quickbook')}
              esHoy={fechaActual === todayStr()}
              nowPx={nowPx}
              showNowDot={true}
            />
          </div>
        </div>
      )}

      {/* ── VISTA 3 DÍAS ── */}
      {vista === '3dias' && (
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="w-10 shrink-0" />
            {tresDias.map((d) => {
              const esHoyD = d === todayStr()
              return (
                <button key={d} onClick={() => { setFechaActual(d); setVista('dia') }} className="flex-1 flex flex-col items-center py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">{getDayLabel(d)}</span>
                  <span className={`text-base font-bold mt-0.5 w-8 h-8 flex items-center justify-center rounded-full ${esHoyD ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'text-gray-800 dark:text-gray-200'}`}>
                    {parseInt(d.split('-')[2])}
                  </span>
                </button>
              )
            })}
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto">
            <div className="flex" style={{ minHeight: `${HOURS.length * CELL_HEIGHT}px` }}>
              <div className="w-10 shrink-0 select-none">
                {HOURS.map(hour => (
                  <div key={hour} style={{ height: `${CELL_HEIGHT}px` }} className="flex items-start justify-end pr-1.5 pt-1">
                    <span className="text-gray-400 dark:text-gray-600 font-medium tabular-nums" style={{ fontSize: '9px' }}>
                      {hour === 12 ? '12p' : hour > 12 ? `${hour - 12}p` : `${hour}a`}
                    </span>
                  </div>
                ))}
              </div>
              {tresDias.map((d, colIdx) => (
                <CalendarColumn
                  key={d}
                  citas={getCitasPorFecha(d)}
                  onClick={setCitaSeleccionada}
                  onAddNew={() => navigate('/quickbook')}
                  esHoy={d === todayStr()}
                  nowPx={nowPx}
                  showNowDot={colIdx === 0}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <Modal isOpen={!!citaSeleccionada} onClose={() => setCitaSeleccionada(null)} title={citaSeleccionada?.nombreCliente || ''}>
        {citaSeleccionada && <CitaDetalle cita={citaSeleccionada} onCambiarEstado={handleCambiarEstado} />}
      </Modal>
      <SMSModal isOpen={!!smsModal} onClose={() => setSmsModal(null)} to={smsModal?.to} mensaje={smsModal?.mensaje} titulo={smsModal?.titulo} />
    </div>
  )
}

function CitaDetalle({ cita, onCambiarEstado }) {
  const cfg = ESTADO_CONFIG[cita.estado]
  const transiciones = TRANSICIONES[cita.estado] || []
  const ACCION_COLORS = {
    Confirmada: 'bg-gray-900 text-white hover:bg-gray-800',
    SinConfirmar: 'bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-200',
    Cancelada: 'bg-red-100 text-red-700 border border-red-200 hover:bg-red-200',
    NoShow: 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200',
  }
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2.5 border border-gray-100 dark:border-gray-700">
        <Row label="Celular" value={cita.celular} />
        <Row label="Fecha" value={`${formatDate(cita.fecha)} · ${cita.hora}`} />
        <Row label="Estado" value={<span className={`text-xs font-bold px-2 py-1 rounded-lg ${cfg.badge}`}>{cfg.label}</span>} />
        {cita.nota && <Row label="Nota" value={cita.nota} />}
        <Row label="Origen" value={cita.origen} />
      </div>
      {transiciones.length > 0 && (
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wide mb-2">Cambiar estado</p>
          <div className="space-y-2">
            {transiciones.map(est => (
              <button key={est} onClick={() => onCambiarEstado(cita, est)} className={`w-full py-3 rounded-xl text-sm font-bold transition-colors ${ACCION_COLORS[est] || 'bg-gray-100 text-gray-700'}`}>
                {ACCION_LABELS[est] || est}
              </button>
            ))}
          </div>
        </div>
      )}
      {transiciones.length === 0 && <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-2">Estado terminal — no hay más acciones disponibles</p>}
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold shrink-0">{label}</span>
      <span className="text-sm text-gray-900 dark:text-white text-right">{value}</span>
    </div>
  )
}
