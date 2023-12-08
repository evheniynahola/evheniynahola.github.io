/**  заполнение данными валют панели выбора валютной паты 
 *  author : Viktor Serobaba  vikwebas@gmail.com  */
/********************* panel valutes *******************************/
var vltlist_active, vltlist_template, logger;
/**
 * replacement for Object.values()
 * @param {type} obj
 * @returns {Array}
 */
function getObjValues(obj) {
    if (typeof obj !== 'object') {
        return [];
    }
    var vals = Object.keys(obj).map(function(key) {
        return obj[key];
    });
    return vals;
}

/** initialisate start upload blocl */


/* clone Object panelColVltObj for left column valute panel */
var panelUpdateColVltObj = {
    template: vltlist_template,
    vltActive: vltlist_active,
    preComplete: false,
    type: 'first',
    pause: 0,
    getGroupTmp: function() {
        return this.template.group_tmp;
    },
    getItemTmp: function() {
        return this.template.item_tmp;
    },
    getLinkFromTmp: function() {
        return this.template.link_from_tmp;
    },
    getLinkToTmp: function() {
        return this.template.link_to_tmp;
    },
    findActiveFirstValute: function() {
        this.vltActive.findActiveFirstValute();
    },
    findActiveChangeValute: function() {
        this.vltActive.findActiveChangeValute();
    },

    findVltList: function() {
        if ((!!vlt_list && (typeof vlt_list == 'object'))) {
            return getObjValues(vlt_list).sort((a, b) => a['sort_order'] - b['sort_order']);
        }
        if (this.pause < 1000) {
            this.pause++;
            return this.findVltList();
        }
        this.sendError('Vlt update');

        alert('Неудачная попытка получить список валют. Попробуйте обновить страницу.');
        return [];
    },

    sendError: function(code) {
        if (this.hasPushError) {
            return;
        }
        try {
            this.hasPushError = true;
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'ga4_interaction',
                'action': 'error',
                'parameters':{
                  'role': 'error',
                  'message': code /* 'Vlt update' */
                }
            });
            console.log('Send datalayer.push()');
        } catch (error) {
            this.hasPushError = false;
            console.error('No send datalayer.push()');
        }
        return;
    },

    completeGroup: function(index, group) {
        let _this = this;
        let group_list_item = group.items;
        let list_vlt = group_list_item.reduce(function(list_vlt_tmp, item) {
            item.group_id = group.vltgroup_id;
            return list_vlt_tmp + _this.completeItem(item);
        }, '');
        return this.renderTemplate(this.getGroupTmp(), { 'vltgroup_id': group.vltgroup_id, 'vltgroup_name': group.name, 'list_vlt': list_vlt });
    },

    completeItem: function(item) {
        item.country_iso = (item.country_iso) ? item.country_iso : '';
        if (this.type === 'first') {
            item.page_link = this.getLinkFromTmp();
            search = new RegExp('valute1', 'g');
            item.page_link = item.page_link.replace(search, item.slug);
        } else {
            item.page_link = this.getLinkToTmp();
            search = new RegExp('valute2', 'g');
            item.page_link = item.page_link.replace(search, item.slug);
        }
        return this.renderTemplate(this.getItemTmp(), item);
    },

    renderTemplate: function(template, data) {
        for (var property in data) {
            if (data.hasOwnProperty(property)) {
                var search = new RegExp('{' + property + '}', 'g');
                template = template.replace(search, data[property]);
            }
        }

        return this.renderType(template);
    },

    renderType: function(template) {
        if ('first' === this.type) {
            return template;
        }
        var search = new RegExp('first', 'g');
        template = template.replace(search, this.type);
        return template;
    },

    completeAll: function(conteiner) {
        let allList = this.findVltList();
        var _this = this;
        let elUpload = conteiner.querySelector('.upload-full-list');
        elUpload.remove();
        conteiner.innerHTML = allList.reduce(function(all_tmp, group, index) {
            if (index > 0) {
                return all_tmp + _this.completeGroup(index, group);
            } else if (!_this.preComplete) {
                _this.preComplete = true;
                return all_tmp + _this.completeGroup(index, group);
            }
            return all_tmp;
        }, conteiner.innerHTML);
        return conteiner;
    },

    preCompleteGroup5: function(conteiner) {
        if (this.preComplete) {
            return;
        }
        let allList = this.findVltList();
        this.preComplete = true;
        var _this = this;
        let elUpload = conteiner.querySelector('.upload-full-list');
        elUpload.remove();
        conteiner.innerHTML = allList.reduce(function(all_tmp, group, index) {
            if (index > 0) {
                return all_tmp;
            }
            return all_tmp + _this.completeGroup(index, group);;
        }, conteiner.innerHTML);
        conteiner.append(elUpload);
        return conteiner;
    }

};

/**
 * 
 * @param {*} selector 
 * @returns  
 */
