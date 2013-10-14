/* Copyright (c) 2012 Chupurnov Valeriy (http://xdan.ru)
 * Homepage:http://evgeniypopov.com
 * Version: 1.0
 * Requires: 1.5.0+
 */
(function($){
$.fn.animateColorText = function( galleryOptions ){
	var defaultOptions = {
         'speed'  : 500 ,    // Скорость смены цвета, мс (дефолтное значение)
         'delay'  : 1000,   // Задержка м/у сменой, мс (дефолтное значение)
         'colorTo': 'red'   //  
	};
	var options = $.extend({}, defaultOptions, galleryOptions);
	// функция инициализации
	var init = function(o){
                 var self = this;
                 (function(){
                     self.o     = o;   
                     self.colorFrom = self.o.css('color');
                     self.colorTo   = self.o.data('color-to') || options.colorTo;
                     self.speed = self.o.data('speed') || options.speed;
                     self.delay = self.o.data('delay') || options.delay;
                 }());
             
                 self.run = function(){
                    self.o.animate({color: self.colorTo }, self.speed);
                    self.reverseColor();
                    setTimeout(function(){self.run()}, self.delay);
                 }  
                 
                 self.reverseColor = function(){
                    var colorTo    = self.colorTo,
                        colorFrom  = self.colorFrom;
                    self.colorTo   = colorFrom;
                    self.colorFrom = colorTo;                       
                 } 
                      
	};
	if (this.length > 0){
		this.each(function(){ 
            new init($(this)).run();
		});
	}
	return this;
}
})(jQuery);