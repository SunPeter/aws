;$(function() {
	var wrap = $("#wrap"), player = $("#video_iframe"), screen_width = document.documentElement.clientWidth;
	window.onhashchange = function () {
		var hash = location.hash.match(/#!(.+)$/);
		var menu = hash && hash[1] || "";
		wrap.removeClass();
		switch (menu) {
			case "business":
				wrap.addClass("three");
				break;
			case "join":
				wrap.addClass("two");
				break;
			case "contact":
				wrap.addClass("one");
				break;
			default:
				return;
		}
	}

	var list = [{
		content: '<div class="slider-item"><p class="p1">来这里，享受最专业的</p><p class="p1" style="margin-bottom: .10rem;">创意视频&nbsp;制作服务</p><p>“我们可能是世界上最糟糕的广告公司，</p><p>《<span class="yellow">世糟广</span>》因而成为了公司名字”</p></div>'
	}, {
		content: '<div class="slider-item"><p class="p1">来这里，享受最专业的</p><p class="p1" style="margin-bottom: .10rem;">创意视频&nbsp;制作服务</p><p>“我们可能是世界上最糟糕的广告公司，</p><p>《<span class="yellow">世糟广</span>》因而成为了公司名字”</p></div>'
	}]

	var S = new iSlider(document.getElementById("slider"), list, {
        isAutoplay: 1,
        isLooping: 1,
        isOverspread: 1,
        animateTime: 800,
		plugins: ['dot']
    });

	var nav = $("#nav_wrap");
	nav.on("click", function(e){
		var parent = $(this).parent();
		e.stopPropagation()
		e.preventDefault();
		if (parent.hasClass("active")) {
			parent.removeClass("active");
		} else {
			parent.addClass("active");
		}
	})
	$(".nav-menu a").on("click", function () {
		$("nav").removeClass("active");
	})

	$("#join-btn").click(function () {
		var name = $("#joinus .j-name"), phone = $("#joinus .j-phone"), remark = $("#joinus .j-remark");
		if (!name || !phone || !remark) {
			alert("您填写的信息不完整");
			return;
		}
		var data = {
			name: name.val(),
			contact_type: phone.val(),
			remark: remark.val()
		}
		$.post("/api/joinus", data, function (res) {
			alert(res.msg);
	        if(200==res.status){
	            location.reload();
	        }
		})
	})
	var step3 = $("#step3");
	$(".tab li").on("click", function () {
		var target = $(this);
		if (target.index() === 0) {
			step3.removeClass("next");
		} else {
			step3.addClass("next");
		}
	});
	$("#consume-btn").click(function () {
		var name = $("#consume .j-name").val(),
			email = $("#consume .j-email").val(),
			business_info = $("#consume .j-describe").val(),
			self_desc = $("#consume .j-self_desc").val(),
	        feedback1 = $("#consume .j-feedback1").val(),
	        feedback2 = $("#consume .j-feedback2").val(),
	        project_end_time = $("#consume .j-project_end_time").val(),
	        project_budget = $("#consume .j-project_budget").val(),
	        other = $("#consume .j-other").val();
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
			alert(res.msg);
	        if(200==res.status){
	            location.reload();
	        }
		})
	})
	$("#business-btn").click(function () {
		var name = $("#business .j-name"), email = $("#business .j-email"), describe = $("#business .j-describe"), remark = $("#business .j-remark");
		if (!name || !email || !describe) {
			alert("您填写的信息不完整");
			return;
		}
		var data = {
			name: name.val(),
			remark: remark.val(),
			business_info: describe.val(),
			email: email.val(),
			self_desc: "",
			feedback1: "",
			feedback2: "",
			project_end_time: "",
			project_budget: "",
			other: ""
		}
		$.post("/api/contactus", data, function (res) {
			alert(res.msg);
	        if(200 == res.status){
	            location.reload();
	        }
		})
	})
	$("#video li").css("height", screen_width / 2 * 0.63 + "px");
	$("#video li").on("click", function(e){
		if (player.css("display") === "block") {
			return;
		}
		e.stopPropagation();
        var uri = $(this).attr("data-video"), title = $(this).attr("data-title");
		player.find("iframe").attr("src", uri);
		player.css("display", "block");
    }, false);
	player.find("a").on("click", function (e) {
		e.stopPropagation();
		player.find("iframe").remove();
		player.append('<iframe frameborder="0" allowfullscreen></iframe>');
		player.css("display", "none");
	}, false)
})
