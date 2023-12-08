isNotMobile() && $(document).ready(function() {
    $(".tabset-nav li").on('click', function() {
        if ($(this).index() == 1) {
            $('.tab_click').css('display', 'block');
        } else {
            $('.tab_click').css('display', 'none');
        }
    });
});