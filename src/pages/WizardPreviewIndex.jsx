import { Link } from 'react-router-dom'
import { Eye, ArrowRight } from 'lucide-react'
import PageHeader from '../components/shared/PageHeader'

const PREVIEW_LINKS = [
  {
    to: '/quickbook/preview/primer-uso',
    title: 'Nueva cita',
    description: 'Intervención después de registrar la primera cita.',
  },
  {
    to: '/calendario/preview/primer-uso',
    title: 'Calendario',
    description: 'Intervención que explica el significado general de los colores.',
  },
  {
    to: '/clientes/preview/primer-uso',
    title: 'Clientes',
    description: 'Intervención sobre cómo se llena automáticamente el directorio.',
  },
  {
    to: '/invite/preview/primer-uso',
    title: 'Invitar',
    description: 'Intervención para explicar la reactivación de clientes por SMS.',
  },
]

export default function WizardPreviewIndex() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-gray-50 dark:bg-gray-950">
      <PageHeader
        title="Previews del wizard"
        subtitle="Estados de presentación para revisar antes de llevarlos a producción"
        icon={Eye}
      />

      <div className="flex-1 overflow-y-auto px-5 py-5 pb-20 md:pb-5">
        <div className="space-y-3">
          {PREVIEW_LINKS.map((preview) => (
            <Link
              key={preview.to}
              to={preview.to}
              className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-4 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/80 transition-colors"
            >
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">{preview.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{preview.description}</p>
              </div>
              <ArrowRight size={18} className="text-gray-400 dark:text-gray-500 shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}