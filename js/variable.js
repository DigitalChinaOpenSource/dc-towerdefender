// 游戏设置
var LEVEL = 0; // 游戏难度
const MAP_HEIGHT = 660; // 地图高度
const MAP_WIDTH = 1200; // 游戏宽度
const CELL_WIDTH = 60; // 每格的长度
const MAP_X = MAP_WIDTH / CELL_WIDTH; // 地图X格子数
const MAP_Y = MAP_HEIGHT / CELL_WIDTH; // 地图Y格子数

// const ENEMY_BASE_NUMBER = 10; // 敌人基本数量10
// const ENEMY_UP_NUMBER = 5; // 升一级 敌人数量增加

// 敌人设置
const ENEMY_BASE_HP = 10; // 敌人基本血量
const ENEMY_UP_HP = 10; // 升一级 敌人血量增加
const ENEMY_BASE_SPEED = 3; // 敌人基本速度3秒一格
const ENEMY_MAX_SPEED = 0.5; // 敌人最快速度0.5秒一格
const ENEMY_UP_SPEED = 0.5; // 升一级 敌人速度增加
const ENEMY_BASE_INTERVAL = 6; //生成敌人的间隔
const ENEMY_UP_INTERVAL = 0.2; // 升一级 敌人间隔减少

// 防御塔设置
const TOWER_BASE_RAN = 1; // 防御塔攻击范围
const TOWER_BASE_SPEED = 1; // 防御塔基本攻击速度 2秒一格子
const TOWER_BASE_NUMBER = 50; // 防御塔基本数量
const TOWER_BASE_INTERVA = 2; //防御塔基本攻击速度
const TOWER_UP_NUMBER = 5; // 升一级，防御塔可以建的数量
const TOWER_UP_RAN = 0.2; // 升一级，防御塔攻击范围增加
const TOWER_UP_INTERVA = 0.2; // 升一级，防御塔攻击速度增加
var attack_speed = 1.5 ; // 定义攻速变量

// 子弹设置
const BULLET_BASE_DAMAGE = 100; // 子弹伤害
const BULLET_BASE_SPEED = 2; // 子弹飞行速度
const BULLET_UP_ATK = 0.2; // 升一级 子弹攻击力增加
const BULLET_UP_SPEED = 0.2; //升一级 子弹速度加快
 

// 地图
const MAP_ARR = new Array();

//人物设置
const PlAYER_BASE_MONEY = 300; //玩家的初始金币
const END_HP = 100; //基地血量
//控制小兵出生间隔速度
var TIMEOUT = 10;
var all_ghost_num;