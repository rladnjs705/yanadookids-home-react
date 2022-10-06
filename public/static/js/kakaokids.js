// 로그인 창 동의 checked 여부에 따른 반응 
$("#agreeLogin").change(function () {
    if ($(this).is(":checked")) {
        $("#kakaoLoginBtn").addClass("active");
    } else {
        $("#kakaoLoginBtn").removeClass("active");
    }
});

// [START] 쿠폰 등록 화면
function movePage(pageName) {
    if (pageName == "COUPON") {
        location.href = "/coupon/lists";
    } else if (pageName == "HOME") {
        location.href = "/";
    } else if (pageName == "APP") {
    }
}

// 앱 실행 또는 스토어로 이동
// targetStore : A => 그굴스토어
function startApp(targetStore) {
    if (isMobile.any()) {
        MobileLink(targetStore);
    } else {
		var md = new MobileDetect(navigator.userAgent);
        if (md.tablet()) {
			Tablet(targetStore);
        } else{
			PcLink(targetStore);
		}
    }
}

function StartAppNoneParam() {
    var TarGetOs = getMobileAndTabletOS();
    if (isMobile.any()) {
        MobileLink(TarGetOs);
    } else {
        Tablet(TarGetOs);
    }

}

function getMobileAndTabletOS() {
    var os = getOS();
    if (os.indexOf("Android") > 0) {
        return "A";
    } else {
        return "I";
    }
}

function PcLink(store_type) {
    switch (store_type) {
        case "A": {
            window.open("https://play.google.com/store/apps/details?id=com.bluepin.kidsworldforgoogleplay", "KAKAOKIDS");
            break;
        }
        case "I": {
            window.open("https://itunes.apple.com/kr/app/%ED%82%A4%EC%A6%88%EC%9B%94%EB%93%9C/id575065652?mt=8", "KAKAOKIDS");
            break;
        }
        case "S": {
            window.open("https://www.samsung.com/sec/apps/samsung-kids-home", "KAKAOKIDS");
            break;
        }
    }
}

function getlink(store) {
    var select = store.toUpperCase();
    var url = "";
    switch (select) {
        case 'A': {
            url = "https://bluepin.page.link/AaTt";
            break;
        }
        case 'I': {
            url = "https://bluepin.page.link/AaTt";
            break;
        }
        case 'S': {
            url = "https://www.samsung.com/sec/apps/samsung-kids-home";
            break;
        }
    }
    return url;
}

function getLinkTablet() {
    var select = store.toUpperCase();
    var url = "";
    switch (select) {
        case 'A': {
            url = "https://bluepin.page.link/?link=https://www.yanadookids.com&apn=com.bluepin.kidsworldforgoogleplay&isi=575065652&ibi=co.kr.bluepin.DreamWorld&ifl=https://apps.apple.com/app/apple-store/id575065652?pt%3D444637%26ct%3D2020_0211_event%26mt%3D8&utm_campaign=okcashbag_202002&utm_medium=okcashbag&utm_source=okcashbag&efr=1";
            break;
        }
        case 'I': {
            url = "https://bluepin.page.link/?link=https://www.yanadookids.com&apn=com.bluepin.kidsworldforgoogleplay&isi=575065652&ibi=co.kr.bluepin.DreamWorld&ifl=https://apps.apple.com/app/apple-store/id575065652?pt%3D444637%26ct%3D2020_0211_event%26mt%3D8&utm_campaign=okcashbag_202002&utm_medium=okcashbag&utm_source=okcashbag&efr=1";
            break;
        }
        case 'S': {
            url = "https://www.samsung.com/sec/apps/samsung-kids-home";
            break;
        }
    }
    return url;
}

function getAppStart(store) {
    var select = store.toUpperCase();
    var startPath = "";
    switch (select) {
        case 'A': {
            startPath = "fb216889229099051://page";
            break;
        }
        case 'I': {
            startPath = "fb216889229099051://page";
            break;
        }
        case 'S': {
            startPath = "https://www.samsung.com/sec/apps/samsung-kids-home";
            break;
        }
    }
    return startPath;
}

