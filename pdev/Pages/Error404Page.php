<?php

class Error404Page extends GenericPage
{
	protected function __create()
	{
		parent::__create();
	}

	public function finalize()
	{
		echo '404';
	}
}

?>