let ws
let roomCount
let linkName
let score
let ip='ws://localhost:8888'
function websocketLink(){
    ws = new WebSocket(ip)
    ws.onopen = function(){
        console.log('success liked the server')
        // let i = parseInt(Math.random()*5)
        // console.log('score======>'+i)
        // websocketSend({type:0,score:i})
    }

    ws.onmessage = function(evt){
        // 消息转为json类型
        var recv = JSON.parse(evt.data)
        //设定房间号
        if(recv.type==0){
            roomCount = recv.roomCount
            console.log('roomCount========>'+roomCount)

        }
        // 判断信息是否是发给自己的房间的
        if(recv.roomCount == roomCount){
            // 判断是否为自己发的信息
            if(recv.name != linkName){
                if(recv.type == 1){
                    //生成两个小兵
                    
                }else if(recv.type == 2){
                    //小兵增强
                }else if(recv.type == 3){
                    //显示聊天msg
                    console.log(recv.msg)
                }else if(recv.type == 4){
                    //调用获胜方法赢了
                    alert('you win')
                    //调用断开连接方法
                    websocketClose()
                }else if(recv.type == 5){
                    //时间到，对比小兵enemy数量，判断输赢
                    ////调用断开连接方法
                    if(recv.enemy<this.enemyExisted){
                        alert("you losed")
                    }else{
                        alert('you win')
                    }
                    websocketClose()
                }
            }
        }
    }
    
}
 //websocket小兵死亡type：1，被增强小兵type：2，发送聊天信息type：3，胜负提示type：4，时间结束对比双方小兵数type:5
		// 通过roomCount判断发给哪个房间组
		// 通过name确定是否为对方发送的信息
		// 通过type确定为哪种信息
		//type:0,msg:
		//{type:0,score:}
		// type:1,msg：
		// {type:1,roomCount: ,name:''}
		// type:2,msg：
		// {type:2,roomCount: ,name:''}
		// type:3,msg：
		// {type:3,roomCount: ,name:','msg:''}
		// type:4,msg：
		// {type:4,roomCount: ,name:''}
		//type:5,msg:
		//{type:5,roomConut: ,name:'',enemy: }

function websocketSend(msg){
    ws.send(JSON.stringify(msg))
}
function websocketClose(){
    ws.close()
    console.log('success close websocket link')
    websocketLink()
}


            // //绑定连接事件
            // websocketLink();


            //websocket 判断小兵是否减少，如果减少，向对方发送信息
        // 初始小兵数量
        //记录初始小兵数量
        // var enemies = 0
        // setInterval(()=>{
        //     // 300毫秒，检测小兵数量，少了就发送小兵死亡信息，少几个发几次，多了就把当前小兵数赋值给enemies，方便之后的比对
        //     if(enemies > this.enemyExisted){
        //         var num = enemies-this.enemyExisted
        //         for(var i = 0;i<num;i++){
        //             websocketSend({type:1,roomCount:this.roomCount,name:this.name})
        //         }
        //     }else{
        //         enemies = this.enemyExisted
        //     }
        // },300)



        //websocket发送失败信息
        // websocketSend({type:4,roomCount:this.roomCount,name:this.name})
        // 关闭websocket连接
        // websocketClose()


         // 发送自己的小兵剩余信息给对方
        //  websocketSend({type:5,roomCount:this.roomCount,name:this.name,enemy:this.enemyExisted})
