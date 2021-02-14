	//ядро работы табов
	$(".block-form").on("click", ".tab" , function(){
	// удаляем классы active
	$(".block-form").find(".active").removeClass("active");

	//добавляем класс по которому совершен клик
	$(this).addClass("active");
	$(".tab-form").eq($(this).index()).addClass("active");
	});

	//ядро плавающего текста

	$(".input").focus(function(){
		$(this).parent().addClass("focus");
	}).blur(function() {
			 if($(this).val()===''){
				$(this).parent().removeClass("focus");
			}
		})



