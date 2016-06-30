var getToken = require("../service/getToken");
var getTicket = require("../service/getTicket");
module.exports = function(app) {
    return function*(next) {
        app.ticket = "kgt8ON7yVITDhtdwci0qeYvFergJmeNl2u8ZkGCb8BHxzyO0ZOxB72_faGWd-OMWO8PPtBJaZ_FJAmtsjMVrEg";
        if (!app.ticket) {
            var res = yield getToken();
            var info = JSON.parse(res.body);
            app.access_token = info.access_token;
            console.log(app.access_token);

            res = yield getTicket(app.access_token);
            info = JSON.parse(res.body);
            app.ticket = info.ticket;
            console.log(app.ticket)
        }
        yield * next;
    }
}