// 导包
const ws = require('nodejs-websocket')
// 房间号，从1开始
let roomCount = 1
// 连接人数，从1开始
let count = 1
// 端口号
const PORT = 8888
// 接受的信息
let recv
//广播接收信息转json
let recvData
//广播json信息转string
let toMsg
// 当前连接
let nowConnect
// 匹配对手的积分差值
var differ = 1000
// 开启服务器
const server = ws.createServer(connect =>{
	console.log("have user connected!")
	nowConnect = connect
	// 设置当前连接房间号-1，代表还没有连接，等待对手匹配
	connect.roomCount = -1
	let onlineSign = JSON.stringify({type:7,onlineNum:count})
	broadcast(onlineSign)
	console.log(count)
	// 有消息发送到服务端时触发
	connect.on('text',data=>{
		// console.log(data)
		// 如果当前连接的房间号为负，进入匹配函数
		if(connect.roomCount<0){
			// 获取接受的信息
			recv = JSON.parse(data)
			// 获取当前连接的积分
			connect.score = recv.score
			// 获取连接名
			connect.name = recv.name
			// 当前连接时第几号
			connect.count = count
			//匹配函数
			matching()
			// 连接人数+1
			count++
			return
		}
		// 将受到的消息原封不动广播出去
		broadcast(data)
		
	})
	// 有链接断开时触发
	connect.on('close',()=>{
		console.log('have user close link')
		count--
		
	})
	// 断开连接会抛出异常，捕获异常不会终止服务器
	connect.on('error',()=>{
		console.log('have exception of link')
	})
})

//匹配相似积分的人
function matching(){
	try{
		// 遍历当前连接数组
		server.connections.forEach(item=>{
			// 判断是否为自（不能匹配自己）
			if(item.count != count){
				// 判断遍历的连接是否已经有房间
				if(item.roomCount<0){
					// 判断遍历的连接和当前连接的积分差值是否在匹配范围
					if(Math.abs(item.score-recv.score)<=differ){
						// 分配房间
						item.roomCount=roomCount
						nowConnect.roomCount=roomCount			
						// 给对应的连接发送房间
						item.send(JSON.stringify({type:0,roomCount:roomCount}))
						nowConnect.send(JSON.stringify({type:0,roomCount:roomCount}))
						// 房间号总数+1，之后接着分配
						roomCount++
						// 使用异常跳出遍历
						throw new Error('1')
					}
				}
			}
		})
	}catch(e){
		if(e.message == '1') 
		{
			console.log('success matching')
		}
	}
	
}

//广播消息
function broadcast(msg){
	recvData = JSON.parse(msg)
	recvData.onlineNum = count
	toMsg = JSON.stringify(recvData)
	// 遍历连接数组，发送数据
	server.connections.forEach(item=>{
		item.send(toMsg)
	})
}

// 监听端口
server.listen(PORT,()=>{
	console.log('success listen port'+PORT)
})
