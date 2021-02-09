/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards(){
  class Menu {
        //"img/tabs/vegy.jpg"

        constructor(img, altimg, title, descr, price, parentSelector, ...classes) {
          this.title = title;
          this.descr = descr;
          this.price = price;
          this.img = img;
          this.altimg = altimg;
          this.parent = document.querySelector(parentSelector);
          this.classes = classes;
          this.transfer = 3;
          this.changeToBY();
        }
      
        changeToBY(){
            this.price  = +this.price * this.transfer;
        }


        render(){
            const element = document.createElement('div');

            if(this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className)); //добавить класс элементу
            }

            element.innerHTML = `         
                    <img src = ${this.img} alt=${this.altimg}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> BY/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
      
    }

    /*getResource('http://localhost:3000/menu')
    .then(data => {   
        data.forEach(({img, altimg, title, descr, price}) => {
            new Menu(img, altimg, title, descr, price, '.menu .container').render();
        });
    });*/

    axios.get('http://localhost:3000/menu')
    .then(data => {   
        data.data.forEach(({img, altimg, title, descr, price}) => {
            new Menu(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

    /* когда нам надо создать только 1 (мало) карточек, к примеру
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector(".menu .container").append(element);
    //     });
    // }
    */

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId){
     //FORMS работа с локальным сервером
     const forms = document.querySelectorAll(formSelector);

     const message = {
         loading: 'img/form/spinner.svg',
         success: 'спасибо, мы с вами обязательно свяжемся!',
         failure: 'error попробуйте позже'
     };
 
     forms.forEach(from => {
         bindPostData(from);
     });
 
     
     function bindPostData(form){
 //submit сработает каждый раз когда мы патаемся отправить какую-то форму
         form.addEventListener('submit', (event) =>{
             event.preventDefault();
 
             const statusMess = document.createElement('img');
             statusMess.src = message.loading;
             statusMess.style.cssText = `
                 display: block;
                 margin: 0 auto;
             `;
             form.insertAdjacentElement('afterend', statusMess);
 
 
             const formData = new FormData(form); //откуда надо собрать данные FormData работает с тегом name в html
 
             //formData.entries() to arr / Object.fromEntries to obj 
             const json =JSON.stringify(Object.fromEntries(formData.entries()));
 
 
             (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
             .then(data => {
                 console.log(data);
                 showThanksModal(message.success);        
                 statusMess.remove();
             }).catch(() => {
                 showThanksModal(message.failure);
             }).finally(() =>{
                 form.reset(); // сбросим форму   
             });
 
         });
     }
 
 
     function showThanksModal(message){
         const prevModalDialog = document.querySelector('.modal__dialog');
 
         prevModalDialog.classList.add('hide');
         (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);
 
         const thanksModal = document.createElement('div');
         thanksModal.classList.add('modal__dialog');
         thanksModal.innerHTML = `
             <div class="modal__content">
                 <div class="modal__close" data-close>×</div>
                 <div class="modal__title">${message}</div>
             </div>
         `;
         document.querySelector('.modal').append(thanksModal);
         setTimeout(() => {
             thanksModal.remove();
             prevModalDialog.classList.add('show');
             prevModalDialog.classList.remove('hide');
             (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
         }, 4000);
     }
 
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });

function closeModal(modalSelector) {
    const  modal = document.querySelector(modalSelector);
    
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}
    
function openModal(modalSelector, modalTimerId) {
    const  modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if(modalTimerId){
        clearInterval(modalTimerId);
    }
}

function modal(triggerSelector, modalSelector, modalTimerId){

const modalTrigger = document.querySelectorAll(triggerSelector),
modal = document.querySelector(modalSelector);

modalTrigger.forEach(btn => {
btn.addEventListener('click',() => openModal(modalSelector, modalTimerId));
});

modal.addEventListener('click', (event) => {
if (event.target === modal || event.target.getAttribute('data-close') == "") {
    closeModal(modalSelector);
}
});

document.addEventListener('keydown', (event) => {
if (event.code === "Escape" && modal.classList.contains('show')) { 
    closeModal(modalSelector);
}
});

function showModalByScroll() {
if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    openModal(modalSelector, modalTimerId);
    window.removeEventListener('scroll', showModalByScroll);
}
}
window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function renderSlider(){
const btnPrevSlider = document.querySelector('.offer__slider-prev'),
      btnNextSlider = document.querySelector('.offer__slider-next'),
      currentVal = document.querySelector('#current'),
      totalVal = document.querySelector('#total'),
      allSlider = document.querySelectorAll('.offer__slide'),
      sliderWrapper = document.querySelector('.offer__slider-wrapper'),
      sliderField = document.querySelector('.offer__slider-inner'),
      width = window.getComputedStyle(sliderWrapper).width;

let slideIndex = 1;
currentVal.innerHTML = `0${slideIndex}`;
let offset = 0;

sliderField.style.width = 100 * allSlider.length + '%';
sliderField.style.display = 'flex';
sliderField.style.transition = '0.5s all';

sliderWrapper.style.overflow = 'hidden'

allSlider.forEach(slider => {
    slider.style.width = width;
});

btnNextSlider.addEventListener('click',(event) => {
    currentVal.innerHTML = plusSlide();
    if(offset == +width.slice(0, width.length - 2) * (allSlider.length - 1)){
        offset = 0;
    } else{
        offset += +width.slice(0, width.length - 2);
    }

    sliderField.style.transform = `translateX(-${offset}px)`;
});

btnPrevSlider.addEventListener('click',(event) => {
    currentVal.innerHTML = minusSlide();
    if(offset == 0){
        offset = +width.slice(0, width.length - 2) * (allSlider.length - 1);
    } else{
        offset -= +width.slice(0, width.length - 2);
    }

    sliderField.style.transform = `translateX(-${offset}px)`;
});

function plusSlide() {
    slideIndex += 1;
    if(slideIndex == 5){
        slideIndex = 1;
    }
    return `0${slideIndex}`
}
      
function minusSlide() {
    slideIndex -= 1;  
    if(slideIndex == 0){
        slideIndex = 4;
    }
    return `0${slideIndex}`
}

/*
showSlider();
function plusSlide() {
    slideIndex += 1;
    if(slideIndex >= 5){
        slideIndex -= 1;
    }
    return `0${slideIndex}`
}
      
function minusSlide() {
    slideIndex -= 1;  
    if(slideIndex == 0){
        slideIndex = 1;
    }
    return `0${slideIndex}`
}
function showSlider(){
    allSlider.forEach(item => item.style.display = 'none');
    allSlider[slideIndex - 1].style.display = 'block';
}
btnPrevSlider.addEventListener('click',(event) => {
    currentVal.innerHTML = minusSlide();
    showSlider();
});
btnNextSlider.addEventListener('click',(event) => {
    currentVal.innerHTML = plusSlide();
    showSlider();
});
*/

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderSlider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContetntSelector, tabsParentSelector, activeSelector){
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContetnt = document.querySelectorAll(tabsContetntSelector),
          tabsParent = document.querySelector(tabsParentSelector);


    function hideTabContent()
    {
        tabsContetnt.forEach(curentItem => {
     
            curentItem.style.display = 'none';

        });

        tabs.forEach(curentItem => {

            curentItem.classList.remove(activeSelector);

        });
    }

    function showTabContent(itemNumber = 0){

        tabsContetnt[itemNumber].style.display = 'block';
        tabs[itemNumber].classList.add(activeSelector);

    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        
        if(target && target.classList.contains(tabsSelector.slice(1))){ //так как можем вместо таба(переключатель) тыкнуть в родителя
            tabs.forEach((curentItem, itemNumber) => {
                if(curentItem == target)
                {
                    hideTabContent();
                    showTabContent(itemNumber);
                }

            });        
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine){
    
    function getTimeRemaining(endTime){
    
        const t = Date.parse(endTime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24 )), // в сутках миллисекунд();
              hours = Math.floor((t / (1000 * 60 * 60) % 24)), //остаток от деления, чтобы часы были от 0 до 24 часа
              minutes = Math.floor((t / 1000 / 60) % 60), // так как минуты 0 - 60 : % 60 
              seconds = Math.floor((t / 1000) % 60);
    
    
        return { 
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    
    }
    
    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        }else{
            return num;
        }
    }
    
    function setClockOnPage(selector, endTime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
    
            updateClock(); // чтобы значения сразу не выводились из html, а брались из js.
    
            function updateClock(){
                const t = getTimeRemaining(endTime);
    
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);
    
                if(t.total <= 0){
                    clearInterval(timeInterval);
                }
            }
    
    }
       
    setClockOnPage(id, deadLine);
    
    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");









document.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 300000);

          (0,_modules_cards__WEBPACK_IMPORTED_MODULE_0__.default)(); 
          (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]', '.modal', modalTimerId);     
          (0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__.default)();
          (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__.default)('.tabheader__item', '.tabcontent','.tabheader__items', 'tabheader__item_active');
          (0,_modules_timer__WEBPACK_IMPORTED_MODULE_4__.default)('.timer', '2021-06-11');
          (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__.default)('form', modalTimerId);
});




/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
const postData = async (url, data) => {
    const result = await fetch(url, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: data
    });

    return await result.json();
};

const getResource = async (url, data) => {
    const result = await fetch(url);

    if(!result.ok){
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map