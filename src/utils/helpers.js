export function generateId() {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
}

export function todayStr() {
  return new Date().toISOString().split('T')[0]
}

export function formatDate(dateStr) {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-')
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`
}

export function formatDateLong(dateStr) {
  if (!dateStr) return ''
  const [, month, day] = dateStr.split('-')
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  const days = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado']
  const d = new Date(`${dateStr}T12:00:00`)
  return `${days[d.getDay()]} ${parseInt(day)} de ${months[parseInt(month) - 1]}`
}

export function daysSince(dateStr) {
  if (!dateStr) return Infinity
  const diff = new Date() - new Date(`${dateStr}T12:00:00`)
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export function addDays(dateStr, n) {
  const d = new Date(`${dateStr}T12:00:00`)
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]
}

