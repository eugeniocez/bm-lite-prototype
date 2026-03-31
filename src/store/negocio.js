import { create } from 'zustand'
import { todayStr } from '../utils/helpers'

export const useNegocioStore = create((set) => ({
  nombreBarberia: 'Barber Monster',
  plan: 'trial',           // 'trial' | 'activo'
  fechaRegistro: todayStr(), // simula registro hoy por default

  setNombreBarberia: (nombre) => set({ nombreBarberia: nombre }),
  setFechaRegistro: (fecha) => set({ fechaRegistro: fecha }),
  activarSuscripcion: () => set({ plan: 'activo' }),
}))