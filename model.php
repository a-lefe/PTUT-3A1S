<?php

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$pdo = require_once('connect_mysql.php');
/*$pdo = require_once('connect_localhost.php');*/
$queryToExecute = $_POST['queryToExecute'];
$result = null;

switch($queryToExecute){
    case "indexArray":
        $sql = $pdo->prepare("SELECT flightnumbers_tripnumber, airports_destination_name, airlines_airline_name, timestamps_sobt FROM plane ORDER BY timestamps_sobt DESC");
        $sql->execute();
        $result = $sql->fetchAll();
        break;
    case "numberFlyByAirline":
        $sql = $pdo->prepare("SELECT airlines_airline_name, COUNT( * ) FROM plane GROUP BY airlines_airline_name");
        $sql->execute();
        $result = $sql->fetchAll();
        break;
}
if(!is_array($result))
    $result = array("message" => "Une erreur est survenue lors de la connection à la base...", "success" => false);

echo json_encode($result);