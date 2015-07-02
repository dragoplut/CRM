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
        <?php include "blocks/footer.php";?>
        <!-- connect script files -->
        <?php include "blocks/script.php" ?>
    </body>
</html>