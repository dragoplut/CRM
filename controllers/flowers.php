<?php
require_once "controller.php";
class Flowers extends Controller
{
    function itemlist()
    {
        require "models/flowersmodel.php";
        $flowersmodel = new FlowersModel();
        $rowinfo = $flowersmodel->flowersinfo($row);//flowersinfo($_POST['id'],$_POST['flowervariety',$_POST['flowername'],$_POST['amount'],$_POST['price']);
        echo $this->render ('views/flowers.php' , ['pageTitle' => 'Flowers list']);
    }
}
?>