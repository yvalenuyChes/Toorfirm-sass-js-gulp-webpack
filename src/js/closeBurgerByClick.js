/*let closeMenu = document.querySelector('.closeNavLink')*/

//боже,пофикси этот позор
let closeMenu1 = document.getElementById('closeNavLink1');
let closeMenu2 = document.getElementById('closeNavLink2');
let closeMenu3 = document.getElementById('closeNavLink3');
let closeMenu4 = document.getElementById('closeNavLink4');
let closeBurgerBody = document.querySelector('.nav__menu')
let closeBurgerCross = document.querySelector('.nav__burger')
let navClose = document.querySelector('.close')
let closeBody = document.querySelector('body')


closeMenu1.addEventListener("click", function(){
	if((navClose.classList.contains("active")) === true){
		closeBurgerCross.classList.remove("active")
		closeBurgerBody.classList.remove("active")
		closeBody.classList.remove("lock")
	}
})

closeMenu2.addEventListener("click", function(){
	if((navClose.classList.contains("active")) === true){
		closeBurgerCross.classList.remove("active")
		closeBurgerBody.classList.remove("active")
		closeBody.classList.remove("lock")
	}
})

closeMenu3.addEventListener("click", function(){
	if((navClose.classList.contains("active")) === true){
		closeBurgerCross.classList.remove("active")
		closeBurgerBody.classList.remove("active")
		closeBody.classList.remove("lock")
	}
})

closeMenu4.addEventListener("click", function(){
	if((navClose.classList.contains("active")) === true){
		closeBurgerCross.classList.remove("active")
		closeBurgerBody.classList.remove("active")
		closeBody.classList.remove("lock")
	}
})