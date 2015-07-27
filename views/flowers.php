<?php include "header.php"?>
    <div>
        <p align="center">"Let your life to bloom!"</p>
        <a align="right" href="/logout/index" type="submit" name="logout">Log out</a>
    </div>
    <p class='center-strong'>Flowers table</p>
    <div class='container-clients'>
        <table class='container-fluid table-bordered table-clients'>
            <tr class='center-strong'>
                <td>ID</td>
                <td>Flower variety</td>
                <td>Flower name</td>
                <td>Amount</td>
                <td>Price</td>
            </tr>
            <tr>
                <td class='center'>" . $rowinfo['id'] . "</td>
                <td>" . $rowinfo['flowervariety'] . "</td>
                <td>" . $rowinfo['flowername'] . "</td>
                <td class='center'>" . $row['amount'] . "</td>
                <td class='center'>" . $row['price'] . "</td>
            </tr>
        </table>
    </div>
    <a align="center" href="/board/index" type="submit" name="board">Back to board</a>
<?php include "footer.php"?>