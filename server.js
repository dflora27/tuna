import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Hostinger Node.js will automatically bind an environment PORT variable
const PORT = process.env.PORT || 3000;

// Hostinger'a Vite'ın build işlemiyle oluşturduğu dist klasörünü statik olarak sunmasını söylüyoruz
app.use(express.static(path.join(__dirname, 'dist')));

// SPA (React Router) yönlendirmesi - Tüm bağlantılar index.html'ye gider
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`B.T. Server running dynamically on port ${PORT}`);
});
