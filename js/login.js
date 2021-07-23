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
  host  : 'localhost',
  user  : 'root',
  password : 'password123',
  database : 'towerdefence_db',
  port:'3306'
 });
 connection.connect();

 app.get('/',function (req,res) {

    res.sendfile(__dirname + "/" + "../index.max.html" );
 })
  
 /**
  * 实现登录验证功能
  */
 app.get('/login',function (req,res) {
  var name=req.query.name;
  var pwd=req.query.pwd;
  
  var selectSQL = "select * from test where name = '"+name+"' and password = '"+pwd+"'";
  connection.query(selectSQL,function (err,rs) {
   if (err) throw err;
   console.log(errs);
   //res.sendfile(__dirname + "/" + "OK.html" );
  })
 })
  
 //app.get('/register.html',function (req,res) {
 // res.sendfile(__dirname+"/"+"register.html");
 //})         
        

 //注册
app.post('/', function (req, res) {
    var userName = req.body.name;
    var password = req.body.pwd;   
    var params = [userName, password];
    var sql='insert into test(name,password,score) values(?,?,0)';
    connection.query(sql, params, function (error, result) {
        if(error){
            console.log('ERROR--'+error.message);
            return;
        }
        console.log('----------SELECT RESULT----------');
        console.log(result);
        console.log('----------------------------------\n\n');
    })
    connection.end();
})

 /**
  * 实现注册功能
  
 app.get('/register',function (req,res) {
  var name=req.query.name;
  var pwd=req.query.pwd;
  var user={uname:name,pwd:pwd};
  connection.query('insert into test set ?',user,function (err,rs) {
   if (err) throw err;
   console.log('ok');
   res.sendfile(__dirname + "/" + "../index.max.html" );
  })
 })
*/
 var server=app.listen(7744,function () {
  console.log("服务启动成功！");
 }) 