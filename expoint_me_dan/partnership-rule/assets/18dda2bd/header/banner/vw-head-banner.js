(function () {
    $(() => {
        $(".close_head-banner").on('click', function (e) {
            let index = $(e.target).closest('.head-banner').addClass('close').hasClass('blue');
            localStorage['banner' + $(e.target).data('index')] = 1;
        });

        let arr_banners = [];
        if (!localStorage['banner1']) {
            arr_banners.push([0]);
        }
        if (!localStorage['banner2']) {
            arr_banners.push([1]);
        }
        if (!localStorage['banner3']) {
            arr_banners.push([2]);
        }

        let index = arr_banners[Math.floor(Math.random() * arr_banners.length)];
        $('.head-banner').addClass('close').eq(index).removeClass('close');
    });
})();