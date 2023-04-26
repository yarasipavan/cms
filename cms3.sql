CREATE DATABASE  IF NOT EXISTS `cms` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cms`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: cms
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `authlogin`
--

DROP TABLE IF EXISTS `authlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authlogin` (
  `emailid` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`emailid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authlogin`
--

LOCK TABLES `authlogin` WRITE;
/*!40000 ALTER TABLE `authlogin` DISABLE KEYS */;
INSERT INTO `authlogin` VALUES ('civil@gmail.com','Pavan (Civil Works Head)','Pavan@123','Civil'),('plumbing@gmail.com','Pavan(Plumbing Head)','password','Plumbing'),('r170567@rguktrkv.ac.in','N Reddemma','reddy','Electrical'),('r170570@rguktrkv.ac.in','Tippiri Chandana','candy','Electrical'),('r170865@rguktrkv.ac.in','Electrical Department','admin','Electrical'),('r170981@rguktrkv.ac.in','Y Pavan Kumar','password','Electrical'),('singamvedaprakash1234@gmail.com','Veda Prakash','admin',NULL);
/*!40000 ALTER TABLE `authlogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `civilcomplaints`
--

DROP TABLE IF EXISTS `civilcomplaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `civilcomplaints` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `mailId` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `complaint` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `updateddate` datetime DEFAULT NULL,
  `count` int DEFAULT NULL,
  `workerId` int DEFAULT NULL,
  `description` text,
  `locationdes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `civilcomplaints`
--

