// Sample product data with reviews
const products = [
    {
        id: 1,
        name: "Smartphone X",
        price: 599.99,
        image: "https://via.placeholder.com/300x200?text=Smartphone+X",
        description: "The latest smartphone with advanced features and stunning design.",
        category: "Electronics",
        reviews: [
            {
                user: "John Doe",
                rating: 5,
                comment: "Amazing phone! The camera quality is outstanding."
            },
            {
                user: "Jane Smith",
                rating: 4,
                comment: "Great performance, but battery life could be better."
            }
        ]
    },
    {
        id: 2,
        name: "Laptop Pro",
        price: 1299.99,
        image: "https://via.placeholder.com/300x200?text=Laptop+Pro",
        description: "Powerful laptop for professionals and gamers.",
        category: "Electronics",
        reviews: [
            {
                user: "Mike Johnson",
                rating: 5,
                comment: "Perfect for my work and gaming needs!"
            }
        ]
    },
    {
        id: 3,
        name: "Wireless Headphones",
        price: 199.99,
        image: "https://via.placeholder.com/300x200?text=Wireless+Headphones",
        description: "Premium wireless headphones with noise cancellation.",
        category: "Electronics",
        reviews: [
            {
                user: "Sarah Wilson",
                rating: 5,
                comment: "Best headphones I've ever owned!"
            }
        ]
    },
    {
        id: 4,
        name: "Smart Watch",
        price: 249.99,
        image: "https://via.placeholder.com/300x200?text=Smart+Watch",
        description: "Stay connected and track your fitness with this smart watch.",
        category: "Electronics",
        reviews: [
            {
                user: "David Brown",
                rating: 4,
                comment: "Great features, but the battery life could be improved."
            }
        ]
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
const searchInput = document.querySelector('.search-bar input');
const testimonialSlider = document.querySelector('.testimonial-slider');

// Sample testimonials
const testimonials = [
    {
        name: "Emily Davis",
        role: "Happy Customer",
        comment: "Great shopping experience! Fast delivery and excellent customer service.",
        image: "https://via.placeholder.com/100x100?text=ED"
    },
    {
        name: "Robert Wilson",
        role: "Regular Shopper",
        comment: "Always find what I need at competitive prices. Highly recommended!",
        image: "https://via.placeholder.com/100x100?text=RW"
    }
];

// Display products with reviews
function displayProducts(productsToShow = products) {
    productContainer.innerHTML = productsToShow.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-reviews">
                    <div class="rating">
                        ${getStarRating(product.reviews)}
                    </div>
                    <span class="review-count">${product.reviews.length} reviews</span>
                </div>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Get star rating HTML
function getStarRating(reviews) {
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    return Array(5).fill('').map((_, i) => `
        <i class="fas fa-star ${i < averageRating ? 'filled' : ''}"></i>
    `).join('');
}

// Display testimonials
function displayTestimonials() {
    testimonialSlider.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-card">
            <img src="${testimonial.image}" alt="${testimonial.name}">
            <div class="testimonial-content">
                <p class="testimonial-text">"${testimonial.comment}"</p>
                <p class="testimonial-author">${testimonial.name}</p>
                <p class="testimonial-role">${testimonial.role}</p>
            </div>
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
    showNotification(`${product.name} added to cart!`);
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
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
    showNotification("Item removed from cart");
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
});

// Newsletter form submission
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    showNotification(`Thank you for subscribing with ${email}!`);
    e.target.reset();
});

// Initialize the page
displayProducts();
displayTestimonials(); 