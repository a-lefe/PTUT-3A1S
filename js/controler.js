/**
 * Created by Epulapp on 05/10/2016.
 */
var selectedMode = "NbrVol";
$(document).ready(function() {
    $.ajax({
        url: "./model.php",
        type: "POST",
        data: "queryToExecute=indexArray",
        success: function (result) {
            for(var i = 0; i < result.length; ++i){
                var gid = result[i][0];
                var tr = $("<tr value=\""+gid+"\">");
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
                    if($(".dialog").length){
                        $(".dialog").remove();
                    }
                    $("body").append("<div class=\"dialog\" title=\"Informations supplémentaires\">");
                    $(".dialog").dialog({
                        width : 'auto',
                        height : 'auto',
                        close : function(){$(".dialog").remove()}
                    });
                    $.ajax({
                        url: "./model.php",
                        type: "POST",
                        data: {'queryToExecute' : 'flyDetails', 'gid' : $(this).attr('value')},
                        success: function(result){
                            var trBis = $("<tr>");
                            for(var j = 0; j < 5; ++j){
                                var td = $("<td>");
                                console.log(result[j]);
                                if(j == 3){
                                    console.log(result[j]);
                                    var date = new Date(result[j].replace(" ","T"));
                                    td.html(date.toLocaleString("fr-FR"));
                                }
                                else
                                    td.html(result[j]);
                                trBis.append(td);
                            }
                            $(".dialog").append("<table class=\"mdl-data-table mdl-js-data-table mdl-data-table mdl-shadow--2dp\">"+
                                                    "<thead>"+
                                                        "<tr>"+
                                                            "<th class=\"mdl-data-table__cell--non-numeric\">Référence</th>"+
                                                            "<th>Destination</th>"+
                                                            "<th>Compagnie</th>"+
                                                            "<th>Heure de départ</th>"+
                                                            "<th>Terminal</th>"+
                                                        "</tr>"+
                                                    "</thead>"+
                                                    "<tbody class=\"tableDataZoom\">"+
                                                    "</tbody>"+
                                                "</table>");
                            $('.tableDataZoom').append(trBis);
                            $(".dialog").dialog("open");
                        }
                    });    
                });
                $(".tableData").append(tr);
            }  
        },
        error: function (result) {
            alert(result[0]);//To change
        }
    });
    $.ajax({
        type: "POST",
        url: "./model.php",
        data: "queryToExecute=allFly",
        success: function (result) {
            var tableBody = $("<tbody>");
            for(var i = 0; i < result.length; ++i){
                var tr = $("<tr>");
                for(var j = 0; j < 4; ++j){
                    var td = $("<td>");
                    if(j == 3){
                        var date = new Date(result[i][3].replace(" ","T"));
                        td.html(date.toLocaleString("fr-FR"));
                    }
                    else
                        td.html(result[i][j]);
                    tr.append(td);
                }
                tableBody.append(tr);
            }
            $("#flyTable").append(tableBody);
            $("#flyTable").DataTable();
        },
        error : function (result) {
            $("#flyTable").DataTable();
        }
    });
    // $("#flyTable").DataTable({
    //
    // });
    initHiddenInput();
    getDBInfo("numberFlyByAirline", false, ["Nombre de vol"], "logarithmic");

    //Initialiser le date picker
    $( "#dateSelected" ).datepicker({
        altField: "#dateSelected",
        closeText: 'Fermer',
        prevText: 'Précédent',
        nextText: 'Suivant',
        currentText: 'Aujourd\'hui',
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre',
            'Novembre', 'Décembre'],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.',
            'Déc.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        weekHeader: 'Sem.',
        dateFormat: 'dd/mm/yy'
    });

});

