<?php
$databases = array(
                'host'      => 'localhost',
                'database'  => 'plane_info',
                'login'     => 'root',
                'password'  => '',
            );

$pdo = new PDO('mysql:host='.$databases['host'].';dbname='.$databases['database'].'; charset=utf8', $databases['login'], $databases['password']);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
return $pdo;