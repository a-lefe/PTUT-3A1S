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
                $("#indexArrayBody").append(tr);
            }
            
        },
        error: function (result) {
            alert(result[0]);
        }
    });
    numberFlyByAirline();

    //Selection des statistiques à afficher
    $("#submit").click(function () {
        var selectItem = $("#dataset").attr("data-val");
        $("#myChart").fadeOut();
        $("#myChart").remove();
        var newCanvas = $("<canvas>");
        newCanvas.attr("id","myChart");
        newCanvas.attr("height","200");
        //newCanvas.attr("style","visibility: hidden;");
        $("#canvasDiv").append(newCanvas);
        //$("#myChart").clearRect(0, 0, $("#myChart").width, $("#myChart").height);
        switch(selectItem){
            case "NbrVol":
                numberFlyByAirline();
                break;
            case "PercentVol":
                percentOfFlyByAirline();
                break;
            case "NbrPlaneVol":
                numberFlyPerPlane();
                break;
            default:
                return;
        }
    })

    $("#dataset").change(function () {
        var selectItem = $("#dataset").attr("data-val");
        $("#jsDiv").remove();
        if(selectItem == "CompaniePerPlane"){
            $.ajax({
                url: "./model.php",
                type: "POST",
                data: "queryToExecute=getPlane",
                success: function (result) {
                    var div = $("<div>");
                    div.attr("class", "mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select");
                    div.attr("id", "jsDiv");

                    var input = $("<input>");
                    input.attr("class", "mdl-textfield__input");
                    input.attr("id", "jsInput");
                    input.attr("type", "text");
                    input.attr("readonly", "readonly");
                    div.append(input);

                    var label = $("<label>");
                    label.attr("class", "mdl-textfield__label");
                    label.attr("for", "jsInput");
                    label.html("Choix Avion");
                    div.append(label);

                    var ul = $("<ul>");
                    ul.attr("id", "selectPlane");
                    ul.attr("class", "mdl-menu mdl-menu--bottom-left mdl-js-menu");
                    ul.attr("for", "jsInput");

                    for(var i = 0; i < result.length; ++i){
                        var li = $("<li>");
                        li.attr("class", "mdl-menu__item");
                        li.attr("data-val", result[i][0]);
                        li.html(result[i][0]);
                        ul.append(li);
                    }

                    div.append(ul);
                    div.insertAfter("#selectGraph");
                }
            })
        }
    })
});

function numberFlyByAirline() {
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
                var color = 'rgba(' + Math.floor((Math.random() * 223)) + ',' + Math.floor((Math.random() * 223))
                    + ',' + Math.floor((Math.random() * 223));
                backgroundColor.push(color + ',0.2)');
                borderColor.push(color + ', 1)');
            }
            createGraph(labels, "Nombre de vol", data, backgroundColor, borderColor,
                "logarithmic", max + (max/10), max/10);
        }
    });
}

function percentOfFlyByAirline() {
    $.ajax({
        url: "./model.php",
        type: "POST",
        data: "queryToExecute=percentOfTotalFly",
        success: function (result) {
            var labels = [];
            var data = [];
            var backgroundColor = [];
            var borderColor = [];
            for(var i = 0; i < result.length; ++i){
                labels.push(result[i][0]);
                data.push(result[i][1]);
                var color = 'rgba(' + Math.floor((Math.random() * 223)) + ',' + Math.floor((Math.random() * 223))
                    + ',' + Math.floor((Math.random() * 223));
                backgroundColor.push(color + ',0.2)');
                borderColor.push(color + ', 1)');
            }
            createGraph(labels, "Pourcentage des vols", data, backgroundColor, borderColor,
                'logarithmic', 100, 10);
        }
    });
}

function numberFlyPerPlane(){
    $.ajax({
        url: "./model.php",
        type: "POST",
        data : "queryToExecute=numberFlyByPlane",
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
                var color = 'rgba(' + Math.floor((Math.random() * 223)) + ',' + Math.floor((Math.random() * 223))
                    + ',' + Math.floor((Math.random() * 223));
                backgroundColor.push(color + ',0.2)');
                borderColor.push(color + ', 1)');
            }
            createGraph(labels, "Nombre de vol", data, backgroundColor, borderColor,
                "logarithmic", max + (max/10), max/10);
        }
    });
}

function createGraph(labels, label, data, backgroundColor, borderColor, yType, max, stepSize){
    var ctx = $("#myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets:[{
                label: label,
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    type: yType,
                    ticks: {
                        beginAtZero:true,
                        min: 0,
                        max: max,
                        stepSize: stepSize
                    }
                }]
            }
        }
    });
    ctx.fadeIn("slow");
}

function changeInfo(selectedLi) {
    var p = $("#pInfo")
    switch(selectedLi){
        case "NbrVol":
            p.html("Nombre de vol par companie");
            break;
        case "PercentVol":
            p.html("Pourcentage des vols par compagnie");
            break;
        case "NbrPlaneVol":
            p.html("Nombre de vol par avion");
            break;
        default:
            p.html("Cas non implémenté");
            break;
    }
}