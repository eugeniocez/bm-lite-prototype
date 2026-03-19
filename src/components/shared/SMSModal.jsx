import { MessageSquare, X } from 'lucide-react'

export default function SMSModal({ isOpen, onClose, to, mensaje, titulo = 'SMS enviado' }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gray-900 dark:bg-gray-800 px-5 py-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center shrink-0">
            <MessageSquare size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Simulación</p>
            <p className="text-white font-bold text-sm">{titulo}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={18} /></button>
        </div>
        <div className="px-5 py-5">
          <p className="text-xs text-gray-400 mb-2">Para: {to}</p>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3">
            <p className="text-gray-900 dark:text-white text-sm leading-relaxed">{mensaje}</p>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-right">Ahora · barbermonster.com</p>
        </div>
        <div className="px-5 pb-5">
          <p className="text-xs text-gray-400 text-center mb-3">En producción este SMS se enviaría automáticamente</p>
          <button onClick={onClose} className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-3 rounded-xl text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Entendido
          </button>
        </div>
      </div>
    </div>
  )
}
