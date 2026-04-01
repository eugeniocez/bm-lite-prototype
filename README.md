# BM Lite — Prototipo Frontend

Interfaz simplificada de BarberMonster. Prototipo visual/funcional sin backend real.

## Stack

- React 18 + Vite
- Tailwind CSS 3
- Zustand (estado en memoria — sin persistencia)
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
| `/inicio` | Post-registro — solo se muestra una vez |
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
    Inicio.jsx          # Pantalla post-registro, solo primera vez
    QuickBook.jsx       # Captura de citas + autocomplete por nombre y celular + alerta de conflicto de horario
    Calendario.jsx      # Vista día/3días/semana con estados, overlap y filtros de acción por tiempo
    Clientes.jsx        # Lista de clientes + panel lateral en desktop + agregar cliente manual
    Invite.jsx          # Flujo 3 pasos para campañas SMS
  components/shared/
    BottomNav.jsx       # Navegación inferior (solo móvil)
    Sidebar.jsx         # Navegación lateral (tablet y desktop)
    Modal.jsx           # Modal reutilizable con esquinas redondeadas
    Toast.jsx           # Notificación temporal de éxito al crear cita
    PageHeader.jsx      # Header unificado de pantallas
  store/
    citas.js            # Estado de citas + seed data + reagendarCita()
    directorio.js       # Estado de contactos + seed data (15 contactos)
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
| Inicio post-registro | ✅ Completo |
| M1 · Quick Book | ✅ Completo + autocomplete + alerta de conflicto de horario + toast |
| M2 · Estados de cita (6 estados) | ✅ Completo |
| M3 · Recordatorios | ✅ Arquitectura lista — SMS reales pendientes de backend |
| M4 · Clientes | ✅ Completo + agregar cliente manual |
| M5 · INVITE | ✅ Completo + 6 plantillas con día dinámico |
| M6 · Walk-in | ✅ Completo |
| M7 · No-show | ✅ Completo |
| Reagendar cita | ✅ Completo — solo disponible en citas futuras |

## Estados de cita

| Estado | Color UI | Descripción |
|--------|----------|-------------|
| Apartada | Blanco `#FFFFFF`, borde gris `#E5E7EB` | Estado inicial al crear la cita |
| SinConfirmar | Amarillo `#FACC15` | Sistema agotó intentos de confirmación sin respuesta |
| Confirmada | Verde oscuro `#166534` (texto blanco) | Cliente confirmó asistencia |
| Cancelada | Rojo translúcido `#FEF2F2`, borde punteado `#F87171` | Cita cancelada |
| NoShow | Gris oscuro `#111827` con texto rojo `#F87171` | Cliente no se presentó |
| WalkIn | Verde claro `#DCFCE7` (texto `#14532D`) | Cliente sin Cita registrado en el momento |

## Lógica de acciones por tiempo

Las acciones disponibles en el modal de cita cambian según si el horario ya pasó:

- **Cita futura** — Confirmar, Marcar sin confirmar, Cancelar cita. Botón Reagendar visible al fondo.
- **Cita pasada (+30 min)** — Confirmar, Marcar no-show. Sin cancelar ni reagendar.

> `SinConfirmar` es un estado al que llega el sistema automáticamente cuando se agotan los intentos de confirmación (SMS 24h + voicebot 2h sin respuesta). El barbero puede marcarlo manualmente solo como excepción operativa.

---

## Tipografía — Plus Jakarta Sans

La fuente se carga desde Google Fonts. Para garantizar que se muestre correctamente en **todos los dispositivos y navegadores**, incluyendo Safari en iOS, se requieren tres pasos:

### 1. `index.html` — tags en el `<head>` antes del CSS

```html
<!-- Preconnect para reducir latencia -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload para evitar FOUT (flash of unstyled text) -->
<link rel="preload"
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
  as="style">

<!-- Carga real de la fuente -->
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
```

### 2. `src/index.css` — @import como primera línea

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. `tailwind.config.js` — extender la familia de fuentes

```js
theme: {
  extend: {
    fontFamily: {
      sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
    },
  },
},
```

> Sin la extensión en `tailwind.config.js`, Tailwind aplica su stack de fuentes por defecto y la fuente puede no renderizarse en todos los elementos. El stack de fallback garantiza una fuente limpia del sistema mientras Google Fonts carga.

---

## Sistema de colores

Todos los valores corresponden a Tailwind CSS 3. Los hex se incluyen como referencia rápida.

### Fondos de página

