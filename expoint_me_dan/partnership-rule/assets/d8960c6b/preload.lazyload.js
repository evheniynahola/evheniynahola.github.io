$(function($) {
    var lazyLoadInstance = new LazyLoad({
        // Your custom settings go here
    });
    $(document).on("DOMNodeInserted", function(event) {
        if ($('img.lazy[data-src]', event.target).is('img')) {
            lazyLoadInstance.update();
        };
    });

});