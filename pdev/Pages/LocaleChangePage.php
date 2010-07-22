<?php

class LocaleChangePage extends GenericPage
{
	public function __construct()
	{
		parent::__construct();

		$newloc = Get(GET_INT, 'locale');
		if(!in_array($newloc, Main::$locales))
			return;

		if($newloc != $this->locale)
		{
			$this->locale = $newloc;
			SetCookie('wh_l', $newloc, time() + MONTH);
		}
	}

	public function finalize()
	{
		header('Location: '.(isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '.'));
	}
}

?>