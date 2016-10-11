<?php
$databases = array(
                'host'      => 'mysql-polytech3a.alwaysdata.net',
                'database'  => 'polytech3a_planeinfo',
                'login'     => '128339',
                'password'  => 'polytech3a',
            );
$pdo = new PDO('mysql:host='.$databases['host'].';dbname='.$databases['database'].'; charset=utf8', $databases['login'], $databases['password']);
return $pdo;
?>