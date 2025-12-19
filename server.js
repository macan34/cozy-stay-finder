import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'homestay'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

/* =========================
   MULTER SETUP
========================= */
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({ dest: uploadsDir });

/* =========================
   CATEGORIES
========================= */
app.get('/api/categories', (req, res) => {
  db.query('SELECT * FROM categories ORDER BY name', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

/* =========================
   GET ALL HOMESTAYS
========================= */
app.get('/api/homestays', (req, res) => {
  const query = `
    SELECT 
      h.*,
      GROUP_CONCAT(c.code) AS category_codes
    FROM homestays h
    LEFT JOIN homestay_categories hc ON h.id = hc.homestay_id
    LEFT JOIN categories c ON hc.category_id = c.id
    GROUP BY h.id
    ORDER BY h.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const data = results.map(h => ({
      ...h,
      facilities: h.facilities ? JSON.parse(h.facilities) : [],
      categories: h.category_codes ? h.category_codes.split(',') : []
    }));

    res.json(data);
  });
});

/* =========================
   GET HOMESTAY BY ID
========================= */
app.get('/api/homestays/:id', (req, res) => {
  const query = `
    SELECT 
      h.*,
      GROUP_CONCAT(c.code) AS category_codes
    FROM homestays h
    LEFT JOIN homestay_categories hc ON h.id = hc.homestay_id
    LEFT JOIN categories c ON hc.category_id = c.id
    WHERE h.id = ?
    GROUP BY h.id
  `;

  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.status(404).json({ error: 'Not found' });

    const h = results[0];
    res.json({
      ...h,
      facilities: h.facilities ? JSON.parse(h.facilities) : [],
      categories: h.category_codes ? h.category_codes.split(',') : []
    });
  });
});

/* =========================
   CREATE HOMESTAY
========================= */
app.post('/api/homestays', upload.single('image'), (req, res) => {
  const {
    title, description, price, rating,
    capacity, rooms, location, distance,
    facilities, categories
  } = req.body;

  if (!title || !description || !price || !rating || !capacity || !rooms || !location || !distance) {
    return res.status(400).json({ error: 'Data tidak lengkap' });
  }

  const image = req.file ? `/uploads/${req.file.filename}` : null;
  const facilitiesArr = facilities ? JSON.parse(facilities) : [];
  const categoriesArr = categories ? JSON.parse(categories) : [];

  db.beginTransaction(err => {
    if (err) return res.status(500).json(err);

    db.query(
      `INSERT INTO homestays 
      (image, title, description, price, rating, capacity, rooms, location, distance, facilities)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [image, title, description, price, rating, capacity, rooms, location, distance, JSON.stringify(facilitiesArr)],
      (err, result) => {
        if (err) return db.rollback(() => res.status(500).json(err));

        const homestayId = result.insertId;

        if (!categoriesArr.length) {
          return db.commit(() => res.json({ success: true, id: homestayId }));
        }

        db.query(
          'SELECT id FROM categories WHERE code IN (?)',
          [categoriesArr],
          (err, rows) => {
            if (err) return db.rollback(() => res.status(500).json(err));

            const values = rows.map(r => [homestayId, r.id]);

            db.query(
              'INSERT INTO homestay_categories (homestay_id, category_id) VALUES ?',
              [values],
              err => {
                if (err) return db.rollback(() => res.status(500).json(err));
                db.commit(() => res.json({ success: true, id: homestayId }));
              }
            );
          }
        );
      }
    );
  });
});

/* =========================
   UPDATE HOMESTAY
========================= */
app.put('/api/homestays/:id', upload.single('image'), (req, res) => {
  const id = req.params.id;
  const {
    title, description, price, rating,
    capacity, rooms, location, distance,
    facilities, categories
  } = req.body;

  const image = req.file ? `/uploads/${req.file.filename}` : null;
  const facilitiesArr = facilities ? JSON.parse(facilities) : [];
  const categoriesArr = categories ? JSON.parse(categories) : [];

  const updateData = {
    title, description, price, rating,
    capacity, rooms, location, distance,
    facilities: JSON.stringify(facilitiesArr)
  };
  if (image) updateData.image = image;

  db.beginTransaction(err => {
    if (err) return res.status(500).json(err);

    db.query('UPDATE homestays SET ? WHERE id = ?', [updateData, id], err => {
      if (err) return db.rollback(() => res.status(500).json(err));

      db.query('DELETE FROM homestay_categories WHERE homestay_id = ?', [id], err => {
        if (err) return db.rollback(() => res.status(500).json(err));

        if (!categoriesArr.length) {
          return db.commit(() => res.json({ success: true }));
        }

        db.query(
          'SELECT id FROM categories WHERE code IN (?)',
          [categoriesArr],
          (err, rows) => {
            if (err) return db.rollback(() => res.status(500).json(err));

            const values = rows.map(r => [id, r.id]);

            db.query(
              'INSERT INTO homestay_categories (homestay_id, category_id) VALUES ?',
              [values],
              err => {
                if (err) return db.rollback(() => res.status(500).json(err));
                db.commit(() => res.json({ success: true }));
              }
            );
          }
        );
      });
    });
  });
});

/* =========================
   DELETE HOMESTAY
========================= */
app.delete('/api/homestays/:id', (req, res) => {
  db.query('DELETE FROM homestays WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
