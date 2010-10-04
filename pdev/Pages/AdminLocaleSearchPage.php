<?php

enum(array(
	'MATCH_EXACT'		=> 0,
	'MATCH_STARTS_WITH'	=> 1,
	'MATCH_CONTAINS'	=> 2,
));

class AdminLocaleSearchPage extends AdminPage
{
	var $terms = null;

	static function GetRequiredRoleMask()
	{
		return U_GROUP_EDITORS;
	}

	function __create()
	{
		parent::__create();

		$this->addTitleTreeElement('Manage Terms - Locale');

		// search
		if (isset($_REQUEST['term']))
		{
			$term = Get(GET_STRING, 'term', 'REQUEST');
			$text = Get(GET_STRING, 'text', 'REQUEST');
			$locale = Get(GET_INT, 'locale', 'REQUEST');
			$match = Get(GET_INT, 'matchtype', 'REQUEST');
			$nolocalized = Get(GET_BOOL, 'nolocalized', 'REQUEST');

			if (!in_array($locale, Main::$locales))
				$locale = 0;

			if (!empty($text))
			{
				$text = sqlEscape($text);

				if ($match == MATCH_EXACT)
					$text = $text;
				else if($match == MATCH_STARTS_WITH)
					$text = $text.'%';
				else if($match == MATCH_CONTAINS)
					$text = '%'.$text.'%';
			}

			$this->terms = DB::World()->Select('
					SELECT id, textid, '.AllLocales('content').'
					FROM ?_terms
					WHERE
						1=1
						{ AND textid LIKE ? }
						{ AND content_loc?d LIKE ? }
						{ AND (content_loc?d IS NULL OR content_loc?d = "") }
					LIMIT 200
				',
				empty($term) ? DBSIMPLE_SKIP : '%'.sqlEscape($term).'%',
				!empty($text) ? $locale : DBSIMPLE_SKIP,
				$text,
				$nolocalized ? $locale : DBSIMPLE_SKIP,
				$locale
			);
		}
	}

	public function finalize()
	{
		$this->display('admin_locale_search');
	}

	function GetPath()
	{
		return '['.TAB_STAFF.',3,2]';
	}
}

?>