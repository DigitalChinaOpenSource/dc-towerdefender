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

class Xx {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Bullet {
    //子弹的速度，颜色区分子弹的种类
    constructor(x, y, target_x, target_y, speed, color, size, attack) {
        this.x = x;
        this.y = y;
        this.target_x = target_x;
        this.target_y = target_y;
        this.atk = attack || BULLET_BASE_ATK;
        this.speed = speed || BULLET_BASE_SPEED;
        this.color = color || BULLET_BASE_COLOR;
        this.size = size || 5;
        this._init();
        this.flag = 0;

    }

    _init() {
        this.create();
    }

    create() {
        // 创建方向向量
        this.direction = Array();
        this.direction[0] = (this.target_x - this.x) / CELL_WIDTH;
        this.direction[1] = (this.target_y - this.y) / CELL_WIDTH;

        this.x = this.x + CELL_WIDTH / 2;
        this.y = this.y + CELL_WIDTH / 2;
        this.target_x = this.target_x + CELL_WIDTH / 2;
        this.target_y = this.target_y + CELL_WIDTH / 2;

        this.life = setInterval(() => {
            this.move();
        }, 100 / this.speed);
    }

    move() {
        if (this.flag == 0) {
            this.x = this.x + (CELL_WIDTH * this.direction[0]) / 100;
            this.y = this.y + (CELL_WIDTH * this.direction[1]) / 100;
        }
    }

    dead() {
        clearInterval(this.life);
    }

    stop() {
        this.flag = 1;
    }

    continue () {
        this.flag = 0;
    }
}

class Enemy {
    //通过hp，speed，size,enemy_img来确定enemy的种类
    //enemy_img传入敌人的图片url
    constructor(hp, speed, size, enemy_img, money, kill_blood) {
        this.flag = 0;
        this.hp = hp || ENEMY_BASE_HP; //不同种类的enemy有不同的血量，默认是10
        this.speed = speed || ENEMY_BASE_SPEED; //不同种类的enemy有不同的速度
        this.size = size || 50; //敌人的大小，默认50
        this.enemy_img = enemy_img || "img/TowerDefense.png";
        this.money = money; //死后掉落金币
        this.kill_blood = kill_blood; //到达终点后玩家扣除血量

        this._init();

        //根据关卡数来设定敌人的路线
        this.moveArr = new search().searchEnemyRoute(LEVEL);


        this.index = 1;

        //原始hp，不做变更
        this.originHp = hp;

    }

    _init() {
        this.create();
        this.life = setInterval(() => {
            this.move();
        }, 10000 / this.speed); //控制enemy移动速度


    }

    create() {
            this.x = START_X + CELL_WIDTH;
            this.y = START_Y;
        }
        //怪物移动方法
    move() {
        var x_d;
        var y_d;
        if (this.flag == 0) {
            //判断的时候乘CELL_WIDTH
            if (this.x != this.moveArr[this.index].x * CELL_WIDTH) {
                // 方向向量 正数向前 负数向后
                x_d = this.moveArr[this.index].x - this.moveArr[this.index - 1].x;
                // x轴每一步的距离
                this.x = this.x + 1 * (x_d / Math.abs(x_d));
            } else if (this.y != this.moveArr[this.index].y * CELL_WIDTH) {
                // 方向向量 正数向上 负数向下
                y_d = this.moveArr[this.index].y - this.moveArr[this.index - 1].y;
                // y轴每一步的距离
                this.y = this.y + 1 * (y_d / Math.abs(y_d));
            } else {
                //防止越界 index小于坐标点的最大值
                if (this.index < this.moveArr.length) {
                    this.index++;
                } else {
                    this.index = 1;
                }
            }
        }

    }

    dead() {
        clearInterval(this.life);
    }
    stop() {
        this.flag = 1;
    }
    continue () {
        this.flag = 0;
    }
}

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
};

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
};
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
};

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

class Tower {
    //塔的范围区分塔的种类
    constructor(X, Y, type) {
        this.x = X;
        this.y = Y;

        //======= 虎 删除   
        // this.range = range_Type || TOWER_BASE_RAN+1; //rang_Type表示不同的塔的范围,默认为1+1
        // this.tower_img = tower_img || "img/tower1.png";
        this.bullet = 0;

        //虎 根据 type 生成塔的自己的类型的子弹
        this.type = type || {};

        this.range = this.type.range || 2;
        this.tower_img = this.type.tower_img || "img/tower1.png";
        this.cost = this.type.cost; //建塔所需金币
        this.sale = this.type.sale; //卖塔所得金币
    }
}

/**
 * 仅仅是tower和bullet的属性模板，不直接返回对象
 */
class TowerAndBulletFactory {
    constructor() {
        this.TowerAndBulletArr = [];
        this.factory();
    }

    /**
     * 根据当前关数初始化 塔的种类
     */
    factory() {

        //第一关
        if (LEVEL == 0) {
            this.TowerAndBulletArr.push(TowerType.one);
            this.TowerAndBulletArr.push(TowerType.two);
            this.TowerAndBulletArr.push(TowerType.three);
            this.TowerAndBulletArr.push(TowerType.four);
            this.TowerAndBulletArr.push(TowerType.five);
            this.TowerAndBulletArr.push(TowerType.six);
        }
        //第二关
        if (LEVEL == 1) {
            this.TowerAndBulletArr.push(TowerType.one);
            this.TowerAndBulletArr.push(TowerType.two);
            this.TowerAndBulletArr.push(TowerType.three);
            this.TowerAndBulletArr.push(TowerType.four);
            this.TowerAndBulletArr.push(TowerType.five);
            this.TowerAndBulletArr.push(TowerType.six);
        }
        //第三关
        if (LEVEL == 2) {
            this.TowerAndBulletArr.push(TowerType.one);
            this.TowerAndBulletArr.push(TowerType.two);
            this.TowerAndBulletArr.push(TowerType.three);
            this.TowerAndBulletArr.push(TowerType.four);
            this.TowerAndBulletArr.push(TowerType.five);
            this.TowerAndBulletArr.push(TowerType.six);
        }
        //以后再说
        if (LEVEL > 2) {
            this.TowerAndBulletArr.push(TowerType.one);
            this.TowerAndBulletArr.push(TowerType.two);
            this.TowerAndBulletArr.push(TowerType.three);
            this.TowerAndBulletArr.push(TowerType.four);
            this.TowerAndBulletArr.push(TowerType.five);
            this.TowerAndBulletArr.push(TowerType.six);
        }

    }
}

