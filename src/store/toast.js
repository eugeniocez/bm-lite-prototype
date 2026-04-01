import { create } from 'zustand'

export const useToastStore = create((set) => ({
  visible: false,
  mensaje: '',
  mostrar: (mensaje) => set({ visible: true, mensaje }),
  ocultar: () => set({ visible: false, mensaje: '' }),
}))