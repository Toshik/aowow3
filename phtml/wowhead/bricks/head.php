<!-- ATE ::: AoWoW Template Engine ::: Generated for: name "AoWoW-3" codename "My Own Little Wowhead" abbrev "MOLW"
-->
<?php

echo '<title>'.htmlspecialchars($this->full_title).'</title>';
?>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="chrome=1">
	<link rel="SHORTCUT ICON" href="templates/wowhead/images/favicon.ico">

	<link rel="stylesheet" type="text/css" href="templates/<?php echo $this->template; ?>/css/locale_<?php echo $this->lang; ?>.css" />
	<link rel="stylesheet" type="text/css" href="templates/<?php echo $this->template; ?>/css/global.css" />
	<script src="templates/<?php echo $this->template; ?>/js/locale_<?php echo $this->lang; ?>.js" type="text/javascript"></script>
	<script src="templates/<?php echo $this->template; ?>/js/global.js" type="text/javascript"></script>

<?php
	foreach($this->css as $css)
	{
		echo '<link rel="stylesheet" type="text/css" href="templates/'.$this->template.'/css/'.str_replace('[LANG]', $this->lang, $css).'.css" />'."\n";
	}

	foreach($this->js as $js)
	{
		echo '<script src="templates/'.$this->template.'/js/'.str_replace('[LANG]', $this->lang, $js).'.js" type="text/javascript"></script>'."\n";
	}
?>
<!--
<style type="text/css">{literal}.zone-picker { margin-left: 4px }{/literal}</style>
-->
<?php echo '<script type="text/javascript">';

	// Time for js
	echo 'var g_serverTime = new Date("'.jsTime().'");';

	// locale
	echo 'g_locale={id:'.$this->locale.',name:"'.$this->lang.'"};';

if($this->user)
{
	//echo 'g_user={id:'.$this->user['id'].',name:"'.jsEscape($this->user['name']).'",character:"'.jsEscape($this->user['character_name']).'",';
	//echo 'roles:'.$this->user['roles'].',permissions:'.$this->user['perms'].'};';
}

// 'ALL' DATA

	echo "\n";

	/*global $allitems, $allspells, $allachievements, $allnpcs, $allquests;

	if($allitems)
	{
		echo 'var _ = g_items;'."\n";
		foreach($allitems as $id => $item)
		{
			echo '_['.$id.']={';
			echo 'icon:"'.jsEscape($item['icon']).'",name_'.$this->lang.':"'.jsEscape($item['name']).'",quality:'.$item['quality'];
			echo '};';
		}
	}*/

	echo '</script>';
?>