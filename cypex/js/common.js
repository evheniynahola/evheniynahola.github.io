document.addEventListener("DOMContentLoaded", () => {
    
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(CSSRulePlugin)

    // document.querySelectorAll('.productsTab__nav__item').forEach(tab => {
    //     tab.addEventListener('click', function(event) {
    //         event.preventDefault();
    
    //         document.querySelectorAll('.productsTab__nav__item').forEach(item => item.classList.remove('active'));
    //         document.querySelectorAll('.productsTab__item').forEach(content => content.classList.remove('active'));
    
    //         this.classList.add('active');
    //         const targetTab = this.getAttribute('data-tab');
    //         document.getElementById(targetTab).classList.add('active');
    //     });
    // });

    document.querySelectorAll('.productsTab__nav__item').forEach(tab => {
      tab.addEventListener('click', function(event) {
        event.preventDefault();
    
        const activeContent = document.querySelector('.productsTab__item.active');
        const newTab = this.getAttribute('data-tab');
        const newContent = document.getElementById(newTab);
    
        if (activeContent === newContent) {
          return;
        }
    
        gsap.to(activeContent, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          onComplete: () => {
            activeContent.classList.remove('active');
    
            newContent.classList.add('active');
            gsap.fromTo(newContent, {
              opacity: 0,
              y: 50
            }, {
              opacity: 1,
              y: 0,
              duration: 0.5
            });
          }
        });

        document.querySelectorAll('.productsTab__nav__item').forEach(item => item.classList.remove('active'));
        this.classList.add('active');
      });
    });

    const hamburgerMenu = document.querySelector('.hamburger');
    const mainMenu = document.querySelector('.mainMenu__wrapper');

    hamburgerMenu.addEventListener('click', function(){
        this.classList.toggle('is-active');
        mainMenu.classList.toggle('active');
        document.querySelector('body').classList.toggle('menuOpen');
    });

    const mainForm = document.querySelector('.mainForm');
    const thanksWindow = document.querySelector('.thanksWindow');

    document.addEventListener('submit', function(event) {
        event.preventDefault();
        mainForm.classList.add('disabled');
        thanksWindow.classList.add('active');
    });

    document.querySelectorAll('.productsTab__item').forEach(item => {
      const checkbox = item.querySelector('.toggleCheckbox');
    
      checkbox.addEventListener('change', function() {
        const changeableElements = item.querySelectorAll('.changeable');
        
        const visibleElements = [...changeableElements].filter(el => !el.classList.contains('hidden'));
        const hiddenElements = [...changeableElements].filter(el => el.classList.contains('hidden'));
    
        gsap.to(visibleElements, {
          opacity: 0,
          x: -100,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            visibleElements.forEach(el => el.classList.add('hidden'));
    
            gsap.fromTo(hiddenElements, {
              opacity: 0,
              x: 100
            }, {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: "power2.out",
              onStart: () => {
                hiddenElements.forEach(el => el.classList.remove('hidden'));
              }
            });
          }
        });
      });
    });

      //Key items
      const infoItems = document.querySelectorAll('.keyPoints__anim');

      gsap.from(infoItems, {
        scrollTrigger: {
          trigger: '.keyPoints',
          start: "top 70%",
          end: "bottom 40%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 200,
        scale: 1.5,
        filter: 'blur(10px)',
        duration: 1.1,
        stagger: 0.4,
        ease: "power2.out",
      });

      //Text block
      function wrapTextWithSpans(element) {
        const text = element.textContent;
        const wrappedText = text.split('').map(char => {
          // Обгортання кожного символу в <span>
          return char === ' ' ? `<span style="white-space: pre;"> </span>` : `<span>${char}</span>`;
        }).join('');
        
        element.innerHTML = wrappedText;
      }
      
      const textElement = document.querySelector('.keyPoints__description p');
      wrapTextWithSpans(textElement);
      
      gsap.from(".keyPoints__description p span", {
        scrollTrigger: {
          trigger: ".keyPoints__description",
          start: "top 90%",
          end: "bottom 60%",
          scrub: true,
        },
        opacity: 0.2,
        y: 30,
        duration: 1.5,
        stagger: 0.04,
        ease: "power2.out"
      });


      //Products items
      const productsItems = document.querySelectorAll('.products__anim');

      gsap.from(productsItems, {
        scrollTrigger: {
          trigger: '.products',
          start: "top 90%",
          end: "bottom 40%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 200,
        scale: 1.5,
        filter: 'blur(10px)',
        duration: 1.1,
        stagger: 0.4,
        ease: "power2.out",
      });

      //strength items
      const strengthItems = document.querySelectorAll('.mainStrengths__anim');

      gsap.from(strengthItems, {
        scrollTrigger: {
          trigger: '.mainStrengths__wrapper',
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 200,
        scale: 1.5,
        filter: 'blur(10px)',
        duration: 1.1,
        stagger: 0.4,
        ease: "power2.out",
      });

      //callback items
      const callbackItems = document.querySelectorAll('.callback__anim');

      gsap.from(callbackItems, {
        scrollTrigger: {
          trigger: '.callback',
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 200,
        scale: 1.5,
        filter: 'blur(10px)',
        duration: 1.1,
        stagger: 0.4,
        ease: "power2.out",
      });

});