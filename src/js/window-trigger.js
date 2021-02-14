let block_spoilers = document.querySelector('.block_spoilers');

let spoiler = document.querySelector('.footer__toorists');

let spoiler_2 = document.querySelector('.footer__company');

let tooristsTitle = document.querySelector('.tooristsTitle');

let tooristsText = document.querySelector('.tooristsText');

let companyTitle = document.querySelector('.companyTitle');

let companyText = document.querySelector('.companyText');

function myFunction() {
    if($(window).innerWidth() < 1000)
    {   
        block_spoilers.classList .add('block');
        block_spoilers.classList.add('one');
        spoiler.classList.add('block__item');
        spoiler_2.classList.add('block__item');
        tooristsTitle.classList.add('block__title');
        tooristsText.classList.add('block__text');
        companyTitle.classList.add('block__title');
        companyText.classList.add('block__text');
    }
    else
    {
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
$(window).resize(function() {
    myFunction();
});
