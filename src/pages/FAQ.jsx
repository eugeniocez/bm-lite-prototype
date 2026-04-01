import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const FAQS = [
  {
    q: '¿Cómo funciona el recordatorio automático?',
    a: 'El sistema envía un SMS 24 horas antes de la cita con una liga para que el cliente confirme, reagende o cancele. Si no hay respuesta, se hace una llamada automática 2 horas antes.'
  },
  {
    q: '¿Qué pasa si mi cliente no confirma la cita?',
    a: 'La cita pasa a estado "Sin confirmar" (amarillo en tu calendario). Tú decides si conservarla, liberarla o contactar al cliente directamente.'
  },
  {
    q: '¿Puedo cancelar mi suscripción en cualquier momento?',
    a: 'Sí, sin penalizaciones ni contratos. Al cancelar tu cuenta queda activa hasta el final del periodo pagado.'
  },
  {
    q: '¿Se guardan mis clientes y citas si cancelo?',
    a: 'Tus datos se conservan por 30 días después de cancelar. Si reactivas tu cuenta en ese período los recuperas completos.'
  },
  {
    q: '¿Cuántos SMS incluye el plan?',
    a: 'El plan incluye SMS ilimitados para confirmaciones, recordatorios, cancelaciones y campañas INVITE. Sin costo adicional por volumen.'
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
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-0.5 invisible">placeholder</p>
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