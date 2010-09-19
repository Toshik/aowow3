<?php

/** Indicates that the current page does not use $user, so it's loading can be skipped. */
interface INotUserSensitive
{
}

/** Indicates that the current page have special role restrictions. INotUserSensitive must not  */
interface IRestrictedPage
{
	static function GetRequiredRoleMask();
}

abstract class GenericPage
{
	var $js = array();
	var $css = array();

	var $path = '';
	var $tab = -1;
	var $contentTypeId = 0;
	var $pageTypeId = 0;

	var $title = '';
	var $full_title = '';
	var $icon = '';

	var $finalized;

	// DYNAMIC DATA
	var $locale;
	var $lang;
	var $user;
	var $query;

	/****************** METHODS ******************/

	// TITLE
	public function setTitle($title)
	{
		$this->title = $title;
		$this->full_title = (empty($title) ? '' : $title.' - ').WEBSITE_NAME;
	}

	// DISPLAYERS
	abstract public function finalize();

	public function display($name)
	{
		$this->finalized = true;
		include('phtml/'.$name.'.php');
	}
	public function brick($name)
	{
		include('phtml/bricks/'.$name);
	}

	// CLIENT FILES
	public function addJS($name, $unshift = false)
	{
		if(!in_array($name, $this->js))
		{
			if($unshift)
				array_unshift($this->js, $name);
			else
				$this->js[] = $name;
		}
	}
	public function addCSS($name, $unshift = false)
	{
		if(!in_array($name, $this->css))
		{
			if($unshift)
				array_unshift($this->css, $name);
			else
				$this->css[] = $name;
		}
	}

	function __create()
	{
		$this->locale = Main::$locale;
		$this->lang = Main::$lang;
		if(Main::$user)
			$this->user = &Main::$user;

		$this->query = $_SERVER['QUERY_STRING'];

		$this->addJS(CLIENTFILE_JQUERY_JS);
		$this->addJS(constant('CLIENTFILE_LOCALE_'.$this->locale.'_JS'));
		$this->addJS(CLIENTFILE_BASIC_JS);
		$this->addJS(CLIENTFILE_GLOBAL_JS);

		$this->addCSS(CLIENTFILE_BASIC_CSS);
		$this->addCSS(CLIENTFILE_GLOBAL_CSS);
		$this->addCSS(constant('CLIENTFILE_LOCALE_'.$this->locale.'_CSS'));
	}

	function __sleep()
	{
		return array(
			'js',
			'css',
			'path',
			'tab',
			'title',
			'full_title',
			'icon'
		);
	}
}

?>