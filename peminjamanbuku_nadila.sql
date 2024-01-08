-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2024 at 09:54 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2202333_nadilaazzahra_uas_pilkomb`
--

-- --------------------------------------------------------

--
-- Table structure for table `peminjamanbuku_nadila`
--

CREATE TABLE `peminjamanbuku_nadila` (
  `id` int(11) NOT NULL,
  `judul_buku` varchar(255) DEFAULT NULL,
  `jumlah` varchar(11) DEFAULT NULL,
  `nama_peminjam` varchar(255) DEFAULT NULL,
  `alamat_peminjam` varchar(255) DEFAULT NULL,
  `noHp_peminjam` varchar(15) DEFAULT NULL,
  `tanggal_pinjam` date DEFAULT NULL,
  `tanggal_pengembalian` date DEFAULT NULL,
  `lama_pinjam` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `peminjamanbuku_nadila`
--

INSERT INTO `peminjamanbuku_nadila` (`id`, `judul_buku`, `jumlah`, `nama_peminjam`, `alamat_peminjam`, `noHp_peminjam`, `tanggal_pinjam`, `tanggal_pengembalian`, `lama_pinjam`) VALUES
(1, 'Bumi Manusia', '0', 'Halimatuu', 'Jalan Gerlong RT 02 RW 06', '087675456779', '2024-01-02', '2024-01-17', '15 hari'),
(2, 'A Brief History Of Time', '0', 'Sypa Rachmatia T', 'Jl Gerlong Girang GG Cempaka', '0827768953571', '2024-01-03', '2024-01-05', '2 hari'),
(3, 'Selfish Gane', '5', 'Zhafira Muthia', 'Jalan Ledeng', '08567654489', '2024-01-04', '2024-01-09', '5 hari'),
(5, 'Theory of Everythingg', '1', 'Rehan Kamil', 'Jl Cipageran Indah 2 Ngamprah', '082120430776', '2024-01-05', '2024-01-07', '2 '),
(6, 'bulan', '0', 'Azkal', 'Jalan Gerlong RT 02 RW 06', '087675456779', '2024-01-18', '2024-01-18', '15 hari'),
(10, 'Theory of Everythingg', '4', 'Halimatuu', 'Cempaka', '0987778657', '2024-01-08', '2024-01-24', '1 hari');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `peminjamanbuku_nadila`
--
ALTER TABLE `peminjamanbuku_nadila`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `peminjamanbuku_nadila`
--
ALTER TABLE `peminjamanbuku_nadila`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
