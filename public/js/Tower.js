class Tower {
    //塔的范围区分塔的种类
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.tower_level = 1;
        this.type = type || {};
        this.range = this.type.range ;
        this.tower_img = this.type.tower_img;
        this.cost = this.type.cost; //建塔所需金币
        this.sale = this.type.sale; //卖塔所得金币   
    }
}

