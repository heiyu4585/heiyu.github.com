/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2018-03-07 23:51:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `articles`
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL DEFAULT '0',
  `article_title` varchar(255) DEFAULT NULL,
  `article_create_time` datetime DEFAULT NULL,
  `article_update_time` datetime DEFAULT NULL,
  `article_category_id` int(11) DEFAULT NULL,
  `article_content` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES ('0', '前端javascript实现文件的断点续传', '2018-03-07 23:00:44', '2018-03-07 23:00:47', '2', null);
INSERT INTO `articles` VALUES ('1', 'Vue2 + webpack + express4构建单页应用(一)', '2018-03-07 22:58:00', '2018-03-07 22:58:06', '1', null);

-- ----------------------------
-- Table structure for `articles_category_relationship`
-- ----------------------------
DROP TABLE IF EXISTS `articles_category_relationship`;
CREATE TABLE `articles_category_relationship` (
  `object_id` int(11) NOT NULL DEFAULT '0',
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`object_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articles_category_relationship
-- ----------------------------

-- ----------------------------
-- Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `category_des` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', 'webpack', 'webpack相关配置等');
INSERT INTO `category` VALUES ('2', 'vue', 'vue框架');
INSERT INTO `category` VALUES ('3', 'node', 'node相关技术');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL DEFAULT '0',
  `user_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_pass` varchar(255) DEFAULT NULL,
  `user_nicename` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
