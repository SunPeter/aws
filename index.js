var koa = require("koa")
var app = koa()
var Router = require('trie-koa-router')
var router = new Router()

var _static = require('koa-static');
app.use(_static('./assets'));


var handlebars = require("koa-handlebars");
app.use(handlebars({
    viewsDir: "views"
}));

// must before router.dispatcher()
var login = require("./middleware/login")(app);
app.use(login);

app.use(router.dispatcher())

router.route(['/', '/ssd']).get(function* (next) {
	var signature = require("./service/signature")(app, this);
    yield this.render("index", signature);
});

app.listen(8080)
