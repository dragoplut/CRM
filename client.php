<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
session_start();
if (!isset($_SESSION['auth'])) 
{
    header('Location: signin.php');
}
?>
<!DOCTYPE html>
<!-- Building blocks sent to separate php files in folder "/blocks/" -->
<html lang="en">
        <!-- all css connection are in "blocks/head.php" -->
        <?php include "blocks/head.php" ?>
    <body>
        <?php include "blocks/header.php";?>
        <?php include "blocks/leftmenu.php";?>
        <?php            
            $mysqli = new mysqli('localhost','root','1076891','clients') or die ('Unable to connect with MySQl.');
            if (mysqli_connect_errno()) 
            {
                printf ("Unable to connect: %s\n", mysqli_connect_error());
                exit();
            }
            if (isset($_POST['id'])) 
            {                    
            $query = $mysqli->prepare("UPDATE clientsinfo SET 
            first_name = ?,
            last_name = ?,
            age = ?,
            address = ?,
            email = ?,
            job = ?,
            login = ?,
            password = ?,
            phone_nomber = ?
            WHERE id = ?");
            $query->bind_param(
            "ssissssssi",
            $_POST['first_name'],
            $_POST['last_name'],
            $_POST['age'],
            $_POST['address'],
            $_POST['email'],
            $_POST['job'],
            $_POST['login'],
            $_POST['password'],
            $_POST['phone_nomber'],
            $_POST['id']);
            $query->execute();
            $query->close();
            }
            $id = $_GET['id'];
            $query = "SELECT id,first_name,last_name,age,address,email,job,login,password,phone_nomber,reg_date FROM clientsinfo WHERE id = '$id'";
            $result = $mysqli->query($query);
            $row = $result->fetch_array(MYSQLI_ASSOC);
            if ($row) 
            {            
                echo "
                    <div class='formcontainer-user-data'>
                        <form class='form-user-data' role='form' method='POST'>
                            <h2 class='form-signin-heading center-strong'>Client information</h2>
                            <p class='text-user-data'>First name</p>
                            <input type='text' class='form-control' name='first_name' value=" . $row['first_name'] . ">
                            <p class='text-user-data'>Last name</p>
                            <input type='text' class='form-control' name='last_name' value=" . $row['last_name'] . ">
                            <p class='text-user-data'>Age</p>
                            <input type='text' class='form-control' name='age' value=" . $row['age'] . ">
                            <p class='text-user-data'>E-mail *</p>
                            <input type='text' class='form-control' required='' name='email' value=" . $row['email'] . ">
                            <p class='text-user-data'>Phone nomber</p>
                            <input type='text' class='form-control' name='phone_nomber' value=" . $row['phone_nomber'] . ">
                            <p class='text-user-data'>Address</p>
                            <input type='text' class='form-control' name='address' value=" . $row['address'] . ">
                            <p class='text-user-data'>Job</p>
                            <input type='text' class='form-control' name='job' value=" . $row['job'] . ">
                            <p class='text-user-data'>Login *</p>
                            <input type='text' class='form-control' required='' name='login' value=" . $row['login'] . ">
                            <p class='text-user-data'>Password</p>
                            <input type='password' class='form-control' name='password' value=" . $row['password'] . ">
                            <input type='hidden' class='form-control' name='id' value=" . $row['id'] . ">
                            <p class='text-user-data'>(* - required fields for input!)</p>
                            <button class='btn btn-lg btn-primary btn-block' type='submit'>Save changes</button>                            
                        </form>
                    </div>";
            }
            else
            {
                echo "<p class='center-strong'>User doesn't exist</p>";
            }
            echo "</table>";

            $result->free();
            $mysqli->close();
        ?>
        <!-- connect script files -->
        <?php include "blocks/script.php" ?>
    </body>
</html>