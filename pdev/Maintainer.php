<?php

// pre-load maximum classes
require_once('pdev/AdminEnums.php');
require_once('pdev/User.php');

class Maintainer
{
	// cached data
	private static $systemRaces = array();
	private static $systemClasses = array();

	public static function AcquireLock()
	{
		if(!file_exists('./cache/lock'))
			touch('./cache/lock');
	}

	public static function ReleaseLock()
	{
		if(file_exists('./cache/lock'))
			unlink('./cache/lock');
	}

	static function BuildMenuTree($arr, $locale)
	{
		$result = '';
		foreach ($arr as $id => $item)
		{
			$tmp = array();
			$tmp[] = is_numeric($id) ? $id : '';
			$tmp[] = '"'.jsEscape($item['names'][$locale]).'"';
			$tmp[] = isset($item['url']) ? '"'.jsEscape($item['url']).'"' : '';
			$tmp[] = $item['children'] ? '['.self::BuildMenuTree($item['children'], $locale).']' : '';
			$tmp[] = isset($item['icon']) ? '{tinyIcon:"'.jsEscape($item['icon']).'"}' : '';

			$result .= '['.rtrim(implode(',', $tmp), ',').'],';
		}
		return rtrim($result, ',');
	}

	public static function BuildPHPFiles()
	{
		global $_LOCALIZEDTERMS;
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
		global $_LOCALIZEDTERMS;

		$data = '<?php'."\n\n";

		// Races
		$races = DB::World()->Select('SELECT Id, side, nameSystem, '.AllLocales('nameMale').' FROM ?_races ORDER BY Id');
		$data .= 'enum(array( // Races'."\n";
		$ids = array();
		foreach($races as $row)
		{
			$ids[] = $row['Id'].' => '.$row['side'];
			self::$systemRaces[$row['Id']] = $row['nameSystem'];
			$data .= "\t".'\'RACE_'.strtoupper($row['nameSystem']).'\' => '.$row['Id'].','."\n";

			foreach(Main::$locales as $loc)
				$_LOCALIZEDTERMS[$loc]['race_'.$row['Id']] = $row['nameMale_loc'.$loc];
		}
		$data .= '));'."\n";
		$data .= 'WoW::$races = array('.implode(', ', $ids).');'."\n\n";

		// Classes
		$classes = DB::World()->Select('SELECT Id, nameSystem, '.AllLocales('nameMale').' FROM ?_classes ORDER BY Id');
		$data .= 'enum(array( // Classes'."\n";
		$ids = array();
		foreach($classes as $row)
		{
			$ids[] = $row['Id'];
			self::$systemClasses[$row['Id']] = $row['nameSystem'];
			$data .= "\t".'\'CLASS_'.strtoupper($row['nameSystem']).'\' => '.$row['Id'].','."\n";

			foreach(Main::$locales as $loc)
				$_LOCALIZEDTERMS[$loc]['class_'.$row['Id']] = $row['nameMale_loc'.$loc];
		}
		$data .= '));'."\n";
		$data .= 'WoW::$classes = array('.implode(', ', $ids).');'."\n\n";

		$realms = DB::Realm()->Select('SELECT id, name FROM realmlist');
		$data .= 'WoW::$realms = array(';
		foreach ($realms as $row)
		{
			$data .= $row['id'].'=>\''.jsEscape($row['name']).'\',';
		}
		$data .= ');'."\n\n";

		$data .= '?>';
		file_put_contents('./cache/generated.php', $data);
	}

	public static function BuildClientFiles()
	{
		self::BuildJQueryJs();
		self::BuildGlobalJs();
		self::BuildLocalizedJs();
		self::BuildSingleJs('CLIENTFILE_HOME_JS', 'home');
		self::BuildSingleJs('CLIENTFILE_BASIC_JS', 'basic');
		self::BuildSingleJs('CLIENTFILE_STAFF_JS', 'staff');
		self::BuildSingleJs('CLIENTFILE_ADMIN_JS', 'admin');
		self::BuildSingleJs('CLIENTFILE_PROFILE_JS', 'profile');

		self::BuildSingleCss('CLIENTFILE_BASIC_CSS', 'basic');
		self::BuildSingleCss('CLIENTFILE_HOME_CSS', 'home');
		self::BuildSingleCss('CLIENTFILE_GLOBAL_CSS', 'global', 'custom');
		self::BuildSingleCss('CLIENTFILE_STAFF_CSS', 'staff');
		self::BuildSingleCss('CLIENTFILE_ADMIN_CSS', 'admin');
		foreach(Main::$locales as $loc)
			self::BuildSingleCss('CLIENTFILE_LOCALE_'.$loc.'_CSS', $loc, 'locale');
	}
	
	private static function BuildGlobalJs()
	{
		if (defined('CLIENTFILE_GLOBAL_JS') && file_exists($a = './cache/'.CLIENTFILE_GLOBAL_JS.'.js'))
			unlink($a);

		$data = '';

		$data .= 'g_staticUrl=".";';

		// g_file_races
		$tmp = array();
		foreach (self::$systemRaces as $id => $name)
			$tmp[] = $id.':"'.$name.'"';
		$data .= 'var g_file_races={'.implode(',', $tmp).'};';

		// g_file_classes
		$tmp = array();
		foreach (self::$systemClasses as $id => $name)
			$tmp[] = $id.':"'.$name.'"';
		$data .= 'var g_file_classes={'.implode(',', $tmp).'};';

		// g_realms
		$tmp = array();
		foreach (WoW::$realms as $id => $name)
			$tmp[] = $id.':"'.jsEscape($name).'"';
		$data .= 'var g_realms={'.implode(',', $tmp).'};';

		// g_race2side
		$tmp = array();
		foreach (WoW::$races as $id => $side)
			$tmp[] = $id.':'.$side;
		$data .= 'var g_race2side={'.implode(',', $tmp).'};';

		$data .= file_get_contents('./js/Defines.js');
		$data .= file_get_contents('./js/Util.js');
		//$data .= file_get_contents('./js/Ads.js');
		$data .= file_get_contents('./js/Ads_PH.js');
		//$data .= file_get_contents('./js/Announcements.js');
		//$data .= file_get_contents('./js/ContactTool.js');
		//$data .= file_get_contents('./js/Draggable.js');
		//$data .= file_get_contents('./js/Facebook.js');
		$data .= file_get_contents('./js/Facebook_PH.js');
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
		$data .= file_get_contents('./js/custom.js');

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
		$result = DB::World()->Select('SELECT classId, '.AllLocales().', petType, icon, `order` FROM ?_talent_tabs');
		$talent_tabs = array();
		foreach($result as $row)
		{
			$orderOrPetType = $row['classId'] ? $row['order'] : $row['petType'];
			$talent_tabs[$row['classId']][$orderOrPetType]['icon'] = $row['icon'];
			foreach(Main::$locales as $loc)
				$talent_tabs[$row['classId']][$orderOrPetType][$loc] = $row['name_loc'.$loc];
		}
		
		$result = DB::World()->Select('SELECT Id, '.AllLocales().' FROM ?_pet_foods');
		$pet_food_types = array();
		foreach($result as $row)
		{
			$pet_food_types[$row['Id']] = array();
			foreach(Main::$locales as $loc)
				$pet_food_types[$row['Id']][$loc] = $row['name_loc'.$loc];
		}

		global $_LOCALIZEDTERMS;
		$pet_types = array(
			array(
				'term' => 'ferocity',
				'icon' => strtolower('Ability_Druid_Swipe'),
			),
			array(
				'term' => 'tenacity',
				'icon' => strtolower('Ability_Hunter_Pet_Bear'),
			),
			array(
				'term' => 'cunning',
				'icon' => strtolower('Ability_Hunter_CombatExperience'),
			),
		);

		$result = DB::World()->Select('
				SELECT Id, '.AllLocales().', petType, iconname
				FROM ?_pet_families
				WHERE petType >= 0
				ORDER BY petType ASC, name_loc0 ASC
			'
		);
		$pet_families = array();
		$pet_calc_tree = array();
		$c_type = -1;
		$talentCalcIdString = '0zMcmVokRsaqbdrfwihuGINALpTjnyxtgevElBCDFHJKOPQSUWXYZ123456789';
		foreach($result as $row)
		{
			$pet_families[$row['Id']] = array();

			if ($c_type != $row['petType'])
			{
				$c_type = $row['petType'];
				$pet_calc_tree['type'.$c_type] = array(
					'names' => array(),
					'children' => array(),
					'icon' => $pet_types[$c_type]['icon']
				);

				foreach (Main::$locales as $loc)
					$pet_calc_tree['type'.$c_type]['names'][$loc] = T($pet_types[$c_type]['term'], $loc);
			}

			$pet_calc_tree[$row['Id']] = array(
				'names' => array(),
				'children' => array(),
				'icon' => $row['iconname'],
				'url' => '?petcalc#'.$talentCalcIdString{floor($row['Id'] / 10)}.$talentCalcIdString{floor($row['Id'] % 10) * 2},
			);

			foreach(Main::$locales as $loc)
				$pet_calc_tree[$row['Id']]['names'][$loc] = $pet_families[$row['Id']][$loc] = $row['name_loc'.$loc];
		}

		$result = DB::World()->Select('SELECT Id, '.AllLocales().' FROM ?_item_classes');
		$item_classes = array();
		foreach($result as $row)
		{
			$item_classes[$row['Id']] = array();
			foreach(Main::$locales as $loc)
				$item_classes[$row['Id']][$loc] = $row['name_loc'.$loc];
		}

		$result = DB::World()->Select('SELECT Id, '.AllLocales().' FROM ?_creature_types');
		$creature_types = array();
		foreach($result as $row)
		{
			$creature_types[$row['Id']] = array();
			foreach(Main::$locales as $loc)
				$creature_types[$row['Id']][$loc] = $row['name_loc'.$loc];
		}

		$result = DB::World()->Select('SELECT Id, '.AllLocales().' FROM ?_quest_infos');
		$quest_info = array();
		foreach($result as $row)
		{
			$quest_info[$row['Id']] = array();
			foreach(Main::$locales as $loc)
				$quest_info[$row['Id']][$loc] = $row['name_loc'.$loc];
		}

		$result = DB::World()->Select('SELECT Id, '.AllLocales().' FROM ?_area_table');
		$area_table = array();
		foreach($result as $row)
		{
			$area_table[$row['Id']] = array();
			foreach(Main::$locales as $loc)
				$area_table[$row['Id']][$loc] = $row['name_loc'.$loc];
		}

		$result = DB::World()->Select('SELECT Id, '.AllLocales().' FROM ?_quest_sorts');
		$quest_sort = array();
		foreach($result as $row)
		{
			$quest_sort[$row['Id']] = array();
			foreach(Main::$locales as $loc)
				$quest_sort[$row['Id']][$loc] = $row['name_loc'.$loc];
		}

		$result = DB::World()->Select('SELECT Id, '.AllLocales().' FROM ?_spell_schools');
		$schools = array();
		foreach($result as $row)
		{
			$schools[$row['Id']] = array();
			foreach(Main::$locales as $loc)
				$schools[$row['Id']][$loc] = $row['name_loc'.$loc];
		}

		$result = DB::World()->Select('SELECT Id, '.AllLocales().' FROM ?_skill_lines');
		$skill_line = array();
		foreach($result as $row)
		{
			$skill_line[$row['Id']] = array();
			foreach(Main::$locales as $loc)
				$skill_line[$row['Id']][$loc] = $row['name_loc'.$loc];
		}

		$result = DB::World()->Select('SELECT factionId AS Id, '.AllLocales().', team AS parent FROM ?_factions');
		$factions = array();
		$faction_categories = array();
		foreach($result as $row)
		{
			$factions[$row['Id']] = array();
			foreach(Main::$locales as $loc)
				$factions[$row['Id']][$loc] = $row['name_loc'.$loc];

			$faction_categories[$row['parent']] = null;
		}
		foreach($faction_categories as $id => $null)
			$faction_categories[$id] = &$factions[$id];

		$result = DB::World()->Select('SELECT Id, '.AllLocales().', parent FROM ?_achievement_categories ORDER BY `order` ASC');
		$achievement_category = array();
		$achievement_category_tree = array();
		$statistic_category_tree = array();
		$common_category_tree = array();
		foreach($result as $row)
		{
			$achievement_category[$row['Id']] = array();

			switch ($row['parent'])
			{
				case -1:
					$tree = &$achievement_category_tree;
					break;
				case 1:
					$tree = &$statistic_category_tree;
					break;
				default:
					$tree = &$common_category_tree;
					break;
			}

			$tree[$row['Id']] = array(
				'names' => array(),
				'parent' => $row['parent'],
				'children' => array(),
			);

			foreach(Main::$locales as $loc)
				$tree[$row['Id']]['names'][$loc] = $achievement_category[$row['Id']][$loc] = $row['name_loc'.$loc];
		}

		foreach ($common_category_tree as $id => $item)
		{
			if (isset($achievement_category_tree[$item['parent']]))
				$achievement_category_tree[$item['parent']]['children'][$id] = $item;
			elseif (isset($statistic_category_tree[$item['parent']]))
				$statistic_category_tree[$item['parent']]['children'][$id] = $item;
			else
				echo 'Parent not found for achievement category '.$item['names'][0]."\n<br/>";
		}

		unset($result);

		$files = array();
		foreach(Main::$locales as $loc)
		{
			$files[$loc] = file_get_contents('./js/LocalizedStatic.js');

			$tmp = array();
			foreach(Main::$gmlevels as $id => $term)
				$tmp[] = $id.':"'.jsEscape(T($term, $loc)).'"';
			$files[$loc] .= 'var g_gmlevels={'.implode(',', $tmp).'};';

			// g_item_classes
			$tmp = array();
			foreach($item_classes as $id => $names)
				$tmp[] = $id.':"'.jsEscape($names[$loc]).'"';
			$files[$loc] .= 'var g_item_classes={'.implode(',', $tmp).'};';

			// g_contact_reasons
			$tmp = array();
			foreach(ContactTool::$reasons as $id => $term)
				$tmp[] = $id.': "'.jsEscape(T($term, $loc)).'"';
			$files[$loc] .= 'var g_contact_reasons={'.implode(',', $tmp).'};';

			// g_chr_classes
			$tmp = array();
			foreach(WoW::$classes as $id)
				$tmp[] = $id.': "'.jsEscape(T('class_'.$id, $loc)).'"';
			$files[$loc] .= 'var g_chr_classes={'.implode(',', $tmp).'};';

			// g_chr_races
			$tmp = array();
			foreach(WoW::$races as $id => $side)
				$tmp[] = $id.': "'.jsEscape(T('race_'.$id, $loc)).'"';
			$files[$loc] .= 'var g_chr_races={'.implode(',', $tmp).'};';

			// g_chr_specs
			$files[$loc] .= 'var g_chr_specs={';
			$files[$loc] .= '0:"'.jsEscape(T('talents_hybrid', $loc)).'",';

			foreach(WoW::$classes as $classId)
			{
				$files[$loc] .= $classId.':["';
				$names = array();
				for($tabN = 0; $tabN < NUM_TALENT_TABS; $tabN++)
					$names[] = jsEscape($talent_tabs[$classId][$tabN][$loc]);
				$files[$loc] .= implode('","', $names);
				$files[$loc] .= '"],';
			}

			$files[$loc] .= '"-1":"'.jsEscape(T('talents_untalented', $loc)).'"';
			$files[$loc] .= '};';

			// g_pet_types
			$tmp = array();
			foreach($talent_tabs[0] as $id => $names)
				$tmp[] = $id.':"'.jsEscape($names[$loc]).'"';
			$files[$loc] .= 'var g_pet_types={'.implode(',', $tmp).'};';
			
			// g_pet_foods
			$tmp = array();
			foreach($pet_food_types as $id => $names)
				$tmp[] = (1 << ($id-1)).':"'.jsEscape($names[$loc]).'"';
			$files[$loc] .= 'var g_pet_foods={'.implode(',', $tmp).'};';

			// g_pet_families
			$tmp = array();
			foreach($pet_families as $id => $names)
				$tmp[] = $id.':"'.jsEscape($names[$loc]).'"';
			$files[$loc] .= 'var g_pet_families={'.implode(',', $tmp).'};';

			// g_npc_types
			$tmp = array();
			foreach($creature_types as $id => $names)
				$tmp[] = $id.':"'.jsEscape($names[$loc]).'"';
			$files[$loc] .= 'var g_npc_types={'.implode(',', $tmp).'};';

			// g_quest_types
			$tmp = array();
			foreach($quest_info as $id => $names)
				$tmp[] = $id.':"'.jsEscape($names[$loc]).'"';
			$files[$loc] .= 'var g_quest_types={'.implode(',', $tmp).'};';

			// g_quest_sorts
			$tmp = array();
			foreach($quest_sort as $id => $names)
				$tmp[] = '"-'.$id.'":"'.jsEscape($names[$loc]).'"';
			foreach($area_table as $id => $names)
				$tmp[] = $id.':"'.jsEscape($names[$loc]).'"';
			$files[$loc] .= 'var g_quest_sorts={'.implode(',', $tmp).'};';

			// g_spell_resistances
			$tmp = array();
			foreach($schools as $id => $names)
				$tmp[] = $id.':"'.jsEscape($names[$loc]).'"';
			$files[$loc] .= 'var g_spell_resistances={'.implode(',', $tmp).'};';

			// g_spell_skills
			$tmp = array();
			foreach($skill_line as $id => $names)
				$tmp[] = $id.':"'.jsEscape($names[$loc]).'"';
			$files[$loc] .= 'var g_spell_skills={'.implode(',', $tmp).'};';

			// g_faction_categories
			$tmp = array();
			foreach($faction_categories as $id => $names)
				$tmp[] = $id.':"'.jsEscape($names != null ? $names[$loc] : T('other', $loc)).'"';
			$files[$loc] .= 'var g_faction_categories={'.implode(',', $tmp).'};';

			// g_achievement_categories
			$tmp = array();
			foreach($achievement_category as $id => $names)
				$tmp[] = $id.':"'.jsEscape($names[$loc]).'"';
			$files[$loc] .= 'var g_achievement_categories={'.implode(',', $tmp).'};';

			// MENU

			// mn_classes
			$tmp = array();
			foreach(WoW::$classes as $id)
				$tmp[] = '['.$id.', "'.T('class_'.$id, $loc).'",,,{className: "c'.$id.'",tinyIcon:"class_'.self::$systemClasses[$id].'"}]';
			$files[$loc] .= 'var mn_classes=['.implode(',', $tmp).'];';

			// mn_races
			$tmp = $tmp2 = array();
			foreach(WoW::$races as $id => $side)
				$tmp[$side][] = '['.$id.', "'.T('race_'.$id, $loc).'",,,{tinyIcon:"race_'.self::$systemRaces[$id].'_female"}]';

			foreach ($tmp as $side => $races)
			{
				// put side label in the beginning of $races
				array_unshift($races, '[,"'.T(WoW::$sides[$side], $loc).'",,,{tinyIcon:"side_'.WoW::$sides[$side].'"}]');
				// merge two arrays
				$tmp2 = array_merge($tmp2, $races);
			}
			$files[$loc] .= 'var mn_races=['.implode(',', $tmp2).'];';

			// mn_itemSets
			$tmp = array();
			$tmp[] = '[, "'.T('byclass', $loc).'"]';
			foreach(WoW::$classes as $id)
				$tmp[] = '['.$id.', "'.T('class_'.$id, $loc).'",,,{className: "c'.$id.'",tinyIcon:"class_'.self::$systemClasses[$id].'"}]';
			$files[$loc] .= 'var mn_itemSets=['.implode(',', $tmp).'];';

			// mn_npcs
			$tmp = array();
			foreach($creature_types as $id => $names)
				$tmp[] = '['.$id.', "'.jsEscape($names[$loc]).'"]';
			$files[$loc] .= 'var mn_npcs = ['.implode(',', $tmp).'];';

			// mn_pets
			$tmp = array();
			foreach($talent_tabs[0] as $id => $names)
			{
				$talent_tabs[0][$id]['iconname'] = DB::World()->SelectCell('SELECT icon FROM ?_spell_icons WHERE id = ?d', $names['icon']);
				$tmp[] = '['.$id.',"'.jsEscape($names[$loc]).'",,,{tinyIcon:"'.$talent_tabs[0][$id]['iconname'].'"}]';
			}
			$files[$loc] .= 'var mn_pets=['.implode(',', $tmp).'];';

			// mn_achievements
			$files[$loc] .= 'var mn_achievements=['.self::BuildMenuTree($achievement_category_tree, $loc).'];';
			// mn_statistics
			$files[$loc] .= 'var mn_statistics=['.self::BuildMenuTree($statistic_category_tree, $loc).'];';

			// mn_petCalc
			$files[$loc] .= 'var mn_petCalc=['.self::BuildMenuTree($pet_calc_tree, $loc).'];';

			// main menu file
			$files[$loc] .= str_replace('", "/', '", "?', file_get_contents('./js/LocalizedMenu.js'));

			// LANG

			$files[$loc] .= 'var LANG={';

			//$files[$loc] .= file_get_contents('./js/LangContactTool.js');
			//$files[$loc] .= file_get_contents('./js/LangFilters.js');
			$files[$loc] .= file_get_contents('./js/LangForums.js');
			//$files[$loc] .= file_get_contents('./js/LangProfiler.js');
			//$files[$loc] .= file_get_contents('./js/LangShowOnMap.js');
			//$files[$loc] .= file_get_contents('./js/LangSummary.js');
			$files[$loc] .= file_get_contents('./js/LangTalentCalc.js');

			// must be last
			$files[$loc] .= file_get_contents('./js/LangBasic.js');

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

	private static function BuildSingleJs()
	{
		$args = func_get_args();
		$contant_name = $args[0];
		$locale = false;
		$i = 1;
		if (is_numeric($args[$i]))
			$locale = $args[$i++];
		$files = array_slice($args, $i);

		global $_CONFIG;

		if (defined($contant_name) && file_exists($a = './cache/'.constant($contant_name).'.js'))
			unlink($a);

		$contents = '';
		foreach ($files as $file_name)
			$contents .= self::ProcessJs(file_get_contents('./js/'.$file_name.'.js'), true, $locale);

		$md5 = md5($contents);
		$_CONFIG[$contant_name] = $md5;
		file_put_contents('./cache/'.$md5.'.js', $contents);
	}

	private static function BuildSingleCss()
	{
		$args = func_get_args();
		$contant_name = $args[0];
		$locale = false;
		$i = 1;
		if (is_numeric($args[$i]))
			$locale = $args[$i++];
		$files = array_slice($args, $i);

		global $_CONFIG;

		if (defined($contant_name) && file_exists($a = './cache/'.constant($contant_name).'.js'))
			unlink($a);

		$contents = '';
		foreach ($files as $file_name)
			$contents .= self::ProcessContent(file_get_contents('./css/'.$file_name.'.css'), $locale);

		// ...
		$contents = strtr($contents, array(
			"\r" => '',
			"\n" => '',
		));
		$md5 = md5($contents);
		$_CONFIG[$contant_name] = $md5;
		file_put_contents('./cache/'.$md5.'.css', $contents);
	}

	private static function ProcessContent($content, $locale = false)
	{
		$content = preg_replace_callback('/({term:([\w\d]+)})/i',
			create_function('$matches', 'return jsEscape(T($matches[2], '.($locale === false ? 'false' : $locale).'));'),
			$content);
		$content = preg_replace_callback('/({constant:([\w\d]+)})/i',
			create_function('$matches', 'return jsEscape(constant($matches[2]));'),
			$content);

		$content = str_replace('{lang}', Main::$languages[intval($locale)], $content);
		$content = str_replace('{locale}', intval($locale), $content);

		// images/ -> ../images/ 
		$content = preg_replace('/("|\'|\()images\//i', '$1../images/', $content);
		$content = str_replace('url(/', 'url(../', $content);

		// admin= -> admin&
		$content = str_replace('admin=', 'admin&', $content);

		return $content;
	}

	private static function ProcessJs($script, $process_content, $locale = false)
	{
		if($process_content)
			$script = self::ProcessContent($script, $locale);

		// Uncomment to remove compression
		//return $script;

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