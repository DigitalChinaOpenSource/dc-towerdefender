class Tower {
    //塔的范围区分塔的种类
    constructor(x, y, type,range,attack_interval,cost,sale) {
        this.x = x;
        this.y = y;
        this.tower_level = 1;
        this.type = type ;
        this.range = range ;
        this.attack_interval = attack_interval;
        this.tower_img = tower_img;
        this.cost = cost; //建塔所需金币
        this.sale = sale; //卖塔所得金币 
        this.check_attack_interval = undefined;  
    }
}

