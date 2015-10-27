var clients = [];

$(function(){
    loadClients(clientsLoaded);
});

function clearForm(){
    document.getElementById('lastName').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('middleName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById('company').value = '';
    document.getElementById('image').value = '';
    document.getElementById('description').value = '';
}

function clientsBase(){
    console.log(clients);
}

function clientsLoaded(data){
    clients = data;
    $("#blankTr").html(renderHTML(clients));
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
                loadClients(clientsLoaded);
                alert("Видалено клієнта id: " + clientId);
            }
        })
    }
}

function editClient(clientId){
    clearForm();
    for (var i = 0; i < clients.length; i++){
        if (clients[i].id === clientId){
            var headerRendered = '<img class="img-rounded editImg" src="' + clients[i].image + '"><h4 class="text-center">Форма редагування клієнта<br>' + clientId + '</h4>';
            var footerRendered = '<a class="btn btn-default pull-left" type="reset" onclick="clearForm()">Очистити форму</a><a class="btn btn-default" data-dismiss="modal">Повернутись</a><a class="btn btn-primary" type="submit" id="newClientBtn" onclick="saveClientChanges(' + i + ')">Зберегти зміти</a>';
            document.getElementById('lastName').value = clients[i].lastName;
            document.getElementById('firstName').value = clients[i].firstName;
            document.getElementById('middleName').value = clients[i].middleName;
            document.getElementById('email').value = clients[i].email;
            document.getElementById('phone').value = clients[i].phone;
            document.getElementById('address').value = clients[i].address;
            document.getElementById('company').value = clients[i].company;
            document.getElementById('image').value = clients[i].image;
            document.getElementById('description').value = clients[i].description;
        }
    }
    $("#headerEditModal").html(headerRendered);
    $("#footerEditModal").html(footerRendered);
    $("#newClientForm").modal('show');
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
        var template = '<tr class="success" id="' + clients[i].id + '"><td class="text-center"><a title="Детальніше" href="#clientDetailsForm" data-toggle="modal" onclick="renderDetails(\'' + clients[i].id + '\')"><span class="glyphicon glyphicon-file"></span></a><br><a title="Редагувати" href="#editClient" data-toggle="modal" onclick="editClient(\'' + clients[i].id + '\')"><span class="glyphicon glyphicon-pencil"></span></a><br><a title="Видалити" href="#" onclick="deleteClient(\'' + clients[i].id + '\')"><span class="glyphicon glyphicon-trash"></span></a></td><td><img class="img-rounded demoImg" src="' + clients[i].image + '"></td><td>' + clients[i].lastName + '</td><td>' + clients[i].firstName + '</td><td>' + clients[i].phone + '</td><td>' + clients[i].email + '</td></tr>';
        blocks += template;
    }
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
                loadClients(clientsLoaded);
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