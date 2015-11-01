var clients = [];
var fnASC = 'fnASC';
var fnDESC = 'fnDESC';
var lnASC = 'lnASC';
var lnDESC = 'lnDESC';
var numOnPage = 7;
var page = 1;
var pageValue = 0;
var sortDirect = 'lnASC';
var searchOption = 'lastName';

$(function(){
    parseUrl();
    if(pageValue != undefined & pageValue != 0){
        if(sortDirect=='none' || sortDirect=='false'){
            pagination();
        }else{
            sortClient(sortDirect);
        }
    }else{
        pageValue = page;
        pagination();
    }
});

$("#searchRequest").keypress(function(event){
    if(event.keyCode == 13) {
        searchClient();
    }
});

function clearForm(){
    $('#lastName').val('');
    $('#firstName').val('');
    $('#middleName').val('');
    $('#email').val('');
    $('#phone').val('');
    $('#address').val('');
    $('#company').val('');
    $('#image').val('');
    $('#description').val('');
}

function clientsBase(){
    console.log(clients);
}

function clientsLoaded(data){
    clients = data;
    $("#blankTr").html(renderHTML(clients));
}

function controlsFwdBwd(direction){
    if (direction == 1){
        pageValue = Number(pageValue) + 1;
    }else{
        pageValue = Number(pageValue) - 1;
    }
    pagination();
}

function deleteClient(clientId){
    if (confirm('Ви впевнені що хочете видалити цього клієнта?')){
        var id = {id: clientId};
        var elem = document.getElementById(clientId);
        elem.remove();
        $.ajax({
            type: 'DELETE',
            url: 'http://apishop.herokuapp.com/client',
            data: id,
            success: function(result){
                clients = result;
                pagination();
                alert("Видалено клієнта id: " + clientId);
            }
        })
    }
}

function demoImgSize(status, id){
    if (status == 1){
        document.getElementById(id).style.height = '70px';
        document.getElementById(id).style.width = '70px';
    }else{
        document.getElementById(id).style.height = '60px';
        document.getElementById(id).style.width = '60px';
    }
}

function editClient(clientId){
    clearForm();
    for (var i = 0; i < clients.length; i++){
        if (clients[i].id === clientId) {
            var headerRendered = '<img class="img-rounded editImg" src="' + clients[i].image + '"><h4 class="text-center">Форма редагування клієнта<br>' + clientId + '</h4>';
            var footerRendered = '<a class="btn btn-default pull-left" type="reset" onclick="clearForm()">Очистити форму</a><a class="btn btn-default" data-dismiss="modal">Повернутись</a><a class="btn btn-primary" type="submit" id="newClientBtn" onclick="saveClientChanges(' + i + ')">Зберегти зміти</a>';
            $('#lastName').val(clients[i].lastName);
            $('#firstName').val(clients[i].firstName);
            $('#middleName').val(clients[i].middleName);
            $('#email').val(clients[i].email);
            $('#phone').val(clients[i].phone);
            $('#address').val(clients[i].address);
            $('#company').val(clients[i].company);
            $('#image').val(clients[i].image);
            $('#description').val(clients[i].description);
        }
    }
    $("#headerEditModal").html(headerRendered);
    $("#footerEditModal").html(footerRendered);
    $("#newClientForm").modal('show');
}

function enableBtn(){   // тестовий код
    $("#newClientBtn").removeAttr('disabled');
};

function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++){
        var pair = vars[i].split("=");
        if (pair[0] == variable){
            return pair[1];
        }
    }
    return(false);
}

function loadClients(callback){
    var skipInRequest =(numOnPage*(pageValue-1));
    var urlRequest = 'http://apishop.herokuapp.com/client?limit=' + numOnPage + '&skip=' + skipInRequest;
    $.ajax({
        url: urlRequest,
        success: function(result){
            console.log(result);
            if (result.length < 1){
                controlsFwdBwd(0);
                alert('Це була остання сторінка.');
            }else{
            callback(result);
            }
        }
    })
}