| Uso | Tailwind | Hex |
|-----|----------|-----|
| Fondo general light | `bg-gray-50` | `#F9FAFB` |
| Fondo general dark | `dark:bg-gray-950` | `#030712` |
| Fondo pantallas internas light | `bg-white` | `#FFFFFF` |
| Fondo pantallas internas dark | `dark:bg-gray-900` | `#111827` |
| Resaltado día actual en calendario | `bg-blue-50/30` | `#EFF6FF` al 30% |

### Textos

| Uso | Tailwind | Hex |
|-----|----------|-----|
| Texto principal light | `text-gray-900` | `#111827` |
| Texto principal dark | `dark:text-white` | `#FFFFFF` |
| Subtítulos / texto secundario | `text-gray-500` | `#6B7280` |
| Labels y metadatos | `text-gray-400` | `#9CA3AF` |
| Labels de campos (uppercase) | `text-gray-500` | `#6B7280` |
| Placeholders | `placeholder-gray-400` | `#9CA3AF` |
| Horas en calendario | `text-gray-400` | `#9CA3AF` |

### Campos de formulario

| Uso | Tailwind | Hex |
|-----|----------|-----|
| Fondo input light | `bg-white` | `#FFFFFF` |
| Fondo input dark | `dark:bg-gray-800` | `#1F2937` |
| Borde input light | `border-gray-200` | `#E5E7EB` |
| Borde input dark | `dark:border-gray-700` | `#374151` |
| Borde en foco light | `focus:border-gray-900` | `#111827` |
| Borde en foco dark | `dark:focus:border-gray-400` | `#9CA3AF` |
| Fondo buscador | `bg-gray-50` | `#F9FAFB` |
| Fondo tarjeta info cliente | `bg-gray-50` | `#F9FAFB` |

### Botones

| Uso | Tailwind | Hex |
|-----|----------|-----|
| Primario fondo light | `bg-gray-900` | `#111827` |
| Primario texto light | `text-white` | `#FFFFFF` |
| Primario fondo dark | `dark:bg-white` | `#FFFFFF` |
| Primario texto dark | `dark:text-gray-900` | `#111827` |
| Primario hover | `hover:bg-gray-800` | `#1F2937` |
| Secundario fondo | `bg-gray-100` | `#F3F4F6` |
| Secundario texto | `text-gray-900` | `#111827` |
| Secundario borde | `border-gray-200` | `#E5E7EB` |
| Cancelar fondo | `bg-red-600` | `#DC2626` |
| Cancelar hover | `hover:bg-red-700` | `#B91C1C` |
| INVITE fondo | `bg-purple-600` | `#9333EA` |
| INVITE hover | `hover:bg-purple-500` | `#A855F7` |
| Walk-in activo fondo | `bg-gray-900` | `#111827` |
| Walk-in inactivo fondo | `bg-white` | `#FFFFFF` |

### Bordes y separadores

| Uso | Tailwind | Hex |
|-----|----------|-----|
| Borde sutil light | `border-gray-100` | `#F3F4F6` |
| Borde estándar light | `border-gray-200` | `#E5E7EB` |
| Borde estándar dark | `dark:border-gray-700` | `#374151` |
| Borde de sección dark | `dark:border-gray-800` | `#1F2937` |
| Línea de tiempo actual | `bg-red-400` | `#F87171` |
| Punto de tiempo actual | `bg-red-500` | `#EF4444` |

### Estados de cita — bloques en calendario

| Estado | Fondo | Texto | Borde |
|--------|-------|-------|-------|
| Apartada | `bg-white` `#FFFFFF` | `text-gray-900` `#111827` | `border-gray-200` `#E5E7EB` |
| SinConfirmar | `bg-yellow-400` `#FACC15` | `text-gray-900` `#111827` | `border-yellow-400` `#FACC15` |
| Confirmada | `bg-green-800` `#166534` | `text-white` `#FFFFFF` | `border-green-800` `#166534` |
| Cancelada | `bg-red-50` `#FEF2F2` | `text-red-700` `#B91C1C` | `border-dashed border-red-400` `#F87171` |
| NoShow | `bg-gray-900` `#111827` | `text-red-400` `#F87171` | `border-red-900` `#7F1D1D` |
| WalkIn | `bg-green-100` `#DCFCE7` | `text-green-900` `#14532D` | `border-green-200` `#BBF7D0` |

### Badges de estado

