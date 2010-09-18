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


function implements_interface($class, $interface)
{
	return in_array($interface, class_implements($class));
}

function urlize($input)
{
	$input = str_replace(' / ', '-', $input);
	$input = str_replace("'", '', $input);
	$input = trim($input);
	$input = preg_replace('/[^a-z0-9_]/ig', '-', $input);
	$input = str_replace('--', '-', $input);
	$input = str_replace('--', '-', $input);
	$input = trim($input, '-');
	$input = strtolower($input);
	return $input;
}

function AllLocales($name = 'name')
{
	$name = $name.'_loc';
	return $name.implode(','.$name, Main::$locales);
}

// fixed http://www.php.net/manual/en/function.array-merge-recursive.php#93905
function array_merge_replace_recursive()
{
    $params = &func_get_args();

    // First array is used as the base, everything else overwrites on it
    $return = array_shift($params);

    // Merge all arrays on the first array
    foreach ($params as $array)
	{
        foreach ($array as $key => $value)
		{
			if (isset($return[$key]) && is_array($value) && is_array($return[$key]))
				$return[$key] = array_merge_replace_recursive($return[$key], $value);
			else
				$return[$key] = $value;
        }
    }

    return $return;
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
function T($term, $specialLocale = false)
{
	if($specialLocale !== false)
	{
		global $_LOCALIZEDTERMS;
		return isset($_LOCALIZEDTERMS[$specialLocale][$term])
			? $_LOCALIZEDTERMS[$specialLocale][$term]
			: (isset($_LOCALIZEDTERMS[0][$term]) ? $_LOCALIZEDTERMS[0][$term] : '[term not exists]');
	}

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