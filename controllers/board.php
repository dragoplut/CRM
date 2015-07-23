<?php
/**
 * ...
 */
require_once "controller.php";
class Board extends Controller
{
    function index()
    {
        echo $this->render('views/board.php',['pageTitle'=>'Flowers for each moment']);
    }
}
?>