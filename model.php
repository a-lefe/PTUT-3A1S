<?php

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');


$pdo = require_once('model/connect_mysql.php');
//$pdo = require_once('model/connect_localhost.php');
$queryToExecute = $_POST['queryToExecute'];
$result = null;

switch($queryToExecute){
    case "indexArray":
        $sql = $pdo->prepare("SELECT gid, flightnumbers_icaoflightnumber, airports_destination_name, airlines_airline_name, timestamps_sobt FROM plane ORDER BY timestamps_sobt DESC LIMIT 0, 100");
        $sql->execute();
        $result = $sql->fetchAll();
        break;
    case "numberFlyByAirline":
        $sql = $pdo->prepare("SELECT airlines_airline_name, COUNT(*) FROM plane GROUP BY airlines_airline_name");
        $sql->execute();
        $result = $sql->fetchAll();
        break;
    case "percentOfTotalFly":
        $sql = $pdo->prepare("SELECT airlines_airline_name, COUNT(*)/(SELECT COUNT(*) FROM plane)*100 FROM plane GROUP BY airlines_airline_name");
        $sql->execute();
        $result = $sql->fetchAll();
        break;
    case "numberFlyByPlane":
        $sql = $pdo->prepare("SELECT aircraft_aircrafttype_icaocode, COUNT(*) FROM plane GROUP BY aircraft_aircrafttype_icaocode");
        $sql->execute();
        $result = $sql->fetchAll();
        break;
    case "getPlane":
        $sql = $pdo->prepare("SELECT aircraft_aircrafttype_icaocode FROM plane GROUP BY aircraft_aircrafttype_icaocode");
        $sql->execute();
        $result = $sql->fetchAll();
        break;
    case "getCompany":
        $sql = $pdo->prepare("SELECT airlines_airline_name FROM plane GROUP BY airlines_airline_name");
        $sql->execute();
        $result = $sql->fetchAll();
        break;
    case "companyPerPlane":
        $plane = $_POST['plane'];
        $sql = $pdo->prepare("SELECT airlines_airline_name, COUNT(*) FROM plane WHERE aircraft_aircrafttype_icaocode = ? GROUP BY airlines_airline_name");
        $sql->execute(array($plane));
        $result = $sql->fetchAll();
        break;
    case "planePerCompany":
        $company = $_POST['company'];
        $sql = $pdo->prepare("SELECT aircraft_aircrafttype_icaocode, COUNT(*) FROM plane WHERE airlines_airline_name = ? GROUP BY aircraft_aircrafttype_icaocode");
        $sql->execute(array($company));
        $result = $sql->fetchAll();
        break;
    case "cancelFly":
        $sql = $pdo->prepare("SELECT airlines_airline_name, ( SELECT COUNT(*) FROM plane WHERE timestamps_cancellationdate <> 'None' and p.airlines_airline_name = airlines_airline_name) as cancelFly, (SELECT COUNT(*) FROM plane WHERE airlines_airline_name = p.airlines_airline_name) as totFly FROM plane p GROUP BY airlines_airline_name");
        $sql->execute();
        $result = $sql->fetchAll();
        break;
    case "terminalUse":
        $sql = $pdo->prepare("SELECT airportresources_terminal, COUNT(*) FROM plane WHERE airportresources_terminal <> 'None' GROUP BY airportresources_terminal");
        $sql->execute();
        $result = $sql->fetchAll();
        break;
    case "contryDeserv":
        $sql = $pdo->prepare("SELECT countrytype_description, COUNT(*) FROM plane GROUP BY countrytype_description");
        $sql->execute();
        $result = $sql->fetchAll();
        break;
    case "flyDestination":
        $sql = $pdo->prepare("SELECT airports_destination_name, COUNT(*) FROM plane GROUP BY airports_destination_name");
        $sql->execute();
        $result = $sql->fetchAll();
        break;
    case "dayFly":
        $dateBegin = $_POST['dateBegin'];
        $dateEnd = $_POST['dateEnd'];
        $sql = $pdo->prepare("SELECT airlines_airline_name, COUNT(*) number from plane where timestamps_sobt BETWEEN ? and ? group by airlines_airline_name");
        $sql->execute(array($dateBegin, $dateEnd));
        $result = $sql->fetchAll();
        break;
    case "flyDetails":
        $gid = $_POST['gid'];
        $sql = $pdo->prepare("SELECT flightnumbers_icaoflightnumber, airports_destination_name, airlines_airline_name, timestamps_sobt, airportresources_terminal FROM plane WHERE gid=".$gid);
        $sql->execute();
        $result = $sql->fetch();
        break;
    default:
        $sql = $pdo->prepare("SELECT gid, flightnumbers_icaoflightnumber, airports_destination_name, airlines_airline_name, timestamps_sobt FROM plane ORDER BY timestamps_sobt DESC");
        $sql->execute();
        $result = $sql->fetchAll();
        break;
}
if(!is_array($result))
    $result = array("message" => "Une erreur est survenue lors de la connection à la base...", "success" => false);

echo json_encode($result);