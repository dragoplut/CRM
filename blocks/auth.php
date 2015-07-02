<!-- start session php -->
<?php
session_start();
$access = array();
$access = file("blocks/access.php");
$login = trim($access[1]);
$pass = trim($access[2]);
if (!empty($_POST['enter']))
{
$_SESSION['login'] = $_POST['login'];
$_SESSION['pass'] = $_POST['pass'];
}
if (empty($_SESSION['login']) or
	$login != $_SESSION['login'] or
	$pass != $_SESSION['pass'])
{
	?>
	<div class="formcontainer">
	<form class="form-signin" role="form" method="POST" action="index.php">
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