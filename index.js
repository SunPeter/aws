var fs = require("fs");
var koa = require("koa")
var app = koa()
var Router = require('trie-koa-router')
var router = new Router()
var _static = require('koa-static')
var request = require('koa-request')
var koaBody   = require('koa-body')
app.use(_static('./assets'));
app.use(koaBody({formidable:{uploadDir: __dirname}}))

var handlebars = require("koa-handlebars");
app.use(handlebars({
    viewsDir: "views",
    helpers: require("./extention/render.js")
}));

// must before router.dispatcher()
var login = require("./middleware/login")(app);
app.use(login);

app.use(router.dispatcher())

router.route(['/wx/index','/wx/index1', '/wx/index2', '/wx/index3']).get(function* (next) {
    var signature = require("./service/signature")(app, this);
    yield this.render("wx_index", signature);
});

router.route(['/','/index']).get(function* (next) {
    var ua = this.req.headers['user-agent'];
    if (/(iPhone|Android|MicroMessenger)/.test(ua)) {
        yield this.render("index_mobile", {});
    } else {
        yield this.render("index", {});
    }
});

router.route(['/join']).get(function* (next) {
    yield this.render("join", {});
});

router.route(['/contact']).get(function* (next) {
    yield this.render("contact", {});
});

router.route(['/about']).get(function* (next) {
    yield this.render("about", {});
});

router.route("/api/joinus").post(function* (next) {
    var form = this.request.body;
    var res = yield request.post({
        url: "http://ideaology.cn/joinus.html",
        form: form
    });
    this.body = JSON.parse(res.body);
});

router.route("/api/contactus").post(function* (next) {
    var form = this.request.body;
    var res = yield request.post({
        url: "http://ideaology.cn/contactus.html",
        form: form
    });
    this.body = JSON.parse(res.body);
});
app.listen(8080)
