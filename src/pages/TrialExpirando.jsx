import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield, Zap, X } from 'lucide-react'
import { useNegocioStore } from '../store/negocio'

/**
 * TrialExpirando — Página full-screen sin scroll
 * Ruta: /trial
 *
 * Cambia DIAS_DEMO para probar los dos estados visuales: urgente (1-2) y aviso (3-5)
 */

const DIAS_DEMO = 5 // 1, 2, 3, 4, 5

const ACCENT = '#E63946'

const BENEFICIOS = [
  { icon: Shield, texto: 'Tus clientes e historial se conservan intactos' },
  { icon: Zap,    texto: 'Confirmaciones y recordatorios siguen activos' },
  { icon: X,      texto: 'Sin contrato — cancela cuando quieras' },
]

export default function TrialExpirando() {
  const navigate = useNavigate()
  const nombreBarberia = useNegocioStore(s => s.nombreBarberia) || 'tu barbería'

  const dias = DIAS_DEMO
  const urgente = dias <= 2

  return (
    <div className="h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 flex justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-950 flex flex-col h-full">

        {/* Header — solo flecha */}
        <div className="flex items-center px-5 pt-10 pb-2 shrink-0">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            aria-label="Regresar"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 flex flex-col px-6 pt-4 pb-8 w-full overflow-hidden">

          {/* Logo */}
          <div className="mb-5">
            <img src="/logo.webp" alt="BarberMonster" className="h-10 dark:hidden" />
            <img src="/logo-white.webp" alt="BarberMonster" className="h-10 hidden dark:block" />
          </div>

          {/* Headline con highlight */}
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-3">
            Tu prueba gratis<br />
            <span style={{ color: ACCENT }}>termina pronto</span>
          </h1>

          {/* Badge días — debajo del título */}
          <div className="mb-4">
            <span
              className="inline-flex items-center text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={urgente
                ? { background: '#FEF2F2', color: ACCENT }
                : { background: '#FFFBEB', color: '#B45309' }
              }
            >
              {dias === 1 ? 'Último día' : `${dias} días restantes`}
            </span>
          </div>

          {/* Subtítulo */}
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
            Activa tu suscripción y{' '}
            <span className="font-semibold text-gray-700 dark:text-gray-300">{nombreBarberia}</span>{' '}
            sigue funcionando sin interrupciones.
          </p>

          {/* 3 puntos de beneficio */}
          <div className="space-y-3 mb-6">
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

          {/* Card de precio */}
          <div
            className="rounded-3xl px-6 py-5 mb-4"
            style={{ border: `2px solid ${ACCENT}` }}
          >
            <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-widest mb-2">
              Plan mensual
            </p>
            <div className="flex items-end gap-2 mb-2">
              <p className="text-5xl font-extrabold leading-none" style={{ color: ACCENT }}>
                $199
              </p>
              <p className="text-gray-400 text-sm font-medium mb-1">MXN / mes</p>
            </div>
            <div className="h-px bg-gray-100 dark:bg-gray-800 mb-2" />
            <p className="text-gray-400 dark:text-gray-500 text-xs leading-relaxed">
              SMS · Recordatorios · Llamadas · Invitar · Todo incluido
            </p>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* CTAs */}
          <div className="space-y-3">
            <button
              onClick={() => alert('→ Aquí iría el flujo de pago')}
              className="w-full text-white font-bold py-4 rounded-2xl text-base transition-all active:scale-[.98]"
              style={{ background: ACCENT }}
            >
              Activar suscripción
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full text-gray-400 dark:text-gray-600 font-medium py-3 text-sm hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            >
              Recordarme después
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
