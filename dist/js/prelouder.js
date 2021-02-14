$(document).ready(function(){
	let prelouder = $('#prelouder');
	let imagesCount = $('img').length;   //в переменной хранятся все картинки
	let percent = 100 / imagesCount; // кол-во % на одну картинку
	let dBody = $('body'); //берем тело в переенную чтобы скрывать скрол когда есть прелоудер
	let progress = 0; // точка отсчета
	let loadedImg = 0; //счетчик загрузки картинок

	if(imagesCount > 0){
		prelouder.css('background', '#000');
		dBody.css('overflow', 'hidden');
			$('.progresBar').circularProgress({
			//изменяем цвет
			color: '#339999;',
			//ширина линии 
			line_width:20,
			//радиус круга
			height:"350px",
			width: "350px",
			percent: 0,
			starting_position:25	
		}).circularProgress('animate', percent, 1000);

		//цикл для синхрона прогрузки картинок и прелоудера
		for(let i = 0; i <imagesCount; i++){
			const imgCopy = new Image();
			imgCopy.src = document.images[i].src;
			imgCopy.onload = img_load;
			imgCopy.onerror = img_load;
		}

		function img_load(){
			progress += percent;
			loadedImg++;
			if( progress >= 100 || loadedImg == imagesCount){
				//скорость удаления прелоудера
				prelouder.delay(400).fadeOut('slow');
				dBody.css('overflow', '');
			}
			$('progresBar').circularProgress('animate', progress, 500);
		}
	} else{
		prelouder.remove();
	}
});