'use strict';

// Navbar //

$(function() {
	var toggle = $('#nav-toggle'),
		menu = $('nav ul'),
		icon = $('#nav-toggle i');

	toggle.click(function(e) {
		e.preventDefault();
		menu.slideToggle();
		if (icon.hasClass('fa-navicon')) {
			icon.removeClass('fa-navicon').addClass('fa-times');
		} else if (icon.hasClass('fa-times')) {
			icon.removeClass('fa-times').addClass('fa-navicon');
		}
	});

	$(window).resize(function() {
		var width = $(window).width();
		if (width > 320 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});
});


// Full plug animation //

$(function() {
	var plug = $('.plug');
	plug.click(function() {
		plug.toggleClass('plug-rotated');
		if ( plug.hasClass('plug-rotated') ) {
			$('.home-header').css({
				'background-color' : 'rgba(0, 0, 0, 0.8)'
			});
			$('.header-text-and-logo').addClass('neon');
			$('.svg-icon svg').attr('class', 'neonsvg');

		} else if ( !plug.hasClass('plug-rotated') ) {
			$('.home-header').css({
				'background-color' : 'rgba(231, 76, 60, 0.93)'
			});
			$('.header-text-and-logo').removeClass('neon');
			$('.svg-icon svg').removeAttr('class', 'neonsvg');
		}
	});
});

// Waypoints //

$(function() {
	var nav = $('nav'),
		a = $('nav li a'),
		width = window.innerWidth;
	if (width > 768) {

		$('.test-section').waypoint(function(direction) { // change to '.what-we-do'
			if (direction === 'down') {
				nav.stop().animate({height:'2.5rem'}, {duration:300});
				a.stop().animate({height:'2.5rem', lineHeight:'2.5rem'}, {duration:300});
			} else if (direction === 'up') {
				nav.stop().animate({height:'5rem'}, {duration:300});
				a.stop().animate({height:'5rem', lineHeight:'5rem'}, {duration:300});
			}
		}, { offset: 80 });

	}
});

//// TEST CODE BELOW //////////////////

/*
$(function() {
	var plug = $('#plug-scroll');

	$('.test-section').waypoint(function(direction) {
		if (direction === 'down') {
			plug.stop().animate({top:'-25rem'}, {duration:500});
			$('.svg-icon').addClass('icon-rotated').delay(200).animate({opacity:0}, {duration:200});
		}
		else if (direction === 'up') {
			plug.stop().animate({top:'-60rem'}, {duration:500});
			$('.svg-icon').removeClass('icon-rotated').animate({opacity:1}, {duration:200});
		}
	}, { offset: 400 });
});
*/




var stickyElement = function () {
    // element to be sticky
    var $sticky = $('#plug-scroll');
    // element that will stop the sticky element
    var $stopper = $('.div-box');

    $sticky.waypoint('unsticky', {
        wrapper: '<div class="sticky-wrapper" />',
        stuckClass: 'sticky',
        //offset: -1
    });

    $stopper.waypoint(function (direction) {
        if (direction === 'down') {
            // when scrolling down
            // replace pos:fixed with absolute and set top value to
            // the distance from $stopper to viewport top minus the 
            // height of the stickyElement 
            var stopperOffset = $stopper.offset();
            $sticky.css({
                position: 'absolute',
                top: stopperOffset.top - $sticky.outerHeight() + 50
            });
        } else if (direction === 'up') {
            // remove the inline styles so sticky styles apply again
            $sticky.attr('style', '');
        }

    }, {
        // trigger the waypoint when the bottom of stickyEl touches top of stopEl
        offset: function () {
            return $sticky.outerHeight() - 50;
        }
    });
};

stickyElement();