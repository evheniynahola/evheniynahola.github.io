/**  
 * Поиск активных валютных пар при выборе валюты в правой или левой колонке 
 * author : Viktor Serobaba  vikwebas@gmail.com  
 * */
/********************* panel valutes used jquery *******************************/
var vltlist_active, vltlist_template, vltRef, logger;
var getVltListItem;

/**
 * Обьявление класса для одной колонки валют
 * @param {*} selectorPanel 
 * @param {*} column_type 
 */
function columnValuteOneClass(selectorPanel, column_type) {
    if (undefined == $(selectorPanel)) {
        return this;
    }

    let check_script = '/wp-content/plugins/vw-widgetvalutelist/start-ajax.php';

    /* обработка псевдокласса changedID */
    jQuery.expr.pseudos.changedID = jQuery.expr.createPseudo(function(arg) {
        if (!Array.isArray(arg)) {
            arg = arg.split(',');
        };
        return function(elem) {
            let vlt_id = jQuery(elem).attr('data-vlt_id');
            return !(arg.indexOf(vlt_id) < 0);
        };
    });
    /**
     * 
     * @param {*} vlt 
     * @param {*} key 
     * @param {*} def 
     * @returns 
     */
    getVltListItem = function(vlt, key, def) {
        let val, items, arr, rez = false;
        if (!(!!vlt_list)) {
            return def;
        }
        arr = Object.values(vlt_list).sort((a, b) => a['sort_order'] - b['sort_order']);
        for (var i = 0; i < arr.length; i++) {
            val = arr[i];
            items = val['items'];
            for (var j = 0; j < items.length; j++) {
                if (vlt == items[j]['id']) {
                    rez = (key) ? items[j][key] : items[j];
                } else if (vlt == items[j]['slug']) {
                    rez = (key) ? items[j][key] : items[j];
                }
                if (rez) {
                    return rez;
                }
            }
        }
        return def;
    }
    vltlist_active.getVltListItem = getVltListItem;

    /* 
     * Removing class to create a columnValuteOne object
     */
    this._conteinerPanel = $(selectorPanel);
    this._conteinerVltInput = $('#vltlist_' + column_type, $(selectorPanel));
    this._conteinerVltBox = $('.main-open.vltlist-box li.' + column_type + '-listonevlt', $(selectorPanel));
    this.column_type = column_type;
    this.vlt_id = '';
    this.vlt_name = '';
    this.vlt_active = undefined;
    this.get_vlt_slug = function() {
        if (this.vlt_id > 0) {
            return getVltListItem(this.vlt_id, 'slug');
        }
        return '';
    };
    this.get_vlt_name = function() {
        if (this.vlt_id > 0) {
            return getVltListItem(this.vlt_id, 'name');
        }
        return '';
    };
    this.setInputAttribute = function() {
            if (this.vlt_id > 0) {
                $(this._conteinerVltInput).attr('placeholder', this.get_vlt_name());
                $(this._conteinerVltInput).attr('data-vlt_id', this.vlt_id);
            } else {
                $(this._conteinerVltInput).attr('placeholder', $(this._conteinerVltInput).attr('data-title'));
                $(this._conteinerVltInput).attr('data-vlt_id', '-1');
            }
        }
        /**
         * 
         * @returns 
         */
    this.panel = function() {
        return this._conteinerPanel;
    };
    /**
     * 
     */
    this.checkedVltOne = function() {
        let colType = this.column_type;
        let $conteinerVltBox = this._conteinerVltBox;
        let colTypeChecked = (colType == 'first') ? 'change' : 'first';
        let $conteinerVltBoxChecked = $('.main-open.vltlist-box li.' + colTypeChecked + '-listonevlt', this.panel());
        let id = $(this._conteinerVltInput).attr('data-vlt_id');
        if (id) {
            let query = (colType == 'first') ? 'id_f=' + id + '&action=ex_vlt_check' : 'id_c=' + id + '&action=ex_vlt_check';
            $.post(check_script, query, function(data) {
                $(' li', $conteinerVltBoxChecked).not('.nocheck').addClass('nocheck').removeClass('check');
                $(' li a.' + colTypeChecked + 'VltOne:changedID(' + data + ')', $conteinerVltBoxChecked).parent().addClass('check').removeClass('nocheck');
            }, 'json');
        } else {
            $(' li.nocheck', $conteinerVltBoxChecked).removeClass('nocheck').removeClass('check');
        }
    };
    /**
     * 
     * @param {*} ev 
     * @returns 
     */
    this.clickButtonValuteActive = function(ev) {
        if (this.vlt_active) {
            $(this.vlt_active).parent().removeClass('active');
            this.vlt_id = false;
        }
        this.vlt_active = $(ev.currentTarget);
        $(this.vlt_active).parent().addClass('active');
        this.vlt_id = $(this.vlt_active).attr('data-vlt_id');
        this.reloadPlaceholder();
        $(document).trigger('PanelValuteList:clickButtonValute:all');
        this.checkedVltOne();
        panelVltListEvent().trigger('panelVltList:disActiveVltListSelector:all');
        panelVltListEvent().trigger('panelVltList:clearInput:all');
        return false;
    };
    /**
     * 
     */
    this.setVltOne = function() {
        let $conteinerVltBox = this._conteinerVltBox;
        if ($('li.active a', $conteinerVltBox).is('a')) {
            this.vlt_active = $('li.active a', $conteinerVltBox);
            this.vlt_id = $(this.vlt_active).attr('data-vlt_id');
        } else if (undefined != vltlist_active && (vltlist_active['vlt_' + this.column_type])) {
            this.vlt_id = vltlist_active['vlt_' + this.column_type];
            this.vlt_name = vltlist_active['vlt_' + this.column_type + '_name'];
        }
        let obj = this;
        $('a', $conteinerVltBox).on('click', (ev) => { obj.clickButtonValuteActive(ev) }).addClass('has-click');
    };
    /**
     * rename placeholdef for input filter 
     */
    this.reloadPlaceholder = function() {
        if (this.vlt_id > 0) {
            this.setInputAttribute();
        } else if (this.vlt_active) {
            $(this._conteinerVltInput).attr('placeholder', $(this.vlt_active).find('.data-name').html());
            $(this._conteinerVltInput).attr('data-vlt_id', $(this.vlt_active).find('[data-vlt_id]').attr('data-vlt_id'));
        }
        $(document).trigger('PanelValuteList:reloadTextBtn:all');
    };
    /**
     * rename placeholdef for input filter for widget
     */
    this.updateWidgetForm = function() {
        if ($('#tab-nav01').is('#tab-nav01')) {
            let $widget = $('#tab-nav01');
            let ua = $('body.iso-ua #tab-nav01').is('#tab-nav01');
            let ru = $('body.iso-ua #tab-nav01').is('#tab-nav01');
            let elemA;
            if (this.vlt_id > 0) {
                if (ua && $('#' + this.column_type + '_group_0  .' + this.column_type + '-' + this.vlt_id + '.ua a', $widget).is('a')) {
                    elemA = $('#' + this.column_type + '_group_0  .' + this.column_type + '-' + this.vlt_id + '.ua a', $widget).eq(0);
                } else if (ru && $('#' + this.column_type + '_group_0  .' + this.column_type + '-' + this.vlt_id + '.ru a', $widget).is('a')) {
                    elemA = $('#' + this.column_type + '_group_0  .' + this.column_type + '-' + this.vlt_id + '.ru a', $widget).eq(0);
                } else if ($('#' + this.column_type + '_group_0  .' + this.column_type + '-' + this.vlt_id + '.def a', $widget).is('a')) {
                    elemA = $('#' + this.column_type + '_group_0  .' + this.column_type + '-' + this.vlt_id + '.def a', $widget).eq(0);
                } else {
                    elemA = $('.' + this.column_type + '-' + this.vlt_id + ' a', $widget).eq(0);
                }
                if (undefined != elemA && $(elemA).parent().is('li') && !$(elemA).parent().is('li.active')) {
                    elemA.trigger('click');
                }
            }
        }

    }

    /**
     * 
     */
    this.start = function() {
        this.setVltOne();
        this.reloadPlaceholder();
        let obj = this;
        if (this.column_type == 'first') {
            $(document).on('PanelValuteList:reloadPlaceholder:first', () => { obj.setVltOne() });
            $(document).on('PanelValuteList:reloadPlaceholder:first', () => { obj.reloadPlaceholder() });
            $(document).on('PanelValuteList:update:firstVltOne', () => { obj.checkedVltOne() });
        } else {
            $(document).on('PanelValuteList:reloadPlaceholder:change', () => { obj.setVltOne() });
            $(document).on('PanelValuteList:reloadPlaceholder:change', () => { obj.reloadPlaceholder() });
            $(document).on('PanelValuteList:update:changeVltOne', () => { obj.checkedVltOne() });
        }
    };
    this.start();
    return this;
};


