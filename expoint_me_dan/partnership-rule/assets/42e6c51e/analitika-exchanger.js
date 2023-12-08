var logger;
var  partnerId, getPartnerId, loadPartnerId;
(function ($) {
   
    
    /**
     * Обработка перехода на обменник (отправка аналитики) со страницы обменников
     */
    function OutboundClickExchangersForSendEvent(e) {
        const ev={ 
            "role": "conversion",
            "place": "exchanger", 
            "value": 0, 
            "xname": '', 
            "partner_id":'',
            "go": ''
        }; 
        if ($('#exchanger-card').is('#exchanger-card')) {
            const exch = $('#exchanger-card');
            ev.go=$(exch).attr('data-xobmen'); 
            ev.xname = $(exch).attr('data-statname'); 
            ev.value = Math.max(20, 1 * $(exch).attr('data-xv'));
        } else {
            ev.go =  $(this).attr('data-xobmen');
        }
        ev.d = $(e.target).attr('data-click');
        ev.partner_id = getPartnerId(); 
        
        (!!logger) && logger.console(ev); 
        const evGa4={
            "event": "ga4_interaction",
            "action": "outbound_click",
            "parameters": ev
        };
        window.dataLayer=window.dataLayer||[];
        window.dataLayer.push(evGa4);
    }

    if ($('.exchanger-template').find('.about-col').is('div')) {
      /* $(document).on('click', '.exchanger-template .about-col a', OutboundClickExchangersForSendEvent);
       $(document).on('click', '.exchanger-template .about-col[data-open]', OutboundClickExchangersForSendEvent);
      */
        $(document).on('open_link.go_to.exSumo', '.exchanger-template .about-col[data-open]', OutboundClickExchangersForSendEvent);
        setTimeout(loadPartnerId, 1);
    }


})(jQuery);