// Sample Product Inventory
const products = [
    {
        id: 1,
        title: "Minimalist Leather Watch",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Classic Canvas Backpack",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Wireless Over-Ear Headphones",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Ceramic Coffee Tumbler",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
    }
];

// App State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartToggleBtn = document.getElementById('cartToggleBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartOverlay = document.getElementById('cartOverlay');
const cartDrawer = document.getElementById('cartDrawer');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');

// Initialize Store
function initStore() {
    renderProducts();
    setupEventListeners();
}

// Render Products to the Grid
function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <div class="product-info">
                <div>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                </div>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Event Listeners for Cart Drawer toggle
function setupEventListeners() {
    cartToggleBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
    checkoutBtn.addEventListener('click', handleCheckout);
}

function toggleCart() {
    cartDrawer.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Add Item to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    // Open cart drawer on add for immediate feedback
    if (!cartDrawer.classList.contains('active')) {
        toggleCart();
    }
}

// Remove Item from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update Cart UI (Count, Items list, Total)
function updateCartUI() {
    // Update count badge
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    // Render Cart Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #6b7280; margin-top: 40px;">Your cart is empty.</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `).join('');
    }

    // Update Total Price
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
}

// Checkout Handler Mock
function handleCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you for your purchase! Order placed successfully.");
    cart = [];
    updateCartUI();
    toggleCart();
}

// Run app on load
document.addEventListener('DOMContentLoaded', initStore);