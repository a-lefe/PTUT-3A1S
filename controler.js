/**
 * Created by Epulapp on 05/10/2016.
 */
var mode;
var iterateur;
$(document).ready(function() {
    $.ajax({
        url: "./model.php",
        type: "POST",
        data: "queryToExecute=indexArray",
        success: function (result) {
            for(var i = 0; i < result.length; ++i){
                var tr = $("<tr>");
                for(var j = 1; j < 5; ++j){
                    var td = $("<td>");
                    td.html(result[i][j]);
                    tr.append(td);
                }
                tr.click(function(){
                    $("body").append("<div class=\"dialog\" title=\"Informations supplémentaires\">");
                    $(".dialog").dialog({
                        width : 400,
                        close : function(){$(".dialog").remove()}
                    });
                    $(".dialog").dialog("open");
                });
                $(".tableData").append(tr);
            }
            
        },
        error: function (result) {
            alert(result[0]);
        }
    });

    initHiddenInput();
    numberFlyByAirline();

    //Selection des statistiques à afficher
    $("#submit").click(function () {
        var selectItem = $("#dataset").attr("data-val");
        $("#myChart").fadeOut();
        $("#myChart").remove();
        var newCanvas = $("<canvas>");
        newCanvas.attr("id","myChart");
        newCanvas.attr("height","200");
        $("#canvasDiv").append(newCanvas);
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
            case "CompanyPerPlane":
                companyPerPlane();
                break;
            case "PlanePerCompany":
                planePerCompany();
                break;
            default:
                return;
        }
    })

    //Ajout d'un input si une deuxième entrée est attendue
    $("#dataset").change(function () {
        var selectItem = $("#dataset").attr("data-val");
        $("#jsDiv").remove();
        if(selectItem == "CompanyPerPlane" || selectItem == "PlanePerCompany"){

        }
    })
});

function initHiddenInput() {
    mode = [["getPlane", "planeUl"], ["getCompany", "companyUl"]];
    for(iterateur = 0; iterateur < mode.length; ++iterateur) {
        $.ajax({
            url: "./model.php",
            type: "POST",
            data: "queryToExecute=" + mode[iterateur][0],
            success: function (result) {
                var ul = $("#"+ mode[iterateur][1]);
                for (var j = 0; j < result.length; ++j) {
                    var li = $("<li>");
                    li.attr("class", "mdl-menu__item");
                    li.attr("data-val", result[j][0]);
                    //li.attr("onclick", "changeInputValue('" + result[j][0] + "')");
                    li.html(result[j][0]);
                    ul.append(li);
                }
            }
        });
    }
}
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

function companyPerPlane() {
    var planeSelected = $("#jsInput").attr("data-val");
    $.ajax({
        url: "./model.php",
        type: "POST",
        data: "queryToExecute=companyPerPlane&plane=" + planeSelected,
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
            createGraph(labels, "Utilisation de l'avion " + planeSelected, data, backgroundColor, borderColor,
                "linear", max + (max/10), max/10);
        }
    });
}

function planePerCompany() {
    var companySelected = $("#jsInput").attr("data-val");
    $.ajax({
        url: "./model.php",
        type: "POST",
        data: "queryToExecute=planePerCompany&company=" + companySelected,
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
            createGraph(labels, "Utilisation des avions par " + companySelected, data, backgroundColor, borderColor,
                "linear", max + (max/10), max/10);
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

//Changer la légende pour expliquer les différents graphiques implémentés
function changeInfo(selectedLi) {
    var p = $("#pInfo")
    switch(selectedLi){
        case "NbrVol":
            p.html("Nombre de départ de l'aéroport pour chaque companie");
            break;
        case "PercentVol":
            p.html("Pourcentage de tous les départs de l'aéroport par compagnie");
            break;
        case "NbrPlaneVol":
            p.html("Nombre de départ de l'aéroport par avion");
            break;
        case "CompanyPerPlane":
            p.html("Utilisation d'un avion suivant les différentes companies");
            break;
        default:
            p.html("Cas non implémenté");
            break;
    }
}

function changeInputValue(liName) {
    $("#jsInput").html(liName);
    $("#jsInput").attr("data-val",liName);
}