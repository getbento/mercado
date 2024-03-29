/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/scripts.js":
/*!******************************!*\
  !*** ./assets/js/scripts.js ***!
  \******************************/
/***/ (() => {

/*
 * Constants
 ***************************/
const mobileBreakpoint = 767;

/*
 * Globals
 ***************************/
/* Window */
var windowWidth = $(window).width();
var windowHeight = $(window).height();
/* Breakpoints */
var isMobile = windowWidth <= mobileBreakpoint;
/* Mobile Navigation */
var isMenuOpen = false;

/*
 * Document ready
 ***************************/
$(document).ready(function () {
  /*
   * Mobile Navigation (see toggleMenu)
   ***************************/
  if ($('#skip-to-navigation-link').length) {
    $('#skip-to-navigation-link').click(function (event) {
      event.preventDefault();
      toggleMenu();
    });

    $('#skip-to-navigation-link').keyHook(); // trigger click on keypress
  }

  if ($('.mobile-nav-header-close').length) {
    $('.mobile-nav-header-close').click(function (event) {
      event.preventDefault();
      toggleMenu();
    });

    $('.mobile-nav-header-close').keyHook(); // trigger click on keypress
  }

  /*
   * Mobile Navigation - Subnav
   ***************************/
  if ($(window).width() < 1030) {
    $('.nav-item.has-children > a').each(function () {
      mobileSubnav(this);
    });

    $('.nav-item.has-children > a').click(function (event) {
      event.preventDefault();
      toggleSubnav(this);
    });
  }

  /*
   * Homepage Scroll
   ***************************/
  if ($('body').hasClass('current-home')) {
    console.log('home!');
    $(window).scroll(function () {

      let scrollTop = $(window).scrollTop();
      // console.log(scrollTop);
      if (scrollTop > 50) {
        $('#masthead').addClass('logo-show');
      } else {
        $('#masthead').removeClass('logo-show');
      }
    });
  }

  /*
   * Footer Carousel (see footerSlick)
   ***************************/
  if ($('.partner-carousel').length) {
    $('.partner-carousel').each(function () {
      footerSlick(this);
    });
  }

  /*
   * Newsletter Popup
   ***************************/
  $('#newsletter-popup-close').click(function () {
    $('#newsletter-popup').removeClass('opened');
    $('body').removeClass('overflow-hide');
    setTimeout(function () {
      $('#newsletter-popup').html('');
    }, 1000);
  }).keyHook();

  //
  // if ( getCookie('popupseen') === "" ) {
  //   console.log('popup!');
  //   $('#newsletter-popup').addClass('opened');
  //   $('body').addClass('overflow-hide');
  //   // window.location.href = "#newsletter-popup";
  //   setCookie('popupseen', 'true', 30);
  //
  //   $('#newsletter-popup-close').click(function(){
  //     $('#newsletter-popup').removeClass('opened');
  //   }).keyHook();
  // } else {
  //   console.log('remove popup');
  //   // $('#newsletter-popup').remove();
  // }


  /*
   * Single Blog
   ***************************/
  $('.single-blog-scroll').click(function () {
    if ($('article').hasClass('single-event')) {
      $('.single-blog-header-content').animate({
        scrollTop: $('.single-blog-content').position().top + $('.single-blog-header-content').scrollTop()
      }, 500);
    } else {
      $('body, html').animate({
        scrollTop: $('.single-blog-content').position().top - $('#masthead').height()
      }, 500);
    }
  });

  // $('.single-blog').scroll(function(){
  //   // console.log($('.single-blog').scrollTop());
  //   if($('.single-blog').scrollTop() > 50){
  //     $('.article-info-slide').addClass('active');
  //   }else{
  //     $('.article-info-slide').removeClass('active');
  //   }
  // });

  /*
   * Single Restaurant
   ***************************/

  $(".menu-button").on('click', function () {
    console.log();
    $(".menu-button").removeClass('active');
    $(this).addClass("active");
    var bt = $(this);
    $(".full-menu.active").fadeOut('fast', function () {
      $(this).removeClass('active');
      console.log($(bt).attr('menu_attr'));
      $(".menu-" + $(bt).attr('menu_attr')).fadeIn('fast', function () {
        $(this).addClass('active');
      });
    });
  });

  /*
   * Instagram AJAX
   ***************************/

  if ($('.ig-feed').length) {
    console.log($('.ig-feed').length);
    $.ajax({
      method: "GET",
      dataType: "jsonp",
      jsonp: "callback",
      jsonpCallback: "jsonpcallback",
      url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=6864564308.0a3b8e2.a54ecc0747504cd3b68615d3c58d6e05&count=8'
    }).done(function (data) {
      if (data) {
        console.log(data);
        // console.log(data.data);
        data.data.forEach(function (elem) {
          console.log(elem);
          var igPost = '<div class="ig-box"><a href="' + elem.link + '" target="_blank" class="ig-box-link"><img src="' + elem.images.standard_resolution.url + '" alt="' + elem.caption.text + '"/> </a></div>';
          $(igPost).insertBefore('.edge-box-tail');
        });
      }
    });
  }

  /*
     * fake AJAX
     ***************************/
  // requires that a variable be made with the box name in the last line of template
  function doAjax(box, filter) {
    var content = window[box];
    if (filter != '') {
      var filtered = [];
      $.each(content, function (i, stuff) {
        $.each(stuff.categories, function (i, cats) {
          if (filter == cats.slug) {
            filtered.push(stuff);
          }
        });
      });
      return filtered;
    } else {
      return content;
    }
  }

  //specific AJAX calls.

  $(".eventsFilter").on('click', function () {
    $(".active").removeClass("active");
    $(this).addClass("active");
    var filteredEvents = doAjax($(this).attr("box"), $(this).attr("filter"));
    $(".all-events a").each(function (i, stuff) {
      var ele = $(this);

      setTimeout(function () {
        $(ele).animate({ opacity: 0 }, 400, function () {});
      }, 100 * i);
    });

    var time = $(".all-events a").length * 200;
    setTimeout(function () {
      $(".all-events a").remove();
      $.each(filteredEvents, function (i, ev) {
        console.log(ev);
        var d = new Date(ev.starts);
        var evstart = ev.starts_month + " " + d.getDate();
        var newstuff = $('<a href="' + ev.url + '" class="home-happenings-event" style="display:none;"><div class="home-happenings-upper"><h6>' + evstart + '</h6><h3>' + ev.name + '</h3><p>' + ev.fields.dek + '</p></div><div class="home-happenings-img"><img src="' + ev.image.url + '" alt="' + ev.image.alt_text + '"></div></a>');

        $(".all-events").prepend(newstuff);
        setTimeout(function () {
          $(newstuff).fadeIn();
        }, filteredEvents.length * 100 - i * 100);
      });
    }, time);
  });

  /*
   * Home Slick
   ***************************/
  $('.home-slides').on('init', function (slick) {
    $('.home-slide-prev').click(function () {
      $('.home-slides').slick('slickPrev');
    });
    $('.home-slide-next').click(function () {
      $('.home-slides').slick('slickNext');
    });
  });

  $('.home-slides').slick({
    'arrows': false,
    'fade': true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false
  });

  /*
   * Restaurant & Flex Content Slick
   ***************************/
  $('.rest-single-gallery, .content-gallery-inner').on('init', function (slick) {
    $('.rest-slide-prev').click(function () {
      $('.rest-single-gallery, .content-gallery-inner').slick('slickPrev');
    });
    $('.rest-slide-next').click(function () {
      $('.rest-single-gallery, .content-gallery-inner').slick('slickNext');
    });
  });

  $('.rest-single-gallery, .content-gallery-inner').slick({
    'arrows': false,
    'fade': true
  });

  /*
   * Kiosk Single - Fit in Square
   */
  if ($('.kiosk_title').length > 0) {
    $('.kiosk_title > h2').each(function () {
      if ($(this).width() > $(this).parent().width()) {
        $(this).addClass('shrink');
      }
    });
  }

  $('#mobile-site-nav .nav-item.has-children a.restaurant-dropdown').unbind().click(function (event) {
    event.preventDefault();
    toggleSubnav(this);
  });

  if (window.location.search == "?email=true") {
    $('#newsletter-popup').addClass('opened success');
    setCookie('popupseen', 'true', 30);
  }

  $('.mercado-map-cont svg .svg-stalls g.svg-stall-cont').hover(function () {
    let $this = $(this);
    console.log($this.attr('disabled'));
    if ($this.attr('disabled') == 'disabled') {
      console.log('nothin');
      return false;
    }

    $('.mercado-map-hover-box img').attr('src', $this.attr('img'));
    $('.mercado-map-hover-box span').html($this.attr('text'));

    // console.log($this);
    $('.mercado-map-hover-box').addClass('active');
    let container = $('.mercado-map-cont svg');

    if ($this.attr('type') == 'restaurant') {
      $('.mercado-map-hover-box').addClass('rest');
    } else {
      $('.mercado-map-hover-box').removeClass('rest');
    }

    if ($(window).width() >= 767) {
      // desktop
      $('.mercado-map-hover-box').css('top', $this.offset().top - container.position().top - $('.mercado-map-hover-box').height());

      let leftOffset = $this[0].getBoundingClientRect().width / 2 - $('.mercado-map-hover-box').width() / 2 + 20;

      // console.log(leftOffset);

      $('.mercado-map-hover-box').css('left', $this.offset().left - container.position().left + leftOffset + 'px');
    } else {
      // mobile
      $('.mercado-map-hover-box').css('top', $this.offset().top - $('#mercado-map').offset().top - $('.mercado-map-hover-box').height() - 40);

      let leftOffset = $this[0].getBoundingClientRect().width / 2 - $('.mercado-map-hover-box').width() / 2 - 10;

      // console.log(leftOffset);

      $('.mercado-map-hover-box').css('left', $this.offset().left - $('.mercado-map-cont').scrollLeft() + leftOffset + 'px');
    }
  }, function () {
    $('.mercado-map-hover-box').removeClass('active');
  });

  if ($(window).width() < 1024) {
    $('.mercado-map-cont').scrollLeft(1024 / 2 - $(window).width() / 2);
  }

  $('.mercado-map-cont svg a').bind('mousedown touchend', function (e) {
    e.preventDefault();
    let id = $(this).find('g.svg-stall-cont').attr('id');
    console.log(id);
    $(".mercado-map-more-info-boxes").addClass('active');
    $('.map-more-info-box').css('display', 'none');
    $('#map-more-info-' + id).css('display', 'block');
    $('#map-more-info-' + id).focus();

    if ($(window).width() < 767) {
      $('.mercado-map-cont').css('overflow', 'hidden');
    }
    if ($(window).width() < 767) {
      $('.mercado-map-more-info-boxes').css('padding-top', $('.mercado-map-cont').position().top * 2 / 3 + 'px');
    } else {
      $('.mercado-map-more-info-boxes').css('padding-top', '0');
    }
  });

  // $('.map-filter-box .selected-filter').unbind('touchstart mousedown');
  $('.map-filter-box .selected-filter').click(function (e) {
    let $this = $(this);
    e.preventDefault();

    $('.mercado-map-more-info-boxes').removeClass('active');

    if ($this.hasClass('active') && $this.attr('type') != 'kiosks') {
      // if click same box
      $('.map-filter-box .selected-filter').removeClass('active');
      $('.mercado-map-cont svg').attr('type', '');
    } else {
      if ($this.parent().find('.map-filter-select').length > 0) {
        console.log('toggle');
        $this.parent().find('.map-filter-select').slideToggle();
      } else {
        $('.map-filter-box .selected-filter').removeClass('active');
        $(this).addClass('active');
        console.log($this.attr('type'));
        $('.selected-filter[type="kiosks"]').html("Kiosks");
        $('.filter-selection').removeClass('active');
        $('.mercado-map-cont svg').attr('type', $this.attr('type'));
      }
    }
  });

  $('.filter-selection').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
      $(this).parent().find('.filter-selection').removeClass('active');
      $('.map-filter-box .selected-filter').removeClass('active');
      $('.mercado-map-cont svg').attr('type', '');
      $('.selected-filter[type="kiosks"]').html("Kiosks");
      $('.map-filter-select').slideUp();
    } else {
      $('.map-filter-box .selected-filter').removeClass('active');

      $(this).parent().find('.filter-selection').removeClass('active');
      $(this).addClass('active');
      $('.map-filter-select').slideUp();
      $(this).parent().parent().parent().find('.selected-filter').addClass('active');
      $(this).parent().parent().parent().find('.selected-filter').html('Kiosks (' + $(this).html() + ')');
      $('.mercado-map-cont svg').attr('type', $(this).attr('type'));
    }
  });

  $('.mercado-map-more-info-close').click(function (e) {
    e.preventDefault();
    $('.mercado-map-more-info-boxes').removeClass('active');
    $('.mercado-map-cont').css('overflow', 'scroll');
  });

  $('.mercado-map-more-info-boxes .bg-fade').click(function () {
    $('.mercado-map-more-info-boxes').removeClass('active');
    $('.mercado-map-cont').css('overflow', 'scroll');
  });

  // CONTACT FORM
  // check if inputs are there
  let formInterval = setInterval(function () {
    if ($('.responsiveCell').length > 0) {
      console.log('test');
      $('.responsiveCell').each(function () {
        $('.requiredStar').remove();
        let text = $(this).find('span').html() + '*';

        let newText = text.split(' ').filter(x => {
          return x != '';
        });

        $(this).find('input[type="text"]').attr('placeholder', newText.join(' '));
        $(this).find('span').hide();
      });

      // if ( getCookie('popupseen') === "" ) {
      //   console.log('popup!');
      //   $('#newsletter-popup').addClass('opened');
      //   $('body').addClass('overflow-hide');
      //   // window.location.href = "#newsletter-popup";
      //   setCookie('popupseen', 'true', 30);
      //
      //   $('#newsletter-popup-close').click(function(){
      //     $('#newsletter-popup').removeClass('opened');
      //   }).keyHook();
      // } else {
      //   console.log('remove popup');
      //   $('#newsletter-popup #clickdimensions-form').html('');
      // }


      clearInterval(formInterval);
    }
  }, 100);

  let hash = window.location.hash;
  if (hash == '#thankyou') {
    $('#newsletter-popup .newsletter-sign-up-form').html('<h2 id="newsletter-popup-title">Thanks for signing up!</h2>');
    $('#newsletter-popup').addClass('opened');
  }
}); // document ready end

