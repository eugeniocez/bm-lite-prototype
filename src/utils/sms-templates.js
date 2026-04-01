import { useNegocioStore } from '../store/negocio'
const getBarberia = () => useNegocioStore.getState().nombreBarberia
export const INVITE_PREVIEW_TOKENS = {
  cliente: '__invite_cliente__',
  barberia: '__invite_barberia__',
  whatsapp: '__invite_whatsapp__',
}

const primerNombre = (nombre) => nombre.split(' ')[0]

export const diaSemanaActual = () => {
  const diasNombres = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
  return diasNombres[new Date().getDay()]
}

const resolveInviteContext = (input) => {
  if (typeof input === 'string') {
    return {
      nombre: primerNombre(input),
      barberia: getBarberia(),
      whatsapp: 'WhatsApp',
    }
  }

  if (input && typeof input === 'object') {
    return {
      nombre: input.nombre ?? INVITE_PREVIEW_TOKENS.cliente,
      barberia: input.barberia ?? getBarberia(),
      whatsapp: input.whatsapp ?? 'WhatsApp',
    }
  }

  return {
    nombre: INVITE_PREVIEW_TOKENS.cliente,
    barberia: INVITE_PREVIEW_TOKENS.barberia,
    whatsapp: INVITE_PREVIEW_TOKENS.whatsapp,
  }
}

export const sms = {
  inviteV1: (input) => {
    const { nombre, barberia, whatsapp } = resolveInviteContext(input)
    return `Ey ${nombre}, hace tiempo que no te vemos por aquí en ${barberia}. ¿Qué tal si esta semana nos das el honor? Resérvalo aquí: ${whatsapp}`
  },

  inviteV2: (input) => {
    const { nombre, barberia, whatsapp } = resolveInviteContext(input)
    return `Hola ${nombre}, el ${diaSemanaActual()} está tranquilo aquí en ${barberia} — perfecto para que vengas sin esperar. ¿Te apuntamos? ${whatsapp}`
  },

  inviteV5: (input) => {
    const { nombre, barberia, whatsapp } = resolveInviteContext(input)
    return `Hola ${nombre}, en ${barberia} extrañamos tu visita. Esta semana hay disponibilidad — aprovéchala antes de que se llene: ${whatsapp}`
  },
}