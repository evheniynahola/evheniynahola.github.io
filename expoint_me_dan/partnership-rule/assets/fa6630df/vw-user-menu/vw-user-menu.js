$(document).ready(function() {
    var ajax_balance_start = false;

    async function userReLoadBalances(params) {
        if (ajax_balance_start) {
            return false;
        }
        if (!$("body.logged-in").is('.logged-in')) {
            return true;
        }
        if (!$("#cashback-balance .icon-preloader").is('.icon-preloader')) {
            return true;
        }

        ajax_balance_start = true;
        params = (params) ? params : { 'param': params };
        params['t'] = ((new Date()).getTime() / 10000 << 1) * 5000;
        let response = await $.ajax({
            type: "POST",
            url: '/user/profile/balance-menu/',
            data: params,
            async: true,
            success: function(jsn) {
                /* console.log(jsn, jsn.cashback_balance, $("#cashback-balance"));*/
                if ($("#cashback-balance").is('#cashback-balance')) {
                    $("#cashback-balance").html(jsn.cashback_balance);
                }
                if ($("#partner-balance").is('#partner-balance')) {
                    $("#partner-balance").html(jsn.partner_balance);
                }
                ajax_balance_start = false;
            },
            error: function(text) {
                console.error('Error load ex_user_balances', text);
                ajax_balance_start = false;
            }
        });
    };

    if ($("body.logged-in #vw-header #btn-user").is('#btn-user')) {
        $('#vw-header #btn-user').on('click', async function(e) {
            await userReLoadBalances();
            /*const funStar = setTimeout(userReLoadBalances, 1);*/
        });
    }

});