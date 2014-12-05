(function($) { // $ == jQuery
	var sliderUL = $('.slider').children('ul'),
		imgs = sliderUL.find('img'),
		imgWidth = imgs[0].width, 				// 600
		imgsLength = imgs.length, 				// 4
		currentImg = 1, 
		totalImgsWidth = imgWidth * imgsLength; // 2400

	$('nav').show().find('button').on('click', function() {
		var direction = $(this).data('dir'),
			location = imgWidth; 				// 600
		
		// update current value		
		( direction === 'next' ) ? ++currentImg : --currentImg;

		// if first image
		if ( currentImg === 0 ) { // user is on first img and clicked back btn
			currentImg = imgsLength;
			location = totalImgsWidth - imgWidth; // 2400 - 600
			direction = 'next';
		} else if ( currentImg - 1 === imgsLength ) { // user is on last image and clicked next btn
			currentImg = 1;							  // are we at end? reset?
			location = 0;
		}
		
		tranny(sliderUL, location, direction);
	});

	function tranny( container, location, direction ) {
		var unit; // -= +=
		
		if ( direction && location !== 0) { // if location is 0, we want to go back to 0
			unit = ( direction === 'next' ) ? '-=' : '+=';
		}

		container.animate({ 
			'margin-left': unit ? (unit + location) : location
		}, 'fast');
	} // tranny()
})(jQuery); // self-ivoking anonymous function