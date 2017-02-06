$(function(){
	//搜索栏
	$('.search-header input').focus(
		function () {
			$(this).stop().animate({width: '250px'}, 1000);
			$(this).next().stop().animate({left: '286px'}, 1000);
		}
	);
	$('.search-header input').blur(
		function () {
			$(this).stop().animate({width: '135px'}, 1000);
			$(this).next().stop().animate({left: '171px'}, 1000);
		}
	);
	//显示与隐藏
	$('.nav-list-top').showAndHide();
	//headroom
	(function() {
	    var header = new Headroom(document.querySelector("header"), {
	        tolerance: 5,
	        offset : 100,
	        classes: {
				initial: "headroom",
				pinned: "headroom--pinned",
				unpinned: "headroom--unpinned"
	        }
	    });
	    header.init();
	}());
	//右侧固定侧边栏
	$('.aside_hot').asideShow();
	$('.aside_mine').asideShow();
	$('.aside_order').asideShow();		
	$('.aside_tel').asideShow();
	$('.aside_qq').asideShow();
	$('.aside_weixin').hover( 
		function (){
			$(this).find('div').css('display', 'block');
			$(this).find('div').stop().animate({left: '-130px', opacity: '1'},500);
		},
		function (){
			$(this).find('div').stop().animate({left: '-168px', opacity: '0'},500);
			$(this).find('div').css('display', 'none');
		}
	);
	//回到顶部隐藏于显示
	$(window).scroll( function (){
		if ($(this).scrollTop() > 10) {
			$('.aside_top').show();
		}else{
			$('.aside_top').hide();
		};
	});
});