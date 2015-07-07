<?php
    $mysqli = new mysqli('localhost','root','1076891','clients') or die ('Unable to connect with MySQl.');
    if (mysqli_connect_errno()) 
    {
        printf ("Unable to connect: %s\n", mysqli_connect_error());
        exit();
    }
    $id = $_GET['id'];            
    $mysqli->query("DELETE FROM clientsinfo WHERE id = '$id'");
    $mysqli->close();
    header('Location: /clients.php');
?> 