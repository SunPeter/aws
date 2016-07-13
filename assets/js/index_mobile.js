;$(function() {
	var wrap = $("#wrap");
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
		// url: ideaology.cn/joinus.html
		var formData = {
			name: 1111,
			contact_type: 222,
			remark: 333
		}

	})
	$("#next-btn").click(function () {
		$("#step3").addClass("next");
	})
	$("#business-btn").click(function () {
		alert(2);
	})
})
