<?php

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$obj = new stdClass();

$databases = array(
                'host'      => 'localhost',
                'database'  => 'planInfo',
                'login'     => 'root',
                'password'  => '',
            );

$pdo = new PDO('mysql:host='.$databases['host'].';dbname='.$databases['database'].'; charset=utf8', $databases['login'], $databases['password']);

$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
echo true;