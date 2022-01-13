// $('.tab__panel').each(function(){


//     //1
//     let ths = $(this);

//     //5
//     ths.find('button').click(function(e){
//         e.preventDefault();
//     })

//     // //2 Чистое переключение
//     // ths.find('.next-btn').click(function(){
//     //     // console.log(ths.find('h2').text());
//     //        ths.fadeOut();
//     //         setTimeout(function(){
//     //             ths.removeClass('active')
//     //             ths.next().fadeIn().addClass('active')
//     //         }, 500)
//     //         $('.tab__nav li').removeClass('active').eq(ths.index()+1).addClass('active'); 
//     // })

//     //6 финальная форма

//     ths.find('.next-btn').click(function(){
//         // console.log(ths.find('h2').text());
//         if( ths.has('input[name=name]') ) {
//             if( $('input[name=name]').val().length == 0 ) {
//                return false; 
//             } else {
//                 ths.fadeOut();
//                 setTimeout(function(){
//                     ths.removeClass('active')
//                     ths.next().fadeIn().addClass('active')
//                 }, 500)
//                 $('.tab__nav li').removeClass('active').eq(ths.index()+1).addClass('active'); 
//             }
//         } else if( ths.has('input[name=quant]') ) {
//             if( $('input[name=quant]').val().length == 0 ) {
//                 return false;
//             } else {
//                 ths.fadeOut();
//                 setTimeout(function(){
//                     ths.removeClass('active')
//                     ths.next().fadeIn().addClass('active')
//                 }, 500)
//                 $('.tab__nav li').removeClass('active').eq(ths.index()+1).addClass('active'); 
//             }
//         } else {

//         }
        
//     })

//     //3
//     ths.find('.prev-btn').click(function(){
//         // console.log(ths.find('h2').text());
//         ths.fadeOut();
//         setTimeout(function(){
//             ths.removeClass('active')
//             ths.prev().fadeIn().addClass('active')
//         }, 500)
//         $('.tab__nav li').removeClass('active').eq(ths.index()-1).addClass('active');
//     })

//     //4
//     $('.tab__content .tab__panel').first().find('.prev-btn').addClass('unable');
//     $('.tab__content .tab__panel').last().find('.next-btn').addClass('unable');

// })

    // 1 Чистое переключение вперед
    // $('.next-btn').click(function(e){
    //     // console.log(ths.find('h2').text());
    //        e.preventDefault();
    //        let ths = $(this).parent().parent();
    //        ths.fadeOut();
    //         setTimeout(function(){
    //             ths.removeClass('active')
    //             ths.next().fadeIn().addClass('active')
    //         }, 500)
    //         $('.tab__nav li').removeClass('active').eq(ths.index()+1).addClass('active'); 
    // })

    //4 Переключение с валидацией
    $('.next-btn').click(function(e){
        // console.log(ths.find('h2').text());
           e.preventDefault();
           let ths = $(this).parent().parent();
           if( ths.has('input[name=email]').length > 0 ) {
                if( ths.find('input[name=email]').val().length == 0 ) {
                    ths.find('.error').addClass('active');
                        setTimeout(function(){
                            ths.find('.error').removeClass('active');
                        }, 1500)
                    return false;
                }
                else {
                    ths.fadeOut();
                    setTimeout(function(){
                        ths.removeClass('active')
                        ths.next().fadeIn().addClass('active')
                    }, 500)
                    $('.tab__nav li').removeClass('active').eq(ths.index()+1).addClass('active');
                }
           } else {
                if ( ths.has('input[name=quant]').length > 0 ) {
                    if( ths.find('input[name=quant]').val().length == 0 ) {
                        ths.find('.error').addClass('active');
                        setTimeout(function(){
                            ths.find('.error').removeClass('active');
                        }, 1500)
                        return false;
                    } else {
                        if (ths.find('input[name=quant]').val() > 1000) {
                            ths.find('input[name=quant]').val(1000);
                        } else {
                            if( ths.find('input[name=quant]').val() >=1 && ths.find('input[name=quant]').val() <=10 ) {
                                $('.price span').text(10)
                                $('.price__hidden').val(10)
                            } else if ( ths.find('input[name=quant]').val() >=11 && ths.find('input[name=quant]').val() <=100 ){
                                $('.price span').text(100)
                                $('.price__hidden').val(100)
                            } else if (ths.find('input[name=quant]').val() >=101 && ths.find('input[name=quant]').val() <=1000 ){
                                 $('.price span').text(1000)
                                $('.price__hidden').val(1000)
                            } else {
                                return false;
                            }
                           ths.fadeOut();
                            setTimeout(function(){
                                ths.removeClass('active')
                                ths.next().fadeIn().addClass('active')
                            }, 500)
                            $('.tab__nav li').removeClass('active').eq(ths.index()+1).addClass('active'); 

                        }
                        
                    }
                }
           }
           
    })

    //2 чистое переключение назад
    $('.prev-btn').click(function(e){
        // console.log(ths.find('h2').text());
        e.preventDefault();
        let ths = $(this).parent().parent();
        ths.fadeOut();
        setTimeout(function(){
            ths.removeClass('active')
            ths.prev().fadeIn().addClass('active')
        }, 500)
        $('.tab__nav li').removeClass('active').eq(ths.index()-1).addClass('active');
    })


    //3 проставляем неактивные кнопки
    $('.tab__content .tab__panel').first().find('.prev-btn').addClass('unable');
    $('.tab__content .tab__panel').last().find('.next-btn').addClass('unable');


    //5 Send form

    $('.send-btn').click(function(e){
        e.preventDefault();
        let th = $('form');
        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            setTimeout(function() {
                // Done Functions
                $('.form-success').text('Your email was send successfully');
                th.trigger("reset");
            }, 1000);
        });
        let ths = $(this).parent().parent();
        ths.fadeOut();
        setTimeout(function(){
            ths.removeClass('active')
            ths.next().fadeIn().addClass('active')
        }, 500)
        $('.tab__nav li').removeClass('active').eq(ths.index()+1).addClass('active'); 
    })

    $('.restart-btn').click(function(e){
        e.preventDefault();
         $('.tab__nav li').removeClass('active').eq($('.tab__nav li').index(0)).addClass('active');
         let ths = $(this).parent().parent();
         ths.fadeOut();
         $('.tab__content .tab__panel').first().fadeIn().addClass('active');
    })