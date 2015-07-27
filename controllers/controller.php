<?php
class Controller
{
    function render($view, $vars)
    {
        extract($vars);
        ob_start();
        include($view);
        return ob_get_clean();
    }
    function __construct()
    {
        if ($_SERVER['REQUEST_URI'] != "/login/index" )
        {
            session_start();
            if (!isset($_SESSION['auth']))
            {
                header('Location: /login/index');
            }
        }
    }
}
?>