| Estado | Fondo | Texto |
|--------|-------|-------|
| Apartada | `bg-gray-100` `#F3F4F6` | `text-gray-700` `#374151` |
| SinConfirmar | `bg-yellow-400` `#FACC15` | `text-gray-900` `#111827` |
| Confirmada | `bg-green-700` `#15803D` | `text-white` `#FFFFFF` |
| Cancelada | `bg-red-100` `#FEE2E2` | `text-red-700` `#B91C1C` |
| NoShow | `bg-red-900` `#7F1D1D` | `text-white` `#FFFFFF` |
| WalkIn | `bg-green-200` `#BBF7D0` | `text-green-900` `#14532D` |

### Navegación

| Uso | Tailwind | Hex |
|-----|----------|-----|
| Ítem activo fondo light | `bg-gray-100` | `#F3F4F6` |
| Ítem activo texto | `text-gray-900` | `#111827` |
| Ítem inactivo | `text-gray-400` | `#9CA3AF` |
| Toggle de vista activo fondo | `bg-gray-900` | `#111827` |
| Toggle de vista activo texto | `text-white` | `#FFFFFF` |
| Toggle contenedor fondo | `bg-gray-100` | `#F3F4F6` |

### Clientes

| Uso | Tailwind | Hex |
|-----|----------|-----|
| Avatar fondo | `bg-gray-100` | `#F3F4F6` |
| Avatar texto | `text-gray-700` | `#374151` |
| Fila seleccionada light | `bg-gray-100` | `#F3F4F6` |
| Fila seleccionada dark | `dark:bg-gray-800` | `#1F2937` |
| Contador no-shows | `text-red-500` | `#EF4444` |

### INVITE

| Uso | Tailwind | Hex |
|-----|----------|-----|
| Contacto seleccionado fondo | `bg-purple-50` | `#FAF5FF` |
| Contacto seleccionado borde | `border-purple-300` | `#D8B4FE` |
| Checkbox seleccionado | `bg-purple-600` | `#9333EA` |
| Plantilla seleccionada fondo | `bg-purple-50` | `#FAF5FF` |
| Plantilla seleccionada label | `text-purple-600` | `#9333EA` |
| Botón "En lista INVITE" fondo | `bg-purple-100` | `#F3E8FF` |
| Botón "En lista INVITE" texto | `text-purple-700` | `#7E22CE` |
| Badge no-shows fondo | `bg-red-100` | `#FEE2E2` |
| Badge no-shows texto | `text-red-600` | `#DC2626` |

### Alertas y estados especiales

| Uso | Tailwind | Hex |
|-----|----------|-----|
| Alerta conflicto fondo | `bg-amber-50` | `#FFFBEB` |
| Alerta conflicto borde | `border-amber-200` | `#FDE68A` |
| Alerta conflicto texto principal | `text-amber-800` | `#92400E` |
| Alerta conflicto texto secundario | `text-amber-700` | `#B45309` |
| Botón "Liberar" fondo | `bg-amber-500` | `#F59E0B` |
| Confirmación cancelar fondo | `bg-red-50` | `#FEF2F2` |
| Confirmación cancelar borde | `border-red-100` | `#FEE2E2` |
| Toast éxito fondo | `bg-gray-900` | `#111827` |
| Toast éxito ícono | `bg-green-500` | `#22C55E` |

### Gradiente decorativo (Registro / Login)

| Uso | Valor |
|-----|-------|
| Gradiente superior light | `rgba(231, 54, 69, 0.18)` → `transparent` |

---

## Dark mode

Automático — sigue la preferencia del sistema operativo (`prefers-color-scheme`). No hay toggle manual en el prototipo.

## Datos de prueba

El prototipo incluye seed data con:
- 15 contactos ficticios
- ~16 citas distribuidas en 4 días (hoy, ayer, mañana, pasado mañana)
- Todos los estados de cita representados
- 6 citas simultáneas a las 3pm para demostrar scroll horizontal en móvil

Para resetear los datos al seed original basta con recargar la página — el estado no persiste.

## Notas para desarrollo

- Los SMS no se envían realmente — la arquitectura está lista para conectar el backend
- El código SMS de verificación en demo siempre es `1234`
- La autenticación es visual — sin backend real ni tokens
- El nombre de barbería se guarda en memoria (store `negocio.js`) al completar el registro demo
- La gestión de usuarios está comentada en `Calendario.jsx` — lista para activar
- El evento de conversión en `Inicio.jsx` es un `console.log` — reemplazar con SDK de analytics en producción
- `SinConfirmar` en producción lo asigna el sistema automáticamente — no debería ser acción manual del barbero
