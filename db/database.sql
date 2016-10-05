create database if not exists planeInfo character set utf8 collate utf8_unicode_ci;
use planeInfo;

grant all privileges on planeInfo.* to 'planeInfoAdmin'@'localhost' identified by 'ptut';