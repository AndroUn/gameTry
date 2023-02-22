window.addEventListener('DOMContentLoaded', ()=> {
    
    function bindModal(triggerSelector, modalSelector, closeSelector){
        const trigger = document.querySelector(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              scroll = calcScroll();

              trigger.addEventListener('click', (e)=>{
                if (e.target){
                    e.preventDefault();
                }

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
              });

              close.addEventListener('click', ()=>{
                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
              });

              modal.addEventListener('click',(e)=>{
                if (e.target === modal){
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                    document.body.style.marginRight = `0px`;
                }

              });

              function calcScroll(){
                let div = document.createElement('div');

                div.style.width = '50px';
                div.style.height = '50px';
                div.style.overflowY = 'scroll';
                div.style.visibility = 'hidden';

                document.body.appendChild(div);
                let scrollWidth = div.offsetWidth - div.clientWidth;
                div.remove();

                return scrollWidth;
              }


    }

    bindModal('.menu_button','.modal','.modal_close');
    bindModal('#slides_btn','.modal','.modal_close');



//...Tabs


    function tabs(tabsSelector, tabContentSelector, tabParentSelector, activeClass){


        const tabs = document.querySelectorAll(tabsSelector),
              tabContent = document.querySelectorAll(tabContentSelector),
              tabParent = document.querySelector(tabParentSelector);
      
      
        function hideTabContent(){
      
            tabContent.forEach(item =>{
                item.style.display = 'none';
            });
            tabs.forEach(item =>{
                item.classList.remove(activeClass);
            });
        }      
      
        function showTabContent(i = 0){
            tabContent[i].style.display = '';
            tabs[i].classList.add(activeClass);
        }
      
        hideTabContent();
        showTabContent();
      
      
        tabParent.addEventListener('click', (event)=>{
      
            const target = event.target;
      
            if(target && target.classList.contains(tabsSelector.slice(1))){
                tabs.forEach((item,i)=>{
                    if(target == item){
                        hideTabContent();
                        showTabContent(i);
                    }              
                });
            }
      
        });
      }
      
      tabs('.tabs_header_item', '.tabs_content', '.tabs_header', 'active');





      //....Timer

  const timer = (id, deadline) =>{

    const addZero = (num) => {
      if (num <= 9){
        return '0' + num;
      } else{
          return num;
      }
    };
  
    const getTimeRemaining = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date());
          seconds = Math.floor((t/1000) % 60);
          minutes = Math.floor((t/(1000 * 60)) % 60);
          hours = Math.floor((t/(1000 * 60 * 60)) % 24);
          days = Math.floor((t/(1000 * 60 * 60 * 24)));
        
        return{
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds 
        };
  
    };
  
    const setClock = (selector, endtime) => {
      const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
      
      updateClock();
  
      function updateClock(){
        const t = getTimeRemaining(endtime);
  
        days.textContent = addZero(t.days);
        hours.textContent = addZero(t.hours);
        minutes.textContent = addZero(t.minutes);
        seconds.textContent = addZero(t.seconds);
  
        if (t.total < 0) {
          days.textContent = "00";
          hours.textContent = "00";
          minutes.textContent = "00";
          seconds.textContent = "00";
  
          clearInterval(timeInterval);
  
        }
      }
              
    };
  
    setClock(id, deadline)
  };
  
  timer('.timer_container', '2023-04-15');
      





  function slider(slidesSelector, prevBtn, nextBtn, wrapperSelector, slidesInner){
    const slides = document.querySelectorAll(slidesSelector),
          prev = document.querySelector(prevBtn),
          next = document.querySelector(nextBtn),
          slidesWrapper = document.querySelector(wrapperSelector),
          slidesField = document.querySelector(slidesInner),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    slidesField.style.width = 100 * slides.length + '%';

    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';


    slides.forEach(item => {
        item.style.width = width;
    });


    prev.addEventListener('click', ()=>{
      if (offset == 0){
        offset = +width.replace(/px/, "") * (slides.length - 1);
      }
      else {
        offset -= +width.replace(/px/, "");
      }

      slidesField.style.transform = `translateX(-${offset}px)`
    });


    next.addEventListener('click', () => {
      if (offset === +width.replace(/px/, "") * (slides.length - 1)){
        offset = 0;
      }
      else {
        offset += +width.replace(/px/, "");
      }


      slidesField.style.transform = `translateX(-${offset}px)`
    });

  }

  slider('.slides_slide', '.slides_prev', '.slides_next', '.slides_wrapper', '.slides_inner');




  class preOrderCard {
    constructor(src, alt, title, descr, price, parentSelector) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 2.6;
        this.changeToGEL();
    }

    changeToGEL() {
        this.price = this.price * this.transfer;
    }
    render(){
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="elements_cover">
                <img src=${this.src} alt=${this.alt}>
                <h5>${this.title}</h5>
                <div class="elements_descr">${this.descr}</div>
                <button>Purchase</button>
                <div class="elements_price"><span>${this.price}</span> gel </div>
            </div>
            `;   
        this.parent.append(element);

    }

  }


  new preOrderCard(
    "img/Horizon_Call_of_the_Mountain_cover_art.jpg",
    "Horizon_Call_of_the_Mountain",
    "Horizon Call of the Mountain",
    'Horizon Call of the Mountain is an upcoming action-adventure video game developed by Guerrilla Games and Firesprite.',
    75,
    ".elements_grid"
  ).render();



  new preOrderCard(
    "img/Resident_Evil_4_remake_cover_art.jpg",
    "resident evil 4",
    "Resident Evil 4",
    "Leon S. Kennedy, one of the survivors, tracks the president's kidnapped daughter to a secluded European village, where...",
     60,
    ".elements_grid"
  ).render();


  new preOrderCard(
    "img/Star_Wars_Jedi_Survivor.jpeg",
    "Star_Wars_Jedi_Survivor",
    "Star Wars Jedi: Survivor",
    'The story of Cal Kestis continues in STAR WARS Jedi: Survivor™, a galaxy-spanning, third-person, action-adventure game.',
    70,
    ".elements_grid"
  ).render();



});