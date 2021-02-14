let popup_check = document.querySelector('.popup')
let nav_check = document.querySelector('.nav')
let popup_checkLink = document.querySelector('.popup-link')
let burgerMenu = document.querySelector('.nav__menu')
let cross = document.querySelector('.nav__burger')


popup_checkLink.addEventListener("click", function(){
	if((popup_check.classList.contains("open")) === true){
	nav_check.classList.add("out")
	burgerMenu.classList.remove("active")
	cross.classList.remove("active")
	}
})

