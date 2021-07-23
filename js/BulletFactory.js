/**
 * 仅仅是tower和bullet的属性模板，不直接返回对象
 */
 class BulletFactory {
    constructor() {
        this.BulletArr = [];
        this.factory();
    }

    /**
     * 根据当前关数初始化 塔的种类
     */

     factory() {
          this.BulletArr.push(BulletType.one);
          this.BulletArr.push(TowerType.two);
          this.BulletArr.push(TowerType.three);
          this.BulletArr.push(TowerType.four);
          this.BulletArr.push(TowerType.five);
          this.BulletArr.push(TowerType.six);
          this.BulletArr.push(TowerType.seven);
          this.BulletArr.push(TowerType.eight);
          this.BulletArr.push(TowerType.nine);
          this.BulletArr.push(TowerType.thirteen);
          this.BulletArr.push(TowerType.fourteen);
          this.BulletArr.push(TowerType.fifteen);
          this.BulletArr.push(TowerType.sixteen);
          this.BulletArr.push(TowerType.seventeen);
          this.BulletArr.push(TowerType.eighteen);
       
    }
}