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

function deleteClient(clientId){
    var id = {id: clientId};
    var elem = document.getElementById(clientId);
    elem.remove();
    $.ajax({
        type: 'DELETE',
        url: 'http://apishop.herokuapp.com/client',
        data: id,
        success: function(result){
            clients = result;
            loadClients(clientsLoaded);
            alert("Видалено клієнта id: " + clientId);
        }
    })
}

function enableBtn(){
    $("#newClientBtn").removeAttr('disabled');
};

function loadClients(callback){
    $.ajax({
        url: 'http://apishop.herokuapp.com/client',
        success: function(result){
            callback(result);
        }
    })
}

function newClient(){
    var newClientArr = [];
    var newlastName = document.getElementById('lastName').value;
    var newfirstName = document.getElementById('firstName').value;
    var newmiddleName = document.getElementById('middleName').value;
    var newemail = document.getElementById('email').value;
    var newphone = document.getElementById('phone').value;
    var newaddress = document.getElementById('address').value;
    var newcompany = document.getElementById('company').value;
    var newimage = document.getElementById('image').value;
    var newdescription = document.getElementById('description').value;
    if (document.getElementById('lastName').value != false & document.getElementById('firstName').value != false & document.getElementById('email').value != false){
        newClientArr.push({address: newaddress, company: newcompany, description: newdescription, email: newemail, firstName: newfirstName, image: newimage, lastName: newlastName, middleName: newmiddleName, phone: newphone});
        updateREST({address: newaddress, company: newcompany, description: newdescription, email: newemail, firstName: newfirstName, image: newimage, lastName: newlastName, middleName: newmiddleName, phone: newphone});
        console.log(newClientArr);
    }
    else{
        alert('Помилка. Будьласка заповніть обов’язкові поля.');
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
        var template = '<tr class="success" id="' + clients[i].id + '"><td><a href="#editClient" data-toggle="modal">Редагувати</a><br><a href="#" onclick="deleteClient(\'' + clients[i].id + '\')">Видалити</a><br><a href="#clientDetailsForm" data-toggle="modal" onclick="renderDetails(\'' + clients[i].id + '\')">Детальніше</a></td><td><img class="img-rounded demoImg" src="' + clients[i].image + '"></td><td>' + clients[i].lastName + '</td><td>' + clients[i].firstName + '</td><td>' + clients[i].phone + '</td><td>' + clients[i].email + '</td><td>' + clients[i].address + '</td></tr>';
        blocks += template;
    }
    return blocks;
}

function renderTable(){
    $("#blankTr").html(renderHTML(clients));
}

function updateREST(addClient){
    console.log(addClient);
    $.ajax({
        url: 'http://apishop.herokuapp.com/client',
        type: 'POST',
        data: addClient,
        success: function(result){
            clients = result;
            loadClients(clientsLoaded);
            alert('Масив успішно створений. Глянь в консольку ;-).');
        },
        error: function(){
            alert('Помилка при внесенні/оновленні даних на серврер!');
        }
    })
}