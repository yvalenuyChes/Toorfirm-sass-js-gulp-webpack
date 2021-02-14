//получаем все ссылки на popup в документе,чтобы popup открывался при клике на любой объект с классом popup-link
const popupLinks = document.querySelectorAll('.popup-link');

// получаем тег body чтобы его блокировать скрол тела
const body = document.querySelector('body');

const lockPadding = document.querySelectorAll(".lock-padding");

// эта переменная нужна чтобы не было двойных нажатий
let unlock = true;

// нужна для блокировки скрола и его адекватной работе
// она должна быть равной анимации в css
const timeout = 800;

//проверка,существуют ли popup ссылки,в цикле отлавливаем их
// и вешаем событие click

if(popupLinks.length > 0){
	for(let index = 0; index < popupLinks.length; index++){
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function(e){
			// убираем значок хеша из хреф
			const popupName = popupLink.getAttribute('href').replace('#','');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			//этой функцией мы не перезагружаем страницу
			e.preventDefault();
		});
	}
}

//функция закрывающая popup по классу

const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length > 0){
	for(let index = 0; index < popupCloseIcon.length; index++){
		const el = popupCloseIcon[index];
		el.addEventListener('click', function(e){
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

//функция открытия popup

function popupOpen(curentPopup){
	//проверяем,есть ли такой объект и открыта ли переменная unlock
	if(curentPopup && unlock){
		//функция которая автоматически закрывает выбранный попап 
		// и открывает новый по ссылке
		const popupActive = document.querySelector('.popup.open');
		if(popupActive){
			popupClose(popupActive, false);
		}else{
			bodyLock();
		}
		// к  popup добавляем класс open
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function(e){
			//проверка если нет контента,popup закрывается
			// чтобы при клике на область за окном popup закрывался
			if(!e.target.closest('.popup__content')){
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function bodyLock(){
	// разница между шириной просматриваемого контента и шириной объекта который находится внутри него
	// чтобы получить ширину скрола,который нужно скрыть
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	//проверка
	if(lockPadding.length > 0){
		for(let index = 0; index < lockPadding.length; index++){
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}	
	body.style.paddingRight = lockPaddingValue;
	//класс lock убирает и добавляет скрол
	// в css допиши body.lock{overflow:hidden;}
	body.classList.add("lock");
	// этот замок нужен чтобы нельзя было попап открыть сразу при закрытии
	// чтобы не появлялся скрол
	unlock = false;
	setTimeout(function(){
		unlock = true;
	}, timeout);
}

// в этой функции таймауты нужны чтобы не дергался popup,
//чтобы скрол появлялся только тогда,когда закончится анимация
function bodyUnlock(){
	setTimeout(function(){
		if(lockPadding.length > 0){
			for(let index = 0; index < lockPadding.length; index++){
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function(){
		unlock = true;
	}, timeout);
}

//функция,закрывающаяя popup окно
//она позволяет еще открывать popupы
function popupClose(popupActive, doUnlock = true){
	if(unlock){
		//убираем у активного попапа класс open
		popupActive.classList.remove('open');
		//запрет на анлок скрола
		if(doUnlock){
			bodyUnlock();
		}
	}
}

//закрытие popup по кнопке,в данном случае по esc

document.addEventListener('keydown', function(e){
	if(e.which === 27){
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

//полифилы для подгонки под старые браузеры

(function(){
	//проверяем поддержку
	if(!Element.prototype.closest){
		//реализуем
		Element.prototype.closest = function(css){
			var node = this;
			while(node){
				if(node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();

(function(){
	//проверяем поддержку
	if(!Element.prototype.matches){
		//определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector||
		Element.prototype.webkitMatchesSelector ||
		Element.prototype.mozMatchesSelector ||
		Element.prototype.msMatchesSelector;
	}
})();