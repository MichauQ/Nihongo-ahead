-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: japaneseapp
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `title_image_path` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Japońskie partykuły – klucz do zrozumienia gramatyki','https://placehold.co/480x320','\n  <p>\n    Język japoński wyróżnia się na tle innych języków swoją unikalną gramatyką,  w której jedną z kluczowych ról odgrywają <strong>partykuly</strong>. Te drobne elementy składniowe nie posiadają samodzielnego znaczenia, ale określają relacje między częściami zdania, wskazując np. podmiot, dopełnienie czy kierunek działania.\n  </p>\n  <h3>Najczęściej spotykane partykuły to:</h3>\n  <ul>\n    <li> <strong>は (ha)</strong> – określa temat zdania: <em>„Watashi ha (wa) gakusei desu”</em> („Ja jestem uczniem”).\n    </li>\n    <li>\n      <strong>が (ga)</strong> – wskazuje podmiot zdania, często podkreślając go: \n      <em>„Dare ga kimasu ka?”</em> („Kto przyjdzie?”).\n    </li>\n    <li>  <strong>を (wo)</strong> – oznacza dopełnienie: \n      <em>„Ringo wo tabemasu”</em> („Jem jabłko”).\n    </li>\n    <li> <strong>で (de)</strong> – wskazuje miejsce akcji: \n      <em>„Gakkou de benkyō shimasu”</em> („Uczę się w szkole”).\n    </li>\n    <li>\n      <strong>の (no)</strong> – określnik posiadania: \n      <em>„Watashi no hon”</em> („Moja książka”).\n    </li>\n    <li>\n      <strong>に (ni)</strong> – wskazuje kierunek ruchu, czas, miejsce lub cel: \n      <em>„Gakkou ni ikimasu”</em> (Idę do szkoły).\n    </li>\n    <li>\n      <strong> へ (he)</strong> – podobna do に, ale kładzie nacisk na kierunek ruchu: \n      <em>„Toukyou he (e) ikimasu”</em> (Jadę do Tokio).\n    </li>\n    <li> <strong>から (kara)</strong> – oznacza punkt początkowy w czasie lub przestrzeni (z/od):  <em>„Nihon kara kimashita”</em> (Przyjechałem z Japonii).\n    </li>\n    <li> <strong>まで (made)</strong> – oznacza punkt końcowy w czasie lub przestrzeni(na/do): <em>„Juu-ji made benkyou shimashita”</em> (Uczyłem się do godziny dziesiątej).\n    </li>\n    <li> <strong>と (to)</strong> – łączy dwie rzeczy (jak „i”) lub wskazuje towarzystwo: \n      <em>„Tomodachi to hanashimasu”</em> (Rozmawiam z przyjacielem).\n    </li>\n    <li> <strong>か (ka)</strong> – tworzy pytania lub oznacza alternatywę (lub):  <em>„Kore wa nan desu ka.”</em> (Co to jest?).\n    </li>\n  </ul>\n  <p>\n    Partykuły to jeden z fundamentów gramatyki języka japońskiego. Znajomość ich zastosowań otwiera drogę do budowania coraz bardziej złożonych zdań i swobodnej komunikacji. </p>'),(2,'Hanami: Tradycja podziwiania kwitnącej wiśni w Japonii','https://placehold.co/480x320','\n  <p>\n  <strong>Hanami</strong> (<em>花見</em>) to jedno z najbardziej rozpoznawalnych i ukochanych świąt w Japonii, związane z podziwianiem kwitnących drzew wiśniowych (<em>„sakura”</em>). Ta wielowiekowa tradycja sięga okresu <strong>Nara</strong> (710-794), kiedy arystokraci organizowali spotkania pod rozkwitniętymi drzewami, aby pisać wiersze i cieszyć się pięknem natury.\n</p>\n\n<p>\n  Współczesne Hanami to święto, podczas którego rodziny, przyjaciele i współpracownicy zbierają się w parkach, rozkładając maty piknikowe pod drzewami wiśni. Popularnym zwyczajem jest:\n</p>\n\n<ul>\n  <li>Jedzenie przekąsek, takich jak <strong>dango</strong> (kulki ryżowe) czy <strong>bento</strong> (zestawy obiadowe).</li>\n  <li>Picie <strong>sake</strong>.</li>\n</ul>\n\n<p>\n  Okres kwitnienia sakury trwa zaledwie kilka tygodni, co sprawia, że jest to czas szczególnie wyczekiwany i celebrowany. Symbolizuje on <strong>ulotność życia</strong> oraz przemijanie, co głęboko wpisuje się w japońską kulturę.\n</p>\n\n<p>\n  Warto doświadczyć Hanami osobiście, odwiedzając Japonię na przełomie <strong>marca i kwietnia</strong>, kiedy natura ukazuje swoje najpiękniejsze oblicze.\n</p>\n'),(3,'Rok szkolny w Japonii: Jak wygląda podział i najważniejsze daty?','https://placehold.co/480x320','\n <p>\n  System edukacji w Japonii różni się od tego znanego w Europie, a jego kalendarz szkolny jest ściśle powiązany z porami roku. Rok szkolny rozpoczyna się w kwietniu, co zbiega się z okresem kwitnienia wiśni, co nadaje temu czasowi szczególny charakter.\n</p>\n\n<p>\n  Rok szkolny jest podzielony na trzy trymestry:\n</p>\n\n<ul>\n  <li>\n    <strong>Pierwszy trymestr:</strong> od kwietnia do lipca. Po nim następują wakacje letnie, trwające zazwyczaj od końca lipca do końca sierpnia.\n  </li>\n  <li>\n    <strong>Drugi trymestr:</strong> od września do grudnia. W grudniu uczniowie mają krótką przerwę świąteczno-noworoczną.\n  </li>\n  <li>\n    <strong>Trzeci trymestr:</strong> od stycznia do marca. W marcu kończy się rok szkolny i uczniowie przechodzą do następnej klasy lub kończą edukację na danym poziomie.\n  </li>\n</ul>\n\n<p>\n  W systemie japońskim duży nacisk kładzie się na edukację moralną, współpracę w grupie oraz rozwój osobisty. Uczniowie nie tylko zdobywają wiedzę teoretyczną, ale również uczą się odpowiedzialności, np. poprzez sprzątanie sal lekcyjnych czy współorganizację wydarzeń szkolnych.\n</p>\n\n<p>\n  Dni wolne, takie jak święta narodowe, oraz przerwy między trymestrami dają uczniom czas na odpoczynek i uczestnictwo w różnych wydarzeniach kulturowych. Taki system sprzyja zbalansowanemu podejściu do nauki i życia codziennego.\n</p>\n\n');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-31  2:38:09
