<?php
	$mysqli = new mysqli('localhost','root','1076891','clients') or die ('Unable to connect with MySQl.');
	if (mysqli_connect_errno()) {
		printf ("Unable to connect: %s\n", mysqli_connect_error());
		exit();
	}
	echo ("<div class='container-clients'><table class='container-fluid table-bordered table-clients'>");
	echo ("<tr class='center-strong'>
		<td>Action</td>
		<td>ID</td>
		<td>First name</td>
		<td>Last Name</td>
		<td>Age</td>
		<td>E-mail</td>
		<td>Phone no.</td>
		<td>Address</td>
		<td>Job</td>
		<td>Login</td>
		<td>Password</td>
		</tr>");
	$query = "SELECT id,first_name,last_name,age,address,email,job,login,password,phone_nomber,reg_date FROM clientsinfo ORDER BY id";
	$result = $mysqli->query($query);
	while ($row = $result->fetch_array(MYSQLI_ASSOC))
	{
		echo "<tr>
		<td class='center'><a href='client.php?1'>Edit</a></td>
		<td class='center'>" . $row['id'] . "</td>
		<td>" . $row['first_name'] . "</td>
		<td>" . $row['last_name'] . "</td>
		<td class='center'>" . $row['age'] . "</td>
		<td>" . $row['email'] . "</td>
		<td>" . $row['phone_nomber'] . "</td>
		<td>" . $row['address'] . "</td>
		<td>" . $row['job'] . "</td>
		<td>" . $row['login'] . "</td>
		<td>" . $row['password'] . "</td>		
		</tr></div>";
	}
	echo ("</table>");
	
	$result->free();
	$mysqli->close();
?>