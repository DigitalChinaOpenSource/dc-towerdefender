
class God {
    constructor() {
        //建立一个可见性改变事件
        //离开当前页面时，会弹窗 并阻塞当前游戏

        $("#startgame_btn").show();
        $("#logout_btn").show();

        // 隐藏匹配页面
        // $(".match").hide();

        $("#startgame_btn").on("click",() => {
            $("#startgame_btn").hide();
            $("#logout_btn").hide();
             $("#block_left").show();
            $("#block_right").show();

            //隐藏游戏页面，显示匹配页面，修改start******************
            // this.showTime();
            // $(".block3").hide();
            // $("#block_left").hide();
            // $("#block_right").hide();
            // $(".match").show();
            // 修改end******************

            // //绑定连接事件
            // this.link();
            this.startGame();
        });

        $("#logout_btn").on("click",() => {
            window.location.href='./log.html';
        });


        // // websocket连接
		// var ws
		// // 房间号
		// var roomCount
		// // 用户名
		// var name
		// //ip地址
        // var IP='ws://localhost:8888'
		
		
        this._init();//入口
    }
    
    // 匹配倒计时，共6秒，3秒时切换敌方图片，0秒时进入游戏界面start
    // showTime() {
    //     var count=6;        
    //     var time=setInterval(function () {
    //         count -= 1;
    //         if(count==3){
    //             $("#match_before").hide();
    //             $("#match_after").show();
    //         }
    //         if (count == 0) {
    //             clearInterval(time);
    //             $("#startgame_btn").hide();
    //             $("#logout_btn").hide();
    //             $("#block_left").show();
    //             $("#block_right").show();
    //             $(".match").hide();
    //         }else{    
    //             // console.log("*****"+count);
    //             document.getElementById('match_time').innerHTML = count;
    //         } 
            
    //     }, 1000);
    // }
    // 匹配倒计时，共6秒，3秒时切换敌方图片，0秒时进入游戏界面end

    // // websocket建立连接
    // link(){
    //     //建立连接
    //     this.ws = new WebSocket(this.IP)
    //     //连接成立触发
    //     this.ws.onopen = function(){
    //         console.log('success connected')
    //         // 发送自己的积分
    //         // 积分暂时无法获取！！！！！！！！！！！！！！
    //         var score = document.getElementById("score")
    //         ws.send({type:0,score:score.value})
    //     }
    //     //收到消息触发
    //     ws.onmessage = function(evt){
    //         // 消息转为json类型
    //         var recv = JSON.parse(evt.data)
    //         //设定房间号
    //         if(recv.type==0){
    //             var roomCount = document.getElementById("roomCount")
    //             roomCount.value= recv.roomCount
    //             this.roomCount = recv.roomCount
    //         }
    //         // 判断信息是否是发给自己的房间的
    //         if(recv.roomCount == roomCount){
    //             // 判断是否为自己发的信息
    //             if(recv.name != name){
    //                 if(recv.type == 1){
    //                     //生成两个小兵
    //                     this.createEnemy()
    //                     this.createEnemy()
    //                 }else if(recv.type == 2){
    //                     //小兵增强
    //                 }else if(recv.type == 3){
    //                     //显示聊天msg
    //                 }else if(recv.type == 4){
    //                     //调用获胜方法赢了
    //                     alert('you win')
    //                     //调用断开连接方法
    //                     this.close()
    //                 }else if(recv.type == 5){
    //                     //时间到，对比小兵enemy数量，判断输赢
    //                     ////调用断开连接方法
    //                     if(recv.enemy<this.enemyExisted){
    //                         alert("you losed")
    //                     }else{
    //                         alert('you win')
    //                     }
    //                     this.close()
    //                 }
    //             }
    //         }
            
    //     }
    // }