function panelUpdateVltClass(selector) {
    this.deb = false;
    this.selector = selector;
    /** @var  HTMLElementTagNameMap conteiner */
    this.conteiner = document.querySelector(selector);
    /* Object panelColVltFirst for right column valute panel */
    this.panelColVltFirst = Object.assign({}, panelUpdateColVltObj);
    this.panelColVltFirst.type = 'first';
    /*  Object panelColVltChange for right column valute panel */
    this.panelColVltChange = Object.assign({}, panelUpdateColVltObj);
    this.panelColVltChange.type = 'change';
    /** initialisate start upload block */
    this._startUploadVltList = false;
    /**
     * 
     * @param {*} conteiner 
     * @returns 
     */
    this.addAllVltList = function(conteiner) {
        let first_conteiner = conteiner.querySelector('.first-listonevlt');
        first_conteiner = this.panelColVltFirst.completeAll(first_conteiner);
        let elsF = first_conteiner.querySelectorAll('.bar-data-table a');
        elsF.forEach(function(el) {
            el.onclick = function() {
                return false;
            };
        });
        this.panelColVltFirst.findActiveFirstValute();
        $(document).trigger('PanelValuteList:reloadPlaceholder:first');
        $(document).trigger('PanelValuteList:update:firstVltOne');

        let change_conteiner = conteiner.querySelector('.change-listonevlt');
        change_conteiner = this.panelColVltChange.completeAll(change_conteiner);
        let elsC = change_conteiner.querySelectorAll('.bar-data-table a');
        elsC.forEach(function(el) {
            el.onclick = function() {
                return false;
            };
        });
        this.panelColVltChange.findActiveChangeValute();
        $(document).trigger('PanelValuteList:reloadPlaceholder:change');
        $(document).trigger('PanelValuteList:update:changeVltOne');

        return conteiner;
    };
    /**
     * 
     */
    this.startAddVltList = function() {
        let start = Date.now();
        var conteiner = this.conteiner;
        (this.deb) && console.log('panel.startAddVltList-start', start);
        /* upload full list */
        if (undefined === conteiner['data-full'] && conteiner['data-update'] !== 'update') {
            conteiner['data-update'] = 'update';
            conteiner.classList.add('update');
            conteiner = this.addAllVltList(conteiner);
            (this.deb) && console.log('panel.fullValuteClick-structure', Date.now() - start);
            conteiner['data-update'] = '';
            conteiner['data-full'] = 'full';
            //  $(document).trigger('startUploadGroupsBlock:loadCookie');
            // ...запуск события startUploadGroupsBlock:loadCookie
            let event = new Event("startUploadGroupsBlock:loadCookie", { bubbles: true });
            document.dispatchEvent(event);
            (this.deb) && console.log('panel.startAddVltList-end', Date.now() - start);
        }
    };
    /**
     * 
     * @returns 
     */
    this.startUploadVltList = function() {
        if (this._startUploadVltList) {
            return;
        }
        this._startUploadVltList = true;
        this.startAddVltList();
    };
    /**
     * Initialize the opening of the drop-down panel
     */
    this.initButton = function() {
            var panel = this;
            var conteiner = this.conteiner;
            let elsC = conteiner.querySelectorAll('.vltlist-btn');
            elsC.forEach(function(el) {
                var RgX = new RegExp(' first', 'g');
                el.type = RgX.test(el.className) ? "first" : 'change';
                var elButClose = el.querySelector('.min_close');
                /* hide the drop-down panel when you click on Min_Close*/
                elButClose.onclick = function() {
                        panel.disActiveVltListSelector();
                    }
                    /* Open drop-down panel */
                let inp = el.querySelector('input');
                inp.onclick = function() {
                    let elButClose = el.querySelector('.min_close');
                    let elC = conteiner.querySelector('.bar-data-table .' + el.type + '-listonevlt');
                    let RgX = new RegExp(' active_ib', 'g');
                    if (!RgX.test(elC.className)) {
                        panel.disActiveVltListSelector();
                        elButClose.className = elButClose.className + " active";
                        elC.className = elC.className + " active_ib";
                    }
                };
            });
        }
        /**
         * Hide dropping panel
         */
    this.disActiveVltListSelector = function() {
            let elsC = this.conteiner.querySelectorAll('.bar-data-table>.active_ib');
            elsC.forEach(function(el) {
                var search = new RegExp(' active_ib', 'g');
                el.className = el.className.replace(search, '');
            });
            let elsButCl = this.conteiner.querySelectorAll('.vltlist-btn>.min_close.active');
            elsButCl.forEach(function(el) {
                var search = new RegExp(' active', 'g');
                el.className = el.className.replace(search, '');
            });

        }
        /* init object */
    this.initButton();
    return this;
}


var _startUploadVltList = false;
/* The initialization of the list in the poles of the currencies when you click on the input field 
 * Not used jQuery
 */
function startUploadVltList() {
    if (_startUploadVltList) {
        return;
    }
    _startUploadVltList = true;
    /** @var panelUpdateVltClass panelVltList  */
    var panelVltList;
    let vltlist = document.querySelector('#tab-nav01 .vltlist-form');
    if (undefined != vltlist) {
        panelVltList = new panelUpdateVltClass('#tab-nav01');
        panelVltList.startUploadVltList();
        if (document.addEventListener) {
            document.addEventListener('panelVltList:disActiveVltListSelector:all', function() {
                panelVltList.disActiveVltListSelector();
            });
        }
        vltlist.onclick = function() {
            panelVltList.startUploadVltList();
        };

        if (document.addEventListener) {
            document.addEventListener('panelVltList:disActiveVltListSelector:all', function() {
                panelVltList.disActiveVltListSelector();
            });
        }
    }
}


if (isNotMobile) {
    (!!logger) && logger.trace('not Mobile');
    $(document).ready(function() {
        setTimeout(() => {
            startUploadVltList();
        }, 10);
    });
    /* // !!! Turn off because. Now the start of the calculation of currencies at the end of the page load
    var table1 = document.querySelector('#tab-nav01 .bar-data-table');
    table1.addEventListener('scroll', startUploadVltList, { passive: false });
    document.addEventListener('startUploadGroupsBlock:loadCookie', startUploadVltList, { passive: false });
    window.addEventListener('mousemove', startUploadVltList, { passive: false });
    window.addEventListener('keypress', startUploadVltList, { passive: false });
    window.addEventListener('click', startUploadVltList, { passive: false });
*/
};