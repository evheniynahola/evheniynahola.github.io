/** Управление открытием/закрытием валютных групп в панели вібора валют 
 *  author : Viktor Serobaba  vikwebas@gmail.com  
 * */
/********************* panel valutes used jquery *******************************/
var vltlist_active, vltlist_template, vltRef, logger;

/**
 *
 * @returns {undefined}
 */
function startUploadGroupsBlock() {

    let start = Date.now();
    const deb = false;
    (deb) && console.log('startUploadGroupsBlock:start', start);

    $('.wrap-open').each(function(i) {

        var $boxed = $(this);
        var boxOpen = $('.box-open', $boxed);
        var prefix = $boxed.find('ul').attr('id');
        var status = getCookie('wrap_' + prefix);

        (deb) && console.log('startUploadGroupsBlock:EndloadCookie', Date.now() - start, 'prefix=' + prefix, 'isClass=' + $boxed.is('.open'), 'status=' + status);

        if (undefined !== status && status == 'close') {
            ($boxed.is('.open')) ? boxOpen.css('display', 'none'): false;
            ($boxed.is('.open')) ? $boxed.removeClass('open'): false;
            if (!eventOpenClose.target && isMobile()) {
                document.body.dispatchEvent(eventOpenClose);
            }
        } else {
            (!$boxed.is('.open')) ? boxOpen.css('display', 'block'): false;
            (!$boxed.is('.open')) ? $boxed.addClass('open'): false;
        }

    });
    (deb) && console.log('startUploadGroupsBlock:loadCookie');

    $('.box-open').not('.has-onclick').on('click', '.wrap-open .panel-caption ,.wrap-open .btn-open', function(e) {
        var $boxed = $(this).parent('.wrap-open');
        var $boxOpen = $boxed.find('.box-open');
        var prefix = $boxed.find('ul').attr('id');

        (deb) && console.log('startUploadGroupsBlock:clickAdd', this, $boxed);

        if (!$boxed.is('.open')) {
            $boxed.addClass('open');
            $boxOpen.css('display', 'none').slideDown(400);
            setCookie('wrap_' + prefix, 'open');
        } else {
            $boxed.removeClass('open');
            $boxOpen.css('display', 'block').slideUp(400);
            setCookie('wrap_' + prefix, 'close');
        }
        return false;
    }).addClass('has-onclick');

    (deb) && console.log('startUploadGroupsBlock:addOnclickGroup', Date.now() - start);


    if ($('.vltlist-box .btn-list').is('.btn-list')) {

        $('.vltlist-box').each(function() {
            var hold = jQuery(this);
            var el = hold.find('.wrap-open [data-hide="true"]');

            if (!getCookie('currencyBox') || getCookie('currencyBox') == 'close') {
                el.hide();
                (hold.is('.open')) ? hold.removeClass('open'): false;
            } else {
                el.show();
                (hold.is('.open')) ? hold.addClass('open'): false;
            }
        });

        (deb) && console.log('startUploadGroupsBlock:loadCookieBoxed', Date.now() - start);

        $('.vltlist-box').not('.has-onclick').on('click', '.btn-list', function(e) {
            var $hold = $(this).parent('.vltlist-box');
            var el = $hold.find('.wrap-open [data-hide="true"]');

            if ($hold.is('.open')) {
                $hold.removeClass('open');
                el.slideUp(300);
                setCookie('currencyBox', 'close');
            } else {
                $hold.addClass('open');
                el.slideDown(300);
                setCookie('currencyBox', 'open');
            }
            return false;

        });

        $('.vltlist-box').not('.has-onclick').addClass('has-onclick');

    }

    (deb) && console.log('startUploadGroupsBlock:End', Date.now() - start);

}
/*
var eventOpenClose = document.createEvent('HTMLEvents');
eventOpenClose.initEvent('startUploadGroupsBlock:loadCookie', true, true);
*/
const eventOpenClose = new Event("startUploadGroupsBlock:loadCookie", { bubbles: true });
document.addEventListener('startUploadGroupsBlock:loadCookie', startUploadGroupsBlock, { passive: false });