<?php

enum(array( // Database Cache
	// aowow_cache_texts
	'CACHE_TEXTS'				=> 0,
	'CACHE_TEXTS_MARKUPTEXT'	=> 0,
	'CACHE_TEXTS_MARKUPARTICLE'	=> 1,
	'CACHE_TEXTS_TEXTSET'		=> 2,

	// aowow_cache_admin
	'CACHE_ADMIN'							=> 1,
	'CACHE_ADMIN_PAGEBANNED'				=> 0,
	'CACHE_ADMIN_STATS_BATTLEFIELDS'		=> 1,
	'CACHE_ADMIN_STATS_CHATS'				=> 2,
	'CACHE_ADMIN_STATS_POPULATION'			=> 3,
	'CACHE_ADMIN_STATS_OVERVIEW'			=> 4,
	'CACHE_ADMIN_STATS_WORLD_OVERVIEW' 		=> 5,
	'CACHE_ADMIN_STATS_POPULATION_TIMELINE'	=> 6,
));

enum(array( // File Cache
	// cache/pages
	'FILECACHE_PAGES'		=> 0,
	'FILECACHE_PAGES_MAIN'	=> 1,

	// cache/data
	'FILECACHE_DATA'			=> 1,
	'FILECACHE_DATA_SCALESTATS'	=> 0,
	//'FILECACHE_DATA_'			=> 1,
));

interface ICacheable
{
	static function GetCacheLifeTime();
	static function GetCacheType();
	function GetCacheId();

	function __create($id);
	function __wakeup();
	function __sleep();
}

interface ICacheable_Database extends ICacheable
{
	static function GetCacheTable();
}

interface ICacheable_File extends ICacheable
{
	static function GetCacheFolder();
}

interface ICacheable_FileOutput extends ICacheable_File
{
	function GetOutput();
}

class Cache
{
	static $cache_tables = array(
		CACHE_TEXTS		=> 'texts',
		CACHE_ADMIN		=> 'admin',
	);
	static $cache_folders = array(
		FILECACHE_PAGES		=> 'pages',
		FILECACHE_DATA		=> 'data',
	);
	static $loaded_objects = array();
	static $total_objects = 0;

	static function Get($objectName, $id = 0)
	{
		$data = self::GetCacheData($objectName, $id);

		if ($data)
			return $data->object;

		// create a new object
		$obj = new $objectName;

		// TODO: remove if
		if (is_callable(array($obj, '__create'), true))
			$obj->__create($id);

		self::Set($obj, $objectName, $id);

		return $obj;
	}
	static function GetCacheData($objectName, $id = 0)
	{
		if (!implements_interface($objectName, 'ICacheable'))
			return null;

		$cache_data = null;

		if (isset(self::$loaded_objects[$objectName]) && isset(self::$loaded_objects[$objectName][$id]))
			return self::$loaded_objects[$objectName][$id];
		
		$lifetime = call_user_func(array($objectName, 'GetCacheLifeTime'));
		$hash = self::CreateHash(call_user_func(array($objectName, 'GetCacheType')), $id);

		if (implements_interface($objectName, 'ICacheable_Database'))
		{
			$postfix = self::$cache_tables[call_user_func(array($objectName, 'GetCacheTable'))];

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

			$t = microtime(true);
			$cache_data = new CachedObject(
				$cache_row['version'],
				unserialize(gzinflate($cache_row['serialization'])),
				$cache_row['created']
			);
		}
		else if (implements_interface($objectName, 'ICacheable_File'))
		{
			$isOutput = implements_interface($objectName, 'ICacheable_FileOutput');

			$folder = self::$cache_folders[call_user_func(array($objectName, 'GetCacheFolder'))];

			if (!file_exists($filename = './cache/'.$folder.'/'.$hash.'.awc'))
				return null;

			$cache_data = unserialize(gzinflate(file_get_contents($filename)));

			if ($cache_data->timestamp + $lifetime < time()
				|| $cache_data->version != VERSION)
			{
				self::i_drop_file($filename);
				$cache_data = null;
				return null;
			}

			if ($isOutput)
			{
				echo $cache_data->object;
				exit;
			}
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

		$hash = self::CreateHash(call_user_func(array($name, 'GetCacheType')), $id);

		if (implements_interface($name, 'ICacheable_Database'))
		{
			$postfix = self::$cache_tables[call_user_func(array($name, 'GetCacheTable'))];

			DB::World()->Query('
					REPLACE INTO ?_cache_'.$postfix.' (hash, version, created, serialization)
					VALUES (?, ?, ?, ?)
				',
				$hash, VERSION, time(), gzdeflate(serialize($obj))
			);
		}
		else if (implements_interface($name, 'ICacheable_File'))
		{
			$folder = self::$cache_folders[call_user_func(array($name, 'GetCacheFolder'))];

			if (!file_exists($dir = './cache/'.$folder))
				mkdir($dir);

			if (file_exists($filename = $dir.'/'.$hash.'.awc'))
				unlink($filename);

			if (implements_interface($name, 'ICacheable_FileOutput'))
				$obj = $obj->GetOutput();

			file_put_contents($filename, gzdeflate(serialize(new CachedObject(VERSION, $obj, time()))));
		}
	}

	static function Update($obj, $name, $id = 0)
	{
		if (!implements_interface($name, 'ICacheable'))
			return false;

		$hash = self::CreateHash(call_user_func(array($name, 'GetCacheType')), $id);

		if (implements_interface($name, 'ICacheable_Database'))
		{
			$postfix = self::$cache_tables[call_user_func(array($name, 'GetCacheTable'))];

			$version = DB::World()->SelectCell('SELECT version FROM ?_cache_'.$postfix.' WHERE hash = ?', $hash);
			if (!$version || $version != VERSION)
			{
				DB::World()->Query('
						REPLACE INTO ?_cache_'.$postfix.' (hash, version, created, serialization)
						VALUES (?, ?, ?, ?)
					',
					$hash, VERSION, time(), gzdeflate(serialize($obj))
				);
			}
			else
			{
				DB::World()->Query('
						UPDATE ?_cache_'.$postfix.'
						SET serialization = ?
						WHERE hash = ?
					',
					gzdeflate(serialize($obj)),
					$hash
				);
			}
		}
		else if (implements_interface($name, 'ICacheable_File'))
		{
			$folder = self::$cache_folders[call_user_func(array($name, 'GetCacheFolder'))];

			if (file_exists($filename = './cache/'.$folder.'/'.$hash.'.awc'))
			{
				$cache_data = unserialize(gzinflate(file_get_contents($filename)));
				$cache_data->object = $obj;
			}
			else
				$cache_data = new CachedObject(VERSION, $obj, time());

			file_put_contents($filename, gzdeflate(serialize($cache_data)));
		}
	}

	static function SetCurrent($id = 0)
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
	static function CreateHash($type = 0, $id = 0)
	{
		if ($id > 0x1FFFFFF)
		{
			echo 'Cache: id overflow!';
			exit;
		}

		return ($type << 25) | $id;
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