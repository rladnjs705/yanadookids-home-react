function jumphompage() {

    var userAgent = navigator.userAgent;
    var _width = $(window).width();
    var _mobileSize = 800;
    var isMob = (_width <= _mobileSize) ? true : false; // is it mobile

    var open_type = "PC";

    var md = new MobileDetect(window.navigator.userAgent);

    if (isMob) {
        if (md.os() == 'iOS') {
            open_type = "jump_homepage_ios";
        } else {
            open_type = "jump_homepage_android";
        }
    } else {
        if(navigator.maxTouchPoints>0){
            var isOsName = WURFL.complete_device_name.toLowerCase();
            if(isOsName.indexOf("apple")>0){
                open_type = "jump_homepage_ios";
            }else{
                open_type = "jump_homepage_android";
            }
        }else{
            open_type = "jump_homepage_pc";
        }

    }
    gtag("event", "jump_homepage", {
        'event_category': 'none',
        'event_label': open_type,
    });
    location.href = "https://www.yanadookids.com/main";
}

function event_startApp(targetStore) {
    var userAgent = navigator.userAgent;
    var visitedAt = (new Date()).getTime(); // 방문 시간


    var appURL4iOSW = "https://itunes.apple.com/kr/app/%ED%82%A4%EC%A6%88%EC%9B%94%EB%93%9C/id575065652?mt=8";
    var appURL4AndW = "https://play.google.com/store/apps/details?id=com.bluepin.kidsworldforgoogleplay";

    var appURL4iOS = "\n" +
        "https://bluepin.page.link/?link=https://www.yanadookids.com&apn=com.bluepin.kidsworldforgoogleplay&isi=575065652&ibi=co.kr.bluepin.DreamWorld&ifl=https://apps.apple.com/app/apple-store/id575065652?pt%3D444637%26ct%3D2020_0211_event%26mt%3D8&utm_campaign=okcashbag_202002&utm_medium=okcashbag&utm_source=okcashbag&efr=1";
    var appURL4And = "\n" +
        "https://bluepin.page.link/?link=https://www.yanadookids.com&apn=com.bluepin.kidsworldforgoogleplay&isi=575065652&ibi=co.kr.bluepin.DreamWorld&ifl=https://apps.apple.com/app/apple-store/id575065652?pt%3D444637%26ct%3D2020_0211_event%26mt%3D8&utm_campaign=okcashbag_202002&utm_medium=okcashbag&utm_source=okcashbag&efr=1"
    ;

    var appCall4iOS = "fb216889229099051://page";
    var appCall4And = "fb216889229099051://page";

    var _width = $(window).width();
    var _mobileSize = 800;
    var isMob = (_width <= _mobileSize) ? true : false; // is it mobile

    var open_type = "PC";

    var md = new MobileDetect(window.navigator.userAgent);

    if (targetStore == "A") {
        if (isMob) {
            if (md.os() != 'iOS') {
                // 구글 스토어로 이동 (Mobile용)
                setTimeout(function () {
                    if ((new Date()).getTime() - visitedAt < 2000) {
                        open_type = "install_app_phone_android";
                        sendMessage(open_type,"install_app");
                        location.href = appURL4And;
                    }
                }, 1000);
                setTimeout(function () {
                    location.href = appCall4And;

                }, 0);
            }
        } else {
            if(navigator.maxTouchPoints>0){
                var isOsName = getOS();
                if(isOsName.indexOf("Android")!=-1){
                    var ipad_url = "https://bluepin.page.link/?link=https://apps.apple.com/app/apple-store/id575065652?pt%3D444637%26ct%3D2020_0211_event%26mt%3D8&apn=com.bluepin.kidsworldforgoogleplay&isi=575065652&ibi=co.kr.bluepin.DreamWorld&ifl=https://apps.apple.com/app/apple-store/id575065652?pt%3D444637%26ct%3D2020_0211_event%26mt%3D8&utm_campaign=okcashbag_202002&utm_medium=okcashbag&utm_source=okcashbag&efr=1";
                    open_type = "install_app_pad_android";
                    sendMessage(open_type,"install_app");
                    location.href = ipad_url;
                }
            }else{

                open_type = "install_app_pc";
                sendMessage(open_type,"install_app");
                window.open(appURL4AndW, "KAKAOKIDS");	// 구글 스토어로 이동 (WEB용)
            }
        }
    } else if (targetStore == "I") {
        if (isMob) {
            if (md.os() == 'iOS') {
                // iTunes 스토어로 이동 (Mobile용)
                open_type = "open_ios";
                setTimeout(function () {
                    if ((new Date()).getTime() - visitedAt < 2000) {
                        open_type = "install_app_phone_ios";
                        sendMessage(open_type,"install_app");
                        location.href = appURL4iOS;
                    }
                }, 1000);
                setTimeout(function () {
                    location.href = appCall4iOS;
                }, 0);
            }
        } else {

            if(navigator.maxTouchPoints>0){
                var isOsName = getOS();
                if(isOsName.indexOf("Android")==-1){
                    var ipad_url = "https://bluepin.page.link/?link=https://apps.apple.com/app/apple-store/id575065652?pt%3D444637%26ct%3D2020_0211_event%26mt%3D8&apn=com.bluepin.kidsworldforgoogleplay&isi=575065652&ibi=co.kr.bluepin.DreamWorld&ifl=https://apps.apple.com/app/apple-store/id575065652?pt%3D444637%26ct%3D2020_0211_event%26mt%3D8&utm_campaign=okcashbag_202002&utm_medium=okcashbag&utm_source=okcashbag&efr=1";
                    location.href = ipad_url;
                    open_type = "install_app_phone_ios";
                    sendMessage(open_type,"install_app");
                }

            }else{
                open_type = "install_app_pc";
                sendMessage(open_type,"install_app");
                window.open(appURL4iOSW, "KAKAOKIDS");	// iTunes 스토어로 이동 (WEB용)print("startApp Pad PC : )"+appURL4iOSW+"    "+isOsName.indexOf("apple")+"    "+isOsName);
            }

        }

    }

}
function sendMessage(mes,call_name) {
    gtag("event", call_name, {
        'event_category': 'none',
        'event_label': mes,
    });
}

