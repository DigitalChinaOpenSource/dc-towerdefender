
class Game {
    constructor() {
        //建立一个可见性改变事件
        //离开当前页面时，会弹窗 并阻塞当前游戏


        $("#explain").show();
        $("#explainTwo").show();
        $("#menu").show();
        $("#nextScale").hide(); //最开始不显示下一波按钮
        $("#stop1").hide();
        this._init();//入口
        this.stopGame();
        document.addEventListener('visibilitychange', function () { //浏览器切换事件

            if (document.visibilityState == 'visible') { //状态判断

                alert("你刚刚离开了游戏,现在游戏继续");

            } else {

                // this.stopGame();
            }

        });
        //背景介绍动画轮播
        $("#startButton_fir").on("click",()=>{
            $("#start1").hide();
            $("#loading").show();
            var movie = document.getElementById("movie"); 
            if(movie.paused){ 
                    movie.play(); 
                }else{ 
                        movie.pause(); 
                } 
            $(function(){
                setTimeout(() => {
                    $("#startButton").show();
                    $("#skip").hide();
                }, 45000);
                })
            });                     
                //跳过按钮
        $("#skip").on("click", () => {
            $("#loading").hide();
            $("#container").show();
            $("#stop").show();
            this.continueGame();
            //显示第一关关卡背景
            $("#customs1").show();
            setInterval(() => {
                $("#customs1").hide();
            }, 4000);
            var movie = document.getElementById("movie"); 
            if(movie.paused){ 
                    movie.play(); 
                }else{ 
                        movie.pause(); 
                } 
       
            var music2 = document.getElementById("bgm2"); 
                if(music2.paused){ 
                    music2.play(); 
                    }else{ 
                        music2.pause(); 
                    }  
            $("#skip").hide();               
        }),
        
        //底部塔说明
        $("#tower1").mouseover(function(){
            $("#tower_text1").show();
            $("#tower1").mouseout(function(){
                $("#tower_text1").hide();
            });
        });
        $("#tower2").mouseover(function(){
            $("#tower_text2").show();
            $("#tower2").mouseout(function(){
                $("#tower_text2").hide();
            });
        });
        $("#tower3").mouseover(function(){
            $("#tower_text3").show();
            $("#tower3").mouseout(function(){
                $("#tower_text3").hide();
        });
        });
        $("#tower4").mouseover(function(){
            $("#tower_text4").show();
            $("#tower4").mouseout(function(){
                $("#tower_text4").hide();
            });
        });
        $("#tower5").mouseover(function(){
            $("#tower_text5").show();
            $("#tower5").mouseout(function(){
                $("#tower_text5").hide();
            });
        });
        
                //用户手册
        $("#game_exp").on("click", () => {
            $("#explain_1").show();   
            $("#explain_2").hide();
            $("#explain_3").hide();               
            }),
        $("#breast_exp").on("click", () => {
            $("#explain_2").show();   
            $("#explain_1").hide();
            $("#explain_3").hide(); 
            }),
        $("#tower_exp").on("click", () => {
            $("#explain_3").show();   
            $("#explain_2").hide();
            $("#explain_1").hide(); 
            });
        //设置位可拖拽
        $(function() {
            // $('#tower1').draggable();
            // $('#tower2').draggable();
            // $('#tower3').draggable();
            // $('#tower4').draggable();
            // $('#tower5').draggable();
            // $('#tower6').draggable();
            $('#explains').draggable();
        });
        //关闭通知
        $("#close_customs1").on("click", () => { 
            $("#customs1").hide();
            }),
        $("#close_customs2").on("click", () => { 
            $("#customs2").hide();
            }),
        $("#close_customs3").on("click", () => { 
            $("#customs3").hide();
            }),
        $("#close_customs4").on("click", () => { 
            $("#customs4").hide();
            });
        //游戏开始
        $("#startButton").on("click", () => {
            $("#loading").hide();
            $("#container").show();
            $("#stop").show();
            this.continueGame();
            //------------------------2021/3/18-----------------------------
            var music2 = document.getElementById("bgm2"); 
            if(music2.paused){ 
                music2.play(); 
                }else{ 
                    music2.pause(); 
                }  
        }),

            $("#restartButton,#restartButton1").on("click", () => {
                $("#end").hide();
                $("#stops").hide();
                $("#stop").show();
                $("#stop_no").hide();
                $("#nextScale").hide(); //隐藏下一波按钮
                clearInterval(this.createEnemies); //清除生成敌人的定时器（修复多次重玩 敌人重叠的BUG）
                clearInterval(this.createBullets); //清除生成子弹的定时器
                clearInterval(this.createfirstEnemies);
                this._init2();
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
          //  clearInterval(this.createfirstEnemies);
            this._init2();
            // this.nextGame();
        });
        $("#successButton").on("click", () => {
            $("#success").hide();
            $("#award").show();
        });

        //下一波敌人的触发事件
        $("#nextScale_btn").on("click", () => {
            $("#nextScale").hide();
            clearInterval(this.createfirstEnemies)
            clearInterval(this.createEnemies);
            //将当前波次敌人数量置为0
            this.missionEnemy = 0;
            //金币增加
            this.player.money += 100;

            // var enemyspeedup;
            // switch (LEVEL) {
            //     case 0: enemyspeedup == 0.2; break;
            //     case 1: enemyspeedup == 0.3; break;
            //     case 2: enemyspeedup == 0.4; break;
            //     case 3: enemyspeedup == 0.6; break;
            //     default: enemyspeedup == 0.2; break;
            // }

            //生成下一波敌人

            this.createEnemies = setInterval(() => {
                // console.log("nextenemy")
                if (this.flag == 0) {
                    this.createScale();
                }
            },  1500);

        });


        $("#close_explains").on("click", () => {
            $("#explains").hide();
        });
        $("#explains_button").on("click", () => {
            $("#explains").show();
        });
    }

