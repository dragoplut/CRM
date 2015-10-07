/**
 * Created by oleksandr on 22.09.15.
 */
var products = [];

$(function(){
    loadProducts(productsLoaded);
});

$(document).ready(function(){
   $(".btn-slide").click(function(){
       $("#panel").slideToggle("slow");
       $(this).toggleClass("active");
   })
});

var categ = '';
var direction = '';
var searchInput = '';
var newProduct = [];

function productArray (){
    var productCategory = document.getElementById('productCategory').value;
    var productName = document.getElementById('productName').value;
    var productPrice = document.getElementById('productPrice').value;
    var productImgUrl = document.getElementById('productImgUrl').value;
    var productDescription = document.getElementById('productDescription').value;
    var productId = products.length + 1;
    products.push({id: productId, category: productCategory, imageUrl: productImgUrl, Name: productName, description: productDescription, price: productPrice});
    noSort();
    console.log(products);
}

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

function removeProduct(i){
    var elem = document.getElementById(i);
    elem.remove();
    for (var j = 0; j < products.length; j++){
        if (products[j].id === i){
            products.splice(j, 1);
            break;
        }
    }
}

function renderHTML(products) {
    var blocks = [];
    for (var i = 0; i < products.length; i++) {
        var template = '<div align="center" class="productbox" id="' + products[i].id + '" name="tempDiv"><img src="' + products[i].imageUrl + '" align="left" alt="' + products[i].Name + '" class="demoimg"><h4>' + products[i].Name + '</h4><h5>' + products[i].description + '</h5><h5>Price: ' + products[i].price + '</h5><a onclick="removeProduct(' + products[i].id + ')">Видалити</a></div>';
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