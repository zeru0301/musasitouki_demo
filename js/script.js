(() => {
    document.addEventListener('DOMContentLoaded', () => {


        // カルーセル
        (()=>{
            const carousel = document.querySelector('.carousel');
            const imageContainer = carousel.querySelector('.image-container');
            const images = Array.from(imageContainer.querySelectorAll('img'));
            const prevButton = carousel.querySelector('.prev');
            const nextButton = carousel.querySelector('.next');
            const indicator = carousel.querySelector('.indicator');
            const indicatorItems = [];
            const touchArea =carousel.querySelector('.touch-area');
    
    
    
    
            let current = 0;
    
            function prev() {
                // console.log(1);
                let target = current - 1;
                if (target < 0) {
                    target = images.length - 1;
                }
                // 下にtoを書いた場合toで処理が可能になる
    
                // imageContainer.style.transform = 'translateX('+(target * -100)+'%)';
                // current = target;
    
                // to関数
                to(target);
    
            }
    
            function next() {
                // console.log(2);
                let target = current + 1;
                if (target >= images.length) {
                    target = 0;
                }
                // 下にtoを書いた場合toで処理が可能になる
    
                // imageContainer.style.transform = 'translateX('+(target * -100)+'%)';
                // current = target;
    
                // to関数
                to(target);
    
            }
    
            function to(target) {
                imageContainer.style.transform = `translateX(${target * -100}%)`;
                current = target;
    
                indicatorItems.forEach((item, index) => {
                    if (target === index) {
                        item.classList.add('current');
                    } else {
                        item.classList.remove('current');
                    }
    
                });
    
                auto();
            }
    
            prevButton.addEventListener('click', prev);
            nextButton.addEventListener('click', next);
    
            images.forEach((image, index) => {
                const li = document.createElement('li');
                if (index === 0) {
                    li.classList.add('current');
                }
    
                li.addEventListener('click', () => {
                    to(index);
                })
                indicator.appendChild(li);
                indicatorItems.push(li);
    
            });
            // フリック操作の実装
    
            let touchStart;
            let touchMove;
            touchArea.addEventListener('touchstart', (event) => {
                touchStart = event.touches[0].clientX;
                touchMove = touchStart;
            });
            touchArea.addEventListener('touchmove', (event) => {
                event.preventDefault();
                touchMove = event.touches[0].clientX;
            });
            touchArea.addEventListener('touchend', (event) => {
                if (touchMove < touchStart - 20) {
                    next();
                } else if (touchMove > touchStart + 20) {
                    prev();
                }
            });


            let timer;
            function auto(){
                clearTimeout(timer);
                timer = setTimeout(() => {
                  next();
                 },5500);   
            }
            auto();
            
        })();
       
        // ページトップ
        (()=> {
           const pageTopButtun = document.getElementById('pagetop');
           const footer = document.querySelector('footer');

           const obsever = new IntersectionObserver((entries) => {
                entries.forEach((entry) =>{
                    if(entry.isIntersecting){
                        pageTopButtun.classList.add('active');
                    }else{
                        pageTopButtun.classList.remove('active');
                    }

                    

                });
            });
            obsever.observe(footer);
        })();
    });
})();