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
          this.TowerAndBulletArr.push(TowerType.one);
          this.TowerAndBulletArr.push(TowerType.two);
          this.TowerAndBulletArr.push(TowerType.three);
          this.TowerAndBulletArr.push(TowerType.four);
          this.TowerAndBulletArr.push(TowerType.five);
          this.TowerAndBulletArr.push(TowerType.six);
          this.TowerAndBulletArr.push(TowerType.seven);
          this.TowerAndBulletArr.push(TowerType.eight);
          this.TowerAndBulletArr.push(TowerType.nine);
          this.TowerAndBulletArr.push(TowerType.thirteen);
          this.TowerAndBulletArr.push(TowerType.fourteen);
          this.TowerAndBulletArr.push(TowerType.fifteen);
          this.TowerAndBulletArr.push(TowerType.sixteen);
          this.TowerAndBulletArr.push(TowerType.seventeen);
          this.TowerAndBulletArr.push(TowerType.eighteen);
       
    }
}