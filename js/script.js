import  cards  from'./modules/cards';
import  modal from'./modules/modal';
import  renderSlider from './modules/slider';
import  tabs from './modules/tabs';
import  timer from './modules/timer';
import  forms from './modules/forms';
import  {openModal} from './modules/modal';


document.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);

          cards(); 
          modal('[data-modal]', '.modal', modalTimerId);     
          renderSlider();
          tabs('.tabheader__item', '.tabcontent','.tabheader__items', 'tabheader__item_active');
          timer('.timer', '2021-06-11');
          forms('form', modalTimerId);
});


