

//burger-menu
$(document).ready(function () {
   $('.nav__burger').click(function (event) {
      $('.nav__burger,.nav__menu').toggleClass('active')
      $('body').toggleClass('lock')
   })
})

//button_top_script


//индикатор для заливки
//если скролится больше 100, кнопка показывается,если меньше,прячется
const offset = 100;

//обертка

const scrollUp = document.querySelector('.scroll_up');

const scrollUpSvgPath = document.querySelector('.scroll_up__path');

//длинна path

const pathLength = scrollUpSvgPath.getTotalLength();

//стили для path

scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

//функция отвечающая за нажатие кнопки

scrollUp.addEventListener('click', () => {
   window.scrollTo({
      top: 0,
      //бехайвор отвечает за плавность
      behavior: 'smooth'
   });
});

const getTop = () => window.pageYOffset || document.documentElement.scrollTop;


//переключатель класса(activ)

window.addEventListener('scroll', () => {
   updateDashoffset();

   if (getTop() > offset) {
      scrollUp.classList.add('active')
   } else {
      scrollUp.classList.remove('active')
   }
});


// считает,на сколько нужно сделать заливку

const updateDashoffset = () => {
   const Heigh = document.documentElement.scrollHeight - window.innerHeight
   const dashoffset = pathLength - (getTop() * pathLength / Heigh)
   scrollUpSvgPath.style.strokeDashoffset = dashoffset
}

//parralax.js

function parallax(event) {
   this.querySelectorAll('.layer').forEach(layer => {
      let speed = layer.getAttribute('data-speed')
      layer.style.transform = `translateX(${event.clientX * speed / 1000}px)`
   })
}

document.addEventListener('mousemove', parallax)


//sticky-nav

var header = $('.nav'),
   scrollPrev = 0

$(window).scroll(function () {
   var scrolled = $(window).scrollTop();

   if (scrolled > 100 && scrolled > scrollPrev) {
      header.addClass('out')
   } else {
      header.removeClass('out')
   }
   scrollPrev = scrolled
})


//ibg

function ibg() {
   let ibg = document.querySelectorAll(".ibg")
   for (var i = 0; i < ibg.length; i++) {
      if (ibg[i].querySelector('img')) {
         ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')'
      }
   }
}
ibg()

//spoilers

$(document).ready(function () {
   $('.block__title').click(function (event) {
      //переключает класс со скоростью .3 сек
      if ($('.block').hasClass('one')) {
         $('.block__title').not($(this)).removeClass('active')
         $('.block__text').not($(this).next()).slideUp(300)
      }
      $(this).toggleClass('active').next().slideToggle(300)
   })
})

//window-trigger
let block_spoilers = document.querySelector('.block_spoilers');

let spoiler = document.querySelector('.footer__toorists');

let spoiler_2 = document.querySelector('.footer__company');

let tooristsTitle = document.querySelector('.tooristsTitle');

let tooristsText = document.querySelector('.tooristsText');

let companyTitle = document.querySelector('.companyTitle');

let companyText = document.querySelector('.companyText');

function myFunction() {
   if ($(window).innerWidth() < 1000) {
      block_spoilers.classList.add('block');
      block_spoilers.classList.add('one');
      spoiler.classList.add('block__item');
      spoiler_2.classList.add('block__item');
      tooristsTitle.classList.add('block__title');
      tooristsText.classList.add('block__text');
      companyTitle.classList.add('block__title');
      companyText.classList.add('block__text');
   }
   else {
      block_spoilers.classList.remove('block');
      block_spoilers.classList.remove('one');
      spoiler.classList.remove('block__item');
      spoiler_2.classList.remove('block__item');
      tooristsTitle.classList.remove('block__title');
      tooristsText.classList.remove('block__text');
      companyTitle.classList.remove('block__title');
      companyText.classList.remove('block__title');
   }
}

//вызываем
myFunction();

//ну и при ресайзе перепроверяем
$(window).resize(function () {
   myFunction();
});

//modal-window

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

if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
         // убираем значок хеша из хреф
         const popupName = popupLink.getAttribute('href').replace('#', '');
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         //этой функцией мы не перезагружаем страницу
         e.preventDefault();
      });
   }
}

//функция закрывающая popup по классу

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
         popupClose(el.closest('.popup'));
         e.preventDefault();
      });
   }
}

//функция открытия popup

