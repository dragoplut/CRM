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
<html lang="en">
    <head>
        <?php include "blocks/head.php" ?>

<sript type='text/javascript' srs='/js/jquery.min.js'>
    $().ready(function ()
    {
        $().click(function ()
        {
            if (confirm('Are You sure?')) 
                {
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
                }
                header('Location: /clients.php');
        });
    });
</script>
    </head>
    <body>
        <?php include "blocks/script.php" ?>
    </body>
</html>