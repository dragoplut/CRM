<?php
	$conn = mysql_connect('Localhost: /db/clients.db','root','1076891') or die ('Unable to connect with MySQl.');
	$db = mysql_select_db('clients', $conn) or die ('Unable to connect with database');
	$sql = mysql_query("SELECT 'id','firs_name','last_name','age' FROM 'clientsinfo' ORDER BY 'id' DESC",$conn);
	echo ("<table border = '1'>");
	echo ("<tr><td>ID</td><td>Firs name</td><td>Last Name</td><td>Age</td></tr>");
	while ($tablerows = mysql_fetch_row($sql)) 
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
	mysql_close($conn);
?>