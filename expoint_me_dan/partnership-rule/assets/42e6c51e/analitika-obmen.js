var logger;
var  partnerId, getPartnerId, loadPartnerId;
(function ($) {

    /**
     * Обработка перехода на обменник (отправка аналитики)
     */
    function OutboundClickMonitoringForSendEvent(e) {    
        if ($(e.target).is('span.comments-counter')) { 
            (!!logger)&&logger.console('Not push');
            return true;
        }
        if ($(e.target).is('.cell-comments')) { 
            (!!logger)&&logger.console('Not push');
            return true;
        }
        if ($(e.target).is('.exchanger-link')) { 
            (!!logger)&&logger.console('Not push');
            return true;
        }
        if ($(e.target).is('.title-tooltip')) { 
            (!!logger)&&logger.console('Not push');
            return true;
        }

        const ev={ 
            "role": "conversion",
            "place": "monitoring",  
            "value": 0,
            'position':  $(this).attr('data-pos'),
            "xname":  $(this).attr('data-statname'), 
            'first': 0,
            'change': 0,
            "partner_id": getPartnerId(),
            'cashback': '0%',
            "go": 0,
            'attribute': ''
        };
 
        if ($('body.home').is('.home')) {
            ev.place = 'main';
        }  /* obmen_to-template|obmen_from-template-default|obmen-template-default */

        if ($(this).is('[data-cashback]')) {
            ev.cashback = $(this).attr('data-cashback');
        }  

        if ($(this).is('.favorite-row')) {
            ev.attribute = 'favorite';
        }else if ($(this).is('.alert-row')) {
            ev.attribute = 'alert';
        }  

        if ($('[data-xobmen]', this).is('div')) { 
            const $dt = $('[data-xobmen]', this);
            ev.value = Math.max(20, 1 * $dt.attr('data-xv'));
            ev.first = $dt.attr('data-emetalx');
            ev.change =$dt.attr('data-emetaly');
            ev.go = $dt.attr('data-xobmen');
        }
        ev.d=$(e.target).attr('data-click');
        ev.partner_id = getPartnerId();

        (!!logger)&&logger.console(ev);
        const evGa4={
            "event": "ga4_interaction",
            "action": "outbound_click",
            "parameters": ev
        };

        window.dataLayer=window.dataLayer||[];
        window.dataLayer.push(evGa4);
    }
 
    /** добавление обработчиков в DOM click*/
    if ($('#exchangesTable').find('[data-open]').is('tr')) {
        $(document).on('open_link.go_to.exSumo', '#exchangesTable tr[data-open]', OutboundClickMonitoringForSendEvent);
        /*$(document).on('click', '#exchangesTable [data-open]', OutboundClickMonitoringForSendEvent);*/
        setTimeout(loadPartnerId, 1);
    } 

})(jQuery);