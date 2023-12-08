var  partnerId, getPartnerId, loadPartnerId;
const analitika_script = '/wp-content/plugins/vw-analitika/start-ajax.php';
var logger;
(function ($) {
    loadPartnerId = function () { 
        var vwaRef = '';  
        vwaRef = getCookie('vwa-ref'); 
        (!!logger)&&logger.console('loadPartnerId vwa-ref',vwaRef );
        if (undefined!==vwaRef && (vwaRef)) {
            partnerId = vwaRef;
            return;
        }
        vwaRef = localStorage.getItem('sumo-vwa-ref');
         (!!logger)&&logger.console('loadPartnerId sumo-vwa-ref',vwaRef );
        if (undefined!==vwaRef && (vwaRef)) {
            partnerId = vwaRef;
            return;
        }
        const query = 'action=ex_get_refer';
        $.post(analitika_script, query, function (data) { 
             (!!logger)&&logger.console('loadPartnerId ex_get_refer',data );
            partnerId = data.patrnerId; 
            localStorage.setItem('sumo-vwa-ref', partnerId);
            document.cookie = "vwa-ref="+encodeURIComponent(partnerId);
        }, 'json'); 
    } 

    getPartnerId = function () {
         (!!logger)&&logger.console(partnerId);
        if (undefined !== partnerId) { return partnerId; }
        return false; 
    }

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return ( !(undefined == matches) ) ? decodeURIComponent(matches[1]) : undefined;
    }

})(jQuery);