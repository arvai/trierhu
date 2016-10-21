<?php

use Slim\App;

require __DIR__ . '/../vendor/autoload.php';

date_default_timezone_set('Europe/Berlin');

if (
	strpos($_SERVER['HTTP_HOST'], 'dev.') !== 0
	&& strpos($_SERVER['HTTP_HOST'], 'localhost') !== 0
) {
	$settings = require __DIR__ . '/config/prod/config.php';
}
else
{
	$settings = require __DIR__ . '/config/dev/config.php';
}

$app = new App(
	[
		'settings' => $settings
	]
);

unset($settings);

require __DIR__ . '/container.php';
require __DIR__ . '/routing.php';

$app->run();
