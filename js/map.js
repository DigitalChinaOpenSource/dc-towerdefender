class map{
    constructor(player_name, player_score, player_money, monsters_killed, monsters_alive,tower_num) {
        this.player_name = player_name;//昵称
        this.player_score = player_score;//分数
        this.player_money = player_money;//金币
        this.monsters_killed = monsters_killed;//杀死的怪物数量
        this.monsters_alive = monsters_alive;//存活的怪物数量
        this.tower_num=tower_num;//塔数量
        var myDate = new Date();//过了的时间

        // 0:地图，1:小兵路线，2:防御塔放置范围
        var map=[
            [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
            [0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,1],
            [0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,2,1],
            [0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,2,1],
            [1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1],
            [1,2,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0],
            [1,2,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0],
            [1,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0]
        ]
    }
    //set方法
    setPlayer_name(player_name) {
        this.player_name=player_name;
    }
    setPlayer_score(player_score) {
        this.player_score=player_score;
    }
    setPlayer_money(player_money) {
        this.player_money=player_money;
    }
    setMonsters_killed(monsters_killed) {
        this.monsters_killed=monsters_killed;
    }
    setMonsters_alive(monsters_alive) {
        this.monsters_alive=monsters_alive;
    }
    setTower_num(tower_num) {
         this.tower_num=tower_num;
    }
    setMyDate(myDate) {
         this.myDate=myDate;
    }

    //get方法   
    getPlayer_name() {
        return this.player_name;
    }
    getPlayer_score() {
        return this.player_score;
    }
    getPlayer_money() {
        return this.player_money;
    }
    getMonsters_killed() {
        return this.monsters_killed;
    }
    getMonsters_alive() {
        return this.monsters_alive;
    }
    getTower_num() {
        return this.tower_num;
    }
    getMyDate() {
        return this.myDate;
    }
}