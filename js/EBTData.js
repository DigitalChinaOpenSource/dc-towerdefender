//----------------------------小兵，塔，子弹----字典---------------------------
/**
 * 小兵种类
 * 参数说明：
 * [血量,速度,大小,图片,死亡掉落金币,到达终点造成是伤害]
 */
var EnemyType = {
    DesertMob: [22, 500, 50, "img/1.png", 10, 15],
    DesertRaider: [22, 1000, 50, "img/2.png", 20, 15],
    DesertDog: [300, 700, 50, "img/3.png", 150, 15], //精英怪

    // Dxecutioner: [27, 2000, 50, "img/4.png", 15, 17],
    GiantWasp: [9, 1500, 50, "img/5.png", 30, 50],
    DesertGhost: [550, 700, 50, "img/6.png", 300, 35], //精英怪

    DesertPig: [31, 1000, 50, "img/7.png", 20, 15],
    DesertPander: [50, 2000, 50, "img/8.png", 50, 50],
    DesertSpider: [600, 700, 50, "img/9.png", 200, 100], //精英怪

    DesertBoss: [600, 700, 50, "img/10.png", 300, 100], //BOSS
    DesertBossKing: [1000, 700, 50, "img/11.png", 1000, 100], //BOSS
}

/**
 * 子弹的属性模板
 * 参数说明：
 * {类型，速度，颜色，大小，子弹伤害}
 */
var BulletType = {
        one: { type: 1, speed: 800, color: "pink", size: 5, attack: 5 },
        two: { type: 2, speed: 800, color: "red", size: 6, attack: 8 },
        three: { type: 3, speed: 900, color: "DarkOrchid", size: 4, attack: 12 },
        four: { type: 4, speed: 800, color: "Navy", size: 8, attack: 19 },
        five: { type: 5, speed: 900, color: "Cyan", size: 9, attack: 27 },
        six: { type: 6, speed: 800, color: "DimGray", size: 10, attack: 35 },
    }
    /**
     * 塔的属性模板
     * 参数说明
     * {类型，攻击范围，塔的图片，塔的子弹的属性模板，建塔的费用，卖掉的收益}
     */
var TowerType = {
    one: { type: 1, range: 3, tower_img: "img/tower1.png", bullet_type: BulletType.one, cost: 50, sale: 30 },
    two: { type: 2, range: 4, tower_img: "img/t2.png", bullet_type: BulletType.two, cost: 80, sale: 40 },
    three: { type: 3, range: 5, tower_img: "img/t3.png", bullet_type: BulletType.three, cost: 100, sale: 50 },
    four: { type: 4, range: 6, tower_img: "img/t4.png", bullet_type: BulletType.four, cost: 150, sale: 60 },
    five: { type: 5, range: 8, tower_img: "img/t5.png", bullet_type: BulletType.five, cost: 200, sale: 70 },
    six: { type: 6, range: 10, tower_img: "img/t6.png", bullet_type: BulletType.six, cost: 300, sale: 80 }
}