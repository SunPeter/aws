var request = require('koa-request');
var config = require("config");
module.exports = function () {
	var host = config.host.api,
		appid = config.appid,
		secret = config.secret;
	var options = {
        url: `${host}/cgi-bin/token`,
        qs: {
            grant_type: "client_credential",
            appid: appid,
            secret: secret
        }
    };
    return request(options);
}