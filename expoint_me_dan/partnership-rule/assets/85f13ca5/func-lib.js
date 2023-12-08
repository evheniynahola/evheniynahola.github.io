/**
 * reg eventObject
 */
function panelVltListEvent() {
    if (undefined!==document.panelVltListEvent) {
        return document.panelVltListEvent;
    }
    document.panelVltListEvent={
        events: [],
        getEvent: function (typeArg) {
            if (undefined==this.events[typeArg]) {
                this.events[typeArg]=document.createEvent('Event');
                this.events[typeArg].initEvent(typeArg, true, true);
            }
            return this.events[typeArg];
        },
        on: function (typeArg, listener, options=false) {
            this.getEvent(typeArg);
            document.addEventListener(typeArg, listener, options);
        },
        trigger: function (typeArg) {
            document.dispatchEvent(this.getEvent(typeArg));
        }
    }
    return document.panelVltListEvent;
}

/**
 * Отправка DataLayer о пользовательском вводе при поиске валюты FROM или TO. И при поиске обменника.
 * DIRECT = (from - отдать, to - получить, exchanger - найти обменник)
 * QUERY = пользовательский запрос в том виде, в котором был введен
 * */
var logger;
$(document).ready(function () {

    const fieldFromValute=document.querySelector('.vltlist-btn.first input');
    const fieldToValute=document.querySelector('.vltlist-btn.change input');
    /*const fieldFilterExchange=document.querySelector('#filterDataExchange');*/

    fieldFromValute?.addEventListener('blur', () => fieldFromValute.value!==''? sendValuteDataLayer('from', fieldFromValute.value):null);
    fieldToValute?.addEventListener('blur', () => fieldToValute.value!==''? sendValuteDataLayer('to', fieldToValute.value):null);
    /*fieldFilterExchange?.addEventListener('blur', () => fieldFilterExchange.value!==''? sendValuteDataLayer('exchanger', fieldFilterExchange.value):null);*/

    /* Отправка DataLayer с параметрами */
    function sendValuteDataLayer(direct, query) {
        const evGa4={
            'event': 'ga4_interaction',
            'action': 'user_query',
            'parameters': {
                'role': 'ux',
                'place': direct,
                'message': query
            }
        };
        window.dataLayer=window.dataLayer||[];
        window.dataLayer.push(evGa4);
        (!!logger)&&logger.console(evGa4);
    }
});