/*
 * Window Resize
 ***************************/
$(window).resize(function () {
  windowWidth = $(window).width();
  windowHeight = $(window).height();
  isMobile = windowWidth <= mobileBreakpoint;
}); // end window resize functions

/*
 * Mobile Navigation - Toggle Function
 ***************************/
function toggleMenu(target) {
  isMenuOpen = !isMenuOpen;

  $('#skip-to-navigation-link, .mobile-nav-header-close').attr('aria-expanded', isMenuOpen);
  $('#skip-to-navigation-link').toggleClass('opened');
  $('#mobile-site-nav').toggleClass('opened');
  $('body').toggleClass('hide-overflow');
}

/*
 * Mobile Navigation - Subnav Toggle
 ***************************/
function toggleSubnav(trigger) {
  var target = $(trigger);
  $(trigger).attr('aria-expanded', !($(trigger).attr('aria-expanded') === 'true'));
  $(trigger).toggleClass('expanded');
  $(trigger).parent().find('.nav-children').slideToggle(300);
}

function mobileSubnav(trigger) {
  $(trigger).attr('href', '#' + $(trigger).attr('aria-controls'));
}

/*
 * Footer Carousel - Slick Function
 ***************************/
function footerSlick(target) {
  $(target).slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><span class="screen-reader-text">Previous</span></button>',
    nextArrow: '<button type="button" class="slick-next"><span class="screen-reader-text">Next</span></button>',
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [{
      breakpoint: mobileBreakpoint,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }]
  });
}

/*
 * Keypress Hook
 ***************************/
(function ($) {
  $.fn.keyHook = function () {
    $(this).keypress(function () {
      $(this).trigger('click');
    });
    return this;
  };
})(jQuery);

/*
 * Cookies
 ***************************/
/*
 * Get cookie by key
 * @param cname cookie key
 */
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
/*
 * Set cookie
 * @param cname cookie key
 * @param cvalue cookie value
 * @param exdays num days until cookie expiration
 */
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// function restClick(e){
//   console.log('lcik!');
//   if($(window).width() < 1030){
//     e.preventDefault();
//     $('.nav-children').slideToggle();
//   }
// }

/***/ }),

/***/ "./assets/css/style.scss":
/*!*******************************!*\
  !*** ./assets/css/style.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__(/*! ../assets/js/scripts */ "./assets/js/scripts.js");
__webpack_require__(/*! ../assets/css/style.scss */ "./assets/css/style.scss");
})();

/******/ })()
;
//# sourceMappingURL=main.js.map