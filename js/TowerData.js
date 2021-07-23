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
    one:{type :1,range: 3, tower_img: "img/tower1.png", bullet_type: BulletType.one, cost: 100, sale: 80 },
    two:{type :2,range: 4, tower_img: "img/tower11.png", bullet_type: BulletType.two, cost: 130, sale: 180 },
    three:{type :3,range:5, tower_img: "img/tower12.png", bullet_type: BulletType.three, cost: 180, sale: 270 },
    four:{type :4,range: 4, tower_img: "img/t2.png", bullet_type: BulletType.seven, cost: 200, sale: 120 },
    five:{type :5,range: 5, tower_img: "img/t21.png", bullet_type: BulletType.eight, cost: 240, sale: 300 },
    six:{type :6,range: 6, tower_img: "img/t22.png", bullet_type: BulletType.nine, cost: 290, sale: 400 },
    seven:{type :7,range: 3, tower_img: "img/t3.png", bullet_type: BulletType.ten, cost: 220, sale: 150 },
    eight:{type :8,range: 3, tower_img: "img/t31.png", bullet_type: BulletType.eleven, cost: 300, sale: 350 },
    nine:{type :9,range: 4, tower_img: "img/t32.png", bullet_type: BulletType.twelve, cost: 350, sale: 550 },
  //ten:{type :10,range: 0, tower_img: "img/t4.png", bullet_type: BulletType.null, cost: 200, sale: 120 },
  //eleven:{type :11,range: 0, tower_img: "img/tower1.png", bullet_type: BulletType.null, cost: 200, sale: 240 },
  //twelve:{type :12,range: 0, tower_img: "img/tower1.png", bullet_type: BulletType.null, cost: 200, sale: 360 },
    thirteen:{type :13,range: 3, tower_img: "img/t5.png", bullet_type: BulletType.thirteen, cost: 200, sale: 120 },
    fourteen:{type :14,range: 3, tower_img: "img/t51.png", bullet_type: BulletType.fourteen, cost: 240, sale: 300 },
    fifteen:{type :15,range: 4, tower_img: "img/t52.png", bullet_type: BulletType.fifteen, cost: 290, sale: 400 },
    sixteen:{type :16,range: 2, tower_img: "img/t6.png", bullet_type: BulletType.zero, cost: 200, sale: 120 },
    seventeen:{type :17,range:2, tower_img: "img/t61.png", bullet_type: BulletType.zero_1, cost: 250, sale: 290 },
    eighteen:{type :18,range: 3, tower_img: "img/t62.png", bullet_type: BulletType.zero_2, cost: 300, sale: 420 }
}
