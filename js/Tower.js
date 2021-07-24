class Tower {
    //塔的范围区分塔的种类
    constructor(X, Y, type) {
        this.x = X;
        this.y = Y;
        this.tower_level = 1;
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

        }
}

