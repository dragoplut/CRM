<?php
session_start();
require_once "models/authmodel.php";
require_once "controller.php";
class Login extends Controller
{
	function index()
	{
		echo $this->render('views/login.php', ['pageTitle' => 'Log in page']);
		if (isset($_POST['login']) && isset($_POST['password']))
		{
			$auth = new AuthModel();
			$result = $auth->checkauth($_POST['login'],$_POST['password']);
			if ($result)
			{
				header('Location: /board/index');
			}
			else
			{
				header('Location: /login/index');
			}
		}
	}
}
?>