function goInstall_pad(){
    var userAgent = navigator.userAgent;
    var visitedAt = (new Date()).getTime(); // 방문 시간
    var url = "https://bluepin.page.link/?link=https://www.yanadookids.com&apn=com.bluepin.kidsworldforgoogleplay&isi=575065652&ibi=co.kr.bluepin.DreamWorld&ifl=https://apps.apple.com/app/apple-store/id575065652?pt%3D444637%26ct%3D2020_0211_event%26mt%3D8&utm_campaign=okcashbag_202002&utm_medium=okcashbag&utm_source=okcashbag&efr=1";
    var appCall4iOS = "fb216889229099051://page";
    var appCall4And = "fb216889229099051://page";

    var _width = $(window).width();
    var _mobileSize = 800;
    var isMob = (_width <= _mobileSize) ? true : false; // is it mobile

    var open_type = "none";

    var md = new MobileDetect(window.navigator.userAgent);
    if (isMobile.any()) {
        if (md.os() != 'iOS') {
            setTimeout(function () {
                if ((new Date()).getTime() - visitedAt < 2000) {
                    open_type = "install_app_phone_android";
                    sendMessage(open_type, "install_app");
                    location.href = url;
                }

            }, 1000);
            setTimeout(function () {
                location.href = appCall4And;
            }, 0);
        }else{
            setTimeout(function () {
                if ((new Date()).getTime() - visitedAt < 2000) {
                    open_type = "install_app_phone_ios";
                    sendMessage(open_type,"install_app");
                    location.href = url;
                }

            }, 1000);
            setTimeout(function () {
                location.href = appCall4iOS;
            }, 0);
        }
    } else {
        if(navigator.maxTouchPoints>0){
            var isOsName = getOS();
            if(isOsName.indexOf("Android")==-1){
                open_type = "install_app_pad_ios";
                sendMessage(open_type,"install_app");
                location.href = "https://bluepin.page.link/?link=https://apps.apple.com/app/apple-store/id575065652?pt%3D444637%26ct%3D2020_0211_event%26mt%3D8&apn=com.bluepin.kidsworldforgoogleplay&isi=575065652&ibi=co.kr.bluepin.DreamWorld&ifl=https://apps.apple.com/app/apple-store/id575065652?pt%3D444637%26ct%3D2020_0211_event%26mt%3D8&utm_campaign=okcashbag_202002&utm_medium=okcashbag&utm_source=okcashbag&efr=1";
            }else{
                open_type = "install_app_pad_android";
                sendMessage(open_type,"install_app");
                location.href = "https://bluepin.page.link/?link=https://apps.apple.com/app/apple-store/id575065652?pt%3D444637%26ct%3D2020_0211_event%26mt%3D8&apn=com.bluepin.kidsworldforgoogleplay&isi=575065652&ibi=co.kr.bluepin.DreamWorld&ifl=https://apps.apple.com/app/apple-store/id575065652?pt%3D444637%26ct%3D2020_0211_event%26mt%3D8&utm_campaign=okcashbag_202002&utm_medium=okcashbag&utm_source=okcashbag&efr=1";
            }
        }else{
            open_type = "install_app_pc";
            window.open(url, "KAKAOKIDS");	// 구글 스토어로 이동 (WEB용)
            sendMessage(open_type,"install_app");
        }

    }

}
function goInstall(){
    var userAgent = navigator.userAgent;
    var visitedAt = (new Date()).getTime(); // 방문 시간
    var url = "https://bluepin.page.link/?link=https://www.yanadookids.com&apn=com.bluepin.kidsworldforgoogleplay&isi=575065652&ibi=co.kr.bluepin.DreamWorld&ifl=https://apps.apple.com/app/apple-store/id575065652?pt%3D444637%26ct%3D2020_0211_event%26mt%3D8&utm_campaign=okcashbag_202002&utm_medium=okcashbag&utm_source=okcashbag&efr=1";
    var appCall4iOS = "fb216889229099051://page";
    var appCall4And = "fb216889229099051://page";

    var _width = $(window).width();
    var _mobileSize = 800;
    var isMob = (_width <= _mobileSize) ? true : false; // is it mobile

    var open_type = "none";

    var md = new MobileDetect(window.navigator.userAgent);
    var isOsName = getOS();
    if (isMobile.any()) {
        if (isOsName.indexOf("Android")!=-1) {
            // 구글 스토어로 이동 (Mobile용)
            setTimeout(function () {
                if ((new Date()).getTime() - visitedAt < 2000) {
                    open_type = "install_app_phone_android";
                    sendMessage(open_type,"install_app");
                    location.href = url;
                }
            }, 1000);
            setTimeout(function () {
                location.href = appCall4And;
            }, 0);
        }else{
            setTimeout(function () {
                if ((new Date()).getTime() - visitedAt < 2000) {
                    open_type = "install_app_phone_ios";
                    sendMessage(open_type,"install_app");
                    location.href = url;
                }
            }, 1000);
            setTimeout(function () {
                location.href = appCall4iOS;
            }, 0);
        }

    } else {
        open_type = "install_app_pc";
        sendMessage(open_type,"install_app");
        window.open(url, "KAKAOKIDS");	// 구글 스토어로 이동 (WEB용)

    }

}