function newClient(){
    var headerRendered = '<h4 class="text-center">Форма внесення нового клієнта</h4>';
    var footerRendered = '<a class="btn btn-default pull-left" type="reset" onclick="clearForm()">Очистити форму</a><a class="btn btn-default" data-dismiss="modal">Повернутись</a><a class="btn btn-primary" type="submit" id="newClientBtn" onclick="newClientSave()">Додати нового клієнта</a>';
    $("#headerEditModal").html(headerRendered);
    $("#footerEditModal").html(footerRendered);
    clearForm();
    $("#newClientForm").modal('show');
}

function newClientSave(){
    if (document.getElementById('lastName').value != false & document.getElementById('firstName').value != false & document.getElementById('email').value != false){
        updateREST({address: document.getElementById('address').value, company: document.getElementById('company').value, description: document.getElementById('description').value, email: document.getElementById('email').value, firstName: document.getElementById('firstName').value, image: document.getElementById('image').value, lastName: document.getElementById('lastName').value, middleName: document.getElementById('middleName').value, phone: document.getElementById('phone').value});
    }
    else{
        alert('Помилка. Будьласка заповніть обов’язкові поля.');
    }
}

function parseUrl(){
    if(getQueryVariable('page')){
        numOnPage = getQueryVariable('onPage');
        pageValue = getQueryVariable('page');
        sortDirect = getQueryVariable('sortDir');
    }else{
        pageValue = 1;
        sortDirect = 'lnASC';
    }
}

function pagination(){
    if (pageValue < 1){
        pageValue = page;
    }
    var urlPart = '/index.html?onPage=' + numOnPage + '&page=' + pageValue + '&sortDir=' + sortDirect;
    history.pushState(pageValue, "CRM", urlPart);
    if(sortDirect == 'none' || sortDirect == 'false'){
    loadClients(clientsLoaded);
    }else{
        sortClient();
    }
}

function renderDetails(clientId){
    var clientRendered = '';
    for (var i = 0; i < clients.length; i++){
        if (clients[i].id === clientId){
            clientRendered = '<div class="container fixMaxWith"><img class="bigImg modal-content" src="' + clients[i].image + '"><h4 class="text-center">' + clients[i].lastName + ' ' + clients[i].firstName + ' ' + clients[i].middleName + '</h4><h5>Телефон: ' + clients[i].phone + '</h5><h5>Е-мейл: ' + clients[i].email + '</h5><h5>Адресса: ' + clients[i].address + '</h5><h5>Компанія: ' + clients[i].company + '</h5><br><p>Коротко про себе: ' + clients[i].description + '</p></div>';
        }
    }
    $("#clientInfo").html(clientRendered);
}

function renderHTML(clients){
    var blocks = [];
    for (var i = 0; i < clients.length; i++){
        var template = '<tr class="success" id="' + clients[i].id + '"><td class="text-center"><a title="Детальніше" href="#clientDetailsForm" data-toggle="modal" onclick="renderDetails(\'' + clients[i].id + '\')"><span class="glyphicon glyphicon-file"></span></a><br><a title="Редагувати" href="#editClient" data-toggle="modal" onclick="editClient(\'' + clients[i].id + '\')"><span class="glyphicon glyphicon-pencil"></span></a><br><a title="Видалити" href="#" onclick="deleteClient(\'' + clients[i].id + '\')"><span class="glyphicon glyphicon-trash"></span></a></td><td class="text-center center-block"><img class="img-rounded demoImg" onmouseover="demoImgSize(1, this.id)" onmouseout="demoImgSize(0, this.id)" src="' + clients[i].image + '" id="demoImg' + clients[i].id + '"></td><td>' + clients[i].lastName + '</td><td>' + clients[i].firstName + '</td><td>' + clients[i].phone + '</td><td>' + clients[i].email + '</td></tr>';
        blocks += template;
    }
    var sortLastName = 'Фамілія<a class="pagingButtons" title="За зростанням" onclick="sortDirect=lnASC ,pagination()"><span class="glyphicon glyphicon-chevron-down"></span></a><a class="pagingButtons" title="За спаданням" onclick="sortDirect=lnDESC,pagination()"><span class="glyphicon glyphicon-chevron-up"></span></a>';
    var sortFirstName = 'Ім’я<a class="pagingButtons" title="За зростанням" onclick="sortDirect=fnASC ,pagination()"><span class="glyphicon glyphicon-chevron-down"></span></a><a class="pagingButtons" title="За спаданням" onclick="sortDirect=fnDESC,pagination()"><span class="glyphicon glyphicon-chevron-up"></span></a>';
    var pagingControls = '<a class="pagingButtons" title="Попередня сторінка" onclick="controlsFwdBwd(0)"><span class="glyphicon glyphicon-backward"></span></a><a class="pagingButtons">' + pageValue + '</a><a class="pagingButtons" title="Наступна сторінка" onclick="controlsFwdBwd(1)"><span class="glyphicon glyphicon-forward"></span></a>';
    $("#sortLastName").html(sortLastName);
    $("#sortFirstName").html(sortFirstName);
    $("#pagingControls").html(pagingControls);
    $("#pagingControls2").html(pagingControls);
    return blocks;
}

