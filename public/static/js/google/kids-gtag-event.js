
window.dataLayer = window.dataLayer || [];

function gtag(){dataLayer.push(arguments);}

gtag('js', new Date());

gtag('config', 'UA-149946081-2');



function call_event() {

    var _url = window.location.href.replace("https://www.yanadookids.com");
    var sList = _url.split('/');
    var catagory = sList[1];
    var label = sList[1];
    gtag('event','페이지 이동', {
        'event_category': catagory,
        'event_label': label,
    });


}

call_event();