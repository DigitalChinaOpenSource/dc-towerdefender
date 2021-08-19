/**
 * 传入level即可生产当前level对应enemy池
 */
class EnemyFactory {
    constructor(level) {
        this.level = level;
        this.enemyPool = []; //存放当前关的小兵属性数组
        this.init();
    }

    init() {
        if (this.level < 5) {
            this.createEnemyPool(enemyOfLevel[this.level]);
        } else {
            this.createEnemyPool(enemyOfLevel[4]);
        }
    }

    /*
      level:游戏关数
      type_and_num:小兵是种类和每种的数量 例如 [{enemyType: enemyType.one, num: 3},,,,,]
      */
    createEnemyPool(type_and_num) {
        for (var i = 0; i < type_and_num.length; i++) {
            for (var j = 0; j < type_and_num[i].num; j++) {
                this.enemyPool.push(type_and_num[i].enemyType);
            }
        }
    }
}

//------------------------------------------------------------------------------
/**
 * 第几关，应该出什么样的enemy
 */

var enemyOfLevel = [
    //第一关
    [
        { enemyType: EnemyType.DesertMob, num: 10 },
        { enemyType: EnemyType.DesertRaider, num: 10 },
        { enemyType: EnemyType.DesertMob, num: 10 },
        { enemyType: EnemyType.DesertRaider, num: 10 },
        { enemyType: EnemyType.DesertDog, num: 3 },

    ],

    //第二关
    [
        // { enemyType: EnemyType.Dxecutioner, num: 10 },
        { enemyType: EnemyType.DesertPander, num: 5 },
        { enemyType: EnemyType.DesertRaider, num: 5 },
        { enemyType: EnemyType.GiantWasp, num: 10 },
        // { enemyType: EnemyType.Dxecutioner, num: 10 },
        { enemyType: EnemyType.DesertPander, num: 5 },
        { enemyType: EnemyType.DesertRaider, num: 5 },
        { enemyType: EnemyType.GiantWasp, num: 10 },

        { enemyType: EnemyType.DesertDog, num: 5 },
        { enemyType: EnemyType.DesertGhost, num: 3 },
    ],

    //第三关
    [
        { enemyType: EnemyType.DesertPig, num: 10 },
        { enemyType: EnemyType.DesertPander, num: 10 },
        { enemyType: EnemyType.DesertPig, num: 10 },
        { enemyType: EnemyType.DesertPander, num: 10 },

        { enemyType: EnemyType.DesertDog, num: 5 },
        { enemyType: EnemyType.DesertGhost, num: 5 },
        { enemyType: EnemyType.DesertSpider, num: 2 },


    ],
    //第四关
    [
        { enemyType: EnemyType.DesertMob, num: 5 },
        { enemyType: EnemyType.DesertRaider, num: 5 },
        { enemyType: EnemyType.DesertSpider, num: 3 },
        // { enemyType: EnemyType.Dxecutioner, num: 7 },
        { enemyType: EnemyType.DesertPander, num: 5 },
        { enemyType: EnemyType.DesertRaider, num: 5 },
        { enemyType: EnemyType.GiantWasp, num: 8 },
        { enemyType: EnemyType.DesertBossKing, num: 2 },
        { enemyType: EnemyType.DesertMob, num: 1 },
        { enemyType: EnemyType.DesertRaider, num: 1 },
        { enemyType: EnemyType.DesertDog, num: 1 },
        // { enemyType: EnemyType.Dxecutioner, num: 1 },
        { enemyType: EnemyType.DesertPander, num: 5 },
        { enemyType: EnemyType.DesertRaider, num: 5 },
        { enemyType: EnemyType.GiantWasp, num: 1 },
        { enemyType: EnemyType.DesertGhost, num: 1 },
        { enemyType: EnemyType.DesertPig, num: 1 },
        { enemyType: EnemyType.DesertPander, num: 1 },
        { enemyType: EnemyType.DesertSpider, num: 1 },
        { enemyType: EnemyType.DesertBoss, num: 1 },
        { enemyType: EnemyType.DesertDog, num: 5 },
        { enemyType: EnemyType.DesertBossKing, num: 5 },
    ],
    //第五关
    [
        // { enemyType: EnemyType.Dxecutioner, num: 20 },
        { enemyType: EnemyType.GiantWasp, num: 20 },
        { enemyType: EnemyType.DesertGhost, num: 20 },
        { enemyType: EnemyType.DesertPig, num: 20 },
        { enemyType: EnemyType.DesertPander, num: 20 },
        { enemyType: EnemyType.DesertSpider, num: 20 },
        { enemyType: EnemyType.DesertBoss, num: 20 },
        { enemyType: EnemyType.DesertBossKing, num: 20 },
    ],
];