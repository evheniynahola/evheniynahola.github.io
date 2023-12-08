$(document).ready(function() {

    /* подсвечиваем текущую страницу в меню */
    const linkMenu = document.querySelectorAll('.list-group-item a');

    if(!isNotMobile() && !window.location.href.includes('#content')) window.location.href += '#content';

    linkMenu.forEach((item)=>{
        let thisUrl = item.attributes[0].nodeValue.split('#');
        String(thisUrl[0]) === document.location.pathname ? item.classList.add('active') : null;
    });


    const listItems = document.querySelectorAll('.list-group-item');
    listItems.forEach((listItem) => {
        const link = listItem.querySelector('a');
        listItem.addEventListener('click', () => {
            link.click();
        });
    });

});