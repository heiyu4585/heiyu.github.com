/*
 Navicat MySQL Data Transfer

 Source Server         : 本地mysql连接
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost
 Source Database       : graphql

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : utf-8

 Date: 03/04/2018 00:38:35 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `course`
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course` varchar(50) DEFAULT NULL,
  `score` int(5) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `course`
-- ----------------------------
BEGIN;
INSERT INTO `course` VALUES ('1', '数学', '33', '1'), ('2', '语文', '55', '3'), ('3', '数学', '55', '2'), ('4', '历史', '44', '2');
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT '1',
  `intro` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', 'xiaoming', '1', '5555555555'), ('2', '2', '1', 'sdfasdfasdfasdfasdf'), ('3', '2333', '444', 'zhaiqianfeng'), ('4', 'asd', '2', 'asdfasdf'), ('5', 'nk', '22', null), ('6', 'nk', '22', null), ('7', 'nk', '22', null), ('8', 'nk', '22', null), ('9', 'nk', '22', null), ('10', 'nk', '22', null), ('11', 'nk', '22', null), ('12', 'nk', '22', null), ('13', 'nk', '22', null), ('14', 'nk', '22', null), ('15', 'nk', '22', null), ('16', 'nk', '22', null), ('17', 'nk', '22', null), ('18', 'nk', '22', null), ('19', 'nk', '22', null), ('20', 'nk', '22', null), ('21', 'nk', '22', null), ('22', 'nk', '22', null), ('23', 'nk', '22', 'sdfasdfasdf'), ('24', 'nk', '22', 'sdfasdfasdf'), ('25', 'ddd', null, '33'), ('26', 'nk', '22', 'sdfasdfasdf'), ('27', 'ddd', null, '33');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
