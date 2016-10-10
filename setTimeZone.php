<?php
//setting timezone based on ip (or you can hardcode it: 'Europe/Berlin')
$ip = $_SERVER['REMOTE_ADDR'];
$url = 'http://freegeoip.net/json/' . $ip;
$userData = json_decode(file_get_contents($url));

date_default_timezone_set($userData->time_zone);