function initGraph(selectItem, toHide) {
    $("#myChart").fadeOut();

    //Timeout permettant à l'animation de s'effectuer
    setTimeout(function(){
        //Supression de l'ancien canvas pour en recréer un nouveau
        $("#myChart").remove();
        var newCanvas = $("<canvas>");
        newCanvas.attr("id","myChart");
        newCanvas.attr("style","display: none");
        $("#canvasDiv").append(newCanvas);
        var selectedGraph = $("#selectGraph :selected").val();

        if(toHide == undefined) {
            var selectPlane = $("#selectPlane");
            var selectCompany = $("#selectCompany");
            var selectDate = $("#selectDate");
            selectPlane.hide();
            selectCompany.hide();
            selectDate.hide();
            if (selectItem == "CompanyPerPlane")
                selectPlane.fadeIn();
            else if (selectItem == "PlanePerCompany")
                selectCompany.fadeIn();
            else if (selectItem == "DayFly")
                selectDate.fadeIn();
        }

        //Récupérer les bonnes données en base en fonction de celle choisi
        switch(selectItem){
            case "NbrVol":
                getDBInfo("numberFlyByAirline", false, ["Nombre de vol"], "logarithmic");
                break;
            case "PercentVol":
                getDBInfo("percentOfTotalFly", true, ["Pourcentage des vols"], "logarithmic");
                break;
            case "NbrPlaneVol":
                getDBInfo("numberFlyByPlane", false, ["Nombre de vol"], "logarithmic");
                break;
            case "CompanyPerPlane":
                var planeSelected = $("#planeSelected :selected").val();
                getDBInfo("companyPerPlane", false, ["Utilisation de l'avion " + planeSelected],
                    "linear", "&plane=" + planeSelected);
                break;
            case "PlanePerCompany":
                var companySelected = $("#companySelected :selected").val();
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
            case "DayFly":
                var selectedDate = $("#dateSelected").val();
                var splitDate = selectedDate.split("/");
                var date = new Date(parseInt(splitDate[2]), parseInt(splitDate[1]), parseInt(splitDate[0]));
                var mm = date.getMonth(); // getMonth() is zero-based
                var dd = date.getDate();
                var dateSelected = [date.getFullYear(), (mm.toString().length == 1?'0' + mm:mm),
                    (dd.toString().length == 1?'0' + dd:dd)].join('-');
                var dateBegin = dateSelected + " 00:00:00";
                var dateEnd = dateSelected + " 23:59:59";
                getDBInfo("dayFly", false, ["Vol du " + date.toLocaleDateString() ] , "logarithmic", "&dateBegin=" + dateBegin
                    + "&dateEnd=" + dateEnd);
                break;
            default:
                return;
        }
    },500);
    selectedMode = selectItem;
}

//Initialiser les list avec les données récupérer en base
function initHiddenInput() {
    var mode = [["getPlane", "planeUl"], ["getCompany", "companyUl"]];

    $.ajax({
        url: "./model.php",
        type: "POST",
        data: "queryToExecute=" + mode[0][0],
        success: function (result) {
            var planeSelector = $("#planeSelected");
            for (var j = 0; j < result.length; ++j) {
                planeSelector.append($('<option>', {
                    text: result[j][0]
                }));
            }
        }
    });
    $.ajax({
        url: "./model.php",
        type: "POST",
        data: "queryToExecute=" + mode[1][0],
        success: function (result) {
            var planeSelector = $("#companySelected");
            for (var j = 0; j < result.length; ++j) {
                planeSelector.append($('<option>', {
                    text: result[j][0]
                }));
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
            if(result.length == 0){
                var c= document.getElementById("myChart");
                var ctx = c.getContext("2d");
                ctx.textAlign="center";
                ctx.font = "20px Roboto";
                ctx.fillText("Aucunes donnée disponible", c.width/2, c.height/2);
                $("#myChart").fadeIn("slow");
                return;
            }
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
        },
        error:function () {
            var c= document.getElementById("myChart");
            var ctx = c.getContext("2d");
            ctx.font = "20px Helvetica";
            ctx.textAlign="center";
            ctx.fillText("Aucunes donnée disponible", c.width, c.height);
            $("#myChart").fadeIn("slow");
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

function changeSelectValue(){
    initGraph(selectedMode, false);
}

function short(){
    var quickTab = [];
    var mergeTab = [];

    $.ajax({
        url: "./model.php",
        type: "POST",
        data: "queryToExecute=sortTest",
        success:function (result) {
            quickTab = result;
            mergeTab = result;
        }
    });

    var beginQuick = new Date();
    quickSort(quickTab, 0, quickTab.length-1);
    var endQuick = new Date();
    var beginMerge = new Date();
    mergeSort(mergeTab)
    var endMerge = new Date();
    $("#quickValue").html(endQuick.getMilliseconds() - beginQuick.getMilliseconds() + " millisecondes");
    $("#mergeValue").html(endMerge.getMilliseconds() - beginMerge.getMilliseconds()+ " millisecondes");
}

function quickSort(array, begin, end) {
    var left = begin-1;
    var right = end+1;

    var pivot = array[begin];

    if (begin >= end) {
        return;
    }

    while(1) {
        do right--; while(array[right] > pivot);
        do left++; while(array[left] < pivot);

        if(left < right) {
            swap(array, left, right);
        }
        else break;
    }

    quickSort(array, begin, right);
    quickSort(array, right+1, end);
}

function swap(array, idx1, idx2) {
    var tmp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = tmp;
}

function mergeSort(arr)
{
    if (arr.length < 2)
        return arr;

    var middle = parseInt(arr.length / 2);
    var left   = arr.slice(0, middle);
    var right  = arr.slice(middle, arr.length);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right)
{
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}
