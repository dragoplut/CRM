var allOrders = [];
var clientsFullList = [];
var existClientId = '';
var searchOptionOrders = '';
var statusOption = 'new';

$(function(){
    loadClientsFullList();
    ordersBase();
});

$("#searchRequestOrders").keypress(function(event){
    if(event.keyCode == 13) {
        searchOrder();
    }
});

function clearFormOrder(){
    $("#inputSearchExistClient").val('');
    $("#selectorSearchExistClient").val('');
    $("#titleOrder").val('');
    $("#priceOrder").val('');
    $("#payDateOrder").val('');
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

function editOrder(orderId){
    clearFormOrder();
    for (var i = 0; i < allOrders.length; i++){
        if (allOrders[i].id == orderId){
            var lastName = '';
            for(var j = 0; j < clientsFullList.length; j++){
                if(clientsFullList[j].id == allOrders[i].client){
                    lastName = clientsFullList[j].lastName + ' ' + clientsFullList[j].firstName;
                    existClientId = clientsFullList[j].id;
                    statusOption = allOrders[i].status;
                    showClientId();
                }
            }
            var headerRendered = '<h4 class="text-center">Редагування замовлення</h4>';
            var footerRendered = '<a class="btn btn-default pull-left" type="reset" onclick="clearFormOrder()">Очистити форму</a><a class="btn btn-default" data-dismiss="modal">Повернутись</a><a class="btn btn-primary" type="submit" id="newOrderBtn" onclick="saveOrderChanges(' + i + ')">Зберегти зміни замовлення</a>';
            $("#inputSearchExistClient").val(lastName);
            $("#titleOrder").val(allOrders[i].title);
            $("#priceOrder").val(allOrders[i].price);
            $("#payDateOrder").val(allOrders[i].payDate.replace('Z', ''));
            $("#selectorOrderStatus").val(allOrders[i].status);
            $("#descriptionOrders").val(allOrders[i].description);

            console.log(moment(allOrders[i].payDate).format('L'));
        }
    }
    $("#headerEditOrder").html(headerRendered);
    $("#footerEditOrder").html(footerRendered);
    $("#newClientOrder").modal('show');
}

function loadClientsFullList(){
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
}

function newOrder(){
    existClientId = false;
    showClientId();
    var headerRendered = '<h4 class="text-center">Нове замовлення</h4>';
    var footerRendered = '<a class="btn btn-default pull-left" type="reset" onclick="clearFormOrder()">Очистити форму</a><a class="btn btn-default" data-dismiss="modal">Повернутись</a><a class="btn btn-primary" type="submit" id="newOrderBtn" onclick="newOrderSave()">Додати нове замовлення</a>';
    $("#headerEditOrder").html(headerRendered);
    $("#footerEditOrder").html(footerRendered);
    clearFormOrder();
    statusOption = 'new';
    searchExistClient();
    $("#selectorOrderStatus").val(statusOption);
    $("#payDateOrder").val(moment().format('YYYY-MM-DD[T]HH:mm'));
    $("#newClientOrder").modal('show');
}

function newOrderSave(){
    if (existClientId != false & document.getElementById('titleOrder').value != false & document.getElementById('priceOrder').value != false){
        updateRESTnewOrder({title: document.getElementById('titleOrder').value, description: document.getElementById('descriptionOrders').value, price: document.getElementById('priceOrder').value, payDate: document.getElementById('payDateOrder').value, status: statusOption, client: existClientId});
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
            console.log(result);
        }
    });
}

function ordersLoaded(data){
    debugger;
    allOrders = data;
    $("#blankTrOrders").html(renderOrdersTable(data));
}

