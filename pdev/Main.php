<?php

require_once('pdev/Shared.php');
__autoload('Cache');

define('INDEX_ID', '#index');

class Main
{
	private static $pageMap = array(
		'admin'		=> array(
			'terms'		=> 'TermTestPage',
		),
		INDEX_ID	=> array(
			INDEX_ID	=> 'MainPage',
			'locale'	=> 'LocaleChangePage',
			'account'	=> 'AccountPage',
			'term-test'	=> 'TermTestPage',
		),
		/*'editors-lounge'	=> array(
			''	=> array(array('EditorsLounge','HandleIndex'),	U_GROUP_EDITORS),
		),*/
	);

	public static $locales = array(0, 8);
	public static $languages = array(
		0 => 'enus',
		8 => 'ruru',
	);
	
	public static $roles = array(
		U_MODERATOR			=> 'role_moderator',
		U_GAMEMASTER		=> 'role_gamemaster',
		U_ADMINISTRATOR		=> 'role_administrator',
		U_DEVELOPER			=> 'role_developer',
		U_TESTER			=> 'role_tester',
		U_VIP				=> 'role_vip',
	);

	public static $locale;
	public static $lang;
	public static $user = NULL;
	public static $page = NULL;
	
	public static $gathered = array();

	public static function Handle($query)
	{
		$version = file_exists('./version') ? intval(file_get_contents('./version')) : 0;

		if(!defined('VERSION') || $version != VERSION)
		{
			require('phtml/maintenance.php');

			// Launch migration system:
			//  - Rebuild all php data files
			//  - Rebuild all client files
			//  - Drop cache
			
			Maintainer::AcquireLock();

			Maintainer::BuildPHPFiles();
			Maintainer::BuildClientFiles();

			if ($version > 0)
			{
				global $_CONFIG;
				$_CONFIG['VERSION'] = $version;
			}

			Maintainer::SaveConfig();

			Maintainer::ReleaseLock();

			exit;
		}

		require_once('./cache/generated.php');

		// Split query into parts
		if(preg_match('/^(([\w\-]+)&)?([^&]*)&?/i', $query, $matches))
		{
			// Set lang & locale...
			self::$locale = DEFAULT_LOCALE;
			if(isset($_COOKIE['wh_l']))
			{
				$loc = @intval($_COOKIE['wh_l']);
				if(in_array($loc, self::$locales))
					self::$locale = $loc;
			}
			self::$lang = self::$languages[self::$locale];
			// Load localized data...
			require_once('./cache/locale.'.self::$lang.'.php');
			
			// Now actually handle the page...
			$category = $matches[2];
			$actual_query = $matches[3];
			
			@list($actual_query, $stuff) = explode('=', $actual_query, 2);

			// We need this for cases when query = 'bugtracker' (example)
			if(empty($category) && isset(self::$pageMap[$actual_query]))
			{
				$category = $actual_query;
				$actual_query = '';
			}

			if(empty($category))
				$category = INDEX_ID;
			if(empty($actual_query))
				$actual_query = INDEX_ID;

			if(isset(self::$pageMap[$category][$actual_query]))
				$pageName = self::$pageMap[$category][$actual_query];
			else
				self::page_404();

			if (!class_exists($pageName, true))
				exit('Error in page map: '.$pageName.' not found.');

			$special_roles = implements_interface($pageName, 'IRestrictedPage');

			// Load user...
			if ($special_roles || !implements_interface($pageName, 'INotUserSensitive'))
			{
				if(isset($_COOKIE['wh_o']) && isset($_COOKIE['auth']))
				{
					$user_id = wn_destroy($_COOKIE['wh_o'], WN_KEY_WEBUSERID);
					$user_pw = wn_sdestroy($_COOKIE['auth'], WN_KEY_WEBUSERAUTH);
					if($user_id && $user_pw)
					{
						$us = new User($user_id);
						switch($us->Auth($user_pw))
						{
							case AUTH_OK:
								self::$user = &$us;
								break;
							case AUTH_WRONGPASS:
							case AUTH_IPLOCKED:
								$us = NULL;
								break;
							case AUTH_BANNED:
								// TODO: need display cool page
								exit;
						}
					}
				}
			}

			if ($special_roles)
			{
				$roles = $pageName::GetRequiredRoleMask();
				if (!self::$user->HasRoles($roles))
					self::page_404();
			}

			self::$page = Cache::Get($pageName);
			self::$page->finalize();
		}
	}
	
	// Basic page handlers.
	public static function page_404()
	{
		self::$page = NULL;
		self::$page = new Error404Page();
		self::$page->finalize();
		exit;
	}

	public static function page_redirect($relative_url, $local = true)
	{
		self::$page = new RedirectPage($relative_url);
		self::$page->finalize();
		exit;
	}
}

?>