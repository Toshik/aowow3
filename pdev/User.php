<?php

enum(array( // AuthResult
	'AUTH_OK',
	'AUTH_WRONGPASS',
	'AUTH_BANNED',
	'AUTH_IPLOCKED'
));

class User
{
	var $id;
	var $username;
	var $name;
	var $password;
	var $email;

	var $lastip;
	var $lastlogin;
	var $joindate;
	var $isLocked;
	var $nPB;

	var $roles;

	var $character_guid;
	var $character_name;
	var $update_time;

	// Flags
	var $webFlags;
	//var $flags2;	// Billing Flags
	//var $flags3;	// Extra Flags
	//var $flags4;	// Security Flags (basically gm level)

	var $ban;
	var $mute;

	public function __construct($user_id)
	{
		$this->id = $user_id;

		$query = DB::Realm()->SelectRow('
				SELECT a.username, LOWER(a.sha_pass_hash) AS sha_pass_hash, a.last_ip, a.email, a.last_login, a.joindate, a.locked, a.pb,
					x.name, x.mute, x.ban, x.role, x.description, x.update_time, x.character, x.character_name, x.flags
				FROM account a
				LEFT JOIN account_aowow_extend x ON a.id = x.id
				WHERE a.id = ? LIMIT 1
			',
			$user_id
		);

		if($query)
		{
			$this->username	= $query['username'];
			$this->password	= strtolower($query['sha_pass_hash']);
			$this->name		= $query['name'];
			$this->email	= $query['email'];

			$this->lastip	= $query['last_ip'];
			$this->lastlogin= $query['last_login'];
			$this->joindate	= $query['joindate'];
			$this->isLocked = $query['locked'] == 1;
			$this->nPB		= $query['pb'];

			$this->roles	= $query['role'];

			$this->character_guid	= $query['character'];
			$this->character_name	= $query['character_name'];
			$this->update_time		= $query['update_time'];

			$this->webFlags	= $query['flags'];

			$this->ban		= $query['ban'];
			$this->mute		= $query['mute'];
		}
	}

	public function IsInGroup($group)
	{
		return ($this->roles & $group) != 0;
	}

	public function Auth($password_hash)
	{
		if($this->password != strtolower($password_hash))
			return AUTH_WRONGPASS;

		if($this->ban > time())
			return AUTH_BANNED;

		if($this->isLocked && $this->lastip != $_SERVER['REMOTE_ADDR'])
			return AUTH_IPLOCKED;

		return AUTH_OK;
	}

	public function SetAuthCookies($remember)
	{
		if($remember)
		{
			SetCookie('wh_o', wn_create($this->id, WN_KEY_WEBUSERID), time() + MONTH);
			SetCookie('auth', wn_screate($this->password, WN_KEY_WEBUSERAUTH), time() + MONTH);
		}
		else
		{
			SetCookie('wh_o', wn_create($this->id, WN_KEY_WEBUSERID));
			SetCookie('auth', wn_screate($this->password, WN_KEY_WEBUSERAUTH));
		}
	}
}

?>