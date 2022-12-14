function pagination(page,total)
{
    page= parseInt(page);
    total=parseInt(total);
    $('#innerpages').html("");
    var list =4;
    var pages= Math.ceil(total/list);
    var backstart=page-2;
    if(page>(pages-3))
        backstart+=pages-page-2;

    if(page>=5)
    {
        var position = page-5;
        if(position <= 0)
            position =1;
        pagetext='<a class="dbprevbtn" onmousedown="return false" href="javascript:pagecall('+(position)+')"></a>';
        $('#innerpages').append(pagetext);
    }


    for(var i=backstart;i<page;i++)
    {

        pagetext='<a onmousedown="return false" href="javascript:pagecall('+i+')">'+i+'</a>';
        if(i>0)
            $('#innerpages').append(pagetext);
    }
    pagetext='<a onmousedown="return false" class="active" href="javascript:pagecall('+page+')">'+page+'</a>';
    $('#innerpages').append(pagetext);

    var frontlimit=page+2;
    if((page<3))
    {
        frontlimit = page + (5 - page);
    }


    for(var i=page+1;i<=frontlimit;i++)
    {   pagetext='<a onmousedown="return false" href="javascript:pagecall('+i+')">'+i+'</a>';
        if(i<=pages)
            $('#innerpages').append(pagetext);
    }
    if((page+5)<=pages)
    {
        pagetext='<a class="nextbtn" onmousedown="return false" href="javascript:pagecall('+(page+5)+')"></a>';
        $('#pages #innerpages').append(pagetext);
    }
}

function pagecall(idx = 0,movepage)
{

    $.ajax({
        type:'post',
        url:'/ko/kakaokids/eventlist/'+movepage,
        dataType:'json',
        success:function(data){
            var ItemList="";
            $.each( data.EventList, function( key, value ) {
                var active="";
                if(idx == value.idx)
                    active="active";

                var endimgclass="";
                var eventstatu="eventing";
                if(value.status=="마감")
                {
                    if(idx == value.idx)
                        active="endactive";
                    endimgclass="eventendimg";
                    eventstatu="eventend";
                }

                ItemList+='<a href="/ko/kakaokids/event/'+value.idx+'/'+movepage+'" class="eventitem">'
                ItemList+='<div class="itemimg">'
                ItemList+='<img class="'+endimgclass+'" src="//cdn.yanadookids.com/'+value.mainimageurl+'"/>';
                ItemList+='</div>'
                ItemList+='<h5 class="itemsubject '+active+'">'+value.subject+'</h5>'
                ItemList+='<div class="eventinfo">'
                ItemList+='<span class="eventdate">'+value.startdate+' ~ '+value.enddate+'</span>'
                ItemList+='<span class="'+eventstatu+' statubtn">'+value.status+'</span>'
                ItemList+='</div>'
                ItemList+='</a>';
            });
            $("#EventDocumentList").html(ItemList);

            pagination(data.page,data.total);
        }
    });
}