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
    for (var i = 0; i < clients.length; i++){
        if (clients[i].id === clientId){
            clientRendered = '<div class="container fixMaxWith"><img class="bigImg modal-content" src="' + clients[i].image + '"><h4 class="text-center">' + clients[i].lastName + ' ' + clients[i].firstName + '</h4><h5>Телефон: ' + clients[i].phone + '</h5><h5>Е-мейл: ' + clients[i].email + '</h5><h5>Адресса: ' + clients[i].address + '</h5><br><p>Коротко про себе: ' + clients[i].description + '</p></div>';
        }
    }
    $("#clientInfo").html(clientRendered);
}

function renderHTML(clients){
    var blocks = [];
    for (var i = 0; i < clients.length; i++){
        var template = '<tr class="success" id="' + clients[i].id + '"><td><a href="#editClient" data-toggle="modal">Редагувати</a><br><a href="#">Видалити</a><br><a href="#detailsClient" data-toggle="modal" onclick="renderDetails(\'' + clients[i].id + '\')">Детальніше</a></td><td><img class="demoImg" src="' + clients[i].image + '"></td><td>' + clients[i].lastName + '</td><td>' + clients[i].firstName + '</td><td>' + clients[i].phone + '</td><td>' + clients[i].email + '</td><td>' + clients[i].address + '</td><td>' + clients[i].description + '</td></tr>';
        blocks += template;
    }
    return blocks;
}

function renderTable(){
    $("#blankTr").html(renderHTML(clients));
}