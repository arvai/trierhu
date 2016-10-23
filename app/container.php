<?php

use Slim\Http\Request;
use Slim\Views\Twig;
use Slim\Views\TwigExtension;
use Symfony\Bridge\Twig\Extension\TranslationExtension;
use Symfony\Component\Translation\Loader\PhpFileLoader;
use Symfony\Component\Translation\Translator;
use TrierHu\Portal\HttpClient\MobiliteitClient;
use TrierHu\Portal\NotFoundHandler;

$container = $app->getContainer();

$container['notFoundHandler'] = function ($c)
{
	return new NotFoundHandler(
		function ($request, $response) use ($c)
		{
			return $c['response']->withStatus(404);
		}
	);
};

// Twig configuration.
$container['view'] = function ($container)
{
	$view = new Twig(
		$container['settings']['view.basePath'],
		$container['settings']['view.twigSettings']
	);

	/** @var Translator $translator */
	$translator = $container['translator'];

	$view->addExtension(new TwigExtension($container['router'], ''));
	$view->addExtension(new TranslationExtension($translator));

	$view->getEnvironment()->addFunction($container['view.function.static']);

	$view->getEnvironment()->addGlobal('isAnalyticsEnabled', $container['settings']['isAnalyticsEnabled']);
	$view->getEnvironment()->addGlobal('translations', $translator->getCatalogue()->all('messages'));

	return $view;
};

// Static filter configuration.
$container['view.function.static'] = function ($container)
{
	return new Twig_SimpleFunction(
		'static',
		function ($filename) use ($container)
		{
			$manifestFilePath = $container['settings']['path.static.manifest'];

			if (empty($manifestFilePath) || !file_exists($manifestFilePath))
			{
				return '/dist/' . $filename;
			}

			$fileContent = file_get_contents($manifestFilePath);
			if (!$fileContent)
			{
				return '/dist/' . $filename;
			}

			$assets = json_decode($fileContent, true);

			if (!isset($assets[$filename]))
			{
				return '/dist/' . $filename;
			}

			return '/dist/' . $assets[$filename];
		}
	);
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

	$translator = new Translator($locale);
	$translator->setFallbackLocales(['en_GB']);
	$translator->addLoader('php', new PhpFileLoader());
	$translator->addResource('php', __DIR__ . '/../lang/en_GB.php', 'en_GB');
	$translator->addResource('php', __DIR__ . '/../lang/hu_HU.php', 'hu_HU');
	$translator->addResource('php', __DIR__ . '/../lang/ru_RU.php', 'ru_RU');
	$translator->addResource('php', __DIR__ . '/../lang/hi_HI.php', 'hi_HI');

	return $translator;
};

// API Client configuration.
$container['client'] = function ()
{
	return new MobiliteitClient();
};