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

router.route('/wx/index').get(function* (next) {
    var signature = require("./service/signature")(app, this);
    yield this.render("wx_index", signature);
});

router.route(['/','/index']).get(function* (next) {
    yield this.render("index", {});
});

app.listen(8080)
