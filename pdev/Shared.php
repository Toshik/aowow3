<?php

/** UTIL FUNCTIONS **/

function __autoload($cn)
{
	if(endsWith($cn, 'Page'))
		$filename = 'pdev/Pages/'.$cn.'.php';
	else
		$filename = 'pdev/'.$cn.'.php';

	require_once($filename);
}

function enum($arr)
{
	$i = 0;
	foreach($arr as $key => $value)
	{
		if(is_numeric($key))
			define($value, ++$i);
		else
			define($key, $value);
	}
}

function hex($value)
{
	$result = '';

	for($i = 0; $i < strlen($value); $i++)
		$result .= str_pad(ord($value{$i}), 3, '0', STR_PAD_LEFT);

	return $result;
}

function unhex($value)
{
	$result = '';

	for($i = 0; $i < strlen($value); $i += 3)
		$result .= chr(substr($value, $i, 3));

	return $result;
}

function jsEscape($text)
{
	return strtr($text, array('\\'=>'\\\\',"'"=>"\\'",'"'=>'\\"',"\r"=>'\\r',"\n"=>'\\n','</'=>'<\/'));
}

function jsTime($time = 0)
{
	if(!$time) $time = time();

	return strftime('%Y/%m/%d %H:%M:%S', $time);
}

function endsWith($source, $with)
{
	if(substr($source, strlen($source) - strlen($with), strlen($with)) == $with)
		return true;
	return false;
}

enum(array( // GetType
	'GET_INT',
	'GET_INT_NULL',
	'GET_STRING',
	'GET_ARRAY',
	'GET_BOOL',
));

function Get($getType, $key, $from = 'GET')
{
	static $defaults = array(
		GET_INT			=> 0,
		GET_INT_NULL	=> NULL,
		GET_STRING		=> '',
		GET_ARRAY		=> array(),
		GET_BOOL		=> false,
	);

	$arr = $GLOBALS['_'.$from];

	if(!isset($arr[$key]) || $arr[$key] == '')
		return $defaults[$getType];

	$var = $arr[$key];
	if(is_array($var))
		return $getType == GET_ARRAY ? $var : $defaults[$getType];

	if($getType == GET_STRING)
		return $var;
	elseif($getType == GET_BOOL)
		return $var ? true : false;

	return intval($var);
}

// Returns term's text for current locale
function T($term)
{
	global $_TERMS;
	return isset($_TERMS[$term]) ? $_TERMS[$term] : '[term not exists]';
}

/** UTIL LIBRARIES **/

require_once('pdev/SharedEnums.php');

require_once('configs/DefaultConfig.php');
if(file_exists('cache/config.php'))
	require_once('cache/config.php');
enum($_CONFIG);

require_once('pdev/Shared/WN.php');

?>