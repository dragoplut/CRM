<?php
class Controller
{
	function Controller()
	{
		if (!$_SESSION) 
		{
			//header('Location: /signin/index.php');			
		}	
	}
	var $isNeedAuth = true;
	function render($view, $vars) 
	{ 
	extract($vars);
	ob_start(); 
	include($view);
	return ob_get_clean(); 
	}	
}
?>