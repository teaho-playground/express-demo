// var userService = require('../services/userService');

module.exports = function (req, res, next) {
  // if (!req.session) req.session = {};
  // req.session.userData = userService.isLogin();
	const excludePaths = ['/user/login',
	];
	const url = req.url;
	if(!req.session.user) {
		if (!excludePaths.find((elem) => elem===url )) {
			res.json({status: 403, msg: "用户未登录"});
			return;
		}
	}

  next();
};
