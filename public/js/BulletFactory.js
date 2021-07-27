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
          this.BulletArr.push(BulletType.two);
          this.BulletArr.push(BulletType.three);
          this.BulletArr.push(BulletType.four);
          this.BulletArr.push(BulletType.five);
          this.BulletArr.push(BulletType.six);
          this.BulletArr.push(BulletType.seven);
          this.BulletArr.push(BulletType.eight);
          this.BulletArr.push(BulletType.nine);
          this.BulletArr.push(BulletType.thirteen);
          this.BulletArr.push(BulletType.fourteen);
          this.BulletArr.push(BulletType.fifteen);
          this.BulletArr.push(BulletType.sixteen);
          this.BulletArr.push(BulletType.seventeen);
          this.BulletArr.push(BulletType.eighteen);
       
    }
}