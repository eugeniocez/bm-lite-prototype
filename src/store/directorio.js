import { create } from 'zustand'
import { generateId, todayStr } from '../utils/helpers'

const SEED = [
  { id: 'c1',  nombre: 'Carlos Herrera',   celular: '528112345678', nota: 'Le gusta el fade largo',    origenContacto: 'QuickBook', ultimaVisita: '2026-03-18', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c2',  nombre: 'Miguel Torres',    celular: '528198765432', nota: null,                         origenContacto: 'QuickBook', ultimaVisita: '2026-01-15', totalNoShows: 1, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c3',  nombre: 'Rodrigo Sánchez',  celular: '528123456789', nota: 'Viene con su hijo',          origenContacto: 'QuickBook', ultimaVisita: '2026-03-18', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c4',  nombre: 'Fernando Ríos',    celular: '528187654321', nota: null,                         origenContacto: 'QuickBook', ultimaVisita: '2025-12-20', totalNoShows: 2, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c5',  nombre: 'Alejandro Vega',   celular: '528145678901', nota: null,                         origenContacto: 'QuickBook', ultimaVisita: '2025-11-30', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c6',  nombre: 'Eugenio Castillo', celular: '528118806346', nota: null,                         origenContacto: 'QuickBook', ultimaVisita: '2026-03-15', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c7',  nombre: 'Patricio Saldaña', celular: '521234567890', nota: null,                         origenContacto: 'QuickBook', ultimaVisita: '2026-03-18', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c8',  nombre: 'Luis Mendoza',     celular: '528110001111', nota: null,                         origenContacto: 'QuickBook', ultimaVisita: '2026-03-15', totalNoShows: 1, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c9',  nombre: 'Omar Garza',       celular: '528110002222', nota: 'Prefiere corte clásico',     origenContacto: 'QuickBook', ultimaVisita: '2026-03-16', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c10', nombre: 'Pablo Treviño',    celular: '528119001234', nota: null,                         origenContacto: 'QuickBook', ultimaVisita: '2026-03-13', totalNoShows: 3, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c11', nombre: 'Ricardo Peña',     celular: '528119003344', nota: 'Fade medio',                 origenContacto: 'QuickBook', ultimaVisita: '2026-03-11', totalNoShows: 1, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c12', nombre: 'Gabriel Ortiz',    celular: '528119005566', nota: null,                         origenContacto: 'QuickBook', ultimaVisita: '2026-03-04', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c13', nombre: 'Mauricio Salas',   celular: '528119009900', nota: 'Corte y cejas',              origenContacto: 'QuickBook', ultimaVisita: '2026-03-16', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c14', nombre: 'Sergio Campos',    celular: '528119005678', nota: null,                         origenContacto: 'WalkIn',    ultimaVisita: '2026-03-10', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c15', nombre: 'Arturo Medina',    celular: '528119009012', nota: 'Le gustan las líneas',       origenContacto: 'QuickBook', ultimaVisita: '2026-03-03', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
]

export const useDirectorioStore = create(
  (set, get) => ({
    contactos: SEED,

    buscarPorCelular: (celular) =>
      get().contactos.find(c => c.celular === celular) || null,

    agregarOActualizar: (datos) => {
      const existe = get().buscarPorCelular(datos.celular)
      if (existe) {
        set(state => ({
          contactos: state.contactos.map(c =>
            c.celular === datos.celular ? { ...c, ...datos } : c
          )
        }))
      } else {
        set(state => ({
          contactos: [...state.contactos, {
            id: generateId(),
            totalNoShows: 0,
            enInviteList: false,
            origenContacto: 'QuickBook',
            creadoEn: new Date().toISOString(),
            ...datos,
          }]
        }))
      }
    },

    actualizarUltimaVisita: (celular, fecha) => set(state => ({
      contactos: state.contactos.map(c =>
        c.celular === celular ? { ...c, ultimaVisita: fecha || todayStr() } : c
      )
    })),

    incrementarNoShows: (celular) => set(state => ({
      contactos: state.contactos.map(c =>
        c.celular === celular ? { ...c, totalNoShows: (c.totalNoShows || 0) + 1 } : c
      )
    })),

    toggleInviteList: (id) => set(state => ({
      contactos: state.contactos.map(c =>
        c.id === id ? { ...c, enInviteList: !c.enInviteList } : c
      )
    })),

    actualizarContacto: (id, payload) => set(state => ({
      contactos: state.contactos.map(c =>
        c.id === id ? { ...c, ...payload } : c
      )
    })),
  })
)
