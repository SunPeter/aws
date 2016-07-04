var request = require('koa-request');
var config = require("config");
module.exports = function (ticket) {
	var host = config.host.api;
    var options = {
        url: "http://mp.weixin.qq.com/debug/cgi-bin/ticket/check",
        qs: {
            ticket: ticket,
        }
    };
    return request(options);
}