function MobileLink(store_type) {
    var visitedAt = (new Date()).getTime(); // 방문 시간
    switch (store_type) {
        case "A":
        case "I": {
            setTimeout(function () {
                if ((new Date()).getTime() - visitedAt < 2000) {
                    location.href = getlink(store_type);
                }
            }, 1000);

            setTimeout(function () {
                location.href = getAppStart(store_type);
            }, 0);
        }
        case "S": {
            window.open(getlink(store_type), "KAKAOKIDS");
            break;
        }
    }
}

function Tablet(store_type) {
    var visitedAt = (new Date()).getTime(); // 방문 시간
    switch (store_type) {
        case "A":
        case "I": {
            setTimeout(function () {
                if ((new Date()).getTime() - visitedAt < 2000) {
                    location.href = getLinkTablet(store_type);
                }
            }, 0);

            setTimeout(function () {
                location.href = getAppStart(store_type);
            }, 1000);
            break;
        }
        case "S": {
            window.open(getlink(store_type), "KAKAOKIDS");
        }
    }
}


$(".ex-btn").focus(function () {
    console.log("BUTTON FOCUS!!");
    $(this).blur();
});


// 환불요청
function sendRefund() {
    var _userName = $("#reundForm #userName").val();
    var _userContact = $("#reundForm #userContact").val();
    var _userEmail = $("#reundForm #userEmail").val();
    var _couponType = $("#reundForm #couponType").val();
    var _refundReason = $("#reundForm #refundReason").val();

    if (_userName.length == 0) {
        $("#refundErrorArea").show();
        $("#refundErrorMsg").html("이름을 입력해 주세요.");
    } else if (_userContact.length == 0) {
        $("#refundErrorArea").show();
        $("#refundErrorMsg").html("연락처를 입력해 주세요.");
    } else if (_userEmail.length == 0) {
        $("#refundErrorArea").show();
        $("#refundErrorMsg").html("이메일을 입력해 주세요.");
    } else if (!checkEmailForm(_userEmail)) {
        $("#refundErrorArea").show();
        $("#refundErrorMsg").html("적합하지 않은 이메일 형식입니다.");
    } else if (_couponType.length == 0) {
        $("#refundErrorArea").show();
        $("#refundErrorMsg").html("이용권 종류를 선택해 주세요.");
    } else {
        if (confirm("이용권 환불 신청을 하시겠습니까?")) {
            $.ajax({
                url: "/coupon/refundRegister", // 요청 할 주소
                async: true, // false 일 경우 동기 요청으로 변경
                type: 'POST', // GET, PUT
                data: {
                    userName: _userName,
                    userContact: _userContact,
                    userEmail: _userEmail,
                    couponType: _couponType,
                    refundReason: _refundReason
                }, // 전송할 데이터
                dataType: 'json', // xml, json, script, html
                success: function (result) {
                    if (result.resultCode == "200") {
                        // 환불 submit
                        var _parentModal = $('#modal-refund');
                        _parentModal.hide();

                        $('#modal-refund-fin').bPopup({
                            closeClass: 'btn-refund-close',
                            scrollBar: false,
                            escClose: false,
                            modalClose: false,
                            positionStyle: 'fixed',
                            modal: false,
                            onOpen: function () {
                                $('body').addClass('scrollOff').on('scroll touchmove mousewheel', function (e) {
                                    e.preventDefault();
                                });
                            },
                            onClose: function () {
                                _parentModal.bPopup().close();
                                $('body').removeClass('scrollOff').off('scroll touchmove mousewheel');
                            }
                        });
                    } else if (result.resultCode == "403") {
                        var errorMsg = "재로그인이 필요합니다. ‘이용권 등록’ 버튼을 눌러주세요.";
                        $("#refundErrorArea").show();
                        $("#refundErrorMsg").html(errorMsg);
                    } else {
                        var errorMsg = "[" + result.resultStatus + "] 이용권 환불 신청이 실패했습니다. 고객센터로 연락 부탁드려요.";
                        $("#refundErrorArea").show();
                        $("#refundErrorMsg").html(errorMsg);
                        // Display error message
                    }
                }, // 요청 완료 시
                error: function (jqXHR) {
                }, // 요청 실패.
                complete: function (jqXHR) {
                } // 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
            });
        }
    }
}

