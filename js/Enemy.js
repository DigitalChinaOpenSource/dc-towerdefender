class Enemy {
    //通过hp，speed，size,enemy_img来确定enemy的种类
    //enemy_img传入敌人的图片url
    constructor(hp, speed, size, enemy_img, money, kill_blood) {
        this.flag = 0;
        this.hp = hp || ENEMY_BASE_HP; //不同种类的enemy有不同的血量，默认是10
        this.speed = speed || ENEMY_BASE_SPEED; //不同种类的enemy有不同的速度
        this.size = size || 50; //敌人的大小，默认50
        this.enemy_img = enemy_img || "img/TowerDefense.png";
        this.money = money; //死后掉落金币
        this.kill_blood = kill_blood; //到达终点后玩家扣除血量

        this._init();

        //根据关卡数来设定敌人的路线
        this.moveArr = new search().searchEnemyRoute(LEVEL);


        this.index = 1;

        //原始hp，不做变更
        this.originHp = hp;

    }

    _init() {
        this.create();
        this.life = setInterval(() => {
            this.move();
        }, 10000 / this.speed);   //控制enemy移动速度


    }

    create() {
            this.x = START_X + CELL_WIDTH;
            this.y = START_Y;
        }
        //怪物移动方法
    move() {
        var x_d;
        var y_d;
        if (this.flag == 0) {
            //判断的时候乘CELL_WIDTH
            if (this.x != this.moveArr[this.index].x * CELL_WIDTH) {
                // 方向向量 正数向前 负数向后
                x_d = this.moveArr[this.index].x - this.moveArr[this.index - 1].x;
                // x轴每一步的距离
                this.x = this.x + 1 * (x_d / Math.abs(x_d));
            } else if (this.y != this.moveArr[this.index].y * CELL_WIDTH) {
                // 方向向量 正数向上 负数向下
                y_d = this.moveArr[this.index].y - this.moveArr[this.index - 1].y;
                // y轴每一步的距离
                this.y = this.y + 1 * (y_d / Math.abs(y_d));
            } else {
                //防止越界 index小于坐标点的最大值
                if (this.index < this.moveArr.length) {
                    this.index++;
                } else {
                    this.index = 1;
                }
            }
        }

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