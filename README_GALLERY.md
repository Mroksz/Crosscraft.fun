Galería Comunitaria — Backend mínimo

Archivos añadidos:
- `server.js` : servidor Express que gestiona subida y administración de imágenes.
- `package.json` : dependencias necesarias.

Instalación y arranque:

1. Instala dependencias:

```bash
cd /workspaces/Crosscraft.fun
npm install
```

2. (Opcional) Define credenciales de administrador (por defecto el usuario admin es `mroks`):

```bash
# usuario por defecto: mroks
export ADMIN_USER=mroks
export ADMIN_PASS=supersecret
```

3. Arranca el servidor:

```bash
npm start
```

El servidor queda escuchando en `http://localhost:3000` por defecto. Además, el servidor sirve la web estática desde la raíz del proyecto, por lo que puedes abrir directamente:

```
http://localhost:3000/
```

y se cargará `index.html` y los recursos (CSS/JS). Esto hace más fácil probar la galería y la página completa desde el mismo host.

Endpoints principales:
- `GET /api/gallery` : devuelve JSON con las imágenes subidas.
- `POST /api/upload` : acepta `multipart/form-data` con campo `image` (archivo), `caption` (texto) y `author` (texto).
- `DELETE /api/image/:id` : elimina una imagen (requiere Basic Auth header con las credenciales ADMIN_USER/ADMIN_PASS).

Notas de seguridad:
- Este es un ejemplo mínimo pensada para uso local/test. Para producción deberías:
  - Forzar HTTPS.
  - Validar tipos MIME y analizar imágenes para evitar cargas maliciosas.
  - Usar credenciales seguras y rotación.
  - Añadir límite por usuario y medidas anti-abuso.
