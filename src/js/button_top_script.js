
//индикатор для заливки
//если скролится больше 100, кнопка показывается,если меньше,прячется
const offset = 100;

//обертка

const scrollUp = document.querySelector('.scroll_up');

const scrollUpSvgPath = document.querySelector('.scroll_up__path');

//длинна path

const pathLength = scrollUpSvgPath.getTotalLength();

//стили для path

scrollUpSvgPath.style.strokeDasharray =	`${pathLength} ${pathLength}`;
scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

//функция отвечающая за нажатие кнопки

scrollUp.addEventListener('click', () =>{
	window.scrollTo({
		top: 0,
		//бехайвор отвечает за плавность
		behavior: 'smooth'
	});
});

const getTop = () => window.pageYOffset || document.documentElement.scrollTop;


//переключатель класса(activ)

window.addEventListener('scroll', () =>{
	updateDashoffset();

	if(getTop() > offset){
		scrollUp.classList.add('active');
	}else{
		scrollUp.classList.remove('active');
	}
});


// считает,на сколько нужно сделать заливку

const updateDashoffset = () =>{
	const Heigh = document.documentElement.scrollHeight - window.innerHeight;
	const dashoffset = pathLength - (getTop() * pathLength / Heigh);
	scrollUpSvgPath.style.strokeDashoffset = dashoffset;
};