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
    var isMobile = ( windowWidth <= mobileBreakpoint );
  /* Mobile Navigation */
    var isMenuOpen = false;

/*
 * Document ready
 ***************************/
$(document).ready(function(){
  /*
   * Mobile Navigation (see toggleMenu)
   ***************************/
  if ( $('#skip-to-navigation-link').length ) {
    $('#skip-to-navigation-link').click(function(event){
      event.preventDefault();
      toggleMenu();
    });

    $('#skip-to-navigation-link').keyHook(); // trigger click on keypress
  }

  if ( $('.mobile-nav-header-close').length ) {
    $('.mobile-nav-header-close').click(function(event){
      event.preventDefault();
      toggleMenu();
    });

    $('.mobile-nav-header-close').keyHook(); // trigger click on keypress
  }

  /*
   * Mobile Navigation - Subnav
   ***************************/
  if ( isMobile ) {
    $('.nav-item.has-children a').each(function(){
      mobileSubnav(this);
    });

    $('.nav-item.has-children a').click(function(event){
      event.preventDefault();
      toggleSubnav(this);
    });
  }

  /*
   * Footer Carousel (see footerSlick)
   ***************************/
  if ( $('.partner-carousel').length ) {
    $('.partner-carousel').each(function(){
      footerSlick( this );
    });
  }


  /*
   * Newsletter Popup
   ***************************/
  if ( getCookie('popupseen') === "" ) {
    console.log('popup!');
    $('#newsletter-popup').addClass('opened');
    // window.location.href = "#newsletter-popup";
    setCookie('popupseen', 'true', 30);

    $('#newsletter-popup-close').click(function(){
      $('#newsletter-popup').removeClass('opened');
    }).keyHook();
  } else {
    console.log('remove popup');
    $('#newsletter-popup').remove();
  }



  /*
   * Single Blog
   ***************************/
   $('.single-blog-scroll').click(function(){
     $('.single-blog').animate({
       scrollTop: $('.single-blog').height() + 'px',
     }, 500);
   });

   $('.single-blog').scroll(function(){
     // console.log($('.single-blog').scrollTop());
     if($('.single-blog').scrollTop() > 200){
       $('.article-info-slide').addClass('active');
     }else{
       $('.article-info-slide').removeClass('active');
     }
   });



   /*
    * Instagram AJAX
    ***************************/

    if($(('.ig-feed').length)){
      $.ajax({
        method: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonpcallback",
          url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=6864564308.0a3b8e2.026aedc91bd040fe82e74b3d218a8e7a&count=8'
      }).done(function(data){
        if(data){
          // console.log(data.data);
          data.data.forEach(function(elem){
            console.log(elem);
            var igPost = `<div class="ig-box"><a href="` + elem.link + `" target="_blank" class="ig-box-link"><img src="` + elem.images.standard_resolution.url + `" alt="` + elem.caption.text + `"/> </a></div>`;
            $(igPost).insertBefore('.edge-box-tail');
          });
        }

      });
    }
    /*
     * Instagram AJAX
     ***************************/
      $("#ajaxButton").on('click',function(){
      	var url = $(this).attr("url");
      	//for dev only
        if (location.hostname === "localhost" ){
      	   url="/ajax/";
        }
        boxes = $(this).attr("boxes");
        filter = $(this).attr("filter");
      	console.log("clicked AJAX BUTTON");
        console.log(url);
        var jqxhr = $.get( url,{ boxes: boxes, filter: filter }, function(data) {
          console.log(data);
        });

      });

      /*
       * Home Slick
       ***************************/
      $('.home-slides').on('init', function(slick){
        $('.home-slide-prev').click(function(){
          $('.home-slides').slick('slickPrev');
        });
        $('.home-slide-next').click(function(){
          $('.home-slides').slick('slickNext');
        });
      });

      $('.home-slides').slick({
        'arrows': false,
      });


      /*
       * Restaurant & Flex Content Slick
       ***************************/
       $('.rest-single-gallery, .content-gallery-inner').on('init', function(slick){
         $('.rest-slide-prev').click(function(){
           $('.rest-single-gallery, .content-gallery-inner').slick('slickPrev');
         });
         $('.rest-slide-next').click(function(){
           $('.rest-single-gallery, .content-gallery-inner').slick('slickNext');
         });
       });

       $('.rest-single-gallery, .content-gallery-inner').slick({
         'arrows': false,
         'fade': true,
       });


}); // document ready end

/*
 * Window Resize
 ***************************/
$(window).resize(function(){
  windowWidth = $(window).width();
  windowHeight = $(window).height();
  isMobile = ( windowWidth <= mobileBreakpoint );

  /*
   * Mobile Navigation ARIA
   ***************************/
  if ( isMobile ) {
    // Overarching ARIA expanded
    $('#skip-to-navigation-link, .mobile-nav-header-close').attr('aria-expanded', isMenuOpen);

    // Subnav
    if ( $('.nav-item.has-children a').length ) {
      $('.nav-item.has-children a').each(function(){
        mobileSubnav(this);
      });

      $('.nav-item.has-children a').unbind();

      $('.nav-item.has-children a').click(function(event){
        event.preventDefault();
        toggleSubnav(this);
      });
    }
  } else {
    // Overarching ARIA expanded
    $('#skip-to-navigation-link, .mobile-nav-header-close').attr('aria-expanded', true);
    $('#site-navigation').removeClass('opened');
    isMenuOpen = false;

    // Subnav
    $('.nav-item.has-children a').each(function(){
      $(this).attr('href', $(this).data('url'));
    });

    $('.nav-children').attr('style', 'none');

    if ( $('.nav-item.has-children a').length ) {
      $('.nav-item.has-children a').unbind('click');
    }
  }
}); // end window resize functions

/*
 * Mobile Navigation - Toggle Function
 ***************************/
function toggleMenu( target ) {
  isMenuOpen = !isMenuOpen;

  $('#skip-to-navigation-link, .mobile-nav-header-close').attr('aria-expanded', isMenuOpen);
  $('#site-navigation').toggleClass('opened');
}

/*
 * Mobile Navigation - Subnav Toggle
 ***************************/
function toggleSubnav( trigger ) {
  let target = $(trigger).attr('aria-controls');
  $('#'+target).slideToggle(300);
}

function mobileSubnav( trigger ) {
  $(trigger).attr('href', '#' + $(trigger).attr('aria-controls'));
}


/*
 * Footer Carousel - Slick Function
 ***************************/
function footerSlick( target ) {
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
    responsive: [
      {
        breakpoint: mobileBreakpoint,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  });
}

/*
 * Keypress Hook
 ***************************/
(function( $ ){
  $.fn.keyHook = function() {
    $(this).keypress(function(){
      $(this).trigger('click');
    });
    return this;
  }
})( jQuery );


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
      for(var i = 0; i <ca.length; i++) {
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
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
