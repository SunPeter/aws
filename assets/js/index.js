$(function() {
    $("#slider").slidesjs({
        height: 260,
        pagination: false,
        start: 1,
        play: {
          auto: true
        }
    });
    $("#video li").on("click", function(){
        var uri = $(this).attr("data-video"), title = $(this).attr("data-title");
        $("#video_iframe").attr("src", uri);
        $("#modal .title").text(title);
        $("body").addClass("play");
    });
    $("#modal .close-btn").on("click", function(){
        $("body").removeClass("play");
        $("#video_iframe").attr("src", "");
        $("#modal .title").text("");
    });
});
