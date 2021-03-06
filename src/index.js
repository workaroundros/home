'use strict';

import './styles/style.scss';
import 'jquery.easing';
import 'jquery.stellar/jquery.stellar';
import 'waypoints/lib/jquery.waypoints.js';
import 'owl.carousel';
import 'magnific-popup';

// iPad and iPod detection
var isiPad = function() {
  return navigator.platform.indexOf('iPad') != -1;
};

var isiPhone = function() {
  return navigator.platform.indexOf('iPhone') != -1 || navigator.platform.indexOf('iPod') != -1;
};

// Burger Menu
var burgerMenu = function() {
  $('body').on('click', '.js-fh5co-nav-toggle', function() {
    if ($('#fh5co-navbar').is(':visible')) {
      $(this).removeClass('active');
    } else {
      $(this).addClass('active');
    }
  });
  $('body').on('click', '.js-fh5co-nav-toggle-secondary', function() {
    if ($('#fh5co-navbar').is(':visible')) {
      $('.fh5co-nav-toggle').removeClass('active');
    } else {
      $('.fh5co-nav-toggle').addClass('active');
    }
  });
};

var owlCrouselFeatureSlide = function() {
  var owl = $('.owl-carousel');

  owl.on('initialized.owl.carousel change.owl.carousel', function(elem) {
    var current = elem.item.index;
    $(elem.target)
      .find('.owl-item')
      .eq(current)
      .find('.to-animate')
      .removeClass('fadeInUp animated');
  });
  owl.on('initialized.owl.carousel changed.owl.carousel', function(elem) {
    window.setTimeout(function() {
      var current = elem.item.index;
      $(elem.target)
        .find('.owl-item')
        .eq(current)
        .find('.to-animate')
        .addClass('fadeInUp animated');
    }, 400);
  });

  owl.owlCarousel({
    items: 1,
    loop: true,
    margin: 0,
    responsiveClass: true,
    nav: true,
    dots: true,
    smartSpeed: 500,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    navText: ["<i class='icon-arrow-left2 owl-direction'></i>", "<i class='icon-arrow-right2 owl-direction'></i>"],
  });
};

// Magnific Popup
var allImages = require.context('./images/gallery/');
$('#gallery').html(
  ['<div class="row">']
    .concat(
      allImages.keys().map(function(it) {
        return (
          '<div class="col-sm-12 col-md-6 col-lg-4"><p><a class="image-popup" href="' +
          allImages(it) +
          '"><img src="' +
          allImages(it) +
          '" class="img-responsive img-rounded" alt="Workaround Rosario"/></a></p></div>'
        );
      })
    )
    .concat('</div>')
    .join('')
);

var magnifPopup = function() {
  $('.image-popup').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-with-zoom',
    gallery: {
      enabled: true,
    },
    zoom: {
      enabled: true, // By default it's false, so don't forget to enable it

      duration: 300, // duration of the effect, in milliseconds
      easing: 'ease-in-out', // CSS transition easing function

      // The "opener" function should return the element from which popup will be zoomed in
      // and to which popup will be scaled down
      // By defailt it looks for an image tag:
      opener: function(openerElement) {
        // openerElement is the element on which popup was initialized, in this case its <a> tag
        // you don't need to add "opener" option if this code matches your needs, it's defailt one.
        return openerElement.is('img') ? openerElement : openerElement.find('img');
      },
    },
  });
};

// Animate Feature
var animateFeatureIcons = function() {
  if ($('#fh5co-features').length > 0) {
    $('#fh5co-features .to-animate').each(function(k) {
      var el = $(this);

      setTimeout(
        function() {
          el.addClass('bounceIn animated');
        },
        k * 200,
        'easeInOutExpo'
      );
    });
  }
};

// Animate Products
var animateProducts = function() {
  if ($('#fh5co-products').length > 0) {
    $('#fh5co-products .to-animate').each(function(k) {
      var el = $(this);

      setTimeout(
        function() {
          el.addClass('bounceIn animated');
        },
        k * 200,
        'easeInOutExpo'
      );
    });
  }
};

// Animate Clients Logo
var animateClientLogo = function() {
  if ($('#fh5co-clients').length > 0) {
    $('#fh5co-clients .to-animate').each(function(k) {
      var el = $(this);

      setTimeout(
        function() {
          el.addClass('bounceIn animated');
        },
        k * 200,
        'easeInOutExpo'
      );
    });
  }
};

// Waypoints
var featureIconsWayPoint = function() {
  if ($('#fh5co-features').length > 0) {
    $('#fh5co-features').waypoint(
      function(direction) {
        if (direction === 'down' && !$(this).hasClass('animated')) {
          setTimeout(animateFeatureIcons, 200);

          $(this).addClass('animated');
        }
      },
      { offset: '80%' }
    );
  }
};
var productsWayPoint = function() {
  if ($('#fh5co-products').length > 0) {
    $('#fh5co-products').waypoint(
      function(direction) {
        if (direction === 'down' && !$(this).hasClass('animated')) {
          setTimeout(animateProducts, 200);

          $(this).addClass('animated');
        }
      },
      { offset: '80%' }
    );
  }
};

var clientsWayPoint = function() {
  if ($('#fh5co-products').length > 0) {
    $('#fh5co-products').waypoint(
      function(direction) {
        if (direction === 'down' && !$(this).hasClass('animated')) {
          setTimeout(animateClientLogo, 200);

          $(this).addClass('animated');
        }
      },
      { offset: '80%' }
    );
  }
};

$(function() {
  burgerMenu();
  owlCrouselFeatureSlide();
  magnifPopup();

  featureIconsWayPoint();
  productsWayPoint();
  clientsWayPoint();

  $('.top-menu-btn').click(function() {
    var target_element = $(this).data('target-element');
    $('html, body').animate(
      {
        scrollTop: $('#' + target_element).offset().top - 65,
      },
      2000
    );
  });

  $('#contact_form').on('submit', function(e) {
    e.preventDefault();
    $.post('/contact', $(this).serialize())
      .success(function(response) {
        $('.modal-title').html('Consulta enviada');
        $('#modal-body-text').html(
          'Gracias por tu mensaje, a la brevedad nos contactaremos con vos para coordinar una visita a la oficina'
        );
        clean_form();
        show_modal();
      })
      .error(function(err) {
        $('.modal-title').html('Error');
        $('#modal-body-text').html(err.responseJSON.error);
        show_modal();
      });
  });
  function show_modal() {
    $('#confirmation_modal').modal('toggle');
  }
  function clean_form() {
    $('.form-control').val('');
  }
});
