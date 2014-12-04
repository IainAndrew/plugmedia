/**
 * boxlayout.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var Boxlayout1 = (function() {

	var $el = $( '#cs-main' ),
		$sections = $el.children( 'section' ),
		// works section
		$sectionWork = $( '#cs-work-section' ),
		// work items
		$workItems = $( '#cs-work-items span' ),
		// work panels
		$workPanelsContainer = $( '#cs-panel-work-items' ),
		$workPanels = $workPanelsContainer.children( 'div' ),
		totalWorkPanels = $workPanels.length,
		// navigating the work panels
		$nextWorkItem = $workPanelsContainer.find( 'nav > span.cs-next-work' ),
		// if currently navigating the work items
		isAnimating = false,
		// close work panel trigger
		$closeWorkItem = $workPanelsContainer.find( 'nav > span.cs-icon-close' ),
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		// transition end event name
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		// support css transitions
		supportTransitions = Modernizr.csstransitions;

	function init() {
		initEvents();
	}

	function initEvents() {
		
		$sections.each( function() {
			
			var $section = $( this );

			// expand the clicked section and scale down the others
			$section.on( 'click', function() {

				if( !$section.data( 'open' ) ) {
					$section.data( 'open', true ).addClass( 'cs-expand cs-expand-top' );
					$el.addClass( 'cs-expand-item' );
					$('div.cs-panel-items nav').show();	
				}

			} ).find( 'span.cs-icon-close' ).on( 'click', function() {
				
				// close the expanded section and scale up the others
				$section.data( 'open', false ).removeClass( 'cs-expand' ).on( transEndEventName, function( event ) {
					if( !$( event.target ).is( 'section' ) ) return false;
					$( this ).off( transEndEventName ).removeClass( 'cs-expand-top' );
				} );

				if( !supportTransitions ) {
					$section.removeClass( 'cs-expand-top' );
				}

				$el.removeClass( 'cs-expand-item' );
				$('div.cs-panel-items nav').hide();
				
				return false;

			} );

		} );

		// clicking on a work item: the current section scales down and the respective work panel slides up
		$workItems.on( 'click', function( event ) {

			// scale down main section
			$sectionWork.addClass( 'cs-scale-down' );

			// show panel for this work item
			$workPanelsContainer.addClass( 'cs-panel-items-show' );

			var $panel = $workPanelsContainer.find("[data-panel='" + $( this ).data( 'panel' ) + "']");
			currentWorkPanel = $panel.index();
			$panel.addClass( 'cs-show-work' );

			return false;

		} );

		// navigating the work items: current work panel scales down and the next work panel slides up
		$nextWorkItem.on( 'click', function( event ) {
			
			if( isAnimating ) {
				return false;
			}
			isAnimating = true;

			var $currentPanel = $workPanels.eq( currentWorkPanel );
			currentWorkPanel = currentWorkPanel < totalWorkPanels - 1 ? currentWorkPanel + 1 : 0;
			var $nextPanel = $workPanels.eq( currentWorkPanel );

			$currentPanel.removeClass( 'cs-show-work' ).addClass( 'cs-hide-current-work' ).on( transEndEventName, function( event ) {
				if( !$( event.target ).is( 'div' ) ) return false;
				$( this ).off( transEndEventName ).removeClass( 'cs-hide-current-work' );
				isAnimating = false;
			} );

			if( !supportTransitions ) {
				$currentPanel.removeClass( 'cs-hide-current-work' );
				isAnimating = false;
			}
			
			$nextPanel.addClass( 'cs-show-work' );

			return false;

		} );

		// clicking the work panels close button: the current work panel slides down and the section scales up again
		$closeWorkItem.on( 'click', function( event ) {

			// scale up main section
			$sectionWork.removeClass( 'cs-scale-down' );
			$workPanelsContainer.removeClass( 'cs-panel-items-show' );
			$workPanels.eq( currentWorkPanel ).removeClass( 'cs-show-work' );
			
			return false;

		} );

	}

	return { init : init };

})();

//========================================================================================

var Boxlayout2 = (function() {

	var $el = $( '#wk-main' ),
		$sections = $el.children( 'section' ),
		// works section
		$sectionWork = $( '#wk-work-section' ),
		// work items
		$workItems = $( '#wk-work-items > li' ),
		// work panels
		$workPanelsContainer = $( '#wk-panel-work-items' ),
		$workPanels = $workPanelsContainer.children( 'div' ),
		totalWorkPanels = $workPanels.length,
		// navigating the work panels
		$nextWorkItem = $workPanelsContainer.find( 'nav > span.wk-next-work' ),
		// if currently navigating the work items
		isAnimating = false,
		// close work panel trigger
		$closeWorkItem = $workPanelsContainer.find( 'nav > span.wk-icon-close' ),
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		// transition end event name
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		// support css transitions
		supportTransitions = Modernizr.csstransitions;

	function init() {
		initEvents();
	}

	function initEvents() {
		
		$sections.each( function() {
			
			var $section = $( this );

			// expand the clicked section and scale down the others
			$section.on( 'click', function() {

				if( !$section.data( 'open' ) ) {
					$section.data( 'open', true ).addClass( 'wk-expand wk-expand-top' );
					$el.addClass( 'wk-expand-item' );	
					$section.find('.slides').show();
					$section.find('.wk-content').show(1000);
					$('div.wk-panel-items nav').show();
					$('div.cs-panel-items nav').hide();
				}

			} ).find( 'span.wk-icon-close' ).on( 'click', function() {
				
				// close the expanded section and scale up the others
				$section.data( 'open', false ).removeClass( 'wk-expand' ).on( transEndEventName, function( event ) {
					if( !$( event.target ).is( 'section' ) ) return false;
					$( this ).off( transEndEventName ).removeClass( 'wk-expand-top' );
					$sectionWork.removeClass( 'wk-scale-down' );
                    $workPanelsContainer.removeClass( 'wk-panel-items-show' );
                    $workPanels./*eq( currentWorkPanel ).*/removeClass( 'wk-show-work' );
				} );

				if( !supportTransitions ) {
					$section.removeClass( 'wk-expand-top' );
				}

				$el.removeClass( 'wk-expand-item' );
				$section.find('.slides').hide();
				$section.find('.wk-content').hide();
				$('div.cs-panel-items nav').show();
				$('div.wk-panel-items nav').hide();
								
				return false;

			} );

		} );

		// clicking on a work item: the current section scales down and the respective work panel slides up
		$workItems.on( 'click', function( event ) {

			// scale down main section
			$sectionWork.addClass( 'wk-scale-down' );

			// show panel for this work item
			$workPanelsContainer.addClass( 'wk-panel-items-show' );

			var $panel = $workPanelsContainer.find("[data-panel='" + $( this ).data( 'panel' ) + "']");
			currentWorkPanel = $panel.index();
			$panel.addClass( 'wk-show-work' );

			return false;

		} );

		// navigating the work items: current work panel scales down and the next work panel slides up
		/*$nextWorkItem.on( 'click', function( event ) {
			
			if( isAnimating ) {
				return false;
			}
			isAnimating = true;

			var $currentPanel = $workPanels.eq( currentWorkPanel );
			var currentWorkPanel = currentWorkPanel < totalWorkPanels - 1 ? currentWorkPanel + 1 : 0;
			var $nextPanel = $workPanels.eq( currentWorkPanel );

			$currentPanel.removeClass( 'wk-show-work' ).addClass( 'wk-hide-current-work' ).on( transEndEventName, function( event ) {
				if( !$( event.target ).is( 'div' ) ) return false;
				$( this ).off( transEndEventName ).removeClass( 'wk-hide-current-work' );
				isAnimating = false;
			} );

			if( !supportTransitions ) {
				$currentPanel.removeClass( 'wk-hide-current-work' );
				isAnimating = false;
			}
			
			$nextPanel.addClass( 'wk-show-work' );

			return false;

		} );*/

		// clicking the work panels close button: the current work panel slides down and the section scales up again
		$closeWorkItem.on( 'click', function( event ) {

			// scale up main section
			$sectionWork.removeClass( 'wk-scale-down' );
			$workPanelsContainer.removeClass( 'wk-panel-items-show' );
			$workPanels.eq( currentWorkPanel ).removeClass( 'wk-show-work' );
			
			return false;

		} );

	}

	return { init : init };

})();
