var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var db = require("./config/db");    // 链接数据库
var multiparty = require('multiparty');

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
      db.query(`INSERT into users(username, name, password, type) values ('${req.body.userName}', '${req.body.name}', '${req.body.passWord}', '2')`, function(err, data, fields) {
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

// 修改密码
app.get('/modifyPass', function(req, res, next) {
  let url = `UPDATE users SET password = '${req.query.password}', name = '${req.query.name}'  WHERE username = '${req.query.username}'`
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

// 获取所有商品
app.get('/getAllShopList', function(req, res, next) {
  let url = `SELECT * from brand1 
  UNION SELECT * from brand2 
  UNION SELECT * from brand3
  UNION SELECT * from brand4
  UNION SELECT * from brand5
  UNION SELECT * from brand6
  UNION SELECT * from brand7
  UNION SELECT * from brand8
  UNION SELECT * from brand9
  UNION SELECT * from brand10
  `
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

// 通过关键字搜索
app.get('/getAllShopListByKey', function(req, res, next) {
  let url = `SELECT * from brand1 where shopName like '${req.query.keyWord}'
  UNION SELECT * from brand2 where shopName like '%${req.query.keyWord}%'
  UNION SELECT * from brand3 where shopName like '%${req.query.keyWord}%'
  UNION SELECT * from brand4 where shopName like '%${req.query.keyWord}%'
  UNION SELECT * from brand5 where shopName like '%${req.query.keyWord}%'
  UNION SELECT * from brand6 where shopName like '%${req.query.keyWord}%'
  UNION SELECT * from brand7 where shopName like '%${req.query.keyWord}%'
  UNION SELECT * from brand8 where shopName like '%${req.query.keyWord}%'
  UNION SELECT * from brand9 where shopName like '%${req.query.keyWord}%'
  UNION SELECT * from brand10 where shopName like '%${req.query.keyWord}%'
  `
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

// 获取评论
app.get('/commentList', function(req, res, next) {
  let url = `SELECT * from commentList where commentId='${req.query.commentId}'`
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

// 获取评论（通过userIDd）
app.get('/commentListByuserId', function(req, res, next) {
  let url = `SELECT * from commentList where commentId='${req.query.commentId}' and userId='${req.query.userId}'`
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

// 添加评论
app.post('/addCommentId', function(req, res, next) {
  db.query(`INSERT into commentList(commentId, name, context, time, rate, userId) values ('${req.body.commentId}', '${req.body.name}', '${req.body.context}', '${req.body.time}', ${req.body.rate}, ${req.body.userId})`, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    }else {
      res.json({
        msg: 'success',
        code: 1,
        data: '添加成功'    // 返回数据
      });
    }
  })
})

// 查询用户名
app.get('/selectUserName', function(req, res, next) {
  db.query(`SELECT * from users where id=${req.query.id}`, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    };
    res.json({
      msg: 'success',
      data: data[0]    // 返回数据
    });
  });
})

// 获取地址列表（通过userid获取列表）
app.get('/getAddressList', function(req, res, next) {
  let url = `SELECT * from address where userId=${req.query.id}`
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

// 获取地址列表（通过id获取单条）
app.get('/getAddressById', function(req, res, next) {
  let url = `SELECT * from address where id=${req.query.id}`
  db.query(url, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    };
    res.json({
      msg: 'success',
      data: data[0]    // 返回数据
    });
  });
})

// 删除收货地址
app.post('/deleteAddressById', function(req, res, next) {
  db.query(`DELETE FROM address where id=${req.body.id}`, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    };
    res.json({
      msg: '删除成功',
      data: data    // 返回数据
    });
  });
})

// 管理员发货
app.get('/deliver', function(req, res, next) {
  console.log(req.query.id)
  let url = `UPDATE myshop SET state = 1 where id=${req.query.id}`
  db.query(url, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    };
    res.json({
      msg: 'success',
      data: data[0]    // 返回数据
    });
  });
})

// 修改收货地址 / 添加地址
app.post('/updateAddress', function(req, res, next) {
  if(req.body.id){
    db.query(`UPDATE address SET name = '${req.body.name}', address = '${req.body.address}', details = '${req.body.details}', postalCode = '${req.body.postalCode}', phone = '${req.body.phone}' where id = ${req.body.id}`, function(err, data, fields) {
      if (err) {
        console.log(err);
        return;
      };
      res.json({
        msg: '修改成功',
        data: data    // 返回数据
      });
    });
  } else {
    db.query(`INSERT into address(name, address, details, postalCode, phone, userId) values ('${req.body.name}', '${req.body.address}', '${req.body.details}', '${req.body.postalCode}', '${req.body.phone}', ${req.body.userId})`, function(err, data, fields) {
      if (err) {
        console.log(err);
        return;
      }else {
        res.json({
          msg: '添加成功',
          code: 1,
          data: req.body.id    // 返回数据
        });
      }
    })
  }
})

// 添加购物车
app.post('/addShopCar', function(req, res, next) {
  db.query(`SELECT * from shopCar where shopId='${req.body.shopName}_${req.body.shopId}'`, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    }else {
      if(data.length === 0){
        db.query(`INSERT into shopCar(imgUrl, userId, shopName, shopDescribe, shopPrice, number, shopId, commentId, color) values ('${req.body.imgUrl}', ${req.body.userId}, '${req.body.shopName}', '${req.body.shopDescribe}', ${req.body.shopPrice}, ${req.body.number}, '${req.body.shopName}_${req.body.shopId}', '${req.body.commentId}', '${req.body.color}')`, function(err, data, fields) {
          if (err) {
            console.log(err);
            return;
          }else {
            res.json({
              msg: 'success',
              code: 1,
              data: '添加成功'    // 返回数据
            });
          }
        })
      } else {
        db.query(`UPDATE shopCar SET imgUrl = '${req.body.imgUrl}', userId = ${req.body.userId}, shopName = '${req.body.shopName}', shopDescribe = '${req.body.shopDescribe}', shopPrice = ${req.body.shopPrice}, number = ${req.body.number}  WHERE shopId = '${req.body.shopName}_${req.body.shopId}'`, function(err, data, fields) {
          if (err) {
            console.log(err);
            return;
          };
          res.json({
            msg: 'success',
            data: '添加成功'     // 返回数据
          });
        });
      }
    }
  })
})

// 查询购物车
app.get('/getShopCar', function(req, res, next) {
  let url = `SELECT * from shopCar where userId=${req.query.id}`
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

// 删除购物车内商品
app.get('/deleteShopOfCar', function(req, res, next) {
  let url = `DELETE FROM shopCar where id=${req.query.id}`
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

// 加入我的商品
app.post('/addMyShop', function(req, res, next) {
  db.query(`INSERT into myShop(imgUrl, userId, shopName, shopDescribe, shopPrice, number, shopId, remarks, addressId, commentId, color, state) values ('${req.body.imgUrl}', ${req.body.userId}, '${req.body.shopName}', '${req.body.shopDescribe}', ${req.body.shopPrice}, ${req.body.number}, '${req.body.shopId}', '${req.body.remarks}', ${req.body.addressId}, '${req.body.commentId}', '${req.body.color}', 0)`, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    }else {
      if(req.body.id){
        db.query(`DELETE FROM shopCar where id=${req.body.id} `, function(err, data, fields) {
          if (err) {
            console.log(err);
            return;
          }
        })
      }
      let tableName = conversion(req.body.shopId.split('_')[0])
      let url = `UPDATE ${tableName} SET paymentNumber=paymentNumber+1 where shopName='${req.body.shopId.split('_')[0]}' and id=${req.body.shopId.split('_')[1]}`
      db.query(url, function(err, data, fields) {
        if (err) {
          console.log(err);
          return;
        }
      })
      res.json({
        msg: '购买完成',
        code: 1,
        data: req.body.id    // 返回数据
      });
    }
  })
})

// 获取我的商品(通过用户id)
app.post('/getMyShopByUserId', function(req, res, next) {
  db.query(`SELECT * from myShop where userId=${req.body.userId}`, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    }else {
      res.json({
        msg: '查询成功',
        code: 1,
        data: data    // 返回数据
      });
    }
  })
})

// 获取我的商品(通过id)
app.post('/getMyShopById', function(req, res, next) {
  db.query(`SELECT * from myShop where id=${req.body.id}`, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    }else {
      res.json({
        msg: '查询成功',
        code: 1,
        data: data[0]    // 返回数据
      });
    }
  })
})

