/**
 * Created by Epulapp on 05/10/2016.
 */
$(document).ready(function() {
    $.ajax({
        url: "./model.php",
        type: "POST",
        data: "queryToExecute=indexArray",
        success: function (result) {
            for(var i = 0; i < result.length; ++i){
                var tr = $("<tr>");
                for(var j = 0; j < 4; ++j){
                    var td = $("<td>");
                    td.html(result[i][j]);
                    tr.append(td);
                }
                $(".tableData").append(tr);
            }
            
        },
        error: function (result) {
            alert(result[0]);
        }
    });
    $.ajax({
        url: "./model.php",
        type: "POST",
        data: "queryToExecute=numberFlyByAirline",
        success: function (result) {
            var labels = [];
            var data = [];
            var backgroundColor = [];
            var borderColor = [];
            var max = 0;
            for(var i = 0; i < result.length; ++i){
                labels.push(result[i][0]);
                data.push(result[i][1]);
                if(parseInt(result[i][1]) > max) max = parseInt(result[i][1]);
                var color = 'rgba(' + Math.floor((Math.random() * 255)) + ',' + Math.floor((Math.random() * 255))
                    + ',' + Math.floor((Math.random() * 255));
                backgroundColor.push(color + ',0.2)');
                borderColor.push(color + ', 1)');
            }
            var ctx = $("#myChart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets:[{
                        label: "Nombre de vol",
                        data: data,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true,
                                max: max+1,
                                stepSize: (max/10)
                            }
                        }],
                        xAxes: [{
                            stacked: true
                        }]
                    }
                }
            });
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
});