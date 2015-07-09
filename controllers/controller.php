<?php
class Controller
{
	var $isNeedAuth = true;
	function __construct()
	{
		session_start();		
		if ($this->isNeedAuth) 
		{
			$this->checkAuth();
		}
	}
	function checkAuth()
	{
		if (!isset($_SESSION['auth'])) 
		{
		    header('Location: /signin/index');
		}
	}
	function render($view, $vars) 
	{ 
	extract($vars);
	ob_start(); 
	include($view);
	return ob_get_clean(); 
	}
}
?>