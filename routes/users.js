var express = require('express');
var _ = require('lodash');
var router = express.Router();
var User = require('../model/user');

/* GET users listing. */
router.get('/users', function(req, res, next) {
	//返回只包含一个键值name、age的所有记录
	// find(Conditions,field,callback);
	//	User.find({},{name:1, email:1, _id:0}, function(err,docs){
	User.find({}, function(err,docs){
		res.json({status: 1, msg: "", data: docs})
	})
});

router.get('/user/:name', function (req, res, next) {
	// res.send('respond a');
	const user = User.loadByName(req.params.name, function (err, rs) {
		if (err) return next(err);
		res.json({status: 1, msg: "", data: rs})
	});
});

router.get('/user', function(req, res, next) {
	res.json({status: 1, msg: "", data: req.session.user});
});

router.post('/user', function(req, res, next) {
	console.debug(req.body);
	res.json({status: 1, msg: "", data: req.body})
});

router.post('/user/login', function(req, res, next) {
	// res.send('respond a');
	console.log(req.body)
	const user = req.body;
	User.loadByName(user.name, function (err, rs) {
		if (err) return next(err);
		if(_.isEmpty(rs)) {
			console.info("[INFO] user doesn't exist!!");
			res.json({status: 0, msg: "登录失败!"});
			return;
		}
		console.log('user: ', rs);
		req.session.user = rs;
		req.session.save();
		res.json({status: 1, msg: "登录成功!", data: rs});
	});
});

router.post('/user/register', function(req, res, next) {
	// res.send('respond a');
	console.log(req.body)
	const user = req.body;
	User.loadByName(user.name, function (err, rs) {
		if (err) return next(err);
		if(!_.isEmpty(rs)) {
			console.info("[INFO] user doesn't exist!!");
			res.json({status: 0, msg: "已存在用户!"});
			return;
		}

		if (_.isEmpty(user.name)) return next({message: "用户名不能为空!"});
		console.log(user);
		var UserEntity = new User({name: user.name});
		UserEntity.save(function (err, rs) {
			if (err) {
				console.error(err);
			} else {
				req.session.user = rs;
				req.session.save();
				res.json({status: 1, msg: "注册成功!", data: rs});
			}
		});
	});
});

router.post('/user/logout', function(req, res, next) {
	req.session.destroy();
	res.json({status: 1, msg: "登出成功!"});
});

module.exports = router;
