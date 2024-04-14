-- MySQL dump 10.13  Distrib 8.3.0, for Win64 (x86_64)
--
-- Host: mysql.agh.edu.pl    Database: szymont
-- ------------------------------------------------------
-- Server version	5.5.5-10.5.23-MariaDB-0+deb11u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint(20) NOT NULL,
  `gender` enum('MALE','FEMALE') DEFAULT NULL,
  `max_age` int(11) DEFAULT NULL,
  `max_weight` int(11) DEFAULT NULL,
  `min_age` int(11) DEFAULT NULL,
  `min_weight` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `season_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6ovrk8owu4v43nnljb10smghd` (`season_id`),
  CONSTRAINT `FK6ovrk8owu4v43nnljb10smghd` FOREIGN KEY (`season_id`) REFERENCES `season` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'MALE',90,80,24,60,'Senior',1),(2,'FEMALE',90,80,24,60,'Senior',1),(3,'MALE',90,80,24,60,'Senior',2),(4,'FEMALE',90,80,24,60,'Senior',2),(5,'MALE',90,80,24,60,'Senior',3),(6,'FEMALE',90,80,24,60,'Senior',3),(7,'MALE',90,80,24,60,'Senior',4),(8,'FEMALE',90,80,24,60,'Senior',4);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_seq`
--

DROP TABLE IF EXISTS `category_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_seq`
--

LOCK TABLES `category_seq` WRITE;
/*!40000 ALTER TABLE `category_seq` DISABLE KEYS */;
INSERT INTO `category_seq` VALUES (101);
/*!40000 ALTER TABLE `category_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club`
--

DROP TABLE IF EXISTS `club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `club` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_obh7q4yqh38kicj65tm0wd4t4` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club`
--

