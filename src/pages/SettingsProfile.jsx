import { useState } from 'react'
import { ArrowLeft, Check, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useNegocioStore } from '../store/negocio'
import BrandSignature from '../components/shared/BrandSignature'

function EditableRow({ label, value, placeholder, onSave }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  const handleSave = () => {
    onSave(draft)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="flex items-center justify-between px-4 py-2.5 bg-white dark:bg-gray-900 gap-3">
        <span className="text-sm text-gray-900 dark:text-white shrink-0">{label}</span>
        <div className="flex items-center gap-2 flex-1 justify-end">
          <input
            autoFocus
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder={placeholder}
            className="text-sm text-right bg-transparent text-gray-900 dark:text-white placeholder-gray-300 focus:outline-none flex-1 min-w-0"
          />
          <button onClick={handleSave} className="w-6 h-6 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center shrink-0">
            <Check size={12} className="text-white dark:text-gray-900" strokeWidth={3} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => { setDraft(value); setEditing(true) }}
      className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 w-full text-left active:bg-gray-100 dark:active:bg-gray-800 transition-colors"
    >
      <span className="text-sm text-gray-900 dark:text-white">{label}</span>
      <span className="flex items-center gap-1.5">
        <span className="text-sm text-gray-400 dark:text-gray-500">
          {value || <span className="text-gray-300 dark:text-gray-600">{placeholder}</span>}
        </span>
        <ChevronRight size={14} className="text-gray-300 dark:text-gray-600" />
      </span>
    </button>
  )
}

function Group({ children }) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
      {children}
    </div>
  )
}

export default function SettingsProfilePage() {
  const navigate = useNavigate()
  const {
    nombreBarberia, whatsapp, email, direccion,
    setNombreBarberia, setWhatsapp, setEmail, setDireccion,
  } = useNegocioStore()

  return (
    <div className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div className="px-5 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Mi perfil</h1>
          </div>
          <BrandSignature variant="lockup" size="sm" subdued className="shrink-0 md:hidden" />
        </div>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-0.5">Edita los datos de tu barberia</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24 pt-4">
        <Group>
          <EditableRow label="Nombre" value={nombreBarberia} placeholder="Nombre de tu barberia" onSave={setNombreBarberia} />
          <EditableRow label="WhatsApp" value={whatsapp} placeholder="Ej. +52 81 3547 0864" onSave={setWhatsapp} />
          <EditableRow label="Email" value={email} placeholder="Opcional" onSave={setEmail} />
          <EditableRow label="Direccion" value={direccion} placeholder="Opcional" onSave={setDireccion} />
        </Group>
      </div>
    </div>
  )
}