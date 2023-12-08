$(document).ready(function () {
    /*
     * Event click item menu hamburg
     */
    const menuLinks = document.querySelectorAll('#offcanvasExample .list-group-item, #offcanvasExample .list-group-item a');
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            const navbarToggler = document.querySelector('.navbar-toggler');
            if (event.target.tagName !== 'A') {
                navbarToggler.click();
                $(link).find('a')[0]?.click();
            }
            navbarToggler.click();
        });
    });

});