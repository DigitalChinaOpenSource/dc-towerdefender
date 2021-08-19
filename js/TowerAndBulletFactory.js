/**
 * 仅仅是tower和bullet的属性模板，不直接返回对象
 */
class TowerAndBulletFactory {
    constructor() {
        this.TowerAndBulletArr = [];
        this.factory();
    }

    /**
     * 根据当前关数初始化 塔的种类
     */
    factory() {

        //第一关
        if (LEVEL == 0) {
            this.TowerAndBulletArr.push(TowerType.one);
            this.TowerAndBulletArr.push(TowerType.two);
            this.TowerAndBulletArr.push(TowerType.three);
            this.TowerAndBulletArr.push(TowerType.four);
            this.TowerAndBulletArr.push(TowerType.five);
            this.TowerAndBulletArr.push(TowerType.six);
        }
        //第二关
        if (LEVEL == 1) {
            this.TowerAndBulletArr.push(TowerType.one);
            this.TowerAndBulletArr.push(TowerType.two);
            this.TowerAndBulletArr.push(TowerType.three);
            this.TowerAndBulletArr.push(TowerType.four);
            this.TowerAndBulletArr.push(TowerType.five);
            this.TowerAndBulletArr.push(TowerType.six);
        }
        //第三关
        if (LEVEL == 2) {
            this.TowerAndBulletArr.push(TowerType.one);
            this.TowerAndBulletArr.push(TowerType.two);
            this.TowerAndBulletArr.push(TowerType.three);
            this.TowerAndBulletArr.push(TowerType.four);
            this.TowerAndBulletArr.push(TowerType.five);
            this.TowerAndBulletArr.push(TowerType.six);
        }
        //以后再说
        if (LEVEL > 2) {
            this.TowerAndBulletArr.push(TowerType.one);
            this.TowerAndBulletArr.push(TowerType.two);
            this.TowerAndBulletArr.push(TowerType.three);
            this.TowerAndBulletArr.push(TowerType.four);
            this.TowerAndBulletArr.push(TowerType.five);
            this.TowerAndBulletArr.push(TowerType.six);
        }

    }
}





