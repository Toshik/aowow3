<?php

class RedirectPage extends GenericPage
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