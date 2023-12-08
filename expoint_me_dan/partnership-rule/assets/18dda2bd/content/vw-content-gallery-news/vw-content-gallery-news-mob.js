$(document).ready(function () {

    setTimeout(()=>{
        // Получаем элемент с классом "carousel"
        const carousel = document.querySelector('.carousel');

        // Удаляем атрибут "data-bs-ride"
        carousel.removeAttribute('data-bs-ride');
    }, 1000);





    let widthBlock = $(".ex-block-news");
    let widthBlockDiv = $(".ex-block-news div");
    let resultWidth = widthBlockDiv.width() - widthBlock.width();

    const widthBlockItem = $(".ex-news-item");
    const paddingBetweenImg = 26;

    $(".ex-left").click(function () {
        widthBlock.animate({scrollLeft: "-=" + (widthBlockItem.width() + paddingBetweenImg) + "px"}, 300);

        if (widthBlock.scrollLeft() === 0) {
            $(".ex-block-news").animate({scrollLeft: "+=" + (resultWidth + paddingBetweenImg) + "px"}, 200);
        }
    });

    $(".ex-right").click(function () {

        widthBlock.animate({scrollLeft: "+=" + (widthBlockItem.width() + paddingBetweenImg) + "px"}, 300);

        if (widthBlock.scrollLeft() >= resultWidth && widthBlock.scrollLeft() <= resultWidth + paddingBetweenImg) {
            $(".ex-block-news").animate({scrollLeft: "-=" + (resultWidth + paddingBetweenImg) + "px"}, 200);
        }

    });

});