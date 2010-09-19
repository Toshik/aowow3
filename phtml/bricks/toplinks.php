<div class="toplinks linklist">
<?php
if ($this->user)
	echo '<a href="#" id="toplinks-user">'.htmlspecialchars($this->user->name).'</a>';
else
	echo '<a href="?account=signin">'.T('signin').'</a>';
?>
|<a href="#" id="toplinks-language"></a></div>