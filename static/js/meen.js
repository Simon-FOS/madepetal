// Sample product data
const products = [
    {
        id: 1,
        name: "Hydrating Face Serum",
        price: 4850,
        image: "static/img/Products/x16.jpg",
        category: "skincare",
        description: "Our hydrating face serum is formulated with hyaluronic acid and botanical extracts to deeply moisturize and plump the skin, reducing the appearance of fine lines and wrinkles."
    },
    {
        id: 2,
        name: "Revitalizing Eye Cream",
        price: 7000,
        image: "static/img/Products/x12.jpg",
        category: "skincare",
        description: "This luxurious eye cream helps reduce puffiness, dark circles, and fine lines around the delicate eye area with its blend of caffeine, peptides, and vitamin K."
    },
    {
        id: 3,
        name: "Gentle Foam Cleanser",
        price: 14500,
        image: "static/img/Products/x14.jpg",
        category: "skincare",
        description: "A mild yet effective cleanser that removes impurities without stripping the skin of its natural oils. Perfect for all skin types, including sensitive skin."
    },
    {
        id: 4,
        name: "Anti-Aging Moisturizer",
        price: 11800,
        image: "static/img/Products/x11.jpg",
        category: "skincare",
        description: "Formulated with retinol and antioxidants, this moisturizer helps reduce the appearance of wrinkles while improving skin texture and tone."
    }
];

// Cart functionality
let cart = [];

// Add item to cart
function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    const cartItemsEl = document.getElementById('cartItems');
    const cartCountEl = document.querySelector('.cart-count');
    const cartSubtotalEl = document.getElementById('cartSubtotal');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
        cartItemsEl.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <p class="text-muted">Your cart is empty</p>
            </div>
        `;
    } else {
        cartItemsEl.innerHTML = cart.map(item => `
            <div class="d-flex mb-3">
                <img src="${item.image}" alt="${item.name}" class="img-thumbnail me-3" width="60" height="60">
                <div class="flex-grow-1">
                    <h6 class="mb-1">${item.name}</h6>
                    <small class="text-muted">₦${item.price.toLocaleString()} x ${item.quantity}</small>
                </div>
                <div class="text-end">
                    <p class="mb-1 fw-bold">₦${(item.price * item.quantity).toLocaleString()}</p>
                    <button class="btn btn-sm btn-outline-danger remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const productId = parseInt(this.getAttribute('data-id'));
                cart = cart.filter(item => item.id !== productId);
                updateCartUI();
            });
        });
    }

    // Update subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSubtotalEl.textContent = `₦${subtotal.toLocaleString()}.00`;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    // View product details
    document.querySelectorAll('.view-detail').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);

            if (product) {
                document.getElementById('modalProductTitle').textContent = product.name;
                document.getElementById('modalProductPrice').textContent = `₦${product.price.toLocaleString()}.00`;
                document.getElementById('modalProductDescription').textContent = product.description;
                document.getElementById('modalProductImage').src = product.image;

                const modal = new bootstrap.Modal(document.getElementById('productDetailModal'));
                modal.show();
            }
        });
    });

    // Add to cart from grid
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId, 1);
        });
    });

    // Add to cart from modal
    document.getElementById('addToCartModalBtn').addEventListener('click', function () {
        const productId = parseInt(document.querySelector('#productDetailModal .view-detail').getAttribute('data-id'));
        const quantity = parseInt(document.getElementById('quantityInput').value);
        addToCart(productId, quantity);

        const modal = bootstrap.Modal.getInstance(document.getElementById('productDetailModal'));
        modal.hide();
    });

    // Quantity controls
    document.getElementById('incrementQty').addEventListener('click', function () {
        const input = document.getElementById('quantityInput');
        input.value = parseInt(input.value) + 1;
    });

    document.getElementById('decrementQty').addEventListener('click', function () {
        const input = document.getElementById('quantityInput');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
        }
    });

    // Category filter
    document.querySelectorAll('.category-filter .nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector('.category-filter .nav-link.active').classList.remove('active', 'bg-pink', 'text-white');
            this.classList.add('active', 'bg-pink', 'text-white');
            // Filter functionality would go here
        });
    });

    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function () {
        alert('Proceeding to checkout!');
    });
});