/*
 * Constants
 ***************************/
const mobileBreakpoint = 767;

/*
 * Document ready
 ***************************/
$(document).ready(function(){
  /*
   * Footer Carousel
   ***************************/
  if ( $('.partner-carousel').length ) {
    $('.partner-carousel').each(function(){
      footerSlick( this );
    });
  }
}); // document ready end

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