import { create } from 'zustand'

export const useNegocioStore = create(
  (set) => ({
    nombreBarberia: 'Barber Monster',
    setNombreBarberia: (nombre) => set({ nombreBarberia: nombre }),
  })
)
