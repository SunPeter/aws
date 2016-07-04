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
app.use(router.dispatcher())

router.route('/wx/index').get(function* (next) {
    yield this.render("wx_index", {});
});

router.route(['/','/index']).get(function* (next) {
    yield this.render("index", {});
});

app.listen(8080)
