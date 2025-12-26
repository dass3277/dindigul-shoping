const CONFIG = {
    whatsappNumber: "918778131361",
    adminName: "Dindigul Shopping",
    serviceArea: "Dindigul",
    adminPass: "admin123"
};

const defaultProducts = [
    { id: 1, name: 'Premium Ponni Rice', name_ta: 'பீரிமியம் பொன்னி அரிசி', category: 'Groceries', price: 1250, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', unit: '25kg', description: 'Top quality Ponni rice from local farms. Perfect for daily meals.' },
    { id: 2, name: 'Sandalwood Soap', name_ta: 'சந்தன சோப்பு', category: 'Local Products', price: 45, image: 'https://images.unsplash.com/photo-1605264964528-06403738d6dc?w=400', unit: '1 pc', description: 'Handmade sandalwood soap with natural fragrance.' },
    { id: 3, name: 'Dindigul Biriyani Masala', name_ta: 'திண்டுக்கல் பிரியாணி மசாலா', category: 'Groceries', price: 85, image: 'https://images.unsplash.com/photo-1596797038558-9da39b9254c3?w=400', unit: '100g', description: 'The famous authentic Dindigul biriyani taste in a pack.' },
    { id: 4, name: 'Fresh Carrots', name_ta: 'பச்சை கேரட்', category: 'Vegetables', price: 40, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400', unit: '1kg', description: 'Freshly harvested carrots from nearby fields.' },
    { id: 5, name: 'Organic Red Chilli', name_ta: 'இயற்கை வரமிளகாய்', category: 'Groceries', price: 180, image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400', unit: '500g', description: 'Spicy and sun-dried organic red chillies.' }
];

const state = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAdmin: JSON.parse(localStorage.getItem('isAdmin')) || false,
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    orders: JSON.parse(localStorage.getItem('orders')) || [],
    currentView: 'login',
    selectedCategory: null,
    selectedProduct: null,
    products: JSON.parse(localStorage.getItem('products')) || defaultProducts,
    categories: ['Groceries', 'Vegetables', 'Textiles', 'Electronics', 'Local Products'],
    lang: localStorage.getItem('lang') || 'ta',
    searchQuery: ''
};

const i18n = {
    ta: {
        welcome: "திண்டுக்கல் ஷாப்பிங் உங்களை வரவேற்கிறது",
        login: "உள்நுழைக",
        mobile: "செல்பேசி எண்",
        pass: "கடவுச்சொல்",
        sendOtp: "OTP அனுப்பவும்",
        adminLogin: "நிர்வாகி உள்நுழைவு",
        cat: "வகைகள்",
        cart: "எனது பை",
        checkout: "செக்அவுட்",
        back: "பின்னால்",
        search: "தயாரிப்புகளைத் தேடுங்கள்...",
        addToCart: "பையில் சேர்க்கவும்",
        total: "மொத்த தொகை",
        placeOrder: "வாட்ஸ்அப் மூலம் ஆர்டர் செய்யவும்",
        history: "எனது ஆர்டர்கள்",
        emptyCart: "உங்கள் பை காலியாக உள்ளது",
        address: "முழு முகவரி",
        name: "பெயர்",
        landmark: "அடையாளம்",
        unit: "அலகு",
        otpTitle: "OTP சரிபார்ப்பு",
        otpSent: "அனுப்பப்பட்ட எண்",
        otpEnter: "6-இலக்க OTP-ஐ உள்ளிடவும்",
        otpVerify: "சரிபார்க்கவும்"
    },
    en: {
        welcome: "Welcome to Dindigul Shopping",
        login: "Login",
        mobile: "Mobile Number",
        pass: "Password",
        sendOtp: "Send OTP",
        adminLogin: "Admin Login",
        cat: "Categories",
        cart: "My Cart",
        checkout: "Checkout",
        back: "Back",
        search: "Search products...",
        addToCart: "Add to Cart",
        total: "Total Amount",
        placeOrder: "Place Order via WhatsApp",
        history: "My Orders",
        emptyCart: "Your cart is empty",
        address: "Full Address",
        name: "Name",
        landmark: "Landmark",
        unit: "Unit",
        otpTitle: "Verify OTP",
        otpSent: "Sent to",
        otpEnter: "Enter 6-digit OTP",
        otpVerify: "Verify & Login"
    }
};

const t = (key) => i18n[state.lang][key] || key;

const views = {
    login: () => `
        <div class="auth-card" style="padding: 30px;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="color: var(--primary); font-size: 32px; font-weight: 800;">Dindigul Shopping</h1>
                <p style="color: var(--text-muted);">${t('welcome')}</p>
            </div>
            
            <div class="input-group">
                <label>${t('mobile')}</label>
                <input type="tel" id="mobile" placeholder="9876543210" maxlength="10">
            </div>

            <div class="input-group">
                <label>${t('pass')}</label>
                <input type="password" id="password" placeholder="••••••••">
            </div>

            <button onclick="handleLogin()" class="btn">${t('sendOtp')}</button>
            <div style="text-align: center; margin-top: 30px;">
                <a href="#" onclick="navigate('adminLogin')" style="color: var(--text-muted); font-size: 12px; text-decoration: none;">${t('adminLogin')}</a>
            </div>
            <div style="margin-top: 20px; text-align: center;">
                <span class="lang-btn ${state.lang === 'ta' ? 'active' : ''}" onclick="setLang('ta')">Tamil</span> | 
                <span class="lang-btn ${state.lang === 'en' ? 'active' : ''}" onclick="setLang('en')">English</span>
            </div>
        </div>
    `,

    adminLogin: () => `
        <div class="auth-card" style="padding: 30px;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="color: var(--secondary); font-size: 24px;">Admin Access</h1>
            </div>
            <div class="input-group">
                <label>Admin Password</label>
                <input type="password" id="admin-pass" placeholder="••••••••">
            </div>
            <button onclick="handleAdminLogin()" class="btn btn-secondary">Login to Dashboard</button>
            <button onclick="navigate('login')" class="btn" style="background:none; color:var(--text-muted); margin-top:10px;">Back</button>
        </div>
    `,

    admin: () => `
        <header class="header">
            <div class="logo">Admin</div>
            <button onclick="handleLogout()" class="btn btn-small btn-danger" style="width:auto;">Logout</button>
        </header>
        <div style="padding: 20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h2 style="font-size:18px;">Products</h2>
                <button onclick="showAddProduct()" class="btn btn-small" style="width:auto;">+ New</button>
            </div>
            <table class="admin-table">
                ${state.products.map(p => `
                    <tr>
                        <td width="50"><img src="${p.image}" style="width:40px;height:40px;object-fit:cover;border-radius:4px;"></td>
                        <td>${p.name}<br><small>₹${p.price}</small></td>
                        <td class="admin-actions">
                            <button onclick="deleteProduct(${p.id})" class="btn btn-small btn-danger">X</button>
                        </td>
                    </tr>
                `).join('')}
            </table>
        </div>
        ${productModal()}
    `,

    home: () => `
        <header class="header">
            <div class="logo">Dindigul Shopping</div>
            <div style="display:flex; gap:15px; align-items:center;">
                <div onclick="navigate('history')" style="cursor:pointer; font-size:14px;">📜</div>
                <div onclick="navigate('cart')" style="position: relative; cursor: pointer;">
                    🛒 <span style="position: absolute; top: -8px; right: -8px; background: var(--primary); color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 10px; display: flex; align-items: center; justify-content: center;">${state.cart.length}</span>
                </div>
            </div>
        </header>

        <div class="lang-toggle">
            <span class="lang-btn ${state.lang === 'ta' ? 'active' : ''}" onclick="setLang('ta')">Tamil</span>
            <span class="lang-btn ${state.lang === 'en' ? 'active' : ''}" onclick="setLang('en')">English</span>
        </div>

        <div class="search-container">
            <input type="text" class="search-bar" placeholder="${t('search')}" oninput="handleSearch(this.value)" value="${state.searchQuery}">
        </div>

        <div style="padding: 20px;">
            <h2 style="margin-bottom: 20px; font-size: 18px;">${state.searchQuery ? 'Results' : t('cat')}</h2>
            ${state.searchQuery ? `
                <div style="padding: 0;">
                    ${state.products.filter(p => p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || p.name_ta.includes(state.searchQuery)).map(p => productCard(p)).join('')}
                </div>
            ` : `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    ${state.categories.map(cat => `
                        <div onclick="selectCategory('${cat}')" style="background: white; border-radius: var(--radius); padding: 20px; text-align: center; box-shadow: var(--shadow); cursor: pointer; border: 1px solid var(--border);">
                            <div style="font-size: 30px; margin-bottom: 10px;">${getCategoryEmoji(cat)}</div>
                            <div style="font-weight: 600; font-size: 14px;">${cat}</div>
                        </div>
                    `).join('')}
                </div>
            `}
        </div>
        ${productDetailModal()}
    `,

    category: () => `
        <header class="header">
            <div onclick="navigate('home')" style="cursor: pointer;">← ${t('back')}</div>
            <div class="logo">${state.selectedCategory}</div>
            <div onclick="navigate('cart')" style="position: relative; cursor:pointer;">
                🛒 <span style="position: absolute; top: -10px; right: -10px; background: var(--primary); color: white; border-radius: 50%; width: 20px; height: 20px; font-size: 12px; display: flex; align-items: center; justify-content: center;">${state.cart.length}</span>
            </div>
        </header>

        <div style="padding: 15px;">
            ${state.products.filter(p => p.category === state.selectedCategory).map(p => productCard(p)).join('')}
        </div>
        ${productDetailModal()}
    `,

    cart: () => `
        <header class="header">
            <div onclick="navigate('home')" style="cursor: pointer;">← ${t('back')}</div>
            <div class="logo">${t('cart')}</div>
            <div></div>
        </header>

        <div style="padding: 20px; flex: 1;">
            ${state.cart.length === 0 ? `<p style="text-align: center; color: var(--text-muted); margin-top: 50px;">${t('emptyCart')}</p>` :
            state.cart.map(item => `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; background: white; padding: 10px; border-radius: var(--radius); border: 1px solid var(--border);">
                    <div>
                        <div style="font-weight: 600;">${state.lang === 'ta' ? item.name_ta : item.name}</div>
                        <div style="color: var(--text-muted); font-size: 12px;">₹${item.price} x ${item.quantity}</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <button onclick="updateQty(${item.id}, -1)" style="padding: 5px 10px; background: var(--border); border: none; border-radius: 4px;">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQty(${item.id}, 1)" style="padding: 5px 10px; background: var(--border); border: none; border-radius: 4px;">+</button>
                    </div>
                </div>
              `).join('')
        }
        </div>

        ${state.cart.length > 0 ? `
            <div style="padding: 20px; background: white; border-top: 1px solid var(--border);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-weight: 700; font-size: 18px;">
                    <span>${t('total')}:</span>
                    <span>₹${state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)}</span>
                </div>
                <button onclick="navigate('checkout')" class="btn">${t('checkout')}</button>
            </div>
        ` : ''}
    `,

    checkout: () => `
        <header class="header">
            <div onclick="navigate('cart')" style="cursor: pointer;">← ${t('back')}</div>
            <div class="logo">${t('checkout')}</div>
            <div></div>
        </header>

        <div style="padding: 20px;">
            <div class="input-group">
                <label>${t('name')}</label>
                <input type="text" id="cust-name" placeholder="Enter your full name">
            </div>
            <div class="input-group">
                <label>${t('mobile')}</label>
                <input type="tel" id="cust-mobile" value="${state.user?.mobile || ''}" readonly>
            </div>
            <div class="input-group">
                <label>${t('address')}</label>
                <textarea id="cust-address" style="width: 100%; padding: 12px; border: 2px solid var(--border); border-radius: var(--radius); height: 80px;"></textarea>
            </div>
            <div class="input-group">
                <label>${t('landmark')}</label>
                <input type="text" id="cust-landmark" placeholder="Near Temple / School">
            </div>
            
            <button onclick="placeOrder()" class="btn">${t('placeOrder')}</button>
        </div>
    `,

    otp: () => `
        <div class="auth-card" style="padding: 30px;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="color: var(--primary); font-size: 24px;">${t('otpTitle')}</h1>
                <p style="color: var(--text-muted);">${t('otpSent')} +91 ${state.tempUser?.mobile}</p>
            </div>
            
            <div class="input-group">
                <label>${t('otpEnter')}</label>
                <input type="number" id="otp-input" placeholder="123456" maxlength="6">
            </div>

            <button onclick="handleVerifyOTP()" class="btn">${t('otpVerify')}</button>
            <p style="text-align: center; margin-top: 20px; color: var(--text-muted); font-size: 14px;">
                Resend in <span id="timer">01:59</span>
            </p>
        </div>
    `,

    history: () => `
        <header class="header">
            <div onclick="navigate('home')" style="cursor: pointer;">← ${t('back')}</div>
            <div class="logo">${t('history')}</div>
            <div></div>
        </header>
        <div style="padding: 20px;">
            ${state.orders.length === 0 ? '<p style="text-align:center; color:var(--text-muted)">No orders yet.</p>' :
            state.orders.map(o => `
                    <div class="order-history-item">
                        <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                            <span style="font-weight:700;">Order #${o.id}</span>
                            <span style="color:var(--primary);">₹${o.total}</span>
                        </div>
                        <div style="font-size:12px; color:var(--text-muted);">
                            ${o.items.map(i => `${i.name} x ${i.quantity}`).join(', ')}
                        </div>
                        <div style="font-size:10px; margin-top:5px; color:var(--text-muted);">${o.date}</div>
                    </div>
                `).reverse().join('')
        }
        </div>
    `
};

function productCard(p) {
    const name = state.lang === 'ta' ? p.name_ta : p.name;
    return `
        <div onclick="openProductDetail(${p.id})" style="display: flex; background: white; border-radius: var(--radius); overflow: hidden; margin-bottom: 15px; box-shadow: var(--shadow); border: 1px solid var(--border); cursor:pointer;">
            <img src="${p.image}" style="width: 100px; height: 100px; object-fit: cover;">
            <div style="padding: 12px; flex: 1;">
                <h3 style="font-size: 16px; margin-bottom: 4px;">${name}</h3>
                <p style="color: var(--text-muted); font-size: 12px; margin-bottom: 8px;">${p.unit}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 700; color: var(--primary);">₹${p.price}</span>
                    <button onclick="event.stopPropagation(); addToCart(${p.id})" class="btn" style="width: auto; padding: 6px 12px; font-size: 12px;">${t('addToCart')}</button>
                </div>
            </div>
        </div>
    `;
}

function productDetailModal() {
    if (!state.selectedProduct) return '';
    const p = state.selectedProduct;
    const name = state.lang === 'ta' ? p.name_ta : p.name;
    return `
        <div class="modal" style="display:flex;">
            <div class="modal-content" style="max-width:450px;">
                <img src="${p.image}" class="product-detail-img">
                <h2 style="margin-bottom:10px;">${name}</h2>
                <p style="color:var(--text-muted); font-size:14px; margin-bottom:20px;">${p.description || 'Quality product from Dindigul.'}</p>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <span style="font-size:24px; font-weight:700; color:var(--primary);">₹${p.price}</span>
                    <span style="color:var(--text-muted);">${p.unit}</span>
                </div>
                <div style="display:flex; gap:10px;">
                    <button onclick="addToCart(${p.id}); closeProductModal();" class="btn" style="flex:1;">Add to Cart</button>
                    <button onclick="closeProductModal()" class="btn btn-secondary" style="flex:1;">Close</button>
                </div>
            </div>
        </div>
    `;
}

function productModal() {
    return `
        <div id="product-modal" class="modal" style="display:none;">
            <div class="modal-content">
                <h3>Add New Product</h3>
                <div class="input-group"><label>Name (English)</label><input type="text" id="new-p-name"></div>
                <div class="input-group"><label>Name (Tamil)</label><input type="text" id="new-p-name-ta"></div>
                <div class="input-group">
                    <label>Category</label>
                    <select id="new-p-cat" style="width:100%; padding:10px; border-radius:8px; border:2px solid var(--border);">
                        ${state.categories.map(c => `<option value="${c}">${c}</option>`).join('')}
                    </select>
                </div>
                <div class="input-group"><label>Price (₹)</label><input type="number" id="new-p-price"></div>
                <div class="input-group"><label>Image URL</label><input type="text" id="new-p-image"></div>
                <div class="input-group"><label>Unit (e.g. 1kg)</label><input type="text" id="new-p-unit"></div>
                <div style="display:flex; gap:10px;">
                    <button onclick="saveNewProduct()" class="btn">Save</button>
                    <button onclick="closeModal()" class="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </div>
    `;
}

function getCategoryEmoji(cat) {
    const emojis = { 'Groceries': '🛒', 'Vegetables': '🥦', 'Textiles': '👕', 'Electronics': '📱', 'Local Products': '🏺' };
    return emojis[cat] || '📦';
}

function setLang(lang) {
    state.lang = lang;
    localStorage.setItem('lang', lang);
    render();
}

function handleSearch(q) {
    state.searchQuery = q;
    render();
}

function openProductDetail(id) {
    state.selectedProduct = state.products.find(p => p.id === id);
    render();
}

function closeProductModal() {
    state.selectedProduct = null;
    render();
}

function navigate(view) {
    state.currentView = view;
    render();
    window.scrollTo(0, 0);
}

function selectCategory(cat) {
    state.selectedCategory = cat;
    navigate('category');
}

function handleLogin() {
    const mobile = document.getElementById('mobile').value;
    const password = document.getElementById('password').value;
    if (mobile.length !== 10 || !password) {
        alert("Enter valid details");
        return;
    }
    state.tempUser = { mobile, password };
    alert("OTP sent: 123456");
    navigate('otp');
}

function handleVerifyOTP() {
    const otp = document.getElementById('otp-input').value;
    if (otp === "123456") {
        state.user = state.tempUser;
        localStorage.setItem('user', JSON.stringify(state.user));
        navigate('home');
    } else { alert("Invalid OTP"); }
}

function handleAdminLogin() {
    if (document.getElementById('admin-pass').value === CONFIG.adminPass) {
        state.isAdmin = true;
        localStorage.setItem('isAdmin', 'true');
        navigate('admin');
    } else { alert("Wrong password"); }
}

function handleLogout() {
    state.user = null; state.isAdmin = false;
    localStorage.removeItem('user'); localStorage.removeItem('isAdmin');
    navigate('login');
}

function deleteProduct(id) {
    if (confirm("Delete?")) {
        state.products = state.products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(state.products));
        render();
    }
}

