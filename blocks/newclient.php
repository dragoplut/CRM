<?php
	$mysqli = new mysqli('localhost','root','1076891','clients') or die ('Unable to connect with MySQl.');
	if (mysqli_connect_errno()) 
	{
	printf ("Unable to connect: %s\n", mysqli_connect_error());
	exit();
	}
	$justno = "1";
	$queryid = ("SELECT id FROM clientsinfo ORDER BY id DESC");
	$result = $mysqli->query($queryid);
	$row = $result->fetch_array(MYSQLI_ASSOC);
	$last_id = ($row['id']+$justno);
	$new_client = 'new_client';
	$query = $mysqli->prepare("INSERT INTO clientsinfo (id,first_name) VALUES (?,?)");
	$query->bind_param('is',$last_id,$new_client);
	$query->execute();
	$query->close();
	header('Location: /clients.php');
?>