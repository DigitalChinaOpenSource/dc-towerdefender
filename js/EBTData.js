//----------------------------小兵，塔，子弹----字典---------------------------
/**
 * 小兵种类
 * 参数说明：
 * [血量,速度,大小,图片,死亡掉落金币,到达终点时造成的伤害,类型]
 */
var EnemyType = {
     Monster_low_1: [100, 800, 60, "img/1-1.png", 15, 16, 1],
     Monster_low_2: [200, 1200, 60, "img/2-1.png", 25, 21, 2],
     // tank怪
     Monster_tank_1: [600, 600, 60, "img/3-1.png", 40, 31, 3],
     Monster_tank_2: [1200, 700, 60, "img/4-1.png", 60, 41, 4],
     Monster_tank_3: [2000, 800, 60, "img/5-1.png", 80, 61, 5],
     Monster_tank_4: [3000, 800, 60, "img/5-1.png", 80, 61, 5],
     Monster_tank_5: [4000, 800, 60, "img/5-1.png", 80, 61, 5],
     // 快速怪
     Monster_fast_1: [300, 1500, 60, "img/6-1.png", 30, 26, 6],
     Monster_fast_2: [500, 1600, 60, "img/7-1.png", 50, 31, 7],
     Monster_fast_3: [700, 1600, 60, "img/8-1.png", 80, 40, 8],
     Monster_fast_4: [1000, 1600, 60, "img/7-1.png", 80, 40, 7],
     Monster_fast_5: [1500, 1600, 60, "img/8-1.png", 100, 50, 8],
     // boss怪
     Monster_boss_1: [6000, 900, 60, "img/9-1.png", 0, 80, 9],
     Monster_boss_2: [9000, 900, 60, "img/10-1.png", 0, 80, 10],
     Monster_boss_3: [12000, 1000, 60, "img/11-1.png", 0, 80, 11],
 }