function showAddProduct() { document.getElementById('product-modal').style.display = 'flex'; }
function closeModal() { document.getElementById('product-modal').style.display = 'none'; }

function saveNewProduct() {
    const p = {
        id: Date.now(),
        name: document.getElementById('new-p-name').value,
        name_ta: document.getElementById('new-p-name-ta').value || document.getElementById('new-p-name').value,
        category: document.getElementById('new-p-cat').value,
        price: parseInt(document.getElementById('new-p-price').value),
        image: document.getElementById('new-p-image').value || 'https://via.placeholder.com/150',
        unit: document.getElementById('new-p-unit').value || '1 pc'
    };
    if (!p.name || isNaN(p.price)) return alert("Fill all fields");
    state.products.push(p);
    localStorage.setItem('products', JSON.stringify(state.products));
    closeModal(); render();
}

function addToCart(id) {
    const p = state.products.find(x => x.id === id);
    const existing = state.cart.find(item => item.id === id);
    if (existing) { existing.quantity++; } else { state.cart.push({ ...p, quantity: 1 }); }
    localStorage.setItem('cart', JSON.stringify(state.cart));
    alert(p.name + " added!");
    render();
}

function updateQty(id, d) {
    const item = state.cart.find(i => i.id === id);
    if (item) {
        item.quantity += d;
        if (item.quantity <= 0) state.cart = state.cart.filter(i => i.id !== id);
    }
    localStorage.setItem('cart', JSON.stringify(state.cart));
    render();
}

function placeOrder() {
    const name = document.getElementById('cust-name').value;
    const addr = document.getElementById('cust-address').value;
    if (!name || !addr) return alert("Fill details");

    const itemsText = state.cart.map(i => `${i.name} (${i.quantity} x ${i.price})`).join('%0A');
    const total = state.cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);

    const order = { id: Date.now().toString().slice(-6), items: [...state.cart], total, date: new Date().toLocaleString() };
    state.orders.push(order);
    localStorage.setItem('orders', JSON.stringify(state.orders));

    const msg = `*New Order*%0A*Name:* ${name}%0A*Items:*%0A${itemsText}%0A*Total:* ₹${total}`;
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`, '_blank');

    state.cart = [];
    localStorage.removeItem('cart');
    alert("Order Placed!");
    navigate('home');
}

function render() {
    const content = document.getElementById('main-content');
    content.innerHTML = views[state.currentView]();
}

if (state.isAdmin) state.currentView = 'admin'; else if (state.user) state.currentView = 'home';
render();
