<?php
require "controller.php";
class Clients extends Controller
{
	//var $isNeedAuth = false;
	function index()
	{
		//require "models/clients_table.php";
		//$model = new $result;
		//$data = $model -> getall($row);
		//$clients => $data
		echo $this->render('views/clients.php', ['pageTitle' => 'Clients table']);
	}
}
?>