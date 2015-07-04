<?php
	$mysqli = mysqli_connect('localhost','root','1076891','db/clients.db') or die ('Unable to connect with MySQl.');
	$result = $mysqli->query("SELECT 'id','firs_name','last_name','age' FROM 'clientsinfo' ORDER BY 'id' DESC");
	echo ("<table border = '1'>");
	echo ("<tr><td>ID</td><td>Firs name</td><td>Last Name</td><td>Age</td></tr>");
	while ($tablerows = $result->fetch_assoc()) 
	{
		echo ("
				<tr>
					<td><a>$tablerows[1]</a></td>
					<td>$tablerows[2]</td>
					<td>$tablerows[3]</td>
					<td>$tablerows[4]</td>
				</tr>
			");
	}
	echo ("</table>");
	$result->close();
	$mysqli->close();
?>