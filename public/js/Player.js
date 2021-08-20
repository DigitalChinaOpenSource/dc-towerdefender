class Player {
    constructor() {
        this.money = PlAYER_BASE_MONEY ;
        this.end_hp = END_HP; //基地血量

    }
        //set方法
        setNickname(nickName) {
            this.nickname=nickName;
        }
        setScore(score) {
            this.score=score;
        }    

        //get方法
        getNickame() {
            return this.nickName;
        }
        getScore() {
            return this.score;
        }  

        // this.money = PlAYER_BASE_MONEY + (LEVEL * 100); //老版本基地血量
        // this.end_hp = END_HP; //基地血量
}