function renderDetailsOrder(orderId){
    var orderRendered = '';
    for (var i = 0; i < allOrders.length; i++){
        if (allOrders[i].id === orderId){
            var lastName = '';
            var clientImgTemp = '';
            for(var j = 0; j < clientsFullList.length; j++){
                if(clientsFullList[j].id == allOrders[i].client){
                    lastName = clientsFullList[j].lastName + ' ' + clientsFullList[j].firstName;
                    clientImgTemp = clientsFullList[j].image;
                }
            }
            orderRendered = '<div class="container fixMaxWith"><img class="bigImg modal-content" src="' + clientImgTemp + '"><h4 class="text-center">Клієнт - ' + lastName + '</h4><h4 class="text-center">Замовлення</h4><h5>ID: ' + allOrders[i].id + '</h5><h5>Назва: ' + allOrders[i].title + '</h5><h5>Статус: ' + allOrders[i].status + '</h5><h5>Опис: ' + allOrders[i].description + '</h5><h5>Ціна: ' + allOrders[i].price + '</h5><h5>Дата створення: ' + moment(allOrders[i].createdAt).format('L') + '</h5><h5>Дата редагування: ' + moment(allOrders[i].updatedAt).format('L') + '</h5><h5>Дата оплати: ' + moment(allOrders[i].payDate).format('L') + '</h5></div>';
        }
    }
    $("#orderInfo").html(orderRendered);
}

function renderOrdersTable(data){
    allOrders = data;
    var blocks = [];
    for (var i = 0; i < allOrders.length; i++){
        var lastNameFirstName = '';
        for(var j = 0; j < clientsFullList.length; j++){
            if(clientsFullList[j].id == allOrders[i].client){
            lastNameFirstName = clientsFullList[j].lastName + ' ' + clientsFullList[j].firstName;
            }
        }
        var template = '<tr class="success" id="' + allOrders[i].id + '"><td class="text-center"><a title="Детальніше" href="#orderDetailsForm" data-toggle="modal" onclick="renderDetailsOrder(\'' + allOrders[i].id + '\')"><span class="glyphicon glyphicon-file"></span></a><br><a title="Редагувати" href="#editOrder" data-toggle="modal" onclick="editOrder(\'' + allOrders[i].id + '\')"><span class="glyphicon glyphicon-pencil"></span></a><br><a title="Видалити" href="#" onclick="deleteOrder(\'' + allOrders[i].id + '\')"><span class="glyphicon glyphicon-trash"></span></a></td><td>' + allOrders[i].title + '</td><td datatype="number">' + allOrders[i].price + '</td><td datatype="date">' + moment(allOrders[i].payDate).format('L') + '</td><td>' + allOrders[i].status + '</td><td>' + lastNameFirstName + '</td></tr>';
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

function saveOrderChanges(j){
    if (existClientId != allOrders[j].id || document.getElementById('titleOrder').value != allOrders[j].title || document.getElementById('priceOrder').value != allOrders[j].price || document.getElementById('payDateOrder').value != allOrders[j].payDate || document.getElementById('selectorOrderStatus').value != allOrders[j].status || document.getElementById('descriptionOrders').value != allOrders[j].description){
        var url = 'http://apishop.herokuapp.com/order/' + allOrders[j].id;
        $.ajax({
            url: url,
            type: 'PUT',
            data: {title: document.getElementById('titleOrder').value, description: document.getElementById('descriptionOrders').value, price: document.getElementById('priceOrder').value, payDate: document.getElementById('payDateOrder').value, status: statusOption, client: existClientId},
            success: function(result){
                clients = result;
                loadClientsFullList();
                ordersBase();
                alert('Інформація про замовлення успішно оновлена!');
            },
            error: function(){
                alert('Помилка при внесенні/оновленні даних на серврер!');
            }
        })
    }else{
        alert('Ви не внесли змін, запис не оновлено!');
    }
}

function searchOrder(){

}

function searchExistClient(){
    var searchRequest = document.getElementById('inputSearchExistClient').value;
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
            newOrder();
        },
        error: function(){
            alert('Помилка при внесенні/оновленні даних на серврер!');
        }
    })
}