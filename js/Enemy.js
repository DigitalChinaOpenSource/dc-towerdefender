class Enemy {
    // 通过hp，speed，size,enemy_img来确定enemy的种类
    // enemy_img传入敌人的图片url
    constructor(hp, speed, size, enemy_img, money, enemy_type,range,attack,atk_speed) {
        this.flag = 0; // 移动状态：1=移动中，0=停止
        this.hp = hp || ENEMY_BASE_HP; // 不同种类的enemy有不同的血量，默认是10
        this.speed = speed || ENEMY_BASE_SPEED; // 不同种类的enemy有不同的速度
        this.size = size || 60; // 敌人的大小，默认60
        this.enemy_img = enemy_img || "img/TowerDefense.png";
        this.money = money; // 死后掉落金币
        //this.kill_blood = kill_blood; // 到达终点后玩家扣除血量
        this.enemy_type = enemy_type; // 怪物类型
        this.range = range;  //小怪的初始攻击范围 
        this.attack = attack;  //小怪的初始攻击力
        this.atk_speed = atk_speed; //小怪的初始攻击速度 
        this.enemy_img_series = enemy_type; // 怪物图片序列头
        this._init();// 
        // 根据关卡数来设定敌人的路线
        this.moveArr = new search().searchEnemyRoute(LEVEL);
        this.index = 1;
        // 怪物初始参数
        this.originHp = hp; // 原始hp
        // this.origin_spd = this.speed; // 初始速度 用于速度改变使用
        this.fight = 0;//战斗状态：0表示小怪和塔之间的距离大于小怪的攻击范围，未进入战斗状态
        
    //     状态参数 
    
    //    this.dot = 0; // dot状态 1=赋予dot
    //    this.dot_d = 0; // dot互斥变量 1=dot状态中
    //    this.dot_damage = 0; // dot伤害
    //    this.dot_start = 0; // dot开始时间
    //    this.dot_time = 0; // dot持续时间
    //    this.slowdown = 0;// 减速状态 1=赋予减速
    //    this.slowdown_d = 0; // 减速互斥变量 1=减速状态中
    //    this.slowdown_rate = 0; // 当前速度比例
    //    this.slowdown_start = 0; // 减速开始时间
    //    this.slowdown_time = 0; // 减速持续时间
    //    this.frozen = 0;// 冰冻状态 1=赋予冰冻
    //    this.frozen_d = 0; // 冰冻互斥变量 1=冰冻状态中
    //    this.frozen_start = 0; // 冰冻开始时间
    //    this.frozen_time = 0; // 冰冻持续时间   
    //     定时器
       this.autoheal;
        //check_debuff;
    }

    _init() {
        this.create();
        this.check_type();
        this.speed_control(this.speed);
    }
     // 生成0~maxNum-1的随机整数
     randomNum(maxNum){ 
        return Math.floor(Math.random()*maxNum);  
    } 
    // 根据随机数来确定小怪的随机刷新位置
    create() {
            // this.x = START_X + CELL_WIDTH;
            // this.y = START_Y;
            var ran = this.randomNum(route.routeOne.length)
            this.x = route.routeOne[ran].x * CELL_WIDTH
            this.y = route.routeOne[ran].y * CELL_WIDTH
    }
    // 怪物dot 伤害叠加 再次dot刷新时间
    // dot_control(){
    //     var start_time = this.dot_start;
    //     var take_dot = setInterval(() => {
    //         start_time = this.dot_start;
    //         if(this.flag){this.dot_time += 1000;}
    //         else{this.reduce_hp(this.dot_damage);}
    //         if(new Date().getTime() - start_time > this.dot_time) {
    //             this.dot = 0;
    //             this.dot_d = 0;
    //             clearInterval(take_dot);
    //         }
    //     }, 1000);//
    // }
    // 怪物减速
    // speed_change(){
    //     var start_time = this.slowdown_start;
    //     this.speed_control(this.origin_spd * this.slowdown_rate);
    //     var take_slowdown = setInterval(() => {
    //         start_time = this.slowdown_start;
    //         if(this.flag){this.slowdown_time += 100;}
    //         if(new Date().getTime() - start_time > this.slowdown_time) {
    //             this.speed_control(this.origin_spd);
    //             this.slowdown = 0;
    //             this.slowdown_d = 0;
    //             clearInterval(take_slowdown);}
    //         }, 100);
    //     }
    // 怪物冰冻
    // frozen_control(){
    //     var start_time = this.frozen_start;
    //     var take_frozen = setInterval(() => {
    //         start_time = this.frozen_start;
    //         if(this.flag && this.frozen_d){this.frozen_time += 100;}
    //         if(new Date().getTime() - start_time > this.frozen_time){
    //             this.continue();
    //             this.frozen = 0;
    //             this.frozen_d = 0;
    //             clearInterval(take_frozen);
    //         }
    //     }, 100);
    // }
    // 怪物速度控制
    speed_control(spd){
        clearInterval(this.life);
        var order = 0; // 怪物图片切换频率计数
        if(spd == 0){}
        else{
            this.life = setInterval(() => {
                order = order % 40; // 控制order的数值大小 四张图片顺次切换 每10次切换一次
                this.move(order); // 移动
                order++;
            }, 10000 / spd); // 控制enemy移动速度，每 10000 / spd毫秒刷新一次
        }
    }
    // 怪物移动方法
    move(order) {
        var x_d;
        var y_d;
        //当游戏正常运行时，并且小怪和塔之间的距离大于小怪的攻击范围，小怪正常运行
        if (this.flag == 0 && this.fight == 0) {
            // 切换怪物图片 实现动态变化
            if(order < 10){this.enemy_img = "img/"+this.enemy_img_series+"-1.png";}
            else if(order < 20){this.enemy_img = "img/"+this.enemy_img_series+"-2.png";}
            else if(order < 30){this.enemy_img = "img/"+this.enemy_img_series+"-3.png";}
            else {this.enemy_img = "img/"+this.enemy_img_series+"-4.png";}
            // 判断的时候乘CELL_WIDTH
            if (this.x != this.moveArr[this.index].x * CELL_WIDTH) {
                // 方向向量 正数向右 负数向左
                x_d = this.moveArr[this.index % moveArr.length].x - this.moveArr[(this.index - 1) % moveArr.length].x;
                // x轴每一步的距离
                this.x = this.x + 1 * (x_d / Math.abs(x_d));
            } else if (this.y != this.moveArr[this.index].y * CELL_WIDTH) {
                // 方向向量 正数向上 负数向下
                y_d = this.moveArr[this.index % moveArr.length].y - this.moveArr[(this.index - 1) % moveArr.length].y;
                // y轴每一步的距离
                this.y = this.y + 1 * (y_d / Math.abs(y_d));
            } else {
                this.index++;
            }
        }
    }

    //小怪攻击方法



    // 对外接口
    // 接收击中怪物的子弹类型和伤害
    take_damage(bullet_type, damage){
        this.monster_effect(bullet_type, damage);
        this.take_debuff();
    }  
    // 怪物debuff生效
    // take_debuff(){
    //     // debuff监控
    //     this.check_debuff = setInterval(() => {
    //         // && this.dot_d == 0
    //         if(this.dot){
    //             this.dot_d = 1;
    //             this.dot = 0;
    //             this.dot_control();
    //         }
    //         if(this.slowdown && this.slowdown_d == 0){
    //             if(this.enemy_type < 8){this.slowdown_d = 1; this.speed_change();}    
    //         }
    //         if(this.frozen && this.frozen_d == 0){
    //             if(this.enemy_type < 9){this.frozen_d = 1;this.frozen_control();}
    //         }
    //     }, 100)
    // }
    // 子弹伤害扣血，赋予怪物debuff
    monster_effect(bullet_type, damage){
        switch(bullet_type){
            case 8: // 子弹类型8 减速20% 持续3秒
                this.reduce_hp(damage);
                // this.slowdown = 1;
                // this.slowdown_rate = 0.8;
                // this.slowdown_start = new Date().getTime();
                // this.slowdown_time = 3000;
                break;
            case 9:// 子弹类型9 减速50% 持续3秒
                this.reduce_hp(damage);
                // this.slowdown = 1;
                // this.slowdown_rate = 0.5;
                // this.slowdown_start = new Date().getTime();
                // this.slowdown_time = 3000;
                break;
            case 10: // 子弹类型10 dot伤害20/s 持续3秒
                this.reduce_hp(damage);
                // this.dot = 1;
                // this.dot_damage = 20;
                // this.dot_start = new Date().getTime();
                // this.dot_time = 3000;
                break;
            case 11: // 子弹类型11 dot伤害20/s 持续3秒 减速20% 持续3秒
                this.reduce_hp(damage);
                // this.dot = 1;
                // this.dot_damage = 20;
                // this.dot_start = new Date().getTime();
                // this.dot_time = 3000;
                // this.slowdown = 1;
                // this.slowdown_rate = 0.8;
                // this.slowdown_start = new Date().getTime();
                // this.slowdown_time = 3000;
                break;
            case 12: // 子弹类型12 dot伤害30/s 持续5秒 减速40% 持续3秒
                this.reduce_hp(damage);
                // this.dot = 1;
                // this.dot_damage = 30;
                // this.dot_start = new Date().getTime();
                // this.dot_time = 5000;
                // this.slowdown = 1;
                // this.slowdown_rate = 0.6;
                // this.slowdown_start = new Date().getTime();
                // this.slowdown_time = 3000;
                break;
            case 13: // 子弹类型13 减速30% 持续3秒
                this.reduce_hp(damage);
                // this.slowdown = 1;
                // this.slowdown_rate = 0.7;
                // this.slowdown_start = new Date().getTime();
                // this.slowdown_time = 3000;
                break;
            case 14: // 子弹类型14 冰冻2秒
                this.reduce_hp(damage);
                // this.frozen = 1;
                // this.frozen_start = new Date().getTime();
                // this.frozen_time = 2000;
                break;
            case 15: // 子弹类型15 冰冻3秒 然后减速30% 持续3秒
                this.reduce_hp(damage);
                // this.frozen = 1;
                // this.frozen_start = new Date().getTime();
                // this.frozen_time = 3000;
                // this.slowdown = 1;
                // this.slowdown_rate = 0.7;
                // this.slowdown_start = new Date().getTime();
                // this.slowdown_time = 6000;
                break;
            default:
                this.reduce_hp(damage);
                break;
        }
    }
    // 扣血判断 解决血条越界显示bug
    reduce_hp(damage){
        if(this.hp < damage){this.hp = 0;}
        else{this.hp -= damage;}
    }
    // 识别怪物种类，用于触发怪物技能
     //check_type(){
    //     // boss被动加速
    //     if(this.enemy_type > 8){ // boss
    //         var hpcheck = setInterval(() => {
    //             if(this.hp <= (this.originHp / 2)){
    //                 this.origin_spd *= this.enemy_type * 0.1 + 0.4;
    //                 this.speed_control(this.origin_spd);
    //                 clearInterval(hpcheck);
    //             }
    //         },50);
    //     }
        // 自动恢复血量
    //     if(this.enemy_type == 5){
    //         this.autoheal = setInterval(() => {
    //             if(this.hp + 100 < this.originHp) {this.hp += 100;}
    //             else{this.hp = this.originHp;}
    //         }, 3000);
    //     }
    // }
    // 怪物死亡
    dead() {
        // clearInterval(this.autoheal);
        // clearInterval(this.check_debuff);
        clearInterval(this.life);//清除定时器
    }
    //怪物死亡后重新刷新两个小怪
    reBirth(hp){
        if(this.hp == 0){
            create();
            create();
        }

    }
    // 游戏暂停
    stop() {
        this.flag = 1;
    }
    // 游戏继续
    continue () {
        this.flag = 0;
    }
}
