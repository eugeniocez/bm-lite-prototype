import { useNavigate } from 'react-router-dom'
import { Settings, ChevronRight, CheckCircle2, Smartphone } from 'lucide-react'
import { useNegocioStore } from '../store/negocio'
import PageHeader from '../components/shared/PageHeader'

const BENEFICIOS = [
  'Citas ilimitadas',
  'Directorio de clientes automático',
  'Historial de clientes',
  'Confirmaciones por SMS automáticas',
  'Recordatorios automáticos 24h antes',
  'Llamadas automáticas anti-ausencias',
  'Campañas de mensajes para recuperar clientes',
  'Estado Monster Plus y soporte prioritario',
]

function MenuItem({ label, onPress }) {
  return (
    <button
      onClick={onPress}
      className="w-full flex items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-800"
    >
      <span className="flex-1 text-gray-900 dark:text-white font-semibold text-sm">{label}</span>
      <span className="shrink-0">
        <ChevronRight size={16} className="text-gray-300 dark:text-gray-600" />
      </span>
    </button>
  )
}

export default function SettingsPage() {
  const navigate = useNavigate()
  const { plan } = useNegocioStore()
  const suscripcionActiva = plan === 'activo'

  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-gray-900 overflow-hidden">
      <PageHeader title="Ajustes" subtitle="Gestiona tu negocio y cuenta" icon={Settings} brand="lockup" />

      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 pb-24">

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          <MenuItem label="Editar mi perfil" onPress={() => navigate('/settings/profile')} />
          <MenuItem label="Administrar suscripción" onPress={() => navigate('/settings/subscription')} />
          <MenuItem label="Preguntas frecuentes" onPress={() => navigate('/faq')} />
          <button
            onClick={() => navigate('/settings/install')}
            className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-white text-left transition-colors hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-800"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Agregar a pantalla de inicio</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/30">
                <Smartphone size={16} className="shrink-0 text-[#1B7DE2]" />
              </div>
            </div>
            <ChevronRight size={16} className="shrink-0 text-gray-300 dark:text-gray-600" />
          </button>
          <MenuItem label="Soporte" onPress={() => navigate('/settings/support')} />
        </div>

        {!suscripcionActiva && (
          <div className="px-4 pt-4 space-y-4">
            <div>
              <button
                onClick={() => navigate('/settings/subscription')}
                className="w-full rounded-lg bg-[#1B7DE2] px-4 py-3 text-sm font-bold text-white transition-all active:opacity-80"
              >
                Activar suscripción por $199 MXN/mes
              </button>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Precio final con IVA incluido.</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900">
              <p className="text-sm text-gray-900 dark:text-white">Beneficios</p>
              <div className="mt-3 space-y-2">
                {BENEFICIOS.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#1B7DE2]" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
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