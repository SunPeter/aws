var request = require('koa-request');
var config = require("config");
module.exports = function (access_token) {
	var host = config.host.api;
    var options = {
        url: `${host}/cgi-bin/ticket/getticket`,
        qs: {
            access_token: access_token,
            type: "jsapi"
        }
    };
    return request(options);
}