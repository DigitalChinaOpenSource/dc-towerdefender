/**
 * 仅仅是tower的属性模板，不直接返回对象
 */
 class TowerFactory {
    constructor() {
        this.TowerArr = [];
        this.factory();
    }

    /**
     * 根据当前关数初始化塔的种类
     */

    factory() {
          this.TowerArr.push(TowerType.one);
          this.TowerArr.push(TowerType.two);
          this.TowerArr.push(TowerType.three);
          this.TowerArr.push(TowerType.four);
          this.TowerArr.push(TowerType.five);
          this.TowerArr.push(TowerType.six);
          this.TowerArr.push(TowerType.seven);
          this.TowerArr.push(TowerType.eight);
          this.TowerArr.push(TowerType.nine);
          this.TowerArr.push(TowerType.thirteen);
          this.TowerArr.push(TowerType.fourteen);
          this.TowerArr.push(TowerType.fifteen);
          this.TowerArr.push(TowerType.sixteen);
          this.TowerArr.push(TowerType.seventeen);
          this.TowerArr.push(TowerType.eighteen);
       
    }
}