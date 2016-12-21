<?php

namespace TrierHu\Portal\HttpClient;

class MobiliteitClient
{
	public function __construct()
	{
		$this->debug = isset($_GET['debug']);

		$url = 'http://travelplanner.mobiliteit.lu/restproxy/departureBoard?accessId=cdt';
		$url .= '&id=A=1@O=Kirchberg,%20John-F.-Kennedy@X=6,171580@Y=49,632366@U=82@L=200417017@B=1@p=1475222989';
		$url .= '&direction=A=1@O=Trier,%20Theodor-Heuss-Allee@X=6,646148@Y=49,759402@U=82@L=500000083@B=1@p=1475222989';
		$url .= '&duration=720';
		// Test weekday if debug enabled
		$this->debug && $url .= '&time=12:30&date=2016-10-08';
		$url .= '&format=json';

		if ($this->debug)
		{
			print $url;
		}
		
		$nextBuses = array();
		$rawContent = file_get_contents($url);
		$data       = json_decode($rawContent);
		
		foreach($data->Departure as $departure)
		{
			$bus = strtotime($departure->date . ' ' . $departure->time);
			if($bus >= time()) {
				array_push($nextBuses, $bus);
			}
		}
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
}
