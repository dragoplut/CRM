var characters = [];

$(function(){
    loadCharacters(charactersLoaded)
})

function loadCharacters(callback){
    $.ajax({
        url: 'http://gateway.marvel.com:80/v1/public/characters?ts=dragoplut&apikey=de6a1fa8688510cd738790771a73f588&hash=ba8f9e08354c6c820681f97b61542d1a',
        success: function(result){
            callback(result.data);
        }
    })
}

function charactersLoaded(data){
    characters = data;
    console.log(characters);
    $("#charactersTemp").html(renderHTML(characters));
}

function renderHTML(characters){
    var blocks = [];
    for (var i = 0; i < characters.results.length; i++){
        var template = '<div class="characterbox" id="' + characters.results[i].id + '" name="tempDiv' + i + '"><img src="' + characters.results[i].thumbnail.path + '.' + characters.results[i].thumbnail.extension + '" align="left" class="demoimg" alt="' + characters.results[i].name + '"><h5 class="center">' + characters.results[i].name + '</h5><a href="#" align="center">Видалити</a></div>';
        blocks += template;
    }
    return blocks;
}