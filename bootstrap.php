<?php
	require_once './classes/i18n/i18n.class.php';
	$i18n = new i18n('./lang/lang_{LANGUAGE}.json', './langcache/', 'en');

    //setting timezone based on ip (or you can hardcode it: 'Europe/Berlin')
    $ip = $_SERVER['REMOTE_ADDR'];
    $url = 'http://freegeoip.net/json/' . $ip;
    $userData = json_decode(file_get_contents($url));

    date_default_timezone_set($userData->time_zone);

	// Set language cookie when language change triggered
	if( isset($_GET['lang']) ) {
		setcookie('lang', $_GET['lang']);
	}

	// Set language based on cookie existance
	if ( isset($_GET['lang']) ) {
		$language = $_GET['lang'];
	}
	elseif ( isset($_COOKIE['lang']) ) {
		$language = $_COOKIE['lang'];
	}
	else {
		$language = 'en';
	}

	$i18n->setForcedLang($language);
	$i18n->init();

    /**
     * Retuns with the versioned path&filename in the bin directory
     * @TODO: make it fail-safe
     * @param $filename
     */
    function getVersioned($fullFilename) {
        $lastDotPos = strripos($fullFilename, '.');
        $name = substr($fullFilename, 0, $lastDotPos);
        $ext  = substr($fullFilename, $lastDotPos);

        $glob  = isProd() ? "./bin/".$name."-*".$ext : "./bin/" . $name.$ext;

        if (count($glob) > 0) {
            return glob($glob)[0];
        }

        return '';
    }

    function isProd() {
        return strpos($_SERVER['HTTP_HOST'], 'dev.') !== 0;
    }
?>