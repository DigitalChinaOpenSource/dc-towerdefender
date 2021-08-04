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
            $("#rule").hide();
            $("#startgame_btn").hide();
            $("#logout_btn").hide();
            $("#home_visi").hide();
            $("#block_skill").show();
            $("#block1_box").show();
            $("#block_left").show();
            $("#block_right").show();
            $("#skill-btns-container").show();

             //隐藏游戏页面，显示匹配页面，修改start******************
            this.showTime();
            $(".block").hide();
            $(".match").show();
            $(".total").hide();
            // 修改end******************

            // //绑定连接事件
            this.websocketLink();
            //监听开始游戏标识
            this.startGameAAAA = setInterval(()=>{
                if(startGameSign == 1){
                    this.websocketSend({type:1,roomCount:roomCount,name:linkName,
                        otherHistoryWin:historyWin,otherShaEnemy:this.shaEnemy,otherEneNum:this.enemyNumber,otherSocre:score})
                    this.startGame()
                }
                startGameSign = 0
            },100)
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
    showTime() {
        let count=6;        
        let time=setInterval(function () {
            count -= 1;
            if(count==3){
                $("#match_before").hide();
                $("#match_after").show();
            }
            if (count == 0) {
                clearInterval(time);    
                $(".match").hide();
                $(".block").show();
            }else{    
                // console.log("*****"+count);
                document.getElementById('match_time').innerHTML = count;
            } 
            
        }, 1000);
    }
    // 匹配倒计时，共6秒，3秒时切换敌方图片，0秒时进入游戏界面end

    // 跳转到成功时的结算页面
    to_total_win(){
        $(".block").hide();
        $(".match").hide();
        $(".total").show();
        document.getElementById('total_name').innerHTML = "bk";
        $("#total_continue").on("click", () => {
            this.to_match();
        });
    }

    // 跳转到失败时的结算页面
    to_total_lose(){
        $("#total_win").hide();
        $("#total_lose").show();
        $(".block").hide();
        $(".match").hide();
        $(".total").show();
        $("#total_continue").on("click", () => {
            this.to_match();
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

    websocketLink(){
        console.log(ip)
        ws = new WebSocket(ip)
        ws.onopen = function(){
            console.log('success liked the server')
            let indexScore = document.getElementById('indexScore')
            let indexName = document.getElementById('indexName')
            let indexHistoryWin = document.getElementById('indexHistoryWin')
            let indexScoreValue = indexScore.innerHTML.trim()
            let indexNameValue = indexName.innerHTML.trim()
            historyWin = indexHistoryWin.innerHTML.trim()
            linkName = indexNameValue
            score = indexScoreValue
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


                        console.log('otherSha:'+otherShaEnemy)
                        console.log('otherhistorywin:'+otherHistoryWin)
                        console.log('otherEneNum:'+otherEneNum)
                        console.log('otherScore:'+otherSocre)
                        console.log('otherName:'+otherName)

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
                    }else if(recv.type == 3){
                        //显示聊天msg

                         var Words = document.getElementById('words')
                        var m=recv.msg;
                        // alert(m);
                        // alert(Words);
                        var str = '<div class="atalk"><span>' + m +'</span></div>';
                        Words.innerHTML = Words.innerHTML + str;
                        // alert(str);
                        // wordsRecv.innerHTML = wordsRecv.innerHTML + str
                        // console.log(recv.msg)
                        console.log(m)
                        otherShaEnemy = recv.otherShaEnemy
                        otherHistoryWin = recv.otherHistoryWin
                        otherEneNum = recv.otherEneNum
                        otherSocre = recv.otherSocre
                        otherName = recv.name
                    }else if(recv.type == 4){
                        //调用获胜方法赢了
                        // alert('you win')
                        //调用断开连接方法
                        winSign = 1
                        ws.close()
                    }else if(recv.type == 5){
                        //时间到，对比小兵enemy数量，判断输赢
                        ////调用断开连接方法
                        if(recv.enemy<enemyExisted){
                            // alert("you losed")
                            winSign =0
                        }else{
                            // alert('you win')
                            winSign = 1
                        }
                        ws.close()
                    }else if(recv.type == 6){
                        otherShaEnemy = recv.otherShaEnemy
                        otherHistoryWin = recv.otherHistoryWin
                        otherEneNum = recv.otherEneNum
                        otherSocre = recv.otherSocre
                        otherName = recv.name
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

    


    _init() {
        //初始化（1先定义一个可以安置的塔的种类的数组.2创建一个玩家对象。3画出四层画布。4创建一个json形式的敌人数组，根据LEVEL数组被赋值,赋值为另一个数组（敌人的 类型，数量enemyType: EnemyType.DesertMob, num: 10）
        // 5 定义两个变量：地图上敌人数量，需要消灭的敌人数量）
        this.player = new Player();
        this.needStop = 1; //生成子弹和敌人标签，1表示停止生成
        this.enemy_level = 0; // 怪物等级
        this.boss = 0; // 是否是boss：0=小怪，1=boss
        this.leftTime = 60000;//剩余时间,单位秒
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
                            this.enemies.splice(ene2, 1, null);
                            this.enemyExisted--;
                            kill_enemy_num_of_this_click++
                            this.enemyNumber--
                            this.shaEnemy++
                            console.log('现在杀死一个还剩'+this.enemyNumber)
                            // this.createEnemy(0);
                            // this.createEnemy(0);
                        }
                    }
                    // for(var q=0;q<kill_enemy_num_of_this_click;q++){
                    //     this.createEnemy(0)
                    //     this.createEnemy(0)
                    // }
                    this.websocketSend({type:1,roomCount:roomCount,name:linkName,killNum:kill_enemy_num_of_this_click,
                        otherHistoryWin:historyWin,otherShaEnemy:this.shaEnemy,otherEneNum:this.enemyNumber,otherSocre:score})
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
            // console.log(this.enemies);
            console.log("现有金币数量:" + this.player.money);
            console.log("技能需要金币数量:" + increase_enemy_level_money);
            console.log("小怪的数量为" + this.enemies.length);
            if (this.enemies.length > 0) {
                if (increase_enemy_level_money <= this.player.money) {
                    // this.enemy_level++;
                    this.websocketSend({type:2,roomCount:roomCount,name:linkName,action:0,
                        otherHistoryWin:historyWin,otherShaEnemy:this.shaEnemy,otherEneNum:this.enemyNumber,otherSocre:score})
                    console.log("当前小怪等级：" + this.enemy_level);
                    this.player.money = this.player.money - increase_enemy_level_money;
                    console.log("使用增强对方的小怪等级技能后，金币还剩:" + this.player.money);
                } else {
                    this.money_not_enough();
                    // $("#moneylack").show(300).delay(1000).hide(200);
                    // alert("给对方小怪升级金币数量不够");
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
                this.createEnemy(1);
                this.player.money = this.player.money - add_boss_money;
                // websocket发送增强信息
                this.websocketSend({type:2,roomCount:roomCount,name:linkName, action:1,
                    otherHistoryWin:historyWin,otherShaEnemy:this.shaEnemy,otherEneNum:this.enemyNumber,otherSocre:score})
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
            $("#lifeshow").html(this.enemyNumber - otherEneNum);
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
        }, 40);

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
                this.to_total_lose()
                winSign = -1
            }
            if(winSign == 1){
                this.to_total_win()
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
        }, 60);


        this.recvOtherMsg = setInterval(() => {
            this.websocketSend({type:6,roomCount:roomCount,name:linkName,killNum:1,
                otherHistoryWin:historyWin,otherShaEnemy:this.shaEnemy,otherEneNum:this.enemyNumber,otherSocre:score})
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
        clearInterval(this.drawEnemy);
        clearInterval(this.other);
        clearInterval(this.draw_towers);
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
            console.log(tower);
            this.towers.push(tower);
            this.tower_message[y-1][x-1] = (type+1);
            this.player.money -= tower.cost;
            this.towersNumber ++ ;
            tower.check_attack_interval = setInterval(() => {
                this.tower_attack(tower);
            },30);
            console.log("in create tower: x:"+tower.x+" y:"+tower.y);
        }
    }

    tower_attack(tower){
        // 先判断是哪种塔
        // 判断是type为123，即左边的塔
        if((tower.type-1)%3==0){
            // 判断这个塔有没有目标，这里是没有目标
            if(tower.targe_index == null){
                let min_distance2 = 20000;
                let nearest_enemy = undefined;
                // 遍历，拿到整个怪数组里离自己最近的
                for (let ene in this.enemies) {
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
                // 如果有里自己最近且在攻击范围内的怪，发射子弹
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
                    // 把塔怪赋给塔的目标
                    tower.targe_index = nearest_enemy;
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
                            this.enemies[nearest_enemy].x,
                            this.enemies[nearest_enemy].y,
                            // type,enemy_index
                            tower.type,
                            nearest_enemy
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
                else{
                    tower.targe_index = null;
                    this.tower_attack(tower);
                }
            }
        }
        // type=456 即右边的塔
        else if((tower.type-1)%3==1){
            // 遍历数组，得到攻击范围里血最少的怪
            for (let ene in this.enemies) {
                let distanceX = tower.x - this.enemies[ene].x;
                let distanceY = tower.y - this.enemies[ene].y;
                let distanceXY2 = distanceX*distanceX + distanceY*distanceY;
                let least_hp_enemy = undefined;
                let least_hp = 10000;
                // 判断怪在不在攻击范围里
                if (distanceXY2 <= (tower.range*CELL_WIDTH * tower.range*CELL_WIDTH)) {
                    if(this.enemies[ene].hp < least_hp){
                        least_hp = this.enemies[ene].hp;
                        least_hp_enemy = ene;
                    }
                }  
                // 如果攻击范围里存在血最少的怪
                if(least_hp_enemy != null){
                    this.bullets.push(new Bullet(
                        tower.x,
                        tower.y,
                        this.enemies[least_hp_enemy].x,
                        this.enemies[least_hp_enemy].y,
                        // type,enemy_index
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
            // alert("lose");
            // 跳转到结算页面
            this.to_total_lose();
            // //websocket发送失败信息
            // this.send({type:4,roomCount:this.roomCount,name:this.name})
            // // 关闭websocket连接
            // this.close()

        }
        //监听时间小于100秒，并且怪的数量小于100只
        if (this.enemyExisted < 100 && this.leftTime <= 0) {
            this.stopGame();
            // 发送自己的小兵剩余信息给对方
            this.websocketSend({type:5,roomCount:roomCount,name:linkName,otherEneNum:this.enemyNumber})
            // alert("win");
             // 跳转到结算页面
            this.to_total_win();
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
                    console.log(distanceX);
                    console.log(distanceY);
                    if ((distanceX*distanceX+distanceY*distanceY)<=
                        ((this.bullets[bullet].size+CELL_WIDTH)*(this.bullets[bullet].size+CELL_WIDTH))) {
                        // 调用敌人扣血，传入子弹类型与子弹伤害：
                        // 子弹类型：this.bullets[bullet].type
                        // 子弹伤害：this.bullets[bullet].atk
                        console.log('1打中敌人！');
                        console.log(distanceX);
                        console.log(distanceY);
                        
                        console.log(this.bullets.length);
                        this.enemies[ene].take_damage(this.bullets[bullet].type,this.bullets[bullet].damage);
                        this.bullets[bullet].dead();
                        this.bullets[bullet] = null;
                        this.bullets.splice(bullet, 1);
                        console.log('2子弹已清除');
                        console.log(this.bullets.length);
                        // 生命为0的时候 敌人死去
                        if (this.enemies[ene].hp <= 0) {
                            this.player.money += this.enemies[ene].money; //-----------------------------------------------------------------戴
                            this.enemies[ene].dead();
                            // console.log("kill");
                            this.killed_enemies++;
                            this.nowenemys--;
                            // this.enemies[ene] = null;
                            this.enemies.splice(ene, 1, null);
                            this.enemyExisted--;
                            this.enemyNumber--
                            this.shaEnemy++
                            this.websocketSend({type:1,roomCount:roomCount,name:linkName,killNum:1,
                                otherHistoryWin:historyWin,otherShaEnemy:this.shaEnemy,otherEneNum:this.enemyNumber,otherSocre:score})
                            // this.createEnemy(0);
                            // this.createEnemy(0);
                        }
                        break;
                    }
                }
            }
        }
    }

    //升级塔
    Tower_up(type,x,y){
        if(type%3!=0){
            for (let tower in this.towers) {
                // console.log("tower的位置：x:"+(this.towers[tower].x/CELL_WIDTH)+"y:"+(this.towers[tower].y/CELL_WIDTH));
                // console.log("点击位置：x:"+(x-1)+"y:"+(y-1));
                if (this.towers[tower].x == (x-1)*CELL_WIDTH && this.towers[tower].y == (y-1)*CELL_WIDTH) {
                    if (TowerType[type][4] <= this.player.money) {                         
                        this.towers[tower].type = TowerType[type][0];
                        this.player.money -= TowerType[type][4];
                        this.tower_message[y-1][x-1] = type+2;
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
            if (this.towers[tower].x == (x-1)*CELL_WIDTH && this.towers[tower].y == (y-1)*CELL_WIDTH) {
                this.player.money += TowerType[type-1][5];
                this.towers.splice(tower, 1, null);
                this.tower_message[y-1][x-1] = 1;
                let cv = document.querySelector('#canvasMap_tower');
                let ctx = cv.getContext('2d');
                ctx.clearRect((x-1)*CELL_WIDTH,(y-1)*CELL_WIDTH,CELL_WIDTH,CELL_WIDTH);
            }
        }
    }  

    ////检查塔的状态并生成子弹
    checkAndCreateBullets() {
        if (this.towersNumber <= 0) { //如果场上没有塔，则不生成子弹
            return false;
        }
        for (let tower in this.towers) {
            for (let ene in this.enemies) {
                let distanceX = this.towers[tower].x - this.enemies[ene].x; //计算塔到敌人的X坐标距离
                let distanceY = this.towers[tower].y - this.enemies[ene].y; //计算塔到敌人的Y坐标距离
                if (Math.abs(distanceX) <= this.towers[tower].range * CELL_WIDTH && Math.abs(distanceY) <= this.towers[tower].range * CELL_WIDTH) { //判断怪物是否在塔的范围内
                        this.bullets.push(new Bullet(
                        this.towers[tower].x,
                        this.towers[tower].y,
                        this.enemies[ene].x,
                        this.enemies[ene].y,
                        this.towersNumber[tower].type,
                        ene
                    )); 
                    console.log('有子弹生成！');
                }       

                // //如果当前怪的血量小于等于1，那它一定会死，进行死亡相关结算
                // if (this.enemies[ene].hp <= 1) {
                //     this.player.money += this.enemies[ene].money;
                //     this.enemies[ene].dead();
                //     this.enemyNumber--;  
                //     this.enemies[ene] = null;
                //     this.enemies.splice(ene, 1); //从数组中删除已死的怪物
                //     this.enemyExisted--;
                // } 
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

    drawTowers(){
        for(y in this.tower_message){
            for(x in this.tower_message[0]){
                if(this.tower_message[y][x] > 1){
                    this.drawTower();
                }
            }
        }
    }

    //绘制塔
    drawTower(option_x,option_y) {
        console.log("x:"+option_x+" y:"+option_y)
        let cv = document.querySelector('#canvasMap_tower');
        let ctx = cv.getContext('2d');
        let img_tower = new Image()
        console.log('绘制塔:');
        console.log(this.tower_message);
        ctx.clearRect((option_x-1)*CELL_WIDTH,(option_y-1)*CELL_WIDTH,CELL_WIDTH,CELL_WIDTH);
        img_tower.src = TowerType[this.tower_message[option_y-1][option_x-1]-1-1][3];
        console.log(img_tower.src)
        ctx.drawImage(img_tower, (option_x-1) * CELL_WIDTH, (option_y-1) * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
    }



    //绘制选项
    drawOptions(){
        console.log("last: x:"+this.last_option_x+" y:"+this.last_option_y);
        console.log("this: x:"+this.option_x+" y:"+this.option_y);
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
            // console.log("last_num:"+this.tower_message[this.last_option_y-1][this.last_option_x-1]);
            // console.log("option_x:"+this.option_x+" option_y:"+this.option_y);
            // console.log("last_option_x:"+this.last_option_x+" last_option_y:"+this.last_option_y);
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
            // console.log(this.enemies[ene])
            // if(this.enemies[ene].hp<=0){
            // }
            if(this.enemies[ene] == null){
                continue
            }
            img.src = this.enemies[ene].enemy_img;
            ctx.drawImage(img,this.enemies[ene].x,this.enemies[ene].y, 60, 60);
            Ca.drawBlood(ctx, this.enemies[ene]);
            // console.log(this.enemies[ene].x)
            // console.log(this.enemies[ene].y)
        }
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
                img.src = "img/bullet/bullet1-1.png";
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
            // console.log(this.player)
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
                    alert("消息不能为空");
                    return;
                }
                //作弊
                if(TalkWords.value=="show me the money"){
                    player1.money += 10000;
                    // console.log(player1)
                    TalkWords.value="";
                    return;
                }

                //判断是谁发出的
                if(Who== 0){
                    str = '<div class="btalk"><span>' + TalkWords.value +'</span></div>' ;
                  
                // }
                // else{
                //     str = '<div class="atalk"><span>' + TalkWords.value +'</span></div>';
                // }
                // console.log('=========================================================')
                // str = '<div class="atalk"><span>' + TalkWords.value +'</span></div>';
                // //websocket发送信息
                // this.websocketSend({type:3,roomCount:roomCount,name:linkName,msg:TalkWords.value})
                // Words.innerHTML = Words.innerHTML + str;
                // TalkWords.value="";
                sendSign = 1

                    str = '<div class="btalk"><span>' + TalkWords.value +'</span></div>' ;
                  
              
                console.log('=========================================================')
                
                //websocket发送信息
                // this.websocketSend({type:3,roomCount:roomCount,name:linkName,msg:TalkWords.value})
                Words.innerHTML = Words.innerHTML + str;
                // TalkWords.value="";
                // str = '<div class="atalk"><span>' + TalkWords.value +'</span></div>';
                 sendSign = 1
                

            }
            document.onkeydown = function(event) {
               
                let e = event || window.event;
                
                if (e && e.keyCode == 13&&TalkWords.value!="") { 
        
                    let str = "";
                    if(TalkWords.value=="show me the money"){
                        player1.money += 10000;
                        // console.log(player1)
                        TalkWords.value="";
                        return;
                    }

                    //判断是谁发出的
                    if(Who== 0){
                        str = '<div class="btalk"><span>' + TalkWords.value +'</span></div>' ;
                      
                    }
                    else{
                        str = '<div class="atalk"><span>' + TalkWords.value +'</span></div>';
                    }
                setInterval(()=>{
                    if(sendSign == 1){
                        str = '<div class="atalk"><span>' + TalkWords.value +'</span></div>';
                        //websocket发送信息
                        this.websocketSend({type:3,roomCount:roomCount,name:linkName,msg:TalkWords.value})
                        Words.innerHTML = Words.innerHTML + str;
                        TalkWords.value="";
                        sendSign = 0
                    }
                    
                },80)


                str = '<div class="btalk"><span>' + TalkWords.value +'</span></div>' ;

                console.log('=========================================================')
               
                //websocket发送信息
                // this.websocketSend({type:3,roomCount:roomCount,name:linkName,msg:TalkWords.value})
                Words.innerHTML = Words.innerHTML + str;
                // str=TalkWords.value;
                // TalkWords.value="";
                // str = '<div class="atalk"><span>' + TalkWords.value +'</span></div>';
                 sendSign = 1
            

            }
        }
            setInterval(()=>{
                if(sendSign == 1){
                     str =  TalkWords.value ;
                    //websocket发送信息
                    this.websocketSend({type:3,roomCount:roomCount,name:linkName,msg:TalkWords.value,
                        otherHistoryWin:historyWin,otherShaEnemy:this.shaEnemy,otherEneNum:this.enemyNumber,otherSocre:score})
                    // Words.innerHTML = Words.innerHTML + str;
                    TalkWords.value="";
                    sendSign = 0
                }
                
            },80)
        }
    }
}
