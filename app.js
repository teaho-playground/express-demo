var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
var bodyParser = require('body-parser');
var autoRoutes = require('express-auto-routes');
var CORS = require('./middlewares/CORS');
var simpleLogger = require('./middlewares/simpleLogger');
var simpleUserSession = require('./middlewares/simpleUserSession');
var mongoose = require('mongoose');
var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// init database
global.db = mongoose.createConnection(config.db);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(CORS);
app.use(simpleLogger);
app.use(simpleUserSession);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

var routes = autoRoutes(app);
console.log(__dirname);
console.log(__filename);
routes(path.join(__dirname, './controllers'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// app.use(function(req, res, next) {
// 	res.status(404);
// 	next({ _code: 404, _msg: 'Page not found' });
// });

// error handler
app.use(function (err, req, res, next) {
	// console.error(err);
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	// res.render('error');
	// if (err.status) res.status(err.status);

	res.json({
		code: err.code || 0,
		msg: err.message || "",
		stack: err.stack || ""
	});
});


// module.exports = app;

if (!module.parent) {
	var PORT = 22220;
	console.log('[INFO] Msg board RESTful API listening at localhost:%s', PORT);
	app.listen(PORT);
} else {
	module.exports = app;
}