    //websocket小兵死亡type：1，被增强小兵type：2，发送聊天信息type：3，胜负提示type：4，时间结束对比双方小兵数type:5
		// 通过roomCount判断发给哪个房间组
		// 通过name确定是否为对方发送的信息
		// 通过type确定为哪种信息
		//type:0,msg:
		//{type:0,score:}
		// type:1,msg：
		// {type:1,roomCount: ,name:''}
		// type:2,msg：
		// {type:2,roomCount: ,name:''}
		// type:3,msg：
		// {type:3,roomCount: ,name:','msg:''}
		// type:4,msg：
		// {type:4,roomCount: ,name:''}
		//type:5,msg:
		//{type:5,roomConut: ,name:'',enemy: }
    // send(msg){
    //     // 发送信息转为string发送
    //     this.ws.send(JSON.stringify(msg))
    // }
    // //websocket 关闭连接，再玩需要重新建立连接
    // close(){
    //     this.ws.onclose()
    //     this.link()
    // }

    _init() {
        //初始化（1先定义一个可以安置的塔的种类的数组.2创建一个玩家对象。3画出四层画布。4创建一个json形式的敌人数组，根据LEVEL数组被赋值,赋值为另一个数组（敌人的 类型，数量enemyType: EnemyType.DesertMob, num: 10）
        // 5 定义两个变量：地图上敌人数量，需要消灭的敌人数量）
        this.useful_tower = (new TowerFactory()).TowerArr;//定义可以用的塔的类型数组变量，当调用这个对象的factory方法时，往数组里面赋值。
        this.player = new Player();
        this.needStop = 1; //生成子弹和敌人标签，1表示停止生成
        this.enemy_level = 1; // 怪物等级
        this.boss = 0; // 是否是boss：0=小怪，1=boss
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

        // //websocket 判断小兵是否减少，如果减少，向对方发送信息
        // // 初始小兵数量
        // //记录初始小兵数量
        // var enemies = 2
        // setInterval(()=>{
        //     // 300毫秒，检测小兵数量，少了就发送小兵死亡信息，少几个发几次，多了就把当前小兵数赋值给enemies，方便之后的比对
        //     if(enemies > this.enemyExisted){
        //         var num = enemies-this.enemyExisted
        //         for(var i = 0;i<num;i++){
        //             this.send({type:1,roomCount:this.roomCount,name:this.name})
        //         }
        //     }else{
        //         enemies = this.enemyExisted
        //     }
        // },300)

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

    // 生成0~max-1的随机整数
    randomnum(max){ 
        return Math.floor(Math.random()*max);  
    } 

    // 生成敌人
    createEnemy() {
        var enemy_type = this.randomnum(4)
        var level = level //需要传入怪物当前等级
        var boss = boss //需要传入是否为boss
        var enemy = new Enemy(enemy_type,
            EnemyType[enemy_type][0], // 血量
            EnemyType[enemy_type][1], // 速度
            EnemyType[enemy_type][2], // 大小
            EnemyType[enemy_type][3], // 图片
            EnemyType[enemy_type][4], // 死亡掉落金币
            this.level, // 等级
            this.boss, // 是否为boss
            );
        this.enemies.push(enemy);
        // console.log(this.enemies);
        this.enemyNumber++;
        if (this.enemyNumber <= length) {
            var enemy = new Enemy();
            this.enemies.push(enemy);
            this.enemyNumber++;
        }
    }
           
    judge_game(){
        console.log("into judge_game");
        //监听怪的数量到了100只
        if(this.enemyExisted >= 100){
            this.stopGame();
            alert("lose");
            // //websocket发送失败信息
            // this.send({type:4,roomCount:this.roomCount,name:this.name})
            // // 关闭websocket连接
            // this.close()

        }
        //监听时间小于100秒，并且怪的数量小于100只
        if(this.enemyExisted <100 && this.leftTime <=0){
            this.stopGame();
            // // 发送自己的小兵剩余信息给对方
            // this.send({type:5,roomCount:this.roomCount,name:this.name,enemy:this.enemyExisted})
            alert("win");
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

    // judge_game(){
    //     //监听怪的数量到了100只
    //     if(this.enemyExisted >= 100){
    //         this.stopGame();
    //         console.log("lose");
    //     }
    //     //监听时间小于100秒，并且怪的数量小于100只
    //     if(this.enemyExisted <100 && this.leftTime <=0){
    //         this.stopGame();
    //         console.log("win");
    //     }
    // }
}
