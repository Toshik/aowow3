<?php

class MainPage extends GenericPage implements ICacheable_File
{
	var $oneliner;
	var $newstext;
	var $titles;

	public function __create($id)
	{
		parent::__create();

		__autoload('MarkupText');
		$this->oneliner = Cache::Get('MarkupText', MARKUPTEXT_ONELINER);
		$this->newstext = Cache::Get('MarkupText', MARKUPTEXT_NEWSTEXT);

		$this->titles = DB::World()->SelectCol('SELECT text FROM ?_index_titles');
		
		$this->addJS(CLIENTFILE_HOME_JS);
		$this->addCSS(CLIENTFILE_HOME_CSS);
	}

	public function finalize()
	{
		$lines = explode("\n", $this->oneliner->getContents());
		$selected = trim($lines[rand(0, count($lines)-1)]);
		$this->oneliner->setContents($selected);

		$this->setTitle($this->titles[rand(0, count($this->titles)-1)]);
		$this->full_title = WEBSITE_NAME.': '.$this->title;

		$this->display('main');
	}

	function __wakeup()
	{
		parent::__wakeup();
	}

	function __sleep()
	{
		return array_merge(parent::__sleep(), array(
			'oneliner',
			'newstext',
			'titles'
		));
	}

	static function GetCacheLifeTime() { return 30*DAY; }
	function GetCacheHash($id) { return 0; }
	static function GetCacheFolder() { return 'static'; }
	static function GetCacheFileName() { return 'mainpage'; }
}

?>