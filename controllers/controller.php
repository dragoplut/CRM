<?php
/**
 * ...
 */
class Controller
{
    function render($view, $vars)
    {
        extract($vars);
        ob_start();
        include($view);
        return ob_get_clean();
    }
}
?>