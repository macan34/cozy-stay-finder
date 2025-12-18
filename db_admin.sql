-- Jalankan query ini di phpMyAdmin/MySQL untuk menambah tabel admin dan satu user default

CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL -- plain untuk testing, production WAJIB hash
);
INSERT INTO admin_users (username, password) VALUES ('useradmini', 'admin123') ON DUPLICATE KEY UPDATE password=VALUES(password);
