<?php

require __DIR__ . '/../vendor/autoload.php';

date_default_timezone_set('Europe/Berlin');

// Check host to find out the environment.
$isProduction = strpos($_SERVER['HTTP_HOST'], 'dev.') !== 0
	&& strpos($_SERVER['HTTP_HOST'], 'localhost') !== 0;

define('DOCUMENT_ROOT', realpath(__DIR__ . '/../web'));
define('STATIC_PATH', DOCUMENT_ROOT . '/dist');
define('APPLICATION_ENV', $isProduction ? 'prod' : 'dev');

$apiClient = new MobiliteitClient();

// If Ajax request.
if (isset($_GET['xhr']))
{
	header('Content-Type: application/json');
	die($apiClient->getXhrResponse());
}

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

$i18n = new i18n(realpath(__DIR__ . '/../lang/') . '/lang_{LANGUAGE}.json', realpath(__DIR__ . '/../cache/'), 'en');
$i18n->setForcedLang($language);
$i18n->init();

// Add json file content as a template parameter.
$langFilePath        = str_replace('{LANGUAGE}', $i18n->getAppliedLang(), realpath(__DIR__ . '/../lang/') . '/lang_{LANGUAGE}.json');
$config              = json_decode(file_get_contents($langFilePath), true);
$languageFileContent = json_encode($config, JSON_UNESCAPED_UNICODE);

$config = array(
	'next'  => $apiClient->getNextToSeconds(),
	'after' => $apiClient->getAfterToSeconds(),
	'HOST'  => 'http://' . $_SERVER['HTTP_HOST']
);

$layout = new DefaultLayout(new MainTemplate(), $config);
$layout->render($i18n->getAppliedLang(), $languageFileContent);