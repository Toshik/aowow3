<?php

class AdminPHPInfoPage extends GenericPage implements IRestrictedPage
{

	function __create()
	{
	}

	public function finalize()
	{
		phpinfo();
	}

	static function GetRequiredRoleMask()
	{
		return U_ADMINISTRATOR;
	}
}

?>