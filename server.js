//部署时须引入四个必备依赖
//npm install express
//npm install mysql
//npm install express-session
//npm install ejs
//引入必备依赖
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var session=require('express-session');
//var cookieParser=require('cookie-parser')

//项目根目录
app.use(express.static(path.join(__dirname, 'public')));

//静态文件目录
var staticPath = path.join(__dirname, 'public');

//设置渲染引擎的模板
app.set('views', staticPath); //设置模板的目录
app.set('view engine', 'html'); // 设置解析模板文件类型：这里为html文件
app.engine('html', require('ejs').__express); // 使用ejs引擎解析html文件中ejs语法

app.use(bodyParser.json()); // 使用bodyparder中间件，
app.use(bodyParser.urlencoded({ extended: true }));

//cookie解析
//app.use(cookieParser('TowerDefence'));
//设置session
app.use(session({
    secret:'TowerDefence',//本地存储的cookie key值
    resave:true,//客户端多请求时的请求覆盖
    saveUninitialized:true,//初始化session
}))

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
    console.log("进入了首页......")
    //判断Session是否有效
    if(req.session.loginUser){
        var name= req.session.loginUser.name;
        var nickName=req.session.loginUser.nickName;
        var score=req.session.loginUser.score;
        var count=req.session.loginUser.count;
        console.log(name);   
        console.log(nickName); 
        console.log(score);
        console.log(count);
        res.render('index',{
            userName : name,
            nickName:nickName,
            score:score,
            count:count
        });
    }else{
        res.redirect('login');
    }
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
    var userName = req.body.userName;
    var password = req.body.password;
    var params = [userName, password];
    var sql = 'insert into users(name,password,score) values(?,?,0)';
    connection.query(sql, params, function (error, result) {
        if (error) {
            console.log(sql);
            console.log(params);
            console.log('ERROR--' + error.message);
            return;
        }
        console.log('----------SELECT RESULT----------');
        console.log(result);
        console.log('----------------------------------\n\n');
        console.log('test------')
    })
    res.redirect('/index');
})

//登录，post请求，从数据库中选择相应字段匹配 
app.post('/login', urlEncodedParser, function (req, res) {
    var userName = req.body.username;
    var password = req.body.password;
    var params = [userName, password];
    var sql = 'select id,name,nickname,score from users where name=? and password=?';
    connection.query(sql, params, function (error, result) {
        if (error) {
            console.log('ERROR--' + error.message);
            return;
        }
        //登录失败，输出相关提示
        if (result.length == 0) {
            console.log("用户名或者密码错误！");
            // res.sendFile(staticPath + '/login_fail.html');
            res.json({msg:"用户名或密码错误，请重新登录！"});
        }
        
        //登录成功，取出返回值
        var data=result[0];
        var id=data.id;
        var countSql='select id from game_info_pvp where winner=?';
        connection.query(countSql, id, function (error, counts) {
            if (error) {
                console.log('ERROR--' + error.message);
                return;
            }
            var count=counts.length;
            console.log(count);
            var user={
                'name':data.name,
                'nickName':data.nickname,
                'score':data.score,
                'count':count
            }
            console.log("static:"+staticPath);
            console.log(user);
            //登录信息存入Session内，定位至首页
            var sess=req.session;
            sess.loginUser=user;
            console.log("session:"+sess.loginUser);
            //获取的IP有前缀，需用正则表达式处理
            var ips=req.ip.match(/\d+\.\d+\.\d+\.\d+/)
            console.log(ips);
            console.log(ips[0]);
            var ip=ips[0];
            //存储登录信息
            var loginInfoSql='insert into login_info(login_ip) values(?)';
            connection.query(loginInfoSql, ip, function (error, infoResult) {
                if (error) {
                    console.log('ERROR--' + error.message);
                    return;
                }
                console.log('----------SELECT RESULT----------');
                console.log(infoResult);
                console.log(infoResult+"test");
                console.log('----------------------------------\n\n');
            })
            res.redirect('/index');
        })
    })
})

//注销登录
app.get('/logout', function (req, res) {
    console.log("调用了注销方法");
    console.log(req.session.loginUser);
    // 删除session
    req.session.loginUser = null; 
    res.redirect('login');
});


//监听
var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("访问地址为：http://%s:%s", host, port)
})