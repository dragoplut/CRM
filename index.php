<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

//set module and action
$module = 'index';
$action = 'index';
//parameters array from URI request
$params = array();

//if requested any URI different from web root
if ($_SERVER['REQUEST_URI'] != '/')
{
    try {
        $url_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        //split virtual URL by "/" symbol
        $uri_parts = explode('/', trim($url_path, ' /'));
        if (count($uri_parts) % 2) 
            {
            throw new Exception();            
            }
            $module = array_shift($uri_parts); //get module name
            $action = array_shift($uri_parts); //get module action
            //in $params get request parameter
            for ($i=0; $i < count($uri_parts); $i++) 
            { 
            $params[$uri_parts[$i]] = $uri_parts[++$i];
            }
        }
    catch (Exception $e)
    {
        $module = '404';
        $action = 'main';
    }
}
echo "\$module: $module\n";
echo "\$action: $action\n";
echo "\$params:\n";
print_r($params);

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
    	<?php include "blocks/sectiontop.php";?>
    	<?php include "blocks/sectionmain.php";?>
    	<!-- connect script files -->
    	<?php include "blocks/script.php" ?>
	</body>
</html>