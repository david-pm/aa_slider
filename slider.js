function Slider( container, nav ) {
	this.container = container;
	this.nav = nav.show();
	this.imgs = this.container.find('img');
	this.imgWidth = this.imgs[0].width;
	this.imgsLen = this.imgs.length;
	this.current = 0;
}

Slider.prototype.tranny = function( coords ) {

	this.container.animate({
		'margin-left' : coords || -( this.current * this.imgWidth )
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

