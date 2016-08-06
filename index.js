var fs = require("fs");
var path = require("path");
var koa = require("koa")
var locale = require('koa-locale') //  detect the locale
var i18n = require('koa-i18n')
var app = koa()
var Router = require('trie-koa-router')
var router = new Router()
var _static = require('koa-static')
var request = require('koa-request')
var koaBody   = require('koa-body')
var cms = require("./service/cms");
app.use(_static('./assets'));
app.use(koaBody({formidable:{uploadDir: __dirname}}))
locale(app)
// Compatible `this.locals`.
app.use(function *(next) {
  this.locals = this.state;
  yield *next;
});
app.use(i18n(app, {
  directory: path.join(__dirname, './i18n'),
  locales: ['zh-CN', 'en'], //  `zh-CN` defualtLocale, must match the locales to the filenames
  defaultLocale: 'zh-CN',
  enables: ['Query'],
  modes: [
    'query'                //  optional detect querystring - `/?locale=en-US`
  ]
}))
var handlebars = require("koa-handlebars");
app.use(handlebars({
    viewsDir: "views",
    helpers: require("./extention/render.js")
}));

// must before router.dispatcher()
var login = require("./middleware/login")(app);
app.use(login);

app.use(router.dispatcher())

//微信活动页
router.route(['/wx/index','/wx/index1', '/wx/index2', '/wx/index3']).get(function* (next) {
    var signature = require("./service/signature")(app, this);
    yield this.render("wx_index", signature);
});


router.route(['/','/index']).get(function* (next) {
    var ua = this.req.headers['user-agent'];
    var locals = this.i18n.locales[this.i18n.locale];
    var cmsRes = yield cms();
    locals.index.cmsData = JSON.parse(JSON.parse(cmsRes.body));
    locals.index.cmsData.forEach(item => {
        item.story_video_link = item.story_video_link.replace(/&amp;/g, "&")
    });
    if (/(iPhone|Android|MicroMessenger)/.test(ua)) {
        yield this.render("index_mobile",locals);
    } else {
        yield this.render("index",locals);
    }
});

router.route(['/join']).get(function* (next) {
    var locals = this.i18n.locales[this.i18n.locale];
    yield this.render("join", locals);
});

router.route(['/contact']).get(function* (next) {
    var locals = this.i18n.locales[this.i18n.locale];
    yield this.render("contact", locals);
});

router.route(['/about']).get(function* (next) {
    var locals = this.i18n.locales[this.i18n.locale];
    yield this.render("about", locals);
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
