;$(function() {
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
})