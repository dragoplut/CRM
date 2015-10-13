<div><h3 class="heading">Smartphone list!</h3></div>
<div class="sidebar">
    <input onkeydown="searchFilter()" type="text" name="search" id="hook" size="12">
    <button onclick="searchFilter()">Пошук</button>
    <ul title="Категорія" class="sidebarList">
        <li class="liUnmark"><a href="#" onclick="clickFilter('PC')" class="sortLink">PC</a></li>
        <li class="liUnmark"><a href="#" onclick="clickFilter('Phone')" class="sortLink">Phone</a></li>
        <li class="liUnmark"><a href="#" onclick="clickFilter('Tablet')" class="sortLink">Tablet</a></li>
    </ul>
    <ul title="сортувати" class="sidebarList">
        <li class="liUnmark"><a href="#" onclick="clickSort('asc')" class="sortLink">сортувати по зростаню</a></li>
        <li class="liUnmark"><a href="#" onclick="clickSort('desc')" class="sortLink">сортувати по спаданню</a></li>
        <li class="liUnmark"><a href="#" onclick="noSort()" class="sortLink">без сортування</a></li>
    </ul>
</div>
<div id="panel">
    <div class="topFormLine"></div>
    <h4 class="heading">Внесіть дані про новий продукт</h4>
    <div>
        <select title="категорія продукту" class="form-control" id="productCategory">
            <option value="PC">PC</option>
            <option value="Phone">Телефон</option>
            <option value="Tablet">Таблет</option>
        </select>
    </div>
    <input class="form-control" placeholder="назва продукту" required="" autofocus="" id="productName">
    <input class="form-control" placeholder="ціна" type="number"  required="" id="productPrice">
    <input class="form-control" placeholder="шлях до зображення" required="" id="productImgUrl">
    <input class="form-control" placeholder="опис продукту" required="" id="productDescription">
    <div class="center">
        <button type="reset" title="Очистити форму">Очистити форму</button>
        <button type="submit" title="Внести продукт" onclick="productArray()">Внести продукт</button>
    </div>
</div>
<p class="slide"><a href="#" class="btn-slide">Додати продукт</a></p>
<div id="pagingItems" class="itemList">
    <div id="pagingControls" align="center" class="pagingButtons"></div>
    <div id="products" align="center" class="productbox"></div>
</div>