//引入数据库模块

var mongoose = require("mongoose");
var config = require('../config');


//连接本地名为test的数据库，格式
var db = mongoose.createConnection(config.db);

//用Schema定义集合结构

var UserSchema = new mongoose.Schema({

	name: { type: String, default: '' },
	email: { type: String, default: '' },

});

//创建model,在内存中创建结构为TestSchema名为test1的集合

var UserModel = db.model("user", UserSchema );

//插入数据到内存中的test1集合

var UserEntity = new UserModel({
	name : "helloworld",
	email: "helloworld@qq.com"
});

var UserEntity2 = new UserModel({
	name : "tea",
	email: "tea2015@qq.com"
});

//将test1写入到数据库中

UserEntity.save(function(error,doc){
	if(error){
		console.log("error :" + error);
	}else{
		console.log(doc);
	}
});

UserEntity2.save();