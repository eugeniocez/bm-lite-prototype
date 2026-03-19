# BM Lite — Prototipo Frontend

Interfaz simplificada de BarberMonster. Prototipo visual/funcional sin backend real.

## Stack

- React 18 + Vite
- Tailwind CSS 3
- Zustand (estado + persistencia en localStorage)
- React Router v6
- Lucide React (íconos)
- date-fns

## Requisitos

- Node.js 18+
- npm 9+

## Instalación

```bash
git clone <repo-url>
cd bm-prototype
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## Estructura

```
src/
  pages/
    QuickBook.jsx       # Captura de citas + autocomplete de clientes
    Calendario.jsx      # Vista día/3días con estados de cita y overlap
    Directorio.jsx      # Lista de clientes + perfil detallado
    Invite.jsx          # Flujo 3 pasos para campañas SMS
  components/shared/
    BottomNav.jsx       # Navegación inferior
    Modal.jsx           # Bottom sheet reutilizable
    SMSModal.jsx        # Simulación de SMS enviado
    PageHeader.jsx      # Header unificado de pantallas
  store/
    citas.js            # Estado de citas + seed data
    directorio.js       # Estado de contactos + seed data (25 contactos)
    invite.js           # Estado de campañas INVITE
  utils/
    estados.js          # Máquina de estados + colores por estado
    helpers.js          # Helpers de fecha/hora
    overlap.js          # Algoritmo de detección de traslapes en calendario
    sms-templates.js    # Plantillas de SMS
```

## Módulos implementados

| Módulo | Estado |
|--------|--------|
| M1 · Quick Book | ✅ Completo |
| M2 · Estados de cita (6 estados) | ✅ Completo |
| M3 · Recordatorios (simulado) | ✅ Simulado con SMSModal |
| M4 · Directorio | ✅ Completo |
| M5 · INVITE | ✅ Completo |
| M6 · Walk-in | ✅ Completo |
| M7 · No-show | ✅ Completo |

## Estados de cita

| Estado | Color |
|--------|-------|
| Apartada | Blanco / sin borde |
| SinConfirmar | Amarillo |
| Confirmada | Verde oscuro |
| Cancelada | Rojo translúcido |
| NoShow | Negro con patrón |
| WalkIn | Verde claro |

## Dark mode

Automático — sigue la preferencia del sistema operativo (`prefers-color-scheme`).

## Datos de prueba

El prototipo incluye seed data con:
- 25 contactos ficticios
- ~40 citas distribuidas en 7 días (hoy, ayer, mañana, etc.)
- Todos los estados de cita representados
- 6 citas simultáneas a las 3pm para demostrar scroll horizontal

Para resetear los datos al seed original:
```javascript
// En la consola del navegador:
localStorage.clear()
// Luego recargar la página
```

## Notas para desarrollo

- Los SMS no se envían realmente — se simulan con un modal
- El voicebot se representa como un evento en el timeline
- La autenticación no está implementada (fuera del scope del prototipo)
- `localStorage` como persistencia — suficiente para demos, reemplazar con API en producción
