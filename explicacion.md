### 🎨 **1. Estilo Visual (Colores, Tipografía, Fondos)**  
- **Paleta de colores:**  
  - **Negro/azul oscuro** (`#0d0d15`, `#1a1a2e`) para fondos.  
  - **Morado** (`#6a0dad`) y **azul eléctrico** (`#00a8ff`) para acentos.  
  - **Texto blanco** con transparencias para jerarquía.  

- **Tipografía:**  
  - Usé `font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` (limpia y moderna).  
  - **Gradientes en títulos** (ej: `background: linear-gradient(...)` aplicado a textos).  

- **Fondos:**  
  - **Imágenes** de Discord con `opacity: 0.2` para no saturar.  
  - **Overlay oscuro** (`rgba(13, 13, 21, 0.85)`) para mejorar legibilidad.  

---

### ✨ **2. Efectos Clave**  

#### **🔹 Animaciones CSS**  
- **Flotar (Float):**  
  - Objetos como el logo y tu avatar flotan suavemente con `@keyframes float`.  
  - **Truco:** Usé `animation-delay` en algunos elementos para que no se sincronicen.  

- **Aparecer (FadeIn):**  
  - Las secciones aparecen con `opacity` y movimiento vertical (`translateY`).  

- **Pulsar (Pulse):**  
  - Botones al copiar la IP tienen un efecto de escala (`transform: scale`).  

#### **🔹 Efectos de Hover**  
- **Botones:**  
  - Brillan al pasar el mouse (`::before` con `linear-gradient` móvil).  
  - Se elevan (`transform: translateY(-5px)`).  

- **Tarjetas de características:**  
  - Borde morado al hover (`border-color`).  
  - Sombra más pronunciada (`box-shadow`).  

#### **🔹 Partículas Flotantes**  
- **Cómo se hizo:**  
  - **JavaScript** crea divs redondeados (`border-radius: 50%`) con:  
    - Tamaño/opacidad aleatorios.  
    - Animación `float` con duración aleatoria.  
  - Se eliminan automáticamente después de animarse.  

---

### 📱 **3. Responsive Design (Móvil/Tablet/PC)**  
- **Media Queries:**  
  - **Pantallas < 768px:**  
    - Menú de IP en columna (no fila).  
    - Textos más pequeños.  
  - **Pantallas < 480px:**  
    - Logo más compacto.  
    - Ajuste de padding en tarjetas.  

- **Unidades flexibles:**  
  - `rem` y `%` para tamaños.  
  - `grid` y `flexbox` para reordenar contenido.  

---

### 🛠️ **4. Librerías/Recursos Externos**  
- **Font Awesome:** Iconos (Java, cubo, Discord, etc.).  
- **Google Fonts (implícito):** Tipografía "Segoe UI" (si no está, usa Tahoma/Verdana).  

---

### 💡 **Tips para Modificar**  
- **Cambiar colores:** Edita las variables CSS en `:root`.  
- **Eliminar partículas:** Borra el código JavaScript al final.  
- **Añadir más animaciones:** Usa `@keyframes` con nuevas propiedades.  

--- 
