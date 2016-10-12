<?php

require __DIR__ . '/../vendor/autoload.php';

date_default_timezone_set('Europe/Berlin');

$apiGet = new MobiliteitClient();

// If Ajax request.
if (isset($_GET['xhr']))
{
	header('Content-Type: application/json');
	die($apiGet->getXhrResponse());
}

$device = new Mobile_Detect;
$i18n   = new i18n(realpath(__DIR__ . '/../lang/') . '/lang_{LANGUAGE}.json', realpath(__DIR__ . '/../cache/'), 'en');

// Set language cookie when language change triggered.
if (isset($_GET['lang']))
{
	setcookie('lang', $_GET['lang']);
}

// Set language based on cookie existance.
if (isset($_GET['lang']))
{
	$language = $_GET['lang'];
}
elseif (isset($_COOKIE['lang']))
{
	$language = $_COOKIE['lang'];
}
else
{
	$language = 'en';
}

$i18n->setForcedLang($language);
$i18n->init();

// Add json file content as a template parameter.
$langFilePath        = str_replace('{LANGUAGE}', $i18n->getAppliedLang(), realpath(__DIR__ . '/../lang/') . '/lang_{LANGUAGE}.json');
$config              = json_decode(file_get_contents($langFilePath), true);
$languageFileContent = json_encode($config, JSON_UNESCAPED_UNICODE);

function isProd()
{
	return strpos($_SERVER['HTTP_HOST'], 'dev.') !== 0;
}

$layout = new DefaultLayout(new MainTemplate(), $i18n, $apiGet);
$layout->render($languageFileContent);