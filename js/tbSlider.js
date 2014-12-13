    function Slider( container, nav, sSpeed, rSpeed ) { // Constructor Slider
    	this.container = container;
    	this.imgs = this.container.find('img');
    	this.imgWidth = this.imgs[0].width;
    	this.imgsLen = this.imgs.length;
        this.nav = nav;
        this.buildTbs(); // build small slider of thumbnail imgs
    	this.current = 0;
        this.events.click.call(this);
        this.events.hover.call(this);
        this.sSpeed = sSpeed;
        this.rSpeed = rSpeed;
        this.run.setter(this.sSpeed);
    }

    Slider.prototype.trannyBig = function(speed) {
    	this.container.animate({
    		'margin-left' : -( this.current * this.imgWidth )
    	}, speed, function() {
            var randomNum = Math.random().toString(),
                hexCode = randomNum.slice(2,8);
                $('body').css('background', ( '#' + hexCode) );
        });
    }

    Slider.prototype.trannySm = function( ) {
        tbContainer.animate({
            'margin-left' : -( this.current * tbImgWidth )
        });
    }

    Slider.prototype.setCurrent = function( dir ) {
    	this.current += ( ~~( dir === 'next' ) || -1 );
    	this.current = ( this.current < 0 ) ? this.imgsLen -1 : this.current % this.imgsLen;
    	return this.current;
    }

    Slider.prototype.thbCurrent = function( altID ) {
    	if ( altID != 'undefined') {
            this.current = altID;
        } else {
            console.log("this is where to reset current for small slider");
        }
    }

    Slider.prototype.buildTbs = function() {
        this.imgs.each(function(index) {
            $("ul","div.slider-thumbnails")
                .append(" <li><img alt='two' data-number='" + index + "' src='" + $(this).attr("src") + '?wid=150' + "'/></li>");
        });
        //move the last item before first item, just in case user click prev button
        $('.slider-thumbnails li:first').before($('.slider-thumbnails li:last'));
        //set the default item to the correct position 
        $('.slider-thumbnails ul').css({'left' : -( $('.slider-thumbnails li').outerWidth() ) });
    }
    
    Slider.prototype.run = {
        rotator : function () {
            // find a way to call this.nav from here??
            $('.small-nav').find('button[data-dir="next"]').click();
        },
        setter : function(speed) { 
            // this == run{} SETTER
            var self = this;
            // _clearID global variable for clearInterval param
            _clearID = setInterval(function () {
                self.rotator();
            }, speed);
        }
    } // run{}

    Slider.prototype.events = {

        click : function() {
            var self = this, // this == Slider{}
                tb_container = $('.slider-thumbnails'),
                tbImgs = tb_container.find('img');

            self.nav.find('button').on('click', function() {
                var whichDir = $(this).data('dir'),
                    item_width = tb_container.find('li').outerWidth(), 
                    left_value = item_width * (-1); 

                if ( whichDir == 'prev' ) {
                    var left_indent = parseInt($('.slider-thumbnails ul').css('left')) + item_width;
                        tb_container.find('ul').animate({'left' : left_indent}, self.rSpeed, function(){    
                            tb_container.find('li:first').before(tb_container.find('li:last'));           
                            tb_container.find('ul').css({'left' : left_value});
                        });
                        return false; //cancel the link behavior
                } else {
                    var left_indent = parseInt(tb_container.find('ul').css('left')) - item_width;
                        tb_container.find('ul').animate({'left' : left_indent}, self.rSpeed, function () {
                            tb_container.find('li:last').after(tb_container.find('li:first'));                     
                            tb_container.find('ul').css({'left' : left_value});
                    });
                    return false; // cancel link behavior
                }
            });

            tbImgs.on('click', function() {
                var altID = $(this).data('number');
                        
                    $('.arrow').remove();
                    $('li.chosen').removeClass('chosen');
                    $(this).parent('li').addClass('chosen').prepend('<em class="arrow"></em>');

                    slider.thbCurrent( altID );
                    slider.trannyBig(self.rSpeed);
            });
        }, 

        hover : function() {
            var self = this; // this == events{}

            $(".slider-thumbnails").on({
                mouseenter : function() {
                    clearInterval(_clearID);
                },
                mouseleave : function() {
                    self.run.setter(self.sSpeed);   
                }
            });
        } 
    }; // END events{}