/** Поиск валют по написанному минониму в поле поиска
 * author : Viktor Serobaba  vikwebas@gmail.com  
 * */
/********************* panel valutes used jquery: search valutes *******************************/



/**
 * CONSTRUCTOR for the work of data search in currencies
 * @param {*} panel 
 * @returns 
 */
function initSearchVltObj(selectorPanel) {
    let panelSearchClass = {
        _startVltSearch: false,
        _conteiner: undefined,
        btnFirstInput: undefined,
        btnChangeInput: undefined,
        conteiner: function() {
            return this._conteiner;
        },
        start: function() {
            if (this._startVltSearch) {
                return;
            }
            this._startVltSearch = true;
            this.btnFirstInput = $('.vltlist-btn.first input', this.conteiner());
            this.btnChangeInput = $('.vltlist-btn.change input', this.conteiner());
            // прикрепляем панель поиска
            this.initBtnInput(this.btnFirstInput, 'first');
            this.initBtnInput(this.btnChangeInput, 'change');
            var obj = this;
            panelVltListEvent().on('panelVltList:clearInput:all', function() {
                obj.clearInput(obj.btnFirstInput);
                obj.clearInput(obj.btnChangeInput);
            });
        },
        /** inicializate filtered valute */
        initBtnInput: function(btnInput1, type) {
            if (btnInput1) {
                var $vltPanel = this.conteiner();
                btnInput1.on('input', function() {
                    let $boxConteiner = $('.main-open.vltlist-box li.' + type + '-listonevlt', $vltPanel);
                    var search = $(this).val();
                    if (search) {
                        $($boxConteiner).addClass('search-on');
                        $('.wrap-open.group_0', $boxConteiner).addClass('hidden').addClass('d-none');
                        $('.wrap-open', $boxConteiner).removeClass('open').find('.box-open').show();
                        $('.wrap-open .panel-caption', $boxConteiner).hide();
                        $('a.' + type + 'VltOne', $boxConteiner).parent().removeClass('search').addClass('d-none');
                        $('a.' + type + 'VltOne .data-name:containsIC("' + search + '")', $boxConteiner).parent('.' + type + 'VltOne').parent().addClass('search').removeClass('d-none');
                        $('li.active a.' + type + 'VltOne', $boxConteiner).parent().addClass('search').removeClass('d-none');
                        $('*').scrollTop(0);
                        $('.wrap-open .box-open', $boxConteiner).addClass('mb-0');
                    } else {
                        $($boxConteiner).removeClass('search-on');
                        $('.wrap-open.group_0', $boxConteiner).removeClass('hidden').removeClass('d-none');
                        $('.wrap-open .panel-caption', $boxConteiner).show();
                        $('a.' + type + 'VltOne', $boxConteiner).parent().removeClass('search').removeClass('d-none');
                        $('.wrap-open .box-open', $boxConteiner).removeClass('mb-0');
                    }
                    /* Добавление подсказки при не найденной валюты */
                    let selectVltColumn = type === 'first' ? 1 : 2;
                    if($('.' + type + '-listonevlt ul li.search:first').hasClass('search')){
                        $('.notValute' + selectVltColumn).addClass('d-none');
                    }else if($('.' + type + '-listonevlt.active_ib').hasClass('search-on')){
                        $('.notValute' + selectVltColumn).removeClass('d-none');
                        $('.notValute' + selectVltColumn).addClass('position-static');
                    }
                    return false;
                });
            }
        },
        clearInput: function(btnInput1) {
            if (btnInput1) {
                $(btnInput1).val('');
                $(btnInput1).trigger('input');
            }
        }
    };
    var obj = panelSearchClass;
    obj._conteiner = $(selectorPanel);
    if (undefined == obj._conteiner) {
        return obj;
    }

    /**
     * Pseudo Search selector
     */
    obj.keyRusToLat = {
        "q": "й",
        "w": "ц",
        "e": "у",
        "r": "к",
        "t": "е",
        "y": "н",
        "u": "г",
        "i": "ш",
        "o": "щ",
        "p": "з",
        "[": "х",
        "]": "ъї",
        "a": "ф",
        "s": "ыі",
        "d": "в",
        "f": "а",
        "g": "п",
        "h": "р",
        "j": "о",
        "k": "л",
        "l": "д",
        ";": "ж",
        "'": "эє",
        "z": "я",
        "x": "ч",
        "c": "с",
        "v": "м",
        "b": "и",
        "n": "т",
        "m": "ь",
        ",": "б",
        ".": "ю",
        "`": "ё'",
        "\\": "ґ"
    };
    jQuery.expr.pseudos.containsIC = jQuery.expr.createPseudo(function(arg) {
        arg = arg.toLowerCase();
        let aArg = arg.split('').map(function(c) {
            let res = '';
            for (let k in obj.keyRusToLat) {
                res += obj.keyRusToLat[k].indexOf(c) + 1 ? k : '';
            }
            return res || c;
        }).join('');
        let _Arg = arg.split('').map(function(c) {
            let res = '';
            for (let k in obj.keyRusToLat) {
                res += k.indexOf(c) + 1 ? obj.keyRusToLat[k] : '';
            }
            return res || c;
        }).join('');

        return function(elem) {
            let synonyms = jQuery(elem).attr('data-synonyms');
            let text = [
                jQuery(elem).text().toLowerCase(),
                (synonyms) ? synonyms.toLowerCase() : ''
            ].join(',');
            return !!(text.indexOf(arg) + 1) || (aArg && !!(text.indexOf(aArg) + 1)) || (_Arg && !!(text.indexOf(_Arg) + 1));
        };
    });
    obj.start();
    return obj;
}


$(document).ready(function() {

    var searchVltListPanel;
    if ($('#tab-nav01').is('#tab-nav01')) {
        searchVltListPanel = initSearchVltObj('#tab-nav01');
    }
});

