$(function() {

    $(document).on('click','.tab-list a',function() {

        var $newList = $(this);

		var $parList = $(this).parents(".main");

        var curList = $parList.find("a.g").attr("title");

        $parList.find("a").removeClass("g");

        $newList.addClass("g");

        // 获取点击元素的title

    	var listID = $newList.attr("title");  

        if (listID != curList) {

            $parList.find("#"+curList).fadeOut(50, function() {

                $parList.find("#"+listID).fadeIn(); 

            });

        };        

        return false;

    });

});