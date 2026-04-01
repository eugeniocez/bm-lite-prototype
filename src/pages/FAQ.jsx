import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const FAQS = [
  {
    q: '¿Mis clientes tienen que crear una cuenta para confirmar?',
    a: 'No. Tu cliente recibe un SMS con un link. Un toque y listo — confirma, reagenda o cancela sin descargar nada ni registrarse en ningún lado.'
  },
  {
    q: '¿Cuánto tarda configurar la app?',
    a: 'Cero configuración obligatoria. Sin horarios que cargar, sin catálogo de servicios, sin datos de staff. Abres la app y en menos de 2 minutos puedes capturar tu primera cita.'
  },
  {
    q: '¿Qué pasa cuando termina el primer mes gratis?',
    a: 'Te avisamos antes de que expire. Si decides continuar, se cobran $199 MXN al mes. Si no, se cancela sin cargos y sin que tengas que hacer nada complicado.'
  },
  {
    q: '¿Cuántos SMS incluye el plan?',
    a: 'Los suficientes para el uso normal de una barbería: confirmación inicial, recordatorio 24h antes, mensaje de anti-ausencias y campañas para invitar clientes. No cobramos por SMS adicionales en uso normal.'
  },
  {
    q: '¿Qué pasa si el cliente no responde ni al SMS ni a la llamada?',
    a: 'La cita queda marcada en amarillo en el calendario. Tú decides: confirmarla manualmente, liberar el espacio para otro cliente, o simplemente esperarla. El sistema no toma decisiones por ti en ese caso.'
  },
]

export default function FAQPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div className="px-5 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Preguntas frecuentes</h1>
        </div>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-0.5">Encuentra respuestas a las dudas más comunes del uso de BarberMonster</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24 space-y-3">
        {FAQS.map((faq, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}