<?php

/** Indicates that the current page does not use $user, so it's loading can be skipped. */
interface INotUserSensitive
{
}

/** Indicates that the current page have special role restrictions. */
interface IRestrictedPage
{
	static function GetRequiredRoleMask();
}

interface IIPRestrictedPage
{
	static function ValidateIP($ip);
}

interface ITemplate
{
	static function GetTemplateName();
	function GetActiveTab();
	function GetPath();
}

abstract class GenericPage
{
	var $js = array();
	var $css = array();
	
	protected $title_tree = array();
	var $title = '';
	var $icon = '';

	// DYNAMIC DATA
	var $locale;
	var $lang;
	var $user;
	var $query;

	/****************** METHODS ******************/

	// TITLE
	public final function addTitleTreeElement($element)
	{
		array_unshift($this->title_tree, $element);
		$this->generateTitle();
	}

	public final function generateTitle()
	{
		$this->title = implode(' - ', $this->title_tree);
	}

	// DISPLAYERS
	public abstract function finalize();

	public final function display($name)
	{
		include('phtml/'.$name.'.php');
	}
	public final function brick($name)
	{
		include('phtml/bricks/'.$name);
	}

	// CLIENT FILES
	public final function addJS($name, $unshift = false)
	{
		if(!in_array($name, $this->js))
		{
			if($unshift)
				array_unshift($this->js, $name);
			else
				$this->js[] = $name;
		}
	}
	public final function addCSS($name, $unshift = false)
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
		$this->addTitleTreeElement(WEBSITE_NAME);
		$this->initDynamicData();
	}

	private final function initDynamicData()
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
			'title_tree',
			'icon'
		);
	}

	function __wakeup()
	{
		$this->generateTitle();
		$this->initDynamicData();
	}

	// BRICK GENERATION

	public final function CreateTabs($id = false, $lv = false)
	{
		$hash = ($id === false) ? substr(md5(rand()), 6) : $id;

		if ($id === false)
			echo '<div id="'.$hash.'"></div>';

		if ($lv)
			echo '<div id="lv-'.$hash.'" class="listview">';

		echo '<script type="text/javascript">';
		echo 'var TB'.$hash.' = new Tabs({parent: ge("'.$hash.'")});';

		return 'TB'.$hash;
	}

	public final function FlushTabs($name)
	{
		echo $name.'.flush();</script>';
	}

	public final function CreateSingleListview($params, $data, $extraCols = array(), $hiddenCols = array(), $additional_vars = array())
	{
		if (!$params['id'])
			$params['id'] = substr(md5(rand()), 8);

		if ($params['parent'])
			unset($params['parent']);

		echo '<div id="lv-'.$params['id'].'" class="listview"></div><script type="text/javascript">';
		$this->CreateListviewJs($params, $data, $extraCols, $hiddenCols, $additional_vars);
		echo '</script>';
	}

	public final function CreateListviewJs($params, $data, $extraCols = array(), $hiddenCols = array(), $additional_vars = array())
	{
		$x = 'new Listview({';

		if ($params['template'])
			$x .= 'template:"'.$params['template'].'",';

		if ($params['id'])
			$x .= 'id:"'.$params['id'].'",';

		if ($params['name'])
			$x .= 'name:'.$params['name'].',';

		if ($params['parent'])
			$x .= 'parent:"'.$params['parent'].'",';

		if ($params['tabs'])
			$x .= 'tabs:'.$params['tabs'].',';

		if ($params['note'])
			$x .= 'note:'.$params['note'].',';

		if ($extraCols)
			$x .= 'extraCols:['.implode(',', $extraCols).'],';

		if ($hiddenCols)
			$x .= 'hiddenCols:'.json_encode($hiddenCols).',';

		foreach ($additional_vars as $key => $value)
			$x .= $key.':'.$value.',';

		$x .= 'data:'.(is_string($data) ? $data : json_encode($data));

		$x .= '});';

		echo $x;
	}
}

?>