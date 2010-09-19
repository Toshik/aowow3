<?php

interface ICacheable
{
	function GetCacheHash($id);
	static function GetCacheLifeTime();
	function __create($id);
	function __wakeup();
	function __sleep();
}

interface ICacheable_Database extends ICacheable
{
	static function GetCacheTablePostfix();
}

interface ICacheable_File extends ICacheable
{
	static function GetCacheFileName();
	static function GetCacheFolder();
}

interface ICacheable_FileOutput extends ICacheable_File
{
	function GetOutput();
}

class Cache
{
	static $loaded_objects = array();
	static $total_objects = 0;

	static function Get($objectName, $id = false)
	{
		$data = self::GetCacheData($objectName, $id);

		if ($data)
			return $data->object;

		// create a new object
		$obj = new $objectName;

		// TODO: remove if
		if (is_callable(array($obj, '__create'), true))
			$obj->__create($id);

		self::Set($obj, $objectName, id);

		return $obj;
	}
	static function GetCacheData($objectName, $id = false)
	{
		if (!implements_interface($objectName, 'ICacheable'))
			return null;

		$cache_data = null;

		if (isset(self::$loaded_objects[$objectName]) && isset(self::$loaded_objects[$objectName][$id]))
			return self::$loaded_objects[$objectName][$id];
		
		$lifetime = $objectName::GetCacheLifeTime();
		$hash = $objectName::GetCacheHash($id);

		if (implements_interface($objectName, 'ICacheable_Database'))
		{
			$postfix = $objectName::GetCacheTablePostfix();

			$cache_row = DB::World()->SelectRow('
					SELECT version, created, serialization
					FROM ?_cache_'.$postfix.'
					WHERE hash = ?
				',
				$hash
			);

			if (!$cache_row)
				return null;

			if ($cache_row['created'] + $lifetime < time() || $cache_row['version'] != VERSION)
			{
				self::i_drop_db($postfix, $hash);
				return null;
			}

			$cache_data = new CachedObject(
				$cache_row['version'],
				unserialize($cache_row['serialization']),
				$cache_row['created']
			);
		}
		else if (implements_interface($objectName, 'ICacheable_File'))
		{
			$isOutput = implements_interface($objectName, 'ICacheable_FileOutput');

			$filename = $objectName::GetCacheFileName();
			$folder = $objectName::GetCacheFolder();

			if (!file_exists($filename = './cache/'.$folder.'/'.$filename.'-'.$hash.'.awc'))
				return null;

			$cache_data = unserialize(file_get_contents($filename));

			if ($cache_data->timestamp + $lifetime < time()
				|| $cache_data->version != VERSION)
			{
				self::i_drop_file($filename);
				$cache_data = null;
				return null;
			}

			if ($isOutput)
				exit($cache_data->object);
		}
		
		if (!isset(self::$loaded_objects[$objectName]))
			self::$loaded_objects[$objectName] = array();

		self::$loaded_objects[$objectName][$id] = $cache_data;
		++self::$total_objects;

		return $cache_data;
	}

	static function GetCurrent($id = false)
	{
		$trace = debug_backtrace();
		$name = $trace[1]['class'];

		return self::Get($name, $id);
	}

	static function Set($obj, $name, $id = false)
	{
		if (!implements_interface($name, 'ICacheable'))
			return;

		$hash = $name::GetCacheHash($id);

		if (implements_interface($name, 'ICacheable_Database'))
		{
			$postfix = $name::GetCacheTablePostfix();

			DB::World()->Query('
					REPLACE INTO ?_cache_'.$postfix.' (hash, version, created, serialization)
					VALUES (?, ?, ?, ?)
				',
				$hash, VERSION, time(), serialize($obj)
			);
		}
		else if (implements_interface($name, 'ICacheable_File'))
		{
			$filename = $name::GetCacheFileName();
			$folder = $name::GetCacheFolder();

			if (!file_exists($dir = './cache/'.$folder))
				mkdir($dir);

			if (file_exists($filename = $dir.'/'.$filename.'-'.$hash.'.awc'))
				unlink($filename);

			if (implements_interface($name, 'ICacheable_FileOutput'))
				$obj = $obj->GetOutput();

			file_put_contents($filename, serialize(new CachedObject(VERSION, $obj, time())));
		}
	}

	static function Update($obj, $name, $id = false)
	{
		if (!implements_interface($name, 'ICacheable'))
			return false;

		$hash = $name::GetCacheHash($id);

		if (implements_interface($name, 'ICacheable_Database'))
		{
			$postfix = $name::GetCacheTablePostfix();

			$version = DB::World()->SelectCell('SELECT version FROM ?_cache_'.$postfix.' WHERE hash = ?', $hash);
			if (!$version || $version != VERSION)
			{
				DB::World()->Query('
						REPLACE INTO ?_cache_'.$postfix.' (hash, version, created, serialization)
						VALUES (?, ?, ?, ?)
					',
					$hash, VERSION, time(), serialize($obj)
				);
			}
			else
			{
				DB::World()->Query('
						UPDATE ?_cache_'.$postfix.'
						SET serialization = ?
						WHERE hash = ?
					',
					serialize($obj),
					$hash
				);
			}
		}
		else if (implements_interface($name, 'ICacheable_File'))
		{
			$filename = $name::GetCacheFileName();
			$folder = $name::GetCacheFolder();

			if (file_exists($filename = './cache/'.$folder.'/'.$filename.'-'.$hash.'.awc'))
			{
				$cache_data = unserialize(file_get_contents($filename));
				$cache_data->object = $obj;
			}
			else
				$cache_data = new CachedObject(VERSION, $obj, time());

			file_put_contents($filename, serialize($cache_data));
		}
	}

	static function SetCurrent($id = false)
	{
		$trace = debug_backtrace();
		$name = $trace[1]['class'];
		$obj = $trace[1]['object'];

		self::Set($obj, $name, $id);
	}

	private static function i_drop_file($filename)
	{
		unlink($filename);
	}

	private static function i_drop_db($postfix, $hash)
	{
		DB::World()->Query('DELETE FROM ?_cache_'.$postfix.' WHERE hash = ?', $hash);
	}

	// 6 bits for type - max 63
	// 25 bits for id - max 33,554,431
	static function CreateHash($type, $id = false)
	{
		if ($id === false)
		{
			$id = $type;
			$type = 0;
		}

		return ($type << 25) | ($id & 0x1FFFFFF);
	}
}

class CachedObject
{
	var $version;
	var $object;
	var $timestamp;

	function __construct($version, $object, $timestamp)
	{
		$this->version = $version;
		$this->object = $object;
		$this->timestamp = $timestamp;
	}
}

?>