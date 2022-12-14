function LeftMenuOn() {
    $("#left").removeClass("off").addClass("on");
    $("#leftoutbg").removeClass("off").addClass("on");
    $("#body").removeClass("on").addClass("off");
}

$(window).on("orientationchange", function(event){
    if(window.matchMedia("(orientation: portrait)").matches){
        location.reload();
    }else if(window.matchMedia("(orientation: landscape)").matches){
        location.reload();
    }
});
$(function(){
    $("#leftoutbg").click(function(){
        $("#left").removeClass("on").addClass("off");
        $("#leftoutbg").removeClass("on").addClass("off");
        $("#body").removeClass("off").addClass("on");
    });
//$('body').css('zoom',$(window).width()/480);

    $(".leftmenu").click(function(){
        var index=$(".leftmenu").index(this);
        var ison = $(".leftmenu").eq(index).hasClass("active");
        $(".leftmenu").removeClass("active").removeClass("down").addClass("up");
        if(ison!=true)
            $(".leftmenu").eq(index).removeClass("up").addClass("active down");
        $("#left .submenu").removeClass("on");
        if(ison!=true)
            $("#left .submenu").eq(index).removeClass("off").addClass("on");
    });
});
$('.fade').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    draggable: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 2000
});
$('.multiple-items').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: $('.prev'),
    nextArrow: $('.next')
});