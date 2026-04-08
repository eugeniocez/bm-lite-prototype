import { ArrowLeft, Shield, Zap, X } from 'lucide-react'

export const TRIAL_DAYS_DEMO = 5

const ACCENT = '#E63946'

const BENEFICIOS = [
  { icon: Shield, texto: 'Tus clientes e historial se conservan intactos' },
  { icon: Zap, texto: 'Confirmaciones y recordatorios siguen activos' },
  { icon: X, texto: 'Sin contrato — cancela cuando quieras' },
]

export default function TrialNoticeContent({
  dias = TRIAL_DAYS_DEMO,
  nombreBarberia = 'tu barbería',
  variant = 'fullscreen',
  onBack,
  onActivate,
  onRemindLater,
}) {
  const urgente = dias <= 2
  const isModal = variant === 'modal'

  return (
    <div className={isModal ? 'w-full max-w-[38rem] bg-white dark:bg-gray-950' : 'w-full max-w-md bg-white dark:bg-gray-950 flex flex-col h-full'}>
      {variant === 'fullscreen' && (
        <div className="flex items-center px-5 pt-10 pb-2 shrink-0">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            aria-label="Regresar"
          >
            <ArrowLeft size={18} />
          </button>
        </div>
      )}

      <div className={isModal ? 'px-7 py-6 w-full' : 'flex-1 flex flex-col px-6 pt-4 pb-8 w-full overflow-hidden'}>
        <div className={isModal ? 'mb-4' : 'mb-5'}>
          <img src="/logo.webp" alt="BarberMonster" className="h-10 dark:hidden" />
          <img src="/logo-white.webp" alt="BarberMonster" className="h-10 hidden dark:block" />
        </div>

        <h1 className={isModal ? 'text-[2.1rem] font-extrabold text-gray-900 dark:text-white leading-[1.03] mb-2.5' : 'text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-3'}>
          Tu prueba gratis<br />
          <span style={{ color: ACCENT }}>termina pronto</span>
        </h1>

        <div className={isModal ? 'mb-3.5' : 'mb-4'}>
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

        <p className={isModal ? 'text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed mb-5 max-w-[30rem]' : 'text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6'}>
          Activa tu suscripción y{' '}
          <span className="font-semibold text-gray-700 dark:text-gray-300">{nombreBarberia}</span>{' '}
          sigue funcionando sin interrupciones.
        </p>

        <div className={isModal ? 'grid gap-3 sm:grid-cols-3 mb-5' : 'space-y-3 mb-6'}>
          {BENEFICIOS.map((beneficio) => {
            const IconComponent = beneficio.icon

            return (
              <div
                key={beneficio.texto}
                className={isModal ? 'rounded-2xl border border-gray-100 dark:border-gray-800 px-3.5 py-3' : 'flex items-center gap-3'}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: '#FEF2F2' }}
                >
                  <IconComponent size={15} style={{ color: ACCENT }} />
                </div>
                <p className={isModal ? 'text-[13px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed' : 'text-sm text-gray-600 dark:text-gray-400'}>{beneficio.texto}</p>
              </div>
            )
          })}
        </div>

        <div
          className={isModal ? 'rounded-[1.8rem] px-6 py-5 mb-4 bg-white dark:bg-gray-950' : 'rounded-3xl px-6 py-5 mb-4'}
          style={{ border: `2px solid ${ACCENT}` }}
        >
          <p className="text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-widest mb-2">
            Plan mensual
          </p>
          <div className="flex items-end gap-2 mb-2">
            <p className={isModal ? 'text-[3.5rem] font-extrabold leading-none' : 'text-5xl font-extrabold leading-none'} style={{ color: ACCENT }}>
              $199
            </p>
            <p className="text-gray-400 text-sm font-medium mb-1">MXN / mes</p>
          </div>
          <div className="h-px bg-gray-100 dark:bg-gray-800 mb-2" />
          <p className="text-gray-400 dark:text-gray-500 text-xs leading-relaxed">
            SMS · Recordatorios · Llamadas · Invitar · Todo incluido
          </p>
        </div>

        <div className={isModal ? 'flex items-center justify-center gap-3' : 'mt-auto space-y-3'}>
          <button
            onClick={onActivate}
            className={isModal ? 'min-w-60 text-white font-bold px-6 py-4 rounded-2xl text-base transition-all active:scale-[.98]' : 'w-full text-white font-bold py-4 rounded-2xl text-base transition-all active:scale-[.98]'}
            style={{ background: ACCENT }}
          >
            Activar suscripción
          </button>
          <button
            onClick={onRemindLater}
            className={isModal ? 'text-gray-400 dark:text-gray-600 font-medium px-3 py-3 text-sm hover:text-gray-600 dark:hover:text-gray-400 transition-colors' : 'w-full text-gray-400 dark:text-gray-600 font-medium py-3 text-sm hover:text-gray-600 dark:hover:text-gray-400 transition-colors'}
          >
            Recordarme después
          </button>
        </div>
      </div>
    </div>
  )
}