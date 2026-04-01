import { useNegocioStore } from '../store/negocio'
const getBarberia = () => useNegocioStore.getState().nombreBarberia
export const WA_LINK = 'wa.me/528110001234'
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
  confirmacion: (nombre, fecha, hora) =>
    `Hola ${primerNombre(nombre)}, tu cita en ${getBarberia()} está confirmada para el ${fecha} a las ${hora}. Confirma, reagenda o cancela aquí: ${WA_LINK}`,

  recordatorio: (nombre, fecha, hora) =>
    `Hola ${primerNombre(nombre)}, te recordamos tu cita en ${getBarberia()} mañana ${fecha} a las ${hora}. Confirma, reagenda o cancela aquí: ${WA_LINK}`,

  cancelacion: (nombre) =>
    `Hola ${primerNombre(nombre)}, tu cita en ${getBarberia()} ha sido cancelada. Cuando quieras agendar de nuevo: ${WA_LINK}. ¡Te esperamos!`,

  noShow: (nombre) =>
    `Hola ${primerNombre(nombre)}, notamos que no pudiste asistir a tu cita de hoy en ${getBarberia()}. Cuando quieras podemos reagendarte aquí: ${WA_LINK}`,

  walkIn: (nombre) =>
    `¡Gracias por visitarnos hoy en ${getBarberia()}, ${primerNombre(nombre)}! Fue un placer atenderte. ¡Hasta pronto!`,

  // ── INVITE ──────────────────────────────────────────────────────

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