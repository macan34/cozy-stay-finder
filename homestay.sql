-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2025 at 07:03 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homestay`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password`) VALUES
(1, 'useradmini', 'admin123'),
(2, 'admin', 'admin123');

-- --------------------------------------------------------

--
-- Table structure for table `homestays`
--

CREATE TABLE `homestays` (
  `id` int(11) NOT NULL,
  `image` varchar(500) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `rating` decimal(3,2) DEFAULT 0.00,
  `capacity` int(11) NOT NULL,
  `rooms` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `distance` varchar(100) NOT NULL,
  `facilities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`facilities`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homestays`
--

INSERT INTO `homestays` (`id`, `image`, `title`, `description`, `price`, `rating`, `capacity`, `rooms`, `location`, `distance`, `facilities`, `created_at`, `updated_at`) VALUES
(3, '/uploads/homestay-3.jpg', 'Homestay Gunung Bromo', 'Pengalaman menginap dengan view sunrise Gunung Bromo. Lokasi strategis untuk menjelajahi kawasan pegunungan.', 800000.00, 4.40, 8, 4, 'Cemoro Lawang, Probolinggo', '1 km dari viewpoint', '[\"View Gunung\", \"WiFi\", \"AC\", \"Pemanas Ruangan\", \"Sarapan\", \"Guide Tour\"]', '2025-12-18 02:11:52', '2025-12-18 02:11:52'),
(4, '/uploads/homestay-4.jpg', 'Villa Modern Jogja', 'Villa modern dengan desain minimalis di tengah kota Yogyakarta. Dekat dengan objek wisata budaya.', 950000.00, 4.70, 5, 3, 'Sleman, Yogyakarta', '3 km dari Malioboro', '[\"WiFi\", \"AC\", \"Smart TV\", \"Dapur Modern\", \"Parkir\", \"Laundry\"]', '2025-12-18 02:11:52', '2025-12-18 02:11:52'),
(5, '/uploads/5e69bb85ee2141d735e27f5e3a2b2f20', 'jogja 1', 'semua deskripsi', 140000.00, 0.00, 12, 6, ' depan ugm', '9,8 m dari ugm', '[\"WiFi\",\"Dapur\",\"Kamar Mandi Dalam\",\"Smart TV\",\"AC\",\"Parkir\",\"Kolam Renang\",\"BBQ Area\"]', '2025-12-18 02:19:44', '2025-12-18 02:19:44');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `image`, `created_at`) VALUES
(1, 'Homestay Jogja Deluxe', 350000.00, 'Homestay nyaman dengan fasilitas AC, WiFi, kamar mandi dalam, dekat Malioboro.', 'homestay-deluxe.jpg', '2025-12-18 01:34:59'),
(2, 'Homestay Jogja Family', 550000.00, 'Homestay cocok untuk keluarga, 2 kamar tidur, dapur, parkir luas.', 'homestay-family.jpg', '2025-12-18 01:34:59'),
(3, 'Homestay Jogja Budget', 200000.00, 'Homestay murah untuk backpacker, bersih dan strategis.', 'homestay-budget.jpg', '2025-12-18 01:34:59'),
(4, 'Homestay Jogja Exclusive', 850000.00, 'Homestay premium dengan kolam renang pribadi dan interior modern.', 'homestay-exclusive.jpg', '2025-12-18 01:34:59'),
(5, 'Homestay Jogja Syariah', 400000.00, 'Homestay bernuansa syariah, nyaman dan aman untuk keluarga muslim.', 'homestay-syariah.jpg', '2025-12-18 01:34:59'),
(6, 'singgih', 23300000.00, 'semua ada', '/uploads/c98899acca7cc3e2a0847362b4a9496b', '2025-12-18 02:00:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `homestays`
--
ALTER TABLE `homestays`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `homestays`
--
ALTER TABLE `homestays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
