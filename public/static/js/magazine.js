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
        url:'/ko/kakaokids/magazinelist/'+movepage,
        dataType:'json',
        success:function(data){
            var ItemList="";
            $.each( data.MagazineList, function( key, value ) {
                var active="";
                if(idx == value.idx)
                    active="active";
                ItemList+='<div class="MagazineItem">';
                ItemList+='<a href="/ko/kakaokids/magazine/'+value.idx+'/'+movepage+'" class="magazineimage"><img src="//cdn.yanadookids.com/'+value.fileurl+'"/></a>';
                ItemList+='<a href="/ko/kakaokids/magazine/'+value.idx+'/'+movepage+'">';
                ItemList+='<span class="category_type'+value.category+'">'+value.categorytext+'</span>';
                ItemList+='<span class="subject '+active+'"><br/>'+value.subject+'</span>';
                ItemList+='</a>';
                ItemList+='</div>';
            });
            $("#DocumentList").html(ItemList);
            pagination(data.page,data.total);
        }
    });

}