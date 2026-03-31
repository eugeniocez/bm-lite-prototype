import { Link, useLocation } from 'react-router-dom'
import { Zap, Calendar, Users, Send, Settings } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/calendario', label: 'Calendario', Icon: Calendar },
  { to: '/clientes', label: 'Clientes', Icon: Users },
  { to: '/quickbook', label: 'Nueva Cita', Icon: Zap },
  { to: '/invite', label: 'INVITE', Icon: Send },
  { to: '/settings', label: 'Ajustes', Icon: Settings },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  return (
    <nav className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex z-40 shadow-lg">
      {NAV_ITEMS.map(({ to, label, Icon }) => {
        const active = pathname.startsWith(to)
        return (
          <Link
            key={to}
            to={to}
            className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors ${
              active
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400'
            }`}
          >
            <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
            <span className={`text-xs ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}