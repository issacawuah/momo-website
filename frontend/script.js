// Sample product data
const products = [
    {
        id: 1,
        name: "Smartphone X",
        price: 599.99,
        image: "https://via.placeholder.com/300x200?text=Smartphone+X"
    },
    {
        id: 2,
        name: "Laptop Pro",
        price: 1299.99,
        image: "https://via.placeholder.com/300x200?text=Laptop+Pro"
    },
    {
        id: 3,
        name: "Wireless Headphones",
        price: 199.99,
        image: "https://via.placeholder.com/300x200?text=Wireless+Headphones"
    },
    {
        id: 4,
        name: "Smart Watch",
        price: 249.99,
        image: "https://via.placeholder.com/300x200?text=Smart+Watch"
    }
];

// Cart functionality
let cart = [];

// DOM Elements
const productContainer = document.getElementById('product-container');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalPrice = document.getElementById('total-price');
const cartSection = document.getElementById('cart-section');
const checkoutBtn = document.getElementById('checkout-btn');

// Display products
function displayProducts() {
    productContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showCart();
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Show/hide cart
function showCart() {
    cartSection.classList.remove('hidden');
}

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase!');
    cart = [];
    updateCart();
    cartSection.classList.add('hidden');
});

// Initialize the page
displayProducts(); 