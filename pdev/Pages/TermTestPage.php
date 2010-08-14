<?php

class TermTestPage
{
	public static function Callback($matches)	
	{
		$term = DB::World()->SelectCell('SELECT textid FROM ?_terms WHERE content_loc0 = BINARY '.$matches[2]);
		if (!$term)
			echo 'cannot find term for: '.$matches[2].'<br />'."\n";
		return $term ? $matches[1].'"{term:'.$term.'}"' : $matches[0];
	}

	public function __construct()
	{
		$contents = file_get_contents('./js/LangTalentCalc.js');

		$contents = preg_replace_callback(array('/( |\\[)(".*?[^\\\\]")/u','/( |\\[)(\'.*?[^\\\\]\')/u'),
			array(__CLASS__, 'Callback'),
			$contents);

		echo '<pre>'.$contents.'</pre>';
		exit;
	}
}


?>