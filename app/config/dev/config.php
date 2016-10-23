<?php

return array(
	'displayErrorDetails' => true,

	'isAnalyticsEnabled' => false,

	'view.basePath'     => realpath(__DIR__ . '/../../../view'),
	'view.twigSettings' => array(),

	'path.static.manifest' => realpath(__DIR__ . '/../../../static/build/rev-manifest.json'),
);