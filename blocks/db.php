<?php
	$mysqli = new mysqli('localhost','root','1076891','clients') or die ('Unable to connect with MySQl.');
	if (mysqli_connect_errno()) {
		printf ("Unable to connect: %s\n", mysqli_connect_error());
		exit();
	}
	echo ("<table border = '1' class='formcontainer form-signin'>");
	echo ("<tr><td>ID</td><td>First name</td><td>Last Name</td><td>Age</td></tr>");
	$query = "SELECT id,first_name,last_name,age FROM clientsinfo ORDER BY id DESC";
	$result = $mysqli->query($query);
	while ($row = $result->fetch_array(MYSQLI_ASSOC))
	{
		echo "<tr><td>" . $row['id'] . "</td><td>" . $row['first_name'] . "</td><td>" . $row['last_name'] . "</td><td>" . $row['age'] . "</td><td></tr>";
	}
	echo ("</table>");
	
	$result->free();
	$mysqli->close();
?>