var user_iso = ''; {
    var els = document.getElementsByTagName('body');
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + 'country_iso'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    let country_iso = matches ? decodeURIComponent(matches[1]) : undefined;
    if (undefined !== country_iso) {
        let result = JSON.parse(country_iso);
        for (firstKey in result) {
            user_iso = result[firstKey];
            break;
        }
    }
    console.log('user_iso', user_iso);
    if (undefined !== els && user_iso && ((user_iso == 'UA') || (user_iso == 'RU'))) {
        els[0].classList.add('iso-' + user_iso.toLowerCase());
    } else {
        els[0].classList.add('def-iso');
    }
}