$(document).ready(function() {
    /**
     * 
     * @param {*} conteinerPanel 
     */
    function startActionCurrencyBox(conteinerPanel) {
        var $conteiner = $(conteinerPanel);
        var columnVltFirst = new columnValuteOneClass(conteinerPanel, 'first');
        var columnVltChange = new columnValuteOneClass(conteinerPanel, 'change');
        /**
         * 
         */
        function clickButtonValute() {
            let first = columnVltFirst.vlt_active;
            let change = columnVltChange.vlt_active;
            if (first && change) {
                window.location = vltRef + $(first).attr('data-vlt_slug') + '-' + $(change).attr('data-vlt_slug') + "/";
                return true;
            } else if (first) {
                columnVltFirst.updateWidgetForm();
            } else if (change) {
                columnVltChange.updateWidgetForm();
            }
            return false;
        };


        /**
         *  rename placeholdef for input filter 
         */
        function reloadTextBtn() {
            let first = columnVltFirst.vlt_active;
            let change = columnVltChange.vlt_active;
            let firstId = columnVltFirst.vlt_id;
            let changeId = columnVltChange.vlt_id;

            if (change && first) {
                $('.btn-exchange', $conteiner).attr('href', vltRef + $(change).attr('data-vlt_slug') + '-' + $(first).attr('data-vlt_slug') + "/");
            } else if (changeId > 0 && firstId > 0) {
                $('.btn-exchange', $conteiner).attr('href', vltRef + getVltListItem(changeId, 'slug') + '-' + getVltListItem(firstId, 'slug') + "/");
            }

        }
        $(document).on('PanelValuteList:clickButtonValute:all', clickButtonValute);
        $(document).on('PanelValuteList:reloadTextBtn:all', reloadTextBtn);
        reloadTextBtn();
    }

    if ($('#tab-nav01').is('#tab-nav01')) {
        startActionCurrencyBox('#tab-nav01');
    }
});

$(document).ready(function() {

    if (!$('#tab-nav01').is('#tab-nav01')) {
        return;
    }
    const $conteinerBox = $('#tab-nav01 .main-open.vltlist-box');

    function updateWidgetValute(ev) {
        let first_id = false;
        let change_id = false;
        if ($('.block-first-vltone li.active a.firstVltOne', $conteinerBox).is('a.firstVltOne')) {
            first_id = $('.block-first-vltone li.active a.firstVltOne', $conteinerBox).attr('data-vlt_id');
        }
        if ($('.block-change-vltone li.active a.changeVltOne', $conteinerBox).is('a.changeVltOne')) {
            change_id = $('.block-change-vltone li.active a.changeVltOne', $conteinerBox).attr('data-vlt_id');
        }
        if (first_id && change_id) {
            return;
        }
    }

    $(document).on('WidgetValuteList:firstVltOne', updateWidgetValute);
    $(document).on('WidgetValuteList:changeVltOne', updateWidgetValute);

});