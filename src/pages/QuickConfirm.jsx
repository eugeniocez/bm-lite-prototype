import { useState } from 'react'
import { CheckCircle2, RefreshCw, XCircle, ChevronLeft, Calendar, Clock, User, Check, X } from 'lucide-react'

/**
 * QuickConfirm — Página pública del cliente
 * Ruta: /quickconfirm
 * En producción: /c/:token
 */

const CITA_DEMO = {
  cliente:  'Eugenio Castillo',
  barberia: 'Barbería El Tigre',
  fecha:    'lunes 30 mar.',
  hora:     '2:00 PM',
  estado:   'SinConfirmar', // SinConfirmar | Confirmada | Cancelada | Apartada | NoShow | WalkIn
}

// Mismo ESTADO_CONFIG que utils/estados.js del prototipo
const ESTADO_CONFIG = {
  Apartada:     { label: 'Apartada',        badge: 'bg-gray-100 text-gray-700'   },
  SinConfirmar: { label: 'Sin confirmar',   badge: 'bg-yellow-400 text-gray-900' },
  Confirmada:   { label: 'Confirmada',      badge: 'bg-green-700 text-white'     },
  Cancelada:    { label: 'Cancelada',       badge: 'bg-red-100 text-red-700'     },
  NoShow:       { label: 'No Show',         badge: 'bg-red-900 text-white'       },
  WalkIn:       { label: 'Walk-in',         badge: 'bg-green-200 text-green-900' },
}

const HORARIOS_ALTERNATIVOS = [
  { id: 1, dia: 'Martes 31 mar.',   hora: '10:00 AM' },
  { id: 2, dia: 'Martes 31 mar.',   hora: '2:00 PM'  },
  { id: 3, dia: 'Miércoles 1 abr.', hora: '11:00 AM' },
  { id: 4, dia: 'Miércoles 1 abr.', hora: '4:00 PM'  },
]

function PantallaResultado({ tipo, cita, horario, onReset }) {
  const config = {
    confirmada: {
      bg:    'bg-green-500',
      icon:  <Check size={28} strokeWidth={3} className="text-white" />,
      title: '¡Listo, nos vemos!',
      body:  <>Te esperamos el <strong>{cita.fecha}</strong> a las <strong>{cita.hora}</strong> en {cita.barberia}.</>,
    },
    reagendada: {
      bg:    'bg-amber-400',
      icon:  <RefreshCw size={26} strokeWidth={2.5} className="text-gray-900" />,
      title: 'Cita reagendada',
      body:  <>Tu nuevo horario en {cita.barberia}: <strong>{horario?.dia}</strong> a las <strong>{horario?.hora}</strong>.</>,
    },
    cancelada: {
      bg:    'bg-red-500',
      icon:  <X size={28} strokeWidth={3} className="text-white" />,
      title: 'Cita cancelada',
      body:  <>Tu cita del {cita.fecha} fue cancelada. Cuando quieras agendar de nuevo, {cita.barberia} estará aquí.</>,
    },
  }[tipo]

  return (
    <div className="flex flex-col items-center text-center pt-4 pb-6 px-2">
      <div className={`w-16 h-16 ${config.bg} rounded-full flex items-center justify-center mb-5`}>
        {config.icon}
      </div>
      <h2 className="text-xl font-extrabold text-gray-900 mb-2">{config.title}</h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-8">{config.body}</p>
      <button onClick={onReset} className="text-xs text-gray-300 underline underline-offset-2">
        Demo: volver al inicio
      </button>
    </div>
  )
}

