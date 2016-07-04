var crypto = require("crypto");
var url = require("url")
var config = require("config");
module.exports = function (app, env) {
    var path = url.resolve(config.host.base, env.req.url);
    // if (path.endsWith("/")) {
    //     console.log(11111)
    //     path = path.substr(0, path.length - 1);
    // }
	var auth = {
        jsapi_ticket: app.ticket,
        noncestr: Math.random().toString(36).substr(2, 15),
        timestamp: parseInt(Date.now() / 1000) + '',
        url: path
    }
    var authstr = Object.keys(auth).map(function(key){return `${key}=${auth[key]}`}).join("&");
    var shasum = crypto.createHash('sha1');
    shasum.update(authstr);
    var signature = shasum.digest('hex');
    console.log(authstr);
    console.log(signature);
    return {
        appid : config.appid,
        signature: signature,
        auth: auth
    }
}