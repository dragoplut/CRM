/**
 * Created by oleksandr on 22.09.15.
 */
var products = [
    {
        "id":0,
        "category":"Tablet",
        "imageUrl":"img/phones/motorola.png",
        "Name":"Motorola XOOM™ with Wi-Fi",
        "description":"The Next, Next Generation\r\n\r\nExperience the future with Motorola.",
        "price":1990
    },
    {
        "id":1,
        "category":"Phone",
        "imageUrl":"img/phones/motorola-xoom.png",
        "Name":"MOTOROLA XOOM™",
        "description":"The Next, Next Generation\n\nExperience the future with MOTOROLA XOOM.",
        "price":1900
    },
    {
        "id":2,
        "category":"Phone",
        "imageUrl":"img/phones/motorola-atrix.png",
        "Name":"MOTOROLA ATRIX™ 4G",
        "description":"MOTOROLA ATRIX 4G the world's most powerful smartphone.",
        "price":1730
    },
    {
        "id":3,
        "category":"PC",
        "imageUrl":"img/phones/dell-streak.png",
        "Name":"Dell Streak 7",
        "description":"Introducing Dell Streak 7.",
        "price":2900
    },
    {
        "id":4,
        "category":"Phone",
        "imageUrl":"img/phones/samsung-gem.png",
        "Name":"Samsung Gem™",
        "description":"The Samsung Gem brings you everything.",
        "price":1230
    },
    {
        "id":5,
        "category":"Tablet",
        "imageUrl":"img/phones/dell-venue.png",
        "Name":"Dell Venue",
        "description":"The Dell Venue; Your Personal Express Lane.",
        "price":3240
    }
];

var categ = '';
var direction = '';
var searchInput = '';

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
    var tmp = [];
    for (var i = 0; i < products.length; i++) {
        if (products[i].category === categ){
            tmp.push(products[i]);
        };
    }
    return tmp;
};

function clickFilter (categ)
{
    var filteredProducts = categoryFilter(products, categ);
    var blocks = renderHTML(filteredProducts); console.info(typeof blocks);
    $(function () {
        $("#products").html(blocks);
    });
};

function clickSort(direction)
{
    var sortedProducts = bubbleSort(products, direction);
    var blocks = renderHTML(sortedProducts);
    $(function () {
        $("#products").html(blocks);
    });
}

function noSort(products)
{
    var nosort = renderHTML(products);
    var blocks = nosort;
    $(function () {
        $("#products").html(blocks);
    });
};

function renderHTML(products)
{
    var blocks = [];
    for (var i = 0; i < products.length; i++) {
        var template = '<div align="center" class="productbox"><img src="' + products[i].imageUrl + '" align="left" alt="' + products[i].name + '" class="demoimg"><h4>' + products[i].name + '</h4><h5>' + products[i].description + '</h5><h5>Price: ' + products[i].price + '</h5></div>';
        blocks += template;
    }
    return blocks;
};

function searchFilter(products, searchInput)
{
    searchInput = document.getElementById('hook').value;
    console.log(searchInput);
    var tmp = [];
    for (var i = 0; i < products.length; i++)
    {
        if (products[i].Name === searchInput)
        {
            tmp.push(products[i]);
        };
    };
    console.log(tmp);
    var blocks = renderHTML(tmp);
    $(function () {
        $("#products").html(blocks);
    });
    console.log(blocks);
};





