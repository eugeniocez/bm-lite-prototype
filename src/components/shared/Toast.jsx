import { useEffect } from 'react'
import { Check, X } from 'lucide-react'

export default function Toast({ mensaje, visible, onClose, tipo = 'exito' }) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onClose, 3000)
      return () => clearTimeout(t)
    }
  }, [visible, onClose])

  return (
    <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
    }`}>
      <div className="flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-3 rounded-2xl shadow-xl">
        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
          <Check size={14} strokeWidth={3} className="text-white" />
        </div>
        <p className="text-sm font-semibold whitespace-nowrap">{mensaje}</p>
        <button onClick={onClose} className="ml-1 text-white/50 dark:text-gray-900/50 hover:text-white dark:hover:text-gray-900 transition-colors">
          <X size={14} />
        </button>
      </div>
    </div>
  )
}