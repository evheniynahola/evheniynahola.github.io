var vltlist_active, logger;

/**
 * The function loads the list of the user's favorite currencies
 * @param {type} e
 * @returns {undefined}
 */
function FavoriteValutesClick(e) {

    if ($(".favorite-list-vlt .popular-bar .wrap-link").length < 1) {

        var response = '';
        $.ajax({
            type: "POST",
            url: '/wp-content/plugins/vw-widgetvalutelist/start-ajax.php',
            data: {
                'pagename': $(location).attr('href'),
                'action': 'ex_favoriteprivatevltlist_action',
                't': ((new Date()).getTime() / 10000 << 1) * 5000 // 10 seconds !! do not concatenate constants !!
            },
            async: true,
            success: function(text) {
                response = text;
                $('.favorite-list-vlt').html($(response).html());
            }
        });
    }
}

$(document).ready(function() {
    if(isNotMobile()){
        if ($('.favorite-list-vlt').is('.favorite-list-vlt') && $('#vw-find-exchange-tabs [data-tab="#tab-nav03"]').is('li')) {
            $('#vw-find-exchange-tabs [data-tab="#tab-nav03"]').on('click', FavoriteValutesClick);
            // for tab03 is active
            if ($('#vw-find-exchange-tabs [data-tab="#tab-nav03"]').is('.active')) {
                setTimeout(function() { FavoriteValutesClick($('#vw-find-exchange-tabs [data-tab="#tab-nav03"]')); }, 1);
            }
        }
    }

});

$(document).ready(function() {
    /**
     * Валюта страницы к обмену
     * @var vlt_first int
     */
    var vlt_first = vltlist_active.vlt_first;
    /** Валюта страницы к получению
     * @var vlt_change int
     */
    var vlt_change = vltlist_active.vlt_change;

    /**
     * Валютная пара записаная как `${first}-${change}`
     * @var currentPair
     * @type {*|string}
     */
    var currentPair = (vlt_first && vlt_change) ? vlt_first + '-' + vlt_change : '';
    /**
     * Набор кнопок добавления в избранные.
     * Но не линков и не кнопок удаления!
     * @type {*|*|jQuery|HTMLElement}
     */
    var $addButtonFavorites = $('.btn-favorites');
    /* проверяем избранное и страницу */
    viewFavoriteState(isCurrentPairInFavorite());

    /* console.log('favorite', vltlist_active, vlt_first, vlt_change, currentPair);*/
    /**
     * Определяет в избранных ли текущая пара
     * @return {boolean}
     */
    function isCurrentPairInFavorite() {
        if (!($($addButtonFavorites).length > 0))
            return false;
        return getCookie("favorites").split(';').some(function(item) {
            return item === currentPair;
        });
    }

    /**
     * Определяет количество пар в избранных
     * @return {int}
     */
    function getFavoritesLength() {
        if (!$addButtonFavorites)
            return 0;

        return getCookie("favorites").split(';').length - 1;
    }

    /**
     * Добавляет/удаляет значение пары в/из куки
     * @param value
     * @param add
     */
    function toggleFavoriteCookie(add, value) {
        var favorites = (getCookie("favorites")).split(';');
        favorites.push(value);
        favorites.filter(function(item, pos) {
            return favorites.indexOf(item) == pos;
        })

        if (!add) {
            favorites = favorites.filter(function(item) {
                return (item !== value) && item !== '';
            });
        }
        var date = new Date(new Date().getTime() + 6 * 30 * 24 * 60 * 60 * 1000);
        /* console.log('toggleFavoriteCookie', add, value);*/
        setCookie('favorites', favorites.join(';'), date.toUTCString());
    }

    /**
     * Добавляет/удалает направление к избранному
     */
    function toggleFavoritePair() {
        let add = !!$(this).data('add');
        let first = $(this).data('first');
        let change = $(this).data('change');
        let pair = first + '-' + change;
        /* console.log('toggleFavoritePair', add, first, change, pair);*/
        toggleFavoriteCookie(add, pair);
        viewFavoriteState(add, pair);
        add ? viewAddFavorite() : viewRemoveFavorite(first, change);
    }

    $(document).on('click', '.delete-favorite,.btn-favorites,.link-favorites', toggleFavoritePair);

    /**
     * Обновляет вид все виджетов связаных с избранным
     * @param state
     * @param pair
     */
    function viewFavoriteState(state, pair) {
        // Показывает текст о отсутствии избранных
        $('.no-favorites').attr('hidden', !getFavoritesLength() ? null : 'hidden');

        // Показывает линк для добавления текующей пары к избранным
        $('.is-favorite a,.is-favorite').attr('hidden', isCurrentPairInFavorite() ? 'hidden' : null);

        // Далее только для текущей пары
        if (undefined !== pair && pair !== currentPair)
            return;
        $addButtonFavorites.data('add', !state);
        $addButtonFavorites[!state ? 'removeClass' : 'addClass']("active");

        // Далее если это не инициализация
        if (undefined == pair)
            return;
        $addButtonFavorites.addClass("animete");
        setTimeout(function() {
            $addButtonFavorites.removeClass("animete");
        }, 700);
    }

    /**
     * Удаляет текущую пару из списка виджета избранных
     * @param first
     * @param change
     */
    function viewRemoveFavorite(first, change) {
        $('.no-favorites').closest('ul').find('[data-first=' + first + '][data-change=' + change + ']').closest('li')
            .remove();
    }

    /**
     * Добавляет текущую пару к списку виджета избранных
     */
    function viewAddFavorite() {
        let $target = $('.is-favorite').find('a');
        let emetalx = [$target.data('first'), $target.find('[data-emetalx]').text()];
        let emetaly = [$target.data('change'), $target.find('[data-emetaly]').text()];
        let $data = $target.find('[data-link]');
        let link = $data.data('link');
        let fileX = $data.data('filex');
        let fileY = $data.data('filey');
        let get = $target.data('get');
        let give = $target.data('give');

        $('.no-favorites').attr('hidden', 'hidden').before(
            '<li class="vlt1-vlt2">' +
            '<a class="wrap-link" href="' + link + '">' +
            '<span class="item-name">' +
            '<span class="data-icon icon_' + fileX + '"></span>' + emetalx[1] +
            '<div class="exchange-rate">' + give + '</div>' +
            '</span>\n' +
            '<span class="small-arrow">→</span>\n' +
            '<span class="item-name">' +
            '<span class="data-icon icon_' + fileY + '"></span>' + emetaly[1] +
            '<div class="exchange-rate">' + get + '</div>' +
            '</span>' +
            '</a>' +
            '<a href="#" class="btn-delete delete-favorite" data-first="' + emetalx[0] + '" data-change="' + emetaly[0] + '">delete</a>' +
            '</li>');
    }
});