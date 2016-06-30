var crypto = require("crypto");
var path = require("path")
var config = require("config");
module.exports = function (app, env) {
	var auth = {
        jsapi_ticket: app.ticket,
        noncestr: Math.random().toString(36).substr(2, 15),
        timestamp: parseInt(Date.now() / 1000) + '',
        url: path.join(config.host.base, env.path)
    }
    var authstr = Object.keys(auth).map(function(key){return `${key}=${auth[key]}`}).join("&");
    var shasum = crypto.createHash('sha1');
    shasum.update(authstr);
    var signature = shasum.digest('hex');
    return {
        appid : config.appid,
        signature: signature,
        auth: auth
    }
}