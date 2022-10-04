$( document ).ready(function() {
    $('#ecrie').hide();
    $('#ecri').hide();
    $("input[type='submit']").click(()=>{
        var l = [];
        $("input:checked").each(function(i) {
            /*var titre = $(this).closest('tr').find(".title").text();
            //console.log(titre);
            var auteur= $(this).closest('tr').find(".auteur").text();
            var edition = $(this).closest('tr').find(".edition").text();
            var prix= $(this).closest('tr').find(".prix").text();
            var date= $(this).closest('tr').find(".date").text();
            l.push(titre);
            l.push(auteur);
            l.push(edition);
            l.push(prix);
            l.push(date);*/
            l.push($(this).attr('href'));
        });
        $("#ecrie").val(l);
        $("#ecri").val(l);
    });
});
