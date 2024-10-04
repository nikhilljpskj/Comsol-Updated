-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 24, 2024 at 08:01 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `comsol`
--

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `mobile_number` varchar(20) DEFAULT NULL,
  `whatsapp_number` varchar(20) DEFAULT NULL,
  `complaint` varchar(1500) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `staff_assigned` varchar(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `additional_comments` varchar(1000) DEFAULT NULL,
  `diagnosis` varchar(1000) DEFAULT NULL,
  `staff_location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `complaints`
--

INSERT INTO `complaints` (`id`, `customer_name`, `customer_email`, `mobile_number`, `whatsapp_number`, `complaint`, `location`, `status`, `staff_assigned`, `created_at`, `additional_comments`, `diagnosis`, `staff_location`) VALUES
(2, 'Demo', 'Demo@gmail.com', '456789', '918921652221', 'fgsdj', 'https://www.google.com/maps/place/9.1887492,76.7668806/', '2', '3', '2024-09-12 20:31:49', 'xccv', 'afud', 'https://www.google.com/maps/place/9.1887544,76.7668529/'),
(6, 'Nikhil', 'nikhiljp.skj@gmail.com', '08921652221', 'eeeeeeeee', 'eeeeeeeee', 'https://www.google.com/maps/place/9.1887485,76.7668794/', '0', NULL, '2024-09-14 11:15:59', NULL, NULL, NULL),
(7, 'Dzjhjcd', 'ncdjcgv@gmail.com', '8921652221', '918086689923', 'Complaint', 'https://www.google.com/maps/place/9.1887485,76.7668794/', '1', '3', '2024-09-14 12:44:19', NULL, NULL, NULL),
(8, 'Akhil PRAKASH', 'nikhilkodumon@gmail.com', '08921534017', '917560879155', 'hello', 'https://www.google.com/maps/place/9.1887485,76.7668794/', '0', NULL, '2024-09-14 15:31:47', NULL, NULL, NULL),
(9, 'Ajay', 'nikhiljp.skj@gmail.com', '8921652221', '917560879155', 'Complaint', 'https://www.google.com/maps/place/9.1887485,76.7668794/', '1', '3', '2024-09-14 16:17:55', NULL, NULL, NULL),
(10, 'tgtgrwe', 'nikhiljp.skj@gmail.com', '08921652221', '918921652221', 'as', 'https://www.google.com/maps/place/9.1887485,76.7668794/', '1', '3', '2024-09-14 16:21:30', NULL, NULL, NULL),
(11, 'tt', 'nikhiljp.skj@gmail.com', '8921652221', '918921652221', 'tt', 'https://www.google.com/maps/place/9.1887485,76.7668794/', '0', NULL, '2024-09-14 16:23:16', NULL, NULL, NULL),
(12, 'Nikhil', 'nikhiljp.skj@gmail.com', '08921652221', '918921652221', 'c', 'https://www.google.com/maps/place/9.1887485,76.7668794/', '0', NULL, '2024-09-14 16:28:37', NULL, NULL, NULL),
(13, 'Akhil PRAKASH', 'nikhilkodumon@gmail.com', '08921534017', '+918921652221', 'bv', 'https://www.google.com/maps/place/9.1887485,76.7668794/', '2', '3', '2024-09-14 16:29:52', 'rrrrr', 'rrr', '9.1887493, 76.7668808'),
(14, 'Nikhil', 'nikhiljp.skj@gmail.com', '08921652221', '+919791777430', 'AS', 'https://www.google.com/maps/place/9.1887485,76.7668794/', '2', '3', '2024-09-14 16:35:38', 's', 'helo', 'https://www.google.com/maps/place/9.1887493,76.7668808/'),
(15, 'Nikhil', 'nikhiljp.skj@gmail.com', '08921652221', '+918921652221', 'ss', 'https://www.google.com/maps/place/9.1887485,76.7668794/', '1', '3', '2024-09-14 16:37:08', NULL, NULL, NULL),
(16, 'S', 'nikhilkodumon@gmail.com', '8921652221', '+919791777430', 'Nil', 'https://www.google.com/maps/place/9.1887485,76.7668794/', '0', NULL, '2024-09-14 16:37:59', NULL, NULL, NULL),
(17, 'Nikhil', 'nikhiljp.skj@gmail.com', '08921652221', '+91918086689923', 'v', 'https://www.google.com/maps/place/9.1887485,76.7668794/', '0', NULL, '2024-09-14 16:40:22', NULL, NULL, NULL),
(18, 'Nikhil', 'nikhiljp.skj@gmail.com', '08921652221', '+918086689923', 'b', 'r', '1', '3', '2024-09-14 16:40:56', NULL, NULL, NULL),
(19, 'Akhil PRAKASH', 'nikhilkodumon@gmail.com', '08921534017', '+918086689923', 'gg', 'https://www.google.com/maps/place/9.1887485,76.7668794/', '0', NULL, '2024-09-14 16:42:42', NULL, NULL, NULL),
(20, 'Nikhil', 'nikhiljp.skj@gmail.com', '08921652221', '+918921652221', 'f', 'https://www.google.com/maps/place/9.1887485,76.7668794/', '0', NULL, '2024-09-14 16:43:03', NULL, NULL, NULL),
(21, 'Nil', 'nikhiljp.skj@gmail.com', '7560879155', '+917560879155', 'f', 'https://www.google.com/maps/place/9.1887485,76.7668794/', '0', NULL, '2024-09-14 16:43:57', NULL, NULL, NULL),
(22, 'Nikhil', 'nikhiljp.skj@gmail.com', '08921652221', '+918304084027', 'ns', 'https://www.google.com/maps/place/9.4339072,76.7000576/', '0', NULL, '2024-09-14 17:18:41', NULL, NULL, NULL),
(23, 'Naayif', 'nikhiljp.skj@gmail.com', '08921652221', '+918086689923', 'Demo', 'https://www.google.com/maps/place/9.4339072,76.7000576/', '0', NULL, '2024-09-14 17:21:36', NULL, NULL, NULL),
(24, 'Naayif', 'nikhiljp.skj@gmail.com', '08921652221', '+918086689923', 'Demo', 'https://www.google.com/maps/place/9.4339072,76.7000576/', '0', NULL, '2024-09-14 17:22:02', NULL, NULL, NULL),
(25, 'Naayif', 'nikhilkodumon@gmail.com', '8921652221', '+918086689923', 'df', 'https://www.google.com/maps/place/9.4339072,76.7000576/', '0', NULL, '2024-09-14 17:22:35', NULL, NULL, NULL),
(26, 'Naayif', 'nikhilkodumon@gmail.com', '8921652221', '+918086689923', 'df', 'https://www.google.com/maps/place/9.4339072,76.7000576/', '0', NULL, '2024-09-14 17:22:56', NULL, NULL, NULL),
(27, 'Nikhil', 'nikhiljp.skj@gmail.com', '08921652221', '+918086689923', 'rrrr', 'https://www.google.com/maps/place/9.4339072,76.7000576/', '1', '3', '2024-09-14 17:23:40', NULL, NULL, NULL),
(28, 'Suseela KJ', 'nikhilkodumon@gmail.com', '8921652221', '+918921652221', 'Heloo Demo', 'https://www.google.com/maps/place/9.4220786,76.7971247/', '0', NULL, '2024-09-15 19:06:25', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `user_type` enum('Admin','Manager','Staff') NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `office` varchar(100) NOT NULL,
  `office_address` text NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `user_type`, `email`, `mobile`, `office`, `office_address`, `gender`, `password`, `created_at`) VALUES
(1, 'Naayif', 'sf', 'Manager', 'nikhilkodumon@gmail.com', '08921652221', 'Adoor', 'PRAKASH BHAVANAM', 'Male', '$2a$10$YnnF6kJQw129m7IFpM5MYOmiWHrQpecoVPdgTh4ijlyiBTqGZdkIK', '2024-09-12 18:20:37'),
(3, 'Nikhil', 'PRAKASH', 'Staff', 'akhil@gmail.com', '08921534017', 'Adoor', 'Billing Address', 'Male', '$2a$10$mw8f1JMxwa9AIhNE5d.rhuLWPeltlTuUL.714u9ebLE1TdwhFCvcK', '2024-09-12 19:35:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `complaints`
--
ALTER TABLE `complaints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
