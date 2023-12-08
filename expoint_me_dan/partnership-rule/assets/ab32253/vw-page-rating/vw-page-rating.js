jQuery(function($) {
    let pageIsRated = function(page) {
        return window.sessionStorage.getItem('rating-' + page) !== null;
    }

    $(document)
        .on('click', '.bimsha-rating > div > div', function(e) {
            e.preventDefault();

            let $this = $(this),
                $parent = $this.parent(),
                rating = parseInt($this.data('value'));

            if (pageIsRated($parent.data('page'))) {
                return true;
            }

            window.sessionStorage.setItem('rating-' + $parent.data('page'), $this.data('value'));

            $.ajax({
                type: 'post',
                url: '/wp-content/plugins/bimsha-rating/handle.php',
                data: {
                    page: $parent.data('page'),
                    rating: rating
                },
                success: function(response) {
                    if (typeof response.data !== 'undefined') {
                        for (let i = 1; i <= 5; i++) {
                            let $item = $parent.find('> div[data-value="' + i + '"]');

                            i <= parseInt(response.data.rating) ? $item.addClass('active') : $item.removeClass('active');
                        }

                        let $ratingSection = $parent.parent();

                        $ratingSection.find('[data-rating]').text(response.data.rating);
                        $ratingSection.find('[data-count]').text(response.data.votes_count);

                    }
                }
            });
        })
        .on('mouseenter', '.bimsha-rating > .bimsha-rating-stars > div', function(e) {
            let $this = $(this),
                $parent = $this.parent(),
                rating = parseInt($this.data('value'));

            if (pageIsRated($parent.data('page'))) {
                return true;
            }

            for (let i = 1; i <= 5; i++) {
                let $item = $parent.find('> div[data-value="' + i + '"]');

                i <= rating ? $item.addClass('active') : $item.removeClass('active');
            }
        })
        .on('mouseleave', '.bimsha-rating > .bimsha-rating-stars', function() {
            let $this = $(this),
                rating = parseInt($this.data('current'));

            if (pageIsRated($this.data('page'))) {
                return true;
            }

            for (let i = 1; i <= 5; i++) {
                let $item = $this.find('> div[data-value="' + i + '"]');

                i <= rating ? $item.addClass('active') : $item.removeClass('active');
            }
        });
});