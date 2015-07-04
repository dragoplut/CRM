<?php
	session_start();
	unset($_SESSION['auth']);
	header('Location: /signin.php');
?>