function popupOpen(curentPopup) {
   //проверяем,есть ли такой объект и открыта ли переменная unlock
   if (curentPopup && unlock) {
      //функция которая автоматически закрывает выбранный попап 
      // и открывает новый по ссылке
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      // к  popup добавляем класс open
      curentPopup.classList.add('open');
      curentPopup.addEventListener("click", function (e) {
         //проверка если нет контента,popup закрывается
         // чтобы при клике на область за окном popup закрывался
         if (!e.target.closest('.popup__content')) {
            popupClose(e.target.closest('.popup'));
         }
      });
   }
}

function bodyLock() {
   // разница между шириной просматриваемого контента и шириной объекта который находится внутри него
   // чтобы получить ширину скрола,который нужно скрыть
   const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
   //проверка
   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
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
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

// в этой функции таймауты нужны чтобы не дергался popup,
//чтобы скрол появлялся только тогда,когда закончится анимация
function bodyUnlock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
         }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

//функция,закрывающаяя popup окно
//она позволяет еще открывать popupы
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      //убираем у активного попапа класс open
      popupActive.classList.remove('open');
      //запрет на анлок скрола
      if (doUnlock) {
         bodyUnlock();
      }
   }
}

//закрытие popup по кнопке,в данном случае по esc

document.addEventListener('keydown', function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
   }
});

//close-nav

let popup_check = document.querySelector('.popup')
let nav_check = document.querySelector('.nav')
let popup_checkLink = document.querySelector('.popup-link')
let burgerMenu = document.querySelector('.nav__menu')
let cross = document.querySelector('.nav__burger')


popup_checkLink.addEventListener("click", function () {
   if ((popup_check.classList.contains("open")) === true) {
      nav_check.classList.add("out")
      burgerMenu.classList.remove("active")
      cross.classList.remove("active")
   }
})


//slick-slider.js

var multiItemSlider = (function () {
   return function (selector, config) {
      var
         _mainElement = document.querySelector(selector), // основный элемент блока
         _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
         _sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
         _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
         _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
         _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
         _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
         _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
         _positionLeftItem = 0, // позиция левого активного элемента
         _transform = 0, // значение транфсофрмации .slider_wrapper
         _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
         _items = []; // массив элементов
      // наполнение массива _items
      _sliderItems.forEach(function (item, index) {
         _items.push({ item: item, position: index, transform: 0 });
      });

      var position = {
         getMin: 0,
         getMax: _items.length - 1,
      }

      var _transformItem = function (direction) {
         if (direction === 'right') {
            if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
               return;
            }
            if (!_sliderControlLeft.classList.contains('slider__control_show')) {
               _sliderControlLeft.classList.add('slider__control_show');
            }
            if (_sliderControlRight.classList.contains('slider__control_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
               _sliderControlRight.classList.remove('slider__control_show');
            }
            _positionLeftItem++;
            _transform -= _step;
         }
         if (direction === 'left') {
            if (_positionLeftItem <= position.getMin) {
               return;
            }
            if (!_sliderControlRight.classList.contains('slider__control_show')) {
               _sliderControlRight.classList.add('slider__control_show');
            }
            if (_sliderControlLeft.classList.contains('slider__control_show') && _positionLeftItem - 1 <= position.getMin) {
               _sliderControlLeft.classList.remove('slider__control_show');
            }
            _positionLeftItem--;
            _transform += _step;
         }
         _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
      }

      // обработчик события click для кнопок "назад" и "вперед"
      var _controlClick = function (e) {
         if (e.target.classList.contains('slider__control')) {
            e.preventDefault();
            var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
            _transformItem(direction);
         }
      };

      var _setUpListeners = function () {
         // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
         _sliderControls.forEach(function (item) {
            item.addEventListener('click', _controlClick);
         });
      }

      // инициализация
      _setUpListeners();

      return {
         right: function () { // метод right
            _transformItem('right');
         },
         left: function () { // метод left
            _transformItem('left');
         }
      }

   }
}());

var slider = multiItemSlider('.slider')

//inputStyle

$(document).on('.input__number', function () {
   if (this.value.match(/[^0-9]/g)) {
      this.value = this.value.replace(/[^0-9]/g, '');
   }
})

//level-menu

