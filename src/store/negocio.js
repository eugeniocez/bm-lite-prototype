import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useNegocioStore = create(
  persist(
    (set) => ({
      nombreBarberia: 'Barber Monster',
      setNombreBarberia: (nombre) => set({ nombreBarberia: nombre }),
    }),
    { name: 'bm-negocio' }
  )
)