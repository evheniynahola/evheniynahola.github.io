jQuery(document).ready(function() {

    var player, firstOpen = true;
    var modalYoutube = document.getElementById('modalYoutube')
    modalYoutube.addEventListener('show.bs.modal', function(e) { /* Вызываем функцию по нажатию на кнопку*/
        ga4.send('popup_tracking', 'click', 'videoguide');
        if (firstOpen) {
            /* Load the IFrame Player API code asynchronously.*/
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/player_api";
            tag.id = 'youtube_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            /* Replace the 'ytplayer' element with an <iframe> and*/
            /* YouTube player after the API code downloads.*/
            window.player;
            var done = false;
            window.onYouTubePlayerAPIReady = function() {
                player = new YT.Player('ytplayer', {
                    height: '315',
                    width: '100%',
                    playerVars: {
                        autoplay: 0,
                        modestbranding: true,
                        rel: 0,
                        showinfo: false
                    },
                    events: {
                        'onReady': onReady,
                        /* 'onStateChange': onPlayerStateChange*/
                    },
                    videoId: 'PdhAp2Cnhik'
                });
            }

            firstOpen = false;
        }

        function onReady(e) {
            e.target.playVideo();
            firstOpen = false;
        }

        if (firstOpen === false && player) {
            player.playVideo();
        }

        ga4.send('popup_tracking', 'open', 'videoguide');
        
        return true;
    });
    modalYoutube.addEventListener('hidden.bs.modal', function() { /* Обрабатываем клик по закрытию окна */
        player.stopVideo();
    });


    document.addEventListener('click', function (event) {
        if (!event.target.closest('.modal-dialog') && document.querySelector('#modalYoutube.show')) {
            let modal = document.querySelector('#modalYoutube.show');
            let modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
        }
    });
});