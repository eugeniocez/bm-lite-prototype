export const BARBERIA = 'Barber Monster'
export const WA_LINK = 'wa.me/528110001234'

const primerNombre = (nombre) => nombre.split(' ')[0]

export const proximoDiaTransquilo = () => {
  const hoy = new Date().getDay() // 0=Dom, 1=Lun...
  // Días tranquilos preferidos: martes y miércoles
  const diasTransquilos = [2, 3] // martes, miércoles
  const diasNombres = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
  for (let i = 1; i <= 7; i++) {
    const dia = (hoy + i) % 7
    if (diasTransquilos.includes(dia)) return diasNombres[dia]
  }
  return 'esta semana'
}

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

  // ── INVITE ──────────────────────────────────────────────────────

  inviteV1: (nombre) =>
    `Ey ${primerNombre(nombre)}, hace tiempo que no te vemos por aquí en ${BARBERIA}. ¿Qué tal si esta semana nos das el honor? Resérvalo aquí: ${WA_LINK}`,

  inviteV2: (nombre) =>
    `Hola ${primerNombre(nombre)}, el ${proximoDiaTransquilo()} está tranquilo aquí en ${BARBERIA} — perfecto para que vengas sin esperar. ¿Te apuntamos? ${WA_LINK}`,

  inviteV3: (nombre) =>
    `${primerNombre(nombre)}, tu look te está llamando 😅 Pasa por ${BARBERIA} esta semana y salimos del apuro. Agenda aquí: ${WA_LINK}`,

  inviteV4: (nombre) =>
    `Ey ${primerNombre(nombre)} — llevamos un rato sin verte por ${BARBERIA}. Tenemos tu lugar listo. ¿Cuándo vienes? ${WA_LINK}`,

  inviteV5: (nombre) =>
    `Hola ${primerNombre(nombre)}, en ${BARBERIA} extrañamos tu visita. Esta semana hay disponibilidad — aprovéchala antes de que se llene: ${WA_LINK}`,

  inviteV6: (nombre) =>
    `${primerNombre(nombre)}, dicen que un buen corte cambia el humor 💈 Ven a ${BARBERIA} esta semana y compruébalo. Te esperamos: ${WA_LINK}`,
}