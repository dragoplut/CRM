<?php
class FlowersModel
{
    function flowersinfo()
    {
        $mysqli = new mysqli('localhost','root','1076891','flowers') or die ('Unable to connect with MySQl.');
        if (mysqli_connect_errno())
        {
            printf ("Unable to connect: %s\n", mysqli_connect_error());
            exit();
        }
        $query = ("SELECT id,flowervariety,flowername,amount,price FROM flowersinfo");
        $result = $mysqli->query($query);
        $row = $result->fetch_array(MYSQLI_ASSOC);
        return $row;
        $result->close();
        $mysqli->close();
    }

}
?>