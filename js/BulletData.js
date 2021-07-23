/**
 * 子弹的属性模板
 * 参数说明：
 * {类型，速度，颜色，大小，子弹伤害}
 */
var BulletType = {
    zero: { type: 0, speed: 15, color: "img/ftp.png", size: 3, attack: 20,run:1,reduce:0,blood:0,second:0},
    one: { type: 1, speed: 20, color: "img/z1.png", size: 3, attack: 60,run:1,reduce:0,blood:0,second:0},//普通子弹 1 2 3号
    two: { type: 2, speed: 20, color: "img/z2.png", size: 4, attack: 120 ,run:1,reduce:0,blood:0,second:0},    ///////////////////////////  run减速比  reduce减速时间 blood扣血 second扣血时间
    three: { type: 3, speed: 20, color: "img/z3.png", size: 3, attack: 180 ,run:1,reduce:0,blood:0,second:0},
    four: { type: 4, speed: 15, color: "img/zb1.png", size: 3, attack: 100 ,run:1,reduce:0,blood:0,second:0},  //红色子弹 4 5 6号
    five: { type: 5, speed: 15, color: "img/zb1.png", size: 3, attack: 200 ,run:1,reduce:0,blood:0,second:0},
    six: { type: 6, speed: 15, color: "img/zb1.png", size: 3, attack: 300,run:1,reduce:0,blood:0,second:0},
    seven: { type: 7, speed: 16, color: "img/fb1.png", size: 4, attack: 50 ,run:1,reduce:0,blood:0,second:0},//无属性飞镖 7号
    eight: { type: 8, speed: 16, color: "img/fb2.png", size: 4, attack: 80,run:0.8,reduce:3,blood:0,second:0},//减速飞镖 8 20%*3秒
    nine: { type: 9, speed: 16, color: "img/fb3.png", size: 4, attack: 150,run:0.5,reduce:3,blood:0,second:0},//减速飞镖 9 50%*3秒
    ten: { type: 10, speed: 12, color: "img/hy1.png", size: 4, attack: 200,run:0,reduce:0,blood:25,second:3},//火焰 10  hp-20*3s
    eleven: { type: 11, speed: 13, color: "img/hy2.png", size: 4, attack: 300,run:0.8,reduce:3,blood:45,second:3},//火焰 11 减速20%*3s hp-20*3s
    twelve: { type: 12, speed: 15, color: "img/hy3.png", size: 4, attack: 500 ,run:0.6,reduce:3,blood:50,second:5},//火焰 12 减速40%*3s hp-30*5s
    thirteen: { type: 13, speed: 10, color: "img/xh1.png", size: 4, attack: 40 ,run:0.7,reduce:3,blood:0,second:0},//冰冻弹 13 减速30%*3s
    fourteen: { type: 14, speed: 12, color: "img/xh2.png", size: 4, attack: 80 ,run:0,reduce:2,blood:0,second:0},//冰冻弹14 禁锢两秒
    fifteen: { type: 15, speed: 14, color: "img/xh3.png", size: 4, attack: 120,run:0,reduce:3,blood:0,second:0},//冰冻弹15 禁锢三秒  结束时减速30%*3s   
    zero_1: { type: 16, speed: 15, color: "img/ftp.png", size: 3, attack: 35,run:1,reduce:0,blood:0,second:0},
    zero_2: { type: 17, speed: 15, color: "img/ftp.png", size: 3, attack: 60,run:1,reduce:0,blood:0,second:0},
}