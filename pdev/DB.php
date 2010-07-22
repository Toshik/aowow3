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

	private function _createConnectSyntax(&$options)
	{
		return 'mysql://'.$options->user.':'.$options->pass.'@'.$options->host.'/'.$options->db;
	}

	public function connect($idx)
	{
		if(self::isConnected($idx))
			return;

		$options = &self::$optionsCache[$idx];
		$interface = DbSimple_Generic::connect(self::_createConnectSyntax($options));

		if(!$interface)
			return;

		$interface->setErrorHandler(array('DB', 'ErrorHandler'));
		$interface->query('SET NAMES ?', 'utf8');
		if($options->prefix)
			$interface->setIdentPrefix($options->prefix);
		self::$interfaceCache[$idx] = &$interface;
		self::$connectionCache[$idx] = true;
	}

	public function ErrorHandler($message, $data)
	{
		/*if($_SESSION['roles'] & ROLEMASK_DEV)
			print_r($data);

		ErrorHandler::MySQL_Error($data);*/
		echo "DB ERROR:<br /><br />\n\n<pre>";
		print_r($data);
		echo "</pre>";
	}

	public function GetDB($idx) { return self::$interfaceCache[$idx]; }
	public function isConnected($idx) { return isset(self::$connectionCache[$idx]); }
	private function SafeGetDB($idx)
	{
		if(!self::isConnected($idx))
			self::connect($idx);

		return self::GetDB($idx);
	}

	public function Characters()	{ return self::SafeGetDB(DB_CHARACTERS); }
	public function Realm()			{ return self::SafeGetDB(DB_REALM); }
	public function World()			{ return self::SafeGetDB(DB_WORLD); }
	public function LiveWorld()		{ return self::SafeGetDB(DB_LIVEWORLD); }
	public function Logs()			{ return self::SafeGetDB(DB_LOGS); }

	public function load()
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