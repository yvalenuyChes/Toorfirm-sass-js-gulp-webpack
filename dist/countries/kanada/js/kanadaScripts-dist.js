$(document).ready(function(){
	// параллакс при приближении
	$(window).scroll(function(event){
		// пиксели, прокрученные в окне браузера
		var s = $(this).scrollTop();
		// ширина окна
		var w = $(this).outerWidth();
		//высота контентной части
		var h = $('.content-paralax').outerHeight();
		//высота верхнего блока
		var h_b = $('.paralax').outerHeight();
		// проценты прокрутки всей контентной части
		var p = s/h*100;
		// проценты прокрутки только верхней части
		var p_b = s/h_b*100;
		// непрозрачность
		var o = 1 - 1 / 100 * p_b;
		// формула увеличения тумана(переменная нужна чтобы увеличиваться в процентах)
		// 10000 заранее подобранное число,нужно эксперементировать
		var z_1 = 1 + (w / 10000 * p_b);
		//увеличивает размер тумана
		$('.paralax__fog').css('transform', 'scale('+z_1+')');
		// увеличивает его прозрачность(чем ближе к концу тем он прозрачнее)
		$('.paralax__fog').css('opacity' , o);

		//для фоновой горы(очень плавный скрол)
		var z_2 = 1 + (w / 5000000 * p);
		$('.paralax__montain_1').css('transform', 'scale('+z_2+')');

		//вторая гора
		var hr = w/2000*p_b;
		var z_3 = 1 + (w * 0.000005 * p_b);
		$('.paralax__montain_2').css('transform', 'translate3d('+hr+'px, 0, 0) scale('+z_3+')');

		//третья гора
		var hr_2 = w/1500*p_b;
		var z_4 = 1 + (w * 0.00001 * p_b);
		$('.paralax__montain_3').css('transform', 'translate3d('+hr_2+'px, 0, 0) scale('+z_4+')');
	});
});

var header = $('.nav'),
		scrollPrev = 0;

$(window).scroll(function() {
	var scrolled = $(window).scrollTop();
 
	if ( scrolled > 100 && scrolled > scrollPrev ) {
		header.addClass('out');
	} else {
		header.removeClass('out');
	}
	scrollPrev = scrolled;
});


