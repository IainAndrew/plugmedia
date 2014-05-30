//'use strict';

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
			$('.home-header-bg').css({
				'background-color' : 'rgba(0, 0, 0, 0.8)'
			});
			$('.header-text-and-logo').addClass('neon');
			$('.svg-icon svg').attr('class', 'neonsvg');

		} else if ( !plug.hasClass('plug-rotated') ) {
			$('.home-header-bg').css({
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

		$('.process').waypoint(function(direction) {
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

// Flicker effect 
var flicker = function() {
	var img = $('.office-img'),
		darken = $('.darken');

	darken.animate({opacity:0}, {duration:1})
	.animate({opacity:0}, {duration:1})
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

//// TEST CODE BELOW //////////////////


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

var stickyElement = function () {
	var $sticky = $('#plug-scroll');
	var $stopper = $('.office-img');

	$sticky.waypoint('unsticky', {
		wrapper: '<div class="sticky-wrapper" />',
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


// NOT WORKING VVVVVVVV FLICKER EFFECT
	
/*function flash(){
	var del = Math.floor((Math.random()*300)+50);
    $('.darken').toggleClass("display-none").delay(del);
	$('.darken').promise().done(function(){
		flash();
	});
}
$('.office-img').waypoint(function(direction) {
	if (direction === 'down') {
		flash();
		var timesRun = 0;
		var interval = setInterval(function(){
		    timesRun += 1;
		    if(timesRun === 1){
		        clearInterval(interval);
		    }
		    flash().stop();
		    $('.darken').addClass('display-none');
		}, 1500); 
	} 
});
*/

//////////////////

// SKROLLR

var s = skrollr.init();


