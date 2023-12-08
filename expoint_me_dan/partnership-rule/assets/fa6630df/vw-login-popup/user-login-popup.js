var onClickReCaptchaV3;
$(document).ready(function() {


    function centerBox() {
        /* определяем базовый размер попаба */
        var boxWidth = 750;
        var boxHeight = 500;

        if ($('.login .popup-window .no-mobile').is('.no-mobile') && $('.login .popup-window .no-mobile').css('display') === 'none') {
            boxWidth = $(window).width() * 0.95;
            $('.login .popup-content').css({ 'width': boxWidth + 'px', 'height': boxHeight + 'px' });
        }
        /* определяем нужные данные */
        var winWidth = $(window).width();
        var winHeight = $(window).height();
        /* Вычисляем что надо сделать ауторесизе по размерам из CSS*/
        if ($('.login .popup-window .autoresize').is('.autoresize')) {
            boxHeight = 60 + $('.login .popup-window .autoresize').height();
            boxWidth = 60 + $('.login .popup-window .autoresize').width();
            if (winWidth < 450) {
                boxHeight = 30 + $('.login .popup-window .autoresize').height();
                boxWidth = 20 + $('.login .popup-window .autoresize').width();
            }
            /* console.log( winWidth , boxWidth );*/
            $('.login .popup-content').css({ 'width': boxWidth + 'px', 'height': boxHeight + 'px' });
        }
        /* Вычисляем позицию */
        var disWidth = (winWidth - boxWidth) / 2;
        var disHeight = (winHeight - boxHeight) / 2;
        if (disHeight < 0) {
            disHeight = 0;
        }

        /* Добавляем стили к блокам */
        $('.login .popup-window').css({ 'left': disWidth + 'px', 'top': disHeight + 'px' });

        return false;
    }

    $(function() {

        var ajax_login_start = false;
        /**
         * Функция по нажатию на кнопку
         * @param {type} e
         * @param {type} ajax_action
         * @param {type} params
         * @returns {undefined}
         */
        function PopupLoginClick(e, ajax_action, params) {
            if (ajax_login_start) {
                return false;
            }

            if ($("body.logged-in").is('.logged-in')) {
                return true;
            }

            if (undefined === params) {
                params = {};
            }
            ajax_login_start = true;
            $('.login.overlay_popup').show();
            $(".login .popup-window").show();
            $('#popup-login-wrap .popup-content').html('...');
            // e.preventDefault();
            if ($("#popup-login-wrap .popup-login-content-wrap").length === 0) {
                params = (params) ? params : { 'param': params };
                params['pagename'] = $(location).attr('href');
                params['ajax_action'] = 'ex_' + ajax_action + '_popup';
                params['t'] = ((new Date()).getTime() / 10000 << 1) * 5000;
                start_send_web_vitals(e, ajax_action, params);
                var response = $.ajax({
                    type: "POST",
                    url: '/wp-content/plugins/vw-login/start-ajax.php',
                    data: params,
                    async: false,
                    success: function(text) {
                        $('#popup-login-wrap .popup-content').html(text); 
                        centerBox();
                        if (!$('action-redirect', text).is('.action-redirect')) {
                            reLoad($('#popup-login-wrap .popup-content'));
                        } else {
                            start_send_web_vitals(e, ajax_action, params);
                        } 
                        ajax_login_start = false;
                    },
                    error: function(text) {
                        $('#popup-login-wrap .popup-content').html('Ошибка в ответе сервера. Попробуйте позже.');
                        //   $(window).resize(centerBox);
                        centerBox();
                        ajax_login_start = false;
                    }
                });
            }

            return false;
        }
        /**
         * 
         * @param {type} e
         * @param {type} ajax_action
         * @param {type} params
         * @returns {undefined}
         */
        function start_send_web_vitals(el, ajax_action, params) {
            if (typeof ga4.send !== 'function') {
                return;
            }
            let method='open';
            if ($(el).is('form')) {
                method='submit_attempt'; 
            }
            if (!$('action-redirect',$('#popup-login-wrap .popup-content')).is('.action-redirect')) {
                method='submit'; 
            } 
            if (ajax_action === 'registration') {
                ga4.send('popup_tracking',method, 'complaint_form', 'hybrid');
            } else if (ajax_action === 'login') {
                if ($('[name=vwlp_start]', el.target).val()==='start') {
                    ga4.send('popup_tracking', 'start', 'login_form', 'hybrid');
                } else {
                    ga4.send('popup_tracking',method,'login_form','hybrid');
                }
            } 
        }
        /**
         * 
         * @param {type} e
         * @param {type} ajax_action
         * @returns {undefined}
         */
        function PopupFormSubmit(e, ajax_action) {
            var params = {};
            if ($(e.target).find('div.errors').is('.errors')) {
                return false;
            }

            $(e.target).find('input, textearea, select').each(function() {
                params[this.name] = $(this).val();
            });

            if (hasRecaptcha() && typeof(onClickReCaptchaV3) === 'function') {
                onClickReCaptchaV3(e, ajax_action, function(e, token) { params['g-recaptcha-token'] = token; return PopupLoginClick(e, ajax_action, params); });
            } else {
                PopupLoginClick(e, ajax_action, params);
            }
            return false;
        }
        /**
         * 
         * @returns {Boolean}
         */
        function hasRecaptcha() {

            if ($(".action-login .login_form_content form").is('form')) {
                return true;
            }
            if ($(".action-register form").is('form')) {
                return true;
            }
            return false;
        }
        /**
         * 
         * @param {type} element
         * @returns {undefined}
         */
        function reLoad(element) {

            if ($(".action-login .login_form_content form", element).is('form')) {
                $(".action-login .login_form_content form", element).on('submit', function(e) { PopupFormSubmit(e, 'login'); return false; });
            }

            if ($(".action-login .register_form_step1_content form", element).is('form')) {
                console.log('login');
                $(".action-login .register_form_step1_content form", element).on('submit', function(e) { PopupFormSubmit(e, 'login'); return false; });
            }

            if ($(".action-register form", element).is('form')) {
                $(".action-register form", element).on('submit', function(e) { PopupFormSubmit(e, 'registration'); return false; });
            }

            if ($(".action-lostpassword form", element).is('form')) {
                $(".action-lostpassword form", element).on('submit', function(e) { PopupFormSubmit(e, 'lostpassword'); return false; });
            }

            if ($("[href*='#login_popup']", element).is('a')) {
                $("[href*='#login_popup']", element).click(function(e) { return PopupLoginClick(e, 'login'); });
            }

            if ($(location).attr('href').indexOf('login_popup') !== -1) {
                $("[href*='#login_popup']", element).click();
            }
            if ($("[href*='lostpassword']", element).is('a')) {
                $("[href*='lostpassword']", element).click(function(e) { return PopupLoginClick(e, 'lostpassword'); });
            }
            startOnKeyOnToLabel(element);
            startOnEyeToPassword(element);
            validate(element);

        }
        /**
         * 
         * @param {type} element
         * @returns {undefined}
         */
        function startOnKeyOnToLabel(element) {
            if (document === element) {
                element = $('#popup-login-wrap');
            }
            if (!$('form input', element).is('input')) {
                return;
            }
            $('form input', element).on('keyup', function(ev) {
                if ($(this).val() !== '' && !$('label', $(this).parent()).is('.active')) {
                    $('label', $(this).parent()).addClass('active').removeClass('hidden');
                } else if ('' === $(this).val() && $('label', $(this).parent()).is('.active')) {
                    $('label', $(this).parent()).addClass('hidden').removeClass('active');
                }
            });

            if ($('form input', element).is('.input')) {
                $('form input.input', element).each(function() {
                    if ($(this).val() !== '') {
                        $(this).parent().find('label').removeClass('hidden').addClass('active');
                    }
                });
            };
        }
        /**
         * 
         * @param {type} element
         * @returns {undefined}
         */
        function startOnEyeToPassword(element) {
            if (document === element) {
                element = $('#popup-login-wrap');
            }
            if (!$('form .field-password .eye', element).is('.eye')) {
                return;
            }
            $('form .field-password .eye', element).on('click', function(ev) {
                if ($(this).parent().find('input').attr('type') === 'password') {
                    $(this).parent().find('input').attr('type', 'text');
                    $(this).removeClass('eye-close').addClass('eye-open');
                } else if ($(this).parent().find('input').attr('type') === 'text') {
                    $(this).parent().find('input').attr('type', 'password');
                    $(this).removeClass('eye-open').addClass('eye-close');
                }
            });

        }

        function validate(element) {

            $('form input[data-filter=email]', element).on('change', function(ev) {
                if ($(this).val() === '') {
                    addError(this, 'Заполните Email.');
                    return;
                } else if ((/[A-Z]/.test($(this).val()))) {
                    addError(this, 'В Email только малые буквы.');
                    return;
                } else if (!(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test($(this).val()))) {
                    addError(this, 'Неверный формат Email.');
                    return;
                }
                addError(this, false);
            });
            $('form input[data-filter=password]', element).on('change', function(ev) {
                if ($(this).val() === '') {
                    addError(this, 'Заполните Пароль.');
                    return;
                } else if ($(this).val().length < 6) {
                    addError(this, 'Короткий пароль.');
                    return;
                }
                addError(this, false);
            });
            $('form input[data-filter=password2]', element).on('change', function(ev) {
                if ($(this).val() === '') {
                    addError(this, 'Заполните Пароль.');
                    return;
                } else if ($(this).val().length < 6) {
                    addError(this, 'Короткий пароль.');
                    return;
                } else if ($(this).val() != $('form input[data-filter=password]', element).val()) {
                    /* должно стоять != */
                    addError(this, 'Пароли не совпадают.');
                    return;
                }
                addError(this, false);
            });
            $('form input[data-filter=nickname]', element).on('change', function(ev) {
                if ($(this).val() === '') {
                    addError(this, 'Заполните Никнайм.');
                    return;
                } else if (!(/^[a-zA-Z0-9!#$%&'*+=?^_{|}~-]+$/.test($(this).val()))) {
                    addError(this, 'Введите ник на латиннице.');
                    return;
                }
                addError(this, false);
            });
        }
        /**
         * 
         * @param {type} el
         * @param {type} message
         * @returns {undefined}
         */
        function addError(el, message) {
            if ($(el).is('input')) {
                if (message === false) {
                    $(el).parent().find('.error-message').html('');
                    $(el).parent().removeClass('errors');
                } else {
                    $(el).parent().find('.error-message').html(message);
                    $(el).parent().addClass('errors');
                }
            }
        }
        reLoad(document);

        $('body').on('click', '#popup-login-wrap form .current-email-wrap .email-edit-icon', function(e) {
            $('#popup-login-wrap form .current-email-wrap').hide();
            $('#popup-login-wrap form .register-useremail').show();

            /*  $('#popup-login-wrap').modal('hide');*/
            /*  $('#popup-login-wrap').modal('show');*/
        });

        $('body').on('click', '.login.overlay_popup, .login .popup-window .close', function(e) {
            $('.login.overlay_popup, .login .popup-window').hide();
            if ($('.grecaptcha-badge').is('.grecaptcha-badge')) {
                $('.grecaptcha-badge').parent().remove();
            }
        });
    });




});