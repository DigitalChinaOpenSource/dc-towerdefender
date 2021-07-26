/**
 * 塔的属性模板
 * 参数说明
 * {类型，攻击范围，塔的图片，塔的子弹的属性模板，建塔的费用，卖掉的收益}
 */
    //用Type来分类
     //1-3是一类塔，对应1-3级
     //4-6
     //7-9
     //10-12
 
 var TowerType = {
     one:{type :1,range: 3, tower_img: "img/tower/tower1-1.png", bullet_type: BulletType.one, cost: 100, sale: 80 },
     two:{type :2,range: 4, tower_img: "img/tower/tower1-2.png", bullet_type: BulletType.two, cost: 130, sale: 180 },
     three:{type :3,range:5, tower_img: "img/tower/tower1-3.png", bullet_type: BulletType.three, cost: 180, sale: 270 },
     four:{type :4,range:3, tower_img: "img/tower/tower2-1.png.png", bullet_type: BulletType.four, cost: 180, sale: 100 },
     five:{type :5,range:4, tower_img: "img/tower/tower2-2.png", bullet_type: BulletType.five, cost: 200, sale: 260 },
     six:{type :6,range:5, tower_img: "img/tower/tower2-3.png", bullet_type: BulletType.six, cost: 240, sale: 300 },
     seven:{type :7,range:4, tower_img: "img/tower/tower3-1.png", bullet_type: BulletType.seven, cost: 220, sale: 150 },
     eight:{type :8,range:5, tower_img: "img/tower/tower3-2.png", bullet_type: BulletType.eight, cost: 300, sale: 350 },
     nine:{type :9,range:6, tower_img: "img/tower/tower3-3.png", bullet_type: BulletType.nine, cost: 350, sale: 550 },
     ten:{type :10,range: 4, tower_img: "img/tower/tower4-1.png", bullet_type: BulletType.ten, cost: 200, sale: 120 },
     eleven:{type :11,range: 5, tower_img: "img/tower/tower4-2.png", bullet_type: BulletType.eleven, cost: 250, sale: 290 },
     twelve:{type :12,range: 6, tower_img: "img/tower/tower4-3.png", bullet_type: BulletType.twelve, cost: 300, sale: 420 }
     
 }
 