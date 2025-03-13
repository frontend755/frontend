const API_URL = "https://fakestoreapi.com/products";

// Mahsulotlarni API'dan olish
async function getProducts() {
    const response = await fetch(API_URL);
    const products = await response.json();
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.price} $</p>
            <button onclick="deleteProduct(${product.id})">O‘chirish</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Mahsulot qo‘shish
document.getElementById("add-product-form").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const title = document.getElementById("product-title").value;
    const price = document.getElementById("product-price").value;
    const image = document.getElementById("product-image").value;

    const newProduct = { title, price, image };
    
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct)
    });

    if (response.ok) {
        alert("Mahsulot qo‘shildi!");
        getProducts();
    }
});

// Mahsulot o‘chirish
async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        alert("Mahsulot o‘chirildi!");
        getProducts();
    }
}

// Sahifa yuklanganda mahsulotlarni chiqarish
getProducts();