let isMobile = {
   Android: function () { return navigator.userAgent.match(/Android/i); },
   BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
   iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
   Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
   Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
   any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

let body__touch = document.querySelector('body');
//проверка для мобилки
if (isMobile.any()) {
   body.classList.add('touch');
   //получаем стрелки
   let arrow = document.querySelectorAll('.arrow');
   for (i = 0; i < arrow.length; i++) {
      //получаем стрелку для её стилизации
      let thisLink = arrow[i].previousElementSibling;
      let subMenu = arrow[i].nextElementSibling;
      let thisArrow = arrow[i];

      thisLink.classList.add('parent');
      arrow[i].addEventListener('click', function () {
         subMenu.classList.toggle('openSub');
         thisArrow.classList.toggle('activeArrow');
      });
   }
} else {
   body.classList.add('mouse');
}


//scroll


// просто добавляй класс animItems для анимации блоков

//выбираем все блоки с классом aninItems

const animItems = document.querySelectorAll('._animItems')

// проверяем, есть ли на странице элементы с классом aninItems

if (animItems.length > 0) {
   // событие, при котором функция будет выполнятся
   window.addEventListener('scroll', animOnScroll);
   //сама функция
   function animOnScroll() {
      //перебираем страницу и получаем каждый из элементов массива
      for (let index = 0; index < animItems.length; index++) {
         const animItem = animItems[index];
         //определяем высоту блока
         const animItemHeight = animItem.offsetHeight;
         // получаем позицию объекта относительно верха
         const animItemOffSet = offset(animItem).top;
         //коофициент,который будет регулировать момент старта анимации
         // при достижении 1/4 его высоты или высоты окна браузера будет срабатывать функция
         // можно менять,когда именно она сработает
         const animStart = 4;


         // настройка момента старта анимации
         let animItemPoint = window.innerHeight - animItemHeight / animStart;

         // настройка для случаев, если объект выше окна браузера
         // перестройка 
         if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }
         // добавление и удаление класса active, удаление происходит 
         // для того,чтобы сделать повторную анимацию 
         if ((pageYOffset > animItemOffSet - animItemPoint) && pageYOffset < (animItemOffSet + animItemHeight)) {
            animItem.classList.add('_active');
         } else {
            // условие чтобы анимация при скроле вверх не повторялась
            // но нужен класс anim_hide
            if (!animItem.classList.contains('.anim_hide')) {
               animItem.classList.remove('_active');
            }
         }
      }
   }
   // функция для получения информации для animItemsOffSet
   function offset(el) {
      const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
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

//closeBurgerByClick

let closeMenu1 = document.getElementById('closeNavLink1');
let closeMenu2 = document.getElementById('closeNavLink2');
let closeMenu3 = document.getElementById('closeNavLink3');
let closeMenu4 = document.getElementById('closeNavLink4');
let closeBurgerBody = document.querySelector('.nav__menu')
let closeBurgerCross = document.querySelector('.nav__burger')
let navClose = document.querySelector('.close')
let closeBody = document.querySelector('body')


closeMenu1.addEventListener("click", function () {
   if ((navClose.classList.contains("active")) === true) {
      closeBurgerCross.classList.remove("active")
      closeBurgerBody.classList.remove("active")
      closeBody.classList.remove("lock")
   }
})

closeMenu2.addEventListener("click", function () {
   if ((navClose.classList.contains("active")) === true) {
      closeBurgerCross.classList.remove("active")
      closeBurgerBody.classList.remove("active")
      closeBody.classList.remove("lock")
   }
})

closeMenu3.addEventListener("click", function () {
   if ((navClose.classList.contains("active")) === true) {
      closeBurgerCross.classList.remove("active")
      closeBurgerBody.classList.remove("active")
      closeBody.classList.remove("lock")
   }
})

closeMenu4.addEventListener("click", function () {
   if ((navClose.classList.contains("active")) === true) {
      closeBurgerCross.classList.remove("active")
      closeBurgerBody.classList.remove("active")
      closeBody.classList.remove("lock")
   }
})



//swimming-text

$(".block-form").on("click", ".tab", function () {
   // удаляем классы active
   $(".block-form").find(".active").removeClass("active");

   //добавляем класс по которому совершен клик
   $(this).addClass("active");
   $(".tab-form").eq($(this).index()).addClass("active");
});

//ядро плавающего текста

$(".input").focus(function () {
   $(this).parent().addClass("focus");
}).blur(function () {
   if ($(this).val() === '') {
      $(this).parent().removeClass("focus");
   }
})