var Ca = {
    //画填充的方
    fillRect: function(cxt, x, y, width, height, color) {
        cxt.fillStyle = color;
        cxt.fillRect(x, y, width, height);
    },

    //画路线
    //传一个小兵的路线数组[{x:5,y:1},{x:1,y:2}]
    drawWall: function(cxt, arr, color) {
        cxt.fillStyle = color;
        for (var i = 0; i < arr.length; i++) {

            //- 1修正
            cxt.fillRect((arr[i].x - 1) * CELL_WIDTH, (arr[i].y - 1) * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
            // console.log(arr[i].x,arr[i].y);
        }
    },

    //画小兵血条
    /**
     * 
     * @param {*canvas 画笔} cxt 
     * @param {*小兵对象} enemy 
     */
    drawBlood: function(cxt, enemy) {
        //获取小兵
        //获取小兵的位置
        //获取小兵当前生命值
        //在小兵头上画出
        let nowHp = enemy.hp; //小兵现在的血量
        let proportion = nowHp / enemy.originHp;
        this.fillRect(cxt, enemy.x + 5, enemy.y - 5, 40, 5, "red");
        this.fillRect(cxt, enemy.x + 5, enemy.y - 5, proportion * 40, 5, "green");

    },
};

class TowerOption {
    constructor(X, Y) {
        this.x = X;
        this.y = Y;

    }

}

class Player {
    constructor() {
        this.money = PlAYER_BASE_MONEY + (LEVEL * 100);
        this.end_hp = END_HP; //基地血量

    }
}

$(function() {
    new Game();
});

class search {
    constructor() {}

    //根据关卡数来设定塔的坑位
    searchTower(level) {
        switch (level) {
            case 0:
                return TowerHome.towerHomeOne;
                break;
            case 1:
                return TowerHome.towerHomeTwo;
                break;
            case 2:
                return TowerHome.towerHomeThree;
                break;
            case 3:
                return TowerHome.towerHomeFour;
                break;
            default:
                return TowerHome.towerHomeOne;
                break;
        }
    }

    //根据关卡数来设定敌人的路线
    searchEnemyRoute(level) {
        switch (level) {
            case 0:
                return moveRoute.MOVEARROne;
                break;
            case 1:
                return moveRoute.MOVEARRTwo;
                break;
            case 2:
                return moveRoute.MOVEARRThree;
                break;
            case 3:
                return moveRoute.MOVEARRFour;
                break;
            default:
                return moveRoute.MOVEARROne;
                break;
        }
    }

    //根据关卡数来画小兵行进路线
    DrawEnemyRoad(level) {
            var cv = document.querySelector('#canvasMap_backgroud');
            var ctx = cv.getContext('2d');
            switch (level) {
                case 0:
                    Ca.drawWall(ctx, route.routeOne, "DarkGray");
                    break;
                case 1:
                    Ca.drawWall(ctx, route.routeTwo, "DarkGray");
                    break;
                case 2:
                    Ca.drawWall(ctx, route.routeThree, "DarkGray");
                    break;
                case 3:
                    Ca.drawWall(ctx, route.routeFour, "DarkGray");
                    break;
                default:
                    Ca.drawWall(ctx, route.routeOne, "DarkGray");
            }
        }
        //根据关卡数来线画塔位
    DrawTowerPlace(level) {
        var cv = document.querySelector('#canvasMap_backgroud');
        var ctx = cv.getContext('2d');
        switch (level) {
            case 0:
                Ca.drawWall(ctx, TowerHome.towerHomeOne, "goldenrod");
                break;
            case 1:
                Ca.drawWall(ctx, TowerHome.towerHomeTwo, "orange");
                break;
            case 2:
                Ca.drawWall(ctx, TowerHome.towerHomeThree, "orange");
                break;
            case 3:
                Ca.drawWall(ctx, TowerHome.towerHomeFour, "orange");
                break;
            default:
                Ca.drawWall(ctx, TowerHome.towerHomeOne, "goldenrod");
        }
    }


    //根据关卡来画背景
    DrawBackground(level) {
        var cv = document.querySelector('#canvasMap_backgroud');
        var ctx = cv.getContext('2d');
        var  img  =  new  Image;
        img.onload = function()  {
            ctx.drawImage(img, 0, 0, 1500, 650, 0, 0, 1500, 650); 
        };
        switch (level) {
            case 0:
                img.src = "img/first_background.png";
                break;
            case 1:
                img.src = "img/second_background.png";
                break;
            case 2:
                img.src = "img/third_background.png";
                break;
            case 3:
                img.src = "img/fourth_background.png";
                break;
            default:
                img.src = "img/first_background.png";
        }
    }
}     

class Game {
    constructor() {
        //建立一个可见性改变事件
        //离开当前页面时，会弹窗 并阻塞当前游戏
        document.addEventListener("visibilitychange", function() {
            alert("你刚刚离开了游戏,现在游戏继续");
        });

        $("#explain").show();
        $("#explainTwo").show();
        $("#menu").show();
        $("#nextScale").hide(); //最开始不显示下一波按钮
        this._init();
        this.stopGame();
        $("#startButton").on("click", () => {
                $("#start").hide();
                $("#stop").show();
                this.continueGame();
            }),
            $("#restartButton,#restartButton1").on("click", () => {
                $("#end").hide();
                $("#stops").hide();
                $("#nextScale").hide(); //隐藏下一波按钮
                clearInterval(this.createEnemies); //清除生成敌人的定时器（修复多次重玩 敌人重叠的BUG）
                clearInterval(this.createBullets); //清除生成子弹的定时器
                this._init();
                // this.nextGame();
            });
        $("#nextButton").on("click", () => {
            //难度增加
            LEVEL++;
            $("#next").hide();
            //新的一关，初始化画布
            $("#nextScale").hide(); //隐藏下一波按钮
            clearInterval(this.createEnemies); //清除生成敌人的定时器（修复多次重玩 敌人重叠的BUG）
            clearInterval(this.createBullets); //清除生成子弹的定时器
            this._init();
            // this.nextGame();
        });
        $("#successButton").on("click", () => {
            $("#success").hide();
            $("#award").show();
        });

        //下一波敌人的触发事件
        $("#nextScale").on("click", () => {
            //将当前波次敌人数量置为0
            this.missionEnemy = 0;
            //金币增加
            this.player.money += 30;
            //生成下一波敌人
            this.createEnemies = setInterval(() => {
                if (this.flag == 0) {
                    this.createScale();
                }
            }, (ENEMY_BASE_INTERVAL - ENEMY_UP_INTERVAL * LEVEL) * 100);
            $("#nextScale").hide();
        });
        $("#close_explains").on("click", () => {
            $("#explains").hide();
        });
        $("#explains_button").on("click", () => {
            $("#explains").show();
        });
    }

    _init() {
        this.towerAndBullets = (new TowerAndBulletFactory()).TowerAndBulletArr;
        //console.log(this.towerAndBullet[0]["range_Type"]);
        this.player = new Player();
        this.drawMap();
        this.enemyData = JSON.parse(JSON.stringify((new EnemyFactory(LEVEL)).enemyPool)); //生成敌人
        this.enemyNumber = 0; // 地图上敌人数量
        this.enemyExisted = this.enemyData.length; // 需要消灭的敌人数量
        this.towersNumber = 0; // 地图上塔的数量
        this.optionsNumber = 0; // 地图上选项的数量---------------------------------------------------------------------------------------------------
        this.towers = [];
        this.bullets = [];


        this.end_hp = 5; //保护点的血量

        this.missionEnemy = 0 //每一波敌人的数量
        this.mission = 1 //敌人攻击波数


        this.options = []; //选项数组------------------------------------------------------------
        //加载塔的图片--------------------------------------------------------------
        var imgxx = new Image();
        imgxx.src = "img/tower1.png";
        for (var i = 2; i < 7; i++) {
            var imgx = new Image();
            imgx.src = "img/t" + i + ".png";
        }

        // 监控 选塔
        $("#canvasMap_option").on("click", (e) => {

            var option_x = parseInt(e.offsetX / CELL_WIDTH);
            var option_y = parseInt(e.offsetY / CELL_WIDTH);
            this.downTower(option_x, option_y);
            this.chooseTower(option_x, option_y, e, this.towerAndBullets);
        });

        // 寻路地图
        for (var i = 0; i < MAP_X; i++) {
            MAP_ARR[i] = new Array();
            for (var j = 0; j < MAP_Y; j++) {
                MAP_ARR[i][j] = 0;
            }
        }
        this.startGame();
    }

    //一波一波的产生敌人的方法
    createScale() {
        if (this.enemyExisted <= 0 || this.missionEnemy >= 10) {
            $("#nextScale").show();
            //清空定时器
            clearInterval(this.createEnemies);
            //将波次数量置为0
            this.missionEnemy = 0;
            //波次加一
            this.mission++;
            //5s以后重设定时器
            setTimeout(() => {
                this.createEnemies = setInterval(() => {
                    if (this.flag == 0) {
                        this.createScale();
                    }
                }, (ENEMY_BASE_INTERVAL - ENEMY_UP_INTERVAL * LEVEL) * 100);
            }, 15000000);
        } else {
            //直接生产敌人
            this.createEnemy();
        }
    }

    // 开始游戏
    startGame() {
            this.xx = []; //生成叉号数组。
            this.enemies = [];
            this.flag = 0; //生成子弹和敌人标签，1表示停止生成
            this.createEnemies = setInterval(() => {
                if (this.flag == 0) {
                    this.createScale();
                }
            }, (ENEMY_BASE_INTERVAL - ENEMY_UP_INTERVAL * LEVEL) * 100 * TIMEOUT); //控制出时间间隔
            //限制生产敌人,敌人不动，子弹不动
            $("#stop").on("click", () => {
                this.stopGame();
                $("#stops").show();
            });

            //继续运动
            $("#continue").on("click", () => {
                this.continueGame();
                $("#stops").hide();
            });
            //结束游戏
            $("#movegame").on("click", () => {
                LEVEL = 0;
                $("#nextScale").hide();
                $("#stops").hide();
                $("#start").show();
                this._init();
                this.stopGame();
            });

            // 检查塔和敌人 并生成子弹
            this.createBullets = setInterval(() => {
                if (this.flag == 0) {
                    this.checkAndCreateBullets();
                }
            }, (TOWER_BASE_INTERVA - LEVEL * TOWER_UP_INTERVA) * 1000); //控制防御塔攻击速度
            //动态显示金币
            setInterval(() => {
                $("#moneyshow").html(this.player.money);
            }, 100);
            //动态显示基地血量
            setInterval(() => {
                $("#lifeshow").html(this.player.end_hp);
            }, 100);
            //动态显示敌人数量
            setInterval(() => {
                $("#enemysshow").html(this.enemyExisted);
            }, );
            // 绘画背景
            this.drawBackgound();

            // 获取游戏状态
            setInterval(() => {
                this.gameState();
            }, 10);

            // 绘画敌人
            setInterval(() => {
                this.drawEnemies();
            }, 10);

            // 绘制搭
            setInterval(() => {
                this.drawTowers();
            }, 100);

            // 绘制子弹
            setInterval(() => {
                this.drawBullet();
            }, 10);
        }
        //继续游戏
    nextGame() {
        this.enemyNumber = 0; // 地图上敌人数量
        this.createEnemies = setInterval(() => { //重新生成敌人
            if (this.flag == 0) {
                this.createScale();
            }

        }, (ENEMY_BASE_INTERVAL - ENEMY_UP_INTERVAL * LEVEL) * 100 * TIMEOUT); //控制生成敌人间隔
    }

    // 生成敌人
    //根据enemyData生成
    createEnemy() {

        var length = this.enemyData.length - 1;
        if (this.enemyNumber <= length) {
            var enemy = new Enemy(this.enemyData[this.enemyNumber][0], this.enemyData[this.enemyNumber][1], this.enemyData[this.enemyNumber][2], this.enemyData[this.enemyNumber][3], this.enemyData[this.enemyNumber][4], this.enemyData[this.enemyNumber][5]);
            this.enemies.push(enemy);
            // console.log(this.enemies);
            this.enemyNumber++;
        }
        this.missionEnemy++; //本波次敌人加一
        // console.log(this.missionEnemy);
    }



    // 检查并生成子弹
    checkAndCreateBullets() {
        if (this.towersNumber <= 0) {
            return false;
        }
        for (var tower in this.towers) {
            for (var ene in this.enemies) {
                var distanceX = this.towers[tower].x - this.enemies[ene].x;
                var distanceY = this.towers[tower].y - this.enemies[ene].y;
                if (Math.abs(distanceX) <= this.towers[tower].range * CELL_WIDTH && Math.abs(distanceY) <= this.towers[tower].range * CELL_WIDTH) {
                    this.bullets.push(
                        new Bullet(
                            this.towers[tower].x,
                            this.towers[tower].y,
                            this.enemies[ene].x,
                            this.enemies[ene].y,
                            this.towers[tower].type.bullet_type.speed,    //创建塔的时候也确定了塔的子弹的属性
                            this.towers[tower].type.bullet_type.color,                             
                            this.towers[tower].type.bullet_type.size,
                            this.towers[tower].type.bullet_type.attack,
                        ));
                    break;
                }
            }
        }
    }

    // 暂停游戏
    stopGame() {
            this.stopProdue();
            this.stopEnemies();
            this.stopBullets();
        }
        //停止产生子弹和敌人
    stopProdue() {
        this.flag = 1;
    }

    //子弹停止移动
    stopBullets() {
        for (var bullet in this.bullets) {
            this.bullets[bullet].stop();
        }
    }

    //敌人停止移动
    stopEnemies() {
        for (var ene in this.enemies) {
            this.enemies[ene].stop();
        }
    }

    // 继续游戏
    continueGame() {
            this.continueProduce();
            this.continueEnemies();
            this.continueBulletss();
        }
        //继续产生子弹和敌人
    continueProduce() {
            this.flag = 0;
        }
        //敌人继续移动
    continueEnemies() {
        for (var ene in this.enemies) {
            this.enemies[ene].continue();
        }
    }

    //子弹继续移动
    continueBulletss() {
        for (var bullet in this.bullets) {
            this.bullets[bullet].continue();

        }
    }

    //选塔------------------------------------------------------------------------------------------------
    chooseTower(option_x, option_y, e, type) {
        var s = 0; //选塔标签，1表示选中了塔
        if (this.options.length > 0 || MAP_ARR[option_x][option_y] == 1) {
            var origin = parseInt(this.towerAndBullets.length / 2);
            for (var option in this.options) {
                for (var a = 0; a < this.towerAndBullets.length; a++) {
                    if (this.options[option].x - (origin - a) * CELL_WIDTH <= e.offsetX && e.offsetX < this.options[option].x - (origin - a - 1) * CELL_WIDTH && this.options[option].y - CELL_WIDTH <= e.offsetY && e.offsetY < this.options[option].y) {
                        //选择左上角的塔建塔
                        this.createTower(this.options[option].x / CELL_WIDTH, this.options[option].y / CELL_WIDTH, type[a]);
                        s = 1;
                        this.drawss();
                    }
                }
                if (s == 0) {
                    this.options.splice(option, 1);
                    this.drawss();
                    this.createOption(option_x, option_y);
                    if (this.options.length > 1) {
                        this.options.splice(option, 1);
                    }
                }

            }

        } else {
            this.drawss();
            for (var cx in this.xx) {
                this.xx.splice(cx, 1);
            }
            this.createOption(option_x, option_y);
        }
    }

    //拆塔
    downTower(option_x, option_y) {
        if (this.xx.length > 0) {
            for (var tower in this.towers) {
                for (var cx in this.xx) {
                    if (this.towers[tower].x == (option_x - 1) * CELL_WIDTH && this.towers[tower].y == (option_y + 1) * CELL_WIDTH) {
                        this.player.money += this.towers[tower].type.sale;
                        this.towers.splice(tower, 1);
                        this.xx.splice(cx, 1);
                        MAP_ARR[option_x - 1][option_y + 1] = 0;
                        this.drawTowerMap();
                        this.drawss();
                    }
                }
            }
        }
        if (MAP_ARR[option_x][option_y] == 1) {
            this.drawss();
            this.xx.push(new Xx(option_x, option_y));
            if (this.xx.length > 1) {
                this.xx.splice(cx, 1);
            }
            this.drawxx();
        }
    }

    // 生成选项------------------------------------------------------------------------------------------------
    createOption(X, Y) {
        //根据关卡数来设选项的坑位
        this.towerHome = new search().searchTower(LEVEL);

        for (var arr in this.towerHome) {
            // this.towerHome[arr].x - 1 为了修正数组坐标
            //判断条件为 1.鼠标的x,y 等于 规定塔位的x,y   2.一个坑位只能放一个塔  3.放置的塔不能超过最大数量
            if (X == this.towerHome[arr].x - 1 && Y == this.towerHome[arr].y - 1 && MAP_ARR[X][Y] != 1 && this.towersNumber < TOWER_BASE_NUMBER + TOWER_UP_NUMBER * LEVEL) {
                this.optionsNumber++;
                this.options.push(new TowerOption(X * CELL_WIDTH, Y * CELL_WIDTH));

                this.drawOptions();
            }
        }
    }


    // 生成塔
    createTower(X, Y, type) {

        //根据关卡数来设定塔的坑位
        this.towerHome = new search().searchTower(LEVEL);

        for (var arr in this.towerHome) {
            // this.towerHome[arr].x - 1 为了修正数组坐标
            //判断条件为 1.鼠标的x,y 等于 规定塔位的x,y   2.一个坑位只能放一个塔  3.放置的塔不能超过最大数量
            if (X == this.towerHome[arr].x - 1 && Y == this.towerHome[arr].y - 1 && MAP_ARR[X][Y] != 1 && this.towersNumber < TOWER_BASE_NUMBER + TOWER_UP_NUMBER * LEVEL) {
                this.towersNumber++;

                // this.towers.push(new Tower(X * CELL_WIDTH, Y * CELL_WIDTH));
                //---------------------------------------------------------------------------------戴
                if (type.cost - this.player.money <= 0) {
                    this.towers.push(new Tower(X * CELL_WIDTH, Y * CELL_WIDTH, type));
                    this.player.money -= type.cost;
                    MAP_ARR[X][Y] = 1;
                } else {
                    $("#moneyshow").css("border", "2px solid red");
                    setTimeout(() => {
                        $("#moneyshow").css("border", " white");
                    }, 500);

                }
            }
        }
    }


    // 判断道路是否被阻隔
    roadIsBlocked(X, Y) {
        MAP_ARR[X][Y] = 1;
        var next = searchRoad(START_X / CELL_WIDTH, START_Y / CELL_WIDTH, END_X / CELL_WIDTH, END_Y / CELL_WIDTH);
        if (next.length > 0) {
            MAP_ARR[X][Y] = 0;
            return false;
        }
        MAP_ARR[X][Y] = 0;
        return true;
    }



    // 判断位置是否有敌人存在
    haveEnemy(X, Y) {
        for (var ene in this.enemies) {
            if (this.enemies[ene].x == X && this.enemies[ene].y == Y) {
                return true;
            }
        }


        return false;
    }

    // 游戏状态获取
    gameState() {

        //如果是最后一波不显示下一波的按钮(最后一波是BOSS)
        if (this.enemyExisted < 1) {
            $("#nextScale").hide();
        }

        // 生成全部敌人后结束生成
        if (this.enemyNumber >= this.enemyData.length) {
            clearInterval(this.createEnemies);
        }

        if (this.enemyExisted <= 0) {
            this.endGame("Success");
        }

        // 当敌人触碰到红色点的时候 血量减一（敌人攻击力） 血量为0时游戏结束
        for  (var  ene  in this.enemies)  {    
            if  (this.player.end_hp  <=  0)  {    
                this.endGame("Failed");        
                break;    
            } 
            else  if (this.enemies[ene].x  ==  END_X  &&  this.enemies[ene].y  ==  END_Y)  {
                //这里修改为血量减去敌人的攻击力
                this.player.end_hp -= this.enemies[ene].kill_blood;
                this.enemies[ene].dead(); 
                this.enemies[ene]  =  null;        
                this.enemies.splice(ene,  1);


                //相当于敌人也死了
                //修改第一版本BUG  敌人进入后没有减去 游戏一直不能结束的BUG 
                this.enemyExisted--;
            }
        }

        // 检查子弹
        for (var bullet in this.bullets) {
            // 当子弹超过边界的时候 消失
            if (this.bullets[bullet].x < 0 || this.bullets[bullet].y < 0 ||
                this.bullets[bullet].x > MAP_WIDTH || this.bullets[bullet].y > MAP_HEIGHT) {
                this.bullets[bullet].dead();
                this.bullets[bullet] = null;
                this.bullets.splice(bullet, 1);
                break;
            }

            for (var ene in this.enemies) {
                // 触碰到敌人时 敌人血量减少
                var distanceX = this.bullets[bullet].x - this.enemies[ene].x;
                var distanceY = this.bullets[bullet].y - this.enemies[ene].y;
                if (distanceX > 0 && distanceX < CELL_WIDTH &&
                    distanceY > 0 && distanceY < CELL_WIDTH
                ) {
                    this.enemies[ene].hp -= this.bullets[bullet].atk;
                    this.bullets[bullet].dead();
                    this.bullets[bullet] = null;
                    this.bullets.splice(bullet, 1);

                    // 生命为0的时候 敌人死去
                    if (this.enemies[ene].hp <= 0) {
                        this.player.money += this.enemies[ene].money; //-----------------------------------------------------------------戴
                        this.enemies[ene].dead();
                        this.enemies[ene] = null;
                        this.enemies.splice(ene, 1);
                        this.enemyExisted--;
                    }
                    break;
                }
            }
        }
    }

    /**
     *
     * @param {type} 
     */
    endGame(type) {
        if (type == "Failed") {
            this.flag = 1;
            this.stopGame();
            $("#end").show();
        } else {
            if (LEVEL >= 3) {
                $("#success").show();
            } else {
                $("#next").show();
            }
        }
    }


    /**
     * 绘制 方法集合
     */

    // 生成布板
    drawMap() {
        var cv_backgroud = document.querySelector('#canvasMap_backgroud');
        cv_backgroud.setAttribute("height", MAP_HEIGHT);
        cv_backgroud.setAttribute("width", MAP_WIDTH);
        cv_backgroud.setAttribute("z-index", 1);

        var cv_enemy = document.querySelector('#canvasMap_enemy');
        cv_enemy.setAttribute("height", MAP_HEIGHT);
        cv_enemy.setAttribute("width", MAP_WIDTH);
        cv_enemy.setAttribute("z-index", 2);

        this.drawTowerMap();

        var cv_tower = document.querySelector('#canvasMap_bullet');
        cv_tower.setAttribute("height", MAP_HEIGHT);
        cv_tower.setAttribute("width", MAP_WIDTH);
        cv_tower.setAttribute("z-index", 4);

        this.drawss(); //------------------------------------------------------------------------------------------------

    }

    //绘制选项幕布------------------------------------------------------------------------------------------------
    drawss() {
        var cv_option = document.querySelector('#canvasMap_option');
        cv_option.setAttribute("height", MAP_HEIGHT);
        cv_option.setAttribute("width", MAP_WIDTH);
        cv_option.setAttribute("z-index", 5);

    }

    drawTowerMap() {
        var cv_bullet = document.querySelector('#canvasMap_tower');
        cv_bullet.setAttribute("height", MAP_HEIGHT);
        cv_bullet.setAttribute("width", MAP_WIDTH);
        cv_bullet.setAttribute("z-index", 3);
    }

    // 绘制背景
    drawBackgound() {
        var cv = document.querySelector('#canvasMap_backgroud');
        var ctx = cv.getContext('2d');

        //绘制背景  
        new search().DrawBackground(LEVEL);

        // 生成起点
        var imgStart = new Image;
        imgStart.onload = function() {
            ctx.drawImage(imgStart, 0, 0, 500, 300, START_X, START_Y, CELL_WIDTH, CELL_WIDTH);
        };
        imgStart.src = "img/TowerDefense.png";

        // 生成终点 
        var imgEnd = new Image;
        imgEnd.onload = function() {
            ctx.drawImage(imgEnd, 1000, 0, 500, 500, END_X, END_Y, CELL_WIDTH, CELL_WIDTH);
        };
        imgEnd.src = "img/TowerDefense.png";

        //根据关卡数来画小兵行进路线
        new search().DrawEnemyRoad(LEVEL);

        //根据关卡数来线画塔位
        new search().DrawTowerPlace(LEVEL);
        //水平方向
        ctx.beginPath();
        ctx.fillstyle = "red";
        for (var i = 0; i <= MAP_HEIGHT / CELL_WIDTH; i++) {
            ctx.moveTo(0, i * CELL_WIDTH);
            ctx.lineTo(MAP_WIDTH, i * CELL_WIDTH);
        }
        ctx.stroke();

        // 竖直方向，起始点y坐标都是0，终止点y都是高度，累加50
        ctx.beginPath();
        ctx.fillstyle = "red";
        for (var j = 0; j <= MAP_WIDTH / CELL_WIDTH; j++) {
            ctx.moveTo(CELL_WIDTH * j, 0);
            ctx.lineTo(CELL_WIDTH * j, MAP_HEIGHT);
        }
        ctx.stroke();
    }



    // 绘制敌人
    drawEnemies() {
        var cv = document.querySelector('#canvasMap_enemy');
        var ctx = cv.getContext('2d');
        ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
        var img = new Image;
        for (var ene in this.enemies) {
            img.src = this.enemies[ene].enemy_img;
            ctx.drawImage(img, this.enemies[ene].x, this.enemies[ene].y, CELL_WIDTH, CELL_WIDTH);

            Ca.drawBlood(ctx, this.enemies[ene]);


        }
    }

    // 绘制塔------------------------------------------------------------------------------------------------
    drawTowers() {
        var cv = document.querySelector('#canvasMap_tower');
        var ctx = cv.getContext('2d');

        for (var tower in this.towers) {

            var img = new Image;
            for (var a = 0; a < this.towerAndBullets.length; a++) {
                if (this.towers[tower].type.type == this.towerAndBullets[a].type) {

                    img.src = this.towerAndBullets[a].tower_img;

                    ctx.drawImage(img, this.towers[tower].x, this.towers[tower].y, CELL_WIDTH, CELL_WIDTH);
                }

            }

        }

    }

    //绘制选项------------------------------------------------------------------------------------------------
    drawOptions() {
        var cv = document.querySelector('#canvasMap_option');
        var ctx = cv.getContext('2d');
        var origin = parseInt(this.towerAndBullets.length / 2); //绘画的初始位置
        for (var a = 0; a < this.towerAndBullets.length; a++) {
            var img = new Image;
            img.src = this.towerAndBullets[a].tower_img;
            for (var option in this.options) {
                ctx.drawImage(img, this.options[option].x - (origin - a) * CELL_WIDTH, this.options[option].y - CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);

            }
        }
    }

    // 绘制子弹
    drawBullet() {
            var cv = document.querySelector('#canvasMap_bullet');
            var ctx = cv.getContext('2d');
            ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
            for (var bullet in this.bullets) {
                ctx.beginPath();
                ctx.arc(this.bullets[bullet].x, this.bullets[bullet].y, this.bullets[bullet].size, 0, 2 * Math.PI);
                ctx.fillStyle = this.bullets[bullet].color;
                ctx.fill();
                ctx.closePath();
            }
        }
        //绘制拆除标志
    drawxx() {
        var cv = document.querySelector('#canvasMap_option');
        var ctx = cv.getContext('2d');
        var img = new Image();
        img.src = "img/delete.png";
        for (var cx in this.xx) {
            ctx.drawImage(img, (this.xx[cx].x + 1) * CELL_WIDTH, (this.xx[cx].y - 1) * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
        }
    }
}



//enemy的行经路线的坐标，画小兵路线用， 参数有误 从数字1开始数的
var route = {

    routeOne: [

        { x: 1, y: 7 },
        { x: 2, y: 7 },
        { x: 3, y: 7 },
        { x: 4, y: 7 },
        { x: 5, y: 7 },
        { x: 6, y: 7 },
        { x: 7, y: 7 },
        { x: 7, y: 8 },
        { x: 7, y: 9 },
        { x: 7, y: 10 },
        { x: 7, y: 11 },
        { x: 7, y: 12 },
        { x: 7, y: 13 },
        { x: 8, y: 13 },
        { x: 9, y: 13 },
        { x: 10, y: 13 },
        { x: 11, y: 13 },
        { x: 12, y: 13 },
        { x: 13, y: 13 },
        { x: 13, y: 12 },
        { x: 13, y: 11 },
        { x: 13, y: 10 },
        { x: 13, y: 9 },
        { x: 13, y: 8 },
        { x: 13, y: 7 },
        { x: 13, y: 6 },
        { x: 13, y: 5 },
        { x: 13, y: 4 },
        { x: 13, y: 3 },
        { x: 13, y: 2 },
        { x: 14, y: 2 },
        { x: 15, y: 2 },
        { x: 16, y: 2 },
        { x: 17, y: 2 },
        { x: 18, y: 2 },
        { x: 19, y: 2 },
        { x: 20, y: 2 },
        { x: 20, y: 3 },
        { x: 20, y: 4 },
        { x: 20, y: 5 },
        { x: 20, y: 6 },
        { x: 20, y: 7 },
        { x: 21, y: 7 },
        { x: 22, y: 7 },
        { x: 23, y: 7 },
        { x: 24, y: 7 },
        { x: 25, y: 7 },
        { x: 26, y: 7 },
        { x: 27, y: 7 },
        { x: 28, y: 7 },
        { x: 29, y: 7 },
        { x: 30, y: 7 },
    ],
    routeTwo: [
        { x: 1, y: 7 },
        { x: 2, y: 7 },
        { x: 2, y: 6 },
        { x: 2, y: 5 },
        { x: 2, y: 4 },
        { x: 3, y: 4 },
        { x: 4, y: 4 },
        { x: 5, y: 4 },
        { x: 5, y: 6 },
        { x: 5, y: 7 },
        { x: 5, y: 8 },
        { x: 6, y: 4 },
        { x: 7, y: 4 },
        { x: 8, y: 4 },
        { x: 8, y: 5 },
        { x: 8, y: 6 },
        { x: 8, y: 7 },
        { x: 8, y: 8 },
        { x: 7, y: 8 },
        { x: 6, y: 8 },
        { x: 6, y: 6 },
        { x: 7, y: 6 },
        { x: 8, y: 6 },
        { x: 9, y: 6 },
        { x: 10, y: 6 },
        { x: 11, y: 6 },
        { x: 12, y: 6 },
        { x: 13, y: 6 },
        { x: 14, y: 6 },
        { x: 15, y: 6 },
        { x: 15, y: 7 },
        { x: 15, y: 8 },
        { x: 15, y: 9 },
        { x: 14, y: 9 },
        { x: 13, y: 9 },
        { x: 12, y: 9 },
        { x: 12, y: 8 },
        { x: 12, y: 7 },
        { x: 13, y: 7 },
        { x: 14, y: 7 },
        { x: 15, y: 7 },
        { x: 16, y: 7 },
        { x: 17, y: 7 },
        { x: 18, y: 7 },
        { x: 19, y: 7 },
        { x: 20, y: 7 },
        { x: 21, y: 7 },
        { x: 21, y: 8 },
        { x: 21, y: 9 },
        { x: 21, y: 10 },
        { x: 20, y: 10 },
        { x: 19, y: 10 },
        { x: 18, y: 10 },
        { x: 18, y: 9 },
        { x: 18, y: 8 },
        { x: 18, y: 8 },
        { x: 19, y: 8 },
        { x: 20, y: 8 },
        { x: 21, y: 8 },
        { x: 22, y: 8 },
        { x: 23, y: 8 },
        { x: 24, y: 8 },
        { x: 25, y: 8 },
        { x: 26, y: 8 },
        { x: 26, y: 9 },
        { x: 26, y: 10 },
        { x: 26, y: 11 },
        { x: 25, y: 11 },
        { x: 24, y: 11 },
        { x: 23, y: 11 },
        { x: 23, y: 10 },
        { x: 23, y: 9 },
        { x: 23, y: 9 },
        { x: 24, y: 9 },
        { x: 25, y: 9 },
        { x: 26, y: 9 },
        { x: 27, y: 9 },
        { x: 28, y: 9 },
        { x: 28, y: 8 },
        { x: 28, y: 7 },
        { x: 29, y: 7 },
    ],


    routeThree: [
        { x: 1, y: 7 },
        { x: 2, y: 7 },
        { x: 3, y: 7 },
        { x: 4, y: 7 },
        { x: 4, y: 8 },
        { x: 4, y: 9 },
        { x: 4, y: 10 },
        { x: 4, y: 11 },
        { x: 5, y: 11 },
        { x: 6, y: 11 },
        { x: 7, y: 11 },
        { x: 8, y: 11 },
        { x: 8, y: 10 },
        { x: 8, y: 9 },
        { x: 8, y: 8 },
        { x: 8, y: 7 },
        { x: 8, y: 6 },
        { x: 8, y: 5 },
        { x: 8, y: 4 },
        { x: 8, y: 3 },
        { x: 8, y: 2 },
        { x: 7, y: 2 },
        { x: 6, y: 2 },
        { x: 5, y: 2 },
        { x: 4, y: 2 },
        { x: 4, y: 3 },
        { x: 4, y: 4 },
        { x: 5, y: 4 },
        { x: 6, y: 4 },
        { x: 7, y: 4 },
        { x: 8, y: 4 },
        { x: 9, y: 4 },
        { x: 10, y: 4 },
        { x: 11, y: 4 },
        { x: 12, y: 4 },
        { x: 13, y: 4 },
        { x: 14, y: 4 },
        { x: 15, y: 4 },
        { x: 16, y: 4 },
        { x: 17, y: 4 },
        { x: 18, y: 4 },
        { x: 19, y: 4 },
        { x: 20, y: 4 },
        { x: 21, y: 4 },
        { x: 22, y: 4 },
        { x: 23, y: 4 },
        { x: 24, y: 4 },
        { x: 25, y: 4 },
        { x: 26, y: 4 },
        { x: 27, y: 4 },
        { x: 27, y: 3 },
        { x: 27, y: 2 },
        { x: 26, y: 2 },
        { x: 25, y: 2 },
        { x: 24, y: 2 },
        { x: 23, y: 2 },
        { x: 22, y: 2 },
        { x: 22, y: 3 },
        { x: 22, y: 4 },
        { x: 22, y: 5 },
        { x: 22, y: 6 },
        { x: 22, y: 7 },
        { x: 22, y: 8 },
        { x: 22, y: 9 },
        { x: 22, y: 10 },
        { x: 22, y: 11 },
        { x: 22, y: 12 },
        { x: 21, y: 12 },
        { x: 20, y: 12 },
        { x: 19, y: 12 },
        { x: 18, y: 12 },
        { x: 17, y: 12 },
        { x: 16, y: 12 },
        { x: 15, y: 12 },
        { x: 15, y: 11 },
        { x: 15, y: 10 },
        { x: 15, y: 9 },
        { x: 15, y: 8 },
        { x: 15, y: 7 },
        { x: 16, y: 7 },
        { x: 17, y: 7 },
        { x: 18, y: 7 },
        { x: 19, y: 7 },
        { x: 20, y: 7 },
        { x: 21, y: 7 },
        { x: 22, y: 7 },
        { x: 23, y: 7 },
        { x: 24, y: 7 },
        { x: 25, y: 7 },
        { x: 26, y: 7 },
        { x: 27, y: 7 },
        { x: 28, y: 7 },
        { x: 29, y: 7 },
        { x: 30, y: 7 },
    ],
    routeFour: [
        { x: 1, y: 7 },
        { x: 2, y: 7 },
        { x: 3, y: 7 },
        { x: 4, y: 7 },
        { x: 5, y: 7 },
        { x: 6, y: 7 },
        { x: 7, y: 7 },
        { x: 8, y: 7 },
        { x: 9, y: 7 },
        { x: 10, y: 7 },
        { x: 11, y: 7 },
        { x: 12, y: 7 },
        { x: 13, y: 7 },
        { x: 14, y: 7 },
        { x: 15, y: 7 },
        { x: 16, y: 7 },
        { x: 17, y: 7 },
        { x: 18, y: 7 },
        { x: 19, y: 7 },
        { x: 20, y: 7 },
        { x: 21, y: 7 },
        { x: 22, y: 7 },
        { x: 23, y: 7 },
        { x: 24, y: 7 },
        { x: 25, y: 7 },
        { x: 26, y: 7 },
        { x: 27, y: 7 },
        { x: 28, y: 7 },
        { x: 28, y: 6 },
        { x: 28, y: 5 },
        { x: 28, y: 4 },
        { x: 28, y: 3 },
        { x: 28, y: 2 },
        { x: 27, y: 2 },
        { x: 26, y: 2 },
        { x: 25, y: 2 },
        { x: 24, y: 2 },
        { x: 23, y: 2 },
        { x: 22, y: 2 },
        { x: 21, y: 2 },
        { x: 20, y: 2 },
        { x: 19, y: 2 },
        { x: 18, y: 2 },
        { x: 17, y: 2 },
        { x: 16, y: 2 },
        { x: 16, y: 3 },
        { x: 16, y: 4 },
        { x: 16, y: 5 },
        { x: 16, y: 6 },
        { x: 16, y: 7 },
        { x: 29, y: 7 },
        { x: 30, y: 7 },
    ],
}


//小兵行进路线转折点坐标，未修正偏移
var moveRoute = {
    MOVEARROne: [
        { x: 0, y: 6 },
        { x: 6, y: 6 },
        { x: 6, y: 12 },
        { x: 12, y: 12 },
        { x: 12, y: 1 },
        { x: 19, y: 1 },
        { x: 19, y: 6 },
        { x: 29, y: 6 },
        {} //多加一个集合 防止数组越界
    ],
    MOVEARRTwo: [
        { x: 0, y: 6 },
        { x: 1, y: 6 },
        { x: 1, y: 3 },
        { x: 7, y: 3 },
        { x: 7, y: 7 },
        { x: 4, y: 7 },
        { x: 4, y: 5 },
        { x: 14, y: 5 },
        { x: 14, y: 8 },
        { x: 11, y: 8 },
        { x: 11, y: 6 },
        { x: 20, y: 6 },
        { x: 20, y: 9 },
        { x: 17, y: 9 },
        { x: 17, y: 7 },
        { x: 25, y: 7 },
        { x: 25, y: 10 },
        { x: 22, y: 10 },
        { x: 22, y: 8 },
        { x: 27, y: 8 },
        { x: 27, y: 6 },
        { x: 29, y: 6 },
        {}
    ],


    MOVEARRThree: [
        { x: 0, y: 6 },
        { x: 3, y: 6 },
        { x: 3, y: 10 },
        { x: 7, y: 10 },
        { x: 7, y: 1 },
        { x: 3, y: 1 },
        { x: 3, y: 3 },
        { x: 26, y: 3 },
        { x: 26, y: 1 },
        { x: 21, y: 1 },
        { x: 21, y: 11 },
        { x: 14, y: 11 },
        { x: 14, y: 6 },
        { x: 29, y: 6 },
        {}
    ],

    MOVEARRFour: [
        { x: 0, y: 6 },
        { x: 27, y: 6 },
        { x: 27, y: 1 },
        { x: 15, y: 1 },
        { x: 15, y: 6 },
        { x: 29, y: 6 },
        {}
    ],

}


//塔的坑位，只允许在此建塔  参数有误  从1开始数的
var TowerHome = {
    towerHomeOne: [
        { x: 4, y: 8 }, { x: 4, y: 9 },
        { x: 6, y: 6 }, { x: 6, y: 10 }, { x: 6, y: 11 },
        { x: 9, y: 7 }, { x: 9, y: 8 }, { x: 9, y: 11 },
        { x: 10, y: 11 },
        { x: 11, y: 7 }, { x: 11, y: 8 }, { x: 11, y: 11 },
        { x: 12, y: 4 }, { x: 12, y: 5 },
        { x: 14, y: 11 }, { x: 14, y: 12 },
        { x: 16, y: 3 },
        { x: 17, y: 3 },
        { x: 18, y: 3 },
        { x: 19, y: 6 }, { x: 19, y: 7 },
        { x: 21, y: 4 }, { x: 21, y: 5 },
        { x: 23, y: 8 },
        { x: 25, y: 6 },
        { x: 26, y: 6 },
        { x: 28, y: 8 },
    ],
        towerHomeTwo :  [  
        {  x: 6, y: 7 },    
        { x: 7, y: 7 },
        {  x:  13,  y: 8 },         
        {  x:  14,  y:  8  },         
        {  x:  19,  y:  9  },
        {  x:  20,  y:  9  },
        {  x:  24,  y:  10  },
        {  x:  25,  y:  10  },
        { x: 7, y: 9 },
        { x: 10, y: 9 },
        { x: 10, y: 7 },
        { x: 10, y: 5 },
        { x: 4, y: 5 },
        { x: 13, y: 5 },
        { x: 17, y: 6 },
        { x: 17, y: 8 },
        { x: 23, y: 6 },
        { x: 23, y: 7 },
    ],

        towerHomeThree : [
        { x: 7, y: 3 },
        { x: 15, y: 5 },
        { x: 17, y: 9 },
        { x: 20, y: 10 },
        { x: 24, y: 3 },
        { x: 9, y: 3 },
        { x: 7, y: 6 },
        { x: 7, y: 7 },
        { x: 6, y: 7 },
        { x: 5, y: 7 },
        { x: 5, y: 8 },
        { x: 9, y: 7 },
        { x: 9, y: 8 },
        { x: 9, y: 9 },
        { x: 12, y: 5 },
        { x: 12, y: 3 },
        { x: 14, y: 7 },
        { x: 14, y: 8 },
        { x: 13, y: 8 },
        { x: 13, y: 7 },
        { x: 23, y: 6 },
        { x: 24, y: 6 },
        { x: 25, y: 6 },

    ],
        towerHomeFour : [
        { x: 4, y: 9 },
        { x: 6, y: 9 },
        { x: 7, y: 5 },
        { x: 9, y: 5 },
        { x: 14, y: 5 },
        { x: 13, y: 9 },
        { x: 15, y: 9 },
        { x: 18, y: 5 },
        { x: 17, y: 9 },
        { x: 22, y: 10 },
        { x: 24, y: 10 },
        { x: 26, y: 10 },
        { x: 24, y: 4 },
    ],
}