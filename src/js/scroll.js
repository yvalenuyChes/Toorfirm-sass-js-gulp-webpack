
// просто добавляй класс animItems для анимации блоков

//выбираем все блоки с классом aninItems

const animItems = document.querySelectorAll('._animItems')

// проверяем, есть ли на странице элементы с классом aninItems

if(animItems.length > 0){
	// событие, при котором функция будет выполнятся
	window.addEventListener('scroll', animOnScroll);
	//сама функция
	function animOnScroll(){
		//перебираем страницу и получаем каждый из элементов массива
		for(let index = 0; index < animItems.length; index++){
			const animItem = animItems[index];
			//определяем высоту блока
			const animItemHeight =  animItem.offsetHeight;
			// получаем позицию объекта относительно верха
			const animItemOffSet =  offset(animItem).top;
			//коофициент,который будет регулировать момент старта анимации
			// при достижении 1/4 его высоты или высоты окна браузера будет срабатывать функция
			// можно менять,когда именно она сработает
			const animStart = 4;


			// настройка момента старта анимации
			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			// настройка для случаев, если объект выше окна браузера
			// перестройка 
			if(animItemHeight > window.innerHeight){
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}
			// добавление и удаление класса active, удаление происходит 
			// для того,чтобы сделать повторную анимацию 
			if((pageYOffset > animItemOffSet-animItemPoint) && pageYOffset < (animItemOffSet+animItemHeight)){
				animItem.classList.add('_active');
			}else{
				// условие чтобы анимация при скроле вверх не повторялась
				// но нужен класс anim_hide
				if(!animItem.classList.contains('.anim_hide')){
					animItem.classList.remove('_active');
				}
			}
		}
	}
	// функция для получения информации для animItemsOffSet
	function offset(el){
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop =  window.pageYOffset || document.documentElement.scrollTop;
		return{top: rect.top + scrollTop, left: rect.left + scrollLeft}
	}
	// для объектов,которые сразу находятся  видимой части,чтобы анимация происходила
	// сразу,а не при скроле
	//animOnScroll();
	//если нужна задержка перед анимацией вначале

	setTimeout(() => {
		animOnScroll();
		//ниже можем регулировать на сколько будет задержка
	}, 300)

}

//чтобы анимировался объект внутри объекта нужно его обернуть в div, 
//divу задать класс animItems, а объекту внутри него - anim_show,
//и тогда объект который в этом dive находится будет иметь анимацию 
//появления. так же объекту внутри нужно задать overflow: hidden; для
//нормального появления