function renderTable(){
    $("#blankTr").html(renderHTML(clients));
}

function saveClientChanges(j){
    if (document.getElementById('lastName').value != clients[j].lastName || document.getElementById('firstName').value != clients[j].firstName || document.getElementById('middleName').value != clients[j].middleName || document.getElementById('email').value != clients[j].email || document.getElementById('phone').value != clients[j].phone || document.getElementById('address').value != clients[j].address || document.getElementById('company').value != clients[j].company || document.getElementById('image').value != clients[j].image || document.getElementById('description').value != clients[j].description){
        var url = 'http://apishop.herokuapp.com/client/' + clients[j].id;
        $.ajax({
            url: url,
            type: 'PUT',
            data: {address: document.getElementById('address').value, company: document.getElementById('company').value, description: document.getElementById('description').value, email: document.getElementById('email').value, firstName: document.getElementById('firstName').value, image: document.getElementById('image').value, lastName: document.getElementById('lastName').value, middleName: document.getElementById('middleName').value, phone: document.getElementById('phone').value},
            success: function(result){
                clients = result;
                pagination();
                alert('Інформація про клієнта успішно оновлена!');
            },
            error: function(){
                alert('Помилка при внесенні/оновленні даних на серврер!');
            }
        })
    }else{
        alert('Ви не внесли змін, запис не оновлено!');
    }
}

function searchClient(){
    var request = document.getElementById('searchRequest').value;
    var urlRequest = 'http://apishop.herokuapp.com/client?where={"' + searchOption + '":{"contains":"' + request + '"}}';
    $.ajax({
        url: urlRequest,
        success: function(result){
            console.log(result);
            if (result.length < 1){
                controlsFwdBwd(0);
                alert('За вашим запитом нічого не знайдено.');
            }else{
                clientsLoaded(result);
            }
        }
    })
}

function sortClient(){
    if(sortDirect == "lnDESC"){
        direction = 'DESC';
        searchOption = 'lastName';
    }else if(sortDirect == "lnASC"){
        direction = 'ASC';
        searchOption = 'lastName';
    }else if(sortDirect == "fnDESC"){
        direction = 'DESC';
        searchOption = 'firstName';
    }else if(sortDirect == "fnASC"){
        direction = 'ASC';
        searchOption = 'firstName';
    }else{
        direction = 'ASC';
        searchOption = 'lastName';
        sortDirect = 'lnASC'
    }
    var skipInRequest =(numOnPage*(pageValue-1));
    var urlRequest = 'http://apishop.herokuapp.com/client?sort=' + searchOption + '%20' + direction + '&limit=' + numOnPage + '&skip=' + skipInRequest;
    $.ajax({
        url: urlRequest,
        success: function(result){
            console.log(result);
            if (result.length < 1){
                if (pageValue >= 1){
                    controlsFwdBwd(0);
                    alert('Це була остання сторінка.');
                }else {
                    location.href = '/index.html';
                    alert('Помилка запиту сортування.');
                }
            }else{
                clientsLoaded(result);
            }
        }
    })
}

function updateREST(addClient){
    console.log(addClient);
    $.ajax({
        url: 'http://apishop.herokuapp.com/client',
        type: 'POST',
        data: addClient,
        success: function(result){
            clients = result;
            pagination();
            alert('Нового клієнта успішно створено і додано в базу.');
        },
        error: function(){
            alert('Помилка при внесенні/оновленні даних на серврер!');
        }
    })
}