// 获取我的商品(全部)
app.post('/getMyShop', function(req, res, next) {
  db.query(`SELECT * from myShop `, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    }else {
      res.json({
        msg: '查询成功',
        code: 1,
        data: data    // 返回数据
      });
    }
  })
})

// 添加意见反馈
app.post('/addFeedBack', function(req, res, next) {
  db.query(`INSERT into feedBack(userId, title, textarea, date, userName) values (${req.body.userId}, '${req.body.title}', '${req.body.textarea}', '${req.body.date}', '${req.body.userName}')`, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    }else {
      res.json({
        msg: '添加成功',
        code: 1,
        data: req.body.id    // 返回数据
      });
    }
  })
})

// 查询意见反馈
app.get('/getFeedBack', function(req, res, next) {
  db.query(`SELECT * from feedBack`, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    }else {
      res.json({
        msg: '查询成功',
        code: 1,
        data: data    // 返回数据
      });
    }
  })
})

// 上传图片
app.post('/uploadImg', function(req, res, next) {
  let form = new multiparty.Form()
  form.uploadDir = 'C:/Users/cxn/Desktop/毕设/demo/src/assets/images/' // 存放路径
  form.parse(req, function(err, fields, files){  //其中fields表示提交的表单数据对象，files表示提交的文件对象
    if(err){
      res.json({
        status:"1",
        msg:"上传失败！"+err
      })
    }else{
      var inputFile = files.file[0]
      var uploadedPath = inputFile.path
      var dstPath = 'C:/Users/cxn/Desktop/毕设/demo/src/assets/images/' + inputFile.originalFilename
      console.log(dstPath)
      fs.rename(uploadedPath, dstPath, function(err) {
        if(err){
          console.log('rename error: ' + err);
        } else {
          console.log('rename ok');                
        }
      })
      res.json({ 
        status:"0",
        msg:"上传成功！",
        imgSrc: files.image
      })
    }
  })
})

