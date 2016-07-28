var request = require('koa-request');
module.exports = function () {
    var options = {
        url: "http://idea-admin.ideaology.cn/index.php?m=case&a=case_list",
    };
    return request(options);
}
