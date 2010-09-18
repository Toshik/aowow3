<?php

class MainPage extends GenericPage
{
	var $oneliner;
	var $newstext;
	var $titles;

	public function __create()
	{
		parent::__create();

		require_once('pdev/MarkupText.php');
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
	}

	function __sleep()
	{
		return array(
			'oneliner',
			'newstext',
			'titles'
		);
	}
}

?>