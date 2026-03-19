export default function PageHeader({ title, subtitle, icon: Icon, action }) {
  return (
    <div className="px-5 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={20} className="text-gray-900 dark:text-white" />}
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>
        </div>
        {action && action}
      </div>
      {subtitle && <p className="text-gray-400 dark:text-gray-500 text-sm mt-0.5">{subtitle}</p>}
    </div>
  )
}
