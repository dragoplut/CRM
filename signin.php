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

if (isset($_POST['login']) && isset($_POST['pass']))
{
if ($_POST['login']==='admin' && $_POST['pass']==='pwd') {
	$_SESSION['auth']='1'
	header('Location: index.php');
	exit;
}
}
	?>
	<div class="formcontainer">
	<form class="form-signin" role="form" method="POST">
	<h2 class="form-signin-heading">Sign in form</h2>
	<input type="login" class="form-control" placeholder="Your login" required="" autofocus="" name="login" value="">
	<input type="password" class="form-control" placeholder="Password" required="" name="pass" value="">
	<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
	<a class="form-signin right" href="index.php?logout">Go back</a>
	</form>
	</div>
	<?php
	die;
}
?>

<!-- connect script files -->
<?php include "blocks/script.php" ?>

</body>
</html>