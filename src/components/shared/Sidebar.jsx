import { Link, useLocation } from 'react-router-dom'
import { Zap, Calendar, Users, Send, Settings } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/calendario', label: 'Calendario', Icon: Calendar },
  { to: '/clientes', label: 'Clientes', Icon: Users },
  { to: '/quickbook', label: 'Nueva Cita', Icon: Zap },
  { to: '/invite', label: 'Invitar', Icon: Send },
  { to: '/settings', label: 'Ajustes', Icon: Settings },
]

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="hidden md:flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shrink-0 w-16 lg:w-56 transition-all duration-200">
      <div className="hidden lg:flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-800 shrink-0">
        <img src="/logo.webp" alt="BarberMonster" className="h-9 dark:hidden" />
        <img src="/logo-white.webp" alt="BarberMonster" className="h-9 hidden dark:block" />
      </div>
      <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
        {NAV_ITEMS.map(({ to, label, Icon }) => {
          const active = pathname.startsWith(to)
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                active
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  : 'text-gray-400 dark:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.5} className="shrink-0" />
              <span className={`hidden lg:block text-sm font-semibold whitespace-nowrap ${active ? 'text-gray-900 dark:text-white' : ''}`}>
                {label}
              </span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}