$(document).ready(function(){
	$('.block__title').click(function(event){
		//переключает класс со скоростью .3 сек
		if($('.block').hasClass('one')){
			$('.block__title').not($(this)).removeClass('active')
			$('.block__text').not($(this).next()).slideUp(300)
		}
		$(this).toggleClass('active').next().slideToggle(300)
	})
})