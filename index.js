var koa = require("koa")
var app = koa()
var Router = require('trie-koa-router')
var router = new Router()
app.use(router.dispatcher())

router.route('/').get(function* (next) {
  this.body = '振靖 你丫现在辞职 我还佩服你'
})

app.listen(8080)
