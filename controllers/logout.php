<?php
session_start();
class Logout
{
	function __construct()
	{
		session_unset();
		session_destroy();
		header('Location: /login/index');
	}
}
?>