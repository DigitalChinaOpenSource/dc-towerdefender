
class God {
    constructor() {
        //建立一个可见性改变事件
        //离开当前页面时，会弹窗 并阻塞当前游戏

        $("#startgame_btn").show();
        $("#logout_btn").show();

        $("#startgame_btn").on("click",() => {
            $("#startgame_btn").hide();
            $("#logout_btn").hide();
            $("#block_left").show();
            $("#block_right").show();
            this.startGame();
        });

        $("#logout_btn").on("click",() => {
            window.location.href='./log.html';
        });

        this._init();//入口
    }

    _init() {
        //初始化（1先定义一个可以安置的塔的种类的数组.2创建一个玩家对象。3画出四层画布。4创建一个json形式的敌人数组，根据LEVEL数组被赋值,赋值为另一个数组（敌人的 类型，数量enemyType: EnemyType.DesertMob, num: 10）
        // 5 定义两个变量：地图上敌人数量，需要消灭的敌人数量）
        this.useful_tower = (new TowerFactory()).TowerArr;//定义可以用的塔的类型数组变量，当调用这个对象的factory方法时，往数组里面赋值。
        this.player = new Player();
        this.needStop = 1; //生成子弹和敌人标签，1表示停止生成
        this.useful_enemy = (new TowerFactory()).EnemyArr; 
        this.leftTime = 5;//剩余时间,单位秒
        this.leftTimeMin = parseInt(this.leftTime/60);//设置结束的时间也为0
        this.leftTimeSecond = this.leftTime%60;
        this.map_a = new map();
        this.enemyNumber = 0; // 算上正在reborn的敌人的总数量
        this.enemyExisted = 0; // 地图上存在的的敌人数量
        this.enemyNumberLimit = 200;
        this.rebornEnemy = [];
        this.towersNumber = 0; // 地图上塔的数量
        this.optionsNumber = 0; // 地图上选项的数量---------------------------------------------------------------------------------------------------
        this.towers = [];//定义塔的空数组
        this.bullets = [];//定义子弹的空数组
        this.enemies = [];//定义小怪的空数组
        this.options = []; //塔的选项数组------------------------------------------------------------

        // 监控 
        $("#canvasMap_option").on("click", (e) => {//jquery语法，在这个图层里面，就是坑位被点击后做的动作。e就是鼠标监听的坐标
            //在建塔的图层上
            var option_x = parseInt(e.offsetX / CELL_WIDTH); //鼠标监听，然后得到一个坐标。
            var option_y = parseInt(e.offsetY / CELL_WIDTH);
            this.up_downTower(option_x, option_y);  //把这个坐标上面的塔给拆了，里面会就行判断，是否点了x,是否有塔。
            this.chooseTower(option_x, option_y, e, this.towerAndBullets);//选择一个塔，然后
        });

        $("tower1").mousedown((e) => {
            var option_x = parseInt(e.offsetX / CELL_WIDTH); //鼠标监听，然后得到一个坐标。
            var option_y = parseInt(e.offsetY / CELL_WIDTH);
            this.tower_move(option_x, option_y);
        });


        //  画地图所占据的所有出格子
        for (var i = 0; i < MAP_X; i++) {
            MAP_ARR[i] = new Array();
            for (var j = 0; j < MAP_Y; j++) {
                MAP_ARR[i][j] = 0;
            }
        }
    }
    

    // 开始游戏
    startGame() {
        this.startCountTime();
        this.logEnemyNumber = setInterval(() => {
            console.log("enemyNuber: "+this.enemyNumber);
         }, 1000 );

        setTimeout(() => {
            console.log("wait 3s");
            this.needStop = 0;
            this.createFirstEnemy();
        }, 3000);

        //动态显示金币
       this.timeMoney = setInterval(() => {
            $("#moneyshow").html(this.player.money);
        }, 300);
        //动态显示敌人数量
        this.timeEnemies = setInterval(() => {
            $("#lifeshow").html(this.enemyExisted);
        },300);
        // 动态显示游戏时间
        this.timeTime = setInterval(() => {
            $("#timeshow").html(this.leftTimeMin + ":" + this.leftTimeSecond);
        },300);
        // 时刻获取游戏状态
        this.getGameState = setInterval(() => {
            this.gameState();
        },300);

    }

    clearAllInterval(){
        console.log("clearallinterval");
        clearInterval(this.timeMoney);
        clearInterval(this.timeEnemies);
        clearInterval(this.timeTime);
        clearInterval(this.getGameState);
        clearInterval(this.logEnemyNumber);
    }
    
    createFirstEnemy(){
        this.createEnemy();
        console.log("create firstenemy");
    }

    // 生成敌人
    createEnemy() {
        this.enemyNumber++;
        if (this.enemyNumber <= length) {
            var enemy = new Enemy();
            this.enemies.push(enemy);
            this.enemyNumber++;
        }
    }

    stopCountTime() {
        clearInterval(this.countDown);
    }
    //点击开始按钮，计时器开始计时，定时器每隔一秒将开始时间加1，将开始时间的值赋值给结束时间
    startCountTime(){
        this.countDown = setInterval(() => {
            if(this.leftTime>0){
                this.leftTime --;
                if(this.leftTimeSecond>0){
                    this.leftTimeSecond --;
                }
                else{
                    if(this.leftTimeMin>0){
                        this.leftTimeSecond = 59;
                        this.leftTimeMin --;
                    }
                    else{
                        this.stopCountTime();
                    }
                }
            }
            else{
                this.stopCountTime();
            }
        },1000)
    }

    // 暂停游戏
    stopGame() {
        this.stopCountTime();
        this.stopProduce();
        this.stopEnemies();
        this.stopBullets();
        this.clearAllInterval();
    }
    //停止产生子弹和敌人
    stopProduce() {
        this.needStop = 1;
    }

    //子弹停止移动
    stopBullets() {
        for (var bullet in this.bullets) {
            this.bullets[bullet].stop();
        }
    }

    //   敌人停止移动
    stopEnemies() {
        for (var ene in this.enemies) {
            this.enemies[ene].stop();
        }
    }
    
    

    // 游戏状态获取
    gameState() {
        this.judge_game();
    }

    judge_game(){
        //监听怪的数量到了100只
        if(this.enemyExisted >= 100){
            this.stopGame();
            console.log("lose");
        }
        //监听时间小于100秒，并且怪的数量小于100只
        if(this.enemyExisted <100 && this.leftTime <=0){
            this.stopGame();
            console.log("win");
        }
        
    }
}
