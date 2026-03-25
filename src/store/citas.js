import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateId, todayStr, addDays } from '../utils/helpers'

const hoy = todayStr()
const ayer = addDays(hoy, -1)
const manana = addDays(hoy, 1)
const pasado = addDays(hoy, 2)
const tres = addDays(hoy, 3)
const cuatro = addDays(hoy, 4)
const semPasada = addDays(hoy, -5)
const dosSemPasada = addDays(hoy, -12)

const SEED = [
  // ── HOY — demo de todos los estados y traslapes ──
  { id: 'a0a', nombreCliente: 'Luis Mendoza',     celular: '528110001111', fecha: hoy, hora: '09:00', nota: null,                   estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a0b', nombreCliente: 'Omar Garza',       celular: '528110002222', fecha: hoy, hora: '09:00', nota: null,                   estado: 'Apartada',     origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a0c', nombreCliente: 'Iván Reyes',       celular: '528110003333', fecha: hoy, hora: '11:00', nota: 'Barba',                estado: 'SinConfirmar', origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a0d', nombreCliente: 'Diego Luna',       celular: '528110004444', fecha: hoy, hora: '13:00', nota: null,                   estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a1',  nombreCliente: 'Carlos Herrera',   celular: '528112345678', fecha: hoy, hora: '09:00', nota: null,                   estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a2',  nombreCliente: 'Miguel Torres',    celular: '528198765432', fecha: hoy, hora: '10:00', nota: 'Fade corto',           estado: 'SinConfirmar', origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a3',  nombreCliente: 'Rodrigo Sánchez',  celular: '528123456789', fecha: hoy, hora: '11:00', nota: null,                   estado: 'Apartada',     origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  // 15:00 — demo de scroll con 6 citas simultáneas
  { id: 'a3a', nombreCliente: 'Ramón Ibarra',     celular: '528110005555', fecha: hoy, hora: '15:00', nota: null,                   estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a3b', nombreCliente: 'Héctor Mora',      celular: '528110006666', fecha: hoy, hora: '15:00', nota: null,                   estado: 'Apartada',     origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a3c', nombreCliente: 'Andrés Gil',       celular: '528110007777', fecha: hoy, hora: '15:00', nota: null,                   estado: 'SinConfirmar', origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a3d', nombreCliente: 'Tomás Reyna',      celular: '528110008888', fecha: hoy, hora: '15:00', nota: null,                   estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a3e', nombreCliente: 'Javier Cruz',      celular: '528110009999', fecha: hoy, hora: '15:00', nota: null,                   estado: 'WalkIn',       origen: 'WalkIn',    creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a3f', nombreCliente: 'Samuel Vela',      celular: '528110000000', fecha: hoy, hora: '15:00', nota: null,                   estado: 'Cancelada',    origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a4',  nombreCliente: 'Patricio Saldaña', celular: '521234567890', fecha: hoy, hora: '11:30', nota: null,                   estado: 'WalkIn',       origen: 'WalkIn',    creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a5',  nombreCliente: 'Fernando Ríos',    celular: '528187654321', fecha: hoy, hora: '13:00', nota: null,                   estado: 'Cancelada',    origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a6',  nombreCliente: 'Eugenio Castillo', celular: '528118806346', fecha: hoy, hora: '14:00', nota: null,                   estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a7',  nombreCliente: 'Alejandro Vega',   celular: '528145678901', fecha: hoy, hora: '16:00', nota: 'Viene con su hermano', estado: 'Apartada',     origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'a8',  nombreCliente: 'Luis Mendoza',     celular: '528110001111', fecha: hoy, hora: '08:00', nota: null,                   estado: 'NoShow',       origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },

  // ── AYER — solo Confirmada, WalkIn, NoShow, Cancelada ──
  { id: 'b1', nombreCliente: 'Carlos Herrera',    celular: '528112345678', fecha: ayer, hora: '10:00', nota: null,                   estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'b2', nombreCliente: 'Miguel Torres',     celular: '528198765432', fecha: ayer, hora: '11:30', nota: null,                   estado: 'NoShow',       origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'b3', nombreCliente: 'Rodrigo Sánchez',   celular: '528123456789', fecha: ayer, hora: '13:00', nota: null,                   estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'b4', nombreCliente: 'Fernando Ríos',     celular: '528187654321', fecha: ayer, hora: '15:00', nota: null,                   estado: 'NoShow',       origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'b5', nombreCliente: 'Patricio Saldaña',  celular: '521234567890', fecha: ayer, hora: '17:00', nota: null,                   estado: 'WalkIn',       origen: 'WalkIn',    creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },

  // ── MAÑANA — solo Apartada, SinConfirmar, Confirmada ──
  { id: 'c1', nombreCliente: 'Alejandro Vega',    celular: '528145678901', fecha: manana, hora: '09:30', nota: null,                 estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'c2', nombreCliente: 'Eugenio Castillo',  celular: '528118806346', fecha: manana, hora: '10:00', nota: null,                 estado: 'Apartada',     origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'c3', nombreCliente: 'Carlos Herrera',    celular: '528112345678', fecha: manana, hora: '11:00', nota: 'Quiere degradado',   estado: 'SinConfirmar', origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'c4', nombreCliente: 'Rodrigo Sánchez',   celular: '528123456789', fecha: manana, hora: '13:00', nota: null,                 estado: 'Apartada',     origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'c5', nombreCliente: 'Miguel Torres',     celular: '528198765432', fecha: manana, hora: '15:30', nota: null,                 estado: 'Apartada',     origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },

  // ── PASADO MAÑANA ──
  { id: 'd1', nombreCliente: 'Fernando Ríos',     celular: '528187654321', fecha: pasado, hora: '10:00', nota: null,                 estado: 'Apartada',     origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'd2', nombreCliente: 'Patricio Saldaña',  celular: '521234567890', fecha: pasado, hora: '11:00', nota: null,                 estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'd3', nombreCliente: 'Carlos Herrera',    celular: '528112345678', fecha: pasado, hora: '12:00', nota: null,                 estado: 'SinConfirmar', origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'd4', nombreCliente: 'Alejandro Vega',    celular: '528145678901', fecha: pasado, hora: '14:00', nota: null,                 estado: 'Apartada',     origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },

  // ── +3 DÍAS ──
  { id: 'e1', nombreCliente: 'Eugenio Castillo',  celular: '528118806346', fecha: tres,   hora: '09:00', nota: null,                 estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'e2', nombreCliente: 'Rodrigo Sánchez',   celular: '528123456789', fecha: tres,   hora: '10:30', nota: null,                 estado: 'Apartada',     origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'e3', nombreCliente: 'Miguel Torres',     celular: '528198765432', fecha: tres,   hora: '12:00', nota: 'Barba también',      estado: 'Apartada',     origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },

  // ── +4 DÍAS ──
  { id: 'f1', nombreCliente: 'Carlos Herrera',    celular: '528112345678', fecha: cuatro, hora: '10:00', nota: null,                 estado: 'Apartada',     origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'f2', nombreCliente: 'Fernando Ríos',     celular: '528187654321', fecha: cuatro, hora: '11:30', nota: null,                 estado: 'SinConfirmar', origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'f3', nombreCliente: 'Patricio Saldaña',  celular: '521234567890', fecha: cuatro, hora: '13:00', nota: null,                 estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },

  // ── SEMANA PASADA — solo terminales ──
  { id: 'g1', nombreCliente: 'Alejandro Vega',    celular: '528145678901', fecha: semPasada,    hora: '10:00', nota: null,           estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'g2', nombreCliente: 'Miguel Torres',     celular: '528198765432', fecha: semPasada,    hora: '12:00', nota: null,           estado: 'NoShow',       origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'g3', nombreCliente: 'Carlos Herrera',    celular: '528112345678', fecha: semPasada,    hora: '14:00', nota: null,           estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },

  // ── DOS SEMANAS ATRÁS — solo terminales ──
  { id: 'h1', nombreCliente: 'Alejandro Vega',    celular: '528145678901', fecha: dosSemPasada, hora: '11:00', nota: null,           estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'h2', nombreCliente: 'Rodrigo Sánchez',   celular: '528123456789', fecha: dosSemPasada, hora: '09:00', nota: null,           estado: 'Cancelada',    origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'h3', nombreCliente: 'Luis Mendoza',      celular: '528110001111', fecha: dosSemPasada, hora: '13:00', nota: null,           estado: 'Confirmada',   origen: 'QuickBook', creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
  { id: 'h4', nombreCliente: 'Eugenio Castillo',  celular: '528118806346', fecha: dosSemPasada, hora: '15:00', nota: null,           estado: 'WalkIn',       origen: 'WalkIn',    creadaEn: new Date().toISOString(), modificadaEn: new Date().toISOString() },
]

export const useCitasStore = create(
  persist(
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

      getCitasPorRango: (fechas) =>
        get().citas
          .filter(c => fechas.includes(c.fecha))
          .sort((a, b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora)),

      getCitasPorCliente: (celular) =>
        get().citas
          .filter(c => c.celular === celular)
          .sort((a, b) => b.fecha.localeCompare(a.fecha)),
    }),
    { name: 'bm-citas' }
  )
)
