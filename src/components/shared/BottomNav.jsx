import { Link, useLocation } from 'react-router-dom'
import { Calendar, Users, Send, Settings, Plus } from 'lucide-react'
import { todayStr } from '../../utils/helpers'

const NAV_ITEMS = [
  { to: '/calendario', label: 'Calendario', Icon: Calendar },
  { to: '/clientes', label: 'Clientes', Icon: Users },
  { to: '/invite', label: 'INVITE', Icon: Send },
  { to: '/settings', label: 'Ajustes', Icon: Settings },
]

export default function BottomNav() {
  const { pathname, search } = useLocation()
  const quickbookTo = pathname.startsWith('/calendario')
    ? `/quickbook?fecha=${new URLSearchParams(search).get('fecha') || todayStr()}`
    : '/quickbook'
  return (
    <nav className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-end z-40 shadow-lg">

      {/* Primeros 2 ítems */}
      {NAV_ITEMS.slice(0, 2).map(({ to, label, Icon }) => {
        const active = pathname.startsWith(to)
        return (
          <Link key={to} to={to} className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors ${active ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>
            <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
            <span className={`text-xs ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
          </Link>
        )
      })}

      {/* Botón central + */}
      <div className="flex-1 flex flex-col items-center pb-2">
        <Link
          to={quickbookTo}
          className="w-14 h-14 -mt-5 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
        >
          <Plus size={26} className="text-white dark:text-gray-900" strokeWidth={2.5} />
        </Link>
        <span className={`text-xs mt-1 ${pathname.startsWith('/quickbook') ? 'font-bold text-gray-900 dark:text-white' : 'font-medium text-gray-400 dark:text-gray-600'}`}>
          Nueva Cita
        </span>
      </div>

      {/* Últimos 2 ítems */}
      {NAV_ITEMS.slice(2).map(({ to, label, Icon }) => {
        const active = pathname.startsWith(to)
        return (
          <Link key={to} to={to} className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors ${active ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>
            <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
            <span className={`text-xs ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
          </Link>
        )
      })}

    </nav>
  )
}