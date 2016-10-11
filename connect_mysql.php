<?php
$databases = array(
                'host'      => 'mysql-polytech3a.alwaysdata.net',
                'database'  => 'polytech3a_planeinfo',
                'login'     => '128339',
                'password'  => 'polytech3a',
            );
$queryToExecute = POST['queryToExecute'];
$result = null;
$pdo = new PDO('mysql:host='.$databases['host'].';dbname='.$databases['database'].'; charset=utf8', $databases['login'], $databases['password']);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
switch($queryToExecute){
    case "indexArray":
        $sql = $pdo->prepare("SELECT flightnumbers_tripnumber, airports_destination_name, airlines_airline_name, timestamps_sobt FROM plane");
        $sql->execute();
        $result = $sql->fetch();
        break;
}
if(!is_array($result))
    $result = array("message" => "Une erreur est survenue lors de la connection à la base...", "success" => false);

echo json_encode($result);