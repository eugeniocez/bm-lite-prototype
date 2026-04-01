import { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, subtitle, children }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="relative w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col"
        style={{ maxHeight: '85vh' }}
      >
        <div className="px-5 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
          {subtitle && <p className="text-gray-400 dark:text-gray-500 text-sm mt-0.5">{subtitle}</p>}
        </div>
        <div className="overflow-y-auto px-5 py-4 pb-8 flex-1 min-h-0">
          {children}
        </div>
      </div>
    </div>
  )
}
