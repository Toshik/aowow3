<?php

class RedirectPage extends GenericPage implements INotUserSensitive
{
	var $url;

	public function __construct($relative_url)
	{
		$this->url = $relative_url;
	}

	public function finalize()
	{
		$this->display('redirection');
	}
}

?>