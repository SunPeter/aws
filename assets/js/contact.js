$(function() {
    var content = $(".content");
    $(".menu li").on("click", function () {
        var target = $(this);
        target.siblings().children("a").removeClass("active");
        target.children("a").addClass("active");
        content.removeClass("bus");
        if (target.index() === 1) {
            content.addClass("bus");
        }

    })
    $(".j-datapicker").datepicker();

    $(".j-sendbtn1").on("click", function () {
        var name = $("#form1 .j-name").val(),
        email = $("#form1 .j-email").val(),
        business_info = $("#form1 .j-describe").val(),
        self_desc = $("#form1 .j-self_desc").val(),
        feedback1 = $("#form1 .j-feedback1").val(),
        feedback2 = $("#form1 .j-feedback2").val(),
        project_end_time = $("#form1 .j-project_end_time").val(),
        project_budget = $("#form1 .j-project_budget").val(),
        other = $("#form1 .j-other").val();
        if (!name || !email || !business_info) {
            alert("您填写的信息不完整");
            return;
        }
        var data = {
            name: name,
            business_info: business_info,
            email: email,
            self_desc: self_desc,
            feedback1: feedback1,
            feedback2: feedback2,
            project_end_time:project_end_time,
            project_budget: project_budget,
            other: other
        }
        $.post("/api/contactus", data, function (res) {
            alert(res.message);
            if(200==res.status){
                location.reload();
            }
        })
    })

    $(".j-sendbtn2").on("click", function () {
        var name = $("#form2 .j-name").val(),
        email = $("#form2 .j-email").val(),
        business_info = $("#form2 .j-describe").val(),
        other = $("#form2 .j-other").val();
        if (!name || !email || !business_info) {
            alert("您填写的信息不完整");
            return;
        }
        var data = {
            name: name,
            business_info: business_info,
            email: email,
            self_desc: "",
            feedback1: "",
            feedback2: "",
            project_end_time:"",
            project_budget: "",
            other: other
        }
        $.post("/api/contactus", data, function (res) {
            alert(res.message);
            if(200==res.status){
                location.reload();
            }
        })
    })
});
