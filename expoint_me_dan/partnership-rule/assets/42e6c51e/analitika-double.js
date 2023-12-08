var logger;
var  partnerId, getPartnerId, loadPartnerId;
(function ($) {

    /**
     * Обработка перехода на обменник (отправка аналитики) со страницы двойных обменов
     */
    function OutboundClickDoubleForSendEvent(e) {
        const ev={ 
            "role": "conversion",
            "place": "double",  
            "value": Math.max(20, $(this).attr('data-xv')),
            'position': 0,
            "xname":  $(this).attr('data-statname'), 
            "first": $(this).attr('data-emetalx'),
            "change":  $(this).attr('data-emetaly'),
            "partner_id":getPartnerId(),
            "go":  $(this).attr('data-xobmen')
        };
        ev.d = $(e.target).attr('data-click');
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
    if ($('#exchangesDoubleTable').find('.item-double-info').is('tr')) {
        $(document).on('open_link.go_to.exSumo', '#exchangesDoubleTable .item-double-info .double_changer_link', OutboundClickDoubleForSendEvent);
        $(document).on('open_link.go_to.exSumo', '#exchangesDoubleTable .item-double-info .link_obmen', OutboundClickDoubleForSendEvent);
        
       /* $(document).on('click', '#exchangesDoubleTable .item-double-info .double_changer_link', OutboundClickDoubleForSendEvent);
        $(document).on('click', '#exchangesDoubleTable .item-double-info .link_obmen', OutboundClickDoubleForSendEvent);
       */
        setTimeout(loadPartnerId, 1);
        
    }  

})(jQuery);