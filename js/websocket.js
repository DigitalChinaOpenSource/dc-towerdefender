var ws
var roomCount
var linkName
var score
var ip='ws://localhost:8888'
function websocketLink(){
    ws = new WebSocket(ip)
    ws.onopen = function(){
        console.log('success liked the server')
        var i = parseInt(Math.random()*5)
        console.log('score======>'+i)
        websocketSend({type:0,score:i})
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
                }else if(recv.type == 4){
                    //调用获胜方法赢了
                    alert('you win')
                    //调用断开连接方法
                    this.close()
                }else if(recv.type == 5){
                    //时间到，对比小兵enemy数量，判断输赢
                    ////调用断开连接方法
                    if(recv.enemy<this.enemyExisted){
                        alert("you losed")
                    }else{
                        alert('you win')
                    }
                    this.close()
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
    ws.onclose()
    websocketLink()
}