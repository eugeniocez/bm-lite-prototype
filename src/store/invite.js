import { create } from 'zustand'
import { generateId, todayStr } from '../utils/helpers'

export const useInviteStore = create(
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
  })
)
