const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DB_FILE = path.join(__dirname, 'gallery.db');

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Inicializar DB
const db = new sqlite3.Database(DB_FILE);
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    originalname TEXT,
    caption TEXT,
    author TEXT,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (sitio web) desde la raíz del proyecto
// Esto permite abrir http://localhost:3000 y cargar `index.html` y recursos.
app.use(express.static(__dirname));

// Servir archivos subidos
app.use('/uploads', express.static(UPLOADS_DIR));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = Date.now() + '-' + Math.random().toString(36).slice(2,8);
    cb(null, base + ext);
  }
});
const upload = multer({ storage, limits: { fileSize: 6 * 1024 * 1024 } }); // 6MB max

// Helpers para autenticación básica de administrador
function parseBasicAuth(header) {
  if (!header) return null;
  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Basic') return null;
  try {
    const decoded = Buffer.from(parts[1], 'base64').toString('utf8');
    const idx = decoded.indexOf(':');
    if (idx === -1) return null;
    return { user: decoded.slice(0, idx), pass: decoded.slice(idx + 1) };
  } catch (e) {
    return null;
  }
}

function requireAdmin(req, res, next) {
  const creds = parseBasicAuth(req.headers['authorization']);
  const ADMIN_USER = process.env.ADMIN_USER || 'mroks';
  const ADMIN_PASS = process.env.ADMIN_PASS || 'password';
  if (!creds || creds.user !== ADMIN_USER || creds.pass !== ADMIN_PASS) {
    res.set('WWW-Authenticate', 'Basic realm="Galeria Admin"');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Endpoints
app.get('/api/gallery', (req, res) => {
  db.all('SELECT id, filename, originalname, caption, author, uploaded_at FROM images ORDER BY uploaded_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    const host = req.get('host');
    const proto = req.protocol;
    const data = rows.map(r => ({
      id: r.id,
      url: `${proto}://${host}/uploads/${r.filename}`,
      originalname: r.originalname,
      caption: r.caption,
      author: r.author,
      uploaded_at: r.uploaded_at
    }));
    res.json(data);
  });
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const { caption = '', author = '' } = req.body;
  console.log(`Upload received: file=${req.file.filename} original=${req.file.originalname} author=${author}`);
  const stmt = db.prepare('INSERT INTO images (filename, originalname, caption, author) VALUES (?, ?, ?, ?)');
  stmt.run(req.file.filename, req.file.originalname, caption, author, function(err) {
    if (err) return res.status(500).json({ error: 'DB insert error' });
    res.json({ success: true, id: this.lastID, filename: req.file.filename });
  });
});

// Admin: eliminar imagen
app.delete('/api/image/:id', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  db.get('SELECT filename FROM images WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!row) return res.status(404).json({ error: 'Not found' });
    const filepath = path.join(UPLOADS_DIR, row.filename);
    fs.unlink(filepath, (fsErr) => {
      if (fsErr) console.warn('Error eliminando fichero:', fsErr);
      // incluso si falla unlink, eliminar registro
      db.run('DELETE FROM images WHERE id = ?', [id], (delErr) => {
        if (delErr) return res.status(500).json({ error: 'DB delete error' });
        console.log(`Image deleted id=${id} file=${row.filename}`);
        res.json({ success: true });
      });
    });
  });
});

// Simple health
app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Gallery server running on http://localhost:${PORT}`));
