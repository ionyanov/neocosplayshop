SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE `Category` (
  `id` int NOT NULL,
  `updated` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT '1',
  `order` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Category` (`id`, `updated`, `name`, `link`, `visible`, `order`) VALUES
(2, '2023-09-25 07:31:21.793', 'Wigs', 'wigs', 1, 1),
(3, '2023-09-25 07:31:35.845', 'Costumes', 'costumes', 1, 2),
(4, '2023-09-30 17:29:39.038', 'Props ', 'props', 1, 3),
(5, '2023-09-30 17:30:29.878', 'Armor ', 'armor', 1, 4);

CREATE TABLE `CategoryProperties` (
  `category_id` int NOT NULL,
  `property_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `CategoryProperties` (`category_id`, `property_id`) VALUES
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(2, 3),
(3, 3),
(4, 3),
(5, 3),
(2, 4),
(3, 4),
(4, 4),
(5, 4),
(2, 5),
(3, 5),
(5, 5),
(2, 6),
(3, 7),
(3, 8),
(2, 9),
(3, 9),
(4, 9),
(5, 9);

CREATE TABLE `Product` (
  `id` int NOT NULL,
  `updated` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `is_popular` tinyint(1) NOT NULL DEFAULT '0',
  `is_onsales` tinyint(1) NOT NULL DEFAULT '0',
  `main_image_id` int DEFAULT NULL,
  `category_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Product` (`id`, `updated`, `name`, `price`, `is_popular`, `is_onsales`, `main_image_id`, `category_id`) VALUES
(3, '2023-09-26 17:24:58.987', 'Cosplay wig  inspired by  Xiao Genshin Impact', 180, 1, 1, 10, 2),
(4, '2023-09-26 18:12:19.292', 'Cosplay wig inspired by Himiko Toga', 150, 1, 1, 13, 2),
(5, '2023-09-26 18:26:38.924', 'Cosplay wig inspired by Zenitsu Agatsuma', 120, 1, 1, 19, 2),
(6, '2023-09-26 18:34:18.068', 'Cosplay wig inspired by Tanjirou Kamado', 160, 1, 1, 21, 2),
(7, '2023-09-26 19:03:53.734', 'Cosplay costume inspired by Edelgard', 680, 0, 0, 23, 3),
(9, '2023-12-07 17:05:34.308', 'Cosplay costume inspired by Claude', 750, 0, 0, 26, 3),
(10, '2023-12-07 17:05:49.949', 'Cosplay costume inspired by Link ', 850, 0, 0, 29, 3),
(11, '2023-12-07 17:06:06.029', 'Cosplay costume inspired by Link ', 850, 0, 0, 34, 3),
(12, '2023-12-07 17:06:12.766', 'Cosplay costume inspired by Zelda', 800, 0, 0, 38, 3),
(13, '2023-12-12 09:46:51.003', 'Cosplay wig  inspired by Eda Clawthorne', 350, 0, 0, NULL, 2),
(14, '2023-12-12 10:35:06.687', 'Cosplay Horns 1', 150, 0, 0, 55, 4),
(15, '2023-12-12 10:39:29.805', 'Cosplay Horns 2', 150, 0, 0, 63, 4),
(16, '2023-12-12 10:51:31.619', 'Cosplay Horns 3', 200, 0, 0, 71, 4),
(17, '2023-12-12 10:55:49.196', 'Cosplay Helmet', 250, 0, 0, 73, 5);

CREATE TABLE `ProductDescription` (
  `id` int NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `ProductDescription` (`id`, `description`, `type`, `product_id`) VALUES
(7, 'You can order any of the horns shown in the photo or send your design by message or email Neocosplay1@gmail.com and we will discuss the possibility of creating an individual design for you.', 'SIMPLE', 14),
(8, 'You can order any of the horns shown in the photo or send your design by message or email Neocosplay1@gmail.com and we will discuss the possibility of creating an individual design for you.', 'SIMPLE', 15),
(9, 'Price for unpainted horns is $120. Price for horns with ready-made design: $150', 'SIMPLE', 15),
(10, 'Price for unpainted horns is $120. Price for horns with ready-made design: $150', 'SIMPLE', 14);

CREATE TABLE `ProductImage` (
  `id` int NOT NULL,
  `link` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `ProductImage` (`id`, `link`, `description`, `product_id`) VALUES
(8, '7bafd99d129ccf5137310.png', '', 3),
(9, '71d32d85da1707798ec3.jpg', '', 3),
(10, 'aeea1a86fa71bdfdb1014.png', '', 3),
(11, '10f7374d853f3b0aa4fb2.png', '', 3),
(12, '21027a5c110ea84a248aed.jpg', '', 4),
(13, '0bf1093245283b63a3921.jpg', '', 4),
(14, '98d7e9d3a1ea3ce089aa.jpg', '', 4),
(15, '00e8d166a7d7512ca10ea.jpg', '', 4),
(16, '1d3a95a36b7da3510da28.jpg', '', 5),
(17, 'f2a78a6e6ab616be94110.jpg', '', 5),
(18, 'f875fadf8fbdac1e1016a.jpg', '', 5),
(19, 'fbb108b5d8578b4ff9c39.jpg', '', 5),
(20, 'a98ae8cdd57f096c064a.jpg', '', 6),
(21, 'fece1c6e14feef8a6374.jpg', '', 6),
(22, '5d1ee1afa09451fd151f.jpg', '', 6),
(23, '16b6864d14af4b1996a0.jpg', '', 7),
(26, '4d8bd7978733344b6244.jpg', '', 9),
(27, '90b2b037ba84bb265950.jpg', '', 9),
(28, '781eec6a25a97be44460.jpg', '', 9),
(29, '9f0ea06e7e2f95f110f4d.jpg', '', 10),
(30, '2d3b136a706f5bec19ec.jpg', '', 10),
(31, 'c10fc2739b2610fa83fa6c.jpg', '', 10),
(34, 'd1fcb3a368a59cc80bbd.jpg', '', 11),
(35, 'b06b799231410e635d968.jpg', '', 11),
(36, '23a26546cbe611429140.jpg', '', 11),
(37, '11ff0d4a9023a494eb66.jpg', '', 11),
(38, '6d5f74151996399e7a2c.jpg', '', 12),
(39, '7a614cf296d4d6cca21f.jpg', '', 12),
(40, '81c10a76b2e4bcbb83b6a.jpg', '', 12),
(43, '7cdeab6c5596c8f37b10a.jpg', '', 12),
(45, 'f98c1bc2a7c0a29f3ee8.jpg', '', 12),
(55, '15f1ec823966ce21df6a.jpg', '', 14),
(56, 'd1d86d73e9ab2aba4daf.jpg', 'Ram Horns - not painted', 14),
(57, 'a89819addd1105da10815e.jpg', 'Ram Horns - not painted', 14),
(58, '10b2d24103962216f1c5f.jpg', 'Fairy Horns - not painted', 14),
(59, 'b3d2c386770cf16c10bc3.jpg', 'Ram Horns with ready-made designs', 14),
(60, 'a8e8dcb26692d6aef6be.jpg', 'Fairy Horns with ready-made designs', 14),
(61, '10fceeccfa28f8ae3163.jpg', 'Fairy Horns with ready-made designs', 14),
(62, '41caa156454b23b7b6dc.jpg', 'Ram Horns with ready-made designs', 14),
(63, '43282c15310ff46ae2559.jpg', '', 15),
(64, '37c2445c4fbbbe235383.jpg', 'Devil Horns - not painted', 15),
(65, '2124d1045f983a9ff95f.jpg', 'Devil Horns with ready-made designs', 15),
(66, 'af6e9879453ee10a10323a.jpg', 'Devil Horns - not painted', 15),
(67, '3b91223a93c58a3da1d6.jpg', 'Imp Horns with ready-made designs', 15),
(68, 'e8bb4de031fd75064183.jpg', 'Imp Horns - not painted', 15),
(69, 'de7e59cee02ec988e4510.jpg', 'Imp Horns - not painted', 15),
(70, '7b37de41e11024610ac887.jpg', '', 16),
(71, '2510629b0103ee76d2b7fa.jpg', '', 16),
(72, 'f39f2529e910821daaaec.jpg', '', 16),
(73, 'e610d8910661769e7668bf.jpg', '', 17),
(74, '6b273a8241b8224accb2.jpg', '', 17),
(75, '18631109e179e3b1fc258.jpg', '', 17);

CREATE TABLE `ProductProperties` (
  `id` int NOT NULL,
  `property_id` int NOT NULL,
  `product_id` int NOT NULL,
  `value` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valueId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `ProductProperties` (`id`, `property_id`, `product_id`, `value`, `valueId`) VALUES
(3, 9, 3, '', 25),
(4, 1, 3, '', 2),
(5, 2, 3, '', 6),
(6, 4, 3, '', 15),
(8, 3, 3, '', 9),
(9, 6, 3, '', 17),
(11, 5, 4, 'Himiko Toga', NULL),
(12, 4, 4, '', 26),
(13, 9, 4, '', 25),
(14, 6, 4, '', 17),
(15, 2, 4, '', 6),
(16, 3, 4, '', 27),
(17, 5, 5, 'Zenitsu Agatsuma', NULL),
(18, 3, 5, '', 27),
(19, 9, 5, '', 25),
(21, 4, 5, '', 30),
(22, 1, 6, '', NULL),
(23, 2, 6, '', 6),
(24, 4, 6, '', 30),
(25, 5, 6, 'Tanjirou Kamado', NULL),
(26, 3, 6, '', 10),
(27, 6, 6, '', 17),
(28, 9, 6, '', 25),
(29, 1, 7, '', 3),
(30, 2, 7, '', 6),
(31, 3, 7, '', 10),
(32, 3, 5, '', 10),
(33, 3, 9, '', 28),
(34, 1, 9, '', 3),
(35, 2, 9, '', 6),
(36, 4, 9, '', 31),
(38, 1, 10, '', 3),
(39, 4, 10, '', 32),
(40, 1, 10, '', 4),
(41, 2, 10, '', 6),
(42, 3, 10, '', 33),
(43, 3, 10, '', 34),
(44, 1, 11, '', 3),
(45, 1, 11, '', 4),
(46, 4, 11, '', 32),
(47, 3, 11, '', 12),
(48, 3, 11, '', 33),
(49, 5, 11, 'Link ', NULL),
(50, 1, 12, '', 3),
(51, 5, 12, 'Zelda', NULL),
(52, 4, 12, '', 32),
(53, 2, 12, '', 6),
(54, 1, 12, '', 4),
(55, 1, 13, '', 2),
(56, 2, 13, '', 6),
(57, 5, 13, 'Eda Clawthorne', NULL),
(58, 3, 13, '', 13),
(59, 3, 13, '', 27),
(60, 6, 13, '', 18),
(62, 9, 13, '', 25),
(63, 4, 13, '', 37),
(64, 3, 13, '', 36),
(65, 3, 13, '', 35),
(66, 1, 14, '', 39),
(67, 9, 14, '', 40),
(68, 3, 14, '', 9),
(69, 2, 14, '', 6),
(70, 3, 14, '', 14),
(71, 3, 14, '', 13),
(72, 3, 15, '', 9),
(73, 1, 15, '', 39),
(74, 2, 15, '', 6),
(75, 9, 15, '', 40),
(76, 9, 15, '', 41),
(77, 9, 16, '', 40),
(78, 9, 16, '', 41),
(79, 3, 16, '', 10),
(80, 2, 16, '', 6),
(81, 1, 16, '', 39),
(82, 1, 16, '', 5),
(83, 1, 17, '', 5),
(84, 2, 17, '', 6),
(85, 3, 17, '', 13),
(86, 3, 17, '', 10),
(87, 9, 17, '', 40),
(88, 9, 17, '', 41),
(89, 3, 17, '', 42);

CREATE TABLE `Property` (
  `id` int NOT NULL,
  `updated` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_list` tinyint(1) NOT NULL DEFAULT '0',
  `order` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Property` (`id`, `updated`, `name`, `is_list`, `order`) VALUES
(1, '2023-09-25 07:33:20.527', 'Sort', 1, 1),
(2, '2023-09-25 07:34:21.376', 'In Stock', 1, 2),
(3, '2023-09-25 07:42:25.764', 'Color', 1, 5),
(4, '2023-09-25 07:42:08.025', 'Fendom', 1, 3),
(5, '2023-09-26 17:58:11.440', 'Character', 0, 4),
(6, '2023-09-25 07:37:34.219', 'Wig size', 1, 6),
(7, '2023-09-25 07:42:42.585', 'Size', 1, 6),
(8, '2023-09-25 07:42:44.363', 'Armor size', 0, 6),
(9, '2023-09-25 07:42:45.927', 'Materials', 1, 7);

CREATE TABLE `PropertyValues` (
  `id` int NOT NULL,
  `updated` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `value` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `property_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `PropertyValues` (`id`, `updated`, `value`, `is_active`, `property_id`) VALUES
(2, '2023-09-25 07:33:36.650', 'Lacefront', 1, 1),
(3, '2023-09-25 07:33:49.155', 'Clothes', 1, 1),
(4, '2023-09-25 07:33:58.487', 'Armor', 1, 1),
(5, '2023-09-25 07:34:07.373', 'Helmet', 1, 1),
(6, '2023-09-25 07:34:33.008', 'Made-To-Order', 1, 2),
(7, '2023-09-25 07:34:42.531', 'Ready', 1, 2),
(8, '2023-09-25 07:34:50.485', 'Pre-owen', 1, 2),
(9, '2023-09-25 07:35:42.761', 'Black', 1, 3),
(10, '2023-09-25 07:35:46.357', 'Red', 1, 3),
(11, '2023-09-25 07:35:49.724', 'Green', 1, 3),
(12, '2023-09-25 07:35:54.424', 'Blue', 1, 3),
(13, '2023-09-25 07:35:59.277', 'White', 1, 3),
(14, '2023-09-25 07:36:07.988', 'Pink', 1, 3),
(15, '2023-09-25 07:36:41.124', 'Genshin Impact', 1, 4),
(16, '2023-09-25 07:37:07.516', 'Xiao / Vigilant Yaksha', 1, 5),
(17, '2023-09-25 07:37:40.181', 'Short', 1, 6),
(18, '2023-09-25 07:37:45.625', 'Long', 1, 6),
(19, '2023-09-25 07:38:04.399', 'XS', 1, 7),
(20, '2023-09-25 07:38:06.876', 'S', 1, 7),
(21, '2023-09-25 07:38:11.295', 'M', 1, 7),
(22, '2023-09-25 07:38:19.970', 'L', 1, 7),
(23, '2023-09-25 07:38:26.133', 'XL', 1, 7),
(24, '2023-09-25 07:38:31.654', 'XXL', 1, 7),
(25, '2023-09-25 07:40:10.872', 'Synthetic wig', 1, 9),
(26, '2023-09-26 17:59:42.714', 'Boku no Hero Academia', 1, 4),
(27, '2023-09-26 18:20:41.100', 'Blond', 1, 3),
(28, '2023-09-26 18:25:51.110', 'Yellow', 1, 3),
(30, '2023-09-26 18:27:51.022', 'Demon Slayer: Kimetsu no Yaiba', 1, 4),
(31, '2023-09-30 17:33:08.937', 'Fire Emblem ', 1, 4),
(32, '2023-09-30 17:34:41.354', 'The legend of Zelda', 1, 4),
(33, '2023-09-30 17:51:03.688', 'brown ', 1, 3),
(34, '2023-09-30 17:51:31.574', 'burgundy', 1, 3),
(35, '2023-12-12 09:45:00.457', 'Grey', 1, 3),
(36, '2023-12-12 09:45:25.587', 'Ash color', 1, 3),
(37, '2023-12-12 09:46:11.343', 'The Owl House', 1, 4),
(38, '2023-12-12 10:15:23.628', 'Temporarily unavailable', 1, 2),
(39, '2023-12-12 10:22:32.570', 'Horns', 1, 1),
(40, '2023-12-12 10:23:56.167', 'Eva Foam', 1, 9),
(41, '2023-12-12 10:24:05.757', 'Paint', 1, 9),
(42, '2023-12-12 10:57:34.726', 'Gold', 1, 3);

CREATE TABLE `Setting` (
  `id` int NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Setting` (`id`, `name`, `value`) VALUES
(1, 'Email', 'Neocosplay1@gmail.com'),
(2, 'Boosty', 'https://boosty.to/valetz'),
(3, 'Instagramm', 'https://www.instagram.com/neocosplayshop'),
(4, 'InstaNick', '@NeocosplayShop'),
(5, 'Border', 'PINK'),
(6, 'Border small', 'GREEN'),
(7, 'Border popular', 'WHITE'),
(8, 'Border sales', 'PINK'),
(9, 'Order subject', 'NEW ORDER NeoCosplayShop'),
(10, 'Order text', 'Hello NeoCosplayShop!\n\nI want to order [link].\n\nMy size is\n\nKind regards,\n');

CREATE TABLE `User` (
  `id` int NOT NULL,
  `created` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('USER','ADMIN') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `avatar` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lockcount` int NOT NULL DEFAULT '0',
  `lockflg` tinyint(1) NOT NULL DEFAULT '0',
  `lastlogin` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `User` (`id`, `created`, `updated`, `email`, `password`, `role`, `avatar`, `lockcount`, `lockflg`, `lastlogin`) VALUES
(1, '2023-09-24 18:20:31.829', '2023-12-23 13:02:22.042', 'test@test.com', '$argon2id$v=19$m=65536,t=3,p=4$ybW4dnjHD6DZoCiteUtL3Q$pZmvXc0UbdKslV8ZZnFX05p6Yxomb014PRCIsahz1lA', 'ADMIN', '/images/noavatar.png', 0, 0, '2023-12-23 13:02:22.041');


ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `CategoryProperties`
  ADD PRIMARY KEY (`category_id`,`property_id`),
  ADD KEY `CategoryProperties_property_id_fkey` (`property_id`);

ALTER TABLE `Product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Product_main_image_id_key` (`main_image_id`),
  ADD KEY `Product_category_id_fkey` (`category_id`);

ALTER TABLE `ProductDescription`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductDescription_product_id_fkey` (`product_id`);

ALTER TABLE `ProductImage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductImage_product_id_fkey` (`product_id`);

ALTER TABLE `ProductProperties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductProperties_property_id_fkey` (`property_id`),
  ADD KEY `ProductProperties_product_id_fkey` (`product_id`),
  ADD KEY `ProductProperties_valueId_fkey` (`valueId`);

ALTER TABLE `Property`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `PropertyValues`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PropertyValues_property_id_fkey` (`property_id`);

ALTER TABLE `Setting`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Setting_name_key` (`name`);

ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);



ALTER TABLE `Category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `Product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `ProductDescription`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `ProductImage`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `ProductProperties`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `Property`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `PropertyValues`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `Setting`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `User`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;
