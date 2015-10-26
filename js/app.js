var clients = [];

$(function(){
    loadClients(clientsLoaded);
});


function clientsBase(){
    console.log(clients);
}

function clientsLoaded(data){
    clients = data;
    $("#blankTr").html(renderHTML(clients));
}

function loadClients(callback){
    $.ajax({
        url: 'http://apishop.herokuapp.com/client',
        success: function(result){
            callback(result);
        }
    })
}

function renderDetails(clientId){
    var clientRendered = '';
    debugger;
    for (var i = 0; i < clients.length; i++){
        if (clients[i].id === clientId){
            clientRendered = '<div class="container"><img class="bigImg" src="' + clients[i].image + '"><h4>' + clients[i].lastName + ' ' + clients[i].firstName + '</h4><br><br><h3>Телефон: ' + clients[i].phone + '</h3><br><h3>Е-мейл: ' + clients[i].email + '</h3><br><h3>Адресса: ' + clients[i].address + '</h3><br><br><h3>Коротко про себе: ' + clients[i].description + '</h3></div>';
        }
    }
    $("#clientInfo").html(clientRendered);
}

function renderHTML(clients){
    var blocks = [];
    for (var i = 0; i < clients.length; i++){
        var template = '<tr class="success" id="' + clients[i].id + '"><td><a href="#editClient" data-toggle="modal">Редагувати</a><br><a href="#" onclick="renderDetails(' + clients[i].id + ')">Видалити</a><br><a href="#detailsClient" data-toggle="modal">Детальніше</a></td><td><img src="' + clients[i].image + '"></td><td>' + clients[i].lastName + '</td><td>' + clients[i].firstName + '</td><td>' + clients[i].phone + '</td><td>' + clients[i].email + '</td><td>' + clients[i].address + '</td><td>' + clients[i].description + '</td></tr>';
        blocks += template;
    }
    return blocks;
}

function renderTable(){
    $("#blankTr").html(renderHTML(clients));
}