
(isMobile()) && $(document).ready(function () {  
    if ($('body.home-page').is('body.home-page')) { 
            const getElmTabPopular=document.querySelector('#pills-populars');
            getElmTabPopular.classList.add('show', 'active'); 
            setTimeout(function () {
                PopularValutesClick();
            }, 1); 
    }

});