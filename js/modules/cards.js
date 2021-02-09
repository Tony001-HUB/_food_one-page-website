import {postData} from '../services/services';

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
export default cards;