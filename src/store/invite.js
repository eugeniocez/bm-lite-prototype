import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateId, todayStr } from '../utils/helpers'

export const useInviteStore = create(
  persist(
    (set) => ({
      campanas: [],

      enviarCampana: (campana) => set(state => ({
        campanas: [...state.campanas, {
          id: generateId(),
          fecha: todayStr(),
          estado: 'Enviada',
          ...campana,
        }]
      })),
    }),
    { name: 'bm-invite' }
  )
)
