<?php
require "controller.php";
class Signin extends Controller
{
	var $isNeedAuth = false;
	function index()
	{
		echo $this->render('views/signin.php', ['pageTitle' => 'Sign in page']);
	}
}
?>