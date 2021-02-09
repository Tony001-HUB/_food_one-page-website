import {openModal, closeModal } from './modal.js';
import {postData} from '../services/services';

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
 
 
             postData('http://localhost:3000/requests', json)
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
         openModal('.modal', modalTimerId);
 
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
             closeModal('.modal');
         }, 4000);
     }
 
}

export default forms;