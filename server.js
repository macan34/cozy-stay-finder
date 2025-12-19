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
  password: '', // sesuaikan password db Anda
  database: 'homestay' // buat database dengan nama ini
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    console.error('Please make sure:');
    console.error('1. MySQL server is running');
    console.error('2. Database "homestay" exists');
    console.error('3. MySQL credentials are correct');
    process.exit(1);
  }
  console.log('Connected to MySQL database "homestay"');
});

// Pastikan folder uploads ada agar multer tidak gagal
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({ dest: path.join(__dirname, 'uploads/') });

// Ambil semua categories
app.get('/api/categories', (req, res) => {
  db.query('SELECT * FROM categories ORDER BY name', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Ambil semua homestays dengan categories
app.get('/api/homestays', (req, res) => {
  const query = `
    SELECT h.*, COALESCE(GROUP_CONCAT(c.code), '') as category_codes, COALESCE(GROUP_CONCAT(c.name), '') as category_names
    FROM homestays h
    LEFT JOIN homestay_categories hc ON h.id = hc.homestay_id
    LEFT JOIN categories c ON hc.category_id = c.id
    GROUP BY h.id
    ORDER BY h.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const homestays = results.map(homestay => ({
      ...homestay,
      facilities: (() => {
        try {
          if (Array.isArray(homestay.facilities)) return homestay.facilities;
          if (typeof homestay.facilities === 'string' && homestay.facilities.trim().length > 0) {
            return JSON.parse(homestay.facilities);
          }
          return [];
        } catch (e) {
          return [];
        }
      })(),
      categories: homestay.category_codes ? homestay.category_codes.split(',').filter(Boolean) : []
    }));

    res.json(homestays);
  });
});

// Ambil homestay berdasarkan ID dengan categories
app.get('/api/homestays/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT h.*, COALESCE(GROUP_CONCAT(c.code), '') as category_codes
    FROM homestays h
    LEFT JOIN homestay_categories hc ON h.id = hc.homestay_id
    LEFT JOIN categories c ON hc.category_id = c.id
    WHERE h.id = ?
    GROUP BY h.id
  `;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Homestay tidak ditemukan' });

    const homestay = {
      ...results[0],
      facilities: (() => {
        try {
          const f = results[0].facilities;
          if (Array.isArray(f)) return f;
          if (typeof f === 'string' && f.trim().length > 0) return JSON.parse(f);
          return [];
        } catch (e) {
          return [];
        }
      })(),
      categories: results[0].category_codes ? results[0].category_codes.split(',').filter(Boolean) : []
    };
    res.json(homestay);
  });
});

// Tambah homestay baru
app.post('/api/homestays', upload.single('image'), (req, res) => {
  const { title, description, price, rating, capacity, rooms, location, distance, facilities, categories } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !description || !price || !rating || !capacity || !rooms || !location || !distance || !facilities || !image) {
    return res.status(400).json({ error: 'Semua data wajib diisi' });
  }

  try {
    const facilitiesArray = JSON.parse(facilities);
    const categoriesArray = categories ? JSON.parse(categories) : [];

    // Insert homestay first
    db.query(
      'INSERT INTO homestays (image, title, description, price, rating, capacity, rooms, location, distance, facilities) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [image, title, description, price, rating, capacity, rooms, location, distance, JSON.stringify(facilitiesArray)],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const homestayId = result.insertId;

        // Insert categories if provided
        if (categoriesArray.length > 0) {
          const categoryInserts = categoriesArray.map(categoryCode => {
            return new Promise((resolve, reject) => {
              // Get category ID by code
              db.query('SELECT id FROM categories WHERE code = ?', [categoryCode], (err, catResults) => {
                if (err) return reject(err);
                if (catResults.length === 0) return reject(new Error(`Category ${categoryCode} not found`));

                const categoryId = catResults[0].id;
                db.query('INSERT INTO homestay_categories (homestay_id, category_id) VALUES (?, ?)', [homestayId, categoryId], (err) => {
                  if (err) reject(err);
                  else resolve();
                });
              });
            });
          });

          Promise.all(categoryInserts)
            .then(() => res.json({ success: true, id: homestayId }))
            .catch(err => res.status(500).json({ error: err.message }));
        } else {
          res.json({ success: true, id: homestayId });
        }
      }
    );
  } catch (error) {
    res.status(400).json({ error: 'Format data tidak valid' });
  }
});

// Update homestay
app.put('/api/homestays/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { title, description, price, rating, capacity, rooms, location, distance, facilities, categories } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !description || !price || !rating || !capacity || !rooms || !location || !distance || !facilities) {
    return res.status(400).json({ error: 'Semua data wajib diisi' });
  }

  try {
    const facilitiesArray = JSON.parse(facilities);
    const categoriesArray = categories ? JSON.parse(categories) : [];

    // Update homestay first
    const updateData = {
      title, 
      description, 
      price, 
      rating, 
      capacity, 
      rooms, 
      location, 
      distance,
      facilities: JSON.stringify(facilitiesArray)
    };

    if (image) {
      updateData.image = image;
    }

    db.query('UPDATE homestays SET ? WHERE id = ?', [updateData, id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Homestay tidak ditemukan' });

      // Delete existing categories
      db.query('DELETE FROM homestay_categories WHERE homestay_id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        // Insert new categories if provided
        if (categoriesArray.length > 0) {
          const categoryInserts = categoriesArray.map(categoryCode => {
            return new Promise((resolve, reject) => {
              // Get category ID by code
              db.query('SELECT id FROM categories WHERE code = ?', [categoryCode], (err, catResults) => {
                if (err) return reject(err);
                if (catResults.length === 0) return reject(new Error(`Category ${categoryCode} not found`));

                const categoryId = catResults[0].id;
                db.query('INSERT INTO homestay_categories (homestay_id, category_id) VALUES (?, ?)', [id, categoryId], (err) => {
                  if (err) reject(err);
                  else resolve();
                });
              });
            });
          });

          Promise.all(categoryInserts)
            .then(() => res.json({ success: true }))
            .catch(err => res.status(500).json({ error: err.message }));
        } else {
          res.json({ success: true });
        }
      });
    });
  } catch (error) {
    res.status(400).json({ error: 'Format data tidak valid' });
  }
});



// Hapus homestay
app.delete('/api/homestays/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM homestays WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Homestay tidak ditemukan' });
    res.json({ success: true });
  });
});

// Dashboard stats
app.get('/api/dashboard/stats', (req, res) => {
  const queries = [
    'SELECT COUNT(*) as total_homestays FROM homestays',
    'SELECT AVG(rating) as avg_rating FROM homestays WHERE rating > 0',
    'SELECT SUM(price) as total_revenue FROM homestays', // This would be from bookings in real app
    'SELECT COUNT(*) as total_users FROM admin_users'
  ];

  Promise.all(queries.map(query => new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  }))).then(results => {
    res.json({
      totalHomestays: results[0].total_homestays,
      averageRating: parseFloat(results[1].avg_rating || 0).toFixed(1),
      totalRevenue: results[2].total_revenue || 0,
      totalUsers: results[3].total_users
    });
  }).catch(err => res.status(500).json({ error: err.message }));
});

// Endpoint login admin
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.query(
    'SELECT * FROM admin_users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0) {
        res.json({ success: true, user: { id: results[0].id, username: results[0].username } });
      } else {
        res.status(401).json({ success: false, error: 'Username/password salah!' });
      }
    }
  );
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
