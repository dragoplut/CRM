<?php
session_start();
require_once "models/authmodel.php";
class Signin extends AuthModel
{
	//var $isNeedAuth = false;
	function index()
	{
		echo $this->render('views/signin.php', ['pageTitle' => 'Sign in page']);
		if (isset($_POST['login']) && isset($_POST['password']))
		{
			$auth = new AuthModel();
			$result = $auth->checkauth($_POST['login'],$_POST['password']);
			if ($result)
			{
				header('Location: /dashboard/index.php');
			}
			else
			{
				header('Location: /signin/index.php');
			}
		}
	}
}
?>