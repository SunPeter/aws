$(function() {
    $(".j-joinbtn").on("click", function () {
        var name = $.trim($(".j-name").val()),
            phone =$.trim($(".j-phone").val()),
            remark = $.trim($(".j-remark").val());
        var data = {
            name: name,
            contact_type: phone,
            remark: remark
        }
        $.post("/api/joinus", data, function (res) {
            if(200==res.status){
                location.reload();
            }
        })

    })
});