// 获取品牌总量
app.get('/getBrandTotal', function(req, res, next) {
  let tableName = conversion(req.query.brand)
  console.log(tableName)
  let url = `SELECT * from ${tableName}`
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

// 管理员添加商品
app.post('/addShop', function(req, res, next) {
  let tableName = conversion(req.body.shopName)
  db.query(`INSERT into ${tableName}(shopName, shopPrice, shopDescribe, storeFront, position, isMail, color, notes, discount, promotion, img, commentId, paymentNumber, comment) values ('${req.body.shopName}', '${req.body.shopPrice}', '${req.body.shopDescribe}', '${req.body.storeFront}', '${req.body.position}', ${req.body.isMail}, '${req.body.color}', '${req.body.notes}', '${req.body.discount}', '${req.body.promotion}', '${req.body.img}', '${req.body.commentId}', ${req.body.paymentNumber}, '${req.body.comment}')`, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    }else {
      res.json({
        msg: '添加成功',
        code: 1,
        data: req.body.id    // 返回数据
      });
    }
  })
})

// 管理员删除商品
app.post('/deleteShop', function(req, res, next) {
  let tableName = conversion(req.body.shopName)
  db.query(`DELETE FROM ${tableName} where id=${req.body.id}`, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    };
    db.query(`DELETE FROM commentList where commentId='${req.body.commentId}'`, function(err, data, fields) { // 删除该商品的评论
      if (err) {
        console.log(err);
        return;
      };
    });
    res.json({
      msg: '删除成功',
      data: data    // 返回数据
    });
  });
})

// 管理员修改商品
app.post('/updateShop', function(req, res, next) {
  let tableName = conversion(req.body.shopName)
  let url = `UPDATE ${tableName} SET shopPrice = ${req.body.shopPrice}, shopDescribe = '${req.body.shopDescribe}', position = '${req.body.position}', isMail = ${req.body.isMail}, discount = '${req.body.discount}', promotion = '${req.body.promotion}' where id=${req.body.id}`
  db.query(url, function(err, data, fields) {
    if (err) {
      console.log(err);
      return;
    }
    res.json({
      msg: '修改成功',
      data: data    // 返回数据
    });
  })
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

conversion = (str) => {
  switch(str){
    case "雅诗兰黛":
      return 'brand1'
    case "兰蔻":
      return 'brand2'
    case "欧莱雅":
      return 'brand3'
    case "珀莱雅":
      return 'brand4'
    case "Chanel":
      return 'brand5'
    case "自然堂":
      return 'brand6'
    case "迪奥":
      return 'brand7'
    case "半亩花田":
      return 'brand8'
    case "韩束":
      return 'brand9'
    case "圣罗兰":
      return 'brand10'
  }
}