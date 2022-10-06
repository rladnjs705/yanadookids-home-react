
$(function () {
    isOSCheck();
    $(window).scroll(function () {
        document.getElementById("mobileLog").innerHTML = "ddd L : "+isMobile.any();
        if (isMobile.any()) {
            var scroll_y = $(window).scrollTop();

            if ($('.emobile_btn_on_check').visible()) {
                if (!$('.static_linbtn').visible()) {
                    $('.static_linbtn').fadeIn();
                }
            } else {
                if (!$('.emobile_btn_on_check').visible()) {
                    if (scroll_y > 300) {
                        if (!$('.static_linbtn').visible()) {
                            $('.static_linbtn').fadeIn();
                        }
                    }else{
                        $('.static_linbtn').hide();
                    }
                }
            }
        } else {
            $('.static_linbtn').hide();
        }
    });
    $(window).resize(screenchage);

    function screenchage() {
        isOSCheck();
        if (isMobile.any()) {
            var scroll_y = $(window).scrollTop();

            if ($('.emobile_btn_on_check').visible()) {
                if (!$('.static_linbtn').visible()) {
                    $('.static_linbtn').fadeIn();
                }
            } else {
                if (!$('.emobile_btn_on_check').visible()) {
                    if (scroll_y > 300) {
                        if (!$('.static_linbtn').visible()) {
                            $('.static_linbtn').fadeIn();
                        }
                    }else{
                        $('.static_linbtn').hide();
                    }
                }
            }
        } else {
            $('.static_linbtn').hide();
        }
    }
});
function isOSCheck() {
    if(navigator.maxTouchPoints >2){
        $(".e_ufo_event_tap_pc").css({"display":"none"});
        $(".e_ufo_event_tap_mobile").css({"display":"block"});
        $(".pc_static_linbtn").css({"width":"208px"},{"height":"90px"},{"right":"16px"},{"top":"19px"});

        var isOsName = getOS().toLowerCase();
        if(isOsName.indexOf("android")!=0){
            $(".e_ios_btn").css({"opacity":1.0});
            $(".e_and_btn").css({"opacity":0.3});
        }else{
            $(".e_ios_btn").css({"opacity":0.3});
            $(".e_and_btn").css({"opacity":1.0});
        }
    }else{
        $(".e_ufo_event_tap_pc").css({"display":"block"});
        $(".e_ufo_event_tap_mobile").css({"display":"none"});
        $(".pc_static_linbtn").css({"width":"179px"},{"height":"220px"},{"right":"32px"},{"top":"22px"});
        if(isMobile.any()){
            var isOsName = getOS().toLowerCase();
            if(isOsName.indexOf("android")!=0){
                $(".e_ios_btn").css({"opacity":1.0});
                $(".e_and_btn").css({"opacity":0.3});
            }else{
                $(".e_ios_btn").css({"opacity":0.3});
                $(".e_and_btn").css({"opacity":1.0});
            }
        }
    }
}