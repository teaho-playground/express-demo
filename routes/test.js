var express = require('express');
var router = express.Router();

/* GET test. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
	res.json({
		animal: 'squirrel',
		bodyPart: 'tail',
		adjective: 'bushy',
		noun: 'heck',
	});
});

module.exports = router;
