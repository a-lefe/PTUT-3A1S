<?php

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$obj = new stdClass();

$databases = array(
                'host'      => 'localhost',
                'database'  => 'plane_info',
                'login'     => 'root',
                'password'  => '',
            );

$pdo = new PDO('mysql:host='.$databases['host'].';dbname='.$databases['database'].'; charset=utf8', $databases['login'], $databases['password']);

$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

$info1 = $_POST["info1"];
$info2 = $_POST["info2"];
/*Mettre un switch suivant les stats choisis, exemple : */
$sql = $pdo->prepare("SELECT * FROM planeInfo WHERE info1= ? AND info2 = ?");
$sql->execute(array($info1, $info2));
$result = $sql->fetch();

if(!is_array($result))
    $result = array("message" => "Une erreur est survenue lors de la connection...", "success" => false);/*Erreur de récupération*/
echo json_encode($result);