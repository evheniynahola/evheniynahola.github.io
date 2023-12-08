 /**
  * The function loads a list of popular currencies taking into account the user's country
  * @param {type} e
  * @returns {undefined}
  */
 function PopularValutesClick(e) {

     if ($(".popular-list-vlt .popular-bar .wrap-link").length < 1) {
         var response = '';
         $.ajax({
             type: "POST",
             url: '/wp-content/plugins/vw-widgetvalutelist/start-ajax.php',
             data: {
                 'pagename': $(location).attr('href'),
                 'action': 'ex_popularprivatevltlist_action',
                 't': ((new Date()).getTime() / 10000 << 1) * 5000 // 10 seconds !! do not concatenate constants !!
             },
             async: false,
             success: function(text) {
                 response = text;
                 $('.popular-list-vlt').html($(response).html());

             }
         });
     }
 }


 $(document).ready(function() {
    if(isNotMobile()){
        if ($('.popular-list-vlt').is('.popular-list-vlt') && $('#vw-find-exchange-tabs [data-tab="#tab-nav02"]').is('li')) {
            $('#vw-find-exchange-tabs [data-tab="#tab-nav02"]').on('click', PopularValutesClick);
            // for tab02 is active
            if ($('#vw-find-exchange-tabs [data-tab="#tab-nav02"]').is('.active')) {
                PopularValutesClick();
            }
        }
    }
 });