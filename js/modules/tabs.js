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

export default tabs;