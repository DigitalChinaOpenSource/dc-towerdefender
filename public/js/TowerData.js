/**
 * 塔的属性模板
 * 参数说明
 * {类型，攻击范围，子弹发射间隔时间，塔的图片，建塔的费用，卖掉的收益}
 */
    //用Type来分类
     //1-3是一类塔，对应1-3级
     //4-6
     //7-9
     //10-12
 
 var TowerType = [
     [1, 3, 1000, "img/tower/tower1-1.png", 100, 80],
     [2, 4, 1000, "img/tower/tower1-2.png", 130, 180],
     [3, 5, 1000, "img/tower/tower1-3.png", 180, 270],
     [4, 3, 1000, "img/tower/tower2-1.png", 180, 100],
     [5, 4, 1000, "img/tower/tower2-2.png", 200, 260],
     [6, 5, 1000, "img/tower/tower2-3.png", 240, 300],
 ]
    //  one:{type :1,range: 3,attack_interval:1000, tower_img: "img/tower/tower1-1.png", bullet_type: BulletType.one, cost: 100, sale: 80 },
    //  two:{type :2,range: 4,attack_interval:1000, tower_img: "img/tower/tower1-2.png", bullet_type: BulletType.two, cost: 130, sale: 180 },
    //  three:{type :3,range:5,attack_interval:1000, tower_img: "img/tower/tower1-3.png", bullet_type: BulletType.three, cost: 180, sale: 270 },
    //  four:{type :4,range:3,attack_interval:1000, tower_img: "img/tower/tower2-1.png", bullet_type: BulletType.four, cost: 180, sale: 100 },
    //  five:{type :5,range:4,attack_interval:1000, tower_img: "img/tower/tower2-2.png", bullet_type: BulletType.five, cost: 200, sale: 260 },
    //  six:{type :6,range:5,attack_interval:1000, tower_img: "img/tower/tower2-3.png", bullet_type: BulletType.six, cost: 240, sale: 300 },
     
 
 