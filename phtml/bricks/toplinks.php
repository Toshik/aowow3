<?php
echo '<div id="toplinks" class="toplinks">';
if($this->user)
{
	echo '<a href="?user='.htmlspecialchars($this->user->name).'">'.htmlspecialchars($this->user->name).'</a> | ';
	echo '<a href="?account">'.T('my_account').'</a> | ';
	echo '<a href="?account=signout';
	if($this->query) echo '&b='.wn_screate($this->query, WN_KEY_BACKURL);
	echo '">'.T('signout').'</a>';
}
else
{
	echo '<a';
	if(get_class($this) == 'AccountPage' && $this->type == 'signin')
		echo ' class="selected" href="javascript:;';
	else
	{
		echo ' href="?account=signin';
		if($this->query)
			echo '&b='.wn_screate($this->query, WN_KEY_BACKURL);
	}
	echo '">'.T('signin').'</a>';
}
echo '| <a href="javascript:;" id="toptabs-menu-language">'.T('language').' <small>&#9660;</small></a></div>';
echo '<script type="text/javascript">g_initHeaderMenus()</script>';
?>