<?php

class StaticHelper
{
	/**
	 * Retuns with the versioned path&filename in the dist directory
	 *
	 * @param string $filename
	 *
	 * @return string
	 */
	public static function getUrl($filename)
	{
		$lastDotPos = strripos($filename, '.');
		$name       = substr($filename, 0, $lastDotPos);
		$ext        = substr($filename, $lastDotPos);

		if (APPLICATION_ENV == 'dev')
		{
			$glob = STATIC_PATH . '/' . $name . $ext;
		}
		else
		{
			$glob = STATIC_PATH . '/' . $name . '-*' . $ext;
		}

		$files = glob($glob);

		if (!empty($files))
		{
			return str_replace(DOCUMENT_ROOT, '', current($files));
		}

		return '';
	}
}