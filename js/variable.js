// 游戏设置
var LEVEL = 0; // 游戏难度
const MAP_HEIGHT = 650; // 地图高度
const MAP_WIDTH = 1500; // 游戏宽度
const CELL_WIDTH = 50; // 每格的长度
const TOTAL_LEVEL = 5; // 游戏总共轮数
const START_X = 0; // 敌人出发位置 X
const START_Y = 300; // 敌人出发位置 Y
const END_X = 1450; // 保护位置 X
const END_Y = 300; //保护位置 Y
const MAP_X = MAP_WIDTH / CELL_WIDTH; // 地图X格子数
const MAP_Y = MAP_HEIGHT / CELL_WIDTH; // 地图Y格子数

const ENEMY_BASE_NUMBER = 10; // 敌人基本数量10
const ENEMY_UP_NUMBER = 5; // 升一级 敌人数量增加

// 敌人设置
const ENEMY_BASE_HP = 10; // 敌人基本血量
const ENEMY_UP_HP = 10; // 升一级 敌人血量增加
const ENEMY_BASE_SPEED = 3; // 敌人基本速度3秒一格
const ENEMY_MAX_SPEED = 0.5; // 敌人最快速度0.5秒一格
const ENEMY_UP_SPEED = 0.5; // 升一级 敌人速度增加
const ENEMY_BASE_INTERVAL = 6; //生成敌人的间隔
const ENEMY_UP_INTERVAL = 1; // 升一级 敌人间隔减少

// 防御塔设置
const TOWER_BASE_RAN = 1; // 防御塔攻击范围
const TOWER_BASE_SPEED = 1; // 防御塔基本攻击速度 2秒一格子
const TOWER_BASE_NUMBER = 50; // 防御塔基本数量
const TOWER_BASE_INTERVA = 2; //防御塔基本攻击速度
const TOWER_UP_NUMBER = 5; // 升一级，防御塔可以建的数量
const TOWER_UP_RAN = 0.2; // 升一级，防御塔攻击范围增加
const TOWER_UP_INTERVA = 0.2; // 升一级，防御塔攻击速度增加

// 子弹设置
const BULLET_BASE_ATK = 100; // 子弹攻击力
const BULLET_BASE_SPEED = 2; // 子弹飞行速度
const BULLET_UP_ATK = 0.2; // 升一级 子弹攻击力增加
const BULLET_UP_SPEED = 0.2; //升一级 子弹速度加快
const BULLET_BASE_COLOR = "#4DFFFF"; // 子弹颜色 

// 地图
const MAP_ARR = new Array();

//人物设置
const PlAYER_BASE_MONEY = 200; //玩家的初始金币
const END_HP = 100; //基地血量
//控制小兵出生间隔速度
var TIMEOUT = 10;