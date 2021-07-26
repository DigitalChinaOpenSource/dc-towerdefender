/*
 Navicat Premium Data Transfer

 Source Server         : mysql_local
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : localhost:3306
 Source Schema         : tower_defense_v4.0.1

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 25/07/2021 21:11:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for game_info_pvp
-- ----------------------------
DROP TABLE IF EXISTS `game_info_pvp`;
CREATE TABLE `game_info_pvp`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `player_a` int(0) NOT NULL COMMENT 'A玩家ID',
  `player_b` int(0) NOT NULL COMMENT 'B玩家ID',
  `winner` int(0) NOT NULL COMMENT '赢家ID',
  `begin_time` datetime(0) NOT NULL COMMENT '对局开始时间',
  `end_time` datetime(0) NOT NULL COMMENT '对局结束时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of game_info_pvp
-- ----------------------------

-- ----------------------------
-- Table structure for login_info
-- ----------------------------
DROP TABLE IF EXISTS `login_info`;
CREATE TABLE `login_info`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `login_ip` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '登录IP',
  `login_time` datetime(0) NOT NULL COMMENT '登陆时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of login_info
-- ----------------------------

-- ----------------------------
-- Table structure for online_count
-- ----------------------------
DROP TABLE IF EXISTS `online_count`;
CREATE TABLE `online_count`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `count` int(0) NOT NULL COMMENT '累计在线人数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of online_count
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '用户名',
  `nickname` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '用户昵称',
  `password` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '密码',
  `score` int(0) NULL DEFAULT NULL COMMENT '积分（累计，用于玩家水平区分以及对战匹配依据）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'mhg', 'majortom', '1234', 0);

SET FOREIGN_KEY_CHECKS = 1;
