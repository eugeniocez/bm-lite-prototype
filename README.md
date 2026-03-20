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
git clone https://github.com/eugeniocez/bm-lite-prototype.git
cd bm-lite-prototype
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/registro` | Flujo de registro (nombre + teléfono → código SMS) |
| `/login` | Flujo de login (teléfono → código SMS) |
| `/bienvenida` | Post-registro — solo se muestra una vez |
| `/quickbook` | Nueva cita |
| `/calendario` | Vista día / 3 días / semana (semana solo en desktop) |
| `/clientes` | Directorio de clientes |
| `/invite` | Campaña SMS (flujo 3 pasos) |

> Demo: el código SMS siempre es `1234`

## Estructura
```
src/
  pages/
    Registro.jsx        # Flujo de registro con verificación SMS (2 pasos)
    Login.jsx           # Flujo de login con verificación SMS (2 pasos)
    Bienvenida.jsx      # Pantalla post-registro, solo primera vez
    QuickBook.jsx       # Captura de citas + autocomplete + alerta de conflicto de horario
    Calendario.jsx      # Vista día/3días/semana con estados, overlap y filtros de acción por tiempo
    Clientes.jsx        # Lista de clientes + panel lateral en desktop
    Invite.jsx          # Flujo 3 pasos para campañas SMS
  components/shared/
    BottomNav.jsx       # Navegación inferior (solo móvil)
    Sidebar.jsx         # Navegación lateral (tablet y desktop)
    Modal.jsx           # Modal reutilizable con esquinas redondeadas
    SMSModal.jsx        # Simulación de SMS enviado
    Toast.jsx           # Notificación temporal de éxito
    PageHeader.jsx      # Header unificado de pantallas
  store/
    citas.js            # Estado de citas + seed data
    directorio.js       # Estado de contactos + seed data (25 contactos)
    invite.js           # Estado de campañas INVITE
    negocio.js          # Nombre de barbería (persiste desde registro)
  utils/
    estados.js          # Máquina de estados + colores por estado
    helpers.js          # Helpers de fecha/hora
    overlap.js          # Algoritmo de detección de traslapes en calendario
    sms-templates.js    # Plantillas de SMS con nombre de barbería dinámico
```

## Layout responsive

| Breakpoint | Nav | Calendario | Clientes |
|------------|-----|------------|----------|
| Móvil `<768px` | Bottom bar | Día / 3 días | Pantalla completa |
| Tablet `768px+` | Sidebar iconos (64px) | Día / 3 días | Lista + panel lateral |
| Desktop `1024px+` | Sidebar completo (224px) | Día / 3 días / Semana | Lista + panel lateral |

## Módulos implementados

| Módulo | Estado |
|--------|--------|
| Registro + Login | ✅ Completo (simulado) |
| Bienvenida post-registro | ✅ Completo |
| M1 · Quick Book | ✅ Completo + alerta de conflicto de horario |
| M2 · Estados de cita (6 estados) | ✅ Completo |
| M3 · Recordatorios (simulado) | ✅ Simulado con SMSModal |
| M4 · Clientes | ✅ Completo |
| M5 · INVITE | ✅ Completo + 6 plantillas con día dinámico |
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

## Lógica de acciones por tiempo

Las acciones disponibles en el modal de cita cambian según si el horario ya pasó:

- **Cita futura** — Confirmar, Marcar sin confirmar, Cancelar
- **Cita pasada (+30 min)** — Confirmar, Marcar no-show

## Dark mode

Automático — sigue la preferencia del sistema operativo (`prefers-color-scheme`).

## Datos de prueba

El prototipo incluye seed data con:
- 25 contactos ficticios
- ~40 citas distribuidas en 7 días (hoy, ayer, mañana, etc.)
- Todos los estados de cita representados
- 6 citas simultáneas a las 3pm para demostrar scroll horizontal en móvil

Para resetear los datos al seed original:
```javascript
// En la consola del navegador:
localStorage.clear()
// Luego recargar la página
```

## Notas para desarrollo

- Los SMS no se envían realmente — se simulan con SMSModal (solo visible en dev)
- El código SMS de verificación en demo siempre es `1234`
- La autenticación es visual — sin backend real ni tokens
- El nombre de barbería se guarda en `bm-negocio` (localStorage) al completar registro
- La gestión de usuarios está comentada en `Calendario.jsx` — lista para activar
- `localStorage` como persistencia — reemplazar con API en producción
- El evento de conversión en `Bienvenida.jsx` es un `console.log` — reemplazar con SDK de analytics en producción