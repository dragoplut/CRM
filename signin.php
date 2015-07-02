<!DOCTYPE html>
<html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>
<?php include "blocks/head.php" ?>
<link href="/css/signin.css" rel="stylesheet">
<title>Signin form</title>
</head>
<body>
<?php include "blocks/header.php";?>
<?php include "blocks/leftmenu.php";?>
<?php include "blocks/footer.php";?>

<!-- start session php -->
<?php
session_start();
if ($_POST['login']=='admin' && $_POST['pass']=='pwd') $_SESSION['auth']='1';
if (isset($_GET['logout'])) unset($_SESSION['auth']);
?>

<!-- signin form -->
<div class="container">
<form class="form-signin" role="form" method="POST" action="signin.php">
<h2 class="form-signin-heading">Sign in form</h2>
<input type="email" class="form-control" placeholder="Email address" required="" autofocus="" name="email">
<input type="password" class="form-control" placeholder="Password" required="" name="pass">
<input value="send">
<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
</form>
</div>

<!-- signin log in php code -->
<?php
if (isset($_SESSION['auth']))echo 'You are authorised, <a href="/signin.php?logout">Exit</a>'; 
else {?><br><form method='POST' action='signin.php'><br>Login<input type='password' name='pass'>
<br><br><input type='submint' value='authorise'><br></form>
<br>You are not authorised <br><?}
?><br>

<!-- signin log out php code -->
<?php
if (isset($_GET[logout])) {
unset($_SESSION['auth']);
echo "Log out success";
}
?>
<a href="/signin.php?logout">Exit</a>

<!-- connect script files -->
<?php include "blocks/script.php" ?>

</body>
</html>