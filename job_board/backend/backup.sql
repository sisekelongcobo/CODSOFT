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
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `postedDate` varchar(50) NOT NULL,
  `jobType` varchar(50) NOT NULL,
  `workMode` varchar(50) NOT NULL,
  `companyDescription` text,
  `roleDescription` text,
  `jobDescription` text,
  `responsibilities` json DEFAULT NULL,
  `requirements` json DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'Software Engineer','Tech Corp','Cape Town, Western Cape','2 days ago','Full-time','Hybrid','Tech Corp is a leading technology company focused on delivering innovative solutions. We value creativity, collaboration, and excellence.','As a Software Engineer, you will design and develop software applications. Collaborating with a dynamic team, you will create high-quality products.','We are looking for a skilled Software Engineer to join our team. The successful candidate will work on developing high-quality applications and collaborate with other developers, designers, and product managers.','[\"Develop and maintain software applications\", \"Collaborate with cross-functional teams\", \"Participate in code reviews and contribute to team knowledge sharing\", \"Troubleshoot and debug applications\"]','[\"Bachelor?s degree in Computer Science or related field\", \"Experience with JavaScript, React, and Node.js\", \"Strong problem-solving skills\", \"Excellent communication skills\"]','2024-09-26 03:53:31'),(2,'Marketing Specialist','Creative Agency','Johannesburg, Gauteng','1 week ago','Contract','Remote','Creative Agency is a top marketing agency known for developing cutting-edge marketing strategies for various clients.','The Marketing Specialist will work on campaigns to drive brand awareness and engagement for our clients. You?ll be involved in content creation and strategy.','We are seeking a creative Marketing Specialist to develop innovative marketing strategies and campaigns for a diverse portfolio of clients.','[\"Develop and execute marketing campaigns\", \"Create compelling content for digital and print media\", \"Collaborate with clients to understand their needs\", \"Analyze campaign performance and optimize strategies\"]','[\"Degree in Marketing, Communications, or a related field\", \"Proficiency in digital marketing tools (e.g., Google Analytics)\", \"Experience in social media management\", \"Strong writing and editing skills\"]','2024-09-26 03:53:31'),(3,'Product Manager','Startup Inc.','Durban, KwaZulu-Natal','3 days ago','Full-time','Onsite','Startup Inc. is a fast-growing company focused on delivering innovative products to solve real-world problems.','The Product Manager will be responsible for guiding the development of new products from concept to launch, working closely with engineering and marketing teams.','We are looking for an experienced Product Manager to oversee product development, ensuring alignment with business goals and market needs.','[\"Define product strategy and roadmap\", \"Work with engineering teams to develop product features\", \"Coordinate with marketing for product launch campaigns\", \"Analyze market trends and customer feedback\"]','[\"Proven experience in product management\", \"Ability to lead cross-functional teams\", \"Strong analytical and problem-solving skills\", \"Excellent communication and presentation skills\"]','2024-09-26 03:53:31'),(4,'Data Scientist','Big Data Analytics','Pretoria, Gauteng','4 days ago','Full-time','Remote','Big Data Analytics is a global leader in data science, offering data-driven solutions to help businesses make informed decisions.','The Data Scientist will apply machine learning techniques to analyze large datasets and generate actionable insights for business improvement.','We are seeking a talented Data Scientist to work with large datasets, applying statistical models and machine learning algorithms to solve complex business problems.','[\"Analyze large datasets to discover trends\", \"Develop machine learning models\", \"Communicate findings to stakeholders\", \"Collaborate with cross-functional teams\"]','[\"Degree in Statistics, Computer Science, or related field\", \"Experience with Python, R, and SQL\", \"Knowledge of machine learning algorithms\", \"Strong communication and problem-solving skills\"]','2024-09-26 03:53:31'),(5,'UI/UX Designer','DesignPro Studio','Sandton, Gauteng','5 days ago','Contract','Hybrid','DesignPro Studio is a design consultancy that specializes in creating user-centered interfaces for mobile and web applications.','The UI/UX Designer will create intuitive and aesthetically pleasing user interfaces while ensuring a seamless user experience.','We are looking for a creative UI/UX Designer to collaborate with developers and clients to design cutting-edge digital experiences.','[\"Design user interfaces for web and mobile apps\", \"Conduct user research and usability testing\", \"Collaborate with developers to implement designs\", \"Stay updated with design trends and best practices\"]','[\"Experience with Figma, Sketch, or Adobe XD\", \"Strong portfolio showcasing UI/UX design work\", \"Knowledge of design systems and responsive design\", \"Excellent communication skills\"]','2024-09-19 10:00:00'),(6,'DevOps Engineer','Cloud Solutions','Bloemfontein, Free State','1 week ago','Full-time','Onsite','Cloud Solutions is a leader in cloud computing services, helping businesses transition to scalable and secure cloud infrastructures.','As a DevOps Engineer, you will manage the cloud infrastructure, automate deployments, and ensure the reliability of production environments.','We are seeking a DevOps Engineer to maintain and optimize our cloud infrastructure, focusing on automation, monitoring, and security.','[\"Manage cloud infrastructure (AWS, Azure, GCP)\", \"Automate software deployments and monitoring\", \"Ensure system security and scalability\", \"Collaborate with developers and IT teams\"]','[\"Experience with cloud platforms (AWS, Azure, GCP)\", \"Strong understanding of CI/CD pipelines\", \"Familiarity with Docker and Kubernetes\", \"Excellent problem-solving and communication skills\"]','2024-09-19 10:00:00'),(7,'Financial Analyst','FinGroup','Port Elizabeth, Eastern Cape','1 day ago','Full-time','Hybrid','FinGroup is a leading financial services company that provides investment advice and risk management solutions.','The Financial Analyst will analyze financial data, prepare reports, and provide recommendations to improve business performance.','We are looking for a Financial Analyst to assess business performance and provide actionable insights to drive financial success.','[\"Analyze financial statements and forecasts\", \"Prepare reports for senior management\", \"Provide insights on financial performance\", \"Work with departments to improve profitability\"]','[\"Degree in Finance or Accounting\", \"Strong analytical and Excel skills\", \"Experience with financial modeling\", \"Excellent communication and reporting skills\"]','2024-09-19 10:00:00'),(8,'Operations Manager','Logistics World','East London, Eastern Cape','2 weeks ago','Full-time','Onsite','Logistics World provides comprehensive logistics and supply chain solutions to clients across various industries.','The Operations Manager will oversee daily operations, manage supply chain logistics, and ensure the efficient flow of goods and services.','We are looking for an experienced Operations Manager to manage logistics and supply chain operations, ensuring timely delivery of goods.','[\"Oversee daily logistics operations\", \"Ensure efficient supply chain processes\", \"Collaborate with vendors and suppliers\", \"Manage logistics staff and warehouse operations\"]','[\"Experience in logistics and supply chain management\", \"Strong leadership and organizational skills\", \"Knowledge of logistics software\", \"Ability to manage a large team\"]','2024-09-19 10:00:00'),(9,'Human Resources Manager','PeopleFirst','Polokwane, Limpopo','3 days ago','Full-time','Hybrid','PeopleFirst is a HR consulting firm specializing in employee relations, talent acquisition, and workplace culture enhancement.','The HR Manager will manage recruitment, employee relations, and performance management to ensure a positive work environment.','We are seeking an HR Manager to lead our human resources department, focusing on recruitment, employee relations, and enhancing workplace culture.','[\"Oversee recruitment and hiring processes\", \"Manage employee relations and conflict resolution\", \"Develop and implement HR policies\", \"Lead performance management initiatives\"]','[\"Degree in Human Resources or a related field\", \"Experience in recruitment and employee relations\", \"Strong communication and leadership skills\", \"Knowledge of labor laws and HR policies\"]','2024-09-19 10:00:00'),(10,'Backend Developer','Innovative Solutions','Remote','2024-09-26','Full-time','Remote','Innovative Solutions is a forward-thinking company that specializes in cloud-based applications.','As a Backend Developer, you will be responsible for developing server-side logic, ensuring high performance and responsiveness to requests from the frontend.','We are looking for a dedicated Backend Developer to join our growing team and contribute to the development of our web applications.','[\"Develop and maintain APIs\", \"Collaborate with frontend developers to integrate user-facing elements\", \"Manage and optimize database performance\", \"Participate in code reviews and mentoring\"]','[\"Bachelor’s degree in Computer Science or related field\", \"Proven experience in backend development (Node.js, Python, etc.)\", \"Familiarity with database management systems (MySQL, PostgreSQL, etc.)\", \"Strong problem-solving skills and attention to detail\"]','2024-09-19 10:00:00');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Laptop',1200.99,'Electronics','2024-09-08 13:04:22'),(2,'Phone',699.99,'Electronics','2024-09-08 13:04:22'),(3,'Desk',199.50,'Furniture','2024-09-08 13:04:22'),(4,'Chair',85.75,'Furniture','2024-09-08 13:04:22');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
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
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('user_2llRVybvC2VnvXxm4f1GzTmUdGo','Sisekelo Ngcobo','user','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybGxSVndEbzJrem5hb1pwSnFPS1J6dzBOaGwifQ');
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

-- Dump completed on 2024-09-26  6:40:52
