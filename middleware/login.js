var getToken = require("../service/getToken");
var getTicket = require("../service/getTicket");
var checkTicket = require("../service/checkTicket");
module.exports = function(app) {
    return function*(next) {
        app.ticket = "kgt8ON7yVITDhtdwci0qeYvFergJmeNl2u8ZkGCb8BEZRNM6PmeyO3riIUxofnH2OsD9hPebUQfe87QT5Dr40A";
        if (app.ticket && app.ticket_expires && ( (Date.now() - app.ticket_expires) / 1000 ) > 7000 || !app.ticket) {
            yield createTicket(app);
        }
        yield * next;
    }
}

function* createTicket(app) {
    var res = yield getToken();
    var info = JSON.parse(res.body);
    app.access_token = info.access_token;
    console.log("token:", app.access_token);

    res = yield getTicket(app.access_token);
    info = JSON.parse(res.body);
    app.ticket = info.ticket;
    console.log("ticket:", app.ticket)

    app.ticket_expires = Date.now();
}