/**
 * 子弹的属性模板
 * 参数说明：
 * {类型，速度，颜色，大小，子弹伤害}
 */
 var BulletType = {
    zero: { type: 0, speed: 15, color: "img/ff3.png", size: 3, attack: 20,run:1,reduce:0,blood:0,second:0},
    one: { type: 1, speed: 15, color: "img/z1.png", size: 3, attack: 60,run:1,reduce:0,blood:0,second:0},//普通子弹 1 2 3号
    two: { type: 2, speed: 15, color: "img/z2.png", size: 4, attack: 120 ,run:1,reduce:0,blood:0,second:0},    ///////////////////////////  run减速比  reduce减速时间 blood扣血 second扣血时间
    three: { type: 3, speed: 15, color: "img/z3.png", size: 3, attack: 180 ,run:1,reduce:0,blood:0,second:0},
    four: { type: 4, speed: 15, color: "img/zb1.png", size: 3, attack: 100 ,run:1,reduce:0,blood:0,second:0},  //红色子弹 4 5 6号
    five: { type: 5, speed: 15, color: "img/zb1.png", size: 3, attack: 200 ,run:1,reduce:0,blood:0,second:0},
    six: { type: 6, speed: 15, color: "img/zb1.png", size: 3, attack: 300,run:1,reduce:0,blood:0,second:0},
    seven: { type: 7, speed: 16, color: "img/fb1.png", size: 4, attack: 50 ,run:1,reduce:0,blood:0,second:0},//无属性飞镖 7号
    eight: { type: 8, speed: 16, color: "img/fb2.png", size: 4, attack: 80,run:0.8,reduce:3,blood:0,second:0},//减速飞镖 8 20%*3秒
    nine: { type: 9, speed: 16, color: "img/fb3.png", size: 4, attack: 150,run:0.65,reduce:3,blood:0,second:0},//减速飞镖 9 50%*3秒
    ten: { type: 10, speed: 15, color: "img/hy1.png", size: 4, attack: 150,run:1,reduce:0,blood:20,second:3},//火焰 10  hp-20*3s
    eleven: { type: 11, speed: 16, color: "img/hy2.png", size: 4, attack: 225,run:0.8,reduce:3,blood:20,second:3},//火焰 11 减速20%*3s hp-20*3s
    twelve: { type: 12, speed: 16, color: "img/hy3.png", size: 4, attack: 300 ,run:0.6,reduce:3,blood:30,second:5},//火焰 12 减速40%*3s hp-30*5s
    thirteen: { type: 13, speed: 10, color: "img/xh1.png", size: 4, attack: 40 ,run:0.7,reduce:3,blood:0,second:0},//冰冻弹 13 减速30%*3s
    fourteen: { type: 14, speed: 12, color: "img/xh2.png", size: 4, attack: 80 ,run:0,reduce:2,blood:0,second:0},//冰冻弹14 禁锢两秒
    fifteen: { type: 15, speed: 14, color: "img/xh3.png", size: 4, attack: 120,run:0,reduce:3,blood:0,second:0},//冰冻弹15 禁锢三秒  结束时减速30%*3s   
    zero_1: { type: 16, speed: 15, color: "img/n4.png", size: 3, attack: 40,run:1,reduce:0,blood:0,second:0},
    zero_2: { type: 17, speed: 15, color: "img/ftp.png", size: 3, attack: 60,run:1,reduce:0,blood:0,second:0},

}

    /**
     * 塔的属性模板
     * 参数说明
     * {类型，攻击范围，塔的图片，塔的子弹的属性模板，建塔的费用，卖掉的收益}
     */
        //用Type来分类
         //1-3是机枪类武器
         //4-6是飞镖类武器，可以减速
         //7-9是毒镖类武器，可以减速以及中毒，造成持续伤害
         //10-12是金矿类，可以产生金币
         //13-15是冰冻类，可以减速，高等级可以禁锢
         //16-18是火焰类，可以造成范围伤害。
 var TowerType = {
              one:{type :1,range: 3, tower_img: "img/tower1.png", bullet_type: BulletType.one, cost: 100, sale: 80,nextcost:130 },
              two:{type :2,range: 4, tower_img: "img/tower11.png", bullet_type: BulletType.two, cost: 130, sale: 180 ,nextcost:180 },
              three:{type :3,range:5, tower_img: "img/tower12.png", bullet_type: BulletType.three, cost: 180, sale: 270 ,nextcost:0},
              four:{type :4,range: 4, tower_img: "img/t2.png", bullet_type: BulletType.seven, cost: 200, sale: 120 ,nextcost:240},
              five:{type :5,range: 5, tower_img: "img/t21.png", bullet_type: BulletType.eight, cost: 240, sale: 300 ,nextcost:290},
              six:{type :6,range: 6, tower_img: "img/t22.png", bullet_type: BulletType.nine, cost: 290, sale: 400,nextcost: 0},
              seven:{type :7,range: 3, tower_img: "img/t3.png", bullet_type: BulletType.ten, cost: 250, sale: 150 ,nextcost:300},
              eight:{type :8,range: 3, tower_img: "img/t31.png", bullet_type: BulletType.eleven, cost: 325, sale: 350,nextcost:350 },
              nine:{type :9,range: 4, tower_img: "img/t32.png", bullet_type: BulletType.twelve, cost: 400, sale: 550 ,nextcost:0},
   //            ten:{type :10,range: 0, tower_img: "img/t4.png", bullet_type: BulletType.null, cost: 200, sale: 120 },
   //            eleven:{type :11,range: 0, tower_img: "img/tower1.png", bullet_type: BulletType.null, cost: 200, sale: 240 },
   //            twelve:{type :12,range: 0, tower_img: "img/tower1.png", bullet_type: BulletType.null, cost: 200, sale: 360 },
              thirteen:{type :13,range: 3, tower_img: "img/t5.png", bullet_type: BulletType.thirteen, cost: 200, sale: 120 ,nextcost:240},
              fourteen:{type :14,range: 3, tower_img: "img/t51.png", bullet_type: BulletType.fourteen, cost: 240, sale: 300 ,nextcost:290},
              fifteen:{type :15,range: 4, tower_img: "img/t52.png", bullet_type: BulletType.fifteen, cost: 290, sale: 400 ,nextcost:0},
              sixteen:{type :16,range: 2, tower_img: "img/t6.png", bullet_type: BulletType.zero, cost: 200, sale: 120,nextcost: 250},
              seventeen:{type :17,range:2, tower_img: "img/t61.png", bullet_type: BulletType.zero_1, cost: 250, sale: 290 ,nextcost:300},
              eighteen:{type :18,range: 3, tower_img: "img/t62.png", bullet_type: BulletType.zero_2, cost: 300, sale: 420 ,nextcost:0}
     }
