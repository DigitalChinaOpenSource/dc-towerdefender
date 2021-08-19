class Bullet {
    //子弹的速度，颜色区分子弹的种类
    constructor(x, y, target_x, target_y, speed, color, size, attack) {
        this.x = x;
        this.y = y;
        this.target_x = target_x;
        this.target_y = target_y;
        this.atk = attack || BULLET_BASE_ATK;
        this.speed = speed || BULLET_BASE_SPEED;
        this.color = color || BULLET_BASE_COLOR;
        this.size = size || 5;
        this._init();
        this.flag = 0;

    }

    _init() {
        this.create();
    }

    create() {
        // 创建方向向量
        this.direction = Array();
        this.direction[0] = (this.target_x - this.x) / CELL_WIDTH;
        this.direction[1] = (this.target_y - this.y) / CELL_WIDTH;

        this.x = this.x + CELL_WIDTH / 2;
        this.y = this.y + CELL_WIDTH / 2;
        this.target_x = this.target_x + CELL_WIDTH / 2;
        this.target_y = this.target_y + CELL_WIDTH / 2;

        this.life = setInterval(() => {
            this.move();
        }, 100 / this.speed);
    }

    move() {
        if (this.flag == 0) {
            this.x = this.x + (CELL_WIDTH * this.direction[0]) / 100;
            this.y = this.y + (CELL_WIDTH * this.direction[1]) / 100;
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