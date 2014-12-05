$(document).ready(function() {
    //rotation speed and timer
    var speed = 5000;
    var run = setInterval('rotate()', speed);    
    
    //grab the width and calculate left value
    var item_width = $('.thumbnails li').outerWidth(); 
    var left_value = item_width * (-1); 

    var smallNav = $('.small-nav').show();
        
    //move the last item before first item, just in case user click prev button
    $('.thumbnails li:first').before($('.thumbnails li:last'));
    
    //set the default item to the correct position 
    $('.thumbnails ul').css({'left' : left_value});
    //if user clicked on prev button
    smallNav.find('button[data-dir="prev"]').click(function() {
        //get the right position            
        var left_indent = parseInt($('.thumbnails ul').css('left')) + item_width;
        //slide the item            
        $('.thumbnails ul').animate({'left' : left_indent}, 500,function(){    
            //move the last item and put it as first item                
            $('.thumbnails li:first').before($('.thumbnails li:last'));           
            //set the default item to correct position
            $('.thumbnails ul').css({'left' : left_value});
        
        });
        //cancel the link behavior            
        return false;
            
    });
    //if user clicked on next button
    smallNav.find('button[data-dir="next"]').click(function() {
        
        //get the right position
        var left_indent = parseInt($('.thumbnails ul').css('left')) - item_width;
        
        //slide the item
        $('.thumbnails ul').animate({'left' : left_indent}, 500, function () {
            
            //move the first item and put it as last item
            $('.thumbnails li:last').after($('.thumbnails li:first'));                     
            
            //set the default item to correct position
            $('.thumbnails ul').css({'left' : left_value});
        
        });
                 
        //cancel the link behavior
        return false;
        
    });        
    
    //if mouse hover, pause the auto rotation, otherwise rotate it
    $('.thumbnails').hover(
        
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
    smallNav.findfind('button[data-dir="next"]').click();
}