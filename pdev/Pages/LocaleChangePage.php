<?php

class LocaleChangePage extends GenericPage implements INotUserSensitive
{
	public function __create()
	{
		parent::__create();
	}

	public function finalize()
	{
		$newloc = Get(GET_INT, 'locale');
		if(!in_array($newloc, Main::$locales))
			return;

		if($newloc != $this->locale)
		{
			$this->locale = $newloc;
			SetCookie('wh_l', $newloc, time() + YEAR);
		}

		//header('Location: '.(isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '.'));
	}
}

?>