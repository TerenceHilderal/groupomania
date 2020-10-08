-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: localhost    Database: groupomania_development
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comments`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  `comments` varchar
(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY
(`id`),
  KEY `userId`
(`userId`),
  KEY `postId`
(`postId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY
(`userId`) REFERENCES `Users`
(`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY
(`postId`) REFERENCES `Posts`
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `
Comments`
VALUES
  (2, 2, 6, 'ahah', '2020-10-07 10:26:15', '2020-10-07 10:26:15'),
  (4, 1, 18, 'my first comment ', '2020-10-07 20:27:14', '2020-10-07 20:27:14');
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Posts`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `title` varchar
(255) NOT NULL,
  `content` varchar
(255) NOT NULL,
  `attachment` varchar
(255) DEFAULT NULL,
  `isModerate` tinyint
(1) DEFAULT NULL,
  `moderateBy` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY
(`id`),
  KEY `userId`
(`userId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY
(`userId`) REFERENCES `Users`
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `
Posts`
VALUES
  (3, 1, '2eme post', 'Test modération', 'http://localhost:3000/images/2JZfd.gif1601979721624.gif', 1, NULL, '2020-10-06 10:22:01', '2020-10-07 10:24:31'),
  (6, 2, 'Deuxieme post', 'mon deuxieme post', 'http://localhost:3000/images/4x5cHv2.gif1602062032788.gif', 1, 1, '2020-10-07 09:13:52', '2020-10-07 09:40:30'),
  (7, 2, 'mon troisieme post', 'mon troisieme post', 'http://localhost:3000/images/7J6GP.gif1602067030084.gif', 1, NULL, '2020-10-07 10:37:10', '2020-10-07 10:38:42'),
  (15, 1, 'charge de com', 'charge de com', 'http://localhost:3000/images/0nvq3Cz.gif1602072370963.gif', 1, NULL, '2020-10-07 12:06:10', '2020-10-07 17:09:21'),
  (18, 1, 'test reloadt', 'test reload', 'http://localhost:3000/images/gif-anime.gif1602091263976.gif', 1, NULL, '2020-10-07 17:21:03', '2020-10-07 17:47:44'),
  (22, 2, 'titre', 'contenu', 'http://localhost:3000/images/gifanime.gif1602109122489.gif', 1, NULL, '2020-10-07 22:18:42', '2020-10-07 22:20:57');
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta`
(
  `name` varchar
(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY
(`name`),
  UNIQUE KEY `name`
(`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `
SequelizeMeta`
VALUES
  ('20200829085021-create-user.js'),
  ('20200829085209-create-post.js'),
  ('20200829085314-create-comment.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar
(255) NOT NULL,
  `username` varchar
(255) NOT NULL,
  `password` varchar
(255) NOT NULL,
  `role` varchar
(255) NOT NULL,
  `isAdmin` tinyint
(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `
Users`
VALUES
  (1, 'chargecom@gmail.com', 'Chargé de Communication', '$2b$10$ASCnH4/FXqsP3RUdpcCJbOYbTXZRnRKhCzYUQysDMGLwMk/f6RCLu', 'Chargé de com', 1, '2020-10-06 10:13:51', '2020-10-06 10:25:29'),
  (2, 'terence@gmail.com', 'Térence', '$2b$10$RZiqKkGmcOS6/0xcz6TjnO3aHD6CBHtGh0uW8pZelMB3ONHEQ0WOG', 'dev junior', 0, '2020-10-06 11:56:26', '2020-10-06 11:56:26'),
  (5, 'terence1@gmail.com', 'terence1', '$2b$10$2Km9eGZsZnTkmj7Hj3h4..1scm.nq0ALW2.V0DZrHlb2Njqsg1KsW', 'dev', 0, '2020-10-07 18:24:24', '2020-10-07 18:24:24');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-08 13:44:40