function FlujoReagendar({ onBack, onConfirmar }) {
  const [sel, setSel] = useState(null)

  return (
    <div className="flex flex-col pb-2">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-400 font-semibold mb-6 hover:text-gray-700 transition-colors self-start"
      >
        <ChevronLeft size={15} />
        Volver
      </button>

      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Nuevo horario</p>
      <h3 className="text-lg font-extrabold text-gray-900 mb-4">¿Cuándo te queda mejor?</h3>

      <div className="space-y-2 mb-6">
        {HORARIOS_ALTERNATIVOS.map((h) => {
          const activo = sel?.id === h.id
          return (
            <button
              key={h.id}
              onClick={() => setSel(h)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border-2 transition-all text-left ${
                activo
                  ? 'border-gray-900 bg-gray-900'
                  : 'border-gray-100 bg-gray-50 hover:border-gray-200'
              }`}
            >
              <div>
                <p className={`font-semibold text-sm ${activo ? 'text-white' : 'text-gray-800'}`}>{h.dia}</p>
                <p className={`text-xs mt-0.5 ${activo ? 'text-gray-300' : 'text-gray-400'}`}>{h.hora}</p>
              </div>
              {activo && (
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shrink-0">
                  <Check size={11} className="text-gray-900" strokeWidth={3} />
                </div>
              )}
            </button>
          )
        })}
      </div>

      <button
        onClick={() => sel && onConfirmar(sel)}
        disabled={!sel}
        className={`w-full font-bold py-4 rounded-2xl text-sm transition-all ${
          sel
            ? 'bg-amber-400 text-gray-900 hover:bg-amber-300 active:scale-[.98]'
            : 'bg-gray-100 text-gray-300 cursor-not-allowed'
        }`}
      >
        Confirmar nueva fecha
      </button>
    </div>
  )
}

function ConfirmarCancelacion({ onConfirmar, onBack }) {
  return (
    <div className="flex flex-col pb-2">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-400 font-semibold mb-6 hover:text-gray-700 transition-colors self-start"
      >
        <ChevronLeft size={15} />
        Volver
      </button>

      <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-5 mb-6 text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <XCircle size={22} className="text-red-500" />
        </div>
        <h3 className="text-base font-extrabold text-gray-900 mb-1">¿Seguro que quieres cancelar?</h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          La barbería quedará con ese espacio libre y no podrás deshacerlo desde aquí.
        </p>
      </div>

      <button
        onClick={onConfirmar}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-2xl text-sm transition-colors active:scale-[.98] mb-2.5"
      >
        Sí, cancelar mi cita
      </button>
      <button
        onClick={onBack}
        className="w-full bg-gray-100 text-gray-600 font-semibold py-4 rounded-2xl text-sm hover:bg-gray-200 transition-colors"
      >
        No, mantener la cita
      </button>
    </div>
  )
}

export default function QuickConfirm() {
  const [pantalla, setPantalla] = useState('main')
  const [horarioElegido, setHorarioElegido] = useState(null)
  const cita = CITA_DEMO

  const handleReset = () => { setPantalla('main'); setHorarioElegido(null) }

  const enMain      = pantalla === 'main'
  const enResultado = ['confirmada', 'reagendada', 'cancelada'].includes(pantalla)

  const estadoCfg = ESTADO_CONFIG[cita.estado] || ESTADO_CONFIG.SinConfirmar

  return (
    <>
      <div
        className="min-h-screen flex justify-center"
        style={{ background: 'radial-gradient(ellipse 120% 60% at 50% -10%, rgba(231,57,70,0.07) 0%, transparent 70%), #F3F4F6' }}
      >
        <div className="w-full max-w-sm bg-white flex flex-col min-h-screen">

          <div className="flex-1 flex flex-col px-5 pt-10 pb-8">

            {/* Mensaje introductorio + badge de estado */}
            {enMain && (
              <div className="mb-6">
                <p className="text-xl font-extrabold text-gray-900 leading-snug">
                  Hola, {cita.cliente.split(' ')[0]} 👋
                </p>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  Tienes una cita pendiente de confirmar en{' '}
                  <span className="font-semibold text-gray-700">{cita.barberia}</span>.
                  ¿Nos confirmas que vas?
                </p>
              </div>
            )}

            {/* Tarjeta de datos */}
            {enMain && (
              <div className="rounded-2xl border border-gray-100 overflow-hidden mb-5">
                {[
                  { icon: User,     label: 'Cliente', value: cita.cliente },
                  { icon: Calendar, label: 'Fecha',   value: cita.fecha   },
                  { icon: Clock,    label: 'Hora',     value: cita.hora    },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3.5 px-4 py-3.5 border-b border-gray-50"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-gray-50">
                      <Icon size={16} className="text-gray-400" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 leading-none mb-0.5">
                        {label}
                      </p>
                      <p className="text-sm font-bold text-gray-900">{value}</p>
                    </div>
                  </div>
                ))}

                {/* Fila de estado con badge */}
                <div className="flex items-center gap-3.5 px-4 py-3.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-gray-50">
                    <CheckCircle2 size={16} className="text-gray-400" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 leading-none mb-1">
                      Estado
                    </p>
                    <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md ${estadoCfg.badge}`}>
                      {estadoCfg.label}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Botones — justo debajo de la tarjeta */}
            {enMain && (
              <div className="space-y-2.5">
                <button
                  onClick={() => setPantalla('confirmada')}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 active:scale-[.98] text-white font-bold py-4 rounded-2xl text-sm transition-all"
                >
                  <CheckCircle2 size={17} strokeWidth={2.5} />
                  Confirmar
                </button>
                <button
                  onClick={() => setPantalla('reagendar')}
                  className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 active:scale-[.98] text-gray-900 font-bold py-4 rounded-2xl text-sm transition-all"
                >
                  <RefreshCw size={17} strokeWidth={2.5} />
                  Reagendar
                </button>
                <button
                  onClick={() => setPantalla('cancelar')}
                  className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-400 active:scale-[.98] text-white font-bold py-4 rounded-2xl text-sm transition-all"
                >
                  <XCircle size={17} strokeWidth={2.5} />
                  Cancelar
                </button>
              </div>
            )}

            {/* Resultados */}
            {enResultado && (
              <PantallaResultado
                tipo={pantalla}
                cita={cita}
                horario={horarioElegido}
                onReset={handleReset}
              />
            )}

            {/* Flujo reagendar */}
            {pantalla === 'reagendar' && (
              <FlujoReagendar
                onBack={() => setPantalla('main')}
                onConfirmar={(h) => { setHorarioElegido(h); setPantalla('reagendada') }}
              />
            )}

            {/* Confirmar cancelación */}
            {pantalla === 'cancelar' && (
              <ConfirmarCancelacion
                onConfirmar={() => setPantalla('cancelada')}
                onBack={() => setPantalla('main')}
              />
            )}

          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 font-semibold pb-8 uppercase tracking-widest">
            Powered by <span className="text-gray-500">BarberMonster</span>
          </p>

        </div>
      </div>
    </>
  )
}
