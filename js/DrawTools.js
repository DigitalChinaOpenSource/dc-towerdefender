var Ca = {
  //画填充的方
  fillRect: function (cxt, x, y, width, height, color) {
    cxt.fillStyle = color;
    cxt.fillRect(x, y, width, height);
  },

  //画路线
  //传一个小兵的路线数组[{x:5,y:1},{x:1,y:2}]
  drawWall: function (cxt, arr, color) {
    cxt.fillStyle = color;
    for (var i = 0; i < arr.length; i++) {
   
        //- 1修正
        cxt.fillRect((arr[i].x - 1) * CELL_WIDTH, (arr[i].y - 1) * CELL_WIDTH,CELL_WIDTH,CELL_WIDTH);
        // console.log(arr[i].x,arr[i].y);
    }
  },

  //画小兵血条
  /**
   * 
   * @param {*canvas 画笔} cxt 
   * @param {*小兵对象} enemy 
   */
  drawBlood: function (cxt,enemy){
    //获取小兵
    //获取小兵的位置
    //获取小兵当前生命值
    //在小兵头上画出
    let nowHp = enemy.hp;  //小兵现在的血量
    let proportion = nowHp/enemy.originHp;
    this.fillRect(cxt,enemy.x+5,enemy.y-5,40,5,"red");
    this.fillRect(cxt,enemy.x+5,enemy.y-5,proportion*40,5,"green");
    
  },
  

};

