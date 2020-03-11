var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var db = require("./config/db");    // 链接数据库

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())   
app.use(express.static('./'));

// 创建接口

// 登陆
app.post('/login', function(req, res, next) {
  db.query(`SELECT * from users where username='${req.body.userName}' and password='${req.body.passWord}' and type=${req.body.type}`, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    };
    res.json({
      msg: 'success',
      data: data    // 返回数据
    });
  });
})

// 注册
app.post('/register', function(req, res, next) {
  /* console.log(req.body) */
  db.query(`SELECT * from users where username='${req.body.userName}'`, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    };
    if(data.length !== 0){
      res.json({
        msg: 'success',
        code: 0,
        data: '该用户已存在'    
      })
    } else {
      db.query(`INSERT into users(username, password, type) values ('${req.body.userName}', '${req.body.passWord}', '2')`, function(err, data, fields) {
        if (err) {
          console.log(err);
          return;
        }else {
          res.json({
            msg: 'success',
            code: 1,
            data: '注册成功'    // 返回数据
          });
        }
      })
    }
  });
})

// 获取商品品牌
app.get('/getShopBrand', function(req, res, next) {
  let url = ''
  if(req.query.id === undefined){
    url = `SELECT * from brand`
  } else {
    url = `SELECT * from brand where id=${req.query.id}`
  }

  db.query(url, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    };
    res.json({
      msg: 'success',
      data: data    // 返回数据
    });
  });
})

// 获取商品列表
app.get('/getShopList', function(req, res, next) {
  let url = `SELECT * from ${req.query.id}`
  db.query(url, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    };
    res.json({
      msg: 'success',
      data: data    // 返回数据
    });
  });
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})