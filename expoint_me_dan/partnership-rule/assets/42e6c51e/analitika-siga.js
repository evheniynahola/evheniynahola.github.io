var getClientId;
var sendSiGa, hasStartPostSiGa;
var logger;
window.analitikaSiGa = window.analitikaSiGa || [];

function startAnalitikaSiGa(w,d,s) {
    const push_script = '/wp-content/plugins/vw-analitika/start-ajax.php';
    const postEventSiGa = function (event) {
        event['cid'] = getClientId();
        let jsonEvent = JSON.stringify(event);
        const query = 'action=ex_send_siga&event=' + jsonEvent;
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            (!!logger) && logger.console('postEventSiGa ex_send_siga', this.responseText);

        };
        xhttp.open("POST", push_script,true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(query);
        return;
    }

    const sendSiGaAll = function () {
        w[s] = w[s] || [];
        if (hasStartPostSiGa == true && w[s].length > 0) {
            var event = w[s].shift();
            while (event !== undefined) {
                (!!logger) && logger.console('sendEventGaAll event', event);
                postEventSiGa(event);
                event = w[s].shift();
            }
        }
    }

    sendSiGa = function (event, ec, ea, el, ev) {
        w[s] = w[s] || [];
        w[s].push({
            'event': event,
            'ec': ec,
            'ea': ea,
            'el': el,
            'ev': ev,
            'time': new Date().getTime(), 
            'dl' : location.pathname ,
            'ul': navigator.language ,
            'ni':1
        });
        setTimeout(sendSiGaAll, 1);
    }
    hasStartPostSiGa = true;
   /* sendSiGa('siga.js', 'siga', 'start', '');*/
    d.addEventListener("DOMContentLoaded", function () {
        hasStartPostSiGa = true;
        setTimeout(sendSiGaAll, 1);
    });
}
startAnalitikaSiGa(window,document,'analitikaSiGa');
