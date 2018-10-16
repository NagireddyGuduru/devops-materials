-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: localhost    Database: bnppmtape
-- ------------------------------------------------------
-- Server version	5.6.22-log

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
-- Table structure for table `account`
--
CREATE DATABASE IF NOT EXISTS bnppmtape;
USE bnppmtape;

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'Default_Account');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_project_details`
--

DROP TABLE IF EXISTS `account_project_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_project_details` (
  `ACCOUNT_id` int(11) NOT NULL,
  `projects_PROJECT_ID` int(11) NOT NULL,
  PRIMARY KEY (`ACCOUNT_id`,`projects_PROJECT_ID`),
  UNIQUE KEY `UK_6jqjkhhnt8g7ghfbag6xd5ju4` (`projects_PROJECT_ID`),
  CONSTRAINT `FK_6jqjkhhnt8g7ghfbag6xd5ju4` FOREIGN KEY (`projects_PROJECT_ID`) REFERENCES `project_details` (`PROJECT_ID`),
  CONSTRAINT `FK_s9mjd9qs61qf5ojwnr21ki5gt` FOREIGN KEY (`ACCOUNT_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_project_details`
--

LOCK TABLES `account_project_details` WRITE;
/*!40000 ALTER TABLE `account_project_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_project_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_token`
--

DROP TABLE IF EXISTS `auth_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_token` (
  `AUTH_TOKEN_ID` int(11) NOT NULL AUTO_INCREMENT,
  `expirationDate` datetime DEFAULT NULL,
  `timeCreated` datetime DEFAULT NULL,
  `token` varchar(36) DEFAULT NULL,
  `user_id` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`AUTH_TOKEN_ID`),
  KEY `FK_aiqc20kpjasth5bxogsragoif` (`user_id`),
  CONSTRAINT `FK_aiqc20kpjasth5bxogsragoif` FOREIGN KEY (`user_id`) REFERENCES `user_mtape` (`EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_token`
--

LOCK TABLES `auth_token` WRITE;
/*!40000 ALTER TABLE `auth_token` DISABLE KEYS */;
INSERT INTO `auth_token` VALUES (1,'2018-06-13 15:02:50','2018-05-14 15:02:50','129223f5-cb0a-4126-b5ef-761fc09fa459','admin@qa.corp.com'),(2,'2018-06-13 15:25:17','2018-05-14 15:25:17','88fc016b-4dd2-420c-b996-01ba3fd2d553','bala.pamarthi@mphasis.com');
/*!40000 ALTER TABLE `auth_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chunks`
--

DROP TABLE IF EXISTS `chunks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chunks` (
  `CHUNKS_ID` int(11) NOT NULL,
  `CHUNKS_DESCRIPTION` varchar(255) NOT NULL,
  PRIMARY KEY (`CHUNKS_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chunks`
--

LOCK TABLES `chunks` WRITE;
/*!40000 ALTER TABLE `chunks` DISABLE KEYS */;
INSERT INTO `chunks` VALUES (1,'One'),(3,'Three'),(5,'Five'),(7,'Seven'),(10,'Ten');
/*!40000 ALTER TABLE `chunks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configurations`
--

DROP TABLE IF EXISTS `configurations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `configurations` (
  `CONFIGS_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CONFIGS_NAME` varchar(255) NOT NULL,
  `OBJECT_REPOSITARY_LOCATION` varchar(255) DEFAULT NULL,
  `PROJECT_LOCATION` varchar(255) DEFAULT NULL,
  `SCENARIO_DESCRIPTION_LOCATION` varchar(255) NOT NULL,
  `SCRIPTLESS_MODULE` varchar(255) DEFAULT NULL,
  `SHARED_LOCATION` varchar(255) DEFAULT NULL,
  `TEST_DATA_LOCATION` varchar(255) NOT NULL,
  `PROJECT` int(11) DEFAULT NULL,
  `EMAIL_ID` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`CONFIGS_ID`),
  UNIQUE KEY `UK_bfq73biu375u7ja7m1r8wnech` (`CONFIGS_NAME`),
  KEY `FK_i2qtwvtbm90a6q3ui1ph2tbf8` (`PROJECT`),
  KEY `FK_gvdjybtu6jw2knw5j7g96sp26` (`EMAIL_ID`),
  CONSTRAINT `FK_gvdjybtu6jw2knw5j7g96sp26` FOREIGN KEY (`EMAIL_ID`) REFERENCES `user_mtape` (`EMAIL`),
  CONSTRAINT `FK_i2qtwvtbm90a6q3ui1ph2tbf8` FOREIGN KEY (`PROJECT`) REFERENCES `project_details` (`PROJECT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configurations`
--

LOCK TABLES `configurations` WRITE;
/*!40000 ALTER TABLE `configurations` DISABLE KEYS */;
INSERT INTO `configurations` VALUES (1,'Zero Bank','zeroBankTest_Objects','zerobank','ZeroBank_ScenarioDescription','ZeroBank_ScriptlessModule',NULL,'ZeroBankTestData',2,'bala.pamarthi@mphasis.com');
/*!40000 ALTER TABLE `configurations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email`
--

DROP TABLE IF EXISTS `email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `email` (
  `EMAIL` varchar(255) NOT NULL,
  `FIRST_NAME` varchar(50) DEFAULT NULL,
  `LAST_NAME` varchar(50) DEFAULT NULL,
  `MIDDLE_NAME` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`EMAIL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email`
--

LOCK TABLES `email` WRITE;
/*!40000 ALTER TABLE `email` DISABLE KEYS */;
/*!40000 ALTER TABLE `email` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_scheduler_mapping`
--

DROP TABLE IF EXISTS `email_scheduler_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `email_scheduler_mapping` (
  `schedulerId` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`schedulerId`,`email`),
  KEY `FK_k977t58h1xt12tin7kmc82txi` (`email`),
  CONSTRAINT `FK_dls2mld5po2d2mup0r4k5074o` FOREIGN KEY (`schedulerId`) REFERENCES `scheduler` (`SCHEDULER_ID`),
  CONSTRAINT `FK_k977t58h1xt12tin7kmc82txi` FOREIGN KEY (`email`) REFERENCES `email` (`EMAIL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_scheduler_mapping`
--

LOCK TABLES `email_scheduler_mapping` WRITE;
/*!40000 ALTER TABLE `email_scheduler_mapping` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_scheduler_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_suite_mapping`
--

DROP TABLE IF EXISTS `email_suite_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `email_suite_mapping` (
  `email` varchar(255) NOT NULL,
  `suiteId` int(11) NOT NULL,
  KEY `FK_dkk6lkdg7loftdvfgwewj9dht` (`suiteId`),
  KEY `FK_90075wbgf2vb73r2s43dwpqjx` (`email`),
  CONSTRAINT `FK_90075wbgf2vb73r2s43dwpqjx` FOREIGN KEY (`email`) REFERENCES `email` (`EMAIL`),
  CONSTRAINT `FK_dkk6lkdg7loftdvfgwewj9dht` FOREIGN KEY (`suiteId`) REFERENCES `suite` (`SUITE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_suite_mapping`
--

LOCK TABLES `email_suite_mapping` WRITE;
/*!40000 ALTER TABLE `email_suite_mapping` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_suite_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `machine`
--

DROP TABLE IF EXISTS `machine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `machine` (
  `MACHINE_NAME` varchar(50) NOT NULL,
  `CPU` int(11) DEFAULT NULL,
  `SCENARIO_ACTIVE` varchar(50) DEFAULT NULL,
  `PENDING_CHUNKS` int(11) DEFAULT NULL,
  `FAULT_SUITE` int(11) DEFAULT NULL,
  `LOCATION` varchar(255) NOT NULL,
  `MEMORY` int(11) DEFAULT NULL,
  `MACHINE_ACTIVE_TIME` int(11) NOT NULL,
  `PENDING_SCENARIOS` int(11) DEFAULT NULL,
  `SYSTEM_CONTROL` bit(1) DEFAULT NULL,
  `PROJECT` int(11) DEFAULT NULL,
  `SCENARIO` int(11) DEFAULT NULL,
  `STATUS` int(11) NOT NULL,
  `SUITE` int(11) DEFAULT NULL,
  PRIMARY KEY (`MACHINE_NAME`),
  KEY `FK_ck4gb0l8fxns4dkvfxprvh0vp` (`PROJECT`),
  KEY `FK_q69bbdh9fw1rlxh6jmmw8wi8f` (`SCENARIO`),
  KEY `FK_pl7yk1r98p6nmcgt3gpbry5g9` (`STATUS`),
  KEY `FK_niub83lthah25jvsso3t98ne5` (`SUITE`),
  CONSTRAINT `FK_ck4gb0l8fxns4dkvfxprvh0vp` FOREIGN KEY (`PROJECT`) REFERENCES `project_details` (`PROJECT_ID`),
  CONSTRAINT `FK_niub83lthah25jvsso3t98ne5` FOREIGN KEY (`SUITE`) REFERENCES `suite` (`SUITE_ID`),
  CONSTRAINT `FK_pl7yk1r98p6nmcgt3gpbry5g9` FOREIGN KEY (`STATUS`) REFERENCES `statusinfo` (`STATUS_ID`),
  CONSTRAINT `FK_q69bbdh9fw1rlxh6jmmw8wi8f` FOREIGN KEY (`SCENARIO`) REFERENCES `scenario` (`SCENARIO_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machine`
--

LOCK TABLES `machine` WRITE;
/*!40000 ALTER TABLE `machine` DISABLE KEYS */;
INSERT INTO `machine` VALUES ('LTPBAN042248411',NULL,'0',NULL,NULL,'A0-8C-FD-22-38-15',0,0,NULL,'\0',2,12,0,NULL),('LTPBAN042294227',NULL,'0',NULL,NULL,'30-10-B3-1F-02-A3',0,2,NULL,'\0',NULL,NULL,8,NULL);
/*!40000 ALTER TABLE `machine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mail_configuration`
--

DROP TABLE IF EXISTS `mail_configuration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mail_configuration` (
  `HOSTNAME` varchar(255) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `PORT` int(11) NOT NULL,
  `SSH_ENABLED` bit(1) NOT NULL,
  `USERNAME` varchar(255) NOT NULL,
  PRIMARY KEY (`HOSTNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mail_configuration`
--

LOCK TABLES `mail_configuration` WRITE;
/*!40000 ALTER TABLE `mail_configuration` DISABLE KEYS */;
/*!40000 ALTER TABLE `mail_configuration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modules` (
  `MODULES_ID` int(11) NOT NULL AUTO_INCREMENT,
  `BROWSER_EXECUTED` varchar(100) DEFAULT NULL,
  `COMPLETED` datetime NOT NULL,
  `ERROR_DESCRIPTION` varchar(255) NOT NULL,
  `ITERATION` int(11) NOT NULL,
  `MODULES_NAME` varchar(255) NOT NULL,
  `REPORT_FILE` longblob,
  `SCENARIO_NAME` varchar(255) DEFAULT NULL,
  `SERVER_START_TIME` datetime NOT NULL,
  `START_TIME` varchar(50) NOT NULL,
  `SUITE_START_TIME` datetime NOT NULL,
  `TESTDATA_FILE` longblob,
  `SUITE_ID` int(11) DEFAULT NULL,
  `PROJECT_ID` int(11) DEFAULT NULL,
  `SCENARIO_ID` int(11) DEFAULT NULL,
  `STATUS_ID` int(11) DEFAULT NULL,
  `USER_ID` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`MODULES_ID`),
  KEY `FK_coqbdjh20toygel8wfl2asun6` (`SUITE_ID`),
  KEY `FK_rajatschx6b3m82g9qix9ypvc` (`PROJECT_ID`),
  KEY `FK_ryy3pv8mo6okosicpv07qs08i` (`SCENARIO_ID`),
  KEY `FK_sf3ya2a0xonict2vucwng4ah1` (`STATUS_ID`),
  KEY `FK_8cxv73r4vc6bq9qy2x8g1oqtd` (`USER_ID`),
  CONSTRAINT `FK_8cxv73r4vc6bq9qy2x8g1oqtd` FOREIGN KEY (`USER_ID`) REFERENCES `user_mtape` (`EMAIL`),
  CONSTRAINT `FK_coqbdjh20toygel8wfl2asun6` FOREIGN KEY (`SUITE_ID`) REFERENCES `suite` (`SUITE_ID`),
  CONSTRAINT `FK_rajatschx6b3m82g9qix9ypvc` FOREIGN KEY (`PROJECT_ID`) REFERENCES `project_details` (`PROJECT_ID`),
  CONSTRAINT `FK_ryy3pv8mo6okosicpv07qs08i` FOREIGN KEY (`SCENARIO_ID`) REFERENCES `scenario` (`SCENARIO_ID`),
  CONSTRAINT `FK_sf3ya2a0xonict2vucwng4ah1` FOREIGN KEY (`STATUS_ID`) REFERENCES `statusinfo` (`STATUS_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES (1,'Chrome','2018-05-14 15:50:08','Triggered By Msafe Framework',1,'login-0(Iteration-1)',NULL,'login_logout-Independent Scenarion (1 Items)','2018-05-14 15:49:21','15:49:20','2018-05-14 15:49:21',NULL,1,2,1,2,NULL),(2,'Chrome','2018-05-14 17:03:22','Triggered By Msafe Framework',1,'login-2(Iteration-1)',NULL,'login_logout-Independent Scenarion (1 Items)','2018-05-14 17:02:26','17:02:25','2018-05-14 17:02:26',NULL,1,2,2,2,NULL),(3,'Chrome','2018-05-14 17:34:44','Triggered By Msafe Framework',1,'login-2(Iteration-1)',NULL,'login_logout-Independent Scenarion (1 Items)','2018-05-14 17:33:46','17:33:45','2018-05-14 17:33:46',NULL,1,2,3,2,NULL),(4,'Chrome','2018-05-14 17:42:46','Triggered By Msafe Framework',1,'login-2(Iteration-1)',NULL,'login_logout-Independent Scenarion (1 Items)','2018-05-14 17:42:14','17:42:14','2018-05-14 17:42:14',NULL,1,2,4,2,NULL),(5,'Chrome','2018-05-15 12:54:25','Triggered By Msafe Framework',1,'login-2(Iteration-1)',NULL,'login_logout-Independent Scenarion (1 Items)','2018-05-15 12:53:39','12:53:39','2018-05-15 12:53:39',NULL,1,2,5,2,NULL),(6,'Chrome','2018-05-15 12:56:56','Triggered By Msafe Framework',1,'login-2(Iteration-1)',NULL,'login_logout-Independent Scenarion (1 Items)','2018-05-15 12:56:31','12:56:31','2018-05-15 12:56:31',NULL,1,2,6,2,NULL),(7,'Chrome','2018-05-15 17:23:46','Triggered By Msafe Framework',1,'login-2(Iteration-1)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:22:16','17:22:16','2018-05-15 17:22:16',NULL,1,2,8,2,NULL),(8,'Chrome','2018-05-15 17:23:46','Triggered By Msafe Framework',1,'fundTransfer-2(Iteration-1)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:22:16','17:22:16','2018-05-15 17:22:16',NULL,1,2,8,2,NULL),(9,'Chrome','2018-05-15 17:23:46','Triggered By Msafe Framework',1,'logout-2(Iteration-1)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:22:16','17:22:16','2018-05-15 17:22:16',NULL,1,2,8,2,NULL),(10,'Chrome','2018-05-15 17:23:46','Triggered By Msafe Framework',2,'login-2(Iteration-2)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:22:16','17:22:16','2018-05-15 17:22:16',NULL,1,2,8,2,NULL),(11,'Chrome','2018-05-15 17:23:46','Triggered By Msafe Framework',2,'fundTransfer-2(Iteration-2)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:22:16','17:22:16','2018-05-15 17:22:16',NULL,1,2,8,2,NULL),(12,'Chrome','2018-05-15 17:23:46','Triggered By Msafe Framework',2,'logout-3(Iteration-2)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:22:16','17:22:16','2018-05-15 17:22:16',NULL,1,2,8,2,NULL),(13,'Chrome','2018-05-15 17:26:49','Triggered By Msafe Framework',1,'login-2(Iteration-1)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:25:34','17:25:33','2018-05-15 17:25:34',NULL,1,2,9,2,NULL),(14,'Chrome','2018-05-15 17:26:49','Triggered By Msafe Framework',1,'fundTransfer-2(Iteration-1)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:25:34','17:25:33','2018-05-15 17:25:34',NULL,1,2,9,2,NULL),(15,'Chrome','2018-05-15 17:26:49','Triggered By Msafe Framework',1,'logout-2(Iteration-1)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:25:34','17:25:33','2018-05-15 17:25:34',NULL,1,2,9,2,NULL),(16,'Chrome','2018-05-15 17:26:49','Triggered By Msafe Framework',2,'login-2(Iteration-2)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:25:34','17:25:33','2018-05-15 17:25:34',NULL,1,2,9,2,NULL),(17,'Chrome','2018-05-15 17:26:49','Triggered By Msafe Framework',2,'fundTransfer-3(Iteration-2)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:25:34','17:25:33','2018-05-15 17:25:34',NULL,1,2,9,2,NULL),(18,'Chrome','2018-05-15 17:26:49','Triggered By Msafe Framework',2,'logout-2(Iteration-2)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:25:34','17:25:33','2018-05-15 17:25:34',NULL,1,2,9,2,NULL),(19,'Chrome','2018-05-15 17:47:33','Triggered By Msafe Framework',1,'login-2(Iteration-1)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:46:18','17:46:17','2018-05-15 17:46:18',NULL,1,2,10,2,NULL),(20,'Chrome','2018-05-15 17:47:33','Triggered By Msafe Framework',1,'fundTransfer-2(Iteration-1)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:46:18','17:46:17','2018-05-15 17:46:18',NULL,1,2,10,2,NULL),(21,'Chrome','2018-05-15 17:47:33','Triggered By Msafe Framework',1,'logout-2(Iteration-1)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:46:18','17:46:17','2018-05-15 17:46:18',NULL,1,2,10,2,NULL),(22,'Chrome','2018-05-15 17:47:33','Triggered By Msafe Framework',2,'login-2(Iteration-2)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:46:18','17:46:17','2018-05-15 17:46:18',NULL,1,2,10,2,NULL),(23,'Chrome','2018-05-15 17:47:33','Triggered By Msafe Framework',2,'fundTransfer-3(Iteration-2)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:46:18','17:46:17','2018-05-15 17:46:18',NULL,1,2,10,2,NULL),(24,'Chrome','2018-05-15 17:47:33','Triggered By Msafe Framework',2,'logout-2(Iteration-2)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:46:18','17:46:17','2018-05-15 17:46:18',NULL,1,2,10,2,NULL),(25,'Chrome','2018-05-15 17:51:30','Triggered By Msafe Framework',1,'login-2(Iteration-1)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:50:10','17:50:09','2018-05-15 17:50:10',NULL,1,2,11,2,NULL),(26,'Chrome','2018-05-15 17:51:30','Triggered By Msafe Framework',1,'fundTransfer-2(Iteration-1)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:50:10','17:50:09','2018-05-15 17:50:10',NULL,1,2,11,2,NULL),(27,'Chrome','2018-05-15 17:51:30','Triggered By Msafe Framework',1,'logout-2(Iteration-1)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:50:10','17:50:09','2018-05-15 17:50:10',NULL,1,2,11,2,NULL),(28,'Chrome','2018-05-15 17:51:30','Triggered By Msafe Framework',2,'login-2(Iteration-2)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:50:10','17:50:09','2018-05-15 17:50:10',NULL,1,2,11,2,NULL),(29,'Chrome','2018-05-15 17:51:30','Triggered By Msafe Framework',2,'fundTransfer-3(Iteration-2)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:50:10','17:50:09','2018-05-15 17:50:10',NULL,1,2,11,2,NULL),(30,'Chrome','2018-05-15 17:51:30','Triggered By Msafe Framework',2,'logout-2(Iteration-2)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:50:10','17:50:09','2018-05-15 17:50:10',NULL,1,2,11,2,NULL),(31,'Chrome','2018-05-15 17:57:03','Triggered By Msafe Framework',1,'login-2(Iteration-1)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:55:57','17:55:57','2018-05-15 17:55:57',NULL,1,2,12,2,NULL),(32,'Chrome','2018-05-15 17:57:03','Triggered By Msafe Framework',1,'fundTransfer-2(Iteration-1)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:55:57','17:55:57','2018-05-15 17:55:57',NULL,1,2,12,404,NULL),(33,'Chrome','2018-05-15 17:57:03','Triggered By Msafe Framework',1,'logout-2(Iteration-1)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:55:57','17:55:57','2018-05-15 17:55:57',NULL,1,2,12,404,NULL),(34,'Chrome','2018-05-15 17:57:03','Triggered By Msafe Framework',2,'login-2(Iteration-2)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:55:57','17:55:57','2018-05-15 17:55:57',NULL,1,2,12,2,NULL),(35,'Chrome','2018-05-15 17:57:03','Triggered By Msafe Framework',2,'fundTransfer-3(Iteration-2)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:55:57','17:55:57','2018-05-15 17:55:57',NULL,1,2,12,404,NULL),(36,'Chrome','2018-05-15 17:57:03','Triggered By Msafe Framework',2,'logout-2(Iteration-2)',NULL,'Fund_Transfer-Independent Scenarion (6 Items)','2018-05-15 17:55:57','17:55:57','2018-05-15 17:55:57',NULL,1,2,12,404,NULL);
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `priority`
--

DROP TABLE IF EXISTS `priority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `priority` (
  `PRIORITY_ORDER` int(11) NOT NULL,
  `PRIORITY_NAME` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PRIORITY_ORDER`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `priority`
--

LOCK TABLES `priority` WRITE;
/*!40000 ALTER TABLE `priority` DISABLE KEYS */;
INSERT INTO `priority` VALUES (1,'Low'),(2,'Medium'),(3,'High');
/*!40000 ALTER TABLE `priority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_details`
--

DROP TABLE IF EXISTS `project_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_details` (
  `PROJECT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PROJECT_DESCRIPTION` varchar(255) DEFAULT NULL,
  `END_TIME` datetime DEFAULT NULL,
  `PROJECT_NAME` varchar(255) DEFAULT NULL,
  `START_TIME` datetime DEFAULT NULL,
  `ACCOUNT` int(11) DEFAULT NULL,
  `ALIVE` int(11) DEFAULT NULL,
  PRIMARY KEY (`PROJECT_ID`),
  UNIQUE KEY `UK_656tk4rmq5jfsod76ww396d6u` (`PROJECT_NAME`),
  KEY `FK_k6ndv4vcugh57d3afcj91j3a8` (`ACCOUNT`),
  KEY `FK_lx2ki62dg6l28144ett6viekp` (`ALIVE`),
  CONSTRAINT `FK_k6ndv4vcugh57d3afcj91j3a8` FOREIGN KEY (`ACCOUNT`) REFERENCES `account` (`id`),
  CONSTRAINT `FK_lx2ki62dg6l28144ett6viekp` FOREIGN KEY (`ALIVE`) REFERENCES `statusinfo` (`STATUS_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_details`
--

LOCK TABLES `project_details` WRITE;
/*!40000 ALTER TABLE `project_details` DISABLE KEYS */;
INSERT INTO `project_details` VALUES (1,NULL,'2020-12-31 00:00:00','Mphasis','2017-01-01 00:00:00',NULL,0),(2,NULL,'2020-05-22 00:00:00','zerobank','2018-05-08 00:00:00',NULL,0);
/*!40000 ALTER TABLE `project_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_user_mapping`
--

DROP TABLE IF EXISTS `project_user_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_user_mapping` (
  `emailAddress` varchar(250) NOT NULL,
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`emailAddress`),
  KEY `FK_6now2m3p211srd3x5slkwt3ii` (`emailAddress`),
  CONSTRAINT `FK_6bjwugunaj46tu6x5psn70cyu` FOREIGN KEY (`id`) REFERENCES `project_details` (`PROJECT_ID`),
  CONSTRAINT `FK_6now2m3p211srd3x5slkwt3ii` FOREIGN KEY (`emailAddress`) REFERENCES `user_mtape` (`EMAIL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_user_mapping`
--

LOCK TABLES `project_user_mapping` WRITE;
/*!40000 ALTER TABLE `project_user_mapping` DISABLE KEYS */;
INSERT INTO `project_user_mapping` VALUES ('admin@qa.corp.com',1),('bala.pamarthi@mphasis.com',2);
/*!40000 ALTER TABLE `project_user_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rest_verification_token`
--

DROP TABLE IF EXISTS `rest_verification_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rest_verification_token` (
  `VERIFICATION_ID` int(11) NOT NULL AUTO_INCREMENT,
  `timeCreated` datetime DEFAULT NULL,
  `uuid` varchar(36) DEFAULT NULL,
  `version` int(11) NOT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `token` varchar(36) DEFAULT NULL,
  `tokenType` varchar(255) DEFAULT NULL,
  `verified` bit(1) NOT NULL,
  `user_id` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`VERIFICATION_ID`),
  KEY `FK_3p0fp71wksu5rduqi63fxcoha` (`user_id`),
  CONSTRAINT `FK_3p0fp71wksu5rduqi63fxcoha` FOREIGN KEY (`user_id`) REFERENCES `user_mtape` (`EMAIL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rest_verification_token`
--

LOCK TABLES `rest_verification_token` WRITE;
/*!40000 ALTER TABLE `rest_verification_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `rest_verification_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `result`
--

DROP TABLE IF EXISTS `result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `result` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Build_ID` int(11) NOT NULL,
  `Execution_Date` varchar(100) NOT NULL,
  `Module_Name` varchar(255) NOT NULL,
  `Module_Status` int(11) NOT NULL,
  `moduleType` int(11) NOT NULL,
  `ProcessID` varchar(255) NOT NULL,
  `PROJECT` int(11) NOT NULL,
  `Scenario_Name` varchar(255) NOT NULL,
  `Scenario_Status` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `result`
--

LOCK TABLES `result` WRITE;
/*!40000 ALTER TABLE `result` DISABLE KEYS */;
/*!40000 ALTER TABLE `result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scenario`
--

DROP TABLE IF EXISTS `scenario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scenario` (
  `SCENARIO_ID` int(11) NOT NULL AUTO_INCREMENT,
  `ASSIGNED_MACHINE_NAME` varchar(255) DEFAULT NULL,
  `DEPENDENT_GROUP` varchar(255) DEFAULT NULL,
  `SCENARIO_DESCRIPTION` varchar(255) DEFAULT NULL,
  `END_TIME` datetime DEFAULT NULL,
  `FAILED` varchar(50) DEFAULT NULL,
  `FAILED_MACHINE_NAME` varchar(255) DEFAULT NULL,
  `isDependent` bit(1) DEFAULT NULL,
  `LOCATION` varchar(255) DEFAULT NULL,
  `NAME` varchar(255) NOT NULL,
  `SCENARIO_BANK_ID` varchar(255) NOT NULL,
  `START_TIME` datetime DEFAULT NULL,
  `SUITE` int(11) DEFAULT NULL,
  `PRIORITY_ID` int(11) DEFAULT NULL,
  `PROJECT_ID` int(11) DEFAULT NULL,
  `STATUS_ID` int(11) DEFAULT NULL,
  `USER_ID` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`SCENARIO_ID`),
  KEY `FK_4gby8a2yilqc5e65faou1wdp4` (`SUITE`),
  KEY `FK_202jeyqmp3hmb0ykh4ogygaah` (`PRIORITY_ID`),
  KEY `FK_nug4hes5mbfylgybgdbpgc5ko` (`PROJECT_ID`),
  KEY `FK_ktkh2lxj0yfdih4utbemk4r7i` (`STATUS_ID`),
  KEY `FK_5cgccukh3bbl331lfrpbu4498` (`USER_ID`),
  CONSTRAINT `FK_202jeyqmp3hmb0ykh4ogygaah` FOREIGN KEY (`PRIORITY_ID`) REFERENCES `priority` (`PRIORITY_ORDER`),
  CONSTRAINT `FK_4gby8a2yilqc5e65faou1wdp4` FOREIGN KEY (`SUITE`) REFERENCES `suite` (`SUITE_ID`),
  CONSTRAINT `FK_5cgccukh3bbl331lfrpbu4498` FOREIGN KEY (`USER_ID`) REFERENCES `user_mtape` (`EMAIL`),
  CONSTRAINT `FK_ktkh2lxj0yfdih4utbemk4r7i` FOREIGN KEY (`STATUS_ID`) REFERENCES `statusinfo` (`STATUS_ID`),
  CONSTRAINT `FK_nug4hes5mbfylgybgdbpgc5ko` FOREIGN KEY (`PROJECT_ID`) REFERENCES `project_details` (`PROJECT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scenario`
--

LOCK TABLES `scenario` WRITE;
/*!40000 ALTER TABLE `scenario` DISABLE KEYS */;
INSERT INTO `scenario` VALUES (1,'LTPBAN042294227',NULL,'','2018-05-14 15:50:08','FALSE','','\0','30-10-B3-1F-02-A3','login_logout','TS-6','2018-05-14 15:49:24',1,3,2,2,NULL),(2,'LTPBAN042294227',NULL,'','2018-05-14 17:03:22','FALSE','','\0','30-10-B3-1F-02-A3','login_logout','TS-6','2018-05-14 17:02:31',1,3,2,2,NULL),(3,'LTPBAN042248411',NULL,'','2018-05-14 17:34:44','FALSE','','\0','A0-8C-FD-22-38-15','login_logout','TS-6','2018-05-14 17:33:52',1,3,2,2,NULL),(4,'LTPBAN042248411',NULL,'','2018-05-14 17:42:46','FALSE','','\0','A0-8C-FD-22-38-15','login_logout','TS-6','2018-05-14 17:42:18',1,3,2,2,NULL),(5,'LTPBAN042248411',NULL,'','2018-05-15 12:54:25','FALSE','','\0','A0-8C-FD-22-38-15','login_logout','TS-6','2018-05-15 12:53:42',1,3,2,2,NULL),(6,'LTPBAN042248411',NULL,'','2018-05-15 12:56:56','FALSE','','\0','A0-8C-FD-22-38-15','login_logout','TS-6','2018-05-15 12:56:33',1,3,2,2,NULL),(7,'LTPBAN042248411',NULL,'',NULL,'FALSE','','\0','A0-8C-FD-22-38-15','Fund_Transfer','TS-7','2018-05-15 17:14:16',1,3,2,400,NULL),(8,'LTPBAN042248411',NULL,'','2018-05-15 17:23:46','FALSE','','\0','A0-8C-FD-22-38-15','Fund_Transfer','TS-7','2018-05-15 17:22:18',1,3,2,2,NULL),(9,'LTPBAN042248411',NULL,'','2018-05-15 17:26:49','FALSE','','\0','A0-8C-FD-22-38-15','Fund_Transfer','TS-7','2018-05-15 17:25:38',1,3,2,2,NULL),(10,'LTPBAN042248411',NULL,'','2018-05-15 17:47:33','FALSE','','\0','A0-8C-FD-22-38-15','Fund_Transfer','TS-7','2018-05-15 17:46:19',1,3,2,2,NULL),(11,'LTPBAN042248411',NULL,'','2018-05-15 17:51:30','FALSE','','\0','A0-8C-FD-22-38-15','Fund_Transfer','TS-7','2018-05-15 17:50:15',1,3,2,2,NULL),(12,NULL,NULL,'','2018-05-15 17:57:03','FALSE','LTPBAN042248411','\0','A0-8C-FD-22-38-15','Fund_Transfer','TS-7','2018-05-15 17:55:59',1,3,2,404,NULL);
/*!40000 ALTER TABLE `scenario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scenario_bank`
--

DROP TABLE IF EXISTS `scenario_bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scenario_bank` (
  `SCENARIO_KEY` int(11) NOT NULL AUTO_INCREMENT,
  `DEPENDS_ON` varchar(255) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `SCENARIO_NAME` longtext NOT NULL,
  `OBSOLETE` bit(1) NOT NULL,
  `SCENARIO_ID` varchar(255) NOT NULL,
  `PROJECT_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`SCENARIO_KEY`),
  KEY `FK_djl2x9a0el0w8dju7dxqrups7` (`PROJECT_ID`),
  CONSTRAINT `FK_djl2x9a0el0w8dju7dxqrups7` FOREIGN KEY (`PROJECT_ID`) REFERENCES `project_details` (`PROJECT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scenario_bank`
--

LOCK TABLES `scenario_bank` WRITE;
/*!40000 ALTER TABLE `scenario_bank` DISABLE KEYS */;
INSERT INTO `scenario_bank` VALUES (1,'','Perform operation','Fund_Transfer','\0','TS-7',2);
/*!40000 ALTER TABLE `scenario_bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scenario_scheduler_mapping`
--

DROP TABLE IF EXISTS `scenario_scheduler_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scenario_scheduler_mapping` (
  `schedulerId` int(11) NOT NULL,
  `scenarioId` int(11) NOT NULL,
  KEY `FK_juiyxdavv1f1yb5om6wat5i6i` (`scenarioId`),
  KEY `FK_qy0hjash8b8rbisximgueh6f9` (`schedulerId`),
  CONSTRAINT `FK_juiyxdavv1f1yb5om6wat5i6i` FOREIGN KEY (`scenarioId`) REFERENCES `scenario` (`SCENARIO_ID`),
  CONSTRAINT `FK_qy0hjash8b8rbisximgueh6f9` FOREIGN KEY (`schedulerId`) REFERENCES `scheduler` (`SCHEDULER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scenario_scheduler_mapping`
--

LOCK TABLES `scenario_scheduler_mapping` WRITE;
/*!40000 ALTER TABLE `scenario_scheduler_mapping` DISABLE KEYS */;
/*!40000 ALTER TABLE `scenario_scheduler_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scheduled_days`
--

DROP TABLE IF EXISTS `scheduled_days`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scheduled_days` (
  `MtapeScheduler_SCHEDULER_ID` int(11) NOT NULL,
  `DAYS` varchar(255) DEFAULT NULL,
  KEY `FK_lgjqqkulkqk87wsa4nlovc075` (`MtapeScheduler_SCHEDULER_ID`),
  CONSTRAINT `FK_lgjqqkulkqk87wsa4nlovc075` FOREIGN KEY (`MtapeScheduler_SCHEDULER_ID`) REFERENCES `scheduler` (`SCHEDULER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scheduled_days`
--

LOCK TABLES `scheduled_days` WRITE;
/*!40000 ALTER TABLE `scheduled_days` DISABLE KEYS */;
/*!40000 ALTER TABLE `scheduled_days` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scheduler`
--

DROP TABLE IF EXISTS `scheduler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scheduler` (
  `SCHEDULER_ID` int(11) NOT NULL AUTO_INCREMENT,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `isPresistScenarios` bit(1) NOT NULL,
  `START_DATE` datetime NOT NULL,
  `START_TIME` varchar(50) NOT NULL,
  `CHUNKS_ID` int(11) DEFAULT NULL,
  `CONFIGURATION` int(11) DEFAULT NULL,
  `PRIORITY_ID` int(11) DEFAULT NULL,
  `PROJECT_ID` int(11) DEFAULT NULL,
  `STATUS` int(11) DEFAULT NULL,
  `SUITE_ID` int(11) DEFAULT NULL,
  `MTAPE_USER` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`SCHEDULER_ID`),
  KEY `FK_bemiawrmab9w2ynci0hyst1yn` (`CHUNKS_ID`),
  KEY `FK_246w7perjmm7c9beuam97ohwg` (`CONFIGURATION`),
  KEY `FK_57155dbgeg6leb5j5y7ljl3be` (`PRIORITY_ID`),
  KEY `FK_15xvkmmulwo2pat2x77w9o5am` (`PROJECT_ID`),
  KEY `FK_hc7y1f95jdegbv4tlekyko9gq` (`STATUS`),
  KEY `FK_1d5k91rtf4456gj10rcslflmt` (`SUITE_ID`),
  KEY `FK_afotalwwfiwhi5u3xg3jcp5l8` (`MTAPE_USER`),
  CONSTRAINT `FK_15xvkmmulwo2pat2x77w9o5am` FOREIGN KEY (`PROJECT_ID`) REFERENCES `project_details` (`PROJECT_ID`),
  CONSTRAINT `FK_1d5k91rtf4456gj10rcslflmt` FOREIGN KEY (`SUITE_ID`) REFERENCES `suite` (`SUITE_ID`),
  CONSTRAINT `FK_246w7perjmm7c9beuam97ohwg` FOREIGN KEY (`CONFIGURATION`) REFERENCES `configurations` (`CONFIGS_ID`),
  CONSTRAINT `FK_57155dbgeg6leb5j5y7ljl3be` FOREIGN KEY (`PRIORITY_ID`) REFERENCES `priority` (`PRIORITY_ORDER`),
  CONSTRAINT `FK_afotalwwfiwhi5u3xg3jcp5l8` FOREIGN KEY (`MTAPE_USER`) REFERENCES `user_mtape` (`EMAIL`),
  CONSTRAINT `FK_bemiawrmab9w2ynci0hyst1yn` FOREIGN KEY (`CHUNKS_ID`) REFERENCES `chunks` (`CHUNKS_ID`),
  CONSTRAINT `FK_hc7y1f95jdegbv4tlekyko9gq` FOREIGN KEY (`STATUS`) REFERENCES `statusinfo` (`STATUS_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scheduler`
--

LOCK TABLES `scheduler` WRITE;
/*!40000 ALTER TABLE `scheduler` DISABLE KEYS */;
/*!40000 ALTER TABLE `scheduler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scheduler_machine_mapping`
--

DROP TABLE IF EXISTS `scheduler_machine_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scheduler_machine_mapping` (
  `SCHEDULER_ID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  KEY `FK_1vpxdotgxl103vcj823t5120j` (`name`),
  KEY `FK_j5q1st9yrdv2imjkx61qfkjtu` (`SCHEDULER_ID`),
  CONSTRAINT `FK_1vpxdotgxl103vcj823t5120j` FOREIGN KEY (`name`) REFERENCES `machine` (`MACHINE_NAME`),
  CONSTRAINT `FK_j5q1st9yrdv2imjkx61qfkjtu` FOREIGN KEY (`SCHEDULER_ID`) REFERENCES `scheduler` (`SCHEDULER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scheduler_machine_mapping`
--

LOCK TABLES `scheduler_machine_mapping` WRITE;
/*!40000 ALTER TABLE `scheduler_machine_mapping` DISABLE KEYS */;
/*!40000 ALTER TABLE `scheduler_machine_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scheduler_software_mapping`
--

DROP TABLE IF EXISTS `scheduler_software_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scheduler_software_mapping` (
  `SCHEDULER_ID` int(11) NOT NULL,
  `softwareId` int(11) NOT NULL,
  KEY `FK_fx56oukbgs3dydeg2t910e855` (`softwareId`),
  KEY `FK_qc81m3s129a88ciblvcofp12j` (`SCHEDULER_ID`),
  CONSTRAINT `FK_fx56oukbgs3dydeg2t910e855` FOREIGN KEY (`softwareId`) REFERENCES `softwares` (`SOFTWARE_ID`),
  CONSTRAINT `FK_qc81m3s129a88ciblvcofp12j` FOREIGN KEY (`SCHEDULER_ID`) REFERENCES `scheduler` (`SCHEDULER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scheduler_software_mapping`
--

LOCK TABLES `scheduler_software_mapping` WRITE;
/*!40000 ALTER TABLE `scheduler_software_mapping` DISABLE KEYS */;
/*!40000 ALTER TABLE `scheduler_software_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `software_machine_mapping`
--

DROP TABLE IF EXISTS `software_machine_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `software_machine_mapping` (
  `softwareId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  KEY `FK_o8at32lyqq5def6klrlmye0lf` (`name`),
  KEY `FK_5bs4y194bhqusm8duyyjswbuu` (`softwareId`),
  CONSTRAINT `FK_5bs4y194bhqusm8duyyjswbuu` FOREIGN KEY (`softwareId`) REFERENCES `softwares` (`SOFTWARE_ID`),
  CONSTRAINT `FK_o8at32lyqq5def6klrlmye0lf` FOREIGN KEY (`name`) REFERENCES `machine` (`MACHINE_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `software_machine_mapping`
--

LOCK TABLES `software_machine_mapping` WRITE;
/*!40000 ALTER TABLE `software_machine_mapping` DISABLE KEYS */;
INSERT INTO `software_machine_mapping` VALUES (1,'LTPBAN042248411'),(2,'LTPBAN042248411'),(3,'LTPBAN042248411'),(4,'LTPBAN042248411'),(5,'LTPBAN042248411'),(6,'LTPBAN042248411'),(7,'LTPBAN042248411'),(8,'LTPBAN042248411'),(9,'LTPBAN042248411'),(10,'LTPBAN042248411'),(11,'LTPBAN042248411'),(12,'LTPBAN042248411'),(13,'LTPBAN042248411'),(14,'LTPBAN042248411'),(15,'LTPBAN042248411'),(16,'LTPBAN042248411'),(17,'LTPBAN042248411'),(18,'LTPBAN042248411'),(19,'LTPBAN042248411'),(20,'LTPBAN042248411'),(21,'LTPBAN042248411'),(22,'LTPBAN042248411'),(23,'LTPBAN042248411'),(24,'LTPBAN042248411'),(25,'LTPBAN042248411'),(26,'LTPBAN042248411'),(27,'LTPBAN042248411'),(28,'LTPBAN042248411'),(29,'LTPBAN042248411'),(30,'LTPBAN042248411'),(31,'LTPBAN042248411'),(32,'LTPBAN042248411'),(33,'LTPBAN042248411'),(34,'LTPBAN042248411'),(35,'LTPBAN042248411'),(36,'LTPBAN042248411'),(37,'LTPBAN042248411'),(38,'LTPBAN042248411'),(39,'LTPBAN042248411'),(40,'LTPBAN042248411'),(41,'LTPBAN042248411'),(42,'LTPBAN042248411'),(43,'LTPBAN042248411'),(44,'LTPBAN042248411'),(45,'LTPBAN042248411'),(46,'LTPBAN042248411'),(47,'LTPBAN042248411'),(48,'LTPBAN042248411'),(49,'LTPBAN042248411'),(50,'LTPBAN042248411'),(51,'LTPBAN042248411'),(52,'LTPBAN042248411'),(53,'LTPBAN042248411'),(54,'LTPBAN042248411'),(55,'LTPBAN042248411'),(56,'LTPBAN042248411'),(57,'LTPBAN042248411'),(58,'LTPBAN042248411'),(59,'LTPBAN042248411'),(60,'LTPBAN042248411'),(61,'LTPBAN042248411'),(62,'LTPBAN042248411'),(63,'LTPBAN042248411'),(64,'LTPBAN042248411'),(65,'LTPBAN042248411'),(66,'LTPBAN042248411'),(67,'LTPBAN042248411'),(68,'LTPBAN042248411'),(69,'LTPBAN042248411'),(70,'LTPBAN042248411'),(71,'LTPBAN042248411'),(72,'LTPBAN042248411'),(73,'LTPBAN042248411'),(74,'LTPBAN042248411'),(75,'LTPBAN042248411'),(76,'LTPBAN042248411'),(77,'LTPBAN042248411'),(78,'LTPBAN042248411'),(79,'LTPBAN042248411'),(80,'LTPBAN042248411'),(81,'LTPBAN042248411'),(82,'LTPBAN042248411'),(83,'LTPBAN042248411'),(84,'LTPBAN042248411'),(85,'LTPBAN042248411'),(86,'LTPBAN042248411'),(87,'LTPBAN042248411'),(88,'LTPBAN042248411'),(89,'LTPBAN042248411'),(90,'LTPBAN042248411'),(91,'LTPBAN042248411'),(92,'LTPBAN042248411'),(93,'LTPBAN042248411'),(94,'LTPBAN042248411'),(95,'LTPBAN042248411'),(96,'LTPBAN042248411'),(97,'LTPBAN042248411'),(98,'LTPBAN042248411'),(99,'LTPBAN042248411'),(100,'LTPBAN042248411'),(101,'LTPBAN042248411'),(102,'LTPBAN042248411'),(103,'LTPBAN042248411'),(104,'LTPBAN042248411'),(105,'LTPBAN042248411'),(106,'LTPBAN042248411'),(107,'LTPBAN042248411'),(108,'LTPBAN042248411'),(109,'LTPBAN042248411'),(110,'LTPBAN042248411'),(111,'LTPBAN042248411'),(112,'LTPBAN042248411'),(113,'LTPBAN042248411'),(114,'LTPBAN042248411'),(115,'LTPBAN042248411'),(116,'LTPBAN042248411'),(117,'LTPBAN042248411'),(118,'LTPBAN042248411'),(119,'LTPBAN042248411'),(120,'LTPBAN042248411'),(121,'LTPBAN042248411'),(122,'LTPBAN042248411'),(123,'LTPBAN042248411'),(124,'LTPBAN042248411');
/*!40000 ALTER TABLE `software_machine_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `softwares`
--

DROP TABLE IF EXISTS `softwares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `softwares` (
  `SOFTWARE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `SOFTWARE_DESCRIPTION` varchar(255) DEFAULT NULL,
  `SOFTWARE_NAME` varchar(255) NOT NULL,
  `SOFTWARE_VERSION` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`SOFTWARE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `softwares`
--

LOCK TABLES `softwares` WRITE;
/*!40000 ALTER TABLE `softwares` DISABLE KEYS */;
INSERT INTO `softwares` VALUES (1,NULL,'MySQL_Fabric_1.5.3_&_MySQL_Utilities_1.5.3','1.5.3'),(2,NULL,'Microsoft_Visual_C++_2008_Redistributable_-_x64_9.0.30729.6161','9.0.30729.6161'),(3,NULL,'Intel®_Trusted_Connect_Service_Client','1.42.17.0'),(4,NULL,'TortoiseSVN_1.9.7.27907_(64_bit)','1.9.27907'),(5,NULL,'MySQL_Connector/ODBC_5.3','5.3.4'),(6,NULL,'Update_for_Microsoft_.NET_Framework_4.5.2_(KB4040977)','1'),(7,NULL,'Adobe_Acrobat_Reader_DC','18.009.20044'),(8,NULL,'Heroku_CLI',''),(9,NULL,'Google_Update_Helper','1.3.33.7'),(10,NULL,'MS_Custom','1.00.0000'),(11,NULL,'Intel(R)_Wireless_Bluetooth(R)(patch_version_18.1.1525.1421)','18.1.1504.0518'),(12,NULL,'Microsoft_Visual_C++_2012_Redistributable_(x86)_-_11.0.61030','11.0.61030.0'),(13,NULL,'Microsoft_.NET_Framework_4.5.2','4.5.51209'),(14,NULL,'Oracle_VM_VirtualBox_5.2.6','5.2.6'),(15,NULL,'Microsoft_Visual_C++_2012_x64_Minimum_Runtime_-_11.0.61030','11.0.61030'),(16,NULL,'MySQL_Connector_Net_6.9.5','6.9.5'),(17,NULL,'Shockwaveplayer','12.3.1.201'),(18,NULL,'MySQL_Connector_C++_1.1.4','1.1.4'),(19,NULL,'McAfee_Drive_Encryption','7.2.1.16'),(20,NULL,'Git_version_2.8.1','2.8.1'),(21,NULL,'swMSM','12.0.0.1'),(22,NULL,'Office_16_Click-to-Run_Extensibility_Component','16.0.8326.2107'),(23,NULL,'MySQL_Server_5.6','5.6.22'),(24,NULL,'Appium','1.4.16.1'),(25,NULL,'Synaptics_WBF_Fingerprint_Reader','4.5.321.0'),(26,NULL,'McAfee_Endpoint_Security_Threat_Prevention','10.5.1'),(27,NULL,'Mphasis_Dexter_4.2_en_us','4.2'),(28,NULL,'Google_Chrome','65.0.3325.181'),(29,NULL,'HP_Hotkey_Support','6.2.15.1'),(30,NULL,'MySQL_Connector_J','5.1.34'),(31,NULL,'Office_16_Click-to-Run_Localization_Component','16.0.8326.2107'),(32,NULL,'Snow_Inventory_Agent','5.2.2'),(33,NULL,'Intel(R)_Chipset_Device_Software','10.1.1.9'),(34,NULL,'Update_for_Microsoft_.NET_Framework_4.5.2_(KB4054992)','1'),(35,NULL,'MySQL_Workbench_6.2_CE','6.2.4'),(36,NULL,'McAfee_Endpoint_Security_Adaptive_Threat_Protection','10.5.1'),(37,NULL,'Microsoft_Power_BI_Desktop_(x64)','2.46.4732.721'),(38,NULL,'Cisco_WebEx_Meetings',''),(39,NULL,'Security_Update_for_Microsoft_.NET_Framework_4.5.2_(KB4014566)','1'),(40,NULL,'Reliability_Update_for_Microsoft_.NET_Framework_4.5.2_(KB3179930)','1'),(41,NULL,'Photon_Plus','21.005.22.23.628'),(42,NULL,'MySQL_Examples_and_Samples_5.6','5.6.22'),(43,NULL,'Java_8_Update_161','8.0.1610.12'),(44,NULL,'GoTo_Opener','1.0.467'),(45,NULL,'Microsoft_Visual_C++_2013_x86_Additional_Runtime_-_12.0.21005','12.0.21005'),(46,NULL,'Intel(R)_PRO/Wireless_Driver','18.30.0000.3514'),(47,NULL,'Microsoft_Visual_C++_2013_x64_Additional_Runtime_-_12.0.21005','12.0.21005'),(48,NULL,'SeeTestAutomation_10.2.44','10.2.44'),(49,NULL,'Update_for_Microsoft_.NET_Framework_4.5.2_(KB3210139)','1'),(50,NULL,'Synaptics_Pointing_Device_Driver','19.0.19.63'),(51,NULL,'ConfigMgr_Client_Setup_Bootstrap','5.00.8239.1203'),(52,NULL,'Microsoft_Visual_C++_2013_x86_Minimum_Runtime_-_12.0.21005','12.0.21005'),(53,NULL,'Configuration_Manager_Client','5.00.8498.1000'),(54,NULL,'Security_Update_for_Microsoft_.NET_Framework_4.5.2_(KB4054172)','1'),(55,NULL,'Cisco_AnyConnect_ISE_Posture_Module','4.3.05017'),(56,NULL,'Microsoft_Visual_C++_2012_Redistributable_(x64)_-_11.0.61030','11.0.61030.0'),(57,NULL,'Update_for_Microsoft_.NET_Framework_4.5.2_(KB4014514)','1'),(58,NULL,'Cisco_AnyConnect_Secure_Mobility_Client_','4.3.05017'),(59,NULL,'Microsoft_Silverlight','5.1.50907.0'),(60,NULL,'Microsoft_Visual_C++_2008_Redistributable_-_x86_9.0.30729.6161','9.0.30729.6161'),(61,NULL,'Java_Auto_Updater','2.8.161.12'),(62,NULL,'Intel(R)_Processor_Graphics','20.19.15.4377'),(63,NULL,'Microsoft_WSE_3.0_Runtime','3.0.5305.0'),(64,NULL,'McAfee_Agent','5.0.5.658'),(65,NULL,'Update_for_Microsoft_.NET_Framework_4.5.2_(KB4014559)','1'),(66,NULL,'RELIANCE_4G',''),(67,NULL,'Photon','23.009.17.20.628'),(68,NULL,'7-Zip_16.04_(x64_edition)','16.04.00.0'),(69,NULL,'Intel(R)_ME_UninstallLegacy','1.0.1.0'),(70,NULL,'O365_DT&Fav_URL_Shortcut_1.6','1.0'),(71,NULL,'Mozilla_Firefox_47.0.2_(x86_en-US)','47.0.2'),(72,NULL,'Realtek_Card_Reader','10.0.370.95'),(73,NULL,'Security_Update_for_Microsoft_.NET_Framework_4.5.2_(KB4040960)','1'),(74,NULL,'McAfee_Data_Exchange_Layer','3.0.1.182'),(75,NULL,'Microsoft_Visual_C++_2013_Redistributable_(x86)_-_12.0.21005','12.0.21005.1'),(76,NULL,'Forefront_Identity_Manager_Add-ins_and_Extensions','4.1.3419.0'),(77,NULL,'PostgreSQL_8.4','8.4'),(78,NULL,'MySQL_Notifier_1.1.6','1.1.6'),(79,NULL,'HP_3D_DriveGuard','6.0.28.1'),(80,NULL,'Microsoft_Visual_C++_2013_x64_Minimum_Runtime_-_12.0.21005','12.0.21005'),(81,NULL,'Mozilla_Maintenance_Service','47.0.2.6148'),(82,NULL,'Microsoft_Visual_C++_2010__x86_Redistributable_-_10.0.40219','10.0.40219'),(83,NULL,'Microsoft_Workplace_Join_for_Windows','2.0.0.0'),(84,NULL,'Microsoft_Visual_C++_2008_Redistributable_-_x86_9.0.30729.4148','9.0.30729.4148'),(85,NULL,'Intel®_PROSet/Wireless_WiFi_Software','18.30.0.0734'),(86,NULL,'AT&T_Connect_Participant_Application_v11.7.303','11.7.303'),(87,NULL,'Security_Update_for_Microsoft_.NET_Framework_4.5.2_(KB4014599)','1'),(88,NULL,'Microsoft_Visual_C++_2005_Redistributable','8.0.59193'),(89,NULL,'McAfee_RSD_Sensor','5.0.4.113'),(90,NULL,'Android_SDK_Tools','1.16'),(91,NULL,'MySQL_Connector/C_6.1','6.1.5'),(92,NULL,'Microsoft_Office_365_ProPlus_-_en-us','16.0.8326.2107'),(93,NULL,'Adobe_Flash_Player_29_ActiveX','29.0.0.113'),(94,NULL,'Docker_Toolbox_version_18.02.0-ce','18.02.0-ce'),(95,NULL,'Update_for_Microsoft_.NET_Framework_4.5.2_(KB4054995)','1'),(96,NULL,'Office_16_Click-to-Run_Licensing_Component','16.0.8326.2107'),(97,NULL,'Cisco_AnyConnect_Secure_Mobility_Client','4.3.05017'),(98,NULL,'McAfee_Drive_Encryption_Agent','7.2.1.16'),(99,NULL,'Npgsql_3.2.3','3.2.3'),(100,NULL,'AgentInstall64_15_0','15.0.0.45028'),(101,NULL,'McAfee_Endpoint_Security_Platform','10.5.1'),(102,NULL,'Local_Administrator_Password_Solution','6.2.0.0'),(103,NULL,'MySQL_Installer_-_Community','1.4.3.0'),(104,NULL,'Microsoft_WSE_2.0_SP3_Runtime','2.0.5050.0'),(105,NULL,'Java_SE_Development_Kit_8_Update_74_(64-bit)','8.0.740.2'),(106,NULL,'Intel(R)_Management_Engine_Components','11.0.0.1177'),(107,NULL,'Microsoft_Visual_C++_2012_x86_Minimum_Runtime_-_11.0.61030','11.0.61030'),(108,NULL,'Msafe_Framework','6.0'),(109,NULL,'Microsoft_Policy_Platform','68.1.1010.0'),(110,NULL,'Adobe_Refresh_Manager','1.8.0'),(111,NULL,'Conexant_HD_Audio','8.65.133.0'),(112,NULL,'Visual_Studio_Tools_for_the_Office_system_3.0_Runtime','9.0.21022'),(113,NULL,'MySQL_Documents_5.6','5.6.22'),(114,NULL,'Notepad++_(32-bit_x86)','7.2'),(115,NULL,'Microsoft_Visual_C++_2013_Redistributable_(x64)_-_12.0.21005','12.0.21005.1'),(116,NULL,'Microsoft_Visual_C++_2010__x64_Redistributable_-_10.0.40219','10.0.40219'),(117,NULL,'Intel®_PROSet/Wireless_Software','18.30.0'),(118,NULL,'Microsoft_Visual_C++_2005_Redistributable_(x64)','8.0.61000'),(119,NULL,'Adobe_Shockwave_Player_12.3','12.3.1.201'),(120,NULL,'Cisco_AnyConnect_ISE_Compliance_Module','3.6.10591.2'),(121,NULL,'Node.js','6.11.2'),(122,NULL,'Microsoft_Visual_C++_2012_x86_Additional_Runtime_-_11.0.61030','11.0.61030'),(123,NULL,'Microsoft_Visual_Studio_Code','1.19.2'),(124,NULL,'Microsoft_Visual_C++_2012_x64_Additional_Runtime_-_11.0.61030','11.0.61030');
/*!40000 ALTER TABLE `softwares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statusinfo`
--

DROP TABLE IF EXISTS `statusinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statusinfo` (
  `STATUS_ID` int(11) NOT NULL,
  `STATUS_DESC` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`STATUS_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statusinfo`
--

LOCK TABLES `statusinfo` WRITE;
/*!40000 ALTER TABLE `statusinfo` DISABLE KEYS */;
INSERT INTO `statusinfo` VALUES (0,'NEW'),(1,'RUNNING '),(2,'PASSED'),(5,'ACTIVE'),(8,'INACTIVE'),(303,'ON HOLD'),(400,'No Run'),(404,'FAILED'),(500,'COMPLETED');
/*!40000 ALTER TABLE `statusinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suite`
--

DROP TABLE IF EXISTS `suite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suite` (
  `SUITE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `BROWSER_NAME` varchar(255) DEFAULT NULL,
  `DEVICE_NAME` varchar(255) DEFAULT NULL,
  `SUITE_NAME` varchar(255) NOT NULL,
  `SCHEDULER_ID` int(11) DEFAULT NULL,
  `START_TIME` datetime DEFAULT NULL,
  `STOPPEDBY` varchar(255) DEFAULT NULL,
  `CHUNKS_ID` int(11) DEFAULT NULL,
  `CONFIGURATIONS` int(11) DEFAULT NULL,
  `PRIORITY_ID` int(11) DEFAULT NULL,
  `PROJECT_ID` int(11) DEFAULT NULL,
  `STATUS_ID` int(11) DEFAULT NULL,
  `user_id` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`SUITE_ID`),
  KEY `FK_bqum5wcupfcko56067u4el8ig` (`CHUNKS_ID`),
  KEY `FK_otxlmbfjqfa3is5a8kgvn80h2` (`CONFIGURATIONS`),
  KEY `FK_pupom8eos09x66jinm5npj7c0` (`PRIORITY_ID`),
  KEY `FK_kksnhcliickvfpngtfsyxrw5p` (`PROJECT_ID`),
  KEY `FK_m2yf0bo62y8jaewds25f0jl65` (`STATUS_ID`),
  KEY `FK_rvbley9um2gjittoyj1cewucq` (`user_id`),
  CONSTRAINT `FK_bqum5wcupfcko56067u4el8ig` FOREIGN KEY (`CHUNKS_ID`) REFERENCES `chunks` (`CHUNKS_ID`),
  CONSTRAINT `FK_kksnhcliickvfpngtfsyxrw5p` FOREIGN KEY (`PROJECT_ID`) REFERENCES `project_details` (`PROJECT_ID`),
  CONSTRAINT `FK_m2yf0bo62y8jaewds25f0jl65` FOREIGN KEY (`STATUS_ID`) REFERENCES `statusinfo` (`STATUS_ID`),
  CONSTRAINT `FK_otxlmbfjqfa3is5a8kgvn80h2` FOREIGN KEY (`CONFIGURATIONS`) REFERENCES `configurations` (`CONFIGS_ID`),
  CONSTRAINT `FK_pupom8eos09x66jinm5npj7c0` FOREIGN KEY (`PRIORITY_ID`) REFERENCES `priority` (`PRIORITY_ORDER`),
  CONSTRAINT `FK_rvbley9um2gjittoyj1cewucq` FOREIGN KEY (`user_id`) REFERENCES `user_mtape` (`EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suite`
--

LOCK TABLES `suite` WRITE;
/*!40000 ALTER TABLE `suite` DISABLE KEYS */;
INSERT INTO `suite` VALUES (1,'Chrome',NULL,'TestSuite',NULL,'2018-05-15 17:55:57',NULL,NULL,1,3,2,500,NULL),(2,NULL,NULL,'Testsuite1',NULL,NULL,NULL,NULL,NULL,NULL,2,400,NULL);
/*!40000 ALTER TABLE `suite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suite_email_mapping`
--

DROP TABLE IF EXISTS `suite_email_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suite_email_mapping` (
  `suiteId` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  KEY `FK_46greisql3hu0aqnoa8wjeflk` (`email`),
  KEY `FK_o18e48f61putnhkhnivie22no` (`suiteId`),
  CONSTRAINT `FK_46greisql3hu0aqnoa8wjeflk` FOREIGN KEY (`email`) REFERENCES `email` (`EMAIL`),
  CONSTRAINT `FK_o18e48f61putnhkhnivie22no` FOREIGN KEY (`suiteId`) REFERENCES `suite` (`SUITE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suite_email_mapping`
--

LOCK TABLES `suite_email_mapping` WRITE;
/*!40000 ALTER TABLE `suite_email_mapping` DISABLE KEYS */;
/*!40000 ALTER TABLE `suite_email_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suite_machine_mapping`
--

DROP TABLE IF EXISTS `suite_machine_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suite_machine_mapping` (
  `suiteId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  KEY `FK_i1l9c0w41jaifp4gjqeo7gru7` (`name`),
  KEY `FK_1dx50rlognvcohrewbjk5wq79` (`suiteId`),
  CONSTRAINT `FK_1dx50rlognvcohrewbjk5wq79` FOREIGN KEY (`suiteId`) REFERENCES `suite` (`SUITE_ID`),
  CONSTRAINT `FK_i1l9c0w41jaifp4gjqeo7gru7` FOREIGN KEY (`name`) REFERENCES `machine` (`MACHINE_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suite_machine_mapping`
--

LOCK TABLES `suite_machine_mapping` WRITE;
/*!40000 ALTER TABLE `suite_machine_mapping` DISABLE KEYS */;
/*!40000 ALTER TABLE `suite_machine_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suite_modules`
--

DROP TABLE IF EXISTS `suite_modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suite_modules` (
  `SUITE_SUITE_ID` int(11) NOT NULL,
  `modulesid_MODULES_ID` int(11) NOT NULL,
  KEY `FK_2lai1py7aw8bbxb92bejy9hju` (`modulesid_MODULES_ID`),
  KEY `FK_k8qwyiool2mrrq3mm3w82afmr` (`SUITE_SUITE_ID`),
  CONSTRAINT `FK_2lai1py7aw8bbxb92bejy9hju` FOREIGN KEY (`modulesid_MODULES_ID`) REFERENCES `modules` (`MODULES_ID`),
  CONSTRAINT `FK_k8qwyiool2mrrq3mm3w82afmr` FOREIGN KEY (`SUITE_SUITE_ID`) REFERENCES `suite` (`SUITE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suite_modules`
--

LOCK TABLES `suite_modules` WRITE;
/*!40000 ALTER TABLE `suite_modules` DISABLE KEYS */;
/*!40000 ALTER TABLE `suite_modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suite_software_mapping`
--

DROP TABLE IF EXISTS `suite_software_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suite_software_mapping` (
  `suiteId` int(11) NOT NULL,
  `softwareId` int(11) NOT NULL,
  KEY `FK_nn6mfgdykpjrv48nnvi74l2pi` (`softwareId`),
  KEY `FK_l4v9p568g2d475dvwd5y0m33u` (`suiteId`),
  CONSTRAINT `FK_l4v9p568g2d475dvwd5y0m33u` FOREIGN KEY (`suiteId`) REFERENCES `suite` (`SUITE_ID`),
  CONSTRAINT `FK_nn6mfgdykpjrv48nnvi74l2pi` FOREIGN KEY (`softwareId`) REFERENCES `softwares` (`SOFTWARE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suite_software_mapping`
--

LOCK TABLES `suite_software_mapping` WRITE;
/*!40000 ALTER TABLE `suite_software_mapping` DISABLE KEYS */;
INSERT INTO `suite_software_mapping` VALUES (1,108);
/*!40000 ALTER TABLE `suite_software_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ui_scenario_bank_suite_mapping`
--

DROP TABLE IF EXISTS `ui_scenario_bank_suite_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ui_scenario_bank_suite_mapping` (
  `suiteId` int(11) NOT NULL,
  `scenarioKey` int(11) NOT NULL,
  KEY `FK_s3174pma128lpab6b20otvrpb` (`scenarioKey`),
  KEY `FK_dgimgsrj60n7w9awmcrbradok` (`suiteId`),
  CONSTRAINT `FK_dgimgsrj60n7w9awmcrbradok` FOREIGN KEY (`suiteId`) REFERENCES `suite` (`SUITE_ID`),
  CONSTRAINT `FK_s3174pma128lpab6b20otvrpb` FOREIGN KEY (`scenarioKey`) REFERENCES `scenario_bank` (`SCENARIO_KEY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ui_scenario_bank_suite_mapping`
--

LOCK TABLES `ui_scenario_bank_suite_mapping` WRITE;
/*!40000 ALTER TABLE `ui_scenario_bank_suite_mapping` DISABLE KEYS */;
INSERT INTO `ui_scenario_bank_suite_mapping` VALUES (1,1);
/*!40000 ALTER TABLE `ui_scenario_bank_suite_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_group`
--

DROP TABLE IF EXISTS `user_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_group` (
  `name` varchar(50) NOT NULL,
  `address` longtext,
  `country` varchar(20) DEFAULT NULL,
  `location` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_group`
--

LOCK TABLES `user_group` WRITE;
/*!40000 ALTER TABLE `user_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_mtape`
--

DROP TABLE IF EXISTS `user_mtape`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_mtape` (
  `EMAIL` varchar(250) NOT NULL,
  `timeCreated` datetime DEFAULT NULL,
  `uuid` varchar(36) DEFAULT NULL,
  `version` int(11) NOT NULL,
  `EMP_ID` int(11) DEFAULT NULL,
  `FIRST_NAME` varchar(30) DEFAULT NULL,
  `HASH_PASSWORD` longtext,
  `IS_VERIFIED` bit(1) DEFAULT NULL,
  `LAST_NAME` varchar(30) DEFAULT NULL,
  `MOBILE_NUMBER` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `PROJECT_LOGGED_IN` int(11) DEFAULT NULL,
  `ENABLED` int(11) DEFAULT NULL,
  PRIMARY KEY (`EMAIL`),
  UNIQUE KEY `UK_kky65blxvs3xrclhccm026qto` (`EMP_ID`),
  KEY `FK_iwnjdgat08yil2vjd4od1mb8x` (`PROJECT_LOGGED_IN`),
  KEY `FK_ssqrp972ym632y5yidimhjxk9` (`ENABLED`),
  CONSTRAINT `FK_iwnjdgat08yil2vjd4od1mb8x` FOREIGN KEY (`PROJECT_LOGGED_IN`) REFERENCES `project_details` (`PROJECT_ID`),
  CONSTRAINT `FK_ssqrp972ym632y5yidimhjxk9` FOREIGN KEY (`ENABLED`) REFERENCES `statusinfo` (`STATUS_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_mtape`
--

LOCK TABLES `user_mtape` WRITE;
/*!40000 ALTER TABLE `user_mtape` DISABLE KEYS */;
INSERT INTO `user_mtape` VALUES ('admin@qa.corp.com','2018-05-14 15:02:50','787f8b6b-cdb8-4106-a60a-c871ca90f453',0,123456,'QA','sr7qjqPRZ7/FBUe1py/FcidVCZLXMUwxK3LTQZc56Bo=','\0','Admin',NULL,'admin',1,5),('bala.pamarthi@mphasis.com','2018-05-14 15:25:17','f801d6f7-788c-4457-a403-109544010c48',1,2248411,'Bala','ln73NWTz9z9L5/3zckDGsLwkQ2x+xF/TmEa5y+AI+EA=','\0','pamarthi',NULL,'TL',2,5);
/*!40000 ALTER TABLE `user_mtape` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_project_role`
--

DROP TABLE IF EXISTS `user_project_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_project_role` (
  `EMAIL_ID` varchar(250) NOT NULL,
  `PROJECT_ID` int(11) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`EMAIL_ID`,`PROJECT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_project_role`
--

LOCK TABLES `user_project_role` WRITE;
/*!40000 ALTER TABLE `user_project_role` DISABLE KEYS */;
INSERT INTO `user_project_role` VALUES ('admin@qa.corp.com',1,'admin'),('bala.pamarthi@mphasis.com',2,'TL');
/*!40000 ALTER TABLE `user_project_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-16 12:50:55
