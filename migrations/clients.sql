-- Valentina Studio --
-- MySQL dump --
-- ---------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- ---------------------------------------------------------


-- CREATE TABLE "clientsinfo" ------------------------------
CREATE TABLE `clientsinfo` ( 
	`id` Int( 255 ) NOT NULL, 
	`first_name` Text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	`last_name` Text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	`age` Text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	`address` Text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	`job` Text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	`email` Text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	`phone_nomber` Char( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	`reg_date` Date NOT NULL, 
	`login` Text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, 
	`password` Text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	 PRIMARY KEY ( `id` )
 )
CHARACTER SET = utf8
COLLATE = utf8_general_ci
ENGINE = InnoDB;
-- ---------------------------------------------------------


-- Dump data of "clientsinfo" ------------------------------
INSERT INTO `clientsinfo`(`id`,`first_name`,`last_name`,`age`,`address`,`job`,`email`,`phone_nomber`,`reg_date`,`login`,`password`) VALUES ( '1', 'admin', 'main', '35', 'Ukraine,', '', 'admin.user@gmail.com', '', '0000-00-00', 'admin', 'pwd1' );
INSERT INTO `clientsinfo`(`id`,`first_name`,`last_name`,`age`,`address`,`job`,`email`,`phone_nomber`,`reg_date`,`login`,`password`) VALUES ( '2', 'Ivan', 'Ivanov', '22', 'Ukraine,', '', 'ivan.ivanov@gmail.com', '0932222222', '0000-00-00', 'ivan.ivanov', '2222222' );
INSERT INTO `clientsinfo`(`id`,`first_name`,`last_name`,`age`,`address`,`job`,`email`,`phone_nomber`,`reg_date`,`login`,`password`) VALUES ( '3', 'Petro', 'Petrov', '55', 'Ukraine, Kharkov', '', '', '', '0000-00-00', '', '' );
INSERT INTO `clientsinfo`(`id`,`first_name`,`last_name`,`age`,`address`,`job`,`email`,`phone_nomber`,`reg_date`,`login`,`password`) VALUES ( '4', 'Aleksandr', 'Kvit', '30', 'Ukraine,', '', 'aleksandr.kvit@gmail.com', '', '0000-00-00', 'aleksandr.kvit', '' );
INSERT INTO `clientsinfo`(`id`,`first_name`,`last_name`,`age`,`address`,`job`,`email`,`phone_nomber`,`reg_date`,`login`,`password`) VALUES ( '5', 'Dmitriy', 'Ost', '26', 'Ukraine,', 'Manager', 'dmitriy.ost@gmail.com', '09355555', '0000-00-00', 'dmitriy.ost', '' );
INSERT INTO `clientsinfo`(`id`,`first_name`,`last_name`,`age`,`address`,`job`,`email`,`phone_nomber`,`reg_date`,`login`,`password`) VALUES ( '6', 'James', 'Braun', '42', 'USA, Texas', '', '', '', '0000-00-00', '', '' );
INSERT INTO `clientsinfo`(`id`,`first_name`,`last_name`,`age`,`address`,`job`,`email`,`phone_nomber`,`reg_date`,`login`,`password`) VALUES ( '7', 'Ralf', 'Dison', '37', 'UK, London', '', '', '', '0000-00-00', '', '' );
INSERT INTO `clientsinfo`(`id`,`first_name`,`last_name`,`age`,`address`,`job`,`email`,`phone_nomber`,`reg_date`,`login`,`password`) VALUES ( '8', 'Rasmus', 'Beast', '21', 'Danmark, Kopenhagen', '', '', '', '0000-00-00', '', '' );
INSERT INTO `clientsinfo`(`id`,`first_name`,`last_name`,`age`,`address`,`job`,`email`,`phone_nomber`,`reg_date`,`login`,`password`) VALUES ( '9', 'Erik', 'Konge', '74', '', '', 'erik.konge@gmail.com', '', '0000-00-00', 'erik.konge', '' );
INSERT INTO `clientsinfo`(`id`,`first_name`,`last_name`,`age`,`address`,`job`,`email`,`phone_nomber`,`reg_date`,`login`,`password`) VALUES ( '10', 'Laura', 'Stain', '32', '', '', 'laura.stain@gmail.com', '', '0000-00-00', 'laura.stain', '' );
INSERT INTO `clientsinfo`(`id`,`first_name`,`last_name`,`age`,`address`,`job`,`email`,`phone_nomber`,`reg_date`,`login`,`password`) VALUES ( '11', 'new_client', '', '', '', '', '', '', '0000-00-00', '', '' );
INSERT INTO `clientsinfo`(`id`,`first_name`,`last_name`,`age`,`address`,`job`,`email`,`phone_nomber`,`reg_date`,`login`,`password`) VALUES ( '12', 'new_client', '', '', '', '', '', '', '0000-00-00', '', '' );
INSERT INTO `clientsinfo`(`id`,`first_name`,`last_name`,`age`,`address`,`job`,`email`,`phone_nomber`,`reg_date`,`login`,`password`) VALUES ( '13', 'new_client', '', '', '', '', '', '', '0000-00-00', '', '' );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


