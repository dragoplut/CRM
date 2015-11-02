var allOrders = [];
var clientsFullList = [];
var existClientId = '';
var searchOptionOrders = '';
var statusOption = 'new';

$(function(){
    ordersBase();
});

$("#searchRequestOrders").keypress(function(event){
    if(event.keyCode == 13) {
        searchOrder();
    }
});

function clearFormOrder(){
    $("#inputSearchExistClient").val('');
    $("#title").val('');
    $("#price").val('');
    $("#payDate").val('');
    $("#descriptionOrders").val('');
}

function deleteOrder(orderId){
    if (confirm('Ви впевнені що хочете видалити це замовлення?')){
        var id = {id: orderId};
        var elem = document.getElementById(orderId);
        elem.remove();
        $.ajax({
            type: 'DELETE',
            url: 'http://apishop.herokuapp.com/order',
            data: id,
            success: function(result){
                allOrders = result;
                alert("Видалено замовлення id: " + orderId);
            }
        })
    }
}

function editOrder(){
    console.log('Редагувати замовлення');
}

function newOrder(){
    var urlRequest = 'http://apishop.herokuapp.com/client?sort=lastName%20ASC';
    $.ajax({
        url: urlRequest,
        success: function(result) {
            clientsFullList = result;
        },
        error: function(){
            alert('Помилка! Список клієнтів не завантажено.');
        }
    });
    var headerRendered = '<h4 class="text-center">Нове замовлення</h4>';
    var footerRendered = '<a class="btn btn-default pull-left" type="reset" onclick="clearFormOrder()">Очистити форму</a><a class="btn btn-default" data-dismiss="modal">Повернутись</a><a class="btn btn-primary" type="submit" id="newOrderBtn" onclick="newOrderSave()">Додати нове замовлення</a>';
    $("#headerEditOrder").html(headerRendered);
    $("#footerEditOrder").html(footerRendered);
    clearFormOrder();
    $("#newClientOrder").modal('show');
}

function newOrderSave(){
    if (document.getElementById('selectorSearchExistClient').value != false & document.getElementById('title').value != false & document.getElementById('price').value != false){
        updateRESTnewOrder({title: document.getElementById('title').value, description: document.getElementById('descriptionOrders').value, price: document.getElementById('price').value, payDate: document.getElementById('payDate').value, status: statusOption, client: existClientId});
    }
    else{
        alert('Помилка. Будьласка заповніть обов’язкові поля.');
    }
}

function ordersBase(){
    var urlRequest = 'http://apishop.herokuapp.com/order';
    $.ajax({
        url: urlRequest,
        success: function(result){
            ordersLoaded(result);
        }
    });
}

function ordersLoaded(data){
    allOrders = data;
    $("#blankTrOrders").html(renderOrdersTable(data));
}

function renderDetailsOrder(){
    console.log('Деталі замовлення');
}

function renderOrdersTable(data){
    allOrders = data;
    console.log(allOrders);
    var blocks = [];
    for (var i = 0; i < allOrders.length; i++){
        var template = '<tr class="success" id="' + allOrders[i].id + '"><td class="text-center"><a title="Детальніше" href="#orderDetailsForm" data-toggle="modal" onclick="renderDetailsOrder(\'' + allOrders[i].id + '\')"><span class="glyphicon glyphicon-file"></span></a><br><a title="Редагувати" href="#editOrder" data-toggle="modal" onclick="editOrder(\'' + allOrders[i].id + '\')"><span class="glyphicon glyphicon-pencil"></span></a><br><a title="Видалити" href="#" onclick="deleteOrder(\'' + allOrders[i].id + '\')"><span class="glyphicon glyphicon-trash"></span></a></td><td>' + allOrders[i].title + '</td><td datatype="number">' + allOrders[i].price + '</td><td datatype="date">' + allOrders[i].payDate + '</td><td>' + allOrders[i].status + '</td><td>' + clients[i].lastName + ' ' + clients[i].firstName + '</td></tr>';
        blocks += template;
    }
    var sortClientLnFn = 'Клієнт<a class="pagingButtons" title="За зростанням" onclick=""><span class="glyphicon glyphicon-chevron-down"></span></a><a class="pagingButtons" title="За спаданням" onclick=""><span class="glyphicon glyphicon-chevron-up"></span></a>';
    var sortFirst = 'Ім’я<a class="pagingButtons" title="За зростанням" onclick="sortDirect=fnASC ,pagination()"><span class="glyphicon glyphicon-chevron-down"></span></a><a class="pagingButtons" title="За спаданням" onclick="sortDirect=fnDESC,pagination()"><span class="glyphicon glyphicon-chevron-up"></span></a>';
    var pagingControlsOrders = '<a class="pagingButtons" title="Попередня сторінка" onclick="controlsFwdBwd(0)"><span class="glyphicon glyphicon-backward"></span></a><a class="pagingButtons">' + pageValue + '</a><a class="pagingButtons" title="Наступна сторінка" onclick="controlsFwdBwd(1)"><span class="glyphicon glyphicon-forward"></span></a>';
    $("#sortClientLnFn").html(sortClientLnFn);
    $("#").html();
    $("#pagingControlsOrdersTop").html(pagingControlsOrders);
    $("#pagingControlsOrdersBot").html(pagingControlsOrders);
    return blocks;
}

function searchOrder(){

}

function searchExistClient(){
    var searchRequest = document.getElementById('inputSearchExistClient').value;
    console.log(searchRequest);
    var optionExistClient = '';
    for (var i = 0; i < clientsFullList.length; i++){
        if (searchRequest){
            if (clientsFullList[i].lastName.search(new RegExp(searchRequest, "i")) != -1 || clientsFullList[i].firstName.search(new RegExp(searchRequest, "i")) != -1){
                console.log(clientsFullList[i].lastName.search(new RegExp(searchRequest, "i")));
                optionExistClient += '<option value="' + clientsFullList[i].id + '" id="client:' + clientsFullList[i].id + '">' + clientsFullList[i].lastName + ' ' + clientsFullList[i].firstName + '</option>';
            }
        }else{
        optionExistClient += '<option value="' + clientsFullList[i].id + '" id="client:' + clientsFullList[i].id + '">' + clientsFullList[i].lastName + ' ' + clientsFullList[i].firstName + '</option>';
        }
    }
    existClientId = document.getElementById('selectorSearchExistClient').value;
    $("#selectorSearchExistClient").html(optionExistClient);
}

function showClientId(){
    $("#testClientsId").html(existClientId);
}

function updateRESTnewOrder(addOrder){
    console.log(existClientId);
    console.log(addOrder);
    $.ajax({
        url: 'http://apishop.herokuapp.com/order',
        type: 'POST',
        data: addOrder,
        success: function(result){
            allOrders = result;
            alert('Нове замовлення успішно створено і додано в базу.');
        },
        error: function(){
            alert('Помилка при внесенні/оновленні даних на серврер!');
        }
    })
}