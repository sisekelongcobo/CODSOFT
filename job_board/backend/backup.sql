-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: job_board
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `educationId` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `institution` varchar(255) DEFAULT NULL,
  `completionDate` date DEFAULT NULL,
  PRIMARY KEY (`educationId`),
  KEY `education_ibfk_1` (`userId`),
  CONSTRAINT `education_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
INSERT INTO `education` VALUES (65,'user_2mzjq8e8KtTUu2Wrm47KcYQuEA0','degree','institution','2021-12-30'),(75,'user_2mct2xF74sfyViuQNRF1xT8u2by','degree','institution','2021-12-27'),(76,'user_2llRVybvC2VnvXxm4f1GzTmUdGo','  New Degree',' New uni','2024-10-15'),(77,'user_2mip1EuHF2lJy2pYPuPto9otSrz','degree','institution','2022-01-01'),(78,'user_2n84dm3v2r0lQV2b70jwT5xWFhU','degree','institution','2022-01-01');
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_preferences`
--

DROP TABLE IF EXISTS `job_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_preferences` (
  `userId` varchar(255) NOT NULL,
  `desiredJobTitle` varchar(255) DEFAULT NULL,
  `preferredLocation` varchar(255) DEFAULT NULL,
  `salaryExpectations` varchar(50) DEFAULT NULL,
  `availability` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `job_preferences_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_preferences`
--

LOCK TABLES `job_preferences` WRITE;
/*!40000 ALTER TABLE `job_preferences` DISABLE KEYS */;
INSERT INTO `job_preferences` VALUES ('user_2llRVybvC2VnvXxm4f1GzTmUdGo','Senior Software Engineer','Johannesburg','R600,000 - R700,000 per annum','Immediate'),('user_2mct2xF74sfyViuQNRF1xT8u2by','Data Scientist','Durban','R500,000 - R600,000 per annum','One Month Notice');
/*!40000 ALTER TABLE `job_preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `jobId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `jobType` varchar(50) NOT NULL,
  `workMode` varchar(50) NOT NULL,
  `companyDescription` text,
  `roleDescription` text,
  `jobDescription` text,
  `responsibilities` json DEFAULT NULL,
  `requirements` json DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `userId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`jobId`),
  KEY `fk_userId` (`userId`),
  CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'Software Engineer','Tech Corp','Cape Town, Western Cape','Full-time','Hybrid','Tech Corp is a leading technology company focused on delivering innovative solutions. We value creativity, collaboration, and excellence.','As a Software Engineer, you will design and develop software applications. Collaborating with a dynamic team, you will create high-quality products.','We are looking for a skilled Software Engineer to join our team. The successful candidate will work on developing high-quality applications and collaborate with other developers, designers, and product managers.','[\"Develop and maintain software applications\", \"Collaborate with cross-functional teams\", \"Participate in code reviews and contribute to team knowledge sharing\", \"Troubleshoot and debug applications\"]','[\"Bachelor?s degree in Computer Science or related field\", \"Experience with JavaScript, React, and Node.js\", \"Strong problem-solving skills\", \"Excellent communication skills\"]','2024-09-26 03:53:31',NULL),(4,'Data Scientist','Big Data Analytics','Pretoria, Gauteng','Full-time','Remote','Big Data Analytics is a global leader in data science, offering data-driven solutions to help businesses make informed decisions.','The Data Scientist will apply machine learning techniques to analyze large datasets and generate actionable insights for business improvement.','We are seeking a talented Data Scientist to work with large datasets, applying statistical models and machine learning algorithms to solve complex business problems.','[\"Analyze large datasets to discover trends\", \"Develop machine learning models\", \"Communicate findings to stakeholders\", \"Collaborate with cross-functional teams\"]','[\"Degree in Statistics, Computer Science, or related field\", \"Experience with Python, R, and SQL\", \"Knowledge of machine learning algorithms\", \"Strong communication and problem-solving skills\"]','2024-09-26 03:53:31',NULL),(6,'DevOps Engineer','Cloud Solutions','Bloemfontein, Free Statesss','Full-time','On-site','Cloud Solutions is a leader in cloud computing services, helping businesses transition to scalable and secure cloud infrastructures.','As a DevOps Engineer, you will manage the cloud infrastructure, automate deployments, and ensure the reliability of production environments.','We are seeking a DevOps Engineer to maintain and optimize our cloud infrastructure, focusing on automation, monitoring, and security.','[\"Manage cloud infrastructure (AWS, Azure, GCP)\", \"Automate software deployments and monitoring\", \"Ensure system security and scalability\", \"Collaborate with developers and IT teams\"]','[\"Experience with cloud platforms (AWS, Azure, GCP)\", \"Strong understanding of CI/CD pipelines\", \"Familiarity with Docker and Kubernetes\", \"Excellent problem-solving and communication skills\"]','2024-09-19 10:00:00','user_2llRVybvC2VnvXxm4f1GzTmUdGo'),(10,'Backend Developer','Innovative Solutions','Remote','Full-time','Remote','Innovative Solutions is a forward-thinking company that specializes in cloud-based applications.','As a Backend Developer, you will be responsible for developing server-side logic, ensuring high performance and responsiveness to requests from the frontend.','We are looking for a dedicated Backend Developer to join our growing team and contribute to the development of our web applications.','[\"Develop and maintain APIs\", \"Collaborate with frontend developers to integrate user-facing elements\", \"Manage and optimize database performance\", \"Participate in code reviews and mentoring\"]','[\"Bachelor’s degree in Computer Science or related field\", \"Proven experience in backend development (Node.js, Python, etc.)\", \"Familiarity with database management systems (MySQL, PostgreSQL, etc.)\", \"Strong problem-solving skills and attention to detail\"]','2024-09-19 10:00:00',NULL),(11,'DevOps Engineer','Cloud Solutionss','Bloemfontein, Free States','Full-time','On-site','Cloud Solutions is a leader in cloud computing services, helping businesses transition to scalable and secure cloud infrastructures.','As a DevOps Engineer, you will manage the cloud infrastructure, automate deployments, and ensure the reliability of production environments.','We are seeking a DevOps Engineer to maintain and optimize our cloud infrastructure, focusing on automation, monitoring, and security.','[\"Manage cloud infrastructure (AWS, Azure, GCP)\", \"Automate software deployments and monitoring\", \"Ensure system security and scalability\", \"Collaborate with developers and IT teams\"]','[\"Experience with cloud platforms (AWS, Azure, GCP)\", \"Strong understanding of CI/CD pipelines\", \"Familiarity with Docker and Kubernetes\", \"Excellent problem-solving and communication skills\"]','2024-10-02 14:57:23','user_2llRVybvC2VnvXxm4f1GzTmUdGo'),(14,'Job title','Company name','location','Contract','On-site','Company Desc','Role Desc','Job Desc','[\"re\"]','[\"req1\"]','2024-10-05 22:02:39',NULL),(15,'s','sas','sasa','Full-time','Hybrid','kask','wiuh','aiuhq','[\"reuqw\"]','[\"uywe\"]','2024-10-05 22:04:21',NULL),(16,'s','sas','sasa','Full-time','Hybrid','kask','wiuh','aiuhq','[\"reuqw\"]','[\"uywe\"]','2024-10-05 22:04:25',NULL),(19,'Software','Comp N','Loc N','Full-time','On-site','Comp Desc','Role desc','job Desc','[\"res1\"]','[\"Req1\"]','2024-10-06 00:07:21','user_2mct2xF74sfyViuQNRF1xT8u2by'),(20,'job nom','new','Location','Seasonal','On-site','new','new','new','[\"new\"]','[\"new\"]','2024-10-04 02:15:12','user_2mct2xF74sfyViuQNRF1xT8u2by');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_information`
--

DROP TABLE IF EXISTS `personal_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_information` (
  `userId` varchar(255) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `emailAddress` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `resume` varchar(255) DEFAULT NULL,
  `linkedInProfileLink` varchar(255) DEFAULT NULL,
  `githubProfileLink` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `personal_information_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_information`
--

LOCK TABLES `personal_information` WRITE;
/*!40000 ALTER TABLE `personal_information` DISABLE KEYS */;
INSERT INTO `personal_information` VALUES ('user_2llRVybvC2VnvXxm4f1GzTmUdGo','Sisekelo Ngcobo','0721234567','sisekeloking@gmail.com','Johannesburg, Gauteng','https://dkvy6xyit7qmdhcf.public.blob.vercel-storage.com/November%202024%20Provisional%20Timetable-VhstfYxFXpvfULYq7N3HY5tI7V6XU2.pdf','https://www.linkedin.com/in/alice-mkhize','https://github.com/alicemkhize'),('user_2mct2xF74sfyViuQNRF1xT8u2by','Marce Ngcobo','0827654321','marcengcobo@gmail.com','Durban','resume_marce.pdf','https://www.linkedin.com/in/thabo-dlamini','https://github.com/thabodlamini'),('user_2mip1EuHF2lJy2pYPuPto9otSrz','fullName','1234567890','2433205@students.wits.ac.za','City','resume','linkedInProfileLink','githubProfileLink'),('user_2mzjq8e8KtTUu2Wrm47KcYQuEA0','Sphindile','078566743','sphindilengcobo302@gmail.com','Port Sheptone','https://dkvy6xyit7qmdhcf.public.blob.vercel-storage.com/Project%20Summary%20(2)-9SQn6W5qHLQPyMGbKCbCwo5EVJBdOo.pdf','linkedInProfileLink','githubProfileLink'),('user_2n84dm3v2r0lQV2b70jwT5xWFhU','fullName','1234567890','sisekeloking@gmail.com','City','resume','linkedInProfileLink','githubProfileLink');
/*!40000 ALTER TABLE `personal_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio`
--

DROP TABLE IF EXISTS `portfolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolio` (
  `projectId` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `projectTitle` varchar(255) DEFAULT NULL,
  `projectLink` varchar(255) DEFAULT NULL,
  `projectDescription` text,
  PRIMARY KEY (`projectId`),
  KEY `portfolio_ibfk_1` (`userId`),
  CONSTRAINT `portfolio_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio`
--

LOCK TABLES `portfolio` WRITE;
/*!40000 ALTER TABLE `portfolio` DISABLE KEYS */;
INSERT INTO `portfolio` VALUES (74,'user_2mzjq8e8KtTUu2Wrm47KcYQuEA0','projectTitle','projectLink','projectDescription'),(87,'user_2mct2xF74sfyViuQNRF1xT8u2by','Data Analysis Dashboard','https://data-insights-dashboard.com','Created an interactive data visualization dashboard using Python and Power BI, displaying insights on company sales and customer behavior.'),(88,'user_2mct2xF74sfyViuQNRF1xT8u2by','IT Support Knowledge Base','https://itsupport-docs.com','Developed a knowledge base for IT support documentation using WordPress, allowing technicians to easily access troubleshooting guides.'),(89,'user_2llRVybvC2VnvXxm4f1GzTmUdGo','E-commerce Website','https://ecommerce-example.com','Developed a fully-functional e-commerce platform using React, Node.js, and MySQL. The platform supports user authentication, product browsing, and secure payments.'),(90,'user_2mip1EuHF2lJy2pYPuPto9otSrz','projectTitle','projectLink','projectDescription'),(91,'user_2n84dm3v2r0lQV2b70jwT5xWFhU','projectTitle','projectLink','projectDescription');
/*!40000 ALTER TABLE `portfolio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `userId` varchar(255) NOT NULL,
  `skills` json DEFAULT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `skills_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES ('user_2llRVybvC2VnvXxm4f1GzTmUdGo','[\"React\", \"Node.js\", \"MySQL\", \"TypeScript\"]'),('user_2mct2xF74sfyViuQNRF1xT8u2by','[\"Python\", \"Data Analysis\", \"Power BI\", \"SQL\"]'),('user_2mip1EuHF2lJy2pYPuPto9otSrz','[\"skill1\"]'),('user_2mzjq8e8KtTUu2Wrm47KcYQuEA0','[\"skill1\"]'),('user_2n84dm3v2r0lQV2b70jwT5xWFhU','[\"skill1\"]');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_applications`
--

DROP TABLE IF EXISTS `user_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_applications` (
  `applicationId` int NOT NULL AUTO_INCREMENT,
  `jobId` int DEFAULT NULL,
  `userId` varchar(255) NOT NULL,
  `status` enum('Pending','Accepted','Rejected','Under Review') DEFAULT 'Pending',
  `appliedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`applicationId`),
  KEY `jobId` (`jobId`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_applications_ibfk_1` FOREIGN KEY (`jobId`) REFERENCES `jobs` (`jobId`) ON DELETE CASCADE,
  CONSTRAINT `user_applications_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_applications`
--

LOCK TABLES `user_applications` WRITE;
/*!40000 ALTER TABLE `user_applications` DISABLE KEYS */;
INSERT INTO `user_applications` VALUES (1,1,'user_2llRVybvC2VnvXxm4f1GzTmUdGo','Pending','2024-09-15 10:00:00'),(4,4,'user_2mct2xF74sfyViuQNRF1xT8u2by','Pending','2024-09-22 09:20:00'),(6,6,'user_2mct2xF74sfyViuQNRF1xT8u2by','Pending','2024-09-24 12:50:00'),(8,4,'user_2llRVybvC2VnvXxm4f1GzTmUdGo','Pending','2024-10-05 00:47:08'),(9,6,'user_2llRVybvC2VnvXxm4f1GzTmUdGo','Pending','2024-10-05 00:51:12'),(12,19,'user_2llRVybvC2VnvXxm4f1GzTmUdGo','Pending','2024-10-06 02:08:04'),(13,20,'user_2llRVybvC2VnvXxm4f1GzTmUdGo','Rejected','2024-10-06 02:16:33'),(15,1,'user_2mct2xF74sfyViuQNRF1xT8u2by','Pending','2024-10-07 03:13:04');
/*!40000 ALTER TABLE `user_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `role` enum('user','employer') DEFAULT 'user',
  `imageUrl` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('user_2llKLzn394t608a6dnghAbG1kKN','Sisekelo Ngcobo','user','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybGxLTHlaZGR4b0I3MXEwRUpXbmI1cWhBTE4ifQ','sisekelongcobo12@gmail.com'),('user_2llRVybvC2VnvXxm4f1GzTmUdGo','Sisekelo Ngcobo','user','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybGxSVndEbzJrem5hb1pwSnFPS1J6dzBOaGwifQ','sisekeloking@gmail.com'),('user_2mct2xF74sfyViuQNRF1xT8u2by','Marce Ngcobo','user','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybWN0MzdvNjlnV3J2SHZFU1RLamMyejN1dWYifQ','marcengcobo@gmail.com'),('user_2md4weEpvroyMW7vce9rCEfZ5Zt','Yereba Boo','user','https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ybGxIc1JDYU5haUtHQm5YcmJYN1lGNktWQm0iLCJyaWQiOiJ1c2VyXzJtZDR3ZUVwdnJveU1XN3ZjZTlyQ0VmWjVadCIsImluaXRpYWxzIjoiWUIifQ','yereba3833@abevw.com'),('user_2mip1EuHF2lJy2pYPuPto9otSrz','Mhleli Ngcobo','user','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18ybWlwMUI4Nnlkc1lOQ0tYSFMxM3BCT1U2MlMifQ','2433205@students.wits.ac.za'),('user_2mzjq8e8KtTUu2Wrm47KcYQuEA0','Sphindile Ngcobo','user','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybXpqcTVaTHh2Z2VvME5ZRDZtTEk1eHU1SEUifQ','sphindilengcobo302@gmail.com'),('user_2n84dm3v2r0lQV2b70jwT5xWFhU','Sisekelo Ngcobo','user','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybjg0ZHFEWVp4OEJjek01UTNuM1NMNDlPdHEifQ','sisekeloking@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_experience`
--

DROP TABLE IF EXISTS `work_experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_experience` (
  `experienceId` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `jobTitle` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `responsibilities` text,
  PRIMARY KEY (`experienceId`),
  KEY `work_experience_ibfk_1` (`userId`),
  CONSTRAINT `work_experience_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_experience`
--

LOCK TABLES `work_experience` WRITE;
/*!40000 ALTER TABLE `work_experience` DISABLE KEYS */;
INSERT INTO `work_experience` VALUES (65,'user_2mzjq8e8KtTUu2Wrm47KcYQuEA0','jobTitle','company','2021-12-30','2021-12-30','responsibilities'),(77,'user_2mct2xF74sfyViuQNRF1xT8u2by','jobTitle','company','2021-12-27','2021-12-27','responsibilities'),(78,'user_2llRVybvC2VnvXxm4f1GzTmUdGo','Job Title','Company','2024-09-07','2024-09-28','re'),(79,'user_2mip1EuHF2lJy2pYPuPto9otSrz','jobTitle','company','2022-01-01','2022-01-01','responsibilities'),(80,'user_2n84dm3v2r0lQV2b70jwT5xWFhU','jobTitle','company','2022-01-01','2022-01-01','responsibilities');
/*!40000 ALTER TABLE `work_experience` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-08  1:00:31
