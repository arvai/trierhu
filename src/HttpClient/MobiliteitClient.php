<?php

namespace TrierHu\Portal\HttpClient;

use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\RequestOptions;
use RuntimeException;

class MobiliteitClient
{
	const STATION_ID_LUXEXPO   = 'A=1@O=Kirchberg, Gare routière Luxexpo@X=6,174331@Y=49,635737@U=82@L=200417050@B=1@';
	const STATION_ID_TRIER_HFB = 'A=1@O=Trier, Hauptbahnhof@X=6,651577@Y=49,757244@U=82@L=500000079@';

	/** @var Client */
	private $client;

	public function __construct()
	{
		$this->debug  = isset($_GET['debug']);
		$this->client = new Client(
			[
				'base_uri' => 'http://travelplanner.mobiliteit.lu/'
			]
		);

		$this->nextBuses = $this->getProcessedTimeTable();
	}

	/**
	 * Returns the current timestamp or a weekday if debug enabled.
	 *
	 * @return int Timestamp
	 */
	public function getTime()
	{
		return $this->debug ? 1475922644 : time();
	}

	/**
	 * Returns with the seconds of waiting time for the next bus
	 *
	 * @return int
	 */
	public function getNextToSeconds()
	{
		if (count($this->nextBuses) > 0)
		{
			return $this->nextBuses[0] - $this->getTime();
		}

		return -1;
	}

	/**
	 * Returns the waiting time after the next bus until the next-after bus
	 *
	 * @return int
	 */
	public function getAfterToSeconds()
	{
		if (count($this->nextBuses) > 1)
		{
			return $this->nextBuses[1] - $this->getTime() - $this->getNextToSeconds();
		}

		return -1;
	}

	/**
	 * Returns with the next and after-next waiting time in a json encoded object
	 *
	 * @return string
	 */
	public function getXhrResponse()
	{
		$response = [
			'next'  => $this->getNextToSeconds(),
			'after' => $this->getAfterToSeconds()
		];

		return json_encode($response);
	}

	/**
	 * @return array
	 */
	private function getProcessedTimeTable()
	{
		try
		{
			$rawData       = \GuzzleHttp\json_decode($this->getBusTimeTableForStation(), true);
			$timeList      = array_column($rawData['Departure'],'date', 'time');
			$timestampList = [];
			foreach ($timeList as $date => $time)
			{
				$timestampList[] = strtotime($date . ' ' . $time);
			}

			return $timestampList;
		}
		catch (Exception $exception)
		{
			return [];
		}
	}

	/**
	 * @param string $fromStopId
	 * @param string $toStopId
	 * @param int    $inNextHours
	 *
	 * @internal param string $stopId
	 * @return   string
	 *
	 * @throws RuntimeException
	 */
	private function getBusTimeTableForStation(
			$fromStopId = self::STATION_ID_LUXEXPO,
			$toStopId = self::STATION_ID_TRIER_HFB,
			$inNextHours = 2
	) {
		$parameterList = [
			'accessId'  => 'cdt',
			'id'        => $fromStopId,
			'direction' => $toStopId,
			'duration'  => $inNextHours * 60,
			'format'    => 'json'
		];

		return $this->client->get(
			'restproxy/departureBoard',
			[
				RequestOptions::QUERY => $parameterList
			]
		)->getBody()
		->getContents();
	}
}
