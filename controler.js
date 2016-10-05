/**
 * Created by Epulapp on 05/10/2016.
 */
$(document).ready(function(){
    $("#searchInfo").submit(function(){
        $.ajax({
            url: "../model/model.php",
            type: 'POST',
            data: 'typeStat=' + $("#typeState").text
        }).success(function(result){
            alert(result);
        }).error(function(){
            alert("Erreur")
        })
    });
})