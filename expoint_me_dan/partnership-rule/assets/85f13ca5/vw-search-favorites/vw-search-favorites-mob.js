var vltlist_active, logger;
 
(isMobile()) && $(document).ready(function () {  
    if ($('body.home-page').is('body.home-page')) {  
        const getElmTabFavorite = document.querySelector('#pills-favorites');
        getElmTabFavorite.classList.add('show', 'active');
        setTimeout(()=>{
            FavoriteValutesClick();
        },1);
      
    }

});
 