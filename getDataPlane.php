<?php
$file = file_get_contents('https://alexandre.lefebvre@etu.univ-lyon1.fr:polytech3a@download.data.grandlyon.com/ws/rdata/adl_aeroport_lyon.adlvoloperationneldepart/all.json');
$local_file = fopen('www/all_data.json', 'w+');
fputs($local_file, $file);