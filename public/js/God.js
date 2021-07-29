class God {
    constructor() {
        //建立一个可见性改变事件
        //离开当前页面时，会弹窗 并阻塞当前游戏

        this._init();//测试
        $("#startgame_btn").show();
        $("#logout_btn").show();
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
        // let a = setInterval(() => {
        //     $("#moneyshow").html(300);
        // }, 300);
        // console.log(a);
        $("#startgame_btn").on("click",() => {
            $("#startgame_btn").hide();
            $("#logout_btn").hide();
            $("#home_visi").hide();
            $("#block_skill").show();
            $("#block1_box").show();
            $("#block_left").show();
            $("#block_right").show();
            $("#skill-btns-container").show();

            // //绑定连接事件
            // this.link();
            this.startGame();
        });

        $("#logout_btn").on("click", () => {
            window.location.href = './log.html';
        });


        // // websocket连接
        // let ws
        // // 房间号
        // let roomCount
        // // 用户名
        // let name
        // //ip地址
        // let IP='ws://localhost:8888'


    }
    
    // 匹配倒计时，共6秒，3秒时切换敌方图片，0秒时进入游戏界面start
    // showTime() {
    //     let count=6;        
    //     let time=setInterval(function () {
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
    //         let score = document.getElementById("score")
    //         ws.send({type:0,score:score.value})
    //     }
    //     //收到消息触发
    //     ws.onmessage = function(evt){
    //         // 消息转为json类型
    //         let recv = JSON.parse(evt.data)
    //         //设定房间号
    //         if(recv.type==0){
    //             let roomCount = document.getElementById("roomCount")
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
        this.player = new Player();
        this.needStop = 1; //生成子弹和敌人标签，1表示停止生成
        this.enemy_level = 0; // 怪物等级
        this.boss = 0; // 是否是boss：0=小怪，1=boss
        this.leftTime = 180;//剩余时间,单位秒
        this.leftTimeMin = parseInt(this.leftTime / 60);//设置结束的时间也为0
        this.leftTimeSecond = this.leftTime % 60;
        this.map_a = new map();
        this.enemyNumber = 0; // 算上正在reborn的敌人的总数量
        this.enemyExisted = 0; // 地图上存在的的敌人数量
        this.killed_enemies = 0; // 杀敌数
        this.enemyNumberLimit = 200;
        this.rebornEnemy = [];
        this.towersNumber = 0; // 地图上塔的数量
        this.optionsNumber = 0; // 地图上选项的数量---------------------------------------------------------------------------------------------------
        this.towers = [];//定义塔的空数组
        this.bullets = [];//定义子弹的空数组
        this.enemies = [];//定义小怪的空数组
        this.options = []; //塔的选项数组------------------------------------------------------------
        this.last_option_x = undefined;
        this.last_option_y = undefined;
        this.tower_message=[
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0],
            [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0],
            [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0],
            [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
            [0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ]

        // 监控 
        $("#canvasMap_option").on("click", (e) => {//jquery语法，在这个图层里面，就是坑位被点击后做的动作。e就是鼠标监听的坐标
            //在建塔的图层上
            this.option_x = parseInt(e.offsetX / CELL_WIDTH+1); //鼠标监听，然后得到一个坐标。
            this.option_y = parseInt(e.offsetY / CELL_WIDTH+1);
            console.log(this.option_x,this.option_y);
            this.drawOptions();
        });


        //  画地图所占据的所有出格子
        for (let i = 0; i < MAP_X; i++) {
            MAP_ARR[i] = new Array();
            for (let j = 0; j < MAP_Y; j++) {
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
                    let kill_enemy_num_of_this_click=0;
                    for(let ene2 in this.enemies) {
                        if(this.enemies[ene2]==null){
                            continue
                        }
                        this.enemies[ene2].check_bloodloss();
                        // 生命为0的时候 敌人死去
                        if (this.enemies[ene2].hp <= 1) {
                            this.player.money += this.enemies[ene2].money; 
                            this.enemies[ene2].dead();
                            // console.log("kill");
                            this.killed_enemies++;
                            this.nowenemys--;
                            this.enemies[ene2] = null;
                            // this.enemies.splice(e, 1);
                            this.enemies.splice(ene2, 1,null);
                            this.enemyExisted--;
                            kill_enemy_num_of_this_click++
                            this.enemyNumber--
                            console.log('现在杀死一个还剩'+this.enemyNumber)
                            // this.createEnemy(0);
                            // this.createEnemy(0);
                        }
                    }
                    for(let q=0;q<kill_enemy_num_of_this_click;q++){
                        this.createEnemy(0)
                        this.createEnemy(0)
                    }
                    //金币数量减少
                    this.player.money = this.player.money - reduce_enemy_blood_money;
                    console.log("使用给自己小怪减血技能后，金币还剩:" + this.player.money);
                }
                else {
                    this.money_not_enough();
                    // $("#moneylack").show(300).delay(1000).hide(200);
                    // console.log(this.player.money);
                    // alert("给自己小怪减血技能金币数量不够");
                }
            } else {
                alert("地图上没有小怪，无法减血");
            }
        });

        //增强对方的小怪等级，点击按钮时调用
        $("#increase_enemy_level").on("click", () => {
            this.createEnemy(0);
            // // console.log(this.enemies);
            // console.log("现有金币数量:" + this.player.money);
            // console.log("技能需要金币数量:" + increase_enemy_level_money);
            // console.log("小怪的数量为" + this.enemies.length);
            // if (this.enemies.length > 0) {
            //     if (increase_enemy_level_money <= this.player.money) {
            //         this.enemy_level++;
            //         console.log("当前小怪等级：" + this.enemy_level);
            //         this.player.money = this.player.money - increase_enemy_level_money;
            //         console.log("使用增强对方的小怪等级技能后，金币还剩:" + this.player.money);
            //     } else {
            //         this.money_not_enough();
            //         // $("#moneylack").show(300).delay(1000).hide(200);
            //         // alert("给对方小怪升级金币数量不够");
            //     }
            // } else {
            //     alert("地图上没有小怪，无法升级");
            // }
        });

        //给对方增加一个boss，点击按钮时调用
        $("#add_boss").on("click", () => {
            console.log("现有金币数量:" + this.player.money);
            console.log("技能需要金币数量:" + add_boss_money);
            if (add_boss_money <= this.player.money) {
                this.createEnemy(1);
                this.player.money = this.player.money - add_boss_money;
                console.log("使用对方增加一个boss技能后，金币还剩:" + this.player.money);
            } else {
                this.money_not_enough();
                // alert("给对方增加一个boss金币数量不够");
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
        this.chat();

        this.draw_enemy = setInterval(() => {
            this.drawEnemies();
        }, 40);


        // //websocket 判断小兵是否减少，如果减少，向对方发送信息
        // // 初始小兵数量
        // //记录初始小兵数量
        // let enemies = 2
        // setInterval(()=>{
        //     // 300毫秒，检测小兵数量，少了就发送小兵死亡信息，少几个发几次，多了就把当前小兵数赋值给enemies，方便之后的比对
        //     if(enemies > this.enemyExisted){
        //         let num = enemies-this.enemyExisted
        //         for(let i = 0;i<num;i++){
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
        this.createEnemy(0);
        console.log("create firstenemy");
    }

    // 生成0~max-1的随机整数
    randomnum(max) {
        return Math.floor(Math.random() * max);
    }

    // 生成敌人
    createEnemy(boss) {
        let enemy_type = this.randomnum(3)
        // let enemy_level = this.enemy_level //需要传入怪物当前等级
        // let boss = this.boss //需要传入是否为boss
        let enemy = new Enemy(enemy_type,
            EnemyType[enemy_type][0], // 血量
            EnemyType[enemy_type][1], // 速度
            EnemyType[enemy_type][2], // 大小
            EnemyType[enemy_type][3], // 图片
            EnemyType[enemy_type][4], // 死亡掉落金币
            this.enemy_level, // 等级
            boss, // 是否为boss
            );
        enemy.check_levelup();
        enemy.check_boss();
        this.enemies.push(enemy);
        // console.log(this.enemies);
        this.enemyNumber++;
        // if (this.enemyNumber <= length) {
        //     let enemy = new Enemy();
        //     this.enemies.push(enemy);
        //     this.enemyNumber++;
        // }
    }

    // 传入参数，xy坐标（以格子为单位，横x竖y），防御塔类型（int）
    createTower(x,y,type){
        console.log("in create tower: x:"+x+" y:"+y);
        console.log(this.tower_message);
        if(this.player.money<TowerType[type-1][4]){
            this.money_not_enough();
        }else{
            let tower = new Tower(
                x,
                y,
                type,
                // 攻击范围，间隔，cost,sale
                TowerType[type-1][1],
                TowerType[type-1][2],
                TowerType[type-1][4],
                TowerType[type-1][5]
            );
            console.log(tower);
            this.towers.push(tower);
            this.tower_message[y-1][x-1] = (type+1);
            this.player.money -= tower.cost;
            this.towersNumber ++ ;
            tower.check_attack_interval = setInterval(() => {
                this.tower_attack(tower);
            },30);
        }
    }

    tower_attack(tower){
        for (let ene in this.enemies) {
            let distanceX = tower.x - this.enemies[ene].x;
            let distanceY = tower.y - this.enemies[ene].y;
            if (Math.abs(distanceX) <= tower.range * CELL_WIDTH && Math.abs(distanceY) <= tower.range * CELL_WIDTH) {
                this.bullets.push(new Bullet(
                    tower.x,
                    tower.y,
                    this.enemies[ene].x,
                    this.enemies[ene].y,
                    // type,enemy_index
                    tower.type,
                    ene
                ));
                clearInterval(tower.check_attack_interval);
                setTimeout(() => {
                    tower.check_attack_interval = setInterval(() => {
                        this.tower_attack(tower);
                    },30)
                }, tower.attack_interval);
            }   
        } 
    }

    money_not_enough(){
        $("#moneylack").show(300).delay(1000).hide(200);
        // alert("money is not enough");
    }

    judge_game() {
        //监听怪的数量到了100只
        if (this.enemyExisted >= 100) {
            this.stopGame();
            alert("lose");
            // //websocket发送失败信息
            // this.send({type:4,roomCount:this.roomCount,name:this.name})
            // // 关闭websocket连接
            // this.close()

        }
        //监听时间小于100秒，并且怪的数量小于100只
        if (this.enemyExisted < 100 && this.leftTime <= 0) {
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
        for (let bullet in this.bullets) {
            this.bullets[bullet].stop();
        }
    }

    //   敌人停止移动
    stopEnemies() {
        for (let ene in this.enemies) {
            if(this.enemies[ene]==null){
                continue
            }
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
        for(let bullet in this.bullets){
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
                        this.bullets[bullet].dead();
                        this.bullets[bullet] = null;
                        this.bullets.splice(bullet, 1);
                        // 生命为0的时候 敌人死去
                        if (this.enemies[ene].hp <= 0) {
                            this.player.money += this.enemies[ene].money; //-----------------------------------------------------------------戴
                            this.enemies[ene].dead();
                            // console.log("kill");
                            this.killed_enemies++;
                            this.nowenemys--;
                            this.enemies[ene] = null;
                            this.enemies.splice(ene, 1);
                            this.enemyExisted--;
                            this.createEnemy(0);
                            this.createEnemy(0);
                        }
                        break;
                    }
                }
            }
        }
    }

    //升级塔
    Tower_up(type,x,y){
        
        switch (type) {
            case 1:
                for (let tower in this.towers) {
                    if (this.towers[tower].x == this.x && this.towers[tower].y == this.y) {
                        if (TowerType.two.cost <= this.player.money) {
                            this.towers[tower].tower_img = "img/tower/tower1-2.png";
                            this.towers[tower].type = TowerType.two;
                            this.player.money -= TowerType.two.cost;
                            this.tower_message[y-1][x-1] = type+1;
                        }
                        else {
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
                break;
                case 2:
                    for (let tower in this.towers) {
                        if (this.towers[tower].x == this.x && this.towers[tower].y == this.y) {
                            if (TowerType.three.cost <= this.player.money) {
                                this.towers[tower].tower_img = "img/tower/tower1-3.png";
                                this.towers[tower].type = TowerType.three;
                                this.player.money -= TowerType.three.cost;
                                this.tower_message[y-1][x-1] = type+1;    
                            }
                            else {
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
                    break;
                case 3:
                    break;               
                case 4:
                    for (let tower in this.towers) {
                        if (this.towers[tower].x == this.x && this.towers[tower].y == this.y) {
                            if (TowerType.five.cost <= this.player.money) {
                                this.towers[tower].tower_img = "img/tower/tower2-2.png";
                                this.towers[tower].type = TowerType.five;
                                this.player.money -= TowerType.five.cost;
                                this.tower_message[x,y] = type+1;   
                            }
                            else {
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
                    break;
                    case 5:
                        for (let tower in this.towers) {
                            if (this.towers[tower].x == this.x && this.towers[tower].y == this.y) {
                                if (TowerType.six.cost <= this.player.money) {
                                    this.towers[tower].tower_img = "img/tower/tower2-3.png";
                                    this.towers[tower].type = TowerType.six;
                                    this.player.money -= TowerType.six.cost;
                                    this.tower_message[x,y] = type+1;
                                }
                                else {
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
                        break;
                    case 6:
                        break;                
        }   
    }


    //拆除塔
    Tower_down(type,x,y) {
        for (let tower in this.towers) {
            if (this.towers[tower].x == this.x && this.towers[tower].y == this.y) {
                this.player.money += this.towers[tower].type.sale;
                this.towers.splice(tower, 1);
                this.tower_message[x,y] = 1;
            }
        }
    }    

    // canvas部分*******************************************************


     //绘制敌人
    drawEnemies() { 
        //获取敌人对象
        let cv = document.querySelector('#canvasMap_enemy');
        //获取2d平面
        let ctx = cv.getContext('2d');

        

        // 清空敌人图片
        ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
        let img = new Image;
        // 遍历数据，绘制敌人
        for (let ene in this.enemies) {
            if(this.enemies[ene]==null){
                continue
            }
            // console.log(this.enemies[ene])
            img.src = this.enemies[ene].enemy_img;
            ctx.drawImage(img, this.enemies[ene].x, this.enemies[ene].y, this.enemies[ene].size, this.enemies[ene].size);
            Ca.drawBlood(ctx, this.enemies[ene]);
            // console.log(this.enemies[ene].x)
            // console.log(this.enemies[ene].y)
        }
    
    }

    //绘制塔
    drawTower(option_x,option_y) {
        let cv = document.querySelector('#canvasMap_tower');
        let ctx = cv.getContext('2d');
        let img_tower = new Image()
        console.log('绘制塔:');
        console.log(this.tower_message);
        img_tower.src = TowerType[this.tower_message[option_y-1][option_x-1]-1-1][3];
        console.log(img_tower.src);
        ctx.drawImage(img_tower, (option_x) * CELL_WIDTH, (option_y) * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
    }

    //绘制选项
    drawOptions(){
        let cv = document.querySelector('#canvasMap_option');
        let ctx = cv.getContext('2d');
        let img_xx = new Image();
        let img_up = new Image();
        // 判断这次单机的位置是不是不在上次点击的位置的左上角和右上角
        // 因为生成的选项在左上角右上角
        // 如果不在，则把上次的位置的值置为这次的位置的值
        if((this.option_x!=this.last_option_x-1||this.option_y!=this.last_option_y-1)
            &&(this.option_x!=this.last_option_x+1||this.option_y!=this.last_option_y-1)){
                console.log("点击不是选项的位置");
                this.last_option_x = this.option_x;
                this.last_option_y = this.option_y;
                ctx.clearRect(0,0,MAP_WIDTH,MAP_HEIGHT);
            }else{
                console.log("in draw option before create tower: x:"+this.last_option_x+" y:"+this.last_option_y);
                console.log(this.tower_message);
                let num = this.tower_message[this.last_option_y-1][this.last_option_x-1];
                console.log("num:"+num);
                if (num==1){   //没有塔，开始建塔
                    img_xx.src = "img/tower/tower2-1.png";
                    img_up.src = "img/tower/tower1-1.png";
                    ctx.drawImage(img_xx, (this.last_option_x + 1) * CELL_WIDTH, (this.lasgt_option_y - 1) * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
                    ctx.drawImage(img_up, (this.last_option_x - 1) * CELL_WIDTH, (this.last_option_y - 1) * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
                    if(this.option_x==this.last_option_x-1&&this.option_y==this.last_option_y-1){
                        this.createTower(this.last_option_x,this.last_option_y,1);
                    }else{
                        this.createTower(this.last_option_x,this.last_option_y,2);
                    }
                    console.log("create tower done");
                    console.log(this.tower_message);
                    this.drawTower(this.last_option_x,this.last_option_y);
                }
                else if (num!==0 && num!==1){
                    img_xx.src = "img/button/sholve.png";
                    img_up.src = "img/button/upgrade.png";
                    ctx.drawImage(img_xx, (this.last_option_x + 1) * CELL_WIDTH, (this.last_option_y - 1) * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
                    ctx.drawImage(img_up, (this.last_option_x - 1) * CELL_WIDTH, (this.last_option_y - 1) * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
                }
                this.last_option_x = this.option_x;
                this.last_option_y = this.option_y;
                ctx.clearRect(0,0,MAP_WIDTH,MAP_HEIGHT);
            }
    }





    //聊天
    chat(){
            // console.log(this.player)
            let player1 = this.player;
            let Words = document.getElementById("words");
            let Who = 0;
            let TalkWords = document.getElementById("talkwords");
            let TalkSub = document.getElementById("talksub");
            TalkSub.onclick = function(){
                //定义空字符串
                let str = "";
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
                if(Who== 0){
                    str = '<div class="btalk"><span>' + TalkWords.value +'</span></div>' ;
                  
                }
                else{
                    str = '<div class="atalk"><span>' + TalkWords.value +'</span></div>';
                }
                Words.innerHTML = Words.innerHTML + str;
                TalkWords.value="";
            }
        }

    
}


