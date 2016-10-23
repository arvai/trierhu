<?php

return array(
	'displayErrorDetails' => false,

	'isAnalyticsEnabled' => true,

	'view.basePath'     => realpath(__DIR__ . '/../../../view'),
	'view.twigSettings' => array(
		'cache' => realpath(__DIR__ . '/../../../cache')
	),

	'path.static.manifest' => realpath(__DIR__ . '/../../../static/build/rev-manifest.json'),
);