<?php

class Maintainer
{
	public static function AcquireLock()
	{
		if(!file_exists('./cache/lock'))
			file_put_contents('./cache/lock', '');
	}

	public static function ReleaseLock()
	{
		if(file_exists('./cache/lock'))
			unlink('./cache/lock');
	}

	public static function BuildPHPFiles()
	{
		global $_LOCALIZEDTERMS;
		$_LOCALIZEDTERMS = array();
		foreach(Main::$locales as $loc)
			$_LOCALIZEDTERMS[$loc] = array();

		self::BuildNolocalizedFile();
		require_once('./cache/generated.php');

		self::BuildLocalizedFiles();
	}

	private static function BuildLocalizedFiles()
	{
		global $_LOCALIZEDTERMS;
		$terms = DB::World()->Select('SELECT textid, flags, '.AllLocales('content').', comments FROM ?_terms ORDER BY textid');

		$files = array();
		foreach(Main::$locales as $loc)
			$files[$loc] = '<?php'."\n\n".'global $_TERMS;'."\n".'$_TERMS = array('."\n";

		// Put preset terms into file
		foreach($_LOCALIZEDTERMS as $loc => $set)
		{
			foreach($set as $id => $text)
				$files[$loc] .= "\t'".$id."' => '".strtr($text, array('\''=>'\\\'','\\'=>'\\\\'))."',\n";
		}

		foreach($terms as $term)
		{
			foreach(Main::$locales as $loc)
			{
				if(preg_match('/[^\w\d]/', $term['textid']))
					continue;

				$text = empty($term['content_loc'.$loc]) ? ('['.$term['content_loc0'].']') : $term['content_loc'.$loc];
				if(!($term['flags'] & TERMFLAG_CONTAINS_HTML))
					$text = htmlspecialchars($text);

				$_LOCALIZEDTERMS[$loc][$term['textid']] = $text;
				$files[$loc] .= "\t'".$term['textid']."' => '".strtr($text, array('\''=>'\\\'','\\'=>'\\\\'))."',\n";
			}
		}

		foreach(Main::$locales as $loc)
		{
			$files[$loc] .= ");\n\n?>";
			file_put_contents('./cache/locale.'.Main::$languages[$loc].'.php', $files[$loc]);
		}
	}

	private static function BuildNolocalizedFile()
	{
		$data = '<?php'."\n\n";
		global $_LOCALIZEDTERMS;

		// Races
		$races = DB::World()->Select('SELECT Id, nameSystem, '.AllLocales('nameMale').' FROM ?_races ORDER BY Id');
		$data .= 'enum(array( // Races'."\n";
		$ids = array();
		foreach($races as $row)
		{
			$ids[] = $row['Id'];
			$data .= "\t".'\'RACE_'.strtoupper($row['nameSystem']).'\' => '.$row['Id'].','."\n";

			foreach(Main::$locales as $loc)
				$_LOCALIZEDTERMS[$loc]['race_'.$row['Id']] = $row['nameMale_loc'.$loc];
		}
		$data .= '));'."\n";
		$data .= 'Main::$races = array('.implode(', ', $ids).');'."\n\n";

		// Classes
		$classes = DB::World()->Select('SELECT Id, nameSystem, '.AllLocales('nameMale').' FROM ?_classes ORDER BY Id');
		$data .= 'enum(array( // Classes'."\n";
		$ids = array();
		foreach($classes as $row)
		{
			$ids[] = $row['Id'];
			$data .= "\t".'\'CLASS_'.strtoupper($row['nameSystem']).'\' => '.$row['Id'].','."\n";

			foreach(Main::$locales as $loc)
				$_LOCALIZEDTERMS[$loc]['class_'.$row['Id']] = $row['nameMale_loc'.$loc];
		}
		$data .= '));'."\n";
		$data .= 'Main::$classes = array('.implode(', ', $ids).');'."\n\n";

		$data .= '?>';
		file_put_contents('./cache/generated.php', $data);
	}

	public static function BuildClientFiles()
	{
		self::BuildJQueryJs();
		self::BuildGlobalJs();
		self::BuildLocalizedJs();
	}
	
	private static function BuildGlobalJs()
	{
		if (defined('CLIENTFILE_GLOBAL_JS') && file_exists($a = './cache/'.CLIENTFILE_GLOBAL_JS.'.js'))
			unlink($a);

		$data = '';
		$data .= file_get_contents('./js/Defines.js');
		$data .= file_get_contents('./js/Util.js');
		//$data .= file_get_contents('./js/Ads.js');
		//$data .= file_get_contents('./js/Announcements.js');
		//$data .= file_get_contents('./js/ContactTool.js');
		//$data .= file_get_contents('./js/Draggable.js');
		//$data .= file_get_contents('./js/Facebook.js');
		$data .= file_get_contents('./js/Icon.js');
		$data .= file_get_contents('./js/Lightbox.js');
		$data .= file_get_contents('./js/Listview.js');
		$data .= file_get_contents('./js/Livesearch.js');
		$data .= file_get_contents('./js/Locale.js');
		$data .= file_get_contents('./js/Mapper.js');
		$data .= file_get_contents('./js/Markup.js');
		$data .= file_get_contents('./js/Menu.js');
		//$data .= file_get_contents('./js/Modelviewer.js');
		$data .= file_get_contents('./js/PageTemplate.js');
		$data .= file_get_contents('./js/PoundChecker.js');
		$data .= file_get_contents('./js/ScreenshotViewer.js');
		//$data .= file_get_contents('./js/ShowOnMap.js');
		//$data .= file_get_contents('./js/Slider.js');
		$data .= file_get_contents('./js/Dialog.js');
		$data .= file_get_contents('./js/swfobject.js');
		$data .= file_get_contents('./js/Tabs.js');
		//$data .= file_get_contents('./js/UrlShortener.js');
		//$data .= file_get_contents('./js/VideoViewer.js');
		$data .= file_get_contents('./js/PatchVersion.js');

		$contents = self::ProcessJs($data, true);

		$md5 = md5($contents);
		global $_CONFIG;
		$_CONFIG['CLIENTFILE_GLOBAL_JS'] = $md5;
		file_put_contents('./cache/'.$md5.'.js', $contents);
	}

	private static function BuildJQueryJs()
	{
		if (defined('CLIENTFILE_JQUERY_JS') && file_exists($a = './cache/'.CLIENTFILE_JQUERY_JS.'.js'))
			unlink($a);

		$md5 = md5(file_get_contents('./js/jQuery.js'));
		global $_CONFIG;
		$_CONFIG['CLIENTFILE_JQUERY_JS'] = $md5;
		copy('./js/jQuery.js', './cache/'.$md5.'.js');
	}

	private static function BuildLocalizedJs()
	{
		global $_LOCALIZEDTERMS;

		$result = DB::World()->Select('SELECT classId, '.AllLocales().', `order` FROM ?_talenttab');
		$talent_tabs = array();
		foreach($result as $row)
		{
			if(!isset($talent_tabs[$row['classId']]))
				$talent_tabs[$row['classId']] = array();

			$talent_tabs[$row['classId']][$row['order']] = array();

			foreach(Main::$locales as $loc)
				$talent_tabs[$row['classId']][$row['order']][$loc] = $row['name_loc'.$loc];
		}
		unset($result);

		$files = array();
		foreach(Main::$locales as $loc)
		{
			$files[$loc] .= self::ProcessJs(file_get_contents('./js/LocalizedMenu.js'), true, $loc);
			$files[$loc] .= self::ProcessJs(file_get_contents('./js/LocalizedStatic.js'), true, $loc);
			// g_contact_reasons
			$files[$loc] .= 'var g_contact_reasons={'."\n";
			$data = array();
			foreach(ContactTool::$reasons as $id => $term)
				$data[] = $id.': "'.jsEscape(T($term, $loc)).'"';
			$files[$loc] .= implode(',', $data);
			$files[$loc] .= '};';

			// g_chr_classes
			$files[$loc] .= 'var g_chr_classes={'."\n";
			$data = array();
			foreach(Main::$classes as $id)
				$data[] = $id.': "'.jsEscape(T('class_'.$id, $loc)).'"';
			$files[$loc] .= implode(',', $data);
			$files[$loc] .= '};';

			// g_chr_races
			$files[$loc] .= 'var g_chr_races={'."\n";
			$data = array();
			foreach(Main::$races as $id)
				$data[] = $id.': "'.jsEscape(T('race_'.$id, $loc)).'"';
			$files[$loc] .= implode(',', $data);
			$files[$loc] .= '};';

			// var g_chr_specs
			$files[$loc] .= 'var g_chr_specs={'."\n";
			$files[$loc] .= '0:"'.jsEscape(T('talents_hybrid')).'",';

			foreach(Main::$classes as $classId)
			{
				$files[$loc] .= $classId.':["';
				$names = array();
				for($tabN = 0; $tabN < NUM_TALENT_TABS; $tabN++)
					$names[] = jsEscape($talent_tabs[$classId][$tabN][$loc]);
				$files[$loc] .= implode('","', $names);
				$files[$loc] .= '"],';
			}

			$files[$loc] .= '"-1":"'.jsEscape(T('talents_untalented')).'"';
			$files[$loc] .= '};';
		}

		foreach(Main::$locales as $loc)
		{
			$fn = 'CLIENTFILE_LOCALE_'.$loc.'_JS';
			if (defined($fn) && file_exists($a = './cache/'.constant($fn).'.js'))
				unlink($a);

			$contents = self::ProcessJs($files[$loc], true, $loc);

			$md5 = md5($contents);
			global $_CONFIG;
			$_CONFIG[$fn] = $md5;

			file_put_contents('./cache/'.$md5.'.js', $contents);
		}
	}

	private static function ProcessJs($script, $replace, $locale = false)
	{
		if($replace)
		{
			$script = preg_replace_callback('/({term:([\w\d]+)})/',
				create_function('$matches', 'return jsEscape(T($matches[2], '.($locale === false ? 'false' : $locale).'));'),
				$script);
			$script = preg_replace_callback('/({constant:([\w\d]+)})/',
				create_function('$matches', 'return jsEscape(constant($matches[2]));'),
				$script);
		}

		$packer = new JavaScriptPacker($script, 'None', true, false);
		return $packer->pack();
	}

	public static function SaveConfig()
	{
		$contents = '<?php'."\n\n";

		global $_CONFIG;
		foreach($_CONFIG as $key => $val)
		{
			$contents .= '$_CONFIG[\''.$key.'\'] = ';

			if(is_string($val))
				$contents .= '"'.jsEscape($val).'"';
			else
				$contents .= $val;

			$contents .= ';'."\n";
		}

		$contents .= "\n".'?>';

		file_put_contents('./cache/config.php', $contents);
	}

}

?>