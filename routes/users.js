var express = require('express');
var router = express.Router();
var User = require('../model/user');

/* GET users listing. */
router.get('/users', function(req, res, next) {
	//返回只包含一个键值name、age的所有记录
	// find(Conditions,field,callback);
	//	User.find({},{name:1, email:1, _id:0}, function(err,docs){
	User.find({}, function(err,docs){
		//docs result set
		console.debug(docs);
		res.json(docs);
	})
});

router.get('/user/:name', function (req, res, next) {
	// res.send('respond a');
	const user = User.loadByName(req.params.name, function (err, rs) {
		if (err) return next(err);
		res.json(rs)
	});
});

router.post('/user', function(req, res, next) {
	// res.send('respond a');
	console.debug(req.body)

	res.json(req.body);
});

module.exports = router;
