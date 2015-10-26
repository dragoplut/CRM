var clients = [];

$(function(){
    loadClients(clientsLoaded);
});

function clientsLoaded(data){
    clients = data;
    console.log(clients);
}

function loadClients(callback){
    $.ajax({
        url: 'http://apishop.herokuapp.com/client',
        success: function(result){
            callback(result.data);
        }
    })
}