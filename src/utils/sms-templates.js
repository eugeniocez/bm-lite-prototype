export const BARBERIA = 'Barber Monster'

export const sms = {
  confirmacion: (nombre, fecha, hora) =>
    `Hola ${nombre}, tu cita en ${BARBERIA} está confirmada para el ${fecha} a las ${hora}. Confirma, reagenda o cancela aquí: barbermonster.com/c/abc123`,

  recordatorio: (nombre, fecha, hora) =>
    `Hola ${nombre}, te recordamos tu cita en ${BARBERIA} mañana ${fecha} a las ${hora}. Confirma, reagenda o cancela aquí: barbermonster.com/c/abc123`,

  cancelacion: (nombre) =>
    `Hola ${nombre}, tu cita en ${BARBERIA} ha sido cancelada. Cuando quieras agendar de nuevo: barbermonster.com/c/abc123. ¡Te esperamos!`,

  noShow: (nombre) =>
    `Hola ${nombre}, notamos que no pudiste asistir a tu cita de hoy en ${BARBERIA}. Cuando quieras podemos reagendarte aquí: barbermonster.com/c/abc123`,

  walkIn: (nombre) =>
    `¡Gracias por visitarnos hoy en ${BARBERIA}, ${nombre}! Fue un placer atenderte. ¡Hasta pronto!`,

  inviteV1: (nombre) =>
    `Ey ${nombre}, hace tiempo que no te vemos por aquí en ${BARBERIA}. ¿Qué tal si esta semana nos das el honor? Resérvalo aquí: barbermonster.com/reservar`,

  inviteV2: (nombre) =>
    `Hola ${nombre}, el martes está tranquilo aquí en ${BARBERIA} — perfecto para que vengas sin esperar. ¿Te apuntamos? barbermonster.com/reservar`,
}
