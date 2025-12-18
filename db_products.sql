-- Jalankan query berikut di phpMyAdmin atau MySQL client anda untuk setup tabel produk:
CREATE DATABASE IF NOT EXISTS homestay;
USE homestay;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

