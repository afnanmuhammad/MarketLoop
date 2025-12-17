// --- Global State & Helper Functions ---

const App = {
    state: {
        cart: [],
        savedItems: [],
        products: [
            {
                id: 1,
                title: "GoPro HERO6 4K Action Camera - Black",
                price: 99.50,
                oldPrice: 1128.00,
                image: "../assets/Image/tech/image 29.png",
                rating: 7.5,
                stars: 4.5,
                seller: "TechWorld",
                size: "Compact",
                color: "Black",
                material: "Plastic",
                qty: 1
            },
            {
                id: 2,
                title: "iPhone 12 Pro Max",
                price: 99.50,
                oldPrice: 1128.00,
                image: "../assets/Image/tech/6.png",
                rating: 5.9,
                stars: 5,
                seller: "Apple Store",
                size: "Medium",
                color: "Blue",
                material: "Glass",
                qty: 1
            },
            {
                id: 3,
                title: "Xiaomi Redmi 8 Original",
                price: 99.50,
                image: "../assets/Image/tech/8.png",
                rating: 7.5,
                stars: 4,
                seller: "Mobile Hub",
                size: "Standard",
                color: "Blue",
                material: "Glass/Plastic",
                qty: 1
            },
            {
                id: 4,
                title: "Tablet 10.1 inch",
                price: 99.50,
                oldPrice: 1128.00,
                image: "../assets/Image/tech/image 34.png",
                rating: 7.5,
                stars: 4.5,
                seller: "TechGadgets",
                size: "10.1 inch",
                color: "Grey",
                material: "Aluminum",
                qty: 1
            },
            {
                id: 5,
                title: "Canon Camera DSLR",
                price: 99.50,
                oldPrice: 1128.00,
                image: "../assets/Image/tech/6.png",
                rating: 7.5,
                stars: 4.5,
                seller: "Camera Shop",
                size: "Standard",
                color: "Black",
                material: "Glass",
                qty: 1
            },
            {
                id: 6,
                title: "Smartphone Blue Edition",
                price: 99.50,
                image: "../assets/Image/tech/image 29.png",
                rating: 7.5,
                stars: 4.5,
                seller: "Mobile Hub",
                size: "Standard",
                color: "Blue",
                material: "Glass",
                qty: 1
            },
            // {
            //     id: 7,
            //     title: "GoPro HERO6 4K Action Camera - Black",
            //     price: 99.50,
            //     oldPrice: 1128.00,
            //     image: "../assets/Image/tech/image 29.png",
            //     rating: 7.5,
            //     stars: 4.5,
            //     seller: "TechWorld",
            //     size: "Compact",
            //     color: "Black",
            //     material: "Plastic",
            //     qty: 1
            // },
            // {
            //     id: 8,
            //     title: "iPhone 12 Pro Max",
            //     price: 99.50,
            //     oldPrice: 1128.00,
            //     image: "../assets/Image/tech/6.png",
            //     rating: 5.9,
            //     stars: 5,
            //     seller: "Apple Store",
            //     size: "Medium",
            //     color: "Blue",
            //     material: "Glass",
            //     qty: 1
            // },
            // {
            //     id: 9,
            //     title: "Xiaomi Redmi 8 Original",
            //     price: 99.50,
            //     image: "../assets/Image/tech/8.png",
            //     rating: 7.5,
            //     stars: 4,
            //     seller: "Mobile Hub",
            //     size: "Standard",
            //     color: "Blue",
            //     material: "Glass/Plastic",
            //     qty: 1
            // }
        ]
    },

    init() {
        this.loadState();
        this.loadHeader();
        this.loadFooter();
        this.setupRouting();
        this.setupOrderHistory();
    },

    loadState() {
        const cart = localStorage.getItem('cart');
        const saved = localStorage.getItem('savedItems');

        if (cart && JSON.parse(cart).length > 0) {
            this.state.cart = JSON.parse(cart);
        } else {
            // Initialize with mock data matching the design screenshot
            this.state.cart = [
                {
                    id: 101,
                    title: "T-shirts with multiple colors, for men and lady",
                    price: 78.99,
                    image: "../assets/Image/tech/image 29.png",
                    size: "medium",
                    color: "blue",
                    material: "Plastic",
                    seller: "Artel Market",
                    qty: 9
                },
                {
                    id: 102,
                    title: "T-shirts with multiple colors, for men and lady",
                    price: 39.00,
                    image: "../assets/Image/tech/image 34.png",
                    size: "medium",
                    color: "blue",
                    material: "Plastic",
                    seller: "Best factory LLC",
                    qty: 3
                },
                {
                    id: 103,
                    title: "T-shirts with multiple colors, for men and lady",
                    price: 170.50,
                    image: "../assets/Image/tech/6.png",
                    size: "medium",
                    color: "blue",
                    material: "Plastic",
                    seller: "Artel Market",
                    qty: 1
                }
            ];
            this.saveCart();
        }

        if (saved) this.state.savedItems = JSON.parse(saved);
    },

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
        this.updateHeaderBadge();
    },

    saveSavedItems() {
        localStorage.setItem('savedItems', JSON.stringify(this.state.savedItems));
    },

    addToCart(product) {
        const existingItem = this.state.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.qty++;
        } else {
            this.state.cart.push({ ...product, qty: 1 });
        }
        this.saveCart();
        alert("Item added to cart!");
        this.updateHeaderBadge();
    },

    removeFromCart(id) {
        this.state.cart = this.state.cart.filter(item => item.id !== id);
        this.saveCart();
        this.renderCart();
    },

    saveForLater(id) {
        const item = this.state.cart.find(i => i.id === id);
        if (item) {
            this.removeFromCart(id);
            // Check if already in saved
            if (!this.state.savedItems.find(i => i.id === id)) {
                this.state.savedItems.push(item);
                this.saveSavedItems();
            }
            this.renderSavedItems();
        }
    },

    moveToCart(id) {
        const item = this.state.savedItems.find(i => i.id === id);
        if (item) {
            this.state.savedItems = this.state.savedItems.filter(i => i.id !== id);
            this.saveSavedItems();
            this.addToCart(item); // Utilize addToCart logic
            this.renderSavedItems();

            // If on cart page, re-render cart as well
            if (window.location.pathname.includes('cart.html')) {
                this.renderCart();
            }
        }
    },

    updateQuantity(id, newQty) {
        const item = this.state.cart.find(i => i.id === id);
        if (item) {
            item.qty = parseInt(newQty);
            this.saveCart();
            this.renderCart(); // Re-render to update totals
        }
    },

    getCartTotal() {
        return this.state.cart.reduce((total, item) => total + (item.price * item.qty), 0);
    },

    updateHeaderBadge() {
        // Find badge element (usually in header loaded dynamically, so might need a retry or observer, 
        // but for now we assume it routes header load)
        // Simple implementation: check if element exists
        // Note: Since header is loaded via fetch, this might run before header exists. 
        // Logic handled in loadHeader callback.
    },

    // --- DOM Loading & Rendering ---

    loadHeader() {
        fetch("/components/header.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("header").innerHTML = data;
                // Add badge logic here if we add a badge element in HTML
                this.setupHeaderEvents();
                this.updateAuthUI();
            });
    },

    loadFooter() {
        fetch("/components/footer.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("footer").innerHTML = data;
            });
    },

    setupHeaderEvents() {
        // Search Logic
        const searchBtn = document.querySelector('.search-button');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                window.location.href = '/pages/product-list.html';
            });
        }

        const input = document.querySelector('.search-input');
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') window.location.href = '/pages/product-list.html';
            });
        }

        // Dropdown Logic
        document.addEventListener('click', (e) => {
            const isDropdownBtn = e.target.closest('.dropdown-toggle');

            // Close all open dropdowns if clicking outside
            if (!isDropdownBtn && !e.target.closest('.dropdown-menu')) {
                document.querySelectorAll('.custom-dropdown.active').forEach(d => {
                    d.classList.remove('active');
                });
                return;
            }

            // Toggle clicked dropdown
            if (isDropdownBtn) {
                const dropdown = isDropdownBtn.closest('.custom-dropdown');

                // Close others
                document.querySelectorAll('.custom-dropdown.active').forEach(d => {
                    if (d !== dropdown) d.classList.remove('active');
                });

                dropdown.classList.toggle('active');
            }
        });

        // Handle selection within dropdowns (Visual update)
        document.querySelectorAll('.dropdown-menu li').forEach(item => {
            item.addEventListener('click', (e) => {
                const dropdown = item.closest('.custom-dropdown');
                const toggleBtn = dropdown.querySelector('.dropdown-toggle');
                const arrowIcon = toggleBtn.querySelector('.arrow-icon');

                // Get new content (text and potentially flag image) from the clicked item
                // We want to preserve the arrow icon, so we reconstruct the button content
                const newContent = item.innerHTML;

                toggleBtn.innerHTML = `${newContent} <img src="../assets/Image/control/Vector.png" alt="arrow" class="arrow-icon"/>`;

                dropdown.classList.remove('active');
            });
        });
    },

    updateAuthUI() {
        const profileLink = document.getElementById('nav-profile-link');
        if (profileLink) {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                // User is logged in
                profileLink.href = '/pages/profile.html';
                profileLink.querySelector('span').innerText = 'Profile'; // Or user.name

                // Optional: Add Logout option?
                // For now, Profile page can have logout.
            } else {
                // User is not logged in
                profileLink.href = '/pages/login.html';
                profileLink.querySelector('span').innerText = 'Sign In';
            }
        }
    },

    setupRouting() {
        const path = window.location.pathname;
        if (path.includes('cart.html')) {
            this.renderCart();
            this.renderSavedItems();
        } else if (path.includes('product-list.html')) {
            this.setupProductList();
        } else if (path.includes('product-detail.html')) {
            this.setupProductDetail();
        } else if (path.includes('payment.html')) {
            this.setupPayment();
        } else if (path.includes('invoice.html')) {
            this.setupInvoice();
        }
    },

    // --- Cart Page Logic ---

    renderCart() {
        const container = document.querySelector('.cart-content');
        if (!container) return; // Not on cart page

        // Clear existing items (keep the title and empty if needed, effectively rebuilding the list)
        // We need to keep the structure. Let's find the list container.
        // Based on current HTML, items are direct children of .cart-content. 
        // We should wrap them or identify them. 

        // Strategy: Clear everything except the "cart-features" at bottom, or easier: 
        // The HTML structure is .cart-content > .cart-item ... and .cart-actions-row and .cart-features.
        // We will insert items BEFORE .cart-actions-row

        const existingItems = container.querySelectorAll('.cart-item');
        existingItems.forEach(el => el.remove());

        const insertTarget = container.querySelector('.cart-actions-row');

        if (this.state.cart.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'cart-item';
            emptyMsg.innerHTML = '<p style="padding: 20px;">Your cart is empty.</p>';
            container.insertBefore(emptyMsg, insertTarget);
        } else {
            this.state.cart.forEach(item => {
                const el = document.createElement('div');
                el.className = 'cart-item';
                el.innerHTML = `
                    <div class="item-img">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="item-details">
                        <div class="item-info-top">
                            <div class="item-text">
                                <h3>${item.title}</h3>
                                <p class="item-meta">Size: ${item.size}, Color: ${item.color}, Material: ${item.material}</p>
                                <p class="seller">Seller: ${item.seller}</p>
                            </div>
                        </div>
                        <div class="item-controls">
                            <button class="action-btn remove" onclick="App.removeFromCart(${item.id})">Remove</button>
                            <button class="action-btn save" onclick="App.saveForLater(${item.id})">Save for later</button>
                        </div>
                    </div>
                    <div class="item-price-qty">
                        <span class="price">$${item.price.toFixed(2)}</span>
                        <select class="qty-select" onchange="App.updateQuantity(${item.id}, this.value)">
                            <option value="1" ${item.qty === 1 ? 'selected' : ''}>Qty: 1</option>
                            <option value="2" ${item.qty === 2 ? 'selected' : ''}>Qty: 2</option>
                            <option value="3" ${item.qty === 3 ? 'selected' : ''}>Qty: 3</option>
                            <option value="4" ${item.qty === 4 ? 'selected' : ''}>Qty: 4</option>
                            <option value="5" ${item.qty === 5 ? 'selected' : ''}>Qty: 5</option>
                            <option value="6" ${item.qty === 6 ? 'selected' : ''}>Qty: 6</option>
                            <option value="7" ${item.qty === 7 ? 'selected' : ''}>Qty: 7</option>
                            <option value="8" ${item.qty === 8 ? 'selected' : ''}>Qty: 8</option>
                            <option value="9" ${item.qty === 9 ? 'selected' : ''}>Qty: 9</option>
                        </select>
                    </div>
                `;
                container.insertBefore(el, insertTarget);
            });
        }

        // Update Title
        const title = document.querySelector('.cart-title');
        if (title) title.innerText = `My cart (${this.state.cart.length})`;

        this.renderTotals();

        // Checkout Button Logic
        const checkoutBtn = document.querySelector('.checkout-btn');
        // Remove existing listeners to avoid duplicates if re-rendered (though simple here)
        // Since we re-render whole container usually, or just page load, it's fine.
        // Actually .checkout-btn is in sidebar which is NOT re-rendered by renderCart (only .cart-content is).
        // So we should add this listener once or check if added. 
        // Better place: setupCartEvents or similar if sidebar is static. 
        // But sidebar is static in HTML. So let's add it in setupProductList or a new setupCart.

        if (checkoutBtn) {
            // Clone to remove old listeners
            const newBtn = checkoutBtn.cloneNode(true);
            checkoutBtn.parentNode.replaceChild(newBtn, checkoutBtn);

            newBtn.addEventListener('click', () => {
                if (this.state.cart.length === 0) {
                    alert('Your cart is empty!');
                } else {
                    window.location.href = 'payment.html';
                }
            });
        }
    },

    renderTotals() {
        const subtotal = this.getCartTotal();
        // Hardcoded discount/tax for demo as per current static HTML
        const discount = 60.00;
        const tax = 14.00;

        const total = subtotal - discount + tax;

        // Find elements (Assuming we will add classes/ids in HTML step)
        // Currently they are just in .summary-row
        // We'll traverse or select by hierarchy in the HTML update step, 
        // here assuming we can select them.

        const summaryCard = document.querySelector('.summary-card');
        if (summaryCard) {
            const rows = summaryCard.querySelectorAll('.summary-row span:last-child');
            if (rows.length >= 4) {
                rows[0].innerText = `$${subtotal.toFixed(2)}`;
                // rows[1] is discount, keep static
                // rows[2] is tax, keep static
                rows[3].innerText = `$${total > 0 ? total.toFixed(2) : '0.00'}`;
            }
        }
    },

    renderSavedItems() {
        const container = document.querySelector('.saved-grid');
        if (!container) return;

        container.innerHTML = '';

        this.state.savedItems.forEach(item => {
            const el = document.createElement('div');
            el.className = 'product-card saved-card';
            el.innerHTML = `
                <div class="img-wrapper">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="card-content">
                    <div class="price">$${item.price.toFixed(2)}</div>
                    <div class="title">${item.title}</div>
                    <button class="move-cart-btn" onclick="App.moveToCart(${item.id})"><i class="fa-solid fa-cart-shopping"></i> Move to cart</button>
                </div>
            `;
            container.appendChild(el);
        });
    },

    // --- Product List Logic ---
    setupProductList() {
        this.renderProductList();
        this.setupViewSwitcher();
    },

    setupViewSwitcher() {
        const productListContainer = document.querySelector('.product-list-container');
        if (productListContainer) {
            const gridBtn = document.querySelector('.view-switcher button:first-child');
            const listBtn = document.querySelector('.view-switcher button:last-child');

            if (gridBtn && listBtn) {
                gridBtn.addEventListener('click', () => {
                    productListContainer.classList.add('grid-3-col');
                    productListContainer.classList.remove('list-view');
                    gridBtn.classList.add('active');
                    listBtn.classList.remove('active');
                    // Update icon if needed, or better yet, just toggle class on container and CSS handles layout
                });

                listBtn.addEventListener('click', () => {
                    productListContainer.classList.remove('grid-3-col');
                    productListContainer.classList.add('list-view');
                    listBtn.classList.add('active');
                    gridBtn.classList.remove('active');
                });
            }
        }
    },

    renderProductList() {
        const container = document.querySelector('.product-list-container');
        if (!container) return; // Not on product list page

        container.innerHTML = '';

        this.state.products.forEach(product => {
            const article = document.createElement('article');
            article.className = 'product-card';
            // Click navigates to detail
            article.onclick = (e) => {
                // Prevent navigation if clicking buttons
                if (e.target.closest('button')) return;
                window.location.href = `product-detail.html?id=${product.id}`;
            };
            article.style.cursor = 'pointer';

            // Generate Stars HTML
            let starsHtml = '';
            for (let i = 0; i < 5; i++) {
                if (i < Math.floor(product.stars)) {
                    starsHtml += '<i class="fa-solid fa-star filled"></i>';
                } else if (i < product.stars) {
                    starsHtml += '<i class="fa-solid fa-star-half-stroke filled"></i>';
                } else {
                    starsHtml += '<i class="fa-regular fa-star"></i>'; // Empty star if needed or just colored gray in CSS
                    // Based on HTML, it used fa-solid or fa-regular. Stick to design HTML.
                }
            }
            // Fix: Design used specific mix. Let's just use filled vs regular gray for simplicity or logic above.
            // HTML Reference: <i class="fa-solid fa-star filled"></i>

            article.innerHTML = `
                <div class="img-wrapper">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info-block">
                    <div class="price-row">
                        <div>
                            <span class="current-price">$${product.price.toFixed(2)}</span>
                            ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                        </div>
                        <button class="wishlist-btn" onclick="App.addToCart(App.state.products.find(p => p.id === ${product.id}))">
                            <i class="fa-regular fa-heart"></i>
                        </button>
                    </div>
                    <div class="rating-row">
                        <span class="stars">${starsHtml}</span>
                        <span class="rating-score">${product.rating}</span>
                    </div>
                    <h3 class="product-title">${product.title}</h3>
                </div>
            `;
            container.appendChild(article);
        });
    },

    // --- Payment Logic ---
    setupPayment() {
        const subtotalEl = document.getElementById('summary-subtotal');
        const totalEl = document.getElementById('summary-total');

        if (subtotalEl && totalEl) {
            const subtotal = this.getCartTotal();
            const tax = 14.00;
            const discount = 60.00;
            const total = subtotal + tax - discount;

            subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
            totalEl.textContent = `$${total > 0 ? total.toFixed(2) : '0.00'}`;
        }
    },

    handlePayment() {
        const form = document.querySelector('#payment-form');
        // Simple mock validation
        if (form.checkValidity()) {
            // Capture Customer Name
            const nameInput = form.querySelector('input[placeholder="Enter your name"]');
            const customerName = nameInput ? nameInput.value : "Customer";

            // Calculate totals
            const subtotal = this.getCartTotal();
            const tax = 14.00;
            const discount = 60.00;
            const total = subtotal + tax - discount;

            // Create Order Object
            const order = {
                id: 'ORD-' + Math.floor(Math.random() * 1000000),
                date: new Date().toLocaleDateString(),
                customer: customerName,
                items: this.state.cart,
                totals: {
                    subtotal: subtotal,
                    tax: tax,
                    discount: discount,
                    total: total > 0 ? total : 0
                }
            };

            // Save Order
            localStorage.setItem('lastOrder', JSON.stringify(order));

            // Save to History
            const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
            history.unshift(order); // Add new order to top
            localStorage.setItem('orderHistory', JSON.stringify(history));

            alert("Payment Successful!");
            this.state.cart = []; // Clear cart
            this.saveCart();
            window.location.href = '/pages/invoice.html'; // Redirect to invoice
        } else {
            alert("Please fill in all payment details correctly.");
            form.reportValidity();
        }
    },

    // --- Invoice Logic ---
    setupInvoice() {
        this.renderInvoice();
    },

    renderInvoice() {
        const orderData = localStorage.getItem('lastOrder');
        if (!orderData) {
            // No order found, redirect
            window.location.href = '/index.html';
            return;
        }

        const order = JSON.parse(orderData);

        // Populate Details
        document.getElementById('inv-customer-name').innerText = order.customer;
        document.getElementById('inv-idx').innerText = `#${order.id}`;
        document.getElementById('inv-date').innerText = `Date: ${order.date}`;

        // Populate Items
        const tbody = document.getElementById('invoice-items-body');
        if (tbody) {
            tbody.innerHTML = '';
            order.items.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="item-name">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <img src="${item.image}" alt="" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                            <div>
                                ${item.title}<br>
                                <small style="color: #8b96a5;">${item.size || ''} ${item.color || ''}</small>
                            </div>
                        </div>
                    </td>
                    <td>${item.qty}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td class="total-col">$${(item.price * item.qty).toFixed(2)}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        // Populate Totals
        document.getElementById('inv-subtotal').innerText = `$${order.totals.subtotal.toFixed(2)}`;
        document.getElementById('inv-tax').innerText = `$${order.totals.tax.toFixed(2)}`;
        document.getElementById('inv-discount').innerText = `-$${order.totals.discount.toFixed(2)}`;
        document.getElementById('inv-total').innerText = `$${order.totals.total.toFixed(2)}`;
    },

    // --- Order History Logic ---
    setupOrderHistory() {
        this.renderOrderHistory();
    },

    renderOrderHistory() {
        const tbody = document.getElementById('order-history-body');
        if (!tbody) return;

        const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');

        if (history.length > 0) {
            tbody.innerHTML = '';
            history.forEach(order => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="font-weight: 600;">#${order.id}</td>
                    <td style="color: #606060;">${order.date}</td>
                    <td style="font-weight: 500;">$${order.totals.total.toFixed(2)}</td>
                    <td><span class="status status-processing">Processing</span></td>
                    <td><a href="#" class="action-btn">View Order</a></td>
                `;
                tbody.appendChild(tr);
            });
        }
    },

    // --- Product Detail Logic ---
    setupProductDetail() {
        // Image Gallery
        const mainImage = document.querySelector('.main-image img');
        const thumbs = document.querySelectorAll('.thumb-item');

        if (mainImage && thumbs.length > 0) {
            thumbs.forEach(thumb => {
                thumb.addEventListener('click', function () {
                    // Update main image
                    const newSrc = this.querySelector('img').src;
                    mainImage.src = newSrc;

                    // Update active class
                    thumbs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }

        // Tabs
        const tabItems = document.querySelectorAll('.tab-item');
        // Assuming tab content is currently one block in HTML, 
        // we'd need to structure HTML to have multiple content blocks to toggle.
        // For now, toggle active class.
        tabItems.forEach(tab => {
            tab.addEventListener('click', function () {
                tabItems.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
};

// Start App
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
