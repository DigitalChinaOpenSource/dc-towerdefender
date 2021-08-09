class God {
    constructor() {
        //建立一个可见性改变事件
        //离开当前页面时，会弹窗 并阻塞当前游戏

        this._init();//测试
        $("#startgame_btn").show();
        $("#logout_btn").show();
        $(".total").hide();
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
            $("#read_me").hide();
            $("#rule").hide();
            $("#startgame_btn").hide();
            $("#logout_btn").hide();
            $("#home_visi").hide();
            $("#block_skill").show();
            $("#block1_box").show();
            $("#block_left").show();
            $("#block_right").show();
            $("#skill-btns-container").show();
            $("#rule_btn").hide();
            $("#rule_close").hide();
             //隐藏游戏页面，显示匹配页面，修改start******************
            this.showTime();
            $(".block").hide();
            $(".match").show();
            $(".total").hide();
            // 修改end******************

            // //绑定连接事件
            this.websocketLink();
            $('.enemy_part').hide()

            //监听开始游戏标识
            // this.startGameAAAA = setInterval(()=>{
            //     if(startGameSign == 1){
            //         this.websocketSend({type:1,roomCount:roomCount,name:linkName,
            //             otherHistoryWin:historyWin,otherShaEnemy:this.shaEnemy,otherEneNum:this.enemyNumber,otherSocre:score})
            //         this.startGame()
            //     }
            //     startGameSign = 0
            // },100)
        });

        $("#logout_btn").on("click", () => {
            window.location.href = './log.html';
        });
        $("#rule_close").on("click",() => {
            $("#rule_btn").hide();
            $("#rule_close").hide();
        });
        $("#rule").on("click",() => {
            $("#rule_btn").show();
            $("#rule_close").show();
            $("#rule_close").on("click",() => {
                $("#rule_btn").hide();
                $("#rule_close").hide();
            });
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
    showTime() {
        let count=6;        
        let time=setInterval(()=>{
            $('#waitName').html(linkName)
            $('#waitScore').html(score)
            this.onlineNumShow = setInterval(() => {
                $('#detail_num').html(onlineNum)
            }, 500);


            count -= 1;
            // if(count==3){
            //     $("#match_before").hide();
            //     $("#match_after").show();
            // }
            // // if (count == 0) {
            // //     clearInterval(time);    
            // //     $(".match").hide();
            // //     $(".block").show();
            // }
            if(startGameSign == 1){
                this.websocketSend({type:8,roomCount:roomCount,name:linkName,
                    otherSocre:score,onlineNum:0})
                    $('.enemy_part').show()

                setTimeout(() => {
                    $("#match_before").hide();
                    clearInterval(time);    
                    $(".match").hide();
                    $(".block").show();
                    this.startGame()
                }, 5000);
                // $("#match_before").hide();
                // clearInterval(time);    
                //  $(".match").hide();
                // $(".block").show();
                // this.websocketSend({type:1,roomCount:roomCount,name:linkName,
                //     otherHistoryWin:historyWin,otherShaEnemy:this.shaEnemy,otherEneNum:this.enemyNumber,otherSocre:score,onlineNum:0})
                // this.startGame()
            }
            startGameSign = 0
            // else{    
            //     // console.log("*****"+count);
            //     document.getElementById('match_time').innerHTML = count;
            // } 


            




            
        }, 1000);
    }
    // 匹配倒计时，共6秒，3秒时切换敌方图片，0秒时进入游戏界面end

    // 跳转到成功时的结算页面
    to_total_win(){
        $(".block").hide();
        $(".match").hide();
        $(".total").show();
        document.getElementById('total_name').innerHTML = linkName;
        document.getElementById('total_score').innerHTML = '+10';
        document.getElementById('total_num').innerHTML = this.shaEnemy;
        $("#total_continue").on("click", () => {
            $(".total").hide();
            $("#startgame_btn").show();
            $("#logout_btn").show();
            $("#home_visi").show();
            // this.clearCanvas()
            this.clean()
            // // this._init()
            // // new God()
            // // this.to_match();
        });
    }

    // 跳转到失败时的结算页面
    to_total_lose(){
        $("#total_win").hide();
        $("#total_lose").show();
        $(".block").hide();
        $(".match").hide();
        $(".total").show();
        document.getElementById('total_name').innerHTML = linkName;
        document.getElementById('total_score').innerHTML = '-10';
        document.getElementById('total_num').innerHTML = this.shaEnemy;
        $("#total_continue").on("click", () => {
            $("#total_lose").hide();
            $(".total").hide();
            $("#startgame_btn").show();
            $("#logout_btn").show();
            $("#home_visi").show();
            // this.clearCanvas()
            this.clean()
            // this._init()
            // new God()
            // this.to_match();
        });
        
    }

    // 跳转到匹配页面
    to_match(){
        $("#match_before").show();
        $("#match_after").hide();
        document.getElementById('match_time').innerHTML = "倒计时";
        this.showTime();
        $(".block").hide();
        $(".match").show();
        $(".total").hide();
        // this._init();
        // this.startGame();
        
    }




    websocketLink(){
        // console.log(ip)
        ws = new WebSocket(ip)
        ws.onopen = function(){
            console.log('success liked the server')
            if(getUserInfo == 0){
                let indexScore = document.getElementById('indexScore')
                let indexName = document.getElementById('indexName')
                let indexHistoryWin = document.getElementById('indexHistoryWin')
                let indexScoreValue = indexScore.innerHTML.trim()
                let indexNameValue = indexName.innerHTML.trim()
                historyWin = indexHistoryWin.innerHTML.trim()
                linkName = indexNameValue
                score = indexScoreValue
                getUserInfo = 1
            }
            ws.send(JSON.stringify({score:score,name:linkName}))
        }
    
        ws.onmessage = function(evt){
            // 消息转为json类型
            var recv = JSON.parse(evt.data)
            //设定房间号
            if(recv.type==0){
                roomCount = recv.roomCount
                console.log('roomCount========>'+roomCount)
                startGameSign = 1
            }
            if(recv.type == 7){
                onlineNum = recv.onlineNum
                console.log('onlineNum=================>'+onlineNum)
            }
            // 判断信息是否是发给自己的房间的
            if(recv.roomCount == roomCount){
                // 判断是否为自己发的信息
                if(recv.name != linkName){
                    if(recv.type == 1){
                        //生成两个小兵
                        createEnemySign = 1
                        killNum = recv.killNum
                        otherShaEnemy = recv.otherShaEnemy
                        otherHistoryWin = recv.otherHistoryWin
                        otherEneNum = recv.otherEneNum
                        otherSocre = recv.otherSocre
                        otherName = recv.name
                        onlineNum = recv.onlineNum
                    }else if(recv.type == 2){
                        //小兵增强
                        if(recv.action == 0){
                            createEnemySign =3
                        }else if(recv.action == 1){
                            createEnemySign = 2
                        }
                        otherShaEnemy = recv.otherShaEnemy
                        otherHistoryWin = recv.otherHistoryWin
                        otherEneNum = recv.otherEneNum
                        otherSocre = recv.otherSocre
                        otherName = recv.name
                        onlineNum = recv.onlineNum
                    }else if(recv.type == 3){
                        //显示聊天msg

                         var Words = document.getElementById('words')
                        var m=recv.msg;
                        // alert(m);
                        // alert(Words);
                        var str = '<div class="atalk"><span>' + m +'</span></div>';
                        Words.innerHTML = Words.innerHTML + str;
                        otherShaEnemy = recv.otherShaEnemy
                        otherHistoryWin = recv.otherHistoryWin
                        otherEneNum = recv.otherEneNum
                        otherSocre = recv.otherSocre
                        otherName = recv.name
                        onlineNum = recv.onlineNum
                    }else if(recv.type == 4){
                        //调用获胜方法赢了
                        // alert('you win')
                        //调用断开连接方法
                        winSign = 1
                        // ws.close()
                    }else if(recv.type == 5){
                        //时间到，对比小兵enemy数量，判断输赢
                        ////调用断开连接方法
                        if(recv.otherEneNum<finalEnmyNum){
                            console.log("other"+recv.otherEneNum)
                            console.log("mine"+finalEnmyNum)
                            // alert("you losed")
                            winSign =0
                        }else{
                            console.log("other"+recv.otherEneNum)
                            console.log("mine"+finalEnmyNum)
                            // alert('you win')
                            winSign = 1
                        }
                        // ws.close()
                    }else if(recv.type == 6){
                        otherShaEnemy = recv.otherShaEnemy
                        otherHistoryWin = recv.otherHistoryWin
                        otherEneNum = recv.otherEneNum
                        otherSocre = recv.otherSocre
                        otherName = recv.name
                        onlineNum = recv.onlineNum
                    }else if(recv.type == 8){
                        otherName = recv.name
                        otherSocre = recv.otherSocre
                        $('#otherReadyName').html(otherName)
                        $('#otherReadyScore').html(otherSocre)
                    }
                }
            }
        }
        
    }

    websocketSend(msg){
        ws.send(JSON.stringify(msg))
    }

    websocketClose(){
        ws.close()
        console.log('success close websocket link')
        // this.websocketLink()
    }


    clean(){
        startGameSign = 0
        createEnemySign = 0
        killNum = 0
        winSign = -1



        otherShaEnemy = 0
        otherHistoryWin = 0
        otherEneNum = 0
        otherSocre = 0
        otherName = null
    }

    


    _init() {
        //初始化（1先定义一个可以安置的塔的种类的数组.2创建一个玩家对象。3画出四层画布。4创建一个json形式的敌人数组，根据LEVEL数组被赋值,赋值为另一个数组（敌人的 类型，数量enemyType: EnemyType.DesertMob, num: 10）
        // 5 定义两个变量：地图上敌人数量，需要消灭的敌人数量）
        this.player = new Player();
        this.needStop = 1; //生成子弹和敌人标签，1表示停止生成
        this.enemy_level = 0; // 怪物等级
        this.boss = 0; // 是否是boss：0=小怪，1=boss
        this.leftTime = GAME_TIME;//剩余时间,单位秒
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



        this.shaEnemy = 0




        this.last_option_x = undefined;
        this.last_option_y = undefined;
        this.need_hide_option = 0;
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
                            this.killed_enemies++;
                            this.nowenemys--;
                            this.enemies[ene2] = null;
                            this.enemies.splice(ene2, 1, null);
                            this.enemyExisted--;
                            kill_enemy_num_of_this_click++
                            this.enemyNumber--
                            this.shaEnemy++
                        }
                    }
                    // for(var q=0;q<kill_enemy_num_of_this_click;q++){
                    //     this.createEnemy(0)
                    //     this.createEnemy(0)
                    // }
                    this.websocketSend({type:1,roomCount:roomCount,name:linkName,killNum:kill_enemy_num_of_this_click,
                        otherHistoryWin:historyWin,otherShaEnemy:this.shaEnemy,otherEneNum:this.enemyNumber,otherSocre:score,onlineNum:0})
                    //金币数量减少
                    this.player.money = this.player.money - reduce_enemy_blood_money;
                    console.log("使用给自己小怪减血技能后，金币还剩:" + this.player.money);
                }
                else {
                    this.money_not_enough();
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
                if (increase_enemy_level_money <= this.player.money) {
                    this.websocketSend({type:2,roomCount:roomCount,name:linkName,action:0,
                        otherHistoryWin:historyWin,otherShaEnemy:this.shaEnemy,otherEneNum:this.enemyNumber,otherSocre:score,onlineNum:0})
                    this.player.money = this.player.money - increase_enemy_level_money;
                    console.log("使用增强对方的小怪等级技能后，金币还剩:" + this.player.money);
                } else {
                    this.money_not_enough();
                }
        });

        //给对方增加一个boss，点击按钮时调用
        $("#add_boss").on("click", () => {
            console.log("现有金币数量:" + this.player.money);
            console.log("技能需要金币数量:" + add_boss_money);
            if (add_boss_money <= this.player.money) {
                // this.createEnemy(1);
                this.player.money = this.player.money - add_boss_money;
                // websocket发送增强信息
                this.websocketSend({type:2,roomCount:roomCount,name:linkName, action:1,
                    otherHistoryWin:historyWin,otherShaEnemy:this.shaEnemy,otherEneNum:this.enemyNumber,otherSocre:score,onlineNum:0})
                console.log("使用对方增加一个boss技能后，金币还剩:" + this.player.money);
            } else {
                this.money_not_enough();
            }
        });

        //动态显示金币
        this.timeMoney = setInterval(() => {
            $("#moneyshow").html(this.player.money);
        }, 300);
        //动态显示敌人数量
        this.timeEnemies = setInterval(() => {
            $("#lifeshow").html(otherEneNum - this.enemyNumber);
        }, 300);
        // 动态显示游戏时间
        this.timeTime = setInterval(() => {
            $("#timeshow").html(this.leftTimeMin + ":" + this.leftTimeSecond);
        }, 300);
        // 时刻获取游戏状态
        this.getGameState = setInterval(() => {
            this.gameState();
        }, 40);
        this.chat();

        this.draw_enemy = setInterval(() => {
            this.drawEnemies();
        }, 30);

        this.draw_towers = setInterval(() => {
            this.drawTowers();
        },1000);

        this.draw_bullet = setInterval(() =>{
            this.drawBullet();
        }, 40)
        this.createEnemyAAAA = setInterval(()=>{
            if(createEnemySign == 1){
                for(var i = 0 ;i < killNum*2 ;i++){
                    this.createEnemy(0)
                }
                killNum = 0
            }if(createEnemySign == 2){
                this.createEnemy(1)
            }
            if(createEnemySign == 3){
                this.enemy_level++
            }
            createEnemySign = 0
        },40)

        this.winSignAAAA = setInterval(()=>{
            if(winSign == 0){
                this.websocketSend({type:5,roomCount:roomCount,name:linkName,otherEneNum:this.enemyNumber})
                this.to_total_lose()
                this.writeGameTotalInfo(linkName)
                this.websocketClose()
                winSign = -1
            }
            if(winSign == 1){
                console.log("send my msg when i win")
                this.websocketSend({type:5,roomCount:roomCount,name:linkName,otherEneNum:this.enemyNumber})
                this.stopGame()
                console.log('winner is'+linkName)
                this.writeGameInfo(linkName)
                this.to_total_win()
                this.websocketClose()
                winSign = -1
            }

        })


        this.other = setInterval(() => {
            $("#p2nameshow").html(otherName);
            $("#p2pointshow").html(otherSocre);
            $("#p2historywinshow").html(otherHistoryWin);
            $("#p2killenemyshow").html(otherShaEnemy);
            $("#p2leaveenemyshow").html(otherEneNum);

            $("#p1killenemyshow").html(this.shaEnemy);
            $("#p1leaveenemyshow").html(this.enemyNumber);
            finalEnmyNum = this.enemyNumber

            // $('#detail_num').html(onlineNum)
        }, 60);


        this.recvOtherMsg = setInterval(() => {
            this.websocketSend({type:6,roomCount:roomCount,name:linkName,killNum:1,
                otherHistoryWin:historyWin,otherShaEnemy:this.shaEnemy,otherEneNum:this.enemyNumber,otherSocre:score,onlineNum:0})
        }, 60);


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
        clearInterval(this.draw_bullet);
        clearInterval(this.draw_enemy)
        clearInterval(this.other);
        clearInterval(this.recvOtherMsg);
        clearInterval(this.createEnemyAAAA);
        // clearInterval(this.winSignAAAA);
        clearInterval(this.draw_towers);
    }

    createFirstEnemy() {
        this.createEnemy(0);
        // setTimeout(() => {
        //     this.createEnemy(0);
        //     setTimeout(() => {
        //         this.createEnemy(0);
        //         setTimeout(() => {
        //             this.createEnemy(0);
        //             setTimeout(() => {
        //                 this.createEnemy(0);
        //                 setTimeout(() => {
        //                     this.createEnemy(0);
        //                     setTimeout(() => {
        //                         this.createEnemy(0);
        //                         setTimeout(() => {
        //                             this.createEnemy(0);
        //                             setTimeout(() => {
        //                                 this.createEnemy(0);
        //                                 setTimeout(() => {
        //                                     this.createEnemy(0);
        //                                     setTimeout(() => {
        //                                         this.createEnemy(0);
        //                                     }, 1500);
        //                                 }, 1500);
        //                             }, 1500);
        //                         }, 1500);
        //                     }, 1500);
        //                 }, 1500);
        //             }, 1500);
        //         }, 1500);
        //     }, 1500);
        // }, 1500);
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
        this.enemyNumber++;
        // if (this.enemyNumber <= length) {
        //     let enemy = new Enemy();
        //     this.enemies.push(enemy);
        //     this.enemyNumber++;
        // }
    }

    // 传入参数，xy坐标（以格子为单位，横x竖y），防御塔类型（int）
    createTower(x,y,type){
        if(this.player.money<TowerType[type-1][4]){
            this.money_not_enough();
        }else{
            let tower = new Tower(
                (x-1)*CELL_WIDTH,
                (y-1)*CELL_WIDTH,
                type,
                // 攻击范围，间隔，cost,sale
                TowerType[type-1][1],
                TowerType[type-1][2],
                TowerType[type-1][4],
                TowerType[type-1][5]
            );
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
        // 先判断是哪种塔
        // 判断是type为123，即左边的塔
        if(parseInt((parseInt(tower.type)-1)/3)==0){
            // 判断这个塔有没有目标，这里是没有目标
            if(tower.targe_index == null){
                let min_distance2 = 1000000;
                let nearest_enemy = undefined;
                // 遍历，拿到整个怪数组里在攻击范围内，离自己最近的
                for (let ene in this.enemies) {
                    if(this.enemies[ene]!=null){
                        let distanceX = tower.x - this.enemies[ene].x;
                        let distanceY = tower.y - this.enemies[ene].y;
                        let distanceXY2 = distanceX*distanceX + distanceY*distanceY;
                        // 判断这个怪在不在攻击范围内，如果在，判断是不是离自己最近的，是就复制
                        if (distanceXY2 <= (tower.range*CELL_WIDTH * tower.range*CELL_WIDTH)) {
                            if(distanceXY2 < min_distance2){
                                min_distance2 = distanceXY2;
                                nearest_enemy = ene;
                            }
                        }   
                    }    
                }
                // 如果有离自己最近且在攻击范围内的怪，发射子弹
                if(nearest_enemy!=null){
                    this.bullets.push(new Bullet(
                        tower.x,
                        tower.y,
                        this.enemies[nearest_enemy].x,
                        this.enemies[nearest_enemy].y,
                        // type,enemy_index
                        tower.type,
                        nearest_enemy
                    ));
                    // 把怪赋给塔的目标
                    tower.targe_index = nearest_enemy;
                    // 发射子弹了，清除定时器，攻击间隔之后重新启动定时器
                    clearInterval(tower.check_attack_interval);
                    setTimeout(() => {
                        tower.check_attack_interval = setInterval(() => {
                            this.tower_attack(tower);
                        },30)
                    }, tower.attack_interval); 
                }  
            }
            // 有目标
            else{
                // 判断之前的目标死了没，这里是没死
                if(this.enemies[tower.targe_index]!=null){
                    let distanceX = tower.x - this.enemies[tower.targe_index].x;
                    let distanceY = tower.y - this.enemies[tower.targe_index].y;
                    let distanceXY2 = distanceX*distanceX + distanceY*distanceY;
                    // 判断目标且没死在不在攻击范围里，这里是在
                    if (distanceXY2 <= (tower.range*CELL_WIDTH * tower.range*CELL_WIDTH)) {
                        this.bullets.push(new Bullet(
                            tower.x,
                            tower.y,
                            this.enemies[tower.targe_index].x,
                            this.enemies[tower.targe_index].y,
                            // type,enemy_index
                            tower.type,
                            tower.targe_index
                        ));
                        // 发射子弹了，清除定时器，攻击间隔之后重新启动定时器
                        clearInterval(tower.check_attack_interval);
                        setTimeout(() => {
                            tower.check_attack_interval = setInterval(() => {
                                this.tower_attack(tower);
                            },30)
                        }, tower.attack_interval); 
                    }
                    // 目标没死，不在攻击范围里，目标置为null，再次调用attack
                    else{
                        tower.targe_index = null;
                        this.tower_attack(tower);
                    }
                }
                // 目标已经死了，目标置为null，再次调用attack
                else if(this.enemies[tower.targe_index]==null){
                    tower.targe_index = null;
                    this.tower_attack(tower);
                }
            }
        }
        // type=456 即右边的塔
        else if(parseInt((parseInt(tower.type)-1)/3)==1){
            let least_hp = 10000;
            let least_hp_enemy = undefined;
            // 遍历数组，得到攻击范围里血最少的怪
            for (let ene in this.enemies) {
                if(this.enemies[ene]!=null){
                    // 判断怪在不在攻击范围里
                    let distanceX = tower.x - this.enemies[ene].x;
                    let distanceY = tower.y - this.enemies[ene].y;
                    let distanceXY2 = distanceX*distanceX + distanceY*distanceY;
                    if (distanceXY2 <= (tower.range*CELL_WIDTH * tower.range*CELL_WIDTH)) {
                        if(this.enemies[ene].hp < least_hp){
                            least_hp = this.enemies[ene].hp;
                            least_hp_enemy = ene;
                        }
                    }  
                }
            }
            // 如果攻击范围里存在血最少的怪
            if(least_hp_enemy != null){
                this.bullets.push(new Bullet(
                    tower.x,
                    tower.y,
                    this.enemies[least_hp_enemy].x,
                    this.enemies[least_hp_enemy].y,
                    tower.type,
                    least_hp_enemy
                ));
                // 发射子弹了，清除定时器，攻击间隔之后重新启动定时器
                clearInterval(tower.check_attack_interval);
                setTimeout(() => {
                    tower.check_attack_interval = setInterval(() => {
                        this.tower_attack(tower);
                    },30)
                }, tower.attack_interval); 
            } 
        }
        else{}
    }


    money_not_enough(){
        $("#moneylack").show(300).delay(1000).hide(200);
        // alert("money is not enough");
    }

    judge_game() {
        //监听怪的数量到了100只
        if (this.enemyNumber >= 100) {
            
            this.stopGame();
            // alert("lose");
            // 跳转到结算页面
            this.to_total_lose();
            // //websocket发送失败信息
            this.websocketSend({type:4,roomCount:roomCount,name:linkName})
            // // 关闭websocket连接
            // this.close()
            this.websocketClose()

        }
        //监听时间小于100秒，并且怪的数量小于100只
        if (this.enemyExisted < 100 && this.leftTime <= 0) {
            this.stopGame();
            // 发送自己的小兵剩余信息给对方
            console.log("finalnum"+finalEnmyNum)
            console.log("send final msg to other before")
            this.websocketSend({type:5,roomCount:roomCount,name:linkName,otherEneNum:this.enemyNumber})
            console.log("send final msg to other after")
            // alert("win");
             // 跳转到结算页面
            // this.to_total_win();
            // this.websocketClose()
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
        this.towers.splice(0,this.towers.length)
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
                if(parseInt(parseInt(this.bullets[bullet].type-1)/3)==0){
                    for (let ene in this.enemies) {
                        if(this.enemies[ene]!=null){
                            // 触碰到敌人时 敌人血量减少
                            let distanceX = this.bullets[bullet].x - this.enemies[ene].x;
                            let distanceY = this.bullets[bullet].y - this.enemies[ene].y;
                            if ((distanceX*distanceX+distanceY*distanceY)<=
                                ((this.bullets[bullet].size+CELL_WIDTH)*(this.bullets[bullet].size+CELL_WIDTH))) {
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
                                    this.killed_enemies++;
                                    this.nowenemys--;
                                    this.enemies.splice(ene, 1, null);
                                    this.enemyExisted--;
                                    this.enemyNumber--
                                    this.shaEnemy++
                                    this.websocketSend({type:1,roomCount:roomCount,name:linkName,killNum:1,
                                        otherHistoryWin:historyWin,otherShaEnemy:this.shaEnemy,otherEneNum:this.enemyNumber,otherSocre:score,onlineNum:0})
                                    // this.createEnemy(0);
                                    // this.createEnemy(0);
                                }
                                break;
                            }
                        }
                    }
                }
                else if(parseInt(parseInt(this.bullets[bullet].type-1)/3)==1){
                    let target_ene= this.bullets[bullet].target_index;
                    if(this.enemies[target_ene]!=null){
                        // 触碰到敌人时 敌人血量减少
                        let distanceX = this.bullets[bullet].x - this.enemies[target_ene].x;
                        let distanceY = this.bullets[bullet].y - this.enemies[target_ene].y;
                        if ((distanceX*distanceX+distanceY*distanceY)<=
                            ((this.bullets[bullet].size+CELL_WIDTH)*(this.bullets[bullet].size+CELL_WIDTH))) {
                            this.enemies[target_ene].take_damage(this.bullets[bullet].type,this.bullets[bullet].damage);
                            this.bullets[bullet].dead();
                            this.bullets[bullet] = null;
                            this.bullets.splice(bullet, 1);
                            if (this.enemies[target_ene].hp <= 0) {
                                this.player.money += this.enemies[target_ene].money; //-----------------------------------------------------------------戴
                                this.enemies[target_ene].dead();
                                this.killed_enemies++;
                                this.nowenemys--;
                                this.enemies.splice(target_ene, 1, null);
                                this.enemyExisted--;
                                this.enemyNumber--
                                this.shaEnemy++
                                this.websocketSend({type:1,roomCount:roomCount,name:linkName,killNum:1,
                                    otherHistoryWin:historyWin,otherShaEnemy:this.shaEnemy,otherEneNum:this.enemyNumber,otherSocre:score,onlineNum:0})
                            }
                        }
                    }
                }
                else{}
            }
        }
    }

    //升级塔
    Tower_up(type,x,y){
        if(type%3!=0){
            for (let tower in this.towers) {
                if (this.towers[tower].x == (x-1)*CELL_WIDTH && this.towers[tower].y == (y-1)*CELL_WIDTH) {
                    if (TowerType[type][4] <= this.player.money) {                         
                        this.towers[tower].type +=1;
                        this.player.money -= TowerType[type][4];
                        this.tower_message[y-1][x-1] +=1;
                        this.towers[tower].range = TowerType[type-1][1];
                        this.towers[tower].cost = TowerType[type-1][4];
                        this.towers[tower].sale = TowerType[type-1][5];
                        this.drawTower(x,y)
                    }
                    else {
                        this.money_not_enough();
                    }
                }
            }
        }
   
    }


    //拆除塔
    Tower_down(type,x,y) {
        for (let tower in this.towers) {
            if (this.towers[tower]!=null&&(this.towers[tower].x == (x-1)*CELL_WIDTH && this.towers[tower].y == (y-1)*CELL_WIDTH)) {
                this.player.money += TowerType[type-1][5];
                clearInterval(this.towers[tower].check_attack_interval);
                this.towers.splice(tower, 1, null);
                this.tower_message[y-1][x-1] = 1;
                let cv = document.querySelector('#canvasMap_tower');
                let ctx = cv.getContext('2d');
                ctx.clearRect((x-1)*CELL_WIDTH,(y-1)*CELL_WIDTH,CELL_WIDTH,CELL_WIDTH);
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
            img.src = this.enemies[ene].enemy_img;
            ctx.drawImage(img, this.enemies[ene].x, this.enemies[ene].y, this.enemies[ene].size, this.enemies[ene].size);
            Ca.drawBlood(ctx, this.enemies[ene]);
        }
    
    }

    drawTowers(){
        for(let x in this.tower_message){
            for(let y in this.tower_message[x]){
                if(this.tower_message[x][y] > 1){
                    // 传入坐标原点为1，1
                    this.drawTower(parseInt(y)+1,parseInt(x)+1);
                }
            }
        }
    }

    //绘制塔
    drawTower(option_x,option_y) {
        let cv = document.querySelector('#canvasMap_tower');
        let ctx = cv.getContext('2d');
        let img_tower = new Image()
        ctx.clearRect((option_x-1)*CELL_WIDTH,(option_y-1)*CELL_WIDTH,CELL_WIDTH,CELL_WIDTH);
        img_tower.src = TowerType[this.tower_message[option_y-1][option_x-1]-1-1][3];
        ctx.drawImage(img_tower, (option_x-1) * CELL_WIDTH, (option_y-1) * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
    }



    //绘制选项
    drawOptions(){
        let cv = document.querySelector('#canvasMap_option');
        let ctx = cv.getContext('2d');
        let img_xx = new Image();
        let img_up = new Image();
        let num = this.tower_message[this.option_y-1][this.option_x-1];
        // 先判断这次单机的位置是不是能建塔的地方
        // 如果是，先判断是不是上次生成选项的位置，如果是，执行选项，否则生成选项
        // 如果不是建塔的地方，判断是不是上次生成选项的地方

        // 在建塔的地方
        if(num!=0){
            console.log("on tower home");
            // 判断这次在不在上次点击的选项上
            if((this.option_x==this.last_option_x-1&&this.option_y==this.last_option_y-1)
            ||(this.option_x==this.last_option_x+1&&this.option_y==this.last_option_y-1)){
                console.log("on aaaa last option");
                // 建造的地方以上一次点击的位置为准
                let last_num = this.tower_message[this.last_option_y-1][this.last_option_x-1];
                console.log("last_num:"+this.tower_message[this.last_option_y-1][this.last_option_x-1]);
                // 在，切num=1，没有塔，建塔
                // console.log("last_num:"+last_num);

                if (last_num==1){
                    if(this.option_x==this.last_option_x-1&&this.option_y==this.last_option_y-1){
                        this.createTower(this.last_option_x,this.last_option_y,1);
                    }else{
                        this.createTower(this.last_option_x,this.last_option_y,4);
                    }
                    console.log("create tower done");
                    console.log(this.tower_message);
                    this.drawTower(this.last_option_x,this.last_option_y);
                }
                // num>1,升级和铲除
                else {
                    console.log("else");
                    if(this.option_x==this.last_option_x-1&&this.option_y==this.last_option_y-1){
                        this.Tower_up(last_num-1,this.last_option_x,this.last_option_y);
                        console.log("towerup done");
                    }else{
                        this.Tower_down(last_num-1,this.last_option_x,this.last_option_y);
                        console.log("tower_down done");
                    }
                }
                ctx.clearRect(0,0,MAP_WIDTH,MAP_HEIGHT);
                console.log("clear optioin");
            }
            // 不在上一次生成的选项上
            else{
                console.log("not on last option");
                ctx.clearRect(0,0,MAP_WIDTH,MAP_HEIGHT);
                if(num==1){
                    img_up.src = "img/tower/tower1-1.png";
                    img_xx.src = "img/tower/tower2-1.png";
                    ctx.drawImage(img_up,(this.option_x-1-1)*CELL_WIDTH,(this.option_y-1-1)*CELL_WIDTH,CELL_WIDTH,CELL_WIDTH);
                    ctx.drawImage(img_xx,(this.option_x+1-1)*CELL_WIDTH,(this.option_y-1-1)*CELL_WIDTH,CELL_WIDTH,CELL_WIDTH);
                }
                else{
                    img_up.src = "img/button/upgrade.png";
                    img_xx.src = "img/button/sholve.png";
                    ctx.drawImage(img_up,(this.option_x-1-1)*CELL_WIDTH,(this.option_y-1-1)*CELL_WIDTH,CELL_WIDTH,CELL_WIDTH);
                    ctx.drawImage(img_xx,(this.option_x+1-1)*CELL_WIDTH,(this.option_y-1-1)*CELL_WIDTH,CELL_WIDTH,CELL_WIDTH);
                }
            }
        }
        // 不在建塔的地方
        else{
            console.log("not on tower home");
            if((this.option_x==this.last_option_x-1&&this.option_y==this.last_option_y-1)
            ||(this.option_x==this.last_option_x+1&&this.option_y==this.last_option_y-1)){
                console.log("on last option");
                // 建造的地方以上一次点击的位置为准
                let last_num = this.tower_message[this.last_option_y-1][this.last_option_x-1];
                // 在，切num=1，没有塔，建塔
                if (last_num==1){
                    if(this.option_x==this.last_option_x-1&&this.option_y==this.last_option_y-1){
                        this.createTower(this.last_option_x,this.last_option_y,1);
                    }else{
                        this.createTower(this.last_option_x,this.last_option_y,4);
                    }
                    console.log("create tower done");
                    console.log(this.tower_message);
                    this.drawTower(this.last_option_x,this.last_option_y);
                }
                // num>1,升级和铲除
                else {
                    if(this.option_x==this.last_option_x-1&&this.option_y==this.last_option_y-1){
                        this.Tower_up(last_num-1,this.last_option_x,this.last_option_y);
                    }else{
                        this.Tower_down(last_num-1,this.last_option_x,this.last_option_y);
                    }
                }
            }
            ctx.clearRect(0,0,MAP_WIDTH,MAP_HEIGHT);
            console.log("clear optioin");
        }
        this.last_option_x = this.option_x;
        this.last_option_y = this.option_y;
    }
    



        //绘制子弹
        drawBullet() {
            //获取子弹画布
            let cv = document.querySelector('#canvasMap_bullet');
            let ctx = cv.getContext('2d');
            //清空原子弹画布
            ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
            for (let bullet in this.bullets) {
                //获取子弹图片
                let img = new Image;
                img.src = this.bullets[bullet].color;
                //获取子弹的坐标
                let x=this.bullets[bullet].x;
                let y=this.bullets[bullet].y;
                //将画布原点（0,0）移动到绘制出子弹的坐标点
                // ctx.translate(x, y);
                //旋转画布，效果是子弹对着敌人的方向直线移动
                // ctx.rotate(this.bullets[bullet].direction[2]);//direction[2]是子弹类中的旋转角度
                ctx.drawImage(img, x,y,20,20);//待修改，根据不同种类的塔发出的子弹类型规定放置子弹图像的位置及子弹图片大小
                // this.bullets[bullet].x++;
                // this.bullets[bullet].y++;

            }
        }




    //聊天
    chat(){
            var player1 = this.player;
            var Words = document.getElementById("words");
            var TalkWords = document.getElementById("talkwords");
            var TalkSub = document.getElementById("talksub");
            let sendSign = 0
            let str = "";
            TalkSub.onclick = function(){
                //定义空字符串
                let str = "";
                if(TalkWords.value == ""){
                    // 消息为空时弹窗
                    // alert("消息不能为空");
                    return;
                }
                //作弊
                if(TalkWords.value=="show me the money"){
                    player1.money += 10000;
                    TalkWords.value="";
                    return;
                }
                str = '<div class="btalk"><span>' + TalkWords.value +'</span></div>' ;
                sendSign = 1
                Words.innerHTML = Words.innerHTML + str;
            }
            document.onkeydown = function(event) {
                let e = event || window.event;
                if (e && e.keyCode == 13&&TalkWords.value!="") { 
                    let str = "";
                    if(TalkWords.value=="show me the money"){
                        player1.money += 10000;
                        TalkWords.value="";
                        return;
                    }
                    str = '<div class="btalk"><span>' + TalkWords.value +'</span></div>' ;
                    setInterval(()=>{
                        if(sendSign == 1){
                            str = '<div class="atalk"><span>' + TalkWords.value +'</span></div>';
                            //websocket发送信息
                            this.websocketSend({type:3,roomCount:roomCount,name:linkName,msg:TalkWords.value,onlineNum:0})
                            Words.innerHTML = Words.innerHTML + str;
                            TalkWords.value="";
                            sendSign = 0
                        }
                    
                },80)
                str = '<div class="btalk"><span>' + TalkWords.value +'</span></div>' ;
                //websocket发送信息
                Words.innerHTML = Words.innerHTML + str;
                 sendSign = 1
            }
        }
            setInterval(()=>{
                if(sendSign == 1){
                     str =  TalkWords.value ;
                    //websocket发送信息
                    this.websocketSend({type:3,roomCount:roomCount,name:linkName,msg:TalkWords.value,
                        otherHistoryWin:historyWin,otherShaEnemy:this.shaEnemy,otherEneNum:this.enemyNumber,otherSocre:score,onlineNum:0})
                    TalkWords.value="";
                    sendSign = 0
                }
                
            },80)
        }

    clearCanvas(){
        let cv = document.querySelector('#canvasMap_tower');
        let ctx = cv.getContext('2d');
        ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
        let cv1 = document.querySelector('#canvasMap_bullet');
        let ctx1 = cv1.getContext('2d');
        ctx1.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
    }
    
    writeGameInfo(name) {
        console.log('进入了writeGameInfo的form表单方法！')
        var form1 = document.createElement("form");
        form1.id = "form1";
        form1.name = "form1";
    
        // 添加到 body 中
        document.body.appendChild(form1);
    
        // 创建一个输入
        var input = document.createElement("input");
        // 设置相应参数
        input.type = "text";
        input.name = "userName";
        input.value = name;
    
        // 将该输入框插入到 form 中
        form1.appendChild(input);
    
        // form 的提交方式
        form1.method = "POST";
        // form 提交路径
        form1.action = "/writeGameInfo";
        // 对该 form 执行提交
        form1.submit();
        console.log('表单提交了')
        // 删除该 form
        document.body.removeChild(form1);
    }

    writeGameTotalInfo(name) {
        console.log('进入了writeGameInfo的form表单方法！')
        var form1 = document.createElement("form");
        form1.id = "form1";
        form1.name = "form1";
    
        // 添加到 body 中
        document.body.appendChild(form1);
    
        // 创建一个输入
        var input = document.createElement("input");
        // 设置相应参数
        input.type = "text";
        input.name = "userName";
        input.value = name;
    
        // 将该输入框插入到 form 中
        form1.appendChild(input);
    
        // form 的提交方式
        form1.method = "POST";
        // form 提交路径
        form1.action = "/writeGameTotalInfo";
        // 对该 form 执行提交
        form1.submit();
        console.log('表单提交了')
        // 删除该 form
        document.body.removeChild(form1);
    }
}
//export default God
