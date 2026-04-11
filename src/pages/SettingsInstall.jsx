import { useState } from 'react'
import { ArrowLeft, Smartphone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BrandSignature from '../components/shared/BrandSignature'

const PASOS = {
  iphone: [
    {
      title: 'Abre esta página en Safari',
      description: 'La instalación solo funciona desde el navegador Safari de iPhone.',
    },
    {
      title: 'Toca el botón Compartir',
      description: 'Es el icono de cuadro con flecha, en la barra inferior del navegador.',
    },
    {
      title: 'Toca "Agregar a pantalla de inicio"',
      description: 'Desplázate hacia abajo en el menú hasta encontrar la opción.',
    },
    {
      title: 'Toca "Agregar"',
      description: 'Confirma en la esquina superior derecha de la pantalla.',
    },
  ],
  android: [
    {
      title: 'Abre esta página en Chrome',
      description: 'La instalación funciona mejor desde Google Chrome.',
    },
    {
      title: 'Toca el menú de opciones',
      description: 'Son los tres puntos en la esquina superior derecha.',
    },
    {
      title: 'Toca "Instalar aplicación"',
      description: 'O "Agregar a pantalla de inicio" según tu versión de Chrome.',
    },
    {
      title: 'Confirma la instalación',
      description: 'Toca "Instalar" en el diálogo que aparece.',
    },
  ],
}

function PlatformSelector({ active, value, label, onSelect }) {
  const isActive = active === value

  return (
    <button
      onClick={() => onSelect(value)}
      className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
        isActive
          ? 'bg-[#1B7DE2] text-white'
          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
      }`}
    >
      {label}
    </button>
  )
}

export default function SettingsInstallPage() {
  const navigate = useNavigate()
  const [platform, setPlatform] = useState('iphone')

  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="px-5 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Instala BarberMonster</h1>
          </div>
          <BrandSignature variant="lockup" size="sm" subdued className="shrink-0 md:hidden" />
        </div>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-0.5">Accede más rápido desde tu celular como aplicación</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 pb-24">
        <div className="px-4 pt-4">
          <div className="flex items-center gap-2 rounded-2xl bg-white dark:bg-gray-900">
            <PlatformSelector active={platform} value="iphone" label="iPhone" onSelect={setPlatform} />
            <PlatformSelector active={platform} value="android" label="Android" onSelect={setPlatform} />
          </div>
        </div>

        <div className="mt-4 divide-y divide-gray-100 border-b border-gray-100 dark:divide-gray-800 dark:border-gray-800">
          {PASOS[platform].map((step, index) => (
            <div key={step.title} className="flex items-start gap-4 px-5 py-4 bg-white dark:bg-gray-900">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1B7DE2] text-sm font-bold text-white">
                {index + 1}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 dark:text-white">{step.title}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}