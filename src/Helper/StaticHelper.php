<?php

class StaticHelper
{
	/**
	 * Retuns with the versioned path&filename in the bin directory
	 *
	 * @TODO make it fail-safe
	 *
	 * @param string $fullFilename
	 *
	 * @return string
	 */
	public static function getUrl($fullFilename)
	{
		$lastDotPos = strripos($fullFilename, '.');
		$name       = substr($fullFilename, 0, $lastDotPos);
		$ext        = substr($fullFilename, $lastDotPos);

		$glob = isProd() ? "./bin/" . $name . "-*" . $ext : "./bin/" . $name . $ext;

		if (count($glob) > 0)
		{
			return glob($glob)[0];
		}

		return '';
	}
}