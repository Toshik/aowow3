<?php

class MainPage extends GenericPage
{
	// MarkupText objects
	var $oneliner = NULL;
	var $newstext = NULL;

	public function __construct()
	{
		parent::__construct();

		$this->oneliner = MarkupText::LoadFromDB(MARKUPTEXT_ONELINER);
		$lines = explode("\n", $this->oneliner->contents);
		$selected = $lines[rand(0,count($lines)-1)];
		$this->oneliner->contents = $selected;
		$this->oneliner->parse(U_GROUP_ALL);

		$this->newstext = MarkupText::LoadFromDB(MARKUPTEXT_NEWSTEXT);
		$this->newstext->parse(U_GROUP_ALL);

		// need load title here
	}

	public function finalize()
	{
		$this->display('main');
	}
}

?>