<?php
	$mysqli = new mysqli('localhost','root','1076891','clients') or die ('Unable to connect with MySQl.');
	if (mysqli_connect_errno()) {
		printf ("Unable to connect: %s\n", mysqli_connect_error());
		exit();
	}
	$query = "SELECT id,firs_name,last_name,age FROM clientsinfo ORDER BY id DESC";
	$result = $mysqli->query($query);
	while ($row = $result->fetch_array())
	{
		$rows[] = $row;	
	}
	
	foreach ($rows as $row) 
	{
		echo $row['firs_name'];
	}

	$result->close();
	$mysqli->close();
?>