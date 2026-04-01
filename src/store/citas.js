import { create } from 'zustand'
import { generateId, todayStr, addDays } from '../utils/helpers'

const hoy = todayStr()
const ayer = addDays(hoy, -1)
const manana = addDays(hoy, 1)
const pasado = addDays(hoy, 2)

const SEED = [
  // HOY — un ejemplo de cada estado
  { id: 'a1', nombreCliente: 'Carlos Herrera',   celular: '528112345678', fecha: hoy,    hora: '09:00', nota: null,               estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a2', nombreCliente: 'Miguel Torres',    celular: '528198765432', fecha: hoy,    hora: '10:00', nota: 'Fade corto',       estado: 'SinConfirmar', origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a3', nombreCliente: 'Rodrigo Sánchez',  celular: '528123456789', fecha: hoy,    hora: '11:00', nota: null,               estado: 'Apartada',     origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a4', nombreCliente: 'Patricio Saldaña', celular: '521234567890', fecha: hoy,    hora: '12:00', nota: null,               estado: 'WalkIn',       origen: 'WalkIn',    creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a5', nombreCliente: 'Fernando Ríos',    celular: '528187654321', fecha: hoy,    hora: '13:00', nota: null,               estado: 'Cancelada',    origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a6', nombreCliente: 'Luis Mendoza',     celular: '528110001111', fecha: hoy,    hora: '08:00', nota: null,               estado: 'NoShow',       origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  // HOY — traslape a las 15:00 para demo de scroll
  { id: 'a7', nombreCliente: 'Eugenio Castillo', celular: '528118806346', fecha: hoy,    hora: '15:00', nota: null,               estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a8', nombreCliente: 'Alejandro Vega',   celular: '528145678901', fecha: hoy,    hora: '15:00', nota: 'Viene con hermano',estado: 'Apartada',     origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a9', nombreCliente: 'Omar Garza',       celular: '528110002222', fecha: hoy,    hora: '15:00', nota: null,               estado: 'SinConfirmar', origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  // AYER
  { id: 'b1', nombreCliente: 'Carlos Herrera',   celular: '528112345678', fecha: ayer,   hora: '10:00', nota: null,               estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'b2', nombreCliente: 'Miguel Torres',    celular: '528198765432', fecha: ayer,   hora: '12:00', nota: null,               estado: 'NoShow',       origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  // MAÑANA
  { id: 'c1', nombreCliente: 'Rodrigo Sánchez',  celular: '528123456789', fecha: manana, hora: '09:30', nota: null,               estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'c2', nombreCliente: 'Fernando Ríos',    celular: '528187654321', fecha: manana, hora: '11:00', nota: 'Degradado',        estado: 'SinConfirmar', origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'c3', nombreCliente: 'Luis Mendoza',     celular: '528110001111', fecha: manana, hora: '13:00', nota: null,               estado: 'Apartada',     origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  // PASADO MAÑANA
  { id: 'd1', nombreCliente: 'Carlos Herrera',   celular: '528112345678', fecha: pasado, hora: '10:00', nota: null,               estado: 'Apartada',     origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'd2', nombreCliente: 'Eugenio Castillo', celular: '528118806346', fecha: pasado, hora: '12:00', nota: null,               estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
]

export const useCitasStore = create(
  (set, get) => ({
    citas: SEED,

    agregarCita: (cita) => set(state => ({
      citas: [...state.citas, {
        id: generateId(),
        creadaEn: new Date().toISOString(),
        modificadaEn: new Date().toISOString(),
        ...cita,
      }]
    })),

    cambiarEstado: (id, nuevoEstado) => set(state => ({
      citas: state.citas.map(c =>
        c.id === id
          ? { ...c, estado: nuevoEstado, modificadaEn: new Date().toISOString() }
          : c
      )
    })),

    reagendarCita: (id, nuevaFecha, nuevaHora) => set(state => ({
      citas: state.citas.map(c =>
        c.id === id
          ? { ...c, fecha: nuevaFecha, hora: nuevaHora, modificadaEn: new Date().toISOString() }
          : c
      )
    })),

    getCitasPorFecha: (fecha) =>
      get().citas
        .filter(c => c.fecha === fecha)
        .sort((a, b) => a.hora.localeCompare(b.hora)),

    getCitasPorCliente: (celular) =>
      get().citas
        .filter(c => c.celular === celular)
        .sort((a, b) => b.fecha.localeCompare(a.fecha)),
  })
)
