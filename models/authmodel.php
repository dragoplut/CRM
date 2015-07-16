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
		if (isset($_POST['login']) && isset($_POST['password']))
		{
			if ($_POST['login'] == $row['login'] && $_POST['password'] == $row['password']) 
			{
				$_SESSION['auth']='1';
				$checkauth = true;				
			}
			else
			{
				$checkauth = false;
			}
		}
		$result->close();
		$mysqli->close();
	}
}
?>