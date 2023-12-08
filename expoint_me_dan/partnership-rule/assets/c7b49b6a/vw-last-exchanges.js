/**
 * Функция загружает список
 * @param {type} e
 * @returns {undefined}
 */
function LastCurrensyClick(e) {

    if ($(".wrap-link", e).length === 0) {
        if ($(e).css('display') === 'none') {
            // выключаем для а/б тестирования
            // return;
        }
        var response = '';
        $.ajax({
            type: "POST",
            url: '/wp-content/plugins/vw-lastprivatevaluteslist/lpvvl-ajax.php',
            data: {
                'block_id': $(e).attr('id'),
                'pagename': $(location).attr('href'),
                'action': 'ex_lastprivatevaluteslist_action',
                't': ((new Date()).getTime() / 10000 << 1) * 5000 // 10 seconds !! do not concatenate constants !!
            },
            async: false,
            success: function(text) {
                response = text;
                $(e).html($(response).html());
            }
        });
    }
}

$(document).ready(function() {

    if ($('#tab-history').is('#tab-history') && isNotMobile()) {
        setTimeout(() => {
            LastCurrensyClick($('#tab-history'));
        }, 10);
    }

});