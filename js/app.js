var clients = [];

$(function(){
    loadClients(clientsLoaded);
});

function clientsLoaded(data){
    clients = data;
}

function loadClients(callback){
    $.ajax({
        url: 'http://apishop.herokuapp.com/client',
        success: function(result){
            callback(result);
        }
    })
}

function clientsBase(){
    console.log(clients);
}