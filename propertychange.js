$(document).on('blur', '.highSearch textarea', function() {
    if ($('.highSearch textarea').val().length > 0) {
        $('.highSearch textarea').removeClass('default').addClass('c-gray1');
    } else {
        $('.highSearch textarea').removeClass('c-gray1').addClass('default');
    }
}).on('keydown', function() {
    $('.highSearch textarea').removeClass('default');
});
