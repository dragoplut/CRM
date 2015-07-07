<!DOCTYPE html>
<html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>
<?php include "blocks/head.php" ?>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<link href="/css/signin.css" rel="stylesheet">
<title>Signin form</title>
</head>
<body>

<!-- connect sign in form -->
<!-- start session php -->
<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
session_start();

if (!isset($_SESSION['auth'])) 
{	
}
else
{
	header('Location: index.php');
}

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
		header('Location: index.php');
		exit;
	}
}
$result->close();
$mysqli->close();
?>
	<div class="formcontainer">
		<form class="form-signin" role="form" method="POST">
			<h2 class="form-signin-heading center-strong">Sign in form</h2>
			<input type="login" class="form-control" placeholder="Your login" required="" autofocus="" name="login" value="">
			<input type="password" class="form-control" placeholder="Password" required="" name="pass" value="">
			<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
			<!-- <a class="form-signin right" href="index.php?logout">Go back</a> -->
		</form>
	</div>
<!-- connect script files -->
<?php include "blocks/script.php" ?>
</body>
</html>