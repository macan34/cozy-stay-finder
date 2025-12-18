-- Database schema for Homestay Management System

-- Create database
CREATE DATABASE IF NOT EXISTS homestay;
USE homestay;

-- Admin users table (existing)
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Homestays table
CREATE TABLE IF NOT EXISTS homestays (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image VARCHAR(500) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0.00,
  capacity INT NOT NULL,
  rooms INT NOT NULL,
  location VARCHAR(255) NOT NULL,
  distance VARCHAR(100) NOT NULL,
  facilities JSON NOT NULL, -- Store facilities as JSON array
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Junction table for homestay categories (many-to-many relationship)
CREATE TABLE IF NOT EXISTS homestay_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  homestay_id INT NOT NULL,
  category_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (homestay_id) REFERENCES homestays(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  UNIQUE KEY unique_homestay_category (homestay_id, category_id)
);

-- Insert sample admin user (password: admin123)
INSERT INTO admin_users (username, password) VALUES ('admin', 'admin123')
ON DUPLICATE KEY UPDATE password = 'admin123';

-- Insert sample categories
INSERT INTO categories (code, name, description) VALUES
('POOL', 'Homestay dengan Kolam Renang', 'Homestay yang memiliki kolam renang pribadi atau bersama'),
('BUDGET', 'Homestay Murah', 'Homestay dengan harga terjangkau untuk budget traveler'),
('FOUR_ROOM', 'Homestay 4 Kamar', 'Homestay yang memiliki 4 kamar tidur atau lebih'),
('GROUP', 'Homestay untuk Grup', 'Homestay yang cocok untuk keluarga besar atau grup'),
('HONEYMOON', 'Homestay Bulan Madu', 'Homestay romantis untuk pasangan atau bulan madu')
ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description);

-- Insert sample homestays
INSERT INTO homestays (image, title, description, price, rating, capacity, rooms, location, distance, facilities) VALUES
('/uploads/homestay-1.jpg', 'Villa Bali Indah', 'Villa mewah dengan pemandangan sawah terasering dan kolam renang pribadi. Cocok untuk keluarga atau liburan romantis.', 1500000.00, 4.8, 6, 3, 'Ubud, Bali', '2.5 km dari pusat kota', '["Kolam Renang", "WiFi", "AC", "Dapur", "Parkir", "Sarapan"]'),
('/uploads/homestay-2.jpg', 'Bungalow Pantai', 'Bungalow tepi pantai dengan akses langsung ke pasir putih. Nikmati suara ombak dan matahari terbenam yang spektakuler.', 1200000.00, 4.6, 4, 2, 'Sanur, Bali', '500 m dari pantai', '["Akses Pantai", "WiFi", "AC", "Kamar Mandi Dalam", "Teras", "BBQ Area"]'),
('/uploads/homestay-3.jpg', 'Homestay Gunung Bromo', 'Pengalaman menginap dengan view sunrise Gunung Bromo. Lokasi strategis untuk menjelajahi kawasan pegunungan.', 800000.00, 4.4, 8, 4, 'Cemoro Lawang, Probolinggo', '1 km dari viewpoint', '["View Gunung", "WiFi", "AC", "Pemanas Ruangan", "Sarapan", "Guide Tour"]'),
('/uploads/homestay-4.jpg', 'Villa Modern Jogja', 'Villa modern dengan desain minimalis di tengah kota Yogyakarta. Dekat dengan objek wisata budaya.', 950000.00, 4.7, 5, 3, 'Sleman, Yogyakarta', '3 km dari Malioboro', '["WiFi", "AC", "Smart TV", "Dapur Modern", "Parkir", "Laundry"]');

-- Insert homestay-category relationships
INSERT INTO homestay_categories (homestay_id, category_id) VALUES
(1, 1), (1, 4), (1, 5), -- Villa Bali Indah: POOL, GROUP, HONEYMOON
(2, 5), -- Bungalow Pantai: HONEYMOON
(3, 4), (3, 2), -- Homestay Gunung Bromo: GROUP, BUDGET
(4, 3); -- Villa Modern Jogja: FOUR_ROOM

-- Create uploads directory if not exists (this will be handled by Node.js)
-- The uploads folder should be created automatically when server starts
