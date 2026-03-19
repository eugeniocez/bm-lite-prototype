export const BARBERIA = 'Barber Monster'
export const WA_LINK = 'wa.me/528110001234'

const primerNombre = (nombre) => nombre.split(' ')[0]

export const sms = {
  confirmacion: (nombre, fecha, hora) =>
    `Hola ${primerNombre(nombre)}, tu cita en ${BARBERIA} está confirmada para el ${fecha} a las ${hora}. Confirma, reagenda o cancela aquí: ${WA_LINK}`,

  recordatorio: (nombre, fecha, hora) =>
    `Hola ${primerNombre(nombre)}, te recordamos tu cita en ${BARBERIA} mañana ${fecha} a las ${hora}. Confirma, reagenda o cancela aquí: ${WA_LINK}`,

  cancelacion: (nombre) =>
    `Hola ${primerNombre(nombre)}, tu cita en ${BARBERIA} ha sido cancelada. Cuando quieras agendar de nuevo: ${WA_LINK}. ¡Te esperamos!`,

  noShow: (nombre) =>
    `Hola ${primerNombre(nombre)}, notamos que no pudiste asistir a tu cita de hoy en ${BARBERIA}. Cuando quieras podemos reagendarte aquí: ${WA_LINK}`,

  walkIn: (nombre) =>
    `¡Gracias por visitarnos hoy en ${BARBERIA}, ${primerNombre(nombre)}! Fue un placer atenderte. ¡Hasta pronto!`,

  inviteV1: (nombre) =>
    `Ey ${primerNombre(nombre)}, hace tiempo que no te vemos por aquí en ${BARBERIA}. ¿Qué tal si esta semana nos das el honor? Resérvalo aquí: ${WA_LINK}`,

  inviteV2: (nombre) =>
    `Hola ${primerNombre(nombre)}, el martes está tranquilo aquí en ${BARBERIA} — perfecto para que vengas sin esperar. ¿Te apuntamos? ${WA_LINK}`,
}
