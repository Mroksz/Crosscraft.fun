

## 🌐 Estructura General

El proyecto consiste en una página web moderna para un servidor Minecraft Crossplay (Java/Bedrock) con:

1. **Diseño futurista** con efectos visuales avanzados
2. **Sistema de contador de usuarios** de Discord
3. **Interfaz elegante** con combinación azul/morado
4. **Totalmente responsive** para todos los dispositivos

## 🧩 Componentes Principales

### 1. Sistema de Partículas Animadas
- Efecto de partículas flotantes en el fondo
- Combinación de partículas azules (70%) y moradas (30%)
- Animación suave con tiempos aleatorios
- Creadas dinámicamente con JavaScript

### 2. Encabezado (Header)
- Logo central con efecto hover
- Título con gradiente azul-morado
- Subtítulo y badge de compatibilidad
- Tipografía Kanit para títulos (moderna/futurista)

### 3. Panel Principal
- Muestra la IP del servidor
- Botón para copiar IP con feedback visual
- Botones principales:
  - **Unirse al servidor** (con enlace directo para Minecraft)
  - **Soporte Discord** con contador de usuarios online

### 4. Sección de Características
- Grid responsive con 4 features principales
- Tarjetas con efecto hover y bordes luminosos
- Iconos con gradiente azul-morado
- Descripciones claras y concisas

### 5. Pie de Página (Footer)
- Copyright automático (año actual)
- Créditos con enlace a tu GitHub
- Iconos de GitHub y Discord
- Diseño minimalista con borde superior sutil

## ⚙️ Funcionalidades JavaScript

### `updateDiscordCount()`
- Simula/obtiene el número de usuarios online en Discord
- Actualiza el contador cada minuto
- Muestra indicador verde de actividad

### Sistema de Copiado de IP
- Usa la API Clipboard
- Muestra feedback visual (éxito/error)
- Temporizador para resetear el estado

### Efectos de Partículas
- Genera partículas dinámicamente
- Configura tamaños y posiciones aleatorias
- Controla velocidad y dirección de animación

## 🎨 Diseño y Estilos

### Paleta de Colores
- Azul principal: `#1e88e5`
- Morado acento: `#9c27b0`
- Fondo oscuro: `#0a0a15`
- Texto blanco con variantes de opacidad

### Efectos Visuales
- Vidrio esmerilado (glassmorphism) en paneles
- Degradados azul-morado para elementos destacados
- Sombras suaves y bordes luminosos
- Transiciones fluidas en hover

### Tipografía
- **Kanit**: Para títulos y botones (moderno)
- **Exo 2**: Para texto normal (legibilidad)

## 📱 Responsive Design
- Ajusta tamaños de texto y padding
- Reorganiza grids en móviles
- Optimiza cantidad de partículas
- Botones apilados verticalmente

## 🛠️ Cómo Extender el Proyecto

1. **Contador real de Discord**:
   - Implementa la API de Discord
   - Crea un endpoint en tu backend
   - Actualiza `updateDiscordCount()`

2. **Más secciones**:
   - Galería de imágenes
   - Tabla de rankings
   - Calendario de eventos

3. **Efectos adicionales**:
   - Animaciones al hacer scroll
   - Modo oscuro/nocturno
   - Sonidos interactivos

## 📂 Estructura de Archivos (Recomendada)
```
crosscraft-web/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos (opcional separado)
├── js/
│   └── main.js         # Lógica principal
├── assets/
│   ├── images/         # Logos e iconos
│   └── fonts/          # Fuentes locales (opcional)
└── README.md           # Documentación
```
