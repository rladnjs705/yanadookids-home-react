
$(function(){

    $("#ontopmenu .head_menu ul li a").hover(function(){
        $("#ontopmenu .head_menu ul li a").removeClass("active");
        $(".subtab").css({"display":"none"});
        $(this).addClass("active");
        $(".subtab").eq($("#ontopmenu .head_menu ul li a").index(this)).css({"display":"block"});
    });
    $("#offtopmenu").mouseenter(function() {                    //마우스를 topnav에 오버시
        $(this).parent().find("#ontopmenu").css({"display":"block"}).mouseleave(function(){
            $(this).parent().find("#ontopmenu").css({"display":"none"});
        });
    });
//        $('body').click(function (e) {
//            if ($('#layerbox').css('display') == 'block') {
//                if (!$('#layerbox, #btn').has(e.target).length) {
//                    $('#layerbox').hide();
//                };
//            };
//        });




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
        slidesToShow: 6,
        slidesToScroll: 6,
        prevArrow: $('.prev'),
        nextArrow: $('.next')
    });

    $("#KidsTabFAQ .qnaitem").click(function(){
        var index = $("#KidsTabFAQ .qnaitem").index(this);
        var autoHeight = $("#KidsTabFAQ .question ").eq(index).height() +$("#KidsTabFAQ .answer").eq(index).height()+49;
        $("#KidsTabFAQ .qnaitem").stop().animate({
            height: "98px"
        }, 300 );
        $(this).stop().animate({
            height: autoHeight
        }, 300 );
    });


});