LOCK TABLES `club` WRITE;
/*!40000 ALTER TABLE `club` DISABLE KEYS */;
/*!40000 ALTER TABLE `club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club_seq`
--

DROP TABLE IF EXISTS `club_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `club_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club_seq`
--

LOCK TABLES `club_seq` WRITE;
/*!40000 ALTER TABLE `club_seq` DISABLE KEYS */;
INSERT INTO `club_seq` VALUES (1);
/*!40000 ALTER TABLE `club_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `id` bigint(20) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `nr` int(11) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location_seq`
--

DROP TABLE IF EXISTS `location_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location_seq`
--

LOCK TABLES `location_seq` WRITE;
/*!40000 ALTER TABLE `location_seq` DISABLE KEYS */;
INSERT INTO `location_seq` VALUES (1);
/*!40000 ALTER TABLE `location_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owned_clubs`
--

DROP TABLE IF EXISTS `owned_clubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owned_clubs` (
  `trainer_id` bigint(20) NOT NULL,
  `club_id` bigint(20) NOT NULL,
  PRIMARY KEY (`trainer_id`,`club_id`),
  KEY `FK6fe2cdargg3jpodn0mum1tra0` (`club_id`),
  CONSTRAINT `FK6fe2cdargg3jpodn0mum1tra0` FOREIGN KEY (`club_id`) REFERENCES `club` (`id`),
  CONSTRAINT `FK7bhy7luw1vygl5nx0ygm3cvnl` FOREIGN KEY (`trainer_id`) REFERENCES `website_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owned_clubs`
--

LOCK TABLES `owned_clubs` WRITE;
/*!40000 ALTER TABLE `owned_clubs` DISABLE KEYS */;
/*!40000 ALTER TABLE `owned_clubs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `season`
--

DROP TABLE IF EXISTS `season`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `season` (
  `id` bigint(20) NOT NULL,
  `end` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `start` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_h8gpicoby9c670n138txw7ft0` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `season`
--

LOCK TABLES `season` WRITE;
/*!40000 ALTER TABLE `season` DISABLE KEYS */;
INSERT INTO `season` VALUES (1,'2024-12-12','Sezon Jesień 2024','2024-09-01',NULL,NULL),(2,'2024-05-12','Sezon Wiosna 2024','2024-03-21',NULL,NULL),(3,'2023-05-12','Sezon Wiosna 2023','2023-03-21',NULL,NULL),(4,'2023-12-12','Sezon Jesień 2023','2023-10-21',NULL,NULL);
/*!40000 ALTER TABLE `season` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `season_seq`
--

DROP TABLE IF EXISTS `season_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `season_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `season_seq`
--

LOCK TABLES `season_seq` WRITE;
/*!40000 ALTER TABLE `season_seq` DISABLE KEYS */;
INSERT INTO `season_seq` VALUES (101);
/*!40000 ALTER TABLE `season_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournament`
--

DROP TABLE IF EXISTS `tournament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tournament` (
  `id` bigint(20) NOT NULL,
  `contest_end` datetime(6) DEFAULT NULL,
  `contest_start` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `register_end` datetime(6) DEFAULT NULL,
  `register_start` datetime(6) DEFAULT NULL,
  `location_id` bigint(20) DEFAULT NULL,
  `season_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ckci29rot0jvxafvjjl2mdldn` (`location_id`),
  KEY `FKqsqtug0epf7q279wvoohp0hib` (`season_id`),
  CONSTRAINT `FKpomwm25ew7l9bfpv1stev666c` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`),
  CONSTRAINT `FKqsqtug0epf7q279wvoohp0hib` FOREIGN KEY (`season_id`) REFERENCES `season` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament`
--

LOCK TABLES `tournament` WRITE;
/*!40000 ALTER TABLE `tournament` DISABLE KEYS */;
/*!40000 ALTER TABLE `tournament` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournament_categories`
--

DROP TABLE IF EXISTS `tournament_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tournament_categories` (
  `tournament_id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  PRIMARY KEY (`tournament_id`,`category_id`),
  KEY `FK79kpu2drrvwvbqeuwbflxtkdl` (`category_id`),
  CONSTRAINT `FK79kpu2drrvwvbqeuwbflxtkdl` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FKpetx36afnykja0gl7ok6wa6qt` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament_categories`
--

LOCK TABLES `tournament_categories` WRITE;
/*!40000 ALTER TABLE `tournament_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `tournament_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournament_seq`
--

DROP TABLE IF EXISTS `tournament_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tournament_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament_seq`
--

LOCK TABLES `tournament_seq` WRITE;
/*!40000 ALTER TABLE `tournament_seq` DISABLE KEYS */;
INSERT INTO `tournament_seq` VALUES (1);
/*!40000 ALTER TABLE `tournament_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `website_user`
--

DROP TABLE IF EXISTS `website_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `website_user` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_role` enum('ADMIN','NATIONAL_TRAINER','CLUB_TRAINER','UNREGISTERED') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6vgos06i6oubcwsgvg9vr8hp3` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `website_user`
--

LOCK TABLES `website_user` WRITE;
/*!40000 ALTER TABLE `website_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `website_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `website_user_seq`
--

DROP TABLE IF EXISTS `website_user_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `website_user_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `website_user_seq`
--

LOCK TABLES `website_user_seq` WRITE;
/*!40000 ALTER TABLE `website_user_seq` DISABLE KEYS */;
INSERT INTO `website_user_seq` VALUES (1);
/*!40000 ALTER TABLE `website_user_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wrestler`
--

DROP TABLE IF EXISTS `wrestler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wrestler` (
  `id` bigint(20) NOT NULL,
  `birthday` date DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `gender` enum('MALE','FEMALE') DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `club_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfrvc413qnfdip2slf7rhe81mm` (`club_id`),
  CONSTRAINT `FKfrvc413qnfdip2slf7rhe81mm` FOREIGN KEY (`club_id`) REFERENCES `club` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wrestler`
--

LOCK TABLES `wrestler` WRITE;
/*!40000 ALTER TABLE `wrestler` DISABLE KEYS */;
/*!40000 ALTER TABLE `wrestler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wrestler_seq`
--

DROP TABLE IF EXISTS `wrestler_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wrestler_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wrestler_seq`
--

LOCK TABLES `wrestler_seq` WRITE;
/*!40000 ALTER TABLE `wrestler_seq` DISABLE KEYS */;
INSERT INTO `wrestler_seq` VALUES (1);
/*!40000 ALTER TABLE `wrestler_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wrestlers_enrollment`
--

DROP TABLE IF EXISTS `wrestlers_enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wrestlers_enrollment` (
  `category_id` bigint(20) NOT NULL,
  `tournament_id` bigint(20) NOT NULL,
  `wrestler_id` bigint(20) NOT NULL,
  PRIMARY KEY (`category_id`,`tournament_id`,`wrestler_id`),
  KEY `FKae7irtaqn7ciiokwpq246fnj5` (`tournament_id`),
  KEY `FK4livc1ry1o61exkdfp1edxb07` (`wrestler_id`),
  CONSTRAINT `FK4livc1ry1o61exkdfp1edxb07` FOREIGN KEY (`wrestler_id`) REFERENCES `wrestler` (`id`),
  CONSTRAINT `FK6bdixdyjpguakrmb5txvugibl` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FKae7irtaqn7ciiokwpq246fnj5` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wrestlers_enrollment`
--

LOCK TABLES `wrestlers_enrollment` WRITE;
/*!40000 ALTER TABLE `wrestlers_enrollment` DISABLE KEYS */;
/*!40000 ALTER TABLE `wrestlers_enrollment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-21 18:13:10