    _init() {//初始化（1先定义一个可以安置的塔的种类的数组.2创建一个玩家对象。3画出四层画布。4创建一个json形式的敌人数组，根据LEVEL数组被赋值,赋值为另一个数组（敌人的 类型，数量enemyType: EnemyType.DesertMob, num: 10）
        // 5 定义两个变量：地图上敌人数量，需要消灭的敌人数量）
        this.towerAndBullets = (new TowerAndBulletFactory()).TowerAndBulletArr;//定义可以用的塔的类型数组变量，当调用这个对象的factory方法时，往数组里面赋值。
        //console.log(this.towerAndBullet[0]["range_Type"]);
        this.player = new Player();
        this.drawMap();//画出四层画布，背景，敌人，塔，子弹
        this.enemyData = JSON.parse(JSON.stringify((new EnemyFactory(LEVEL)).enemyPool)); //生成敌人,json形式的一个敌人数组
        //JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串

        this.nowenemys = 0; //现在地图上显示的还有多少敌人
        // setInterval(() => {
        //   // console.log(this.nowenemys);
        // }, 1000 );

        this.enemyNumber = 0; // 地图上敌人数量
        this.enemyExisted = this.enemyData.length; // 需要消灭的敌人数量
        all_ghost_num=this.enemyData.length;
        this.towersNumber = 0; // 地图上塔的数量
        this.optionsNumber = 0; // 地图上选项的数量---------------------------------------------------------------------------------------------------
        this.towers = [];//定义塔的空数组
        // console.log(this.towers);
        this.bullets = [];//定义子弹的空数组


        this.end_hp = 5; //保护点的血量
        this.missionEnemy = 0 //每一波敌人的数量
       // this.mission = 1 //敌人攻击波数
        this.options = []; //塔的选项数组------------------------------------------------------------

        //加载塔的图片----把塔的图片显示上去----------------------------------------------------------
        // var imgxx = new Image();//创建一个图片对象
        // /*.Image 对象
        //     Image 对象代表嵌入的图像。
        //      <img> 标签每出现一次，一个 Image 对象就会被创建。
        //     同理 , 创建一个Image对象，就会生成一个<img>标签
        //  */
        // imgxx.src = "img/tower1.png";//给这个图片对象传地址src
        // for (var i = 2; i < 7; i++) {//循环五次，给imgx 传图片地址
        //     var imgx = new Image();  //new了几次就会创建几个img对象
        //     imgx.src = "img/t" + i + ".png";
        // }

        // 监控 
        $("#canvasMap_option").on("click", (e) => {//jquery语法，在这个图层里面，就是坑位被点击后做的动作。e就是鼠标监听的坐标
            //在建塔的图层上
            var option_x = parseInt(e.offsetX / CELL_WIDTH); //鼠标监听，然后得到一个坐标。
            var option_y = parseInt(e.offsetY / CELL_WIDTH);
            this.xxx=option_x;
            this.yyy=option_y;
           // if (MAP_ARR[option_x][option_y] == 1)
           // {
                this.up_downTower(option_x, option_y);
                //}  //把这个坐标上面的塔给拆了，里面会就行判断，是否点了x,是否有塔。
           // else {
                this.chooseTower(option_x, option_y, e, this.towerAndBullets);
            //}//选择一个塔，然后
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
        this.startGame();
    }
    _init2() {
        console.log(LEVEL);
        this.towerAndBullets = (new TowerAndBulletFactory()).TowerAndBulletArr;
        this.player = new Player();
        this.drawMap();//画出四层画布，背景，敌人，塔，子弹
        this.enemyData = JSON.parse(JSON.stringify((new EnemyFactory(LEVEL)).enemyPool)); //生成敌人,json形式的一个敌人数组
        //JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串

        this.nowenemys = 0; //现在地图上显示的还有多少敌人
       
        this.enemyNumber = 0; // 地图上敌人数量
        this.enemyExisted = this.enemyData.length; // 需要消灭的敌人数量
        all_ghost_num=this.enemyData.length;
        this.towersNumber = 0; // 地图上塔的数量
        this.optionsNumber = 0; // 地图上选项的数量---------------------------------------------------------------------------------------------------
       // this.towers = [];//定义塔的空数组
        this.towers.splice(0,this.towers.length);  
        // console.log(this.towers);
        //this.bullets = [];//定义子弹的空数组
        this.bullets.splice(0,this.bullets.length);  

       
        this.missionEnemy = 0 //每一波敌人的数量
       // this.mission = 1 //敌人攻击波数
        //this.options = []; //塔的选项数组------------------------------------------------------------
        this.options.splice(0,this.options.length);
       

        // 监控 
        $("#canvasMap_option").on("click", (e) => {//jquery语法，在这个图层里面，就是坑位被点击后做的动作。e就是鼠标监听的坐标
            //在建塔的图层上
            var option_x = parseInt(e.offsetX / CELL_WIDTH); //鼠标监听，然后得到一个坐标。
            var option_y = parseInt(e.offsetY / CELL_WIDTH);
           // if(MAP_ARR[option_x][option_y] == 0)
            this.chooseTower(option_x, option_y, e, this.towerAndBullets);//选择一个塔，然后
          //  if(MAP_ARR[option_x][option_y] == 1)
            this.up_downTower(option_x, option_y);  //把这个坐标上面的塔给拆了，里面会就行判断，是否点了x,是否有塔。
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
        this.startGame2();
    }
    //一波一波的产生敌人的方法
    createScale() {
        switch (LEVEL) {
            case 0: {
                if (this.enemyExisted <= 0 || this.missionEnemy >= 15) {
                    if (this.nowenemys == 0) {
                        if(this.player.end_hp<=0){
                            this.stopGame();
                            $("#end").show();
                        }
                        else{
                            $("#nextScale").show();
                        }         
                    }

                    //清空定时器

                    //将本波次制造出来的敌人数清零
                    this.missionEnemy == 0;
                    //波次加一
                 //   this.mission++;
                    //5s以后重设定时器


                } else {
                    //直接生产敌人
                    this.createEnemy();

                }
                break;
            }
            case 1: {
                if (this.enemyExisted <= 0 || this.missionEnemy >= 18) {
                    if (this.nowenemys == 0) {
                        if(this.player.end_hp<=0){
                            this.stopGame();
                            $("#end").show();
                        }
                        else{
                            $("#nextScale").show();
                        }         
                    }

                    //清空定时器

                    //将本波次制造出来的敌人数清零
                    this.missionEnemy == 0;
                    //波次加一
                 //   this.mission++;
                    //5s以后重设定时器


                } else {
                    //直接生产敌人
                    this.createEnemy();

                }
                break;
            }
            case 2: {
                if (this.enemyExisted <= 0 || this.missionEnemy >= 25) {
                    if (this.nowenemys == 0) {
                        if(this.player.end_hp<=0){
                            this.stopGame();
                            $("#end").show();
                        }
                        else{
                            $("#nextScale").show();
                        }         
                    }

                    //清空定时器

                    //将本波次制造出来的敌人数清零
                    this.missionEnemy == 0;
                    //波次加一
                 //   this.mission++;
                    //5s以后重设定时器


                } else {
                    //直接生产敌人
                    this.createEnemy();

                }
                break;
            }
            case 3: {
                if (this.enemyExisted <= 0 || this.missionEnemy >= 30) {
                    if (this.nowenemys == 0) {
                        if(this.player.end_hp<=0){
                            this.stopGame();
                            $("#end").show();
                        }
                        else{
                            $("#nextScale").show();
                        }         
                    }

                    //清空定时器

                    //将本波次制造出来的敌人数清零
                    this.missionEnemy == 0;
                    //波次加一
                 //   this.mission++;
                    //5s以后重设定时器


                } else {
                    //直接生产敌人
                    this.createEnemy();

                }
                break;
            }
            default: {
                if (this.enemyExisted <= 0 || this.missionEnemy >= 10) {
                    if (this.nowenemys == 0) {
                        if(this.player.end_hp<=0){
                            this.stopGame();
                            $("#end").show();
                        }
                        else{
                            $("#nextScale").show();
                        }         
                    }

                    //清空定时器

                    //将本波次制造出来的敌人数清零
                    this.missionEnemy == 0;
                    //波次加一
                 //   this.mission++;
                    //5s以后重设定时器


                } else {
                    //直接生产敌人
                    this.createEnemy();

                }
                break;
            }
        }

    }

    // 开始游戏
    startGame() {
        this.xx = []; //生成叉号数组。
        this.xxx=0;
        this.yyy=0;
        this.up = []; //生成升级数组
        this.enemies = [];
        this.flag = 0; //生成子弹和敌人标签，1表示停止生成

        //在这里停5s,然后 继续生成怪
        // var hpcheck = setInterval(() => {
        //         this.flag=1;
        //         clearInterval(hpcheck);
           
        // },5000);
        // setTimeout(() => {
        //     this.flag==0
        // }, 5000);

      this.createfirstEnemies = setInterval(() => {
           // console.log("firstenemy")
            if (this.flag == 0) {
                this.createScale();
                }
        }, 1.8 * 100 * TIMEOUT); //控制出时间间隔
       

        //限制生产敌人,敌人不动，子弹不动
        $("#stop").on("click", () => {
            this.stopGame();
            $("#stops").show();
            $("#stop_no").show();
            $("#stop").hide();
        });

        //继续运动
        $("#continue").on("click", () => {
            this.continueGame();
            $("#stops").hide();
            $("#stop").show();
            $("#stop_no").hide();
        });
        //结束游戏
        // $("#movegame").on("click", () => {
        //     LEVEL = 0;
        //     $("#nextScale").hide();
        //     $("#stops").hide();
        //     $("#start").show();
        //     this._init2();
        //     this.stopGame();
        // });

        
        
    
        // 检查塔和敌人 并生成子弹
        this.createBullets = setInterval(() => {   
           // console.log(attack_speed);
            if (this.flag == 0) {
                this.checkAndCreateBullets();
             //   console.log(attack_speed);
            }
        }, 1400); //控制防御塔攻击速度

        // //随时监测tower列表中是否有金币塔，有则加金币
        // if(this.flag == 0){
        //     setInterval(()=>{
        //         // console.log(this.towers);
        //         for (var t in this.towers){
        //             console.log(this.towers[t].type);
        //             if (this.towers[t].type.type == 10) this.player.money += 10;
        //             if (this.towers[t].type.type == 11) this.player.money += 20;
        //             if (this.towers[t].type.type == 12) this.player.money += 30;
        //         }
        //     },1000)   
        // }
        //动态显示金币
       this.timemoney = setInterval(() => {
            $("#moneyshow").html(this.player.money);
        }, 100);
        //动态显示基地血量
        this.timehp = setInterval(() => {
            $("#lifeshow").html(this.player.end_hp);
        }, 100);
        //动态显示敌人数量
        this.timeenemies = setInterval(() => {
            $("#enemysshow").html(this.enemyExisted);
        },10);
        // 绘画背景
        this.drawBackgound();

        // 获取游戏状态
        setInterval(() => {
            this.gameState();
        }, 1);

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
    startGame2() {
      
        this.xx.splice(0,this.xx.length); 
        this.up.splice(0,this.up.length); 
       // this.enemies = [];
        this.enemies.splice(0,this.enemies.length); 
        this.flag = 0; //生成子弹和敌人标签，1表示停止生成

        //在这里停5s,然后 继续生成怪
        // var hpcheck = setInterval(() => {
        //         this.flag=1;
        //         clearInterval(hpcheck);
           
        // },5000);
        // setTimeout(() => {
        //     this.flag==0
        // }, 5000);

      this.createfirstEnemies = setInterval(() => {
            console.log("firstenemy2")
            if (this.flag == 0) {
                this.createScale();
                }
        }, 1.8 * 100 * TIMEOUT); //控制出时间间隔
       

        // 检查塔和敌人 并生成子弹
        this.createBullets = setInterval(() => {   
           console.log("newbullet2");
            if (this.flag == 0) {
                this.checkAndCreateBullets();
             //   console.log(attack_speed);
            }
        }, 1400); //控制防御塔攻击速度

        this.drawBackgound();
      
    }
    //继续游戏
    // nextGame() {
    //     this.enemyNumber = 0; // 地图上敌人数量
    //     this.createEnemies = setInterval(() => { //重新生成敌人
    //         if (this.flag == 0) {
    //             this.createScale();
    //         }

    //     }, (ENEMY_BASE_INTERVAL - ENEMY_UP_INTERVAL * LEVEL) * 100 * TIMEOUT); //控制生成敌人间隔
    // }

    // 生成敌人
    //根据enemyData生成
    createEnemy() {
        this.nowenemys++;
        var length = this.enemyData.length - 1;
        if (this.enemyNumber <= length) {
            var enemy = new Enemy(this.enemyData[this.enemyNumber][0], this.enemyData[this.enemyNumber][1], this.enemyData[this.enemyNumber][2], this.enemyData[this.enemyNumber][3], this.enemyData[this.enemyNumber][4], this.enemyData[this.enemyNumber][5], this.enemyData[this.enemyNumber][6]);
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
                    if(this.towers[tower].seed!=1)               
                        {
                            this.towers[tower].seed++;
                            this.bullets.push(new Bullet(
                            this.towers[tower].x,
                            this.towers[tower].y,
                            this.enemies[ene].x,
                            this.enemies[ene].y,
                            this.towers[tower].type.bullet_type.speed,    //创建塔的时候也确定了塔的子弹的属性
                            this.towers[tower].type.bullet_type.color,
                            this.towers[tower].type.bullet_type.size,
                            this.towers[tower].type.bullet_type.attack,
                            this.towers[tower].type.bullet_type.type,
                            this.towers[tower].type.bullet_type.run,
                            this.towers[tower].type.bullet_type.reduce,
                            this.towers[tower].type.bullet_type.blood,
                            this.towers[tower].type.bullet_type.second,
                        )); }
                        if(this.towers[tower].type.type!=16 && this.towers[tower].type.type!=17&&this.towers[tower].type.type!=18)
                        {break;}
                    else{ //群体  全部
                            // if(this.enemies[ene].enemy_img=="img/1.png"){
                            //         this.enemies[ene].enemy_img="img/3.png";
                            // }
                            this.enemies[ene].take_damage(this.towers[tower].type.bullet_type.type,this.towers[tower].type.bullet_type.attack);
                           
                        }

                }       
                // else if(this.towers[tower].type.bullet_type.type==0){
                //     if(this.enemies[ene].enemy_type==1){
                //         this.enemies[ene].enemy_img="img/1.png";
                //     }
                // } 
               
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
                            }   this.towers[tower].seed=0;
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

    //   敌人停止移动
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
            var origin = parseInt(this.towerAndBullets.length / 5); //第一个选项塔的位置
            var b = 0;
           //  console.log(this.options);
           // console.log(origin);
            for (var option in this.options) {
                for (var a = 0; a < this.towerAndBullets.length; a++) {
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
                        this.towers[tower].tower_img = "img/tower11.png";
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
                        this.towers[tower].tower_img = "img/tower12.png";
                        this.towers[tower].type = TowerType.three;
                    }
                }
                break;
            case 3:
                break;
            case 4:
                for (var tower in this.towers) {
                    if (this.towers[tower].x == this.x * CELL_WIDTH && this.towers[tower].y == this.y * CELL_WIDTH) {
                        this.towers[tower].tower_img = "img/t21.png";
                        this.towers[tower].type = TowerType.five;
                    }
                }
                break;
            case 5:
                for (var tower in this.towers) {
                    if (this.towers[tower].x == this.x * CELL_WIDTH && this.towers[tower].y == this.y * CELL_WIDTH) {
                        this.towers[tower].tower_img = "img/t22.png";
                        this.towers[tower].type = TowerType.six;
                    }
                }
                break;
            case 6:
                break;
            case 7:
                for (var tower in this.towers) {
                    if (this.towers[tower].x == this.x * CELL_WIDTH && this.towers[tower].y == this.y * CELL_WIDTH) {
                        this.towers[tower].tower_img = "img/t31.png";
                        this.towers[tower].type = TowerType.eight;
                    }
                }
                break;
            case 8:
                for (var tower in this.towers) {
                    if (this.towers[tower].x == this.x * CELL_WIDTH && this.towers[tower].y == this.y * CELL_WIDTH) {
                        this.towers[tower].tower_img = "img/t32.png";
                        this.towers[tower].type = TowerType.nine;
                    }
                }
                break;
            case 9:
                break;
            case 13:
                for (var tower in this.towers) {
                    if (this.towers[tower].x == this.x * CELL_WIDTH && this.towers[tower].y == this.y * CELL_WIDTH) {
                        this.towers[tower].tower_img = "img/t51.png";
                        this.towers[tower].type = TowerType.fourteen;
                    }
                }
                break;
            case 14:
                for (var tower in this.towers) {
                    if (this.towers[tower].x == this.x * CELL_WIDTH && this.towers[tower].y == this.y * CELL_WIDTH) {
                        this.towers[tower].tower_img = "img/t52.png";
                        this.towers[tower].type = TowerType.fifteen;
                    }
                }
                break;
            case 15:
                break
            case 16:
                for (var tower in this.towers) {
                    if (this.towers[tower].x == this.x * CELL_WIDTH && this.towers[tower].y == this.y * CELL_WIDTH) {
                        this.towers[tower].tower_img = "img/t61.png";
                        this.towers[tower].type = TowerType.seventeen;
                        // console.log(this.towers[tower].type)  ;
                        MAP_ARR[this.x - 1][this.y + 1] = 0;
                        this.drawTowerMap();
                        MAP_ARR[this.x - 1][this.y + 1] = 1;
                    }
                }
                break;
            case 17:
                for (var tower in this.towers) {
                    if (this.towers[tower].x == this.x * CELL_WIDTH && this.towers[tower].y == this.y * CELL_WIDTH) {
                        this.towers[tower].tower_img = "img/t62.png";
                        this.towers[tower].type = TowerType.eighteen;
                        MAP_ARR[this.x - 1][this.y + 1] = 0;
                        this.drawTowerMap();
                        MAP_ARR[this.x - 1][this.y + 1] = 1;
                    }
                }
                break;
            case 18:
                break;
            default: break;
        }
 
    }

    //需要引擎新建一个放置初始塔的数组towersPosition,记录塔的x,y,width,height等
    //towersposion数组，用来存放地图下方六种一级塔的属性。
    towersPosition = [
       
        { type: 1, range: 3, tower_img: "img/tower1.png", bullet_type: BulletType.one, cost: 100, sale: 80 },
        { type: 4, range: 4, tower_img: "img/t2.png", bullet_type: BulletType.four, cost: 200, sale: 120 },
        { type: 7, range: 3, tower_img: "img/t3.png", bullet_type: BulletType.seven, cost: 220, sale: 150 },
       // { type: 10, range: 0, tower_img: "img/t4.png", bullet_type: BulletType.null, cost: 200, sale: 120 },
        { type: 13, range: 3, tower_img: "img/t5.png", bullet_type: BulletType.ten, cost: 200, sale: 120 },
        { type: 16, range: 2, tower_img: "img/t6.png", bullet_type: BulletType.thirteen, cost: 200, sale: 120 }
    ]

    //拖拽图片，新画出塔的图片随着鼠标移动
    //函数使用于引擎监听到鼠标的点击事件之后w
    
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
          
        if (this.xx.length > 0) {
            for (var tower in this.towers) {
                if (this.towers[tower].x <= (option_x) * CELL_WIDTH&&this.towers[tower].x >= (option_x-1) * CELL_WIDTH && 
                this.towers[tower].y <= (option_y) * CELL_WIDTH&&this.towers[tower].y >= (option_y-1) * CELL_WIDTH){
                    this.towers[tower].sd=1;
                    console.log(this.towers[tower].sd);
                }
                if (this.towers[tower].x == (option_x - 1) * CELL_WIDTH && this.towers[tower].y == (option_y + 1) * CELL_WIDTH||(this.towers[tower].x <= (option_x) * CELL_WIDTH&&this.towers[tower].x >= (option_x-1) * CELL_WIDTH && 
                this.towers[tower].y <= (option_y) * CELL_WIDTH&&this.towers[tower].y >= (option_y-1) * CELL_WIDTH)||(this.towers[tower].x == (option_x + 1) * CELL_WIDTH && this.towers[tower].y == (option_y + 1) * CELL_WIDTH)){}
                 else this.towers[tower].sd=0;
                 console.log(this.towers[tower].sd);
                for (var cx in this.xx) {
                    //点击删除
                    if(this.towers[tower].sd==1)
                    {if (this.towers[tower].x == (option_x - 1) * CELL_WIDTH && this.towers[tower].y == (option_y + 1) * CELL_WIDTH) {
                        this.player.money += this.towers[tower].type.sale;
                        this.towers.splice(tower, 1);
                        this.xx.splice(cx, 1);
                        MAP_ARR[option_x - 1][option_y + 1] = 0;
                        this.drawTowerMap();
                        this.drawss();
                        break;
                    }}
                    //点击升级
                    // console.log(this.towers[tower]);
                    if(this.towers[tower].sd==1)
                   { if (this.towers[tower].x == (option_x + 1) * CELL_WIDTH && this.towers[tower].y == (option_y + 1) * CELL_WIDTH) {
                        this.up.splice(cx, 1);
                        console.log("塔对应类型"+this.towers[tower].type.type % 3 );
                         if (this.towers[tower].type.type % 3 > 0 && this.towers[tower].type.type % 3 < 3) {
                 
                            console.log("这里"+this.towers[tower].type.nextcost);
                            if (this.towers[tower].type.nextcost <= this.player.money) {
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
                                }, 1700);
                        }
                     }

                  }
                }
            }
           
        }
    }
      if (MAP_ARR[option_x][option_y] == 1) {
              this.drawss(); 
             // console.log(this.xx); 
              this.xx.push(new Xx(option_x, option_y));
            if (this.xx.length > 1) {
                this.xx.splice(cx, 1);
                if (this.xx.length > 1) {
                    this.xx.splice(cx, 1);
                }
            }
           // console.log(this.xx);
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
                    }, 1700);

                }
            }
        }
    }



    // 游戏状态获取
   
      gameState() {

            //如果是最后一波不显示下一波的按钮(最后一波是BOSS)
            if (this.enemyExisted < 1) {
                $("#nextScale").hide();
            }
    
            // 生成全部敌人后结束生成
            if (this.enemyNumber >= this.enemyData.length) {
                clearInterval(this.createEnemies);
            }
            if (this.enemyExisted <= 0) {
                if (this.player.end_hp <= 0){this.endGame("Failed");}
                else{this.endGame("Success");}
            }
            // 当敌人触碰到红色点的时候 血量减一（敌人攻击力） 血量为0时游戏结束
            for  (var  ene  in this.enemies)  {    
                if (this.enemies[ene].x  ==  END_X  &&  this.enemies[ene].y  ==  END_Y)  {
                    //这里修改为血量减去敌人的攻击力
                    this.player.end_hp -= this.enemies[ene].kill_blood;
                    
                    // console.log(this.enemies[ene].hp);
                    this.enemies[ene].dead(); 
                    console.log("kill1")
                    this.nowenemys--;
                    this.enemies[ene]  =  null;        
                    this.enemies.splice(ene,  1);
                    
                    
                    //相当于敌人也死了
                    //修改第一版本BUG  敌人进入后没有减去 游戏一直不能结束的BUG 
                    this.enemyExisted--;
                }
                if (this.player.end_hp  <=  0)  {    
                    this.endGame("Failed");        
                    break;    
                }
            }
                // 检查子弹
                 for (var bullet in this.bullets) {
            // 当子弹超过边界的时候 消失
            if (this.bullets[bullet].x < 0 || this.bullets[bullet].y < 0 ||
                this.bullets[bullet].x > MAP_WIDTH || this.bullets[bullet].y > MAP_HEIGHT) {
                this.bullets[bullet].dead();
                this.bullets[bullet] = null;
                this.bullets.splice(bullet, 1);
                break;
            }
            if(this.bullets[bullet].type==0||this.bullets[bullet].type==17||this.bullets[bullet].type==16){
                if (this.bullets[bullet].seed>=47){
                this.bullets[bullet].dead();
                this.bullets[bullet] = null;
                this.bullets.splice(bullet, 1);
               // break;
            }
            }else
            {
                for (var ene in this.enemies) {
                // 触碰到敌人时 敌人血量减少
                var distanceX = this.bullets[bullet].x - this.enemies[ene].x-30;
                var distanceY = this.bullets[bullet].y - this.enemies[ene].y-30;
                if ((distanceX*distanceX+distanceY*distanceY)<=
                    ((this.bullets[bullet].size+30)*(this.bullets[bullet].size+30))) {
                    // 调用敌人扣血，传入子弹类型与子弹伤害：
                    // 子弹类型：this.bullets[bullet].type
                    // 子弹伤害：this.bullets[bullet].atk

                    if((this.bullets[bullet].type==7||this.bullets[bullet].type==8||this.bullets[bullet].type==9)&&!this.bullets[bullet].enemylist[ene]){
                        this.enemies[ene].take_damage(this.bullets[bullet].type, this.bullets[bullet].atk);
                        this.bullets[bullet].enemylist[ene] = true;
                    }
                    else if(this.bullets[bullet].type!=7&&this.bullets[bullet].type!=8&&this.bullets[bullet].type!=9){
                        this.enemies[ene].take_damage(this.bullets[bullet].type, this.bullets[bullet].atk);
                    }
                    // if(this.bullets[bullet].type==3){//三号子弹打中加钱
                    //     this.player.money += 0.5 ;
                    // }

                    if (this.bullets[bullet].type != 7 && this.bullets[bullet].type != 8 && this.bullets[bullet].type != 9) {  //非二号塔的子弹不穿透
                        this.bullets[bullet].dead();
                        this.bullets[bullet] = null;
                        this.bullets.splice(bullet, 1);
                    }
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
            }}
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
                if(this.player.end_hp>0){
                    $("#next").show();
                }else{
                    $("#end").show();
                }
                
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

        this.drawss(); //------------------------------------------------------------------------------------------------

    }

    //绘制选项幕布------------------------------------------------------------------------------------------------
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
    drawBackgound() {
        var cv = document.querySelector('#canvasMap_backgroud2');
        var ctx = cv.getContext('2d');

        //绘制背景  
        new search().DrawBackground(LEVEL);

        // 生成起点
        // var imgStart = new Image;
        // imgStart.onload = function () {
        //     ctx.drawImage(imgStart, START_X, START_Y, CELL_WIDTH, CELL_WIDTH);
        //     //drawimage 最后四个参数意思分别为图片放置开始的x坐标，y坐标，所占格数宽度，长度
        // };
        // imgStart.src = "img/door1.png";

        // // 生成终点 
        // var imgEnd = new Image;
        // imgEnd.onload = function () {
        //     ctx.drawImage(imgEnd, END_X, END_Y, CELL_WIDTH, CELL_WIDTH);
        // };
        // imgEnd.src = "img/door2.png";

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
        // ctx.stroke();

        // 竖直方向，起始点y坐标都是0，终止点y都是高度，累加50
        ctx.beginPath();
        ctx.fillstyle = "red";
        for (var j = 0; j <= MAP_WIDTH / CELL_WIDTH; j++) {
            ctx.moveTo(CELL_WIDTH * j, 0);
            ctx.lineTo(CELL_WIDTH * j, MAP_HEIGHT);
        }
        // ctx.stroke();
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
                    // if(this.towerAndBullets[a].type==16){
                    //     img.src = this.towerAndBullets[a].tower_img;
                    // ctx.drawImage(img, this.towers[tower].x-300, this.towers[tower].y-300, 600, 600);
                    // }
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
        var b = 0;
        var origin = parseInt(this.towerAndBullets.length / 5); //绘画的初始位置
        for (var a = 0; a < this.towerAndBullets.length; a++) {
            if (a % 3 >= 0 && a % 3 < 1) {
                b++;
                var img = new Image;
                img.src = this.towerAndBullets[a].tower_img;
                for (var option in this.options) {
                    ctx.drawImage(img, this.options[option].x - (origin - b) * CELL_WIDTH, this.options[option].y - CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);

                }
            }
        }
    }

    //绘制子弹
    drawBullet() {
        var cv = document.querySelector('#canvasMap_bullet');
        var ctx = cv.getContext('2d');
        ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
        for (var bullet in this.bullets) {
            var img = new Image;
            img.src = this.bullets[bullet].color;
            if(this.bullets[bullet].type==0||this.bullets[bullet].type==17||this.bullets[bullet].type==16)
           { 
               var x=this.bullets[bullet].x+30;
               var y=this.bullets[bullet].y+30;
            }
            else {
                var x=this.bullets[bullet].x;
                var y=this.bullets[bullet].y;
            }
            //将画布（0,0）移动到 绘制的坐标点
            ctx.translate(x, y);       
            //旋转画布
            ctx.rotate(this.bullets[bullet].direction[2]);
            if(this.bullets[bullet].type==1||this.bullets[bullet].type==2||this.bullets[bullet].type==3){
                ctx.drawImage(img, -10,-25,20,50);
            }
             else if   (this.bullets[bullet].type==10||this.bullets[bullet].type==11||this.bullets[bullet].type==12) {
                ctx.drawImage(img, -15,-15,30,30);
            }
            else if(this.bullets[bullet].type==0||this.bullets[bullet].type==17||this.bullets[bullet].type==16) {
                ctx.drawImage(img, -150,-150,300,300);
            }
            else if(this.bullets[bullet].type==8||this.bullets[bullet].type==9||this.bullets[bullet].type==7) {
                ctx.drawImage(img, -20,-20,40,40);
            }
            else  ctx.drawImage(img, -10,-10,20,20);
            ctx.rotate(-this.bullets[bullet].direction[2]);      
            ctx.translate(-x, -y);
        }

}
    //绘制点塔选项标志
    drawxx() {
        console.log("画图");
        var cv = document.querySelector('#canvasMap_option');
        var ctx = cv.getContext('2d');
        var img_xx = new Image();
        var img_up = new Image();
        img_xx.src = "img/delete.png";
        img_up.src = "img/up.png";
        for (var cx in this.xx) {//console.log("img/delete.png");
            ctx.drawImage(img_xx, (this.xx[cx].x + 1) * CELL_WIDTH, (this.xx[cx].y - 1) * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
            ctx.drawImage(img_up, (this.xx[cx].x - 1) * CELL_WIDTH, (this.xx[cx].y - 1) * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
        }
    }
}
var Canvas = {
    //清除画布
    clear: function (cxt, x, y) {
        cxt.clearRect(0, 0, x, y);
    },
    clearRect: function (cxt, x, y, width, height) {
        cxt.clearRect(x, y, width, height);
    },
    //画圆
    //ctx:context2d对象,x:圆心x坐标,y:圆心y坐标,radius:半径,color:颜色
    fillArc: function (cxt, x, y, radius, color) {
        cxt.fillStyle = color;
        cxt.beginPath();
        cxt.arc(x, y, radius, 0, Math.PI * 2, true);
        cxt.closePath();
        cxt.fill();
    }
}