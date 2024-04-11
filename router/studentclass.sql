-- MySQL dump 10.13  Distrib 5.7.31, for Linux (x86_64)
--
-- Host: localhost    Database: aarambhdb_development
-- ------------------------------------------------------
-- Server version	5.7.31-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `studentclass`
--

DROP TABLE IF EXISTS `studentclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `studentclass` (
  `ClassId` int(11) NOT NULL AUTO_INCREMENT,
  `StudentClass` varchar(255) NOT NULL,
  `StatusId` int(11) DEFAULT NULL,
  `CreatedById` bigint(20) DEFAULT NULL,
  `ModifiedById` bigint(20) DEFAULT NULL,
  `CreationDate` date DEFAULT NULL,
  `ModificationDate` date DEFAULT NULL,
  PRIMARY KEY (`ClassId`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentclass`
--

LOCK TABLES `studentclass` WRITE;
/*!40000 ALTER TABLE `studentclass` DISABLE KEYS */;
INSERT INTO `studentclass` VALUES (1,'6th ',1,NULL,NULL,'2020-07-02',NULL),(2,'7th',1,1,1,'2020-03-06','2020-03-06'),(3,'8th',1,1,1,'2020-03-06','2020-03-06'),(4,'9th',1,1,1,'2020-03-06','2020-03-06'),(5,'10th',1,1,1,'2020-03-06','2020-03-06'),(6,'11th',1,1,1,'2020-03-06','2020-03-06'),(7,'12th',1,1,1,'2020-03-06','2020-03-06'),(12,'1st',1,1,1,'2020-03-06','2020-03-06'),(13,'2nd',1,1,1,'2020-03-06','2020-03-06'),(14,'3rd',1,1,1,'2020-03-06','2020-03-06'),(15,'4th',1,1,1,'2020-03-06','2020-03-06'),(16,'5th',1,1,1,'2020-03-06','2020-03-06'),(17,'19th',0,NULL,NULL,'2020-07-07',NULL),(18,'13th',0,NULL,NULL,'2020-07-07',NULL),(19,'13th',0,NULL,NULL,'2020-07-07',NULL),(20,'13th',0,NULL,NULL,'2020-07-07',NULL),(21,'13',0,NULL,NULL,'2020-07-07',NULL),(22,'14th',0,NULL,NULL,'2020-07-07',NULL),(23,'14th',0,NULL,NULL,'2020-07-13',NULL),(24,'15',0,NULL,NULL,'2020-07-07',NULL),(25,'                    ',0,NULL,NULL,'2020-07-08',NULL),(26,'15th',0,NULL,NULL,'2020-07-10',NULL),(27,'20',0,NULL,NULL,'2020-07-10',NULL),(28,'21st',0,NULL,NULL,'2020-07-13',NULL),(29,'KG1',1,1,1,'2020-07-18','2020-07-18'),(30,'KG2',1,1,1,'2020-07-18','2020-07-18'),(31,'LKG',1,1,NULL,'2020-07-22',NULL),(32,'UKG',1,1,NULL,'2020-07-22',NULL),(33,'19',0,NULL,NULL,'2020-08-07',NULL),(34,'25',0,NULL,NULL,'2020-08-07',NULL);
/*!40000 ALTER TABLE `studentclass` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-13 17:04:31
