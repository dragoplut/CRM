<?php
require "controller.php";
class Clients extends Controller
{
	var $isNeedAuth = false;
	function index()
	{
		echo $this->render('views/clients.php', ['pageTitle' => 'Clients table']);
	}
}
?>