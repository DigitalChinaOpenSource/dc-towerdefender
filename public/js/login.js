/**
 * express接收html传递的参数
 */
 var express=require('express');
 var app=express();
 var mysql=require('mysql');
  
 /**
  * 配置MySql
  */
 var connection = mysql.createConnection({ 
  host  : '10.3.70.132',  //远程服务地址
  user  : 'admin',
  password : 'r^hpzHB<MTASkp0V',
  database : 'admin',
  port:'30772'
 });
 connection.connect();

//  var urlEncodedParser = bodyParser.urlencoded({ extended: false })

//首页重定向
app.get('../log.html', function (req, res) {  //获取前端页面
    console.log("正在进入登录页...");
    res.sendFile(__dirname+'/'+'../log.html');
    console.log("进入登录页面成功！");
})

// //注册
// app.post('/regist',function (req, res) {  //post请求数据库
//     var userName = req.body.username;
//     var password = req.body.password;
//     var params = [userName, password];
//     var sql='insert into towerdefence(username,password,score) values(?,?,100)';  //向数据库表中插入字段数据
//     connection.query(sql, params, function (error, result) {
//         if(error){
//             console.log('ERROR--'+error.message);
//             return;
//         }
//         console.log('----------SELECT RESULT----------');
//         console.log(result);
//         console.log('----------------------------------\n\n');
//     })
//     connection.end();
// })

登录
app.post('../log.html',function(req,res){   //登录请求
    var userName = req.body.username;
    var password = req.body.password;
    var params = [userName, password];
    var sql='select * from towerdefence where username=? and password=?';
    connection.query(sql,params,function(error,result){
        if(error){
            console.log('ERROR--'+error.message);
            return;
        }
        if(result.length==0){
            console.log("用户名或者密码错误！");
            res.sendFile(__dirname+'/'+'../index.html');  //转至游戏首页
            return;
        }
        //登录信息存入Session内，定位至首页

    })

})

//监听
// var server = app.listen(8081, 'localhost',function () {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log("访问地址为：http://%s:%s", host, port);
// })