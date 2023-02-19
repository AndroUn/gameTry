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
  