import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateId, todayStr } from '../utils/helpers'

const SEED = [
  { id: 'c1', nombre: 'Carlos Herrera', celular: '8112345678', nota: 'Le gusta el fade largo', origenContacto: 'QuickBook', ultimaVisita: '2026-03-18', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c2', nombre: 'Miguel Torres', celular: '8198765432', nota: null, origenContacto: 'QuickBook', ultimaVisita: '2026-01-15', totalNoShows: 1, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c3', nombre: 'Rodrigo Sánchez', celular: '8123456789', nota: 'Viene siempre con su hijo', origenContacto: 'QuickBook', ultimaVisita: '2026-03-18', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c4', nombre: 'Fernando Ríos', celular: '8187654321', nota: null, origenContacto: 'QuickBook', ultimaVisita: '2025-12-20', totalNoShows: 2, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c5', nombre: 'Alejandro Vega', celular: '8145678901', nota: null, origenContacto: 'QuickBook', ultimaVisita: '2025-11-30', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c6', nombre: 'Eugenio Castillo', celular: '8118806346', nota: null, origenContacto: 'QuickBook', ultimaVisita: '2026-03-15', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c7', nombre: 'Patricio Saldaña', celular: '1234567890', nota: null, origenContacto: 'QuickBook', ultimaVisita: '2026-03-18', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c8', nombre: 'Luis Mendoza', celular: '8110001111', nota: null, origenContacto: 'QuickBook', ultimaVisita: '2026-03-15', totalNoShows: 1, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c9', nombre: 'Omar Garza', celular: '8110002222', nota: 'Prefiere corte clásico', origenContacto: 'QuickBook', ultimaVisita: '2026-03-16', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c10', nombre: 'Iván Reyes', celular: '8110003333', nota: 'Barba y corte', origenContacto: 'QuickBook', ultimaVisita: '2026-03-08', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c11', nombre: 'Diego Luna', celular: '8110004444', nota: null, origenContacto: 'QuickBook', ultimaVisita: '2026-03-12', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c12', nombre: 'Ramón Ibarra', celular: '8110005555', nota: null, origenContacto: 'QuickBook', ultimaVisita: '2026-03-05', totalNoShows: 1, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c13', nombre: 'Héctor Mora', celular: '8110006666', nota: 'Skin fade', origenContacto: 'QuickBook', ultimaVisita: '2026-03-02', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c14', nombre: 'Andrés Gil', celular: '8110007777', nota: null, origenContacto: 'QuickBook', ultimaVisita: '2025-12-10', totalNoShows: 2, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c15', nombre: 'Tomás Reyna', celular: '8110008888', nota: null, origenContacto: 'QuickBook', ultimaVisita: '2026-03-14', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c16', nombre: 'Javier Cruz', celular: '8110009999', nota: 'Cliente frecuente', origenContacto: 'WalkIn', ultimaVisita: '2026-03-17', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c17', nombre: 'Samuel Vela', celular: '8110000000', nota: null, origenContacto: 'QuickBook', ultimaVisita: '2026-03-06', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c18', nombre: 'Marco Flores', celular: '8119001122', nota: null, origenContacto: 'QuickBook', ultimaVisita: '2026-03-09', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c19', nombre: 'Ricardo Peña', celular: '8119003344', nota: 'Fade medio', origenContacto: 'QuickBook', ultimaVisita: '2026-03-11', totalNoShows: 1, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c20', nombre: 'Gabriel Ortiz', celular: '8119005566', nota: null, origenContacto: 'QuickBook', ultimaVisita: '2026-03-04', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c21', nombre: 'Eduardo Leal', celular: '8119007788', nota: null, origenContacto: 'QuickBook', ultimaVisita: '2026-03-07', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c22', nombre: 'Mauricio Salas', celular: '8119009900', nota: 'Corte y cejas', origenContacto: 'QuickBook', ultimaVisita: '2026-03-16', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c23', nombre: 'Pablo Treviño', celular: '8119001234', nota: null, origenContacto: 'QuickBook', ultimaVisita: '2026-03-13', totalNoShows: 3, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c24', nombre: 'Sergio Campos', celular: '8119005678', nota: null, origenContacto: 'WalkIn', ultimaVisita: '2026-03-10', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
  { id: 'c25', nombre: 'Arturo Medina', celular: '8119009012', nota: 'Le gustan las líneas', origenContacto: 'QuickBook', ultimaVisita: '2026-03-03', totalNoShows: 0, enInviteList: false, creadoEn: new Date().toISOString() },
]

export const useDirectorioStore = create(
  persist(
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

      actualizarUltimaVisita: (celular) => set(state => ({
        contactos: state.contactos.map(c =>
          c.celular === celular ? { ...c, ultimaVisita: todayStr() } : c
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

      actualizarNota: (id, nota) => set(state => ({
        contactos: state.contactos.map(c =>
          c.id === id ? { ...c, nota } : c
        )
      })),
    }),
    { name: 'bm-directorio' }
  )
)
