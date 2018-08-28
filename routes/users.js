var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/user/:id', function(req, res, next) {
	// res.send('respond a');
	res.json({name: "test", email: "test@qq.com"});
});

router.post('/user', function(req, res, next) {
	// res.send('respond a');
	console.debug(req.body)
	res.json(req.body);
});

module.exports = router;
