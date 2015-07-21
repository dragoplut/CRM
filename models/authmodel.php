<?php
class AuthModel
{
	function checkauth($login, $password)
	{
		$mysqli = new mysqli('localhost','root','1076891','clients') or die ('Unable to connect with MySQl.');
		if (mysqli_connect_errno()) 
		{
			printf ("Unable to connect: %s\n", mysqli_connect_error());
			exit();
		}	
		$query = ("SELECT login,password FROM clientsinfo");
		$result = $mysqli->query($query);
		$row = $result->fetch_array(MYSQLI_ASSOC);
		
			if ($_POST['login'] == $row['login'] && $_POST['password'] == $row['password'])
			{
				$_SESSION['auth'] = true;
				$session = true;
			}

		$result->close();
		$mysqli->close();
		return $session;
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