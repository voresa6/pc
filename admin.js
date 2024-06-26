let itemList = JSON.parse(localStorage.getItem("itemList")) || [];

function addProduct() {
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const description = document.getElementById("product-description").value;
    const imageInput = document.getElementById("product-image");

    if (imageInput.files.length > 0) {
        const image = imageInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const product = {
                id: Date.now(),
                name: name,
                price: price,
                description: description,
                image: e.target.result
            };

            itemList.push(product);
            localStorage.setItem("itemList", JSON.stringify(itemList));
            displayProduct(product);
            console.log("Товар успешно добавлен");
        };

        reader.readAsDataURL(image);
    } else {
        const product = {
            id: Date.now(),
            name: name,
            price: price,
            description: description,
            image: ""
        };

        itemList.push(product);
        localStorage.setItem("itemList", JSON.stringify(itemList));
        displayProduct(product);
        console.log("Товар успешно добавлен");
    }
}

// Функция для отображения всех товаров
function displayProducts() {
    const productList = document.getElementById("product-list");
    // Очищаем список перед добавлением всех элементов
    productList.innerHTML = "";
    itemList.forEach(product => {
        const productItem = document.createElement("div");
        productItem.setAttribute("data-id", product.id);
        productItem.classList.add("product-item");
        productItem.innerHTML = `
            <div class="product-info">
               <p>${product.name}</p>
        ${product.image ? `<img src="${product.image}" alt="${product.name}" class="product-image">` : ""}
        <p>${product.price}</p>
        <p>${product.description}</p>
                <button class="edit-btn" onclick="editProduct(${product.id})">Редактировать</button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">Удалить</button>
            </div>
        `;
        productList.appendChild(productItem);
    });
}

// Функция удаления товара
function deleteProduct(id) {
    // Находим индекс удаляемого товара
    const index = itemList.findIndex(product => product.id === id);
    if (index !== -1) {
        // Удаляем товар из массива
        itemList.splice(index, 1);
        // Сохраняем обновленный список в локальное хранилище
        localStorage.setItem("itemList", JSON.stringify(itemList));
        // Повторно отображаем все товары
        displayProducts();
    }
}

// Отображение добавленных товаров при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
});

// Отображение добавленных товаров при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
    itemList = JSON.parse(localStorage.getItem("itemList")) || [];
    for (const product of itemList) {
        displayProduct(product);
    }
});

function editProduct(id) {
    const product = itemList.find(item => item.id === id);
    const name = prompt("Введите новое название", product.name);
    const price = prompt("Введите новую цену", product.price);
    const description = prompt("Введите новое описание", product.description);

    if (name && price && description) {
        product.name = name;
        product.price = price;
        product.description = description;

        const productItem = document.querySelector(`div[data-id='${id}']`);
        productItem.innerHTML = `
            <div>
                ${product.name}  Цена: ${product.price} -  ${product.description}
                ${product.image ? `<img src="${product.image}" alt="${product.name}" style="width: 100px; height: 100px;">` : ""}
                <button onclick="editProduct(${product.id})">Редактировать</button>
                <button onclick="deleteProduct(${product.id})">Удалить</button>
            </div>
        `;
        localStorage.setItem("itemList", JSON.stringify(itemList));
        console.log("Товар успешно отредактирован");
    }
}

let isVisible = true;
const div = document.getElementById('ts1');

function trigger() {
  isVisible = !isVisible;
  div.style.display = isVisible ? "block" : "none";
};

document
  .getElementById('push')
  .addEventListener('click', trigger);

  document.getElementById('add-product').addEventListener('click', function() {
    const productName = document.getElementById('product-name').value;
    
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(productName);
    
    localStorage.setItem('products', JSON.stringify(products));
    
    // Отправляем сообщение о новом товаре на главную страницу
    window.parent.postMessage(JSON.stringify(products), '*');
});