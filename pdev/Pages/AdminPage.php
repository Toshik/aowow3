<?php

require_once('pdev/AdminEnums.php');

abstract class AdminPage extends GenericPage implements IRestrictedPage, ITemplate
{
	function __create()
	{
		parent::__create();

		$this->addJS(CLIENTFILE_ADMIN_JS);
		$this->addCSS(CLIENTFILE_ADMIN_CSS);
		$this->addTitleTreeElement('Admin');
	}

	final static function GetTemplateName()
	{
		return 'admin';
	}

	final function GetActiveTab()
	{
		return TAB_STAFF;
	}

	function __sleep()
	{
		return parent::__sleep();
	}
}
