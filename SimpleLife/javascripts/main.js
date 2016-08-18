/*
* @Author: 12400
* @Date:   2016-08-17 15:37:48
* @Last Modified by:   12400
* @Last Modified time: 2016-08-18 17:36:09
*/

(function(){
	window.onload = function() {
		changeMoreBar();
	}

	window.onresize = function() {
		changeMoreBar();
	}

	function changeMoreBar() {
		var height = document.documentElement.clientHeight;
		$('.search-mask').css('height',(height-72));
	}

	var moreBar = $('.more-bar')[0];
	moreBar.onclick = function() {
		this.style.display = "none";
		$('.more-content').css('display','block');
	}

	function getScrollTop() {
		var scrollTop = 0;
		if (document.documentElement && document.documentElement.scrollTop) {
			scrollTop = document.documentElement.scrollTop;
		}
		else if (document.body) {
			scrollTop = document.body.scrollTop;
		}
		return scrollTop;
	}

	// window.onscroll = function() {
	// 	console.log(getScrollTop())
	// 	if (getScrollTop() >= 272) {
	// 		$('.search-box')[0].style.display = 'none';
	// 		$('.small-search')[0].style.display = 'block';
	// 	}
	// 	else {
	// 		$('.search-box')[0].style.display = 'block';
	// 		$('.small-search')[0].style.display = 'none';
	// 	}
	// }

	var initTop = 0;
	$(window).scroll(function(){
		var scrollTop = $(document).scrollTop();
		console.log(scrollTop);

		if ((scrollTop > initTop) && scrollTop >= 272) {
			$('.search-box')[0].style.display = 'none';
			$('.small-center-box')[0].style.display = 'block';			
		}
		else if ((scrollTop < initTop && scrollTop < 272)){
			$('.search-box')[0].style.display = 'block';
			$('.small-center-box')[0].style.display = 'none';			
		}
		initTop = scrollTop;
	});

	console.log($('.animate-arrow').offset().top);

	


})();
