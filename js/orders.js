var allOrders = [];
var clientsFullList = [];
var existClientId = '';
var searchOptionOrders = '';
var statusOption = 'Нове';

function clearFormOrder(){
    $("#inputSearchExistClient").val('');
    $("#title").val('');
    $("#price").val('');
    $("#payDate").val('');
    $("#descriptionOrders").val('');
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
    console.log(allOrders);
}

function renderOrdersTable(){

}

function searchOrder(){

}

$("#searchRequestOrders").keypress(function(event){
    if(event.keyCode == 13) {
        searchOrder();
    }
});

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
    console.log(addOrder);
    $.ajax({
        url: 'http://apishop.herokuapp.com/order',
        type: 'POST',
        data: addOrder,
        success: function(result){
            allOrders = result;
            paginationOrder();
            alert('Нове замовлення успішно створено і додано в базу.');
        },
        error: function(){
            alert('Помилка при внесенні/оновленні даних на серврер!');
        }
    })
}