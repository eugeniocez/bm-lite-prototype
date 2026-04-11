import { ArrowLeft, BadgeCheck, MessageSquareText, BellRing, Users, PhoneCall } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useNegocioStore } from '../store/negocio'

const BENEFICIOS = [
  { icon: MessageSquareText, text: 'Confirmaciones por SMS automáticas' },
  { icon: BellRing, text: 'Recordatorios automáticos 24h antes' },
  { icon: PhoneCall, text: 'Llamadas automáticas anti-ausencias' },
  { icon: Users, text: 'Campañas de marketing para recuperar clientes' },
  { icon: BadgeCheck, text: 'Estado Monster Plus y soporte prioritario' },
]

export default function SettingsCancelSubscriptionPage() {
  const navigate = useNavigate()
  const cancelarSuscripcion = useNegocioStore(s => s.cancelarSuscripcion)

  const confirmarCancelacion = () => {
    cancelarSuscripcion()
    navigate(-1)
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div className="px-5 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
        <div className="flex items-start gap-3">
          <button onClick={() => navigate(-1)} className="mt-0.5 p-1 -ml-1 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">¿Estás seguro que deseas cancelar tu suscripción a Monster Plus?</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 space-y-4 bg-white dark:bg-gray-900">
        <div className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-5 py-4">
          <p className="text-sm text-gray-900 dark:text-white">Perderas los siguientes beneficios:</p>
          <div className="mt-3 space-y-2">
            {BENEFICIOS.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.text} className="flex items-start gap-3">
                  <Icon size={16} className="text-red-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 px-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 text-sm font-bold rounded-lg bg-[#1B7DE2] text-white"
          >
            No, conservar Monster Plus
          </button>
          <button
            onClick={confirmarCancelacion}
            className="w-full py-3 text-sm font-bold rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600"
          >
            Sí, cancelar suscripción
          </button>
        </div>
      </div>
    </div>
  )
}