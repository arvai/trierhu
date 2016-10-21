<?php

use Slim\Http\Request;
use Slim\Views\Twig;
use Slim\Views\TwigExtension;
use Symfony\Bridge\Twig\Extension\TranslationExtension;
use Symfony\Component\Translation\Loader\PhpFileLoader;
use Symfony\Component\Translation\MessageSelector;
use Symfony\Component\Translation\Translator;

$container = $app->getContainer();

// Twig configuration.
$container['view'] = function ($container)
{
	$view = new Twig(
		$container['settings']['view.basePath'],
		$container['settings']['view.twigSettings']
	);

	$view->addExtension(new TwigExtension($container['router'], ''));
	$view->addExtension(new TranslationExtension($container['translator']));

	$view->getEnvironment()->addGlobal('isAnalyticsEnabled', $container['settings']['isAnalyticsEnabled']);

	return $view;
};

// API Client configuration.
$container['client'] = function ()
{
	return new MobiliteitClient();
};

// Translator configuration.
$container['translator'] = function ($container)
{
	/** @var Request $request */
	$request = $container['request'];

	if (!empty($request->getQueryParam('locale')))
	{
		$locale = $request->getQueryParam('locale');
	}
	elseif (!empty($request->getCookieParam('locale')))
	{
		$locale = $request->getCookieParam('locale');
	}
	else
	{
		$locale = 'en_GB';
	}

	$translator = new Translator($locale, new MessageSelector());
	$translator->setFallbackLocales(['en_GB']);
	$translator->addLoader('php', new PhpFileLoader());
	$translator->addResource('php', __DIR__ . '/../lang/en_GB.php', 'en_GB');
	$translator->addResource('php', __DIR__ . '/../lang/hu_HU.php', 'hu_HU');
	$translator->addResource('php', __DIR__ . '/../lang/ru_RU.php', 'ru_RU');
	$translator->addResource('php', __DIR__ . '/../lang/hi_HI.php', 'hi_HI');

	return $translator;
};