<?php

enum(array( // AcctError
	'ACCT_USERNAME_LENGTH'	=> 'activate_usernamelength',
	'ACCT_PASSWORD_LENGTH'	=> 'activate_passwordlength',
	'ACCT_USERNAME_SYMBOLS'	=> 'activate_invalidusername',
	'ACCT_PASSWORD_SYMBOLS'	=> 'activate_invalidpassword',
	'ACCT_EMAIL_SYMBOLS'	=> 'signup_emailinvalid',

	'ACCT_PASSWORDS_NOT_EQUAL'	=> 'signup_passwordsnotequal',
	'ACCT_USERNAME_EXISTS'		=> 'activate_usernameinuse',
	'ACCT_NO_SUCH_ACCT'			=> 'signin_un_or_pass_fail',
	'ACCT_IP_LOCKED'			=> 'signin_ip_locked',

	'ACCT_SIGNUP_BLOCKED'	=> 'signup_blocked',
	'ACCT_SIGNIN_BLOCKED'	=> 'signin_blocked',

	'ACCT_INTERNAL_ERROR'	=> 'internal_error',
));

enum(array( // UserPropsLimits
	'USERNAME_LENGTH_MIN'	=> 4,
	'USERNAME_LENGTH_MAX'	=> 16,
	'PASSWORD_LENGTH_MIN'	=> 6,
	'PASSWORD_LENGTH_MAX'	=> 16,
));

class AccountPage extends GenericPage
{
	var $type;
	var $acct_error;

	function __create()
	{
		parent::__create();

		$this->type = Get(GET_STRING, 'account');

		if(!in_array($this->type, array('dashboard','', 'signin','signup', 'signin_do','signup_do', 'signout')))
			Main::page_404();

		switch($this->type)
		{
			case 'signin':
				if($this->user)
					$this->dashboard();
				else
					$this->signin();
				break;
			case 'signup':
				if($this->user)
					$this->dashboard();
				else
					$this->signup();
				break;
			case 'signup_do':
				if($this->user)
					$this->dashboard();
				else
					$this->register();
				break;
			case 'signin_do':
				if($this->user)
					$this->dashboard();
				else
					$this->login();
				break;
			case 'signout':
				if($this->user)
					$this->logout();
				else
					Main::page_redirect('.');
				break;
			case '':
			case 'dashboard':
			default:
				if($this->user)
					$this->dashboard();
				else
					$this->signin();
				break;
		}
	}

	/////////////////////////////////
	// Everything needed for these handlers
	// is checked in the constructor.

	private function signin()
	{
		$this->type = 'signin';
	}

	private function signup()
	{
		$this->type = 'signup';
	}

	private function dashboard()
	{
		$this->type = 'dashboard';
		// need fill user data here
	}

	private function register()
	{
		$username = Get(GET_STRING, 'username', 'POST');
		$password = Get(GET_STRING, 'password', 'POST');
		$pwd2 = Get(GET_STRING, 'password2', 'POST');
		$email = Get(GET_STRING, 'email', 'POST');
		$remember = Get(GET_BOOL, 'remember_me', 'POST');

		if($password != $pwd2)
		{
			$this->acct_error = ACCT_PASSWORDS_NOT_EQUAL;
			$this->type = 'signup';
			return;
		}

		// Check length
		if(strlen($username) > USERNAME_LENGTH_MAX || strlen($username) < USERNAME_LENGTH_MIN)
		{
			$this->acct_error = ACCT_USERNAME_LENGTH;
			$this->type = 'signup';
			return;
		}
		if(strlen($password) > PASSWORD_LENGTH_MAX || strlen($password) < PASSWORD_LENGTH_MIN)
		{
			$this->acct_error = ACCT_PASSWORD_LENGTH;
			$this->type = 'signup';
			return;
		}

		// Check symbols
		if(preg_match('/[^\w\d]/i', $username))
		{
			$this->acct_error = ACCT_USERNAME_SYMBOLS;
			$this->type = 'signup';
			return;
		}
		if(preg_match('/[^\w\d!"#\$%]/', $password))
		{
			$this->acct_error = ACCT_PASSWORD_SYMBOLS;
			$this->type = 'signup';
			return;
		}
		if(!preg_match('/^([a-z0-9._-]+)(\+[a-z0-9._-]+)?(@[a-z0-9.-]+\.[a-z]{2,4})$/i', $email))
		{
			$this->acct_error = ACCT_EMAIL_SYMBOLS;
			$this->type = 'signup';
			return;
		}

		// After 5 signup tries in a row,
		// or after a single successful signup,
		// the signup feature is blocked for 3 min
		// and the time is expanded to full-time block.

		DB::Realm()->Query('DELETE FROM account_ip_signup WHERE ip = ? AND time <= ?d', $_SERVER['REMOTE_ADDR'], time() - 3*MINUTE);
		DB::Realm()->Query('INSERT IGNORE INTO account_ip_signup (ip,time,tries) VALUES (?,?d,?d)', $_SERVER['REMOTE_ADDR'], time(), 0);
		$tries = DB::Realm()->SelectCell('SELECT tries FROM account_ip_signup WHERE ip = ?', $_SERVER['REMOTE_ADDR']);
		if($tries >= 5)
		{
			DB::Realm()->Query('UPDATE account_ip_signup SET time = ?d WHERE ip = ?', time(), $_SERVER['REMOTE_ADDR']);
			$this->acct_error = ACCT_SIGNUP_BLOCKED;
			$this->type = 'signup';
			return;
		}
		DB::Realm()->Query('UPDATE account_ip_signup SET tries = tries + 1 WHERE ip = ?', $_SERVER['REMOTE_ADDR']);

		$result = DB::Realm()->SelectCell('SELECT 1 FROM account WHERE username = ?', $username);
		if($result)
		{
			$this->acct_error = ACCT_USERNAME_EXISTS;
			$this->type = 'signup';
			return;
		}

		DB::Realm()->Query('UPDATE account_ip_signup SET tries = tries + 5 WHERE ip = ?', $_SERVER['REMOTE_ADDR']);
		$id = DB::Realm()->Query('
				INSERT INTO account (username,sha_pass_hash,email,joindate,expansion,last_ip)
				VALUES (?,?,?,NOW(),?d,?)
			',
			strtoupper($username),
			$hash = AccountPage::CreateHash($username, $password),
			strtolower($email),
			2,
			$_SERVER['REMOTE_ADDR']
		);
		if($id)
		{
			DB::Realm()->Query('UPDATE account_ip_signup SET tries = tries + 5 WHERE ip = ?', $_SERVER['REMOTE_ADDR']);
			DB::Realm()->Query('INSERT INTO account_aowow_extend (id,name) VALUES (?d,?)', $id, 'user-'.wn_create($id, WN_));

			$us = new User($id);
			if($us->Auth($hash) == AUTH_OK)
				$us->SetAuthCookies($remember);
			else
			{
				$this->acct_error = ACCT_INTERNAL_ERROR;
				$this->type = 'signin';
				return;
			}
		}
		else
		{
			$this->acct_error = ACCT_INTERNAL_ERROR;
			$this->type = 'signup';
			return;
		}
	}

