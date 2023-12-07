var clientId, getClientId, loadClientId; 
var logger;
function startClientId()
{

    loadClientId = function() {
        var vwaClient = '';
        vwaClient = getCookie('vwa-client');
        (!!logger) && logger.console('loadClientId vwa-client', vwaClient);
        if (undefined !== vwaClient && (vwaClient)) { 
            clientId = vwaClient;
            localStorage.setItem('sumo-vwa-client', clientId);
            return;
        }
        vwaClient = localStorage.getItem('sumo-vwa-client');
        (!!logger) && logger.console('loadClientId sumo-vwa-client', vwaClient);
        if (undefined !== vwaClient && (vwaClient)) {
            clientId = vwaClient;
            return;
        }
 
        (!!logger) && logger.console('loadClientId no load client id');
       
        return;
    }

    getClientId = function() {
        (!!logger) && logger.console('getClientId', clientId);
        if (undefined === clientId) {  loadClientId(); }
        if (undefined !== clientId) { return clientId; }
        return false;
    }

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return (!(undefined == matches)) ? decodeURIComponent(matches[1]) : undefined;
    }
    setTimeout(loadClientId, 1);
 
}
startClientId();