<p class='center-strong'>Clients table</p>
<div class='container-clients'>
	<table class='container-fluid table-bordered table-clients'>
		<tr class='center-strong'>
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
		</tr>
		
		<tr>
			<td class='center'><a href='client.php?id=" .$row['id'] . "'>Edit /</a><a href='/blocks/deleteclient.php?id=" .$row['id'] . "'> Delete</a></td>
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
		</tr>
		<a href='blocks/newclient.php'>Create new client</a>
	</table>
</div>

