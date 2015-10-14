var characters = [];

$(function(){
    loadCharacters(charactersLoaded)
})

function loadCharacters(callback){
    $.ajax({
        url: 'http://gateway.marvel.com:80/v1/public/characters?apikey=de6a1fa8688510cd738790771a73f588',
        success: function(result){
            callback(result.data);
        }
    })
}

function charactersLoaded(data){
    characters = data;
    $("#characters").html(renderHTML(characters))
    console.log(characters);
}