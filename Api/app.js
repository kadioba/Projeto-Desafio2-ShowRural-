const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

// Habilita o CORS para todas as requisições
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

app.post('/images', upload.single('image'), (req, res) => {
  const imagePath = path.join(__dirname, 'images', req.file.filename);
  res.send({ message: 'Image received and saved successfully' });
});

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
