'use strict';

var width = window.innerWidth;

if (width > 640) {
	var s = skrollr.init();
}

// Mobile navbar functionality //

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

// Navbar resize on scroll //

var navResize = function(section) {
	var nav = $('nav'),
		a = $('nav li a'),
		icon = $('nav #home-icon');
	if (width > 768) {

		section.waypoint(function(direction) {
			if (direction === 'down') {
				nav.stop().animate({height:'2.5rem'}, {duration:300});
				a.stop().animate({height:'2.5rem', lineHeight:'2.5rem'}, {duration:300});
				icon.show(300);
			} else if (direction === 'up') {
				nav.stop().animate({height:'5rem'}, {duration:300});
				a.stop().animate({height:'5rem', lineHeight:'5rem'}, {duration:300});
				icon.hide(300);
			}
		}, { offset: 80 });

	}
};

navResize($('.process'));
//navResize($('.block-work-better'));
//navResize($('.showcase-intro'));

// Smooth scroll //

var smoothScroll = function(click, section, spacing) {
	click.click(function() {
		$('html, body').animate({scrollTop:section.offset().top + spacing}, {duration:1000});
	});
};

smoothScroll($('#scroll-down-home'), $('section.process'), 50);
smoothScroll($('#scroll-down-about'), $('.block-work-better'), 0);
smoothScroll($('#scroll-down-showcase'), $('.showcase-intro'), 0);

// Full plug/socket animation //

$(function() {
	var plug = $('.plug'),
		bg = $('.home-header-bg'),
		textandlogo = $('.header-text-and-logo'),
		icon = $('.svg-icon svg');

	plug.click(function() {
		plug.toggleClass('plug-rotated');
		if ( plug.hasClass('plug-rotated') ) {
			bg.css({
				'background-color' : 'rgba(0, 0, 0, 0.8)'
			});
			textandlogo.addClass('neon');
			icon.attr('class', 'neonsvg');

		} else if ( !plug.hasClass('plug-rotated') ) {
			bg.css({
				'background-color' : 'rgba(231, 76, 60, 0.93)'
			});
			textandlogo.removeClass('neon');
			icon.removeAttr('class', 'neonsvg');
		}
	});
});

// Logo flip & plug animate down //

$(function() {
	var plug = $('#plug-scroll');
	var svg = $('.svg-icon');

	$('.process').waypoint(function(direction) {
		if (direction === 'down') {
			plug.stop().animate({top:'-1rem'}, {duration:500});
			svg.addClass('icon-rotated').delay(200).animate({opacity:0}, {duration:200});
		}
		else if (direction === 'up') {
			plug.stop().animate({top:'-30rem'}, {duration:500});
			svg.removeClass('icon-rotated').animate({opacity:1}, {duration:200});
		}
	}, { offset: 400 });
});

// Flicker effect 
var flicker = function() {
	var img = $('.office-img'),
		darken = $('.darken');

	darken.animate({opacity:0}, {duration:1})
	.animate({opacity:0}, {duration:1})
	.animate({opacity:0}, {duration:1})
	.animate({opacity:0.4}, {duration:1})
	.animate({opacity:0}, {duration:1})
	.animate({opacity:0.5}, {duration:1})
	.animate({opacity:0}, {duration:1})
	.animate({opacity:0.4}, {duration:100})
	.animate({opacity:0}, {duration:1})
	.animate({opacity:0.5}, {duration:1})
	.animate({opacity:0}, {duration:1})
	.animate({opacity:6}, {duration:300})
	.animate({opacity:0}, {duration:1})
	.animate({opacity:0.3}, {duration:1})
	.animate({opacity:0.7}, {duration:100})
	.animate({opacity:0}, {duration:1});
};

// Scrolling plug //

var stickyElement = function () {
	var $sticky = $('#plug-scroll');
	var $stopper = $('.office-img');

	$sticky.waypoint('unsticky', {
		//wrapper: '<div class="sticky-wrapper" />',
		stuckClass: 'sticky',
		//offset: -1
	});

	$stopper.waypoint(function (direction) {
		if (direction === 'down') {
			var stopperOffset = $stopper.offset();
			// on scroll down, set position to absolute, and top to the distance from $stopper to viewport top minus the height of $sticky
			$sticky.css({
				position: 'absolute',
				top: stopperOffset.top - $sticky.outerHeight() + 50
			});
			flicker();
		} else if (direction === 'up') {
			// resetting .sticky styles
			$sticky.css({
				position: 'fixed',
				top:'-1rem'
			});
			$('.darken').css({
				opacity: 1
			});
		}

	}, {
		// trigger waypoint when bottom of $sticky touches top of $stopper - 50px
		offset: function () {
			return $sticky.outerHeight() - 50;
		}
	});
};

stickyElement();


// Footer reveal

/*$(function() {
	$('footer').footerReveal({
		zIndex : 0
	});
});*/

//////


$('a:not(nav a)').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 1000);
    return false;
});
