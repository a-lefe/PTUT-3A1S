/**
 * Created by Epulapp on 05/10/2016.
 */
$(document).ready(function() {
    $.ajax({
        url: "./connect_mysql.php",
        type: "POST",
        data: "queryToExecute=indexArray",
        success: function (result) {
            var tbody = $(tbody);
            for(var i = 0; i < result.length; ++i){
                var tr = $(tr);
                for(var j = 0; j < result[i].length; ++j){
                    var td = $(td);
                    td.html(result[i][j]);
                    tr.append(td);
                }
                tbody.append(tr);
            }
            $("#indexArray").append(tbody);
        },
        error: function (result) {
            alert(result[0]);
        }
    })
    // $("#testFichier").submit(function () {
    //     $.ajax({
    //         url: "./getDataPlane.php",
    //         type: 'GET',
    //         success: function () {
    //             alert("Fichier remplit")
    //         },
    //         error: function () {
    //             alert("Erreur")
    //         }
    //     });
    // });
    // $("#testInsertion").submit(function () {
    //     $.ajax({
    //         url: "./jsonToBDD.php",
    //         type: 'GET',
    //         success: function () {
    //             alert("Insertion réussi")
    //         },
    //         error: function () {
    //             alert("Erreur")
    //         }
    //     })
    // })
    $()
});