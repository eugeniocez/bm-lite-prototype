
export const ESTADO_CONFIG = {
  Apartada: {
    label: 'Apartada',
    cardBg: 'bg-white',
    cardText: 'text-gray-900',
    cardBorder: 'border border-gray-200',
    badge: 'bg-gray-100 text-gray-700',
  },
  SinConfirmar: {
    label: 'Sin confirmar',
    cardBg: 'bg-yellow-400',
    cardText: 'text-gray-900',
    cardBorder: 'border border-yellow-400',
    badge: 'bg-yellow-400 text-gray-900',
  },
  Confirmada: {
    label: 'Confirmada',
    cardBg: 'bg-green-800',
    cardText: 'text-white',
    cardBorder: 'border border-green-800',
    badge: 'bg-green-700 text-white',
  },
  Cancelada: {
    label: 'Cancelada',
    cardBg: 'bg-red-50',
    cardText: 'text-red-700',
    cardBorder: 'border border-dashed border-red-400',
    badge: 'bg-red-100 text-red-700',
  },
  NoShow: {
    label: 'No Show',
    cardBg: 'bg-gray-900',
    cardText: 'text-red-400',
    cardBorder: 'border border-red-900',
    badge: 'bg-red-900 text-white',
    striped: true,
  },
  WalkIn: {
    label: 'Walk-in',
    cardBg: 'bg-green-100',
    cardText: 'text-green-900',
    cardBorder: 'border border-green-200',
    badge: 'bg-green-200 text-green-900',
  },
}

export const TRANSICIONES = {
  Apartada: ['Confirmada', 'SinConfirmar', 'Cancelada', 'NoShow'],
  SinConfirmar: ['Confirmada', 'Cancelada', 'NoShow'],
  Confirmada: ['Cancelada', 'NoShow'],
  Cancelada: [],
  NoShow: [],
  WalkIn: [],
}

export const ACCION_LABELS = {
  Confirmada: 'Confirmar',
  SinConfirmar: 'Marcar sin confirmar',
  Cancelada: 'Cancelar cita',
  NoShow: 'Marcar no show',
}
