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

		$('.what-we-do').waypoint(function(direction) {
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
