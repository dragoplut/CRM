var characters = [];
var numElem = 6;
var numPages = '';
var page = 1;
var pageValue;

$(function(){
    loadCharacters(charactersLoaded);
    parse_url();
    if (pageValue != undefined){
        pagination(pageValue);
    }
    else{
        pagination(page)
    }
});

$(document).ready(function(){
    $("#btn-slide").click(function(){
        $("#panel").slideToggle("slow");
        $(this).toggleClass("active");
    })
});

function charactersLoaded(data){
    characters = data;
    console.log(characters);
    $("#charactersTemp").html(renderHTML(characters));
}

function loadCharacters(callback){
    $.ajax({
        url: 'http://gateway.marvel.com:80/v1/public/characters?ts=dragoplut&apikey=de6a1fa8688510cd738790771a73f588&hash=ba8f9e08354c6c820681f97b61542d1a',
        success: function(result){
            callback(result.data);
        }
    })
}

function noSort(){
    $("#charactersTemp").html(renderHTML(characters));
}

function pagination(pageNum){
    page = pageNum;
    var urlPart = "/index.html?page=" + page;
    history.pushState(page, "MARVEL", urlPart);
    noSort();
}

function parse_url(){
    var parser = /page=([^&]+)/i;
    if (!!parser.exec(document.location.search)){
        pageValue = parser.exec(document.location.search)[1];
    }
    console.log(pageValue);
    return pageValue;
}

function renderHTML(characters){
    var blocks = [];
    for (var i = (numElem *(page - 1)); i < (numElem * page); i++){
        if (i < characters.results.length) {
            var template = '<div class="characterbox" id="' + characters.results[i].id + '" name="tempDiv' + i + '"><img src="' + characters.results[i].thumbnail.path + '.' + characters.results[i].thumbnail.extension + '" align="left" class="demoimg img-rounded" alt="' + characters.results[i].name + '"><h5 class="center">' + characters.results[i].name + '</h5><h6 align="center"><a href="#" shape="rect">Видалити</a></h6></div>';
        }
        blocks += template;
        template = '';
    }
    numPages = Math.ceil(characters.results.length / numElem);
    var pageControls = '<div class="topMenu" id="pagingControls">';
    for (var j = 1; j <= numPages; j++){
        pageControls += '<div class="btn-group"><button type="button" class="btn-sm btn-info" onclick="pagination(' + j + ')">' + j + '</button></div>';
    }
    pageControls += '</div>';
    $("#pagingControls").html(pageControls);
    var HeroList = '';
    for (var l = 0; l < characters.results.length; l++){
        HeroList += '<li id="dropdownHero"><a href="#">' + characters.results[l].name + '</a></li>';
    }
    $("#dropdownHeroList").html(HeroList);
    return blocks;
}

function slideForm (){
    $("#panel").slideToggle("slow");
    $(this).toggleClass("active");
}