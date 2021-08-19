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
        this.enemyExisted = this.enemyData.length - 1; // 需要消灭的敌人数量
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