//引入必备依赖
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

//项目根目录
app.use(express.static(path.join(__dirname, 'public')));
//静态文件目录
var staticPath = path.join(__dirname, 'public');
// var rootPath=path.join(__dirname,'../');

//数据库初始化配置
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '10.3.70.132',
    port: '30772',
    user: 'root',
    password: 'ToNpxg699e',
    database: 'tower_defense_v4.0.1'
});

var urlEncodedParser = bodyParser.urlencoded({ extended: false })

//首页重定向
app.get('/index', function (req, res) {
    res.sendFile(staticPath + '/index.html');
})

//登录重定向
app.get('/login', function (req, res) {
    res.sendFile(staticPath + '/log.html');
})

//注册重定向
app.get('/regist', function (req, res) {
    res.sendFile(staticPath + '/log.html');
})

//注册
app.post('/regist', urlEncodedParser, function (req, res) {
    var userName = req.body.username;
    var password = req.body.password;
    var params = [userName, password];
    var sql = 'insert into users(name,password,score) values(?,?,0)';
    connection.query(sql, params, function (error, result) {
        if (error) {
            console.log('ERROR--' + error.message);
            return;
        }
        console.log('----------SELECT RESULT----------');
        console.log(result);
        console.log('----------------------------------\n\n');
    })
})

//登录
app.post('/login', urlEncodedParser, function (req, res) {
    var userName = req.body.username;
    var password = req.body.password;
    var params = [userName, password];
    var sql = 'select * from users where name=? and password=?';
    connection.query(sql, params, function (error, result) {
        if (error) {
            console.log('ERROR--' + error.message);
            return;
        }
        //登录失败
        if (result.length == 0) {
            console.log("用户名或者密码错误！");
            res.sendFile(staticPath + '/login_fail.html');
            return;
        }
        //登录成功
        //登录信息存入Session内，定位至首页（后续加）
        res.sendFile(staticPath + '/index.html');
    })
})

//监听
var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("访问地址为：http://%s:%s", host, port)
})