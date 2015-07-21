<?php
require_once "controller.php";
class Dashboard extends Controller
{
	//var $isNeedAuth = false;
	function index()
	{
	echo $this->render('views/dashboard.php', ['pageTitle' => 'Dashboard']);
	}
}
?>