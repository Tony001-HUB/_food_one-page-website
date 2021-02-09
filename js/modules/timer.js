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

export default timer;