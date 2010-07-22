<?php

class RedirectPage extends GenericPage
{
	var $url;

	public function __construct($relative_url)
	{
		parent::__construct();

		$this->url = $relative_url;
	}

	public function finalize()
	{
		$this->display('redirection');
	}
}

?>