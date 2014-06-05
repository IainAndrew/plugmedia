(function($) {
	$.fn.footerReveal = function(options) {
		var $this = $(this),
	    $prev = $this.prev(),
		defaults = $.extend ({
            shadow : true,
            zIndex : -100
        }, options );
	 	
	 	$this.css({
		   position : 'fixed',
		   bottom : 0,
		});

		if (defaults.zIndex) {
			$this.css({
				'z-index' : defaults.zIndex
			});
		} else {
			$this.css({
				'z-index' : options.zIndex
			});
		}

		if ($prev.outerWidth !== $(window).width()) {
			$this.css({
				'max-width' : $prev.outerWidth()
			});
		}

		$prev.css({
			'margin-bottom' : $this.outerHeight()
		});

		if (defaults.shadow) {
			$prev.css({
				'box-shadow' : '0 20px 30px -20px rgba(0,0,0,0.8)',
				'-moz-box-shadow' : '0 20px 30px -20px rgba(0,0,0,0.8)',
				'-webkit-box-shadow' : '0 20px 30px -20px rgba(0,0,0,0.8)'
			});
		}
	}
}) (jQuery);