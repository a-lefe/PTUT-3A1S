<?php

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$obj = new stdClass();

$databases = array(
                'host'      => 'host',
                'database'  => 'db',
                'login'     => 'login',
                'password'  => 'password',
            );

$pdo = new PDO('mysql:host='.$databases['host'].';dbname='.$databases['database'].'; charset=utf8', $databases['login'], $databases['password']);

$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

/*Mettre un switch suivant les stats choisis, exemple : */
$sql = $pdo->prepare("SELECT * FROM user WHERE mail= ? AND mdp = ?");
$sql->execute(array($mail, $pass));
$result = $sql->fetch();

if(!is_array($result))
    $result = array("message" => "Une erreur est survenue lors de la connection...", "success" => false);/*Erreur de récupération*/
echo json_encode($result);