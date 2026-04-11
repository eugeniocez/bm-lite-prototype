import { ArrowLeft, ChevronRight, Mail, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BrandSignature from '../components/shared/BrandSignature'

function SupportItem({ label, icon: Icon, onPress }) {
  return (
    <button
      onClick={onPress}
      className="w-full flex items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-800"
    >
      <Icon size={16} className="shrink-0 text-gray-500 dark:text-gray-400" />
      <span className="flex-1 text-sm text-gray-900 dark:text-white">{label}</span>
      <ChevronRight size={16} className="shrink-0 text-gray-300 dark:text-gray-600" />
    </button>
  )
}

export default function SettingsSupportPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="px-5 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Soporte</h1>
          </div>
          <BrandSignature variant="lockup" size="sm" subdued className="shrink-0 md:hidden" />
        </div>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-0.5">Elige tu canal para contactar al equipo de soporte</p>
      </div>

      <div className="flex-1 bg-white dark:bg-gray-900 pb-24">
        <div className="divide-y divide-gray-100 dark:divide-gray-800 border-b border-gray-100 dark:border-gray-800">
          <SupportItem icon={MessageCircle} label="Soporte por WhatsApp" onPress={() => window.open('https://wa.me/528135470864', '_blank')} />
          <SupportItem icon={Mail} label="Soporte por correo" onPress={() => { window.location.href = 'mailto:hola@barbermonster.com' }} />
        </div>
      </div>
    </div>
  )
}