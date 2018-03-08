/*
 Navicat MySQL Data Transfer

 Source Server         : 本地mysql连接
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost
 Source Database       : blog

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : utf-8

 Date: 03/08/2018 13:27:11 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `articles`
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `art_title` varchar(255) NOT NULL,
  `art_create_time` datetime DEFAULT NULL,
  `art_update_time` datetime DEFAULT NULL,
  `art_category_id` int(11) DEFAULT NULL,
  `art_content` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `articles`
-- ----------------------------
BEGIN;
INSERT INTO `articles` VALUES ('1', 'GraphQL是应用层查询语言', '2018-03-07 22:58:00', '2018-03-07 22:58:06', '1', '源代码的再发布必须遵守上述版权通知、本条件列表以及以下免责声明。\n以二进制形式再发布软件时必须复制上述版权通知、本条件列表以及文档下文中的免责声明和/或发布代码时提供的其他信息。(译者案：所以下面保留英文原版)\n未经事先书面批准的情况下，不得将名称Facebook或贡献者名字用于支持或推广该软件的衍生产品。'), ('2', '前端javascript实现文件的断点续传', '2018-03-07 23:00:44', '2018-03-07 23:00:47', '2', '这是一份GraphQL规范的征求意见稿草案，其中GraphQL是Facebook于2012年创造的一种用于描述CS应用中数据模型的能力和要求的语言。本标准的开发起始于2015年，GraphQL是一种在还在演进的未完成的新语言，其重大功能增强也会在本规范的未来版本中体现。');
COMMIT;

-- ----------------------------
--  Table structure for `articles_category_relationship`
-- ----------------------------
DROP TABLE IF EXISTS `articles_category_relationship`;
CREATE TABLE `articles_category_relationship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) NOT NULL DEFAULT '0',
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `articles_category_relationship`
-- ----------------------------
BEGIN;
INSERT INTO `articles_category_relationship` VALUES ('1', '1', '1'), ('2', '2', '2');
COMMIT;

-- ----------------------------
--  Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `category_des` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `category`
-- ----------------------------
BEGIN;
INSERT INTO `category` VALUES ('1', 'webpack', 'webpack相关配置等'), ('2', 'vue', 'vue框架'), ('3', 'node', 'node相关技术'), ('4', 'GraphQL', 'GraphQL查询语句');
COMMIT;

-- ----------------------------
--  Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_pass` varchar(255) DEFAULT NULL,
  `user_nicename` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
