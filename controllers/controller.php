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
		require "models/authmodel.php";
		$auth = new AuthModel();
		$result = $auth->checkauth($_POST['login'],$_POST['password']);
		if ($result)
		{
			header('Location: /dashboard/index.php');
		}
		else
		{
			echo $this->render('views/signin.php', ['pageTitle' => 'Sign in page']);
		}		
//		if (!isset($_SESSION['auth'])) 
//		{
//		    header('Location: /signin/index');
//		}
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