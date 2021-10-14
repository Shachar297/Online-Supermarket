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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `category_id` int NOT NULL,
  `price` bigint NOT NULL,
  `image_url` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `FK_PRODUCTS_CATEGORIES_idx` (`category_id`),
  CONSTRAINT `FK_PRODUCTS_CATEGORIES` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'White Bread',1,16,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQxVCxEkP8AZe3Ulq_n9umjmMu1fsXzdQBsA&usqp=CAU'),(2,'Pita',1,18,'https://i1.wp.com/bakery365.co.il/wp-content/uploads/2017/04/img_1317_2.jpg?resize=1200%2C751&ssl=1'),(4,'Bagget',1,15,'https://www.danybar.co.il/wp-content/uploads/2017/11/%D7%91%D7%92%D7%98.jpg'),(5,'Lafa',1,15,'https://i.pinimg.com/originals/42/c9/18/42c9184e604ebd8aa0bf3d7f48222a0a.png'),(6,'Burrekas',1,15,'https://img.mako.co.il/2014/05/22/iStock_000036393540Small_i.jpg'),(7,'Coca Cola Zero',2,8,'https://shoppy.co.il/wp-content/uploads/2020/04/%D7%A7%D7%95%D7%9C%D7%94-%D7%96%D7%99%D7%A8%D7%95.jpg'),(8,'Sprite',2,8,'https://www.britishcornershop.co.uk/img/large/SLC848.jpg'),(9,'Orange Juice',2,8,'https://markolit.co.il/wp-content/uploads/2020/03/72900010452201.jpg'),(10,'Grape Juice',2,12,'https://liquor-store.co.il/wp-content/uploads/2020/06/large-2.jpg'),(11,'Vera Water',2,8,'https://m.pricez.co.il/ProductPictures/8850389105832.jpg'),(12,'Flavored water',2,8,'https://m.pricez.co.il/ProductPictures/8850389105832.jpg'),(13,'Stake',3,32,'https://hotgrill.co.il/wp-content/uploads/2018/09/%D7%A1%D7%98%D7%99%D7%99%D7%A7.jpg'),(14,'Kabab',3,28,'https://www.100cal.co.il/Portals/0/ProductImages/mf-m26953-a-zoglovek-r-WS.JPG'),(15,'Pastrami',3,18,'https://www.soglowek.co.il/app/uploads/2017/11/hadmaya_mondini_tavor.jpg'),(16,'Brisket',3,25,'https://www.tnuva.co.il/uploads/f_5fe88f38158d5_1609076536.jpg'),(17,'Lamb Chop',3,42,'https://www.assafronen.com/wp-content/uploads/2018/09/IMG_6301-2.jpg'),(18,'Shrimp',4,40,'https://img.wcdn.co.il/f_auto,w_700/1/1/8/9/1189311-46.jpg'),(19,'Salmon Fish',4,40,'https://img.mako.co.il/2009/12/23/salmonc.jpg'),(20,'Fried Calamari',4,35,'https://shemeshnet.co.il/uploads/w-480/1441632848.9644.jpg'),(21,'Milk',5,12,'https://www.tnuva.co.il/uploads/f_5e0209cd6c130_1577191885.jpg'),(22,'Cottage',5,12,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQGamdkAFGc2PtpCiOKI_eWKXkiA6hQ27HQw&usqp=CAU'),(23,'Napoleon',5,16,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWMndU5AiXx4KYdPfeUh0bu9ZJ50v72Xi7Rg&usqp=CAU'),(24,'Choko',5,12,'https://www.yotvata.co.il/images/products/choco/bottle-1.png'),(25,'Type C Cable',6,50,'https://www.y-not.co.il/images/itempics/uploads/media_09072020151909.jpeg?rnd=.2318079?rnd=0.8431226931616125'),(26,'JBL 3',6,250,'https://d3m9l0v76dty0.cloudfront.net/system/photos/4442265/original/e79e35e6ca21d6d64768a01e3dbe5f3e.jpg'),(27,'Mini Bar',6,400,'https://sc02.alicdn.com/kf/HTB1GtpIXUvrK1RjSspcq6zzSXXaM.jpg'),(28,'Broom',7,20,'https://www.refinery29.com/images/9396739.jpg'),(29,'Plastic Chair',7,25,'https://www.pmarket.co.il/images/itempics/259368_270520191557581_large.jpg'),(30,'Waffle',1,27,'https://saar-surprise.co.il/wp-content/uploads/2019/06/%D7%95%D7%95%D7%A4%D7%9C-%D7%91%D7%9C%D7%92%D7%99-e1562144107316.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
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
