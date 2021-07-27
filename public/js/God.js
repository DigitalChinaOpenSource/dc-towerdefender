class God {
    constructor() {
        //建立一个可见性改变事件
        //离开当前页面时，会弹窗 并阻塞当前游戏

        this._init();//测试
        $("#startgame_btn").show();
        $("#logout_btn").show();
        $("#skill-btns-container").hide();
        // let e1 = new Enemy();
        // e1.level = 1;
        // e1.hp = 5;
        // e1.boss = 0;
        // this.enemies.push(e1);
        // let e2 = new Enemy();
        // e2.level = 1;
        // e2.hp = 5;
        // e2.boss = 0;
        // this.enemies.push(e2);
        // let self = this;

        // console.log(new Player().money);
        // var a = setInterval(() => {
        //     $("#moneyshow").html(300);
        // }, 300);
        // console.log(a);
        $("#startgame_btn").on("click",() => {
            $("#startgame_btn").hide();
            $("#logout_btn").hide();
            $("#home_visi").hide();
            $("#block_skill").show();
            $("#block_left").show();
            $("#block_right").show();
            $("#skill-btns-container").show();

            // //绑定连接事件
            // websocketLink();
            this.startGame();
        });

        $("#logout_btn").on("click", () => {
            window.location.href = './log.html';
        });


        // // websocket连接
        // var ws
        // // 房间号
        // var roomCount
        // // 用户名
        // var name
        // //ip地址
        // var IP='ws://localhost:8888'


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
        this.leftTimeMin = parseInt(this.leftTime / 60);//设置结束的时间也为0
        this.leftTimeSecond = this.leftTime % 60;
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
            this.chooseTower(option_x, option_y, e, this.useful_tower);//选择一个塔，然后
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
        // $('block3').css("display","block")
        this.startCountTime();
        this.logEnemyNumber = setInterval(() => {
            console.log("enemyNuber: " + this.enemyNumber);
        }, 1000);

        setTimeout(() => {
            console.log("wait 3s");
            this.needStop = 0;
            this.createFirstEnemy();
        }, 3000);


         //给对方小怪减血，点击技能按钮，如果现在金币的数量大于技能所需数量，触发技能，否则提示金币数量不够
        $("#reduce_enemy_blood").on("click", () => {
            console.log("现有金币数量:" + this.player.money);
            console.log("技能需要金币数量:" + reduce_enemy_blood_money);
            if (this.enemies.length > 0) {
                if (reduce_enemy_blood_money <= this.player.money) {
                    this.enemies.forEach((e) => {
                        e.check_bloodloss();
                    })
                    //金币数量减少
                    this.player.money = this.player.money - reduce_enemy_blood_money;
                    console.log("使用给自己小怪减血技能后，金币还剩:" + this.player.money);
                }
                else {
                    // console.log(this.player.money);
                    alert("给自己小怪减血技能金币数量不够");
                }
            } else {
                alert("地图上没有小怪，无法减血");
            }
        });

        //增强对方的小怪等级，点击按钮时调用
        $("#increase_enemy_level").on("click", () => {
            // console.log(this.enemies);
            console.log("现有金币数量:" + this.player.money);
            console.log("技能需要金币数量:" + increase_enemy_level_money);
            console.log("小怪的数量为" + this.enemies.length);
            if (this.enemies.length > 0) {
                if (this.enemies.length > 0) {
                    if (increase_enemy_level_money <= this.player.money) {
                        this.enemies.forEach((e) => {
                            e.check_levelup();
                        })
                        this.enemy_level++;
                        this.player.money = this.player.money - increase_enemy_level_money;
                        // websocket发送增强信息
                         //websocketSend({type:2,roomCount:roomCount,name:linkName,action:enemy_level_up})
                        console.log("使用增强对方的小怪等级技能后，金币还剩:" + this.player.money);
                    } else {
                        alert("给对方小怪升级金币数量不够");
                    }
                }
            } else {
                alert("地图上没有小怪，无法升级");
            }
        });

        //给对方增加一个boss，点击按钮时调用
        $("#add_boss").on("click", () => {
            console.log("现有金币数量:" + this.player.money);
            console.log("技能需要金币数量:" + add_boss_money);
            if (add_boss_money <= this.player.money) {
                var pro_boss = new Enemy();
                pro_boss.boss = 1;
                pro_boss.check_boss();
                this.player.money = this.player.money - add_boss_money;
                // websocket发送增强信息
                //websocketSend({type:2,roomCount:roomCount,name:linkName,action:add_boss})
                console.log("使用对方增加一个boss技能后，金币还剩:" + this.player.money);
            } else {
                alert("给对方增加一个boss金币数量不够");
            }
        });
        //动态显示金币
        this.timeMoney = setInterval(() => {
            $("#moneyshow").html(this.player.money);
        }, 300);
        //动态显示敌人数量
        this.timeEnemies = setInterval(() => {
            $("#lifeshow").html(this.enemyExisted);
        }, 300);
        // 动态显示游戏时间
        this.timeTime = setInterval(() => {
            $("#timeshow").html(this.leftTimeMin + ":" + this.leftTimeSecond);
        }, 300);
        // 时刻获取游戏状态
        this.getGameState = setInterval(() => {
            this.gameState();
        }, 300);
        // 绘制敌人
        setInterval(() => {
            this.drawEnemies();
        }, 10);

        // //给对方小怪减血，点击技能按钮，如果现在金币的数量大于技能所需数量，触发技能，否则提示金币数量不够
        // $("#reduce_enemy_blood").on("click", () => {
        //     // console.log(this.timeMoney);
        //     if (this.enemies.length > 0) {
        //         if (reduce_enemy_blood_money < this.player.money) {
        //             // for (var e = 0; e < this.enemies.length; e++) {
        //             //     console.log("小怪为"+this.enemies[e]);
        //             //     // this.enemies[e].check_bloodloss();
        //             // }
        //             this.enemies.forEach((e) => {
        //                 console.log("进入到循环");
        //                 e.check_bloodloss();
        //             })
        //         } else {
        //             // console.log(this.timeMoney);
        //             alert("金币数量不够");
        //         }
        //     } else {
        //         alert("地图上没有小怪，无法减血");
        //     }
        // });

        // //增强对方的小怪等级，点击按钮时调用
        // $("#increase_enemy_level").on("click", () => {
        //     // console.log(this.enemies);
        //     if (this.enemies.length > 0) {
        //         if (increase_enemy_level_money < this.player.money) {
        //             // for (var e = 0; e < this.enemies.length; e++) {
        //             //     this.enemies[e].check_levelup();
        //             //     this.enemy_level++;
        //             // }
        //             this.enemies.forEach((e) => {
        //                 e.check_levelup();
        //             })
        //             this.enemy_level++;
        //         } else {
        //             console.log(this.timeMoney);
        //             alert("金币数量不够");
        //         }
        //     } else {
        //         alert("地图上没有小怪，无法升级");
        //     }
        // });

        // //给对方增加一个boss，点击按钮时调用
        // $("#add_boss").on("click", () => {
        //     if (add_boss_money < this.player.money) {
        //         var pro_boss = new Enemy();
        //         pro_boss.boss = 1;
        //         pro_boss.check_boss();
        //     } else {
        //         console.log(this.timeMoney);
        //         alert("金币数量不够");
        //     }

        // });






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

    clearAllInterval() {
        console.log("clearallinterval");
        clearInterval(this.timeMoney);
        clearInterval(this.timeEnemies);
        clearInterval(this.timeTime);
        clearInterval(this.getGameState);
        clearInterval(this.logEnemyNumber);
    }

    createFirstEnemy() {
        this.createEnemy();
        console.log("create firstenemy");
    }

    // 生成0~max-1的随机整数
    randomnum(max) {
        return Math.floor(Math.random() * max);
    }

    // 生成敌人
    createEnemy() {
        var enemy_type = this.randomnum(4)
        var enemy_level = this.enemy_level //需要传入怪物当前等级
        var boss = this.boss //需要传入是否为boss
        var enemy = new Enemy(enemy_type,
            EnemyType[enemy_type][0], // 血量
            EnemyType[enemy_type][1], // 速度
            EnemyType[enemy_type][2], // 大小
            EnemyType[enemy_type][3], // 图片
            EnemyType[enemy_type][4], // 死亡掉落金币
            enemy_level, // 等级
            boss, // 是否为boss
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

    judge_game() {
        console.log("into judge_game");
        //监听怪的数量到了100只
        if (this.enemyExisted >= 100) {
            this.stopGame();
            alert("lose");
            // //websocket发送失败信息
            // this.send({type:4,roomCount:this.roomCount,name:linkName})
            // // 关闭websocket连接
            //websocketClose()

        }
        //监听时间小于100秒，并且怪的数量小于100只
        if (this.enemyExisted < 100 && this.leftTime <= 0) {
            this.stopGame();
            // // 发送自己的小兵剩余信息给对方
            // this.send({type:5,roomCount:this.roomCount,name:linkNname,enemy:this.enemyExisted})
            alert("win");
        }
    }

    stopCountTime() {
        clearInterval(this.countDown);
    }
    //点击开始按钮，计时器开始计时，定时器每隔一秒将开始时间加1，将开始时间的值赋值给结束时间
    startCountTime() {
        this.countDown = setInterval(() => {
            if (this.leftTime > 0) {
                this.leftTime--;
                if (this.leftTimeSecond > 0) {
                    this.leftTimeSecond--;
                }
                else {
                    if (this.leftTimeMin > 0) {
                        this.leftTimeSecond = 59;
                        this.leftTimeMin--;
                    }
                    else {
                        this.stopCountTime();
                    }
                }
            }
            else {
                this.stopCountTime();
            }
        }, 1000)
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
                    // if(this.towers[tower].seed!=1)               
                    //     {
                    //         this.towers[tower].seed++;
                    //         this.bullets.push(new Bullet(
                    //         this.towers[tower].x,
                    //         this.towers[tower].y,
                    //         this.enemies[ene].x,
                    //         this.enemies[ene].y,
                    //         this.towers[tower].type.bullet_type.speed,    //创建塔的时候也确定了塔的子弹的属性
                    //         this.towers[tower].type.bullet_type.color,
                    //         this.towers[tower].type.bullet_type.size,
                    //         this.towers[tower].type.bullet_type.attack,
                    //         this.towers[tower].type.bullet_type.type,
                    //         this.towers[tower].type.bullet_type.run,
                    //         this.towers[tower].type.bullet_type.reduce,
                    //         this.towers[tower].type.bullet_type.blood,
                    //         this.towers[tower].type.bullet_type.second,
                    //     )); }

                    this.enemies[ene].take_damage(this.towers[tower].type.bullet_type.type,this.towers[tower].type.bullet_type.attack);
                           
                        }

                }       

               
                    if (this.enemies[ene].hp <= 1) {
                            this.player.money += this.enemies[ene].money;
                            this.enemies[ene].dead();
                            this.nowenemys--;  
                            this.enemies[ene] = null;
                            this.enemies.splice(ene, 1);
                            this.enemyExisted--;
                            this.enemies[ene++].take_damage(this.towers[tower].type.bullet_type.type,this.towers[tower].type.bullet_type.attack);
                            // console.log(ene);
                            //ene++;
                        } 
                        }
                        
                        

    }

    // 暂停游戏
    stopGame() {
        this.stopCountTime();
        this.stopProduce();
        this.stopEnemies();
        this.stopBullets();
        this.clearAllInterval();
        this.kill_all_bullets();
        // $("#skill-btns-container").hide();
        document.getElementById("increase_enemy_level").disabled=true;
        document.getElementById("reduce_enemy_blood").disabled=true;
        document.getElementById("add_boss").disabled=true;
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

    kill_all_bullets(){
        console.log("kill all bullets");
        this.bullets.forEach((bullet) => {
            bullet.dead();
        })
    }
    
    

    // 游戏状态获取
    gameState() {
        this.judge_game();
        this.bullet_touch_enemy();
    }

    bullet_touch_enemy(){
        for(let bullet in bullets){
            if (this.bullets[bullet].x < 0 || this.bullets[bullet].y < 0 ||
                this.bullets[bullet].x > MAP_WIDTH || this.bullets[bullet].y > MAP_HEIGHT) {
                this.bullets[bullet].dead();
                this.bullets[bullet] = null;
                this.bullets.splice(bullet, 1);
            }else{
                for (let ene in this.enemies) {
                    // 触碰到敌人时 敌人血量减少
                    let distanceX = this.bullets[bullet].x - this.enemies[ene].x;
                    let distanceY = this.bullets[bullet].y - this.enemies[ene].y;
                    if ((distanceX*distanceX+distanceY*distanceY)<=
                        ((this.bullets[bullet].size+30)*(this.bullets[bullet].size+30))) {
                        // 调用敌人扣血，传入子弹类型与子弹伤害：
                        // 子弹类型：this.bullets[bullet].type
                        // 子弹伤害：this.bullets[bullet].atk
                        this.enemies[ene].take_damage(this.bullets[bullet].type,this.bullets[bullet].damage);
                        // 生命为0的时候 敌人死去
                        if (this.enemies[ene].hp <= 0) {
                            this.player.money += this.enemies[ene].money; //-----------------------------------------------------------------戴
                            this.enemies[ene].dead();
                            // console.log("kill");
                            this.nowenemys--;
                            this.enemies[ene] = null;
                            this.enemies.splice(ene, 1);
                            this.enemyExisted--;
                        }
                        break;
                    }
                }
            }
        }
    }





    // canvas部分*******************************************************
    //生成布板
    drawMap() {
        var cv_backgroud = document.querySelector('#canvasMap_backgroud');
        cv_backgroud.setAttribute("height", MAP_HEIGHT);
        cv_backgroud.setAttribute("width", MAP_WIDTH);
        cv_backgroud.setAttribute("z-index", 1);

        var cv_backgroud2 = document.querySelector('#canvasMap_backgroud2');
        cv_backgroud2.setAttribute("height", MAP_HEIGHT);
        cv_backgroud2.setAttribute("width", MAP_WIDTH);
        cv_backgroud2.setAttribute("z-index", 2);

        var cv_enemy = document.querySelector('#canvasMap_enemy');
        cv_enemy.setAttribute("height", MAP_HEIGHT);
        cv_enemy.setAttribute("width", MAP_WIDTH);
        cv_enemy.setAttribute("z-index", 3);

        this.drawTowerMap();

        var cv_tower = document.querySelector('#canvasMap_bullet');
        cv_tower.setAttribute("height", MAP_HEIGHT);
        cv_tower.setAttribute("width", MAP_WIDTH);
        cv_tower.setAttribute("z-index", 5);

        this.drawss();
    }

    //绘制选项幕布
    drawss() {
        var cv_option = document.querySelector('#canvasMap_option');
        cv_option.setAttribute("height", MAP_HEIGHT);
        cv_option.setAttribute("width", MAP_WIDTH);
        cv_option.setAttribute("z-index", 6);
    }

    drawTowerMap() {
        var cv_bullet = document.querySelector('#canvasMap_tower');
        cv_bullet.setAttribute("height", MAP_HEIGHT);
        cv_bullet.setAttribute("width", MAP_WIDTH);
        cv_bullet.setAttribute("z-index", 4);
    }
    // 绘制背景
    drawBackgound(){
        var cv = document.querySelector('#canvasMap_backgroud2');
        var ctx = cv.getContext('2d');
        new search().DrawBackground(LEVEL);

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
        // 竖直方向
        ctx.beginPath();
        ctx.fillstyle = "red";
        for (var j = 0; j <= MAP_WIDTH / CELL_WIDTH; j++) {
            ctx.moveTo(CELL_WIDTH * j, 0);
            ctx.lineTo(CELL_WIDTH * j, MAP_HEIGHT);
        }
    }

    //绘制敌人
    drawEnemies() { 
    //获取敌人对象
        var cv = document.querySelector('#canvasMap_enemy');
        //获取2d平面
        var ctx = cv.getContext('2d');
        // 清空敌人图片
        ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
        var img = new Image;
        // 遍历数据，绘制敌人
        for (var ene in this.enemies) {
            console.log(this.enemies[ene])
            img.src = this.enemies[ene].enemy_img;
            ctx.drawImage(img, this.enemies[ene].x, this.enemies[ene].y, CELL_WIDTH, CELL_WIDTH);
            Ca.drawBlood(ctx, this.enemies[ene]);
            console.log(this.enemies[ene].x)
            console.log(this.enemies[ene].y)
        }

    }
  
    //聊天
    chat(){
            // console.log(this.player)
            var player1 = this.player;
            var Words = document.getElementById("words");
            var Who = document.getElementById("who");
            var TalkWords = document.getElementById("talkwords");
            var TalkSub = document.getElementById("talksub");
            TalkSub.onclick = function(){
                //定义空字符串
                var str = "";
                if(TalkWords.value == ""){
                    // 消息为空时弹窗
                    alert("消息不能为空");
                    return;
                }
                //作弊
                if(TalkWords.value=="show me the money"){
                    player1.money = 10000;
                    // console.log(player1)
                    return;
                }
                //判断是谁发出的
                if(Who.value == 0){
                    str = '<div class="atalk"><span>' + TalkWords.value +'</span></div>';
                }
                else{
                    str = '<div class="btalk"><span>' + TalkWords.value +'</span></div>' ;
                }
                Words.innerHTML = Words.innerHTML + str;
            }
            //websocket发送信息
            // websocketSend({type:3,roomCount:roomCount,name:linkName,msg:})
        }

    //选塔------------------------------------------------------------------------------------------------
    chooseTower(option_x, option_y, e, type) {
        var s = 0; //选塔标签，1表示选中了塔
        if (this.options.length > 0 || MAP_ARR[option_x][option_y] == 1) {
            var origin = parseInt(this.useful_tower.length / 5); //第一个选项塔的位置
            var b = 0;
             console.log(this.options);
             console.log(origin);
            for (var option in this.options) {
                for (var a = 0; a < this.useful_tower.length; a++) {
                    if (a % 3 >= 0 && a % 3 < 1) {
                        b++;
                        if (this.options[option].x - (origin - b) * CELL_WIDTH <= e.offsetX && e.offsetX < this.options[option].x - (origin - b - 1) * CELL_WIDTH && this.options[option].y - CELL_WIDTH <= e.offsetY && e.offsetY < this.options[option].y) {
                            //选择左上角的塔建塔
                            this.createTower(this.options[option].x / CELL_WIDTH, this.options[option].y / CELL_WIDTH, type[a]);
                            s = 1;
                            this.drawss();
                        }
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
            this.createOption(option_x, option_y);//检查选的是不是在坑位上。
        }
    }

    //升级塔
    Tower_up(tower, x, y) {
        var type = tower.type;
        var new_type = type + 1;
        this.x = x + 1;
        this.y = y + 1;
        //根据塔的type，首先删除塔，在新建一个高级塔
        switch (type) {
            case 1:
                //删除当前塔
                for (var tower in this.towers) {
                    if (this.towers[tower].x == this.x * CELL_WIDTH && this.towers[tower].y == this.y * CELL_WIDTH) {
                        this.towers[tower].tower_img = "img/tower/tower1-2.png";
                        this.towers[tower].type = TowerType.two;
                        MAP_ARR[x - 1][y + 1] = 0;
                        this.drawTowerMap();
                        MAP_ARR[x - 1][y + 1] = 1;
                    }
                }
                break;
            case 2:
                for (var tower in this.towers) {
                    if (this.towers[tower].x == this.x * CELL_WIDTH && this.towers[tower].y == this.y * CELL_WIDTH) {
                        this.towers[tower].tower_img = "img/tower/tower1-3.png";
                        this.towers[tower].type = TowerType.three;
                    }
                }
                break;
            case 3:
                break;
            case 4:
                for (var tower in this.towers) {
                    if (this.towers[tower].x == this.x * CELL_WIDTH && this.towers[tower].y == this.y * CELL_WIDTH) {
                        this.towers[tower].tower_img = "img/tower/tower2-2.png";
                        this.towers[tower].type = TowerType.five;
                    }
                }
                break;
            case 5:
                for (var tower in this.towers) {
                    if (this.towers[tower].x == this.x * CELL_WIDTH && this.towers[tower].y == this.y * CELL_WIDTH) {
                        this.towers[tower].tower_img = "img/tower/tower2-3.png";
                        this.towers[tower].type = TowerType.six;
                    }
                }
                break;
            case 6:
                break;
            case 7:
                for (var tower in this.towers) {
                    if (this.towers[tower].x == this.x * CELL_WIDTH && this.towers[tower].y == this.y * CELL_WIDTH) {
                        this.towers[tower].tower_img = "img/tower/tower3-2.png";
                        this.towers[tower].type = TowerType.eight;
                    }
                }
                break;
            case 8:
                for (var tower in this.towers) {
                    if (this.towers[tower].x == this.x * CELL_WIDTH && this.towers[tower].y == this.y * CELL_WIDTH) {
                        this.towers[tower].tower_img = "img/tower/tower3-3.png";
                        this.towers[tower].type = TowerType.nine;
                    }
                }
                break;
            case 9:
                break;
            case 10:
                for (var tower in this.towers) {
                    if (this.towers[tower].x == this.x * CELL_WIDTH && this.towers[tower].y == this.y * CELL_WIDTH) {
                        this.towers[tower].tower_img = "img/tower/tower4-2.png";
                        this.towers[tower].type = TowerType.eleven;
                    }
                }
                break;
            case 11:
                for (var tower in this.towers) {
                    if (this.towers[tower].x == this.x * CELL_WIDTH && this.towers[tower].y == this.y * CELL_WIDTH) {
                        this.towers[tower].tower_img = "img/tower/tower4-3.png";
                        this.towers[tower].type = TowerType.twelve;
                    }
                }
                break;
            case 12:
                break;           
            default: break;
        }
    }

    //需要引擎新建一个放置初始塔的数组towersPosition,记录塔的x,y,width,height等
    //towersposion数组，用来存放地图下方4种一级塔的属性。
    towersPosition = [
        { type :1,range: 3, tower_img: "img/tower/tower1-1.png", bullet_type: BulletType.one, cost: 100, sale: 80 },
        { type :4,range:3, tower_img: "img/tower/tower2-1.png", bullet_type: BulletType.four, cost: 180, sale: 100 },
        { type :7,range:4, tower_img: "img/tower/tower3-1.png", bullet_type: BulletType.seven, cost: 220, sale: 150 },
        { type :10,range: 4, tower_img: "img/tower/tower4-1.png", bullet_type: BulletType.ten, cost: 200, sale: 120 }
    ]

    
    //判断鼠标的点是否在塔位（一个正方形）中 
    //tower是默认塔组中的一个对象
    pointInRect(point_x, point_y, tower) {
        if (point_x >= tower.x && point_x <= (tower.x + tower.width) && point_y >= tower.y
            && point_y <= (tower.y + tower.height))
            return true
        else return false;
    }

    //拆塔以及升级塔
    up_downTower(option_x, option_y) {
        if (this.xx.length > 0 ) {
            for (var tower in this.towers) {
                for (var cx in this.xx) {
                    //点击删除
                    if (this.towers[tower].x == (option_x - 1) * CELL_WIDTH && this.towers[tower].y == (option_y + 1) * CELL_WIDTH) {
                        this.player.money += this.towers[tower].type.sale;
                        this.towers.splice(tower, 1);
                        this.xx.splice(cx, 1);
                        MAP_ARR[option_x - 1][option_y + 1] = 0;
                        this.drawTowerMap();
                        this.drawss();
                        break;
                    }
                    //点击升级
                    // console.log(this.towers[tower]);
                    if (this.towers[tower].x == (option_x + 1) * CELL_WIDTH && this.towers[tower].y == (option_y + 1) * CELL_WIDTH) {
                        this.up.splice(cx, 1);
                        console.log("塔对应类型"+this.towers[tower].type.type % 3);
                        if (this.towers[tower].type.type % 3 > 0 && this.towers[tower].type.type % 3 < 3) {
                            if (this.towers[tower].type.cost <= this.player.money) {
                                this.Tower_up(this.towers[tower].type, option_x, option_y);
                                this.player.money -= this.towers[tower].type.cost;
                                break;
                            } else {
                                $("#moneyshow").css("border", "2px solid red");
                                setTimeout(() => {
                                    $("#moneyshow").css("border", " white");
                                }, 500);
                                //金额不足提示框显示2s后消失
                                $("#lack_money").show();
                                setTimeout(() => {
                                    $("#lack_money").hide();
                                }, 2000);

                            }
                        }
                    }
                }
            }
           
        }
        if (MAP_ARR[option_x][option_y] == 1) {
            this.drawss();
            this.xx.push(new Xx(option_x, option_y));
            if (this.xx.length > 1) {
                this.xx.splice(cx, 1);
                if (this.xx.length > 1) {
                    this.xx.splice(cx, 1);
                }
            }
            console.log(this.xx)
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
                    this.towers.push(new Tower(X * CELL_WIDTH, Y * CELL_WIDTH, type));//创建塔，就往塔里面传值。
                    this.player.money -= type.cost;
                    MAP_ARR[X][Y] = 1;
                } else {
                    $("#moneyshow").css("border", "2px solid red");
                    setTimeout(() => {
                        $("#moneyshow").css("border", " white");
                    }, 500);
                    //金额不足提示框显示2s后消失
                    $("#lack_money").show();
                    setTimeout(() => {
                        $("#lack_money").hide();
                    }, 2000);

                }
            }
        }
    } 
}