function checkEmailForm(whatValue) {
    // 이메일이 적합한지 검사할 정규식
    var checkEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (checkEmail.test(whatValue)) {
        return true;
    } else {
        return false;
    }
}

function checkMaxLength(textareaID, maxLength, displayLength) {
    currentLength = $("#" + textareaID).val().length;

    if (currentLength > (maxLength)) {
        // Trim the field current length over the maxlength.
        $("textarea#" + textareaID).val($("textarea#" + textareaID).val().slice(0, maxLength));
    }

    if (displayLength !== undefined) {
        currentLength = $("#" + textareaID).val().length;
        $("#" + displayLength).html(currentLength);
    }
}

// 하단 이용약관, 개인정보 처리방침 클릭시 - 0404 edit (For mobile page)
function display(pClickName) {

    $('.term-tab li').removeClass('on');

    console.log("2TAG===" + $('.term-tab li').eq(2).html());

    if (pClickName == 'refund') {
        $('.term-tab li').eq(2).addClass('on');
        $('.policy-box').hide();
        $('.privacy-box').hide();
        $('.refund-box').show();
    } else if (pClickName == 'privacy') {
        $('.term-tab li').eq(1).addClass('on');
        $('.policy-box').hide();
        $('.privacy-box').show();
        $('.refund-box').hide();
    } else {
        $('.term-tab li').eq(0).addClass('on');
        $('.policy-box').show();
        $('.privacy-box').hide();
        $('.refund-box').hide();
    }
}

/* Date format function */
Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy":
                return d.getFullYear();
            case "yy":
                return (d.getFullYear() % 1000).zf(2);
            case "MM":
                return (d.getMonth() + 1).zf(2);
            case "dd":
                return d.getDate().zf(2);
            case "E":
                return weekName[d.getDay()];
            case "HH":
                return d.getHours().zf(2);
            case "hh":
                return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm":
                return d.getMinutes().zf(2);
            case "ss":
                return d.getSeconds().zf(2);
            case "a/p":
                return d.getHours() < 12 ? "오전" : "오후";
            default:
                return $1;
        }
    });
};
String.prototype.string = function (len) {
    var s = '', i = 0;
    while (i++ < len) {
        s += this;
    }
    return s;
};
String.prototype.zf = function (len) {
    return "0".string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
    return this.toString().zf(len);
};

function pageTag(pagination){
	var html = '<ul class="pagination modal">';
	if(pagination.totalListCnt != 0){ //전체 데이터 수가 0이 아니고
		if(pagination.page != 1){//현재 페이지가 1이 아니면 처음,이전버튼 보임
			html += "<li><a href=\"javascript:getNoticeList(1)\" class=\"first\">처음페이지</a></li>";
			html += "<li><a href=\"javascript:getNoticeList("+pagination.preBlock+")\" class=\"arrow left\">&laquo;</a></li>";
		}
	}
	
	for(var i = pagination.startPage; i <=pagination.endPage; i++){
		if(i == pagination.page){
	        html += "<li><a href=\"javascript:getNoticeList("+i+")\" class=\"num left on\">"+i+"</a></li>";
		}else{
			html += "<li><a href=\"javascript:getNoticeList("+i+")\" class=\"num left\">"+i+"</a></li>";
		}
    }
    
    if(pagination.totalListCnt != 0){ //전체 데이터 수가 0이 아니고
	    if(pagination.page != pagination.totalPageCnt){//전체 페이지가 1이 아니면 끝,다음버튼 보임
		    html += "<li><a href=\"javascript:getNoticeList("+pagination.nextBlock+")\" class=\"arrow right\">&raquo;</a></li>";
		    html += "<li><a href=\"javascript:getNoticeList("+pagination.totalPageCnt+")\" class=\"last\">끝 페이지</a></li>";
		}
	}
    html += "</ul>";

    return html;
	
}
