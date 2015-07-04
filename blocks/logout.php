<?php
	session_start();
	unset($_SESSION['auth']);
	header('Location: blocks/signin.php');
?>