function Slider( container, nav ) {
	this.container = container;
	//this.nav = nav.show();
	this.imgs = this.container.find('img');
	this.imgWidth = this.imgs[0].width;
	this.imgsLen = this.imgs.length;
	this.current = 0;
}

Slider.prototype.tranny = function( ) {
	this.container.animate({
		'margin-left' : -( this.current * this.imgWidth )
	});
};

Slider.prototype.setCurrent = function( dir ) {
	this.current += ( ~~( dir === 'next' ) || -1 );
	this.current = ( this.current < 0 ) ? this.imgsLen -1 : this.current % this.imgsLen;
	return this.current;
}

Slider.prototype.thbCurrent = function( altID ) {
	this.current = altID;
}



// carousel
$(document).ready(function() {
    //rotation speed and timer
    var speed = 6000;
    var run = setInterval('rotate()', speed);    
    
    //grab the width and calculate left value
    var item_width = $('.slider-thumbnails li').outerWidth(); 
    var left_value = item_width * (-1); 

    var smallNav = $('.small-nav').show();
        
    //move the last item before first item, just in case user click prev button
    $('.slider-thumbnails li:first').before($('.slider-thumbnails li:last'));
    
    //set the default item to the correct position 
    $('.slider-thumbnails ul').css({'left' : left_value});
    //if user clicked on prev button
    smallNav.find('button[data-dir="prev"]').click(function() {
        //get the right position            
        var left_indent = parseInt($('.slider-thumbnails ul').css('left')) + item_width;
        //slide the item            
        $('.slider-thumbnails ul').animate({'left' : left_indent}, 500,function(){    
            //move the last item and put it as first item                
            $('.slider-thumbnails li:first').before($('.slider-thumbnails li:last'));           
            //set the default item to correct position
            $('.slider-thumbnails ul').css({'left' : left_value});
        
        });
        //cancel the link behavior            
        return false;
            
    });
    //if user clicked on next button
    smallNav.find('button[data-dir="next"]').click(function() {
        
        //get the right position
        var left_indent = parseInt($('.slider-thumbnails ul').css('left')) - item_width;
        
        //slide the item
        $('.slider-thumbnails ul').animate({'left' : left_indent}, 500, function () {
            
            //move the first item and put it as last item
            $('.slider-thumbnails li:last').after($('.slider-thumbnails li:first'));                     
            
            //set the default item to correct position
            $('.slider-thumbnails ul').css({'left' : left_value});
        
        });
                 
        //cancel the link behavior
        return false;
        
    });        
    
    //if mouse hover, pause the auto rotation, otherwise rotate it
    $('.slider-thumbnails').hover(
        
        function() {
            clearInterval(run);
        }, 
        function() {
            run = setInterval('rotate()', speed);    
        }
    ); 
        
});
//a simple function to click next link
//a timer will call this function, and the rotation will begin :)  
function rotate() {
    $('.small-nav').find('button[data-dir="next"]').click();
}