LOCK TABLES `civilcomplaints` WRITE;
/*!40000 ALTER TABLE `civilcomplaints` DISABLE KEYS */;
INSERT INTO `civilcomplaints` VALUES (1,'r170981@rguktrkv.ac.in','2023-02-20 12:13:37','Corridor Cleaning','BH1','completed','2023-02-20 12:13:37',0,5,'corridor clening','BH1 backside'),(2,'r170981@rguktrkv.ac.in','2023-02-20 20:31:01','Washroom cleaning','BH2','closed','2023-02-20 20:31:01',0,6,'washroom cleaning','bh2 backside s3'),(3,'r170981@rguktrkv.ac.in','2023-02-20 20:46:31','Washroom cleaning','BH1','closed','2023-02-20 20:46:31',0,5,'washroom cleaning','BH1 backside '),(4,'r170981@rguktrkv.ac.in','2023-02-20 21:04:48','Washroom cleaning','BH1','pending','2023-02-20 21:04:48',0,5,'washroom clean','bh1 front side'),(5,'r170981@rguktrkv.ac.in','2023-02-20 21:06:33','Washroom cleaning','BH1','inprogress','2023-02-20 21:06:33',0,5,'washroom cleaning 2','BH1 backside ');
/*!40000 ALTER TABLE `civilcomplaints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `civildutyassignment`
--

DROP TABLE IF EXISTS `civildutyassignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `civildutyassignment` (
  `lname` varchar(255) DEFAULT NULL,
  `wid` int DEFAULT NULL,
  KEY `lname` (`lname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `civildutyassignment`
--

LOCK TABLES `civildutyassignment` WRITE;
/*!40000 ALTER TABLE `civildutyassignment` DISABLE KEYS */;
INSERT INTO `civildutyassignment` VALUES ('BH2',6),('GH1',6),('BH1',5),('GH2',1);
/*!40000 ALTER TABLE `civildutyassignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `civilinventory`
--

DROP TABLE IF EXISTS `civilinventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `civilinventory` (
  `itemid` int NOT NULL AUTO_INCREMENT,
  `itemname` varchar(255) DEFAULT NULL,
  `itemdescription` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`itemid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `civilinventory`
--

LOCK TABLES `civilinventory` WRITE;
/*!40000 ALTER TABLE `civilinventory` DISABLE KEYS */;
INSERT INTO `civilinventory` VALUES (1,'pine oil','floor cleaner',9),(2,'cocunut  broom stick -small','cocunut  broom stick (small size)',15);
/*!40000 ALTER TABLE `civilinventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `civillocations`
--

DROP TABLE IF EXISTS `civillocations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `civillocations` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `civillocations`
--

LOCK TABLES `civillocations` WRITE;
/*!40000 ALTER TABLE `civillocations` DISABLE KEYS */;
INSERT INTO `civillocations` VALUES ('BH1','Boys Hostel 1'),('BH2','Boys Hostel 2'),('GH1','Girls Hostel 1'),('GH2','Girls Hostel 2');
/*!40000 ALTER TABLE `civillocations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `civiltransactions`
--

DROP TABLE IF EXISTS `civiltransactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `civiltransactions` (
  `cid` int DEFAULT NULL,
  `itemid` varchar(45) NOT NULL,
  `quantity` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `civiltransactions`
--

LOCK TABLES `civiltransactions` WRITE;
/*!40000 ALTER TABLE `civiltransactions` DISABLE KEYS */;
INSERT INTO `civiltransactions` VALUES (1,'1','1'),(2,'None',NULL),(3,'None',NULL);
/*!40000 ALTER TABLE `civiltransactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `civilworkers`
--

DROP TABLE IF EXISTS `civilworkers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `civilworkers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `cstatus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `civilworkers`
--

LOCK TABLES `civilworkers` WRITE;
/*!40000 ALTER TABLE `civilworkers` DISABLE KEYS */;
INSERT INTO `civilworkers` VALUES (1,'pavan','active'),(2,'kumar','inactive'),(3,'veda','inactive'),(4,'ram','inactive'),(5,'veda','active'),(6,'worker1','active');
/*!40000 ALTER TABLE `civilworkers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dutyassignment`
--

DROP TABLE IF EXISTS `dutyassignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dutyassignment` (
  `lname` varchar(255) DEFAULT NULL,
  `eid` int DEFAULT NULL,
  KEY `dutyassignment_ibfk_1` (`lname`),
  KEY `dutyassignment_ibfk_2` (`eid`),
  CONSTRAINT `dutyassignment_ibfk_1` FOREIGN KEY (`lname`) REFERENCES `locations` (`name`) ON DELETE CASCADE,
  CONSTRAINT `dutyassignment_ibfk_2` FOREIGN KEY (`eid`) REFERENCES `electricians` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dutyassignment`
--

LOCK TABLES `dutyassignment` WRITE;
/*!40000 ALTER TABLE `dutyassignment` DISABLE KEYS */;
INSERT INTO `dutyassignment` VALUES ('BH1',37),('BH2',41),('GH1',37),('GH2',36),('AB1',38),('AB2',42),('RH1',38);
/*!40000 ALTER TABLE `dutyassignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electriccomplaints`
--

DROP TABLE IF EXISTS `electriccomplaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electriccomplaints` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `mailid` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `complaint` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `updateddate` datetime DEFAULT NULL,
  `count` int DEFAULT NULL,
  `eid` int DEFAULT NULL,
  `description` text,
  `locationdes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electriccomplaints`
--

LOCK TABLES `electriccomplaints` WRITE;
/*!40000 ALTER TABLE `electriccomplaints` DISABLE KEYS */;
INSERT INTO `electriccomplaints` VALUES (1,'r170865@rguktrkv.ac.in','2022-09-19 12:40:52','Socket','AB1','closed','2022-09-25 09:02:21',1,38,'Problem','Near AB1'),(2,'r170865@rguktrkv.ac.in','2022-09-19 20:31:18','Socket','BH1','closed','2022-09-25 09:02:26',1,37,'Socket is not working Properly ','T-136'),(3,'r170570@rguktrkv.ac.in','2022-09-19 20:32:17','Bulb','GH2','closed','2022-09-19 20:32:17',0,36,'Bulb is Not Glowing','T-130'),(4,'r170570@rguktrkv.ac.in','2022-09-19 20:32:59','Fan','AB2','closed','2022-09-19 20:32:59',0,42,'Fan is Not working ','S-18 class Second Fan from last'),(5,'r170981@rguktrkv.ac.in','2022-09-19 20:34:08','Other','BH2','completed','2022-09-19 20:34:08',0,41,'Power is not Supplying to Dorm','S-98'),(6,'r170865@rguktrkv.ac.in','2022-09-21 20:44:27','Socket','AB1','completed','2022-09-21 20:44:27',0,38,'adsad','dasdsa'),(7,'r170981@rguktrkv.ac.in','2022-11-29 09:54:14','Fan','BH2','closed','2022-11-30 16:08:29',1,41,'fan is making noise','dorm: s-78'),(8,'r170981@rguktrkv.ac.in','2022-11-29 18:05:59','Bulb','BH2','completed','2022-11-29 18:05:59',0,41,'bulb  not working','s-78'),(9,'r170981@rguktrkv.ac.in','2022-11-29 21:08:53','Bulb','BH2','closed','2022-11-29 21:08:53',0,41,'tube light is not working','Dorm: S-78 (back-side)'),(10,'r170981@rguktrkv.ac.in','2022-11-29 21:10:40','Socket','BH2','closed','2022-11-29 21:10:40',0,41,'Socket is not working','Dorm: S-78( Back-side)'),(11,'r170981@rguktrkv.ac.in','2022-11-29 22:07:10','Fan','AB1','closed','2022-11-29 22:07:10',0,38,'fan problem','AB1 S-07 class'),(12,'r170981@rguktrkv.ac.in','2022-11-29 22:19:47','Fan','AB1','closed','2022-11-29 22:19:47',0,38,'asa','asa'),(13,NULL,'2022-11-29 22:55:58','Other','BH2','closed','2022-11-29 22:55:58',0,41,'switch board','qqq'),(14,NULL,'2022-11-29 22:56:54','Fan','AB1','closed','2022-11-29 22:56:54',0,38,'sqwq','wqw'),(15,NULL,'2022-11-29 22:58:18','Socket','AB2','closed','2022-11-29 22:58:18',0,42,'swsas','xsD'),(16,NULL,'2022-11-30 00:07:12','Fan','AB1','closed','2022-11-30 00:07:12',0,38,'wqw','qwqw'),(17,NULL,'2022-11-30 00:11:16','Socket','AB1','closed','2022-11-30 00:11:16',0,38,'sds','saxsd'),(18,NULL,'2022-11-30 00:21:32','Bulb','AB2','closed','2022-11-30 00:21:32',0,42,'wewe',''),(19,'r170981@rguktrkv.ac.in','2022-11-30 11:32:35','Fan','BH2','closed','2022-11-30 11:32:35',0,41,'fan is making noise','s-78'),(20,'r170981@rguktrkv.ac.in','2022-11-30 12:57:51','Socket','AB1','closed','2022-11-30 12:57:51',0,38,'',''),(21,'r170981@rguktrkv.ac.in','2022-11-30 13:39:55','Bulb','AB1','inprogress','2022-11-30 13:39:55',0,38,'',''),(22,'r170981@rguktrkv.ac.in','2022-11-30 15:06:08','Socket','BH2','closed','2022-11-30 15:06:08',0,41,'111','222'),(23,'r170981@rguktrkv.ac.in','2022-11-30 18:52:26','Fan','AB1','inprogress','2022-11-30 18:52:26',0,38,'','');
/*!40000 ALTER TABLE `electriccomplaints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electricians`
--

DROP TABLE IF EXISTS `electricians`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electricians` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `elestatus` varchar(45) DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electricians`
--

LOCK TABLES `electricians` WRITE;
/*!40000 ALTER TABLE `electricians` DISABLE KEYS */;
INSERT INTO `electricians` VALUES (36,'Veda','active'),(37,'Pavan','inactive'),(38,'Chandana','active'),(39,'Reddemma','inactive'),(40,'kn','inactive'),(41,'Pavan Kumar','active'),(42,'giri','active'),(43,'K Srikanth','active');
/*!40000 ALTER TABLE `electricians` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electricinventory`
--

DROP TABLE IF EXISTS `electricinventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electricinventory` (
  `itemid` int NOT NULL AUTO_INCREMENT,
  `itemname` varchar(255) DEFAULT NULL,
  `itemdescription` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`itemid`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electricinventory`
--

LOCK TABLES `electricinventory` WRITE;
/*!40000 ALTER TABLE `electricinventory` DISABLE KEYS */;
INSERT INTO `electricinventory` VALUES (123,'bulb','Vd',96),(124,'Wires','des',89),(125,'fan','v1',98),(126,'socket','p1',89),(127,'switches','des',99),(128,'','',1);
/*!40000 ALTER TABLE `electricinventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electrictransactions`
--

DROP TABLE IF EXISTS `electrictransactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electrictransactions` (
  `cid` int NOT NULL,
  `itemid` varchar(45) NOT NULL,
  `quantity` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electrictransactions`
--

LOCK TABLES `electrictransactions` WRITE;
/*!40000 ALTER TABLE `electrictransactions` DISABLE KEYS */;
INSERT INTO `electrictransactions` VALUES (1,'123','12'),(2,'127','1'),(2,'123','12'),(1,'123','12'),(2,'124','2'),(2,'123','12'),(4,'6','1'),(4,'123','1'),(8,'127','2'),(7,'124','2'),(10,'124','10'),(9,'124','10'),(11,'123','100'),(12,'124','2'),(13,'124','2'),(15,'125','1'),(15,'123','1'),(15,'127','1'),(14,'123','100'),(14,'123','100'),(14,'123','2'),(16,'124','12'),(16,'125','11'),(16,'126','122'),(16,'127','9'),(16,'123','762'),(17,'124','1'),(17,'125','1'),(17,'126','1'),(17,'127','1'),(17,'123','1'),(18,'125','1'),(18,'123','2'),(19,'123','1'),(19,'123','666'),(19,'123','1'),(20,'124','10'),(20,'124','1'),(20,'124','9'),(20,'126','10'),(22,'None',NULL),(7,'None',NULL),(1,'None',NULL);
/*!40000 ALTER TABLE `electrictransactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES ('AB1','Ab1'),('AB2','Ab2'),('BH1','Bh1'),('BH2','Bh2'),('GH1','Gh1'),('GH2','Gh2'),('RH1','adas');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plumbers`
--

DROP TABLE IF EXISTS `plumbers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plumbers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `pstatus` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plumbers`
--

LOCK TABLES `plumbers` WRITE;
/*!40000 ALTER TABLE `plumbers` DISABLE KEYS */;
INSERT INTO `plumbers` VALUES (3,'Kunchala Sreekanth','inactive'),(4,'YPKR','active'),(5,'k Sreekanth','inactive'),(6,'Veda','active'),(7,'tpkr','inactive'),(8,'plumber1','active');
/*!40000 ALTER TABLE `plumbers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plumbingcomplaints`
--

DROP TABLE IF EXISTS `plumbingcomplaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plumbingcomplaints` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `mailid` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `complaint` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `updateddate` datetime DEFAULT NULL,
  `count` int DEFAULT NULL,
  `pid` int DEFAULT NULL,
  `description` text,
  `locationdes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plumbingcomplaints`
--

LOCK TABLES `plumbingcomplaints` WRITE;
/*!40000 ALTER TABLE `plumbingcomplaints` DISABLE KEYS */;
INSERT INTO `plumbingcomplaints` VALUES (1,'r170981@rguktrkv.ac.in','2022-11-30 18:57:22','Tap','AB-1','completed','2022-12-05 10:07:59',1,3,'qq','ww'),(3,'r170981@rguktrkv.ac.in','2022-11-30 22:54:52','Tap','BH-2','completed','2022-11-30 22:54:52',0,4,'tap broken','s-3 washroom'),(4,'r170981@rguktrkv.ac.in','2022-11-30 22:57:25','Water Leakage','BH-2','completed','2022-11-30 22:57:25',0,4,'pipe broken','Bh2 backside'),(5,'r170981@rguktrkv.ac.in','2022-12-05 10:12:46','Water Leakage','AB-2','inprogress','2023-02-20 10:54:11',1,4,'',''),(6,'r170981@rguktrkv.ac.in','2023-02-20 10:45:56','Water Scarcity ','BH-2','completed','2023-02-20 10:45:56',0,4,'water scarcity at bh2 backside washrooms','water scarcity at bh2 backside washrooms');
/*!40000 ALTER TABLE `plumbingcomplaints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plumbingdutyassignment`
--

DROP TABLE IF EXISTS `plumbingdutyassignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plumbingdutyassignment` (
  `lname` varchar(255) NOT NULL,
  `pid` varchar(11) NOT NULL,
  KEY `location_foreign` (`lname`),
  CONSTRAINT `location_foreign` FOREIGN KEY (`lname`) REFERENCES `plumbinglocations` (`name`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plumbingdutyassignment`
--

LOCK TABLES `plumbingdutyassignment` WRITE;
/*!40000 ALTER TABLE `plumbingdutyassignment` DISABLE KEYS */;
INSERT INTO `plumbingdutyassignment` VALUES ('AB-1','3'),('AB-2','4'),('BH-1','3'),('BH-2','4');
/*!40000 ALTER TABLE `plumbingdutyassignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plumbinginventory`
--

DROP TABLE IF EXISTS `plumbinginventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plumbinginventory` (
  `itemid` int NOT NULL AUTO_INCREMENT,
  `itemname` varchar(255) DEFAULT NULL,
  `itemdescription` text,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`itemid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plumbinginventory`
--

LOCK TABLES `plumbinginventory` WRITE;
/*!40000 ALTER TABLE `plumbinginventory` DISABLE KEYS */;
INSERT INTO `plumbinginventory` VALUES (1,'taps','plastic taps',25),(2,'pipe','UPVC 3/4 inch pipe',25),(3,'PVC pipe 3/4 inch 10 feet','PVC pipe 3/4 inch 10 feet',100),(4,'PVC pipe 1 inch 10 feet','PVC pipe 1 inch 10 feet',99),(5,'PVC pipe 3/4 inch 20 feet','PVC pipe 3/4 inch 10 feet',290);
/*!40000 ALTER TABLE `plumbinginventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plumbinglocations`
--

DROP TABLE IF EXISTS `plumbinglocations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plumbinglocations` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plumbinglocations`
--

LOCK TABLES `plumbinglocations` WRITE;
/*!40000 ALTER TABLE `plumbinglocations` DISABLE KEYS */;
INSERT INTO `plumbinglocations` VALUES ('AB-1','Academic Block - 1'),('AB-2','Academic Block - 2'),('BH-1','Boys Hostel - 1'),('BH-2','Boys Hostel -2');
/*!40000 ALTER TABLE `plumbinglocations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plumbingtransactions`
--

DROP TABLE IF EXISTS `plumbingtransactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plumbingtransactions` (
  `cid` int NOT NULL,
  `itemid` varchar(255) NOT NULL,
  `quantity` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plumbingtransactions`
--

LOCK TABLES `plumbingtransactions` WRITE;
/*!40000 ALTER TABLE `plumbingtransactions` DISABLE KEYS */;
INSERT INTO `plumbingtransactions` VALUES (1,'None',NULL),(3,'None',NULL),(4,'1','10'),(1,'2','2'),(6,'None',NULL);
/*!40000 ALTER TABLE `plumbingtransactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userlogin`
--

DROP TABLE IF EXISTS `userlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userlogin` (
  `emailid` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`emailid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlogin`
--

LOCK TABLES `userlogin` WRITE;
/*!40000 ALTER TABLE `userlogin` DISABLE KEYS */;
INSERT INTO `userlogin` VALUES ('r170567@rguktrkv.ac.in','N Reddemma','reddy'),('r170570@rguktrkv.ac.in','Tippiri Chandana','candy'),('r170865@rguktrkv.ac.in','Veda Prakash','admin'),('r170981@rguktrkv.ac.in','Y Pavan Kumar','password'),('singamvedaprakash1234@gmail.com','Simgam Veda Prakash','ammananna');
/*!40000 ALTER TABLE `userlogin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-05 10:26:10