	private function login()
	{
		$username = Get(GET_STRING,	'username', 'POST');
		$password = Get(GET_STRING,	'password', 'POST');
		$remember = Get(GET_BOOL,	'remember_me', 'POST');

		// After 5 signin tries in a row,
		// or after a single successful signin,
		// the signin feature is blocked for 3 min
		// and the time is expanded to full-time block.

		DB::Realm()->Query('DELETE FROM account_ip_signin WHERE ip = ? AND time <= ?d', $_SERVER['REMOTE_ADDR'], time() - 3*MINUTE);
		DB::Realm()->Query('INSERT IGNORE INTO account_ip_signin (ip,time,tries) VALUES (?,?d,?d)', $_SERVER['REMOTE_ADDR'], time(), 0);
		$tries = DB::Realm()->SelectCell('SELECT tries FROM account_ip_signin WHERE ip = ?', $_SERVER['REMOTE_ADDR']);
		if($tries >= 5)
		{
			DB::Realm()->Query('UPDATE account_ip_signin SET time = ?d WHERE ip = ?', time(), $_SERVER['REMOTE_ADDR']);
			$this->acct_error = ACCT_SIGNIN_BLOCKED;
			$this->type = 'signin';
			return;
		}
		DB::Realm()->Query('UPDATE account_ip_signin SET tries = tries + 1 WHERE ip = ?', $_SERVER['REMOTE_ADDR']);

		$id = DB::Realm()->SelectCell('SELECT id FROM account WHERE username = ?', $username);
		if(!$id)
		{
			$this->acct_error = ACCT_NO_SUCH_ACCT;
			$this->type = 'signin';
			return;
		}

		$us = new User($id);
		switch($us->Auth(AccountPage::CreateHash($username, $password)))
		{
			case AUTH_BANNED:					// banned page will be displayed
			case AUTH_OK:
				$us->SetAuthCookies($remember);
				return;
			case AUTH_WRONGPASS:
				$this->acct_error = ACCT_NO_SUCH_ACCT;
				$this->type = 'signin';
				return;
			case AUTH_IPLOCKED:
				$this->acct_error = ACCT_IP_LOCKED;
				$this->type = 'signin';
				return;
			default:
				return;
		}
	}

	private function logout()
	{
		SetCookie('wh_o', '', time() - MONTH);
		SetCookie('auth', '', time() - MONTH);
	}

	/////////////////////////////////

	public function finalize()
	{
		switch($this->type)
		{
			case 'signin_do':
			case 'signup_do':
				if($next = Get(GET_STRING, 'b'))
					Main::page_redirect('?'.wn_sdestroy($next, WN_KEY_BACKURL));
				else
					Main::page_redirect('?account=dashboard');
				break;
			case 'signout':
				Main::page_redirect('.');
				break;
			default:
				// Existance and correctness checked in constructor.
				$this->display('account'.($this->type ? '_'.$this->type : ''));
				break;
		}
	}

	/////////////////////////////////
	///// STATIC HELPER METHODS /////

	public static function CreateHash($username, $password)
	{
		return sha1(strtoupper($username.':'.$password));
	}
}

?>