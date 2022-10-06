var openIndex=0;
$("#news_list_box li").on("click",function () {
    var index = $(this).index();
    var calssName = $(this).attr('class');
    if(calssName == "list_item_title_box") {

        openIndex = index+1;
        $("#news_list_box li").eq(openIndex).slideToggle(200);
        $("#news_list_box li").eq(openIndex).css({"display":"block"});

        var class_s = $("#news_list_box li").eq(openIndex-1).children("div");

        if(class_s.hasClass("list_down")){
            $("#news_list_box li").eq(openIndex-1).children("div").removeClass("list_down");
            $("#news_list_box li").eq(openIndex-1).children("div").addClass("list_up");
        }else{
            $("#news_list_box li").eq(openIndex-1).children("div").removeClass("list_up");
            $("#news_list_box li").eq(openIndex-1).children("div").addClass("list_down");
        }


    }
    close_content(openIndex);
})
function close_content(_index) {
    $.each($("#news_list_box li"),function (i) {
        var classname = $("#news_list_box li").eq(i).attr("class");
        var display_state = $("#news_list_box li").eq(i).css("display");
        if(classname =="list_item_content_box"){
            if(display_state=="block"&&openIndex!=i){
                $("#news_list_box li").eq(i).slideToggle(200);
                $("#news_list_box li").eq(i-1).children("div").removeClass("list_up");
                $("#news_list_box li").eq(i-1).children("div").addClass("list_down");
            }
        }
    })
}

