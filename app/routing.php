<?php

use Slim\Http\Request;
use Slim\Http\Response;

$app->get(
	'/',
	function (Request $request, Response $response)
	{
		if (!empty($request->getQueryParam('locale')))
		{
			$locale = $request->getQueryParam('locale');

			// Set language cookie when language change triggered.
			setcookie('locale', $locale);
		}
		elseif (!empty($request->getCookieParam('locale')))
		{
			$locale = $request->getCookieParam('locale');
		}
		else
		{
			$locale = 'en_GB';
		}

		return $this->view->render(
			$response,
			'index.twig',
			array(
				'locale' => $locale,
				'config' => array(
					'next'  => $this->client->getNextToSeconds(),
					'after' => $this->client->getAfterToSeconds(),
					'HOST'  => 'http://' . $_SERVER['HTTP_HOST']
				),
			)
		);
	}
);

$app->get(
	'/refresh',
	function (Request $request, Response $response)
	{

		return $response
			->withHeader('Content-type', 'application/json')
			->getBody()
			->write($this->client->getXhrResponse());
	}
);
