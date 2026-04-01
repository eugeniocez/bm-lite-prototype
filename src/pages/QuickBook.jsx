import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Clock } from 'lucide-react'
import { useCitasStore } from '../store/citas'
import { useDirectorioStore } from '../store/directorio'
import { todayStr, nowTimeStr, formatDate } from '../utils/helpers'
import Toast from '../components/shared/Toast'
import PageHeader from '../components/shared/PageHeader'
import PhoneInput from '../components/shared/PhoneInput'
import { useToastStore } from '../store/toast'


export default function QuickBook() {
  const agregarCita = useCitasStore(s => s.agregarCita)
  const getCitasPorFecha = useCitasStore(s => s.getCitasPorFecha)
  const cambiarEstado = useCitasStore(s => s.cambiarEstado)
  const contactos = useDirectorioStore(s => s.contactos)
  const buscarPorCelular = useDirectorioStore(s => s.buscarPorCelular)
  const agregarOActualizar = useDirectorioStore(s => s.agregarOActualizar)
  const actualizarUltimaVisita = useDirectorioStore(s => s.actualizarUltimaVisita)

  const [celular, setCelular] = useState('')
  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState(todayStr())
  const [hora, setHora] = useState('10:00')
  const [nota, setNota] = useState('')
  const [esWalkIn, setEsWalkIn] = useState(false)
  const mostrarToast = useToastStore(s => s.mostrar)
  const [sugerencias, setSugerencias] = useState([])
  const [showSugerencias, setShowSugerencias] = useState(false)
  const [sugerenciasCelular, setSugerenciasCelular] = useState([])
  const [showSugerenciasCelular, setShowSugerenciasCelular] = useState(false)
  const [conflicto, setConflicto] = useState(null)
  const [pendingData, setPendingData] = useState(null)
  const navigate = useNavigate()
  const nombreRef = useRef(null)

  const handleNombre = (val) => {
    setNombre(val)
    if (val.trim().length >= 2) {
      const matches = contactos.filter(c =>
        c.nombre.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5)
      setSugerencias(matches)
      setShowSugerencias(matches.length > 0)
    } else {
      setSugerencias([])
      setShowSugerencias(false)
    }
  }

  const handleSeleccionarContacto = (contacto) => {
    setNombre(contacto.nombre)
    setCelular(contacto.celular.slice(-10))
    setSugerencias([])
    setShowSugerencias(false)
    setSugerenciasCelular([])
    setShowSugerenciasCelular(false)
  }

  const handleCelular = (val) => {
    const clean = val.replace(/\D/g, '').slice(0, 10)
    setCelular(clean)
    if (clean.length >= 2) {
      const matches = contactos.filter(c =>
        c.celular.slice(-10).startsWith(clean)
      ).slice(0, 5)
      setSugerenciasCelular(matches)
      setShowSugerenciasCelular(matches.length > 0)
    } else {
      setSugerenciasCelular([])
      setShowSugerenciasCelular(false)
    }
    if (clean.length === 10) {
      const contacto = buscarPorCelular(`52${clean}`)
      if (contacto) { setNombre(contacto.nombre); setSugerenciasCelular([]); setShowSugerenciasCelular(false) }
    }
  }

  const handleWalkIn = () => {
    const nuevoEstado = !esWalkIn
    setEsWalkIn(nuevoEstado)
    if (nuevoEstado) { setFecha(todayStr()); setHora(nowTimeStr()) }
  }

  const crearCita = (data) => {
    const { nombre, celular, fecha, hora, nota, esWalkIn } = data
    const estado = esWalkIn ? 'WalkIn' : 'Apartada'
    const origen = esWalkIn ? 'WalkIn' : 'QuickBook'
    agregarCita({ nombreCliente: nombre, celular: `52${celular}`, fecha, hora, nota: nota || null, estado, origen })
    agregarOActualizar({ nombre, celular: `52${celular}` })
    if (esWalkIn) actualizarUltimaVisita(`52${celular}`)
    setCelular(''); setNombre(''); setFecha(todayStr()); setHora('10:00'); setNota(''); setEsWalkIn(false)
    setSugerencias([]); setShowSugerencias(false)
    setSugerenciasCelular([]); setShowSugerenciasCelular(false)
    mostrarToast(`✔︎ Cita creada y SMS enviado a +52${celular}`)
    setTimeout(() => navigate(`/calendario?fecha=${fecha}&hora=${hora}`), 500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!celular || !nombre || !fecha || !hora) return
    const citasDelDia = getCitasPorFecha(fecha)
    const citaConflicto = citasDelDia
      .filter(c => c.hora === hora && c.estado === 'SinConfirmar')
      .sort((a, b) => b.creadaEn.localeCompare(a.creadaEn))[0]
    if (citaConflicto) {
      setConflicto(citaConflicto)
      setPendingData({ nombre, celular, fecha, hora, nota, esWalkIn })
      return
    }
    crearCita({ nombre, celular, fecha, hora, nota, esWalkIn })
  }

  const handleConservar = () => {
    setConflicto(null)
    setPendingData(null)
  }

  const handleLiberar = () => {
    cambiarEstado(conflicto.id, 'Cancelada')
    crearCita(pendingData)
    setConflicto(null)
    setPendingData(null)
  }

  const inputClass = "w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-base focus:outline-none focus:border-gray-900 dark:focus:border-gray-400 transition-all shadow-sm"

  const WalkInBtn = (
    <button
      type="button"
      onClick={handleWalkIn}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold border transition-all ${
        esWalkIn
          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
          : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-900 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
      }`}
    >
      <Clock size={15} />
      Cliente sin Cita
    </button>
  )

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950 flex flex-col">
      <PageHeader title="Nueva cita" subtitle="Captura tu cita" icon={Zap} action={WalkInBtn} />

      <div className="px-5 py-5 space-y-4">
        {esWalkIn && (
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3">
            <p className="text-green-900 dark:text-green-300 text-sm font-semibold">Modo cliente sin cita activo</p>
            <p className="text-green-700 dark:text-green-400 text-xs mt-0.5">Fecha y hora precargadas con el momento actual</p>
          </div>
        )}

        {conflicto && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4 space-y-3">
            <p className="text-amber-800 dark:text-amber-300 font-semibold text-sm">
              Ya tienes una cita sin confirmar a las {conflicto.hora} con {conflicto.nombreCliente}.
            </p>
            <p className="text-amber-700 dark:text-amber-400 text-xs">¿La conservas o liberas ese espacio para este nuevo cliente?</p>
            <div className="flex gap-2">
              <button type="button" onClick={handleConservar} className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-600 text-amber-800 dark:text-amber-300 hover:bg-amber-50 transition-colors">
                Conservar
              </button>
              <button type="button" onClick={handleLiberar} className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 transition-colors">
                Liberar
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div className="relative">
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Celular *</label>
            <PhoneInput value={celular} onChange={(val) => handleCelular(val)} />
            {celular.length === 10 && buscarPorCelular(`52${celular}`) && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 ml-1 font-medium">✓ Cliente encontrado en directorio</p>
            )}
            {showSugerenciasCelular && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-30 overflow-hidden">
                {sugerenciasCelular.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSeleccionarContacto(c)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left border-b border-gray-100 dark:border-gray-700 last:border-0"
                  >
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-gray-700 dark:text-gray-300 font-bold text-xs">{c.nombre[0]}</span>
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white text-sm font-semibold">{c.nombre}</p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs">{c.celular.slice(-10)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Nombre *</label>
            <input
              ref={nombreRef}
              type="text"
              value={nombre}
              onChange={e => handleNombre(e.target.value)}
              onBlur={() => setTimeout(() => setShowSugerencias(false), 150)}
              onFocus={() => sugerencias.length > 0 && setShowSugerencias(true)}
              placeholder="Nombre del cliente"
              required
              className={inputClass}
              autoComplete="off"
            />
            {showSugerencias && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-30 overflow-hidden">
                {sugerencias.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSeleccionarContacto(c)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left border-b border-gray-100 dark:border-gray-700 last:border-0"
                  >
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-gray-700 dark:text-gray-300 font-bold text-xs">{c.nombre[0]}</span>
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white text-sm font-semibold">{c.nombre}</p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs">{c.celular}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Fecha *</label>
              <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} required disabled={esWalkIn} className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Hora *</label>
              <input type="time" value={hora} onChange={e => setHora(e.target.value)} required disabled={esWalkIn} className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              Nota interna <span className="text-gray-400 font-normal normal-case">(opcional · el cliente no la ve)</span>
            </label>
            <input type="text" autoComplete="off" value={nota} onChange={e => setNota(e.target.value)} placeholder='Ej: "fade corto", "viene con Pepe"' className={inputClass} />
          </div>

          <button type="submit" className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-4 rounded-xl text-base hover:bg-gray-800 dark:hover:bg-gray-100 active:scale-95 transition-all mt-2 shadow-sm">
            {esWalkIn ? 'Registrar cliente sin cita' : 'Crear cita'}
          </button>
        </form>
      </div>

    </div>
  )
}
