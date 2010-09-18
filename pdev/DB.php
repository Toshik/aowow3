<?php

require_once('configs/DBConfig.php');
require_once('includes/DbSimple/Generic.php');
require_once('includes/DbSimple/Mysql.php');

enum(array(
	'DB_CHARACTERS',
	'DB_WORLD',
	'DB_REALM',
	'DB_LIVEWORLD',
	'DB_LOGS'
));

class DB
{
	private static $interfaceCache = array();
	private static $optionsCache = array();
	private static $connectionCache = array();

	private static function _createConnectSyntax(&$options)
	{
		return 'mysql://'.$options->user.':'.$options->pass.'@'.$options->host.'/'.$options->db;
	}

	public static function connect($idx)
	{
		if(self::isConnected($idx))
			return;

		$options = &self::$optionsCache[$idx];
		$interface = DbSimple_Generic::connect(self::_createConnectSyntax($options));

		if(!$interface)
		{
			echo 'Failed to connect to database.';
			die;
		}

		$interface->setErrorHandler(array('DB', 'ErrorHandler'));
		$interface->query('SET NAMES ?', 'utf8');
		if($options->prefix)
			$interface->setIdentPrefix($options->prefix);
		self::$interfaceCache[$idx] = &$interface;
		self::$connectionCache[$idx] = true;
	}

	public static function ErrorHandler($message, $data)
	{
		/*if($_SESSION['roles'] & ROLEMASK_DEV)
			print_r($data);

		ErrorHandler::MySQL_Error($data);*/
		echo "DB ERROR:<br /><br />\n\n<pre>";
		print_r($data);
		echo "</pre>";
	}

	public static function GetDB($idx) { return self::$interfaceCache[$idx]; }
	public static function isConnected($idx) { return isset(self::$connectionCache[$idx]); }
	private static function SafeGetDB($idx)
	{
		if(!self::isConnected($idx))
			self::connect($idx);

		return self::GetDB($idx);
	}

	public static function Characters()		{ return self::SafeGetDB(DB_CHARACTERS); }
	public static function Realm()			{ return self::SafeGetDB(DB_REALM); }
	public static function World()			{ return self::SafeGetDB(DB_WORLD); }
	public static function LiveWorld()		{ return self::SafeGetDB(DB_LIVEWORLD); }
	public static function Logs()			{ return self::SafeGetDB(DB_LOGS); }

	public static function load()
	{
		self::$optionsCache[DB_CHARACTERS]	= (object)DBConfig::$characters;
		self::$optionsCache[DB_WORLD]		= (object)DBConfig::$world;
		self::$optionsCache[DB_REALM]		= (object)DBConfig::$realm;
		self::$optionsCache[DB_LIVEWORLD]	= (object)DBConfig::$liveworld;
		self::$optionsCache[DB_LOGS]		= (object)DBConfig::$log;
	}
}

DB::load();

?>