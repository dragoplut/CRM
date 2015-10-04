/**
 * Created by oleksandr on 22.09.15.
 */
var products = [];

$(function(){
    loadProducts(productsLoaded);
});

var categ = '';
var direction = '';
var searchInput = '';

function bubbleSort(products, direction) {
    for (var i = products.length-1; i > 0; i--) {
        for (var j = 0; j < i; j++) {
            var condition;
            if (direction === 'asc') {
                condition = products[j].price > products[j + 1].price;
            }
            else {
                condition = products[j].price < products[j + 1].price;
            }
            if (condition) {
            var tmp = products[j];
            products[j] = products[j + 1];
            products[j + 1] = tmp;
            }
        }
    }
    return products;
}

function categoryFilter (products, categ) {
    var tmp = [];
    for (var i = 0; i < products.length; i++) {
        if (products[i].category === categ){
            tmp.push(products[i]);
        }
    }
    return tmp;
}

function clickFilter (categ) {
    var filteredProducts = categoryFilter(products, categ);
    var blocks = renderHTML(filteredProducts); console.info(typeof blocks);
        $("#products").html(blocks);
}

function clickSort(direction) {
    var sortedProducts = bubbleSort(products, direction);
    var blocks = renderHTML(sortedProducts);
    $("#products").html(blocks);
}

function loadProducts(callback) {
    $.ajax({
        dataType: 'json',
        url: 'http://localhost/products.json',
        success: function (result) {
            callback(result.data);
        }
    });
}

function noSort() {
    $("#products").html(renderHTML(products));
}

function productsLoaded(data){
    products = data;
    $("#products").html(renderHTML(products))
}

function renderHTML(products) {
    var blocks = [];
    for (var i = 0; i < products.length; i++) {
        var template = '<div align="center" class="productbox"><img src="' + products[i].imageUrl + '" align="left" alt="' + products[i].Name + '" class="demoimg"><h4>' + products[i].Name + '</h4><h5>' + products[i].description + '</h5><h5>Price: ' + products[i].price + '</h5></div>';
        blocks += template;
    }
    return blocks;
}

function searchFilter(searchInput) {
    searchInput = document.getElementById('hook').value;
    var tmp = [];
    for (var i = 0; i < products.length; i++) {
        var matcher = new RegExp(searchInput);
        if (matcher.test(products[i].Name)) {
            tmp.push(products[i]);
        };
    };
    var blocks = renderHTML(tmp);
    $("#products").html(blocks);
}