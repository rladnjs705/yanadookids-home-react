
// text animation
AOS.init();

$(function() {
	var isMain = $('.media-header').length;

	// 0423 edit - START
	var _width = $(window).width();
	var _agent = window.navigator.userAgent;
	var md = new MobileDetect(_agent);
	var _mobileSize = (md.is('iPhone')) ? 817 : 800;
	var isMob = (_width <= _mobileSize) ? true : false; // is it mobile
	// 0423 edit - END

	// GNB 하단에 위치 하게 하는것.
	var _gnbHeight = 80, _mGnbHeight = 60; // 0404 edit
	var _gnbSubHeight = 0; // 198;
	var _gnbBottomPos = $(window).outerHeight() ; // - _gnbHeight; // 0404 edit
	var _curTopPos = $(this).scrollTop();

	$(window).resize(setGnbPosition);

	function setGnbPosition() {
		_gnbBottomPos = $(window).outerHeight() ; // - _gnbHeight; // 0404 edit
		_gnbSubBottomPos = _gnbBottomPos - _gnbSubHeight;
		_width = $(window).width();
		isMob = (_width <= _mobileSize) ? true : false;
		if (isMob) { // for mobile
			$('.gnb-option').css({'width' : '100%', 'height' : _mGnbHeight + 'px'}); // 0404 edit
			$('#gnb-sticky-wrapper').css('height', _mGnbHeight+'px');
			$('.media-header').css('height', '100vh');

			// [START] Store button enable or disable
			if (md.os() == 'iOS') {
				try { $('.android_store .btn-app').addClass("store_disable") ; } catch(e) {}
				try { $('.android_store2').addClass("disable") ; } catch(e) {}
			} else {
				try { $('.ios_store .btn-app').addClass("store_disable") ; } catch(e) {}
				try { $('.ios_store2').addClass("disable") ; } catch(e) {}
			}
			// [END  ] Store button enable or disable

		} else { // for pc
			// console.log("_gnbBottomPos===>"+_gnbBottomPos) ;
			// $('.gnb-option').css({'width' : '100%', 'height' : _gnbHeight + 'px'}); // 0404 edit
			// $('#gnb-sticky-wrapper').css('height', _gnbHeight+'px');
			// $('.media-header').css('height', _gnbBottomPos+'px');
			//
			// // [START] Store button enable or disable
			// try { $('.android_store .btn-app').removeClass("store_disable") ; } catch(e) {}
			// try { $('.ios_store .btn-app').removeClass("store_disable") ; } catch(e) {}
			// [END  ] Store button enable or disable
		}
	};	// [END  ] setGnbPosition

	setGnbPosition();

	// [START] 0426 edit 42lines안에 있던걸 빼 냄
	$(".gnb_area .gnb").hover(function() {
		if (isMain) {
			if (_curTopPos < _gnbSubHeight && !isMob) {
				showSubGnbMenu();
			} else {
				slideSubMenu();
			}
		} else {
			slideSubMenu();
		}
	},
	function() {
		if (_curTopPos < _gnbSubHeight && !isMob) {
			hideSubGnbMenu();
		}

		$('.gnb li ul.two-dep').stop().hide();
		$('.gnb-bg').stop().slideUp(100, function(){
			// [START] hide main menu background color (white)
			_curTopPos = $( window ).scrollTop();
			// console.log("[START] hide Sub Gnb Menu + remove css " + _curTopPos) ;
			if (isMain && _curTopPos < 50) {
				$('#gnb').removeClass('gnb-shadow');
			}
			// [END  ] hide main menu background color (white)
        });


	});

	$(".gnb li .two-dep li").hover(function() {
		$('.gnb li a span').removeClass('on');
		$(this).parent().prev().find('span').addClass('on');
	},
	function() {
		$('.gnb li a span').removeClass('on');
	});
	// [END  ] 0426 edit 42lines안에 있던걸 빼 냄

	// 0410 edit (배경화면 고정 및 창을 닫을 시 pause & muted 처리)
	$('body').on('click', '.btn-play a', function() {
		var vEle = document.getElementById('vdo');
		var md = new MobileDetect(window.navigator.userAgent);

		if (md.os() == 'iOS') {
			vEle.play();
			vEle.muted = false;;
			vEle.webkitEnterFullscreen();
			vEle.enterFullscreen();
		} else {
			$('#modal-video').bPopup({
				scrollBar: false,
				escClose: false,
				modalClose: false,
				positionStyle: 'fixed',
				closeClass: 'btn-close',
				onOpen: function() {
					$("#modal-video").css('background', '');
					setTimeout(function(){
						try { vEle.muted = false; } catch (e) {}
						try { vEle.play(); } catch (e) {}
					},100);

					$('body').addClass('scrollOff').on('scroll touchmove mousewheel', function(e){
						e.preventDefault();
					});
				},
				onClose: function() {
					vEle.pause();
					vEle.muted = true;
					$('body').removeClass('scrollOff').off('scroll touchmove mousewheel');
				}
			});
		}
	});	// [END  ] $('body').on('click'

	// 햄버거 메뉴 클릭 //0404 edit
	$('body').on('click', '.mlist, .mclose', function() {
		if ($(this).attr('class').indexOf('mlist') !== -1) {
			// [START] 현재 위치한 메뉴만 열어두기.
			$('.mobile-gnb > .one-dep').each(function(seq, val) {
				var _len = $(this).find('a.on').length;
				var _two = $(this).find('ul.two-dep');
				var _arrow = $(this).find('em'), _arrowClass = _arrow.prop('class');

				if (_len) {
					if (_arrowClass.indexOf('glyphicon-menu-right') !== -1) {
						_arrow.removeClass('glyphicon-menu-right').addClass('glyphicon-menu-up');
					}
					_two.show();
				} else {
					if (_arrowClass.indexOf('glyphicon-menu-up') !== -1) {
						_arrow.removeClass('glyphicon-menu-up').addClass('glyphicon-menu-right');
					}
					_two.hide();
				}
			});
			// [END  ] 현재 위치한 메뉴만 열어두기.

			$('button.mlist').hide();
			$('button.mclose').show();
			console.log("[mlist main menu") ;
		} else {
			$('button.mlist').show();
			$('button.mclose').hide();
		}

		$('.mobile-gnb').stop().slideToggle(200);
	});

	// mobile main menu click // 0404 edit
	$('body').on('click', '.mobile-gnb > .one-dep > a', function(e) {
		e.preventDefault();
		var _curMenuCls = $(this).parent().attr('class').split(' ')[1];
		// [START] 선택한 메뉴외에는 닫히기. - 0423 edit
		$('.mobile-gnb > .one-dep').each(function() {
			var _ar = $(this).find('em'),
				 	_cl = _ar.prop('class'),
					_curCls = $(this).attr('class').split(' ')[1];

			if (_curMenuCls != _curCls) {
				if (_cl.indexOf('glyphicon-menu-up') !== -1) {
					_ar.removeClass('glyphicon-menu-up').addClass('glyphicon-menu-right');
				}

				$(this).find('ul.two-dep').hide();
			}
		});
		// [END  ] 선택한 메뉴외에는 닫히기.

		var _em = $(this).find('em');
		var _cls = _em.prop('class');
		if (_cls.indexOf('glyphicon-menu-up') !== -1) {
			_em.removeClass('glyphicon-menu-up').addClass('glyphicon-menu-right');
		} else {
			_em.removeClass('glyphicon-menu-right').addClass('glyphicon-menu-up');
		}

		$(this).next().stop().slideToggle(200);
	});

	// 0423 edit - for tablet 클릭방지
	$('body').on('click', '.gnb > .one-dep > a', function(e) {
		e.preventDefault();
	});

	function showSubGnbMenu() {
		console.log("[START] showSubGnbMenu() + add css") ;

		var pos = parseInt(_gnbSubBottomPos + _curTopPos);
		$('.media-header').stop().animate({'height' : pos+'px'}, 300);

		$('.gnb-bg').stop().show();
		$('.gnb li ul.two-dep').stop().show();
	}

	function hideSubGnbMenu() {
		var pos = parseInt(_gnbSubBottomPos - _curTopPos);
		$('.media-header').stop().animate({'height' : _gnbBottomPos+'px'}, 100);
	}

	// 0413 edit
	function slideSubMenu() {
		// console.log("[START] slideSubMenu() + add css") ;
		// [START] show main menu background color (white)
		console.log("[START] showSubGnbMenu() + add css") ;
		$('#gnb').addClass('gnb-shadow');
		// [END  ] show main menu background color (white)
		$('.gnb-bg').stop().slideDown(200, function() {
			$('.gnb li ul.two-dep').stop().show();
		});
	}

	$("#gnb").sticky({topSpacing:0, zIndex:100}); // for GNB

	$(window).scroll(function (e) {
		_curTopPos = $(this).scrollTop();
		if (isMain && _curTopPos < 50) {
			if(!$('.gnb li ul.two-dep').is(":visible")) $('#gnb').removeClass('gnb-shadow');
		} else {
			$('#gnb').addClass('gnb-shadow');
		}
	});

	// for slider
	function _reset() {
		var wrap = $('.swiper-wrapper .swiper-slide');
		var _ps = wrap.find('.txtcom > p, a');
		_ps.each(function() {
			TweenMax.to($(this), {x:0, y:100, opacity:0});
		});
	};

	// slider obj
	var swiper ;
	function setShiper() {

		swiper = new Swiper('.swiper-container', {
			speed: 400,
			autoplay: { waitForTransition: false, disableOnInteraction: false },
			loop: true,
			noSwiping : true,
			autoHeight : false,
			observer: true,
			observeParents: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			on: {
				slideChangeTransitionStart: function(e) {
					_reset();

					var wrap = $('.swiper-wrapper .swiper-slide');
					var _seq = parseInt(this.activeIndex);
					var _ps = wrap.eq(_seq).find('p, a');
					var _sec = 0.3;

					_ps.each(function() {
						TweenMax.fromTo($(this), 1, {x:0, y:100, opacity:0}, {delay:_sec, x:0, y:0, opacity:1, ease:Power3.easeOut});
						_sec += 0.1;
					});
				},
				slideChangeTransitionEnd : function() {
//					console.log("[START] slideChangeTransitionEnd" ) ;
				}
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});

		// console.log("1 swiper=="+swiper) ;

	}
	setShiper();

	// 하단 이용약관, 개인정보 처리방침 클릭시 - 0404 edit
	$('.btn-policy, .btn-privacy, .btn-refund').click(function(e) {
		e.preventDefault();

		var _btn = $(this).data('btn');
		var _loc = $(this).data('loc') || '';

		$("#policy-area").removeClass("innerwrap") ;
		$("#privacy-area").removeClass("innerwrap") ;
		$("#refund-area").removeClass("innerwrap") ;

		if (_btn == 'policy') {
			location.href = "../../policy/service"
		} else if(_btn == 'privacy') {
			location.href = "../../policy/privacy"
		} else {
			location.href = "../../policy/refund"
		}
	});	// [END  ] $('.btn-policy, .btn-privacy, .btn-refund'

	// 모달박스 안에서 탭 클릭시
	$('.term-tab li a').click(function(e) {
		e.preventDefault();
		var _link = $(this).data('link');

		$('#modal-policy .term-tab li').removeClass('on');
		$(this).parent().addClass('on');

		if (_link == 'policy') {
			location.href = "../../policy/service";
		} else if(_link == 'privacy') {
			location.href = "../../policy/privacy";
		} else {
			location.href = "../../policy/refund";
		}
	});

	var _hTag = window.location.hash;
	if (_hTag) {
		_hTag = _hTag.replace('#', '');
		if (_hTag == 'policy') {
			$('.page-term-tab li').eq(0).find('a').trigger('click');
		} else if (_hTag == 'privacy') {
			$('.page-term-tab li').eq(1).find('a').trigger('click');
		} else if (_hTag == 'refund') {
			$('.page-term-tab li').eq(2).find('a').trigger('click');
		}
	}
	// 0423 edit : term page -- END

	// FAQ Tab
	$('.faq-tab li a').click(function() {
		var _link = $(this).data('link');
		var _prefix = "faq-box-";

		$('.faq-tab li').each(function() {
			$(this).find('a').removeClass('on');
		});

		$('.faq-question').each(function() {
			$(this).find('button').removeClass('glyphicon-menu-up').addClass('glyphicon-menu-down');
		});

		$(this).addClass('on');
		$('.faq-data-box').hide();
		$('#' + _prefix + _link + ' .faq-answerbox').hide() ;
		$('#' + _prefix + _link).show();

		console.log("_prefix + _link  : "+_prefix + _link);
	});

	// FAQ question click
	$('.faq-lst li a, .faq-lst li button').click(function(e) {
		e.preventDefault();
		if(e.target.classList.value == "#"){
			var toggle = e.target.parentElement.lastElementChild.classList.value;
		}else if (e.target.classList.value == "word-q"){
			var toggle = e.target.parentElement.parentElement.lastElementChild.classList.value;
		}else{
			var toggle = e.target.classList.value;
		}
		$('.faq-question').each(function () {
            $(this).find('button').removeClass('glyphicon-menu-up').addClass('glyphicon-menu-down');
        });
		$('.faq-answerbox').slideUp(200);
		var _parent = $(this).parent().parent();
		if (toggle.indexOf('glyphicon-menu-down') !== -1) {
			_parent.find('button').removeClass('glyphicon-menu-down').addClass('glyphicon-menu-up');
			$(this).parent().parent().next().slideDown(200);
		} else {
			_parent.find('button').removeClass('glyphicon-menu-up').addClass('glyphicon-menu-down');
			$(this).parent().parent().next().slideUp(200);
		}

	});

	// 환불 Modal
	$('#canRefund').click(function(e) {
		e.preventDefault();

		// 환불신청 입력 폼 초기화
		try { $("#reundForm #userName").val("") ; } catch(e) {}
		try { $("#reundForm #userContact").val(""); } catch(e) {}
		try { $("#reundForm #userEmail").val("") ; } catch(e) {}
		try { $("#reundForm #couponType").val("") ; } catch(e) {}
		try { $("#reundForm #refundReason").val(""); } catch(e) {}

		// 환불신청 입력 폼 에러메시지 초기화
		try { $("#refundErrorArea").hide() ; } catch(e) {}
		try { $("#refundErrorMsg").html("") ; } catch(e) {}

		openRefundModel() ;
	});

	// 바우처 탭 - 0412 edit
	$('.voucher-tab li a').click(function(e) {
		e.preventDefault();
		var _id = $(this).attr('href');

		var lis = $(this).parent().parent().find('li');
		lis.each(function () {
			$(this).removeClass('on');
		});

		$('#all-pass, #home-school').hide();
		$(this).parent().addClass('on');
		$(_id).show();

		try { swiper[0].destroy(); } catch(e) {}
		try { swiper[1].destroy(); } catch(e) {}

		setShiper();
	});

	// 0420 add - scroll to top
	$( window ).scroll( function() {
		if ($(this).scrollTop() > 200) {
			$('.gototop').fadeIn();
		} else {
			$('.gototop').fadeOut();
		}

		// 0423 edit - hide or show video container on tablet
		if (md.tablet() !== null) {
			var _docHeight  = $(document).height();
			var _halfHeight = parseInt(_docHeight/2);

			if ($(this).scrollTop() >= _halfHeight) {
				$('.video-container').hide();
			} else {
				$('.video-container').show();
			}
		}
	});

	$('.gototop').click(function() {
		$( 'html, body' ).animate({scrollTop : 0}, 400);
		return false;
	});

});


// 이용권 등록 클릭 - 0410 edit
//$('#btn-login-modal').click(function() {
function displayLoginPage() {
	// [START] APPEND by CJ
	try { $("#loginErrorArea").hide(); } catch(e) {}
	try { $("#loginErrorMsg").html("") ; } catch(e) {}

	try { $("#agreeLogin").prop('checked', false) ; } catch(e) {}
	try { $("#agreeLogin").attr('checked', false) ; } catch(e) {}
	try { $("#kakaoLoginBtn").removeClass("active") ; } catch(e) {}
	// [END  ] APPEND by CJ
	openLoginModel() ;
};	// [END  ] $('#btn-login-modal')

// Open Login Model
function openLoginModel() {
	// option reset은 없다.
	modalLoginObj= $('#modal-login').bPopup({
		closeClass: 'btn-close',
		scrollBar: false,
		escClose: false,
		modalClose: false,
		positionStyle: 'fixed',
		onOpen: function() {
			isLoginModelView = true ;
			$('body').addClass('scrollOff').on('scroll touchmove mousewheel', function(e){
				e.preventDefault();
			});
		},
		onClose: function() {
			$('body').removeClass('scrollOff').off('scroll touchmove mousewheel');
			if(!isClickPolicy) isLoginModelView = false ;
		}
	});
}

// Open 환불신청 Model
function openRefundModel() {
	modalRefundObj = $('#modal-refund').bPopup({
		closeClass: 'btn-refund-close',
		scrollBar: false,
		escClose: false,
		modalClose: false,
		positionStyle: 'fixed',
		onOpen: function() {
			isRefundModelView = true ;
			$('body').addClass('scrollOff').on('scroll touchmove mousewheel', function(e){
				e.preventDefault();
			});
		},
		onClose: function() {
			$('body').removeClass('scrollOff').off('scroll touchmove mousewheel');
			if(!isClickPolicy) isRefundModelView = false ;
		}
	});
}

var modalLoginObj = null ;		// Login popup model object
var isLoginModelView = false ;	// login popup 띄웠나요?

var modalRefundObj = null ;		// 환불신청 popup model object
var isRefundModelView = false ;	// login popup 띄웠나요?

var isClickPolicy    = false ;	// 약관보기 선택했나요?

function displayPolicyPage() {
	isClickPolicy = true ;
	$(".main-wrapper").hide() ;
	try { modalLoginObj.close() ; } catch (e) {}
	try { modalRefundObj.close() ; } catch (e) {}

	$("#modal-policy").show() ;
	$("#modal-policy").removeClass("modal-box") ;
	$( 'html, body' ).animate({scrollTop : 0}, 0);

	$('#modal-policy .btn-close').click(function() {
		console.log("#modal-policy .btn-close CLICK!!") ;
		colsePolicyPage() ;
	});
	// console.log("2 isClickPolicy=="+isClickPolicy+", isLoginModelView=="+isLoginModelView) ;
}

function colsePolicyPage() {
	if($("#mobile-mlist").css("display") == "block" || $("#mobile-mclose").css("display") == "block") {
		isClickPolicy    = false ;
		$("#modal-policy").hide() ;
		$(".main-wrapper").show() ;
		if(modalLoginObj  != null && isLoginModelView ) { openLoginModel() ; }
		if(modalRefundObj != null && isRefundModelView) { openRefundModel() ;}
	}
}
