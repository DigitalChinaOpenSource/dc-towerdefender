class Bullet {
    //子弹的速度，颜色区分子弹的种类
    constructor(x, y, target_x, target_y, type, speed, damage, target_index,color, size) {
        this.x = x;
        this.y = y;
        this.target_x = target_x;
        this.target_y = target_y;
        this.damage = damage || BULLET_BASE_DAMAGE;
        this.speed = speed || BULLET_BASE_SPEED;
        this.color = color || "img/z1.png";
        this.size = size || 5;
        this.flag = 0;
        this.type = type;
       // this.bian=0;
        this.target_index = target_index;
         this._init();
    }
    _init() {
        this.create();
    }

    concurrent_change_target(new_x,new_y){
        this.target_x = new_x;
        this.target_y = new_y;
    }

    create() {
        // this.bian=0;
        this.direction = Array();
        // 创建方向向量
      
        // this.baoji();
        this.direction[0] = (this.target_x - this.x) / CELL_WIDTH;
        this.direction[1] = (this.target_y - this.y) / CELL_WIDTH;
        this.direction[2]=Math.atan(Math.abs((this.direction[0])/(this.direction[1])));//旋转角度
        this.bulletdir();
        this.x = this.x+ CELL_WIDTH / 2;//-this.size/2 ;//当换图片的时候注释掉
        this.y = this.y+ CELL_WIDTH / 2;//-this.size/2 ;//要根据子弹size微调  预计为size/2  如果是正方形的话
        this.target_x = this.target_x + CELL_WIDTH / 2;
        this.target_y = this.target_y + CELL_WIDTH / 2;
        
        this.life = setInterval(() => {
            this.move();
        }, 30);
    }

    bulletdir(){
        if(this.target_x < this.x){
            if(this.target_y < this.y){ //怪在塔的左上角
                this.direction[2]=-this.direction[2];      
            }
            else if(this.target_y > this.y){//怪在塔的左下角
                this.direction[2]=Math.PI+this.direction[2];      
            }
            else {
                this.direction[2]=Math.PI*(-90)/180;       //怪在塔的正左方
            }
        }
        else if(this.target_x > this.x){
            if(this.target_y < this.y){  //怪在塔的右上角
                this.direction[2]=this.direction[2];      
            }
            else if(this.target_y > this.y){ //怪在塔的右下角
                this.direction[2]=Math.PI-this.direction[2];      
            }
            else {                                     //怪在塔的正右方
                this.direction[2]=Math.PI*(90)/180;      
            }
        }
        else{
            if(this.target_y > this.y){  //怪在塔的正下方
                this.direction[2]=Math.PI*(180)/180;      
            }
            else {
                if(this.target_y < this.y){  //怪在塔的正上方
                    this.direction[2]=Math.PI*(0)/180;      
                }  
            }
        }
    }

    // baoji(){
    //     if(this.type==1){
    //         if(this.sj<=20){
    //            this.damage*=2;
    //            this.color="img/zb1.png";
    //         }
    //     }
    //     else if(this.type==2){
    //        if(this.sj<=40){
    //           this.damage*=2;
    //           this.color="img/zb1.png";
    //        }
    //    }else if(this.type==3){
    //        if(this.sj<=60){
    //           this.damage*=2;
    //           this.color="img/zb1.png";
    //        }
    //    }
    // }

    move() {
        if (this.flag == 0) {
            //x坐标，y坐标分表移动 
            this.x = this.x + (this.direction[0]/Math.sqrt((this.direction[0]*this.direction[0]+this.direction[1]*this.direction[1]))) *2*this.speed; //x轴速度
            this.y = this.y + (this.direction[1]/Math.sqrt((this.direction[0]*this.direction[0]+this.direction[1]*this.direction[1]))) *2*this.speed;//y轴速度
        }
    }

    changeTargetDirection(input_x,intput_y){
        this.target_x = input_x;
        this.target_y = intput_y;
    }

    dead() {
        clearInterval(this.life);
    }

    stop() {
        this.flag = 1;
    }

    continue () {
        this.flag = 0;
    }
}