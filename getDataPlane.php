<?php
$serv = ftp_connect('https://download.data.grandlyon.com/ws/rdata/adl_aeroport_lyon.adlvoloperationneldepart/') or die("Couldn't connect to server");
ftp_login($serv, 'alexandre.lefebvre@etu.univ-lyon1.fr', 'polytech3a');
$local_file = fopen('all_data.json', 'w+');
$ret = ftp_nb_get($serv, $local_file, 'all.json');
while ($ret == FTP_MOREDATA) {
	$ret = ftp_nb_continue($serv);
}
if ($ret != FTP_FINISHED) {
   echo "Il y a eu un problème lors du téléchargement...";
   exit(1);
}
?>