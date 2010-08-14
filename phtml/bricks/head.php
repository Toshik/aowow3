<title><?php echo htmlspecialchars($this->full_title); ?></title>

<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="chrome=1">
<link rel="SHORTCUT ICON" href="images/favicon.ico">

<?php
	foreach($this->css as $css)
		echo '<link  href="cache/'.$css.'.css" type="text/css" rel="stylesheet" />'."\n";

	foreach($this->js as $js)
		echo '<script src="cache/'.$js .'.js"  type="text/javascript"></script>'."\n";
?>

<?php /*
<style type="text/css">{literal}.zone-picker { margin-left: 4px }{/literal}</style>
*/ ?>

<script type="text/javascript"><?php

	echo '$.extend(window, {g_serverTime: new Date("'.jsTime().'")});';

	// locale ??
	//echo 'g_locale={id:'.$this->locale.',name:"'.$this->lang.'"};';

if($this->user)
{
	//echo 'g_user={id:'.$this->user['id'].',name:"'.jsEscape($this->user['name']).'",character:"'.jsEscape($this->user['character_name']).'",';
	//echo 'roles:'.$this->user['roles'].',permissions:'.$this->user['perms'].'};';
}
else
{
	echo 'g_user={id:0,name:"",roles:0,permissions:0,ads:false,cookies:{}};';
}

// 'ALL' DATA

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

?></script>

