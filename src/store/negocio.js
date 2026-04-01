import { create } from 'zustand'
import { todayStr } from '../utils/helpers'

export const useNegocioStore = create((set) => ({
  nombreBarberia: 'Barbería El Tigre',
  email: '',
  direccion: '',
  plan: 'trial',
  fechaRegistro: todayStr(),

  setNombreBarberia: (nombre) => set({ nombreBarberia: nombre }),
  setEmail: (email) => set({ email }),
  setDireccion: (direccion) => set({ direccion }),
  setFechaRegistro: (fecha) => set({ fechaRegistro: fecha }),
  activarSuscripcion: () => set({ plan: 'activo' }),
  cancelarSuscripcion: () => set({ plan: 'trial' }),
}))