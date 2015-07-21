<?php
class Logout
{
	function Logout()
	{
		session_start();
		unset ($_SESSION);
		//$_POST['signin'] = true;
		header('Location: /signin/index');	
	}
}
?>