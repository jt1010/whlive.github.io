;(function($){
	$.fn.extend({
		showAndHide: function () {
			$(this).mouseenter( function () {
				$(this).find('div').show();
			} );
			$(this).mouseleave( function () {
				$(this).find('div').hide();
			} );
		},
		asideShow: function () {
			$(this).hover( 
				function () {
					$(this).find('div').css('display', 'block');
					$(this).find('div').stop().animate({left: '-114px', opacity: '1'},500);
				},
				function () {
					$(this).find('div').stop().animate({left: '-168px', opacity: '0'},500);
					$(this).find('div').css('display', 'none');
				}
			)
		},
		fadeInAndOut: function (a, b) {
			$(this).hover(
				function () {
					$(this).find("." + a).stop().fadeOut(500);
					$(this).find(b).stop().fadeIn(500);
				},
				function () {
					$(this).find(b).stop().fadeOut(500);
					$(this).find("." + a).stop().fadeIn(500);
				}
			)
		},
		clickShow: function (c, d){
			$(this).click(
				function (){
					$(c).siblings().stop().fadeOut(100);
					$(c).delay(100).fadeIn();
					$(this).addClass(d);
					$(this).siblings().removeClass(d);
				}
			);
		}
	})
})(jQuery)

