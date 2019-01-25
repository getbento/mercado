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
});

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