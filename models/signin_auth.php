<?php
	$mysqli = new mysqli('localhost','root','1076891','clients') or die ('Unable to connect with MySQl.');
	if (mysqli_connect_errno()) 
	{
		printf ("Unable to connect: %s\n", mysqli_connect_error());
		exit();
	}	
	$query = ("SELECT login,password FROM clientsinfo");
	$result = $mysqli->query($query);
	$row = $result->fetch_array(MYSQLI_ASSOC);
	if (isset($_POST['login']) && isset($_POST['pass']))
	{
		if ($_POST['login'] == $row['login'] && $_POST['pass'] == $row['password']) 
		{
			$_SESSION['auth']='1';
			header('Location: /dashboard/index.php');
			exit;
		}
	}
	$result->close();
	$mysqli->close();
?>