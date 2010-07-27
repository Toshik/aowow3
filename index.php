<?php

if (file_exists('./cache/lock'))
{
	require('phtml/maintenance.php');
}
else
{
	require_once('pdev/Main.php');
	Main::Handle($_SERVER['QUERY_STRING']);
}

exit;

?>