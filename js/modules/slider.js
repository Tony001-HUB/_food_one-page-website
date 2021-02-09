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

export default renderSlider;