'use strict';

$(function() {
	var pull = $('#pull');
	var menu = $('nav ul');

	$(pull).on('click', function(e) {
		e.preventDefault();
		menu.slideToggle();
	});

	$(window).resize(function(){
		var w = $(window).width();
		if(w > 320 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});
});

$(function() {
	$('.scroll-down').click(function() {
		$('.home-header').css({
			'background-color' : 'rgba(0, 0, 0, 0.8)'
		});
		$('.header-text-and-logo').addClass('neon');
		$('.svg-icon svg').attr('class', 'neonsvg');
	});
});