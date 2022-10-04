$( document ).ready(function() {
    $('#ec_panier').hide();
    $("button[type='submit']").click(function(){
        $("#ec_panier").val($(this).attr('href'));
    });
    $('#date').keyup(function() {
        var nb_car = $(this).val().length;
        if(nb_car == 2) {
           $(this).val($(this).val()+'/');
        }
     });
    $('#n_carte').keyup(function() {
        var nb_car = $(this).val().length;
        if(nb_car == 4) {
            $(this).val($(this).val()+' ');
        }
    });
    $('#n_carte').keyup(function() {
        var nb_car = $(this).val().length;
        if(nb_car == 9 ) {
            $(this).val($(this).val()+' ');
        }
    });
    $('#n_carte').keyup(function() {
        var nb_car = $(this).val().length;
        if(nb_car == 14) {
            $(this).val($(this).val()+' ');
        }
    });
});