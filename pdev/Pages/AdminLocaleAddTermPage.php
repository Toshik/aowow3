<?php
 
class AdminLocaleAddTermPage extends AdminPage implements IRestrictedPage
{
	var $redirect;

	static function GetRequiredRoleMask()
	{
		return U_GROUP_EDITORS;
	}

	function GetPath()
	{
		return '['.TAB_STAFF.',3,2]';
	}

	function __create()
	{
		parent::__create();

		$textid = strtolower(trim(Get(GET_STRING, 'term', 'POST')));

		if (empty($textid))
			$this->redirect = '?admin&locale-search&add='.urlencode($textid).'&reason='.urlencode('text is empty');
		elseif (preg_match('/[^\w\d_]/i', $textid))
			$this->redirect = '?admin&locale-search&add='.urlencode($textid).'&reason='.urlencode('restricted symbols');
		elseif (DB::World()->SelectCell('SELECT 1 FROM ?_terms WHERE textid = ?', $textid))
			$this->redirect = '?admin&locale-search&add='.urlencode($textid).'&reason='.urlencode('already exists');
		elseif (!$id = DB::World()->Query('INSERT INTO ?_terms (textid) VALUES (?)', $textid))
			$this->redirect = '?admin&locale-search&add='.urlencode($textid).'&reason='.urlencode('internal error');
		else
			$this->redirect = '?admin&locale-edit-term&term='.$id.'&name='.urlencode($textid);
	}

	public function finalize()
	{
		Main::page_redirect($this->redirect, true);
	}
}
