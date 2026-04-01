import { create } from 'zustand'
import { todayStr } from '../utils/helpers'

export const useNegocioStore = create((set) => ({
  nombreBarberia: 'Barbería El Tigre',
  whatsapp: '+52 81 3547 0864',
  email: '',
  direccion: '',
  plan: 'trial',
  fechaRegistro: todayStr(),

  setNombreBarberia: (nombre) => set({ nombreBarberia: nombre }),
  setWhatsapp: (whatsapp) => set({ whatsapp }),
  setEmail: (email) => set({ email }),
  setDireccion: (direccion) => set({ direccion }),
  setFechaRegistro: (fecha) => set({ fechaRegistro: fecha }),
  activarSuscripcion: () => set({ plan: 'activo' }),
  cancelarSuscripcion: () => set({ plan: 'trial' }),
}))