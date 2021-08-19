/**
 * 传入level即可生产当前level对应enemy池
 */
 class EnemyFactory {
    constructor(level) {
        this.level = level;
        this.enemyPool = []; //存放当前关的小兵属性数组 按照数量来push type
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
      type_and_num:小兵种类和每种的数量 例如 [{enemyType: enemyType.one, num: 3},,,,,]
      */
    createEnemyPool(type_and_num) {
        for (var i = 0; i < type_and_num.length; i++) {
            for (var j = 0; j < type_and_num[i].num; j++) {
                this.enemyPool.push(type_and_num[i].enemyType);
                // console.log(this.enemyPool);
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
    
        { enemyType: EnemyType.Monster_low_1, num:10 },
        { enemyType: EnemyType.Monster_low_2, num: 5 },
       
        { enemyType: EnemyType.Monster_tank_1, num: 5 },
        { enemyType: EnemyType.Monster_fast_1, num: 5 },
        { enemyType: EnemyType.Monster_low_1, num: 5},
    

       { enemyType: EnemyType.Monster_tank_1, num: 6 },
       { enemyType: EnemyType.Monster_low_2, num:9 },
      
       
       { enemyType: EnemyType.Monster_tank_2, num: 10 },
       { enemyType: EnemyType.Monster_fast_1, num: 5 },

       { enemyType: EnemyType.Monster_boss_1, num: 1 },
    ],

    //第二关
    [


        { enemyType: EnemyType.Monster_low_2, num: 10 },
        { enemyType: EnemyType.Monster_fast_1, num: 8 },


        { enemyType: EnemyType.Monster_low_2, num: 8},
        { enemyType: EnemyType.Monster_tank_2, num: 5 },
        { enemyType: EnemyType.Monster_fast_2, num: 5 },
      

       
        { enemyType: EnemyType.Monster_tank_2, num: 8 },
        { enemyType: EnemyType.Monster_tank_1, num: 3 },
        { enemyType: EnemyType.Monster_fast_2, num: 7 },


        { enemyType: EnemyType.Monster_tank_1, num: 4 },
        { enemyType: EnemyType.Monster_tank_2, num: 6 },
        { enemyType: EnemyType.Monster_fast_3, num: 8 },

       // { enemyType: EnemyType.Monster_boss_1, num: 1 },
        { enemyType: EnemyType.Monster_boss_2, num: 1 },
    ],

    //第三关
    [
        { enemyType: EnemyType.Monster_low_1, num: 5 },
        { enemyType: EnemyType.Monster_low_2, num: 10 },
        { enemyType: EnemyType.Monster_tank_1, num: 5 },
        { enemyType: EnemyType.Monster_fast_1, num: 5 },

        { enemyType: EnemyType.Monster_tank_1, num: 10 },
        { enemyType: EnemyType.Monster_tank_2, num: 6 },
        { enemyType: EnemyType.Monster_tank_3, num: 6 },
        { enemyType: EnemyType.Monster_fast_3, num: 5},

        { enemyType: EnemyType.Monster_fast_2, num: 7 },
        { enemyType: EnemyType.Monster_tank_2, num: 3 },
        { enemyType: EnemyType.Monster_fast_3, num: 5 },
        { enemyType: EnemyType.Monster_tank_3, num: 5 },
        { enemyType: EnemyType.Monster_fast_3, num: 5 },
       
        { enemyType: EnemyType.Monster_tank_3, num: 5},
        { enemyType: EnemyType.Monster_tank_3, num: 10 },
        { enemyType: EnemyType.Monster_fast_4, num: 10},


        { enemyType: EnemyType.Monster_boss_2, num: 3},


    ],
    //第四关
    [   
       


        { enemyType: EnemyType.Monster_fast_2, num: 4 },
        { enemyType: EnemyType.Monster_tank_2, num: 8 },
        { enemyType: EnemyType.Monster_tank_1, num: 8 },
        { enemyType: EnemyType.Monster_fast_3, num: 10 },
       
        { enemyType: EnemyType.Monster_tank_2, num: 4 },
        { enemyType: EnemyType.Monster_tank_3, num: 5 },
        { enemyType: EnemyType.Monster_fast_3, num: 5 },
        { enemyType: EnemyType.Monster_fast_4, num: 8 },
        { enemyType: EnemyType.Monster_fast_5, num: 8 },


        { enemyType: EnemyType.Monster_tank_3, num: 10 },
        { enemyType: EnemyType.Monster_fast_4, num: 5},
        { enemyType: EnemyType.Monster_tank_4, num: 5 },
        { enemyType: EnemyType.Monster_fast_5, num: 10},


        { enemyType: EnemyType.Monster_tank_3, num: 10 },
        { enemyType: EnemyType.Monster_tank_4, num: 10 },
        { enemyType: EnemyType.Monster_fast_4, num: 10},

        { enemyType: EnemyType.Monster_tank_4, num: 10 },
        { enemyType: EnemyType.Monster_tank_5, num: 10 },
        { enemyType: EnemyType.Monster_fast_5, num: 10},

        { enemyType: EnemyType.Monster_boss_3, num: 3 },
    ],
    
];