class Player {
    constructor(nickName,score) {
        this.nickname = nickName; //数据库昵称字段
        this.score = score; //数据库积分字段

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