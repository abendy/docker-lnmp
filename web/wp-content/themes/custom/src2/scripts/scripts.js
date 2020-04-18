// eslint-disable-next-line no-undef
jQuery(($) => {
  $('body').addClass('pageload');

  const demoslides = (slide) => {
    $('.switch-container.enter').removeClass('exit');


    // Exit
    const active = $('.switch-container.active');
    $('.switch-container.active').addClass('exit');

    // Enter
    active.removeClass('exit').removeClass('active').removeClass('enter');


    // Reset
    setTimeout(() => {
      slide.addClass('active').addClass('enter');
    }, 200);
  };


  const demoone = () => {
    $('#one-btn').parent().addClass('active');
    $('#one').addClass('enter');


    const slide = $('#one');
    demoslides(slide);
    window.location.hash = 'schedule';
  };


  const demoexperience = () => {
    $('#experience-btn').parent().addClass('active');

    $('#experience').addClass('enter');
    window.location.hash = 'exp';


    const slide = $('#experience');
    demoslides(slide);
  };

  const demo = () => {
    $('.btn-demo').click(() => {
      const btn = $(this);
      const current = $(this).parent();

      if ($(this).parent().hasClass('active')) {
        current.removeClass('active');
      } else {
        if (btn.attr('id') === 'experience-btn') {
          $('.btn-demo').parent().removeClass('active');
          demoexperience();
        }

        if (btn.attr('id') === 'one-btn') {
          $('.btn-demo').parent().removeClass('active');
          demoone();
        }
      }
    });

    const loc = window.location.hash;


    if (loc === '#exp') {
      $('.btn-demo').parent().removeClass('active');
      demoexperience();
    }

    if (loc === '#schedule') {
      $('.btn-demo').parent().removeClass('active');
      demoone();
    }
  };

  const init = () => {
    if ($('#switch-content').length) {
      demo();
    }

    // Check for table
    if ($('table').length) {
      $('table').wrap('<div class=table-wrap>');
    }


    $('#menu-item-154').find('a.quadmenu-dropdown-toggle.hoverintent').attr('href', '');


    const cta = $('#menu-item-19649').clone();
    $('#et-secondary-nav.menu').prepend(cta);
  };

  init();
});
