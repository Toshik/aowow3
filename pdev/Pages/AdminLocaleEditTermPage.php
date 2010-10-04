<?php

class AdminLocaleEditTermPage extends AdminPage implements IRestrictedPage
{
	var $term_id;
	var $term_name;
	var $data;
	var $edit_message;

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

		// saving
		if ($this->term_id = Get(GET_INT, 'term_id', 'POST'))
		{
			$this->data = DB::World()->SelectRow('SELECT * FROM ?_terms WHERE id = ?', $this->term_id);
			if ($this->data)
			{
				$this->edit_message = '';

				if ($this->data['textid'] != ($new = Get(GET_STRING, 'term', 'POST')))
				{
					DB::World()->Query('UPDATE ?_terms SET textid = ? WHERE id = ?', $new, $this->term_id);
					$this->edit_message .= 'ID changed.<br />';
				}

				if ($this->user->HasRoles(U_GROUP_SUPREME))
				{
					if ((($this->data['flags'] & TERMFLAG_CONTAINS_HTML) != 0) != ($new = Get(GET_BOOL, 'allow_html', 'POST')))
					{
						if ($new)
							DB::World()->Query('UPDATE ?_terms SET flags = flags | ?d WHERE id = ?', TERMFLAG_CONTAINS_HTML, $this->term_id);
						else
							DB::World()->Query('UPDATE ?_terms SET flags = flags & ~?d WHERE id = ?', TERMFLAG_CONTAINS_HTML, $this->term_id);

						$this->edit_message .= 'Allow HTML turned '.($new ? 'ON' : 'OFF').'<br />';
					}
				}

				foreach (Main::$locales as $loc)
				{
					if ($this->data['content_loc'.$loc] != ($new = Get(GET_STRING, 'text_loc'.$loc, 'POST')))
					{
						DB::World()->Query('UPDATE ?_terms SET content_loc?d = ? WHERE id = ?', $loc, $new, $this->term_id);
						$this->edit_message .= 'Text '.Main::$languages[$loc].' changed.<br />';
					}
				}

				if ($this->data['comments'] != ($new = Get(GET_STRING, 'comments', 'POST')))
				{
					DB::World()->Query('UPDATE ?_terms SET comments = ? WHERE id = ?', $new, $this->term_id);
					$this->edit_message .= 'Comments changed.<br />';
				}
			}
		}
		// usual
		if($this->term_id || ($this->term_id = Get(GET_INT, 'term', 'GET')))
		{
			$this->data = DB::World()->SelectRow('SELECT * FROM ?_terms WHERE id = ?', $this->term_id);
			if ($this->data)
			{
				$this->term_name = $this->data['textid'];
				$this->addTitleTreeElement('Edit Term '.$this->term_name.' - Locale');
			}
		}
	}

	public function finalize()
	{
		if (!$this->data)
			Main::page_404();
		else
			$this->display('admin_locale_editterm');
	}
}
