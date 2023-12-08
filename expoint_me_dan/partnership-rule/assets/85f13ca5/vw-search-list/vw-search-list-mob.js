isMobile()&&$(document).ready(function () { 

    (!!logger) && logger.trace('list isMobile');

    /* Отображение рамки вокруг "Отдадите" и "Получите" на главной странице */
    (function() {
        const body = document.querySelector('body');
        if (!body.classList.contains('obmen-valute1-valute2')) {
            document.querySelector('.container-exchange').classList.add('add_form_input');
        }
    }());

    $("#sidebar .mob .exchange-btn").on('click', function () {
        const type = $(this).is('.first') ? 'first' : ($(this).is('.change') ? 'change' : false);
        const allListTabs = [[0, 'Все валюты'], [5, 'Крипта'], [3, 'Банки'], [4, 'Переводы'], [1, 'Эл.валюты'], [2, 'Наличные'], [6, 'Коды криптобирж']];
        if (false !== type) {
            const in_this = $("#sidebar .desc .exchange-btn." + type + " input").eq(0);
            $('.container-exchange.desc').css('display', 'block');
            in_this.parent().addClass('fixed');
            in_this.parent().find('.min_close').addClass('active');
            $('#sidebar .bar-data-table>li.' + type + '-valute').addClass('active_ib');
            $('html, body').animate({scrollTop: 0}, 300);
            $('html, body').addClass('stopscroll');
            $('body').addClass('overflow-hidden');

            /* Фиксируем sidebar на новом экране */
            if (window.location.href.includes('obmen')) {
                document.querySelector('#sidebar').classList.add('position-fixed');
            }
            addStyleListVlt(type);
            selectSearchVlt(type);


            createBlcFilterSearch(allListTabs).then(() => {
                eventClickFilter(allListTabs);
                hideAllElm(type);
            });
        } else {
            $('html, body').removeClass('stopscroll');
            $('body').removeClass('overflow-hidden');
        }
    });



    /* Добавление новых стилей для списка валют на мобильном экране */
    function addStyleListVlt(type) {
        const blcVltone = document.querySelectorAll('.block-' + type + '-vltone');
        blcVltone.forEach(item => {
            item.classList.add('style-list-vlt');
        });
    }

    /* Создание блока фильтра на странице выбора валют */
    function createBlcFilterSearch(allListTabs) {
        return new Promise((resolve, reject) => {
            /* create block filter*/
            const divBlc = document.createElement('div');
            divBlc.classList.add('block-filter-vlt');

            /* Проверка на добавление тени справа */
            setTimeout(() => {
                const checkSizeBlock = document.getElementsByClassName('block-filter-vlt')[0];
                let isOverflowing = checkSizeBlock?.scrollWidth > checkSizeBlock?.clientWidth || checkSizeBlock?.scrollHeight > checkSizeBlock?.clientHeight;
                if (isOverflowing) divBlc.classList.add('checkScrollRight');
            }, 0);

            /* create block name */
            const blcHeaderVlt = document.createElement('div');
            blcHeaderVlt.classList.add('block-header-vlt');

            /* checking the selected vlt (links oder rechts) */
            const checkSelectVlt = document.querySelector('.vltlist-btn.first')?.classList.contains('d-none');
            blcHeaderVlt.innerHTML = checkSelectVlt ? 'Валюту получите' : 'Валюту отдадите';

            /* crate icon close */
            const blcCloseVlt = document.createElement('div');
            blcCloseVlt.classList.add('block-close-vlt');
            blcCloseVlt.innerHTML = "×";


            /* create filter button */
            allListTabs.forEach((item, index) => {
                let status = index ? '' : 'active';
                divBlc.innerHTML += `<div class="item-filter-vlt ${status}" data-vlt="${item[0]}">${item[1]}</div>`;
            });

            /* create white background */
            const divBlcWhite = document.createElement('div');
            divBlcWhite.classList.add('block-white');


            /* Проверяем прокрутку табов для отображения теней (слева и/или справа) */
            divBlc.onscroll = function () {
                let allBlock = this.scrollWidth, scrollBlock = (this.scrollLeft + this.offsetWidth) * 1.05;
                scrollBlock >= allBlock ? this.classList.remove('checkScrollRight') : this.classList.add('checkScrollRight');
                this.scrollLeft <= 5 ? this.classList.remove('checkScrollLeft') : this.classList.add('checkScrollLeft');
            };

            /* insert block */
            const vltlistForm = document.querySelector('.vltlist-form');
            vltlistForm.insertBefore(divBlcWhite, vltlistForm.firstChild);
            vltlistForm.insertBefore(blcHeaderVlt, vltlistForm.firstChild);
            vltlistForm.insertBefore(blcCloseVlt, vltlistForm.firstChild);
            vltlistForm.insertBefore(divBlc, vltlistForm.firstChild);

            resolve();
        });
    }

    /* Отображение одного из поля (first & change) для поиска валюты */
    function selectSearchVlt(type) {
        document.querySelector('.vltlist-btn.' + type).classList.remove('d-none');
        document.querySelector('.vltlist-form').classList.add('select-' + type + '-field');
        document.querySelector('.vltlist-form input#vltlist_' + type).classList.add('form-control');
        document.querySelector('.vltlist-form input#vltlist_' + type).focus();
    }

    /* Обработка клика по фильтрам */
    function eventClickFilter(allListTabs) {
        const blcFilterVlt = document.querySelector('.block-filter-vlt');
        const itemFilterVlt = document.querySelectorAll('.item-filter-vlt');

        blcFilterVlt.addEventListener('click', (e) => {
            /* Подсвечиваем выбранный таб */
            if (!e.target.classList.contains('active')) {
                itemFilterVlt.forEach((item) => item.classList.remove('active'));
                e.target.classList.add('active');

                const checkTabActive = document.getElementsByClassName('item-filter-vlt')[0].classList.contains('active');
                if (checkTabActive) {
                    const scrollToStart = document.querySelector('.block-filter-vlt');
                    scrollToStart.scrollLeft !== 0 ? scrollToStart.scrollLeft = 0 : null;
                }
            }

            showActiveTab(1, document.querySelectorAll('.block-first-vltone'), '.first-valute');
            showActiveTab(2, document.querySelectorAll('.block-change-vltone'), '.change-valute');

            function showActiveTab(idx, type, classInput) {
                type.forEach((input) => {
                    searchVltBlcFirstChange(idx);
                    /* allListTabs[0][0] - Таб "все валюты" */
                    if (Number(e.target.dataset['vlt']) !== allListTabs[0][0]) {
                        input.classList.add('d-none');
                        let nameClassBlock = classInput + ' .group_' + e.target.dataset['vlt'];
                        const blockSearchTab = document.querySelector(nameClassBlock);
                        blockSearchTab.classList.remove('d-none');
                    } else {
                        input.classList.remove('d-none');
                    }
                });
            }
        });

    }

    function searchVltBlcFirstChange(idx) {

        setTimeout(() => {

            let tabGroup = Number($('.item-filter-vlt.active').data('vlt'));

            /* Проверка на наличие найденной валюты в любой вкладке */
            let vltSearch = $('.valute' + idx + '.active_ib ul li.search:first').hasClass('search');
            /* Проверка на наличие найденной валюты в активной вкладке */
            let activeTab = $('#first_group_' + tabGroup + ' li.search:first').hasClass('search');

            const selectInput = idx === 1 ? 'first' : 'change';

            if (tabGroup === 0) {
                /* поиск в первой вкладке */
                if (vltSearch || $('#vltlist_' + selectInput).val() === '') {
                    $('.notValute' + idx).addClass('d-none');
                    $('.notValuteTab' + idx).addClass('d-none');
                } else {
                    $('.notValute' + idx).removeClass('d-none');
                    $('.notValuteTab' + idx).addClass('d-none');
                }
            } else {
                /* поиск в других, кроме первой */
                if (vltSearch && !activeTab && $('#vltlist_' + selectInput).val() !== '') {
                    $('.notValuteTab' + idx).removeClass('d-none');
                    $('.notValute' + idx).addClass('d-none');
                } else if (!vltSearch && !activeTab && $('#vltlist_' + selectInput).val() !== '') {
                    $('.notValute' + idx).removeClass('d-none');
                    $('.notValuteTab' + idx).addClass('d-none');
                } else if(vltSearch && activeTab){
                    $('.notValuteTab' + idx).addClass('d-none');
                    $('.notValute' + idx).addClass('d-none');
                }

            }

        }, 0);

    }

    /* Добавление подсказки по поиску валют */
    $(document).ready(function () {
        const changeVltInputTabFirst = $('.vltlist-btn.first input')[0];
        const changeVltInputTabChange = $('.vltlist-btn.change input')[0];

        changeVltInputTabFirst?.addEventListener('input', function () {
            searchVltBlcFirstChange(1);
        });
        changeVltInputTabChange?.addEventListener('input', function () {
            searchVltBlcFirstChange(2);
        });
    });

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('clickMoveAllCategory')) {

            const allValute = document.querySelector('.item-filter-vlt:first-child');
            allValute.click();

        }
        if (e.target.classList.contains('min_close')) {
            /* Принудительно выбираем вкладку, при выборе второй валюты */
            setTimeout(() => {
                document.querySelector('.item-filter-vlt:first-child').click();
            }, 0);
        }
    });

    /* Обработка клика по иконке close или выборе валюты, все созданные элементы скрываются */
    function hideAllElm(type) {
        const selectLinkVlt = document.querySelectorAll('a.has-click');
        const selectIconClose = document.querySelector('.block-close-vlt');

        selectLinkVlt.forEach(item => {
            item.addEventListener('click', closeAllBlcElm);
        });

        function removeClassSelectField() {
            if(document.querySelector('.vltlist-form.select-change-field')){
                document.querySelector('.vltlist-form').classList.remove('select-change-field');
            }
            if (document.querySelector('.vltlist-form.select-first-field')) {
                document.querySelector('.vltlist-form').classList.remove('select-first-field');
            }
        }

        selectIconClose.addEventListener('click', closeAllBlcElm);

        function closeAllBlcElm() {

            const blockFilterVlt = document.querySelector('.block-filter-vlt');
            if (blockFilterVlt) blockFilterVlt.remove();

            const blockCloseVlt = document.querySelector('.block-close-vlt');
            if (blockCloseVlt) blockCloseVlt.remove();

            const blockHeaderVlt = document.querySelector('.block-header-vlt');
            if (blockHeaderVlt) blockHeaderVlt.remove();

            const blockWhite = document.querySelector('.block-white');
            if (blockWhite) blockWhite.remove();

            document.querySelector('.vltlist-btn.first').classList.add('d-none');
            document.querySelector('.vltlist-btn.change').classList.add('d-none');
            document.querySelector('.btn-exchange').classList.add('d-none');
            document.querySelector('.valute1').classList.remove('active_ib');
            document.querySelector('.valute2').classList.remove('active_ib');

            /* Возвращаем sidebar в исходное состояние */
            if (!window.location.href.includes('obmen')) {
                document.querySelector('#sidebar').classList.remove('position-fixed');
                removeClassSelectField();
            } else {
                document.querySelector('#sidebar').classList.remove('position-fixed');
            }
            $('html, body').removeClass('stopscroll');
            $('body').removeClass('overflow-hidden');
            copyValuteToInput();
            removeClassSelectField();
        }
    }

    /* Копирование значения выбранной валюты из input в div на главную */
    function copyValuteToInput() {
        const firstFieldHeader = document.querySelector('.mob_btn_menu.first_ib');
        const changeFieldHeader = document.querySelector('.mob_btn_menu.change_ib');

        const vltlistFirst = document.querySelector('#vltlist_first');
        const vltlistChange = document.querySelector('#vltlist_change');
        if (vltlistFirst.placeholder !== 'Отдадите') firstFieldHeader.innerText = vltlistFirst.placeholder;
        if (vltlistChange.placeholder !== 'Получите') changeFieldHeader.innerText = vltlistChange.placeholder;
    }

    const linkSmallMenu = document.querySelectorAll('li.tab-item a');

    linkSmallMenu.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const getGoalElement = document.querySelector('#' + (item.attributes['href'].textContent).split('#')[1]);
            if (getGoalElement) {
                getGoalElement.scrollIntoView({behavior: 'smooth'});
            }
        });
    });

    /* При прокрутке страницы, блок поиска валют фиксируется. Добавляем класс fixed-mobile-top-search */
    const mobileTopHeader = document.getElementById('mobile_top_header');
    let initialOffsetTop = mobileTopHeader.offsetTop;
    let isFixed = false;

    function handleScroll() {
        var currentScrollPos = window.pageYOffset;

        if (currentScrollPos > initialOffsetTop && !isFixed) {
            isFixed = true;
            mobileTopHeader.classList.add('fixed-mobile-top-search');
        } else if (currentScrollPos <= initialOffsetTop && isFixed) {
            isFixed = false;
            mobileTopHeader.classList.remove('fixed-mobile-top-search');
        }
    }

    window.addEventListener('scroll', handleScroll);

});