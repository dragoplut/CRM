/**
 * Created by oleksandr on 22.09.15.
 */
var products = [
    {
        "id":0,
        "category":"Tablet",
        "imageUrl":"img/phones/motorola.png",
        "name":"Motorola XOOM™ with Wi-Fi",
        "description":"The Next, Next Generation\r\n\r\nExperience the future with Motorola.",
        "price":1990
    },
    {
        "id":1,
        "category":"Phone",
        "imageUrl":"img/phones/motorola-xoom.png",
        "name":"MOTOROLA XOOM™",
        "description":"The Next, Next Generation\n\nExperience the future with MOTOROLA XOOM.",
        "price":1900
    },
    {
        "id":2,
        "category":"Phone",
        "imageUrl":"img/phones/motorola-atrix.png",
        "name":"MOTOROLA ATRIX™ 4G",
        "description":"MOTOROLA ATRIX 4G the world's most powerful smartphone.",
        "price":1730
    },
    {
        "id":3,
        "category":"PC",
        "imageUrl":"img/phones/dell-streak.png",
        "name":"Dell Streak 7",
        "description":"Introducing Dell Streak 7.",
        "price":2900
    },
    {
        "id":4,
        "category":"Phone",
        "imageUrl":"img/phones/samsung-gem.png",
        "name":"Samsung Gem™",
        "description":"The Samsung Gem brings you everything.",
        "price":1230
    },
    {
        "id":5,
        "category":"Tablet",
        "imageUrl":"img/phones/dell-venue.png",
        "name":"Dell Venue",
        "description":"The Dell Venue; Your Personal Express Lane.",
        "price":3240
    }
];

var blocks = '';
var categ = '';
var direction = '';

function bubbleSort(products, direction)
{
    for (var i = products.length-1; i > 0; i--)
    {
        for (var j = 0; j < i; j++)
        {
            var condition;
            if (direction === 'asc')
            {
                condition = products[j].price > products[j + 1].price;
            }
            else
            {
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

function categoryFilter (products, categ)
{
    for (var i = products.length-1; i > 0; i--) {
        for (var j = 0; j < i; j++) {
            var tmp;
            if (products[i].category === categ){
                tmp += products[i];
            };
            products = tmp;
        }
    }
    return products;
};

function noSort (products)
{
    var nosort = renderHTML(products);
    blocks = nosort;
    $(function () {
        $("#products").html(blocks);
    });
    blocks = '';
};


function clickFilter (categ)
{
    var filteredProducts = categoryFilter(products, categ);
    blocks = renderHTML(filteredProducts);
    $(function () {
        $("#products").html(blocks);
    });
    blocks = '';

};

function clickSort(direction)
{
    var sortedProducts = bubbleSort(products, direction);
    blocks = renderHTML(sortedProducts);
    $(function () {
        $("#products").html(blocks);
    });
    blocks = '';
}


function renderHTML(products)
{
    for (var i = 0; i < products.length; i++) {
        var template = '<div align="center" class="productbox"><img src="' + products[i].imageUrl + '" align="left" alt="' + products[i].name + '" class="demoimg"><h4>' + products[i].name + '</h4><h5>' + products[i].description + '</h5><h5>Price: ' + products[i].price + '</h5></div>';
        blocks += template;
    }
    return blocks;
};










function ClickSortOLD(products, sortDirection)
{
    if (sortDirection === 'Asc')
    {
        productsAsc = BubbleAscSort(products);
        var blocks = '';
        for (var i = 0; i < products.length; i++) {
            var template = '<div align="center" class="productbox"><img src="' + productsAsc[i].imageUrl + '" align="left" alt="' + productsAsc[i].name + '" class="demoimg"><h4>' + productsAsc[i].name + '</h4><h5>' + productsAsc[i].description + '</h5><h5>Price: ' + productsAsc[i].price + '</h5></div>';
            blocks += template;
        }
        $(function () {
            $("#products").html(blocks);
        });
    }
    else if (sortDirection === 'Desc')
    {
        productsDesc = BubbleDescSort(products);
        var blocks = '';
        for (var i = 0; i < products.length; i++) {
            var template = '<div align="center" class="productbox"><img src="' + productsDesc[i].imageUrl + '" align="left" alt="' + productsDesc[i].name + '" class="demoimg"><h4>' + productsDesc[i].name + '</h4><h5>' + productsDesc[i].description + '</h5><h5>Price: ' + productsDesc[i].price + '</h5></div>';
            blocks += template;
        }
        $(function () {
            $("#products").html(blocks);
        });
    }
    else
    {
        var blocks = '';
        for (var i = 0; i < products.length; i++) {
            var template = '<div align="center" class="productbox"><img src="' + products[i].imageUrl + '" align="left" alt="' + products[i].name + '" class="demoimg"><h4>' + products[i].name + '</h4><h5>' + products[i].description + '</h5><h5>Price: ' + products[i].price + '</h5></div>';
            blocks += template;
        }
        $(function () {
            $("#products").html(blocks);
        });
    }
}

