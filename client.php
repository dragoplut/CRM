<?php
session_start();
if (!isset($_SESSION['auth'])) {
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
            if (mysqli_connect_errno()) {
                printf ("Unable to connect: %s\n", mysqli_connect_error());
                exit();
            }
            if (isset($_POST['submit'])) 
                {
                    $phone_nomber = $_POST['phone_nomber'];
                    if ($_POST['phone_nomber'] = $row['phone_nomber']) {exit;}
                    else
                    {                            
                        $query = "UPDATE clientsinfo SET phone_nomber = '$phone_nomber' WHERE id = '$id' ";                        
                        if ($mysqli->query($query) === TRUE) 
                        {
                            echo "<p class='center-strong'>Record updated successfully</p>";
                        } 
                        else
                        {
                            echo "<p class='center-strong'>Error updating record: </p>" . $mysqli->error;
                        }
                    }
                }
            $id = key($_GET);
            $query = "SELECT id,first_name,last_name,age,address,email,job,login,password,phone_nomber,reg_date FROM clientsinfo WHERE id = '$id'";
            $result = $mysqli->query($query);
            $row = $result->fetch_array(MYSQLI_ASSOC);
            if ($row) {            
                echo "
                    <div class='formcontainer-user-data'>
                        <form class='form-user-data' role='form' method='POST'>
                            <h2 class='form-signin-heading center-strong'>User data</h2>
                            <p class='text-user-data'>First name</p>
                            <input type='text' class='form-control' name='first_name' value=" . $row['first_name'] . ">
                            <p class='text-user-data'>Last name</p>
                            <input type='text' class='form-control' name='last_name' value=" . $row['last_name'] . ">
                            <p class='text-user-data'>Age</p>
                            <input type='text' class='form-control' name='age' value=" . $row['age'] . ">
                            <p class='text-user-data'>E-mail</p>
                            <input type='text' class='form-control' name='email' value=" . $row['email'] . ">
                            <p class='text-user-data'>Phone nomber</p>
                            <input type='text' class='form-control' name='phone_nomber' value=" . $row['phone_nomber'] . ">
                            <p class='text-user-data'>Address</p>
                            <input type='text' class='form-control' name='address' value=" . $row['address'] . ">
                            <p class='text-user-data'>Job</p>
                            <input type='text' class='form-control' name='job' value=" . $row['job'] . ">
                            <p class='text-user-data'>Login</p>
                            <input type='text' class='form-control' name='login' value=" . $row['login'] . ">
                            <p class='text-user-data'>Password</p>
                            <input type='password' class='form-control' name='password' value=" . $row['password'] . ">
                            <button class='btn btn-lg btn-primary btn-block' type='submit'>Save changes</button>                            
                        </form>
                    </div>";

            }
            else
            {
                echo "<p class='center-strong'>User in not exist</p>";
            }
            echo "</table>";
            echo "<p class='center-strong'>" . $id . "</p><p class='center-strong'>user id from GET</p>";
            $result->free();
            $mysqli->close();
        ?>
        <!-- connect script files -->
        <?php include "blocks/script.php" ?>
    </body>
</html>