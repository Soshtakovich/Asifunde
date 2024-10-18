-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: asifunde_db
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.22.04.1

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
-- Current Database: `asifunde_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `asifunde_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `asifunde_db`;

--
-- Table structure for table `Announcements`
--

DROP TABLE IF EXISTS `Announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Announcements` (
  `Announcement_ID` int NOT NULL AUTO_INCREMENT,
  `Subject_ID` int NOT NULL,
  `Date` date NOT NULL,
  `Content_Heading` text NOT NULL,
  `Content` text NOT NULL,
  PRIMARY KEY (`Announcement_ID`),
  KEY `Subject_ID` (`Subject_ID`),
  CONSTRAINT `Announcements_ibfk_1` FOREIGN KEY (`Subject_ID`) REFERENCES `Subjects` (`Subject_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Announcements`
--

LOCK TABLES `Announcements` WRITE;
/*!40000 ALTER TABLE `Announcements` DISABLE KEYS */;
INSERT INTO `Announcements` VALUES (1,1,'2024-09-20','Upcoming Math Test','Please prepare for the upcoming math test on 2024-10-01.'),(2,2,'2024-09-21','Physics Experiment Reminder','Reminder to submit your lab reports by 2024-10-05.'),(3,2,'2024-09-20','Upcoming Spring Classes','Please prepare for the upcoming spring classes on 2024-11-21.'),(4,2,'2024-09-21','Life Sciences Experiment Reminder','Reminder to submit your lab reports by 2024-12-25.'),(5,2,'2024-10-16','Zakes','Welcome Zakes'),(6,2,'2024-10-16','Checking','Testing Announcements Component'),(7,2,'2024-10-16','Done Testing','It is good');
/*!40000 ALTER TABLE `Announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Assessment_Marks`
--

DROP TABLE IF EXISTS `Assessment_Marks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Assessment_Marks` (
  `Mark_ID` int NOT NULL AUTO_INCREMENT,
  `Assessment_ID` int NOT NULL,
  `Learner_ID` int NOT NULL,
  `Mark` int DEFAULT NULL,
  `Submission_Date` date DEFAULT NULL,
  `Submitted_file` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Mark_ID`),
  UNIQUE KEY `Assessment_ID` (`Assessment_ID`,`Learner_ID`),
  KEY `Learner_ID` (`Learner_ID`),
  CONSTRAINT `Assessment_Marks_ibfk_1` FOREIGN KEY (`Assessment_ID`) REFERENCES `Assessments` (`Assessment_ID`) ON DELETE CASCADE,
  CONSTRAINT `Assessment_Marks_ibfk_2` FOREIGN KEY (`Learner_ID`) REFERENCES `Learner` (`Learner_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Assessment_Marks`
--

LOCK TABLES `Assessment_Marks` WRITE;
/*!40000 ALTER TABLE `Assessment_Marks` DISABLE KEYS */;
INSERT INTO `Assessment_Marks` VALUES (1,1,1,85,'2024-10-01',NULL),(2,1,2,90,'2024-10-01',NULL),(3,2,1,45,'2024-10-05',NULL),(4,2,2,50,'2024-10-05',NULL),(5,1,3,75,'2024-10-12',NULL),(6,2,3,68,'2024-10-12',NULL),(7,1,4,85,'2024-10-12',NULL),(8,2,4,78,'2024-10-12',NULL),(9,1,5,70,'2024-10-12',NULL),(10,2,5,65,'2024-10-12',NULL),(11,1,6,90,'2024-10-12',NULL),(12,2,6,85,'2024-10-12',NULL),(13,1,7,60,'2024-10-12',NULL),(14,2,7,55,'2024-10-12',NULL),(15,1,8,88,'2024-10-12',NULL),(16,2,8,85,'2024-10-12',NULL),(17,1,9,65,'2024-10-12',NULL),(18,2,9,60,'2024-10-12',NULL),(19,1,10,95,'2024-10-12',NULL),(20,2,10,92,'2024-10-12',NULL),(22,5,1,96,'2024-10-17','/home/zex/Zakes/ZEX/asfunde/Asifunde_App/asifunde-backend/src/uploads/1729207132417-Motlatsi ID.pdf'),(23,6,1,96,'2024-10-15',NULL),(24,7,1,83,'2024-10-15',NULL),(27,10,1,NULL,'2024-10-17','/home/zex/Zakes/ZEX/asfunde/Asifunde_App/asifunde-backend/src/uploads/1729207164504-Zakes_Matsimbe_Residence.pdf');
/*!40000 ALTER TABLE `Assessment_Marks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Assessments`
--

DROP TABLE IF EXISTS `Assessments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Assessments` (
  `Assessment_ID` int NOT NULL AUTO_INCREMENT,
  `Subject_ID` int NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` text,
  `File_Link` varchar(255) DEFAULT NULL,
  `DueDate` date NOT NULL,
  `Total_Mark` int NOT NULL,
  PRIMARY KEY (`Assessment_ID`),
  KEY `Subject_ID` (`Subject_ID`),
  CONSTRAINT `Assessments_ibfk_1` FOREIGN KEY (`Subject_ID`) REFERENCES `Subjects` (`Subject_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Assessments`
--

LOCK TABLES `Assessments` WRITE;
/*!40000 ALTER TABLE `Assessments` DISABLE KEYS */;
INSERT INTO `Assessments` VALUES (1,1,'Math Test 1','First mathematics test of the year','path/to/math_test_1.pdf','2024-10-01',100),(2,2,'Physics Lab Report','Lab report on the latest experiment','path/to/physics_lab_report.pdf','2024-10-05',50),(5,2,'Gravity','Gravity analysis',NULL,'2024-12-10',35),(6,2,'Electricity','ElectroStatics',NULL,'2024-12-10',97),(7,2,'Forces','Newtons laws',NULL,'2024-10-12',80),(8,2,'Testing','testing Assessment component','http://localhost:4000/uploads/1729100644019-testfile.pdf','2024-12-10',15),(9,2,'Final Testing','Testing Add Assessment','http://localhost:4000/uploads/1729100700975-GOLD BUSINESS ACCOUNT 112.pdf','2024-11-07',12),(10,2,'Testing Alert','Testing Alert as said','http://localhost:4000/uploads/1729101014987-Motlatsi ID.pdf','2024-11-07',5);
/*!40000 ALTER TABLE `Assessments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Attendance`
--

DROP TABLE IF EXISTS `Attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attendance` (
  `Attendance_ID` int NOT NULL AUTO_INCREMENT,
  `Learner_ID` int NOT NULL,
  `Subject_ID` int NOT NULL,
  `Date` date NOT NULL,
  `Attended` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Attendance_ID`),
  KEY `Learner_ID` (`Learner_ID`),
  KEY `Subject_ID` (`Subject_ID`),
  CONSTRAINT `Attendance_ibfk_1` FOREIGN KEY (`Learner_ID`) REFERENCES `Learner` (`Learner_ID`) ON DELETE CASCADE,
  CONSTRAINT `Attendance_ibfk_2` FOREIGN KEY (`Subject_ID`) REFERENCES `Subjects` (`Subject_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attendance`
--

LOCK TABLES `Attendance` WRITE;
/*!40000 ALTER TABLE `Attendance` DISABLE KEYS */;
INSERT INTO `Attendance` VALUES (1,1,1,'2024-09-18',1),(2,1,1,'2024-09-19',1),(3,1,1,'2024-09-20',0),(4,1,2,'2024-09-18',1),(5,1,2,'2024-09-20',1),(6,2,1,'2024-09-18',1),(7,2,1,'2024-09-19',1),(8,2,1,'2024-09-20',1),(9,2,2,'2024-09-18',1),(10,2,2,'2024-09-20',0),(11,1,1,'2024-09-18',1),(12,1,1,'2024-09-19',1),(13,1,1,'2024-09-20',0),(14,1,2,'2024-09-18',1),(15,1,2,'2024-09-20',1),(16,2,1,'2024-09-18',1),(17,2,1,'2024-09-19',1),(18,2,1,'2024-09-20',1),(19,2,2,'2024-09-18',1),(20,2,2,'2024-09-20',0),(21,3,1,'2024-10-13',1),(22,3,1,'2024-10-12',1),(23,3,1,'2024-10-11',0),(24,3,2,'2024-10-13',1),(25,3,2,'2024-10-12',1),(26,4,1,'2024-10-13',1),(27,4,1,'2024-10-12',1),(28,4,1,'2024-10-11',1),(29,4,2,'2024-10-13',1),(30,4,2,'2024-10-12',0),(31,5,1,'2024-10-13',1),(32,5,1,'2024-10-12',1),(33,5,1,'2024-10-11',0),(34,5,2,'2024-10-13',1),(35,5,2,'2024-10-12',1);
/*!40000 ALTER TABLE `Attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Content`
--

DROP TABLE IF EXISTS `Content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Content` (
  `Content_ID` int NOT NULL AUTO_INCREMENT,
  `Subject_ID` int NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Description` text,
  PRIMARY KEY (`Content_ID`),
  KEY `Subject_ID` (`Subject_ID`),
  CONSTRAINT `Content_ibfk_1` FOREIGN KEY (`Subject_ID`) REFERENCES `Subjects` (`Subject_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Content`
--

LOCK TABLES `Content` WRITE;
/*!40000 ALTER TABLE `Content` DISABLE KEYS */;
INSERT INTO `Content` VALUES (1,1,'Algebra','Fundamentals of Algebra'),(2,1,'Patterns','Understanding Patterns'),(3,1,'Algebra','Fundamentals of Algebra'),(4,1,'Patterns','Understanding Patterns'),(5,2,'Electricity','Fundamentals of Electric Circuits'),(6,2,'Forces','Understanding Foreces'),(7,2,'Testing Add content','Testing Testing Testing'),(8,2,'Final Test','Testing on the Web if it works'),(9,2,'Finall','Tetsts'),(10,2,'Show','asd'),(11,2,'Last check','Hey'),(12,2,'check','last'),(13,2,'Last LAst','Last !!');
/*!40000 ALTER TABLE `Content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Enrollment`
--

DROP TABLE IF EXISTS `Enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Enrollment` (
  `Enrollment_ID` int NOT NULL AUTO_INCREMENT,
  `Learner_ID` int NOT NULL,
  `Subject_ID` int NOT NULL,
  `Grade` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`Enrollment_ID`),
  UNIQUE KEY `Learner_ID` (`Learner_ID`,`Subject_ID`),
  KEY `Subject_ID` (`Subject_ID`),
  CONSTRAINT `Enrollment_ibfk_1` FOREIGN KEY (`Learner_ID`) REFERENCES `Learner` (`Learner_ID`) ON DELETE CASCADE,
  CONSTRAINT `Enrollment_ibfk_2` FOREIGN KEY (`Subject_ID`) REFERENCES `Subjects` (`Subject_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Enrollment`
--

LOCK TABLES `Enrollment` WRITE;
/*!40000 ALTER TABLE `Enrollment` DISABLE KEYS */;
INSERT INTO `Enrollment` VALUES (1,1,1,'Grade 7'),(2,1,2,'Grade 7'),(3,2,2,'Grade 11'),(4,3,1,NULL),(5,3,2,NULL),(6,4,1,NULL),(7,4,2,NULL),(8,5,1,NULL),(9,5,2,NULL),(10,6,1,NULL),(11,6,2,NULL),(12,7,1,NULL),(13,7,2,NULL),(14,8,1,NULL),(15,8,2,NULL),(16,9,1,NULL),(17,9,2,NULL),(18,10,1,NULL),(19,10,2,NULL);
/*!40000 ALTER TABLE `Enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Grades`
--

DROP TABLE IF EXISTS `Grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Grades` (
  `Grade_ID` int NOT NULL AUTO_INCREMENT,
  `Grade_Name` varchar(10) NOT NULL,
  PRIMARY KEY (`Grade_ID`),
  UNIQUE KEY `Grade_Name` (`Grade_Name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Grades`
--

LOCK TABLES `Grades` WRITE;
/*!40000 ALTER TABLE `Grades` DISABLE KEYS */;
INSERT INTO `Grades` VALUES (1,'10'),(2,'11'),(3,'12'),(9,'7');
/*!40000 ALTER TABLE `Grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Learner`
--

DROP TABLE IF EXISTS `Learner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Learner` (
  `Learner_ID` int NOT NULL AUTO_INCREMENT,
  `Learner_Number` varchar(20) NOT NULL,
  `Surname` varchar(50) NOT NULL,
  `Names` varchar(50) NOT NULL,
  `ID_Number` varchar(20) NOT NULL,
  `Gender` enum('Male','Female','Other') NOT NULL,
  `DOB` date NOT NULL,
  `Age` int NOT NULL,
  `Location` varchar(100) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Email` varchar(100) NOT NULL,
  `Cell_number` varchar(15) DEFAULT NULL,
  `Whatsapp_number` varchar(15) DEFAULT NULL,
  `Picture` varchar(255) DEFAULT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Grade` varchar(10) DEFAULT NULL,
  `School` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Learner_ID`),
  UNIQUE KEY `Learner_Number` (`Learner_Number`),
  UNIQUE KEY `ID_Number` (`ID_Number`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `Username` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Learner`
--

LOCK TABLES `Learner` WRITE;
/*!40000 ALTER TABLE `Learner` DISABLE KEYS */;
INSERT INTO `Learner` VALUES (1,'BET25-456123','Matsimbe','Zakes Samson','0202186191088','Male','2002-02-18',22,'Bekkersdal','TV 736 Holomisa Section, Bekkersdal, 1779','zakessamson1@gmail.com','0729039172','0604737475','path/to/picture.jpg','zex','abcd1234','7','Simunye Secondary School'),(2,'BET25-852124','Mpanza','Samson','1234567890124','Female','2006-02-02',18,'Simunye','456 Oak Street','bokamosozakesmatsimbe@gmail.com','0123456788','0123456788','path/to/picture2.jpg','samson','abcd1234','11','Example High School'),(3,'BET-000003','Dlamini','John','9901011234567','Male','2006-01-01',18,'Johannesburg','123 Main Street, Johannesburg','john.dlamini@example.com','0812345678','0812345678',NULL,'johnd123','password123','7','Hillview High School'),(4,'BET-000004','Sithole','Lindiwe','9902021234567','Female','2006-02-02',18,'Pretoria','45 Maple Road, Pretoria','lindiwe.sithole@example.com','0823456789','0823456789',NULL,'lindiwe123','password123','7','Sunshine Primary'),(5,'BET-000005','Ngubane','Thabo','9903031234567','Male','2006-03-03',18,'Durban','78 Beach Road, Durban','thabo.ngubane@example.com','0834567890','0834567890',NULL,'thabo123','password123','7','Oceanview Secondary'),(6,'BET-000006','Mkhize','Busi','9904041234567','Female','2006-04-04',18,'Cape Town','12 Hillcrest Avenue, Cape Town','busi.mkhize@example.com','0845678901','0845678901',NULL,'busi123','password123','7','Mountainview High'),(7,'BET-000007','Zulu','Sipho','9905051234567','Male','2006-05-05',18,'Bloemfontein','98 River Road, Bloemfontein','sipho.zulu@example.com','0856789012','0856789012',NULL,'sipho123','password123','7','Riverside School'),(8,'BET-000008','Nkosi','Themba','9906061234567','Male','2006-06-06',18,'East London','22 Park Street, East London','themba.nkosi@example.com','0867890123','0867890123',NULL,'themba123','password123','7','East Park Primary'),(9,'BET-000009','Khumalo','Nomsa','9907071234567','Female','2006-07-07',18,'Polokwane','33 Tree Lane, Polokwane','nomsa.khumalo@example.com','0878901234','0878901234',NULL,'nomsa123','password123','7','Polokwane Central'),(10,'BET-000010','Masuku','Ayanda','9908081234567','Female','2006-08-08',18,'Nelspruit','55 Forest Drive, Nelspruit','ayanda.masuku@example.com','0889012345','0889012345',NULL,'ayanda123','password123','7','Green Valley School');
/*!40000 ALTER TABLE `Learner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Learner_Progress`
--

DROP TABLE IF EXISTS `Learner_Progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Learner_Progress` (
  `Progress_ID` int NOT NULL AUTO_INCREMENT,
  `Learner_ID` int NOT NULL,
  `Subject_ID` int DEFAULT NULL,
  `Position_Class` int DEFAULT NULL,
  `Position_Subject` int DEFAULT NULL,
  `Attendance_Perc` float DEFAULT NULL,
  `Average_Mark` float DEFAULT NULL,
  `Behaviour_Reports` text,
  `Report_Date` date DEFAULT NULL,
  `Social_score` float DEFAULT NULL,
  PRIMARY KEY (`Progress_ID`),
  KEY `Learner_ID` (`Learner_ID`),
  KEY `Subject_ID` (`Subject_ID`),
  CONSTRAINT `Learner_Progress_ibfk_1` FOREIGN KEY (`Learner_ID`) REFERENCES `Learner` (`Learner_ID`) ON DELETE CASCADE,
  CONSTRAINT `Learner_Progress_ibfk_2` FOREIGN KEY (`Subject_ID`) REFERENCES `Subjects` (`Subject_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Learner_Progress`
--

LOCK TABLES `Learner_Progress` WRITE;
/*!40000 ALTER TABLE `Learner_Progress` DISABLE KEYS */;
INSERT INTO `Learner_Progress` VALUES (1,1,1,2,1,95.5,87.3,'Excellent participation in class','2024-09-25',7.65),(2,3,1,10,5,90.5,75,'Good behavior','2024-10-13',8.5),(3,3,2,10,7,85,68,'Needs improvement in homework','2024-10-13',7.5),(4,4,1,8,4,92,80,'Excellent student','2024-10-13',9),(5,4,2,9,6,89.5,74,'Strong performance','2024-10-13',8),(6,5,1,12,10,88,70,'Good progress','2024-10-13',7.8),(7,5,2,15,12,85,68,'Improving slowly','2024-10-13',7.2),(8,6,1,7,3,95,85,'Top performer','2024-10-13',9.5),(9,6,2,8,4,90,82,'Well done','2024-10-13',8.8),(10,7,1,20,15,75,60,'Needs more effort','2024-10-13',6.5),(11,7,2,22,16,70,58,'Struggling with concepts','2024-10-13',6),(12,8,1,5,2,97,88,'Excellent','2024-10-13',9.8),(13,8,2,6,3,92,85,'Very good','2024-10-13',9),(14,9,1,18,12,80,68,'Average performance','2024-10-13',7),(15,9,2,19,14,75,65,'Can do better','2024-10-13',6.8),(16,10,1,6,4,94,84,'Very strong','2024-10-13',9.2),(17,10,2,7,5,90,83,'Consistent','2024-10-13',8.7);
/*!40000 ALTER TABLE `Learner_Progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Parent`
--

DROP TABLE IF EXISTS `Parent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Parent` (
  `Parent_ID` int NOT NULL AUTO_INCREMENT,
  `Learner_ID` int NOT NULL,
  `Surname` varchar(50) NOT NULL,
  `Names` varchar(50) NOT NULL,
  `Gender` enum('Male','Female','Other') NOT NULL,
  `DOB` date NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Cell_number` varchar(15) DEFAULT NULL,
  `Whatsapp_number` varchar(15) DEFAULT NULL,
  `Relationship` varchar(50) DEFAULT NULL,
  `Education` varchar(100) DEFAULT NULL,
  `Employment` varchar(100) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Parent_ID`),
  UNIQUE KEY `Email` (`Email`),
  KEY `Learner_ID` (`Learner_ID`),
  CONSTRAINT `Parent_ibfk_1` FOREIGN KEY (`Learner_ID`) REFERENCES `Learner` (`Learner_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Parent`
--

LOCK TABLES `Parent` WRITE;
/*!40000 ALTER TABLE `Parent` DISABLE KEYS */;
INSERT INTO `Parent` VALUES (1,1,'Matsimbe','Mary','Female','1980-05-05','mary.doe@example.com','0987654321','0987654321','Mother','Bachelor','Engineer','123 Main St'),(2,2,'Smith','Tom','Male','1975-06-06','tom.smith@example.com','0987654322','0987654322','Father','Master','Manager','456 Oak St'),(3,3,'Dlamini','Maria','Female','1980-06-15','maria.dlamini@example.com','0823456789','0823456789','Mother','Diploma','Teacher','123 Main Street, Johannesburg'),(4,4,'Sithole','Patrick','Male','1978-03-20','patrick.sithole@example.com','0824567890','0824567890','Father','Degree','Engineer','45 Maple Road, Pretoria'),(5,5,'Ngubane','Thuli','Female','1982-07-22','thuli.ngubane@example.com','0835678901','0835678901','Mother','Diploma','Nurse','78 Beach Road, Durban'),(6,6,'Mkhize','Vusi','Male','1975-09-18','vusi.mkhize@example.com','0846789012','0846789012','Father','Degree','Lawyer','12 Hillcrest Avenue, Cape Town'),(7,7,'Zulu','Thandeka','Female','1985-11-12','thandeka.zulu@example.com','0857890123','0857890123','Mother','Diploma','Social Worker','98 River Road, Bloemfontein'),(8,8,'Nkosi','Jabulani','Male','1979-02-27','jabulani.nkosi@example.com','0868901234','0868901234','Father','Degree','Architect','22 Park Street, East London'),(9,9,'Khumalo','Zanele','Female','1983-05-08','zanele.khumalo@example.com','0879012345','0879012345','Mother','Diploma','Teacher','33 Tree Lane, Polokwane'),(10,10,'Masuku','Sibusiso','Male','1976-12-19','sibusiso.masuku@example.com','0880123456','0880123456','Father','Degree','Manager','55 Forest Drive, Nelspruit');
/*!40000 ALTER TABLE `Parent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sub_Content`
--

DROP TABLE IF EXISTS `Sub_Content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sub_Content` (
  `Sub_Content_ID` int NOT NULL AUTO_INCREMENT,
  `Content_ID` int NOT NULL,
  `Sub_Title` varchar(100) NOT NULL,
  `Description` text,
  `Link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Sub_Content_ID`),
  KEY `Content_ID` (`Content_ID`),
  CONSTRAINT `Sub_Content_ibfk_1` FOREIGN KEY (`Content_ID`) REFERENCES `Content` (`Content_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sub_Content`
--

LOCK TABLES `Sub_Content` WRITE;
/*!40000 ALTER TABLE `Sub_Content` DISABLE KEYS */;
INSERT INTO `Sub_Content` VALUES (1,1,'Factorise','Learn how to factor algebraic expressions.','path/to/factorise.pdf'),(2,1,'Solve for x','Techniques for solving equations for x.','path/to/solve_for_x.pdf'),(3,1,'Grouping Terms','Methods for grouping algebraic terms.','path/to/grouping_terms.pdf'),(4,2,'Pattern Concept','Introduction to the concept of patterns.','path/to/pattern_concept.pdf'),(5,2,'Finding the Pattern Rule','Steps to find the rule of a pattern.','path/to/pattern_rule.pdf'),(6,2,'General Formula for Patterns','Deriving the general formula for patterns.','path/to/general_formula.pdf'),(7,5,'Force','Learn how to factor algebraic expressions.','path/to/factorise.pdf'),(8,5,'Gravity','Techniques for solving equations for x.','path/to/solve_for_x.pdf'),(9,5,'Friction','Methods for grouping algebraic terms.','path/to/grouping_terms.pdf'),(10,6,'Energy','Introduction to the concept of patterns.','path/to/pattern_concept.pdf'),(11,6,'Statics','Steps to find the rule of a pattern.','path/to/pattern_rule.pdf'),(12,6,'Dynamics','Deriving the general formula for patterns.','path/to/general_formula.pdf'),(13,5,'Test','Testing Adding','http://localhost:4000/uploads/1729106868453.pdf'),(14,7,'First Topic','First','http://localhost:4000/uploads/1729108790776.pdf');
/*!40000 ALTER TABLE `Sub_Content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Subjects`
--

DROP TABLE IF EXISTS `Subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Subjects` (
  `Subject_ID` int NOT NULL AUTO_INCREMENT,
  `Subject_Name` varchar(100) NOT NULL,
  `Icon` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Subject_ID`),
  UNIQUE KEY `Subject_Name` (`Subject_Name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subjects`
--

LOCK TABLES `Subjects` WRITE;
/*!40000 ALTER TABLE `Subjects` DISABLE KEYS */;
INSERT INTO `Subjects` VALUES (1,'Mathematics','bx bx-math'),(2,'Physical Sciences','bx bxl-sketch'),(3,'Mathematics_G10',NULL);
/*!40000 ALTER TABLE `Subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Teacher`
--

DROP TABLE IF EXISTS `Teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Teacher` (
  `Teacher_ID` int NOT NULL AUTO_INCREMENT,
  `Teacher_Number` varchar(20) NOT NULL,
  `Surname` varchar(50) NOT NULL,
  `Names` varchar(50) NOT NULL,
  `ID_Number` varchar(20) NOT NULL,
  `Gender` enum('Male','Female','Other') NOT NULL,
  `DOB` date NOT NULL,
  `Age` int NOT NULL,
  `Location` varchar(100) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Email` varchar(100) NOT NULL,
  `Cell_number` varchar(15) DEFAULT NULL,
  `Whatsapp_number` varchar(15) DEFAULT NULL,
  `Picture` varchar(255) DEFAULT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Bank_Name` varchar(20) DEFAULT NULL,
  `Branch_Code` varchar(10) DEFAULT NULL,
  `Account_Number` varchar(15) DEFAULT NULL,
  `Account_Type` varchar(50) DEFAULT NULL,
  `Tax_Reference_Number` varchar(15) DEFAULT NULL,
  `Date_Created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Teacher_ID`),
  UNIQUE KEY `Teacher_Number` (`Teacher_Number`),
  UNIQUE KEY `ID_Number` (`ID_Number`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `Username` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teacher`
--

LOCK TABLES `Teacher` WRITE;
/*!40000 ALTER TABLE `Teacher` DISABLE KEYS */;
INSERT INTO `Teacher` VALUES (1,'TBET-0001','Smith','John','9001011234080','Male','1990-01-01',34,'Location1','Address1','john.smith@example.com','0712345678','0712345678',NULL,'john_smith','password123','Bank1','1234','123456789','Savings','123456789','2024-10-13 21:21:11'),(2,'TBET-0002','Doe','Jane','9203011234080','Female','1992-03-01',32,'Location2','Address2','jane.doe@example.com','0823456789','0823456789',NULL,'jane_doe','password123','Bank2','5678','987654321','Cheque','987654321','2024-10-13 21:21:11'),(3,'TBET-0003','Mokoena','Thabo','9105011234080','Male','1991-05-01',33,'Location3','Address3','thabo.mokoena@example.com','0734567890','0734567890',NULL,'thabo_mokoena','password123','Bank3','9101','567890123','Savings','567890123','2024-10-13 21:21:11'),(4,'TBET-0004','Nkosi','Lerato','8807011234080','Female','1988-07-01',36,'Location4','Address4','lerato.nkosi@example.com','0745678901','0745678901',NULL,'lerato_nkosi','password123','Bank4','1111','345678901','Cheque','345678901','2024-10-13 21:21:11'),(5,'TBET-0005','van der Merwe','Pieter','8502011234080','Male','1985-02-01',39,'Location5','Address5','pieter.vdm@example.com','0756789012','0756789012',NULL,'pieter_vdm','password123','Bank5','2222','234567890','Savings','234567890','2024-10-13 21:21:11'),(6,'TBET-0006','Gumede','Sihle','9408011234080','Other','1994-08-01',30,'Location6','Address6','sihle.gumede@example.com','0767890123','0767890123',NULL,'sihle_gumede','password123','Bank6','3333','345678912','Cheque','345678912','2024-10-13 21:21:11'),(7,'TBET-0007','Mbatha','Zodwa','9204011234080','Female','1992-04-01',32,'Location7','Address7','zodwa.mbatha@example.com','0723456789','0723456789',NULL,'zodwa_mbatha','password123','Bank7','4444','456789123','Savings','456789123','2024-10-13 21:21:11'),(11,'TBET-4512','chauke','Zex Sam','0204011234080','Male','1992-04-01',32,'Mohlakeng','Address7','zakessamson1@gmail.com','0723456789','0723456789',NULL,'Tzex','abcd1234','Bank7','4444','456789723','Savings','496789123','2024-10-14 06:43:43');
/*!40000 ALTER TABLE `Teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Teacher_Grades`
--

DROP TABLE IF EXISTS `Teacher_Grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Teacher_Grades` (
  `Teacher_Grade_ID` int NOT NULL AUTO_INCREMENT,
  `Teacher_ID` int DEFAULT NULL,
  `Grade_ID` int DEFAULT NULL,
  PRIMARY KEY (`Teacher_Grade_ID`),
  KEY `Teacher_ID` (`Teacher_ID`),
  KEY `Grade_ID` (`Grade_ID`),
  CONSTRAINT `Teacher_Grades_ibfk_1` FOREIGN KEY (`Teacher_ID`) REFERENCES `Teacher` (`Teacher_ID`) ON DELETE CASCADE,
  CONSTRAINT `Teacher_Grades_ibfk_2` FOREIGN KEY (`Grade_ID`) REFERENCES `Grades` (`Grade_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teacher_Grades`
--

LOCK TABLES `Teacher_Grades` WRITE;
/*!40000 ALTER TABLE `Teacher_Grades` DISABLE KEYS */;
INSERT INTO `Teacher_Grades` VALUES (1,1,3),(2,2,3),(3,3,2),(4,4,2),(5,5,1),(6,6,1),(7,6,2),(8,7,1),(9,7,2),(11,11,9);
/*!40000 ALTER TABLE `Teacher_Grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Teacher_Subjects`
--

DROP TABLE IF EXISTS `Teacher_Subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Teacher_Subjects` (
  `Teacher_Subject_ID` int NOT NULL AUTO_INCREMENT,
  `Teacher_ID` int DEFAULT NULL,
  `Subject_ID` int DEFAULT NULL,
  PRIMARY KEY (`Teacher_Subject_ID`),
  KEY `Teacher_ID` (`Teacher_ID`),
  KEY `Subject_ID` (`Subject_ID`),
  CONSTRAINT `Teacher_Subjects_ibfk_1` FOREIGN KEY (`Teacher_ID`) REFERENCES `Teacher` (`Teacher_ID`) ON DELETE CASCADE,
  CONSTRAINT `Teacher_Subjects_ibfk_2` FOREIGN KEY (`Subject_ID`) REFERENCES `Subjects` (`Subject_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teacher_Subjects`
--

LOCK TABLES `Teacher_Subjects` WRITE;
/*!40000 ALTER TABLE `Teacher_Subjects` DISABLE KEYS */;
INSERT INTO `Teacher_Subjects` VALUES (19,1,1),(20,2,2),(21,3,1),(22,4,2),(23,5,1),(24,6,2),(25,6,1),(26,7,3),(27,7,1),(28,11,2);
/*!40000 ALTER TABLE `Teacher_Subjects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-18  9:12:28
