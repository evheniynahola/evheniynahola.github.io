function sendSiGa(event, ec, ea, el, ev) {
    window.analitikaSiGa = window.analitikaSiGa || [];
    window.analitikaSiGa.push({
        'event': event,
        'ec': ec,
        'ea': ea,
        'el': el,
        'ev': ev,
        'time': new Date().getTime(),
        'dl': location.pathname,
        'ul': navigator.language,
        'ni': 1
    });
    console.log('sendSiGa preload', { event, ec, ea, el, ev });
}