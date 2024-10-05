// Sample product data
const products = [
    { id: 1, name: "Men Jackets", price: 19.99, description: "Jacket for men", image: "images/product1.jpg" },
    { id: 2, name: "Men Jeans ", price: 29.99, description: "Jeans for men", image: "images/product2.jpg" },
    { id: 3, name: "Men Shirt", price: 39.99, description: "Shirt for men", image: "images/product3.jpg" },
    { id: 4, name: "Women Pants", price: 39.99, description: "Pants for women", image: "images/product4.jpg" },
    { id: 5, name: "Women tshirt", price: 23.44, description: "Tshirt for women", image: "images/product5.jpg" },
    { id: 6, name: "women Accessories", price: 43.43, description: "Accessories for women", image: "images/product6.jpg" },
];

// Function to get the cart from localStorage
function getCart() {
    const cartString = localStorage.getItem("cart");
    return cartString ? JSON.parse(cartString) : [];
}

// Function to save the cart to localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to add items to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const cart = getCart();
        cart.push(product);
        saveCart(cart);
        alert(`Product ${product.name} added to cart!`);
    }
}

// Function to display cart items
function displayCartItems() {
    const cartItemsDiv = document.getElementById("cart-items");
    const totalPriceElem = document.getElementById("total-price");
    const cart = getCart();
    let totalPrice = 0;

    cartItemsDiv.innerHTML = ''; // Clear previous items
    cart.forEach(item => {
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
            </div>
        `;
        totalPrice += item.price;
    });

    totalPriceElem.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

// Call displayCartItems if on cart.html
if (document.getElementById("cart-items")) {
    displayCartItems();
}

// Display product details on the product page
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
if (productId) {
    const product = products.find(p => p.id == productId);
    if (product) {
        document.getElementById("product-details").innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
    }
}
