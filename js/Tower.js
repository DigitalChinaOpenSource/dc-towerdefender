class Tower {
    //塔的范围区分塔的种类
    constructor(X, Y, type) {
        this.x = X;
        this.y = Y;
        this.tower_level = 1;
        this.flag = 0;
        this.tower_hp = tower_hp || TOWER_BASE_HP;
       // this.seed=0;
        //======= 虎 删除   
        // this.range = range_Type || TOWER_BASE_RAN+1; //rang_Type表示不同的塔的范围,默认为1+1
        // this.tower_img = tower_img || "img/tower1.png";
        this.bullet = 0;
        this.seed =0;
        //虎 根据 type 生成塔的自己的类型的子弹
        this.type = type || {};
        this.range = this.type.range ;
        this.tower_img = this.type.tower_img;
        this.cost = this.type.cost; //建塔所需金币
        this.sale = this.type.sale; //卖塔所得金币
        
        // 塔的初始参数
        this.originHp = tower_hp; // 原始hp  
        // 状态参数 
        this.dot = 0; // dot状态 1=赋予dot
        this.dot_d = 0; // dot互斥变量 1=dot状态中
        this.dot_damage = 0; // dot伤害
        this.dot_start = 0; // dot开始时间
        this.dot_time = 0; // dot持续时间   

    }
        // 怪物dot 伤害叠加 再次dot刷新时间
        dot_control(){
            var start_time = this.dot_start;
            var take_dot = setInterval(() => {
                start_time = this.dot_start;
                if(this.flag){this.dot_time += 1000;}
                else{this.reduce_hp(this.dot_damage);}
                if(new Date().getTime() - start_time > this.dot_time) {
                    this.dot = 0;
                    this.dot_d = 0;
                    clearInterval(take_dot);
                }
            }, 1000);
        }
        // 对外接口
        // 接收击中塔的子弹类型和伤害
        take_damage(bullet_type, damage){
            this.tower_effect(bullet_type, damage);
        }

        //子弹伤害扣血
        tower_effect(damage){
            this.reduce_hp(damage);
        }
        // 扣血判断 解决血条越界显示bug
        reduce_hp(damage){
            if(this.tower_hp < damage){this.tower_hp = 0;}
            else{this.tower_hp -= damage;}
        }
}

