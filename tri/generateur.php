<?php
$pdo = require_once('../model/connect_mysql.php');
$nbLignes = 60000;
$nbColonnes = 4;
for ($i=0;$i<$nbLignes;$i++){
	$gid = rand(0,999999999);
	$depart = generateRandomString(15);
	$arrivee = generateRandomString(15);
	$date = mt_rand(1000, date("Y"))."-".mt_rand(1, 12)."-".mt_rand(1, 28);
	$req = "INSERT INTO test_tri VALUES ('$gid', '$depart', '$arrivee', '$date')";
	$res = $pdo->exec($req);
}

function generateRandomString($length = 10) {
    $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
?>