import { create } from 'zustand'
import { todayStr } from '../utils/helpers'

export const useCalendarioStore = create((set) => ({
  fechaActual: todayStr(),
  vista: 'dia',
  setFechaActual: (fecha) => set({ fechaActual: fecha }),
  setVista: (vista) => set({ vista }),
  resetToHoy: () => set({ fechaActual: todayStr() }),
}))