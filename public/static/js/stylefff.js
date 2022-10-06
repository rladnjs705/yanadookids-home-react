	// for parallax
	AOS.init();

	$(function() {
		var isMob = false;
		var _width = $(window).width();
		var _mobileSize = 800;
		isMob = (_width <= _mobileSize) ? true : false; // is it mobile

		// GNB 하단에 위치 하게 하는것.
		var _gnbHeight = 80;
    var _gnbSubHeight = 200;
		var _gnbBottomPos = $(window).outerHeight() - _gnbHeight;
    var _curTopPos = $(this).scrollTop();

    $(window).resize(setGnbPosition);

		function setGnbPosition() {
			_gnbBottomPos = $(window).outerHeight() - _gnbHeight;
      _gnbSubBottomPos = _gnbBottomPos - _gnbSubHeight;
      _width = $(window).width();
      isMob = (_width <= _mobileSize) ? true : false;

      // for IE browser bug - 04/04수정
      AOS.init();

			if (isMob) { // for mobile
				$('.gnb-option').css('width', '100%');
				$('.media-header').css('height', '100vh');
        $('.gnb > li').hide();
        $('#gnb button.mlist').show();
        $('#gnb button.mclose').hide();

        // android or ios
        var md = new MobileDetect(window.navigator.userAgent);
        var _iosStoreIcon = $('.ios_store');
        var _androidStoreIcon = $('.android_store');
        if (md.os() == 'iOS') {
          _iosStoreIcon.show();
          _androidStoreIcon.hide();
        } else {
          _iosStoreIcon.hide();
          _androidStoreIcon.show();
        }

        $('body').on('click', '.btn-play a', function() {
          $('#modal-vedio').bPopup({
            closeClass: 'btn-close'
          });
        });

        // one depth menu click - 04/04수정
        $('body').on('click', '.gnb .one-dep a', function(e) {
          e.preventDefault();

          var _em = $(this).find('em');
          var _cls = _em.prop('class');
          if (_cls.indexOf('glyphicon-menu-up') !== -1) {
            _em.removeClass('glyphicon-menu-up').addClass('glyphicon-menu-right');
          } else {
            _em.removeClass('glyphicon-menu-right').addClass('glyphicon-menu-up');
          }

          $(this).next().find('li').stop().slideToggle(200);
        });

      } else { // for pc
        $('.media-header').css('height', _gnbBottomPos+'px');
        $('.gnb > li').show();
        $('#gnb button.mlist').hide();
        $('#gnb button.mclose').hide();

        $(".gnb_area .gnb, .gnb_area .gnb-bg").hover(
          function() {
            if (_curTopPos < _gnbSubHeight && !isMob) {
              showSubGnbMenu();
            }

            $('.gnb-bg').stop().slideDown(200, function() {
              $('.gnb li ul.two-dep').stop().show();
            });
          },
          function() {
            if (_curTopPos < _gnbSubHeight && !isMob) {
              hideSubGnbMenu();
            }
            $('.gnb li ul.two-dep').stop().hide();
            $('.gnb-bg').stop().slideUp(100);
          }
        );

        $(".gnb li ul.two-dep li").hover(
          function() {
            $('.gnb li a span').removeClass('active');
            $(this).parent().prev().find('span').addClass('active');
          },
          function() {
            $('.gnb li a span').removeClass('active');
          }
        );
      }
    };
    setGnbPosition();

    function showSubGnbMenu()
    {
      var pos = parseInt(_gnbSubBottomPos + _curTopPos);
      $('.gnb li ul.two-dep').stop().show();
      $('.media-header').stop().animate({'height' : pos+'px'}, 300);
    }

    function hideSubGnbMenu()
    {
      var pos = parseInt(_gnbSubBottomPos - _curTopPos);
      $('.media-header').stop().animate({'height' : _gnbBottomPos+'px'}, 100);
    }

    $("#gnb").sticky({topSpacing:0, zIndex:100}); // for GNB

    $(window).scroll(function (e) {
      _curTopPos = $(this).scrollTop();
      if (_curTopPos < 50) {
        $('#gnb').removeClass('gnb-shadow');
      } else {
        $('#gnb').addClass('gnb-shadow');
      }
    });

    // 햄버거 메뉴 클릭
    $('body').on('click', 'button.mlist, button.mclose', function() {
      if ($(this).attr('class').indexOf('mlist') !== -1) {
        $('button.mlist').hide();
        $('button.mclose').show();
      } else {
        $('button.mlist').show();
        $('button.mclose').hide();
      }
      $('ul.gnb > .one-dep').stop().slideToggle(200);
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
    var swiper = new Swiper('.swiper-container', {
      speed: 400,
      autoplay: true,
      loop: true,
      noSwiping : true,
      autoHeight : false,
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
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });


    // 이용권 등록 클릭 - 04/04수정
    $('#btn-login-modal').click(function() {
      $('#modal-login').bPopup({
        closeClass: 'btn-close',
        scrollBar: false,
        escClose: false,
        modalClose: false,
        ositionStyle: 'fixed',
        onOpen: function() {
          $('#modal-login').on('scroll touchmove mousewheel', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          });
        },
        onClose: function() {
          $('#modal-login').off('scroll touchmove mousewheel');
        }
      });
    });

    // 하단 이용약관, 개인정보 처리방침 클릭시 - 04/04수정
    $('.btn-policy, .btn-privacy').click(function(e) {
      e.preventDefault();
      var _btn = $(this).data('btn');
      var _loc = $(this).data('loc') || '';

      if (_btn == 'policy') {
        $('#modal-policy .term-tab li').eq(0).find('a').trigger('click');
      } else {
        $('#modal-policy .term-tab li').eq(1).find('a').trigger('click');
      }

      var params = {
        closeClass: 'btn-close',
        scrollBar: false
      };
      if (_loc == 'lyr') {
        params.modal = false;
      }
      $('#modal-policy').bPopup(params);
    });

    // 모달박스 안에서 탭 클릭시
    $('.modal-box .term-tab li a').click(function(e) {
      e.preventDefault();
      var _link = $(this).data('link');

      $('.modal-box .term-tab li').removeClass('on');
      $(this).parent().addClass('on');
      if (_link == 'policy') {
        $('.modal-box .policy-box').show();
        $('.modal-box .privacy-box').hide();
      } else {
        $('.modal-box .policy-box').hide();
        $('.modal-box .privacy-box').show();
      }
    });

    // FAQ Tab
    $('.faq-tab li a').click(function() {
      var _link = $(this).data('link');
      var _prefix = "faq-box-";

      $('.faq-tab li').each(function() {
        $(this).find('a').removeClass('on');
      });

      $(this).addClass('on');
      $('.faq-data-box').hide();
      $('#' + _prefix + _link).show();
    });

    // FAQ question click
    $('.faq-lst li a, .faq-lst li button').click(function(e) {
      e.preventDefault();
      var _parent = $(this).parent().parent();
      var _class = _parent.find('button').attr('class');
      if (_class.indexOf('glyphicon-menu-down') !== -1) {
        _parent.find('button').removeClass('glyphicon-menu-down').addClass('glyphicon-menu-up')
      } else {
        _parent.find('button').removeClass('glyphicon-menu-up').addClass('glyphicon-menu-down')
      }
      _parent.next().slideToggle(200);

    });

  });
