/**
 * Created by Epulapp on 05/10/2016.
 */
$(document).ready(function() {
    $("#testFichier").submit(function () {
        ajax({
            url: "./getDataPlane.php",
            type: 'GET',
            success: function () {
                alert("Fichier remplit")
            },
            error: function () {
                alert("Erreur")
            }
        });
    });
});