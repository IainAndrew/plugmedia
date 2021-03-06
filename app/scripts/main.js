'use strict';

//window.viewportUnitsBuggyfill.init();

if ( !Modernizr.touch ) {

	var width = window.innerWidth;

	if (width > 768) {
		var s = skrollr.init();
	}

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
smoothScroll($('#scroll-down-connect'), $('section.contact'), 0);
smoothScroll($('#scroll-down-services'), $('.block-services-tagline'), 0);
smoothScroll($('#scroll-down-blog'), $('section.blog'), 0);

// Smooth scroll for anchor links
$('a:not(nav a)[href!="javascript:void(0)"]').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 1000);
    return false;
});

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
/*
$(function() {
	$('footer').footerReveal({
		zIndex : -1
	});
});
$(function() {
	$('.scroll-down').waypoint(function(direction) {
		if (direction === 'down') {
			$('footer').show();
		}
		else if (direction === 'up') {
			$('footer').hide();
		}
	});
});
*/
// Team member hover overlay
$(function() {
	var team = $('.team-member'),
		ovl = $('.team-member-overlay');
	if ( Modernizr.touch == false) {
		team.hover(function() {
			$(this).find(ovl).stop().animate({top:'50%'}, {duration:200});
		}, function() {
			$(this).find(ovl).stop().animate({top:'100%'}, {duration:200});
		});
	}
});


// Team member lightbox
$(function() {
	var team = $('.team-member'),
		box = $('.lightbox'),
		exit = box.find('.icon-exit'),
		privacy = $('.privacy-lightbox'),
		privacyExit = privacy.find('.icon-exit'),
		darkLayer = $('.lightbox-background');

	team.click(function() {
		$(this).find(box).show(500);
		darkLayer.show(300);
	});
	exit.click(function() {
		box.hide(300);
		darkLayer.hide(200);
		return false;
	});

	$('.open-privacy-policy').click(function() {
		privacy.show(500);
		darkLayer.show(300);
	});
	privacyExit.click(function() {
		privacy.hide(300);
		darkLayer.hide(200);
		return false;
	});
});

// Enable click events on google map 
$('.google-map').click(function () {
    $('.google-map iframe').css("pointer-events", "auto");
});

$(function() {
	Boxlayout1.init();
	Boxlayout2.init();
});

$('#slides-1')
.add($('#slides-2'))
.add($('#slides-3'))
.add($('#slides-4'))
.add($('#slides-5'))
.add($('#slides-6'))
.add($('#slides-7'))
.add($('#slides-8'))
.add($('#slides-9'))
.add($('#slides-10'))
.add($('#slides-11'))
.add($('#slides-12'))
.superslides({
	play: 4000,
	pagination:false
});