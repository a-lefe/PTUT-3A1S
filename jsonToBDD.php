<?php
$jsondata = file_get_contents('all_data.json');
$data = json_decode($jsondata, true);
var_dump($data);
print 'test';
?>