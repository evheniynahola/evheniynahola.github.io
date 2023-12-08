
var logger;
const Ga4EventClick = new Event('ga4.click', {bubbles: true,cancelable: true});
/** 
 * data-ga4="event;action;method;place;option"
*/
const ga4={
  send: function (action, method, place, option) {
    window.dataLayer=window.dataLayer||[];
    const evGa4={
      "event": "ga4_interaction",
      "action": action,
      "parameters": {
        "role": "ux",
        "method": method,
        "place": place,
        'option': option
      }
    };
    window.dataLayer.push(evGa4);
    (!!logger)&&logger.console('ga4.send', method, evGa4);
  },

  trigerClick: function (element) {
  
    console.log(element);
    if (!!element[0]._ga4&&1) {
      element[0].dispatchEvent(Ga4EventClick);
    } else if (!!element._ga4&&1) {
      element.dispatchEvent(Ga4EventClick);
    }
  },

  addEventListenerAndSend: function (element, eventName, eGa4) {
    const _this=this;
    element.addEventListener(eventName, function () {
      _this.send(eGa4.action, eGa4.method, eGa4.place, eGa4.option);
    }, {capture: true});
  },

  updateEventHandlers: function (element) {
    const _this=this;
    (!!logger)&&logger.console('start ga4.updateEventHandlers');
    const eventElements=element.querySelectorAll('[data-ga4]:not([data-ga4-start="true"])');
    eventElements.forEach(function (element) {
      const dataGa4=element.getAttribute('data-ga4');
      if (!dataGa4) {
        return;
      }
      element.setAttribute('data-ga4-start', 'true');
      const parts=dataGa4.split(';');
      element._ga4={
        event: parts[0]||'',
        action: parts[1]||'',
        method: parts[2]||'',
        place: parts[3]||'',
        option: parts[4]||'',
      };
      const eGa4=element._ga4;
      (!!logger)&&logger.console('preGa4.send', element);
      if (eGa4.event==='push') {
        _this.send(eGa4.action, eGa4.method, eGa4.place, eGa4.option);
      } else if (['click', 'submit', 'ga4.click'].includes(eGa4.event)) {
        _this.addEventListenerAndSend(element, eGa4.event, eGa4);
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', function () {
  ga4.updateEventHandlers(document);
});




