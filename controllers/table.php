<?php
	$mysqli = new mysqli('localhost','root','1076891','clients') or die ('Unable to connect with MySQl.');
	if (mysqli_connect_errno()) 
	{
		printf ("Unable to connect: %s\n", mysqli_connect_error());
		exit();
	}
	$query = "SELECT id,first_name,last_name,age,address,email,job,login,password,phone_nomber,reg_date FROM clientsinfo ORDER BY id";
	$result = $mysqli->query($query);
	while ($row = $result->fetch_array(MYSQLI_ASSOC))
	{

	}
	$result->free();
	$mysqli->close();
?>