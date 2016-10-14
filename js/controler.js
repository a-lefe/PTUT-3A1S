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
                for(var j = 1; j < 5; ++j){
                    var td = $("<td>");
                    if(j == 4){
                        var date = new Date(result[i][j].replace(" ","T"));
                        td.html(date.toLocaleString("fr-FR"));
                    }
                    else
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
    getDBInfo("numberFlyByAirline", false, ["Nombre de vol"], "logarithmic");

    //Selection des statistiques à afficher
    $("#submit").click(function () {
        var selectItem = $("#dataset").attr("data-val");
        $("#myChart").fadeOut();
        setTimeout(function(){
            $("#myChart").remove();
            var newCanvas = $("<canvas>");
            newCanvas.attr("id","myChart");
            newCanvas.attr("height","200");
            newCanvas.attr("style","display: none");
            $("#canvasDiv").append(newCanvas);
            switch(selectItem){
                case "NbrVol":
                    getDBInfo("numberFlyByAirline", false, ["Nombre de vol"], "logarithmic");
                    break;
                case "PercentVol":
                    getDBInfo("percentOfTotalFly", true, ["Pourcentage des vols"], "logarithmic");
                    break;
                case "NbrPlaneVol":
                    getDBInfo("numberFlyByPlane", true, ["Nombre de vol"], "logarithmic");
                    break;
                case "CompanyPerPlane":
                    var planeSelected = $("#plane").attr("data-val");
                    getDBInfo("companyPerPlane", false, ["Utilisation de l'avion " + planeSelected],
                        "linear", "&plane=" + planeSelected);
                    break;
                case "PlanePerCompany":
                    var companySelected = $("#company").attr("data-val");
                    getDBInfo("planePerCompany", false, ["Utilisation des avions par " + companySelected],
                        "linear", "&company=" + companySelected);
                    break;
                case "CancelFly":
                    getDBInfo("cancelFly", false, ["Vol annulé", "Vol total"], "logarithmic");
                    break;
                case "TerminalUse":
                    getDBInfo("terminalUse", false, ["Utilisation des terminaux"], "linear");
                    break;
                case "ContryDeserv":
                    getDBInfo("contryDeserv", false, ["Nombre de vols dans ce type"], "linear");
                    break;
                case "FlyDestination":
                    getDBInfo("flyDestination", false, ["Nombre de vol ayant desservi cette destination"], "logarithmic");
                    break;
                default:
                    return;
            }
        },500);
    });

    //Affichage d'un input si une deuxième entrée est attendue
    $("#dataset").change(function () {
        var selectItem = $("#dataset").attr("data-val");
        var selectPlane = $("#selectPlane");
        var selectCompany = $("#selectCompany");
        selectPlane.hide();
        selectCompany.hide();
        if(selectItem == "CompanyPerPlane")
            selectPlane.show();
        else if (selectItem == "PlanePerCompany")
            selectCompany.show();

    })
});

//Initialiser les list avec les données récupérer en base
function initHiddenInput() {
    var mode = [["getPlane", "planeUl"], ["getCompany", "companyUl"]];
    $.ajax({
        url: "./model.php",
        type: "POST",
        data: "queryToExecute=" + mode[0][0],
        success: function (result) {
            var ul = $("#"+ mode[0][1]);
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
    $.ajax({
        url: "./model.php",
        type: "POST",
        data: "queryToExecute=" + mode[1][0],
        success: function (result) {
            var ul = $("#"+ mode[1][1]);
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

//Fonction executant les appels ajax
function getDBInfo(queryToExecute, isPercent, graphLabel, yType, otherInput){
    $.ajax({
        url: "./model.php",
        type: "POST",
        data: "queryToExecute=" + queryToExecute + (otherInput != undefined?otherInput:""),
        success: function (result) {
            var datasets = [];
            var labels = [];
            //Tableau du premier jeu de données
            var dataOne = [];
            //Tableau du second jeu de données
            var dataTwo = [];
            var backgroundColor = [];
            var borderColor = [];
            //Valeur maximal calculé automatiquement ou mise à 100 si pourcentage)
            var max = (isPercent?100:0);
            //Permet de savoir combien de jeu de données on reçoit
            var resultLength = (result[0][2] == undefined?2:3);

            for(var i = 0; i < result.length; ++i){
                //Label de la donnée
                labels.push(result[i][0]);

                //Valeur de la donnée
                dataOne.push(result[i][1]);

                //Si deux valeur, valeur de la deuxième donnée
                if(resultLength > 2) dataTwo.push(result[i][2]);
                if(!isPercent && parseInt(result[i][1]) > max) max = parseInt(result[i][1]);
                if(!isPercent && resultLength > 2 && parseInt(result[i][2]) > max) max = parseInt(result[i][2]);
                //Couleurs des graphs
                var color = 'rgba(' + Math.floor((Math.random() * 223)) + ',' + Math.floor((Math.random() * 223))
                    + ',' + Math.floor((Math.random() * 223));
                backgroundColor.push(color + ',0.2)');
                borderColor.push(color + ', 1)');
            }
            //Rajoute un step, juste du visuel (le plus grand bâton ne touche pas le bord du graph
            if(!isPercent) max += max/10;
            datasets.push({label : graphLabel[0], data: dataOne, backgroundColor: backgroundColor,
                borderColor: borderColor, borderWidth: 1});
            if(resultLength > 2)
                datasets.push({label : graphLabel[1], data: dataTwo, backgroundColor: backgroundColor,
                    borderColor: borderColor, borderWidth: 1});
            createGraph(labels, datasets, yType, max, max/10);
        }
    });
}

//Fonction qui créer un graph et l'affiche
function createGraph(labels, datasets, yType, max, stepSize){
    var ctx = $("#myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
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
        case "PlanePerCompany":
            p.html("Avion(s) utilisé(s) par une companie");
            break;
        case "CancelFly":
            p.html("Nombre de vol(s) annulé(s) par les companies");
            break;
        case "TerminalUse":
            p.html("Nombre de vol partant des différents terminaux de l'aéroport");
            break;
        case "ContryDeserv":
            p.html("Nombre de vol desservant les différents type de pays");
            break;
        case "FlyDestination":
            p.html("Destination des vols partant de l'aéroport de Lyon");
            break;
        default:
            p.html("Cas non implémenté");
            break;
    }
}