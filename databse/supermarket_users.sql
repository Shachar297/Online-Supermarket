-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: supermarket
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `identity_number` bigint NOT NULL,
  `password` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `street` varchar(45) NOT NULL,
  `user_type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`identity_number`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,NULL,'Shachar297',12345,'21f5f439db6175bb17daa4c6331d9726','jerusalem','arazim','ADMIN'),(2,NULL,NULL,'Shachar',8,'21f5f439db6175bb17daa4c6331d9726','jerusalem','arazim','CUSTOMER'),(19,NULL,NULL,'ליאור',0,'3b150bdc4b5b12bb8490f63b06fdfb50','אבו גוש','arazim','CUSTOMER'),(20,NULL,NULL,'Shachar222',316158690,'21f5f439db6175bb17daa4c6331d9726','ירושלים','ארזים','CUSTOMER'),(21,NULL,NULL,'kiko',12121212,'f8ba5b35bb025a8eb4325bed268064b5','ירושלים','arazim','CUSTOMER'),(22,NULL,NULL,'שחר',2121211,'21f5f439db6175bb17daa4c6331d9726','רמת הגולן','12','CUSTOMER'),(23,NULL,NULL,'ajr',4545678,'21f5f439db6175bb17daa4c6331d9726','ירושלים','122','CUSTOMER'),(24,NULL,NULL,'שחרשר',81931641,'21f5f439db6175bb17daa4c6331d9726','רמת הגולן','arazim','CUSTOMER'),(25,NULL,NULL,'שחר89',123456789,'21f5f439db6175bb17daa4c6331d9726','רמת הגולן','שחר','CUSTOMER'),(26,NULL,NULL,'שחר90',123456789,'b5d08f04f58e5578d54f9020eb33d8b9','ירושלים','שחר90','CUSTOMER'),(27,NULL,NULL,'שחר80',12345566,'dcf19ba8f192d3336d5fecc2e86f4950','רמת הגולן','שררר','CUSTOMER'),(28,NULL,NULL,'שחר900',12345678,'8c367231c93658b989e4f2171d6af517','ירושלים','שחר900','CUSTOMER'),(29,NULL,NULL,'שחר8000',12345678,'f1e6edc346368f0c53f77fa54ea2594c','ירושלים','שחר','CUSTOMER'),(30,NULL,NULL,'שחר787',78787878,'35e29b19b7ba98251d4d08039ab91e86','ירושלים','שחר78','CUSTOMER'),(31,NULL,NULL,'שחרשחר',12121212,'37d353af7052f6d3d45137671aeab968','רמת הגולן','1212','CUSTOMER'),(32,NULL,NULL,'ajrajr',12121212,'6449bbf2deb285dc894fc29e62721cad','ירושלים','asas','CUSTOMER'),(33,NULL,NULL,'koko',12345678,'ab0eae824fd235589e2e5b8810925e81','ירושלים','121212','CUSTOMER'),(34,NULL,NULL,'ajro',1234567,'fc583e3b4a7759c6f1cd0371ee540100','ירושלים','ajro','CUSTOMER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-15 13:16:02
