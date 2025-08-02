// Cart state management
class Cart {
  constructor() {
    this.items = new Map();
    this.loadFromStorage();
  }

  addItem(product) {
    const existingItem = this.items.get(product.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.set(product.name, {
        ...product,
        quantity: 1
      });
    }
    this.saveToStorage();
    this.updateUI();
  }

  removeItem(productName) {
    this.items.delete(productName);
    this.saveToStorage();
    this.updateUI();
  }

  updateQuantity(productName, quantity) {
    const item = this.items.get(productName);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productName);
      } else {
        item.quantity = quantity;
        this.saveToStorage();
        this.updateUI();
      }
    }
  }

  getTotalItems() {
    return Array.from(this.items.values()).reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return Array.from(this.items.values()).reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  clear() {
    this.items.clear();
    this.saveToStorage();
    this.updateUI();
  }

  saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(Array.from(this.items.entries())));
  }

  loadFromStorage() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.items = new Map(JSON.parse(saved));
    }
  }

  updateUI() {
    this.updateCartCount();
    this.updateCartItems();
    this.updateProductCards();
  }

  updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = this.getTotalItems();
    cartCount.textContent = `(${totalItems})`;
  }

  updateCartItems() {
    const emptyCart = document.getElementById('emptyCart');
    const cartItems = document.getElementById('cartItems');
    const cartActions = document.getElementById('cartActions');

    if (this.items.size === 0) {
      emptyCart.style.display = 'block';
      cartItems.style.display = 'none';
      cartActions.style.display = 'none';
    } else {
      emptyCart.style.display = 'none';
      cartItems.style.display = 'block';
      cartActions.style.display = 'block';
      
      this.renderCartItems();
    }
  }

  renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    this.items.forEach((item, productName) => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <img src="${item.image.thumbnail}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="quantity-controls">
          <button class="quantity-btn decrease-btn">
            <img src="./assets/images/icon-decrement-quantity.svg" alt="Decrease quantity">
          </button>
          <span class="quantity-display">${item.quantity}</span>
          <button class="quantity-btn increase-btn">
            <img src="./assets/images/icon-increment-quantity.svg" alt="Increase quantity">
          </button>
        </div>
        <button class="btn btn-danger remove-btn">
          <img src="./assets/images/icon-remove-item.svg" alt="Remove item">
        </button>
      `;
      
      // Add event listeners
      const decreaseBtn = cartItem.querySelector('.decrease-btn');
      const increaseBtn = cartItem.querySelector('.increase-btn');
      const removeBtn = cartItem.querySelector('.remove-btn');
      
      decreaseBtn.addEventListener('click', () => {
        this.updateQuantity(productName, item.quantity - 1);
      });
      
      increaseBtn.addEventListener('click', () => {
        this.updateQuantity(productName, item.quantity + 1);
      });
      
      removeBtn.addEventListener('click', () => {
        this.removeItem(productName);
      });
      
      cartItemsContainer.appendChild(cartItem);
    });
  }

  updateProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      const productName = card.querySelector('.product-name').textContent;
      const cartItem = this.items.get(productName);
      
      if (cartItem) {
        card.classList.add('selected');
        const addButton = card.querySelector('.btn-primary');
        addButton.innerHTML = `
          <img src="./assets/images/icon-add-to-cart.svg" alt="Add to cart">
          Added (${cartItem.quantity})
        `;
      } else {
        card.classList.remove('selected');
        const addButton = card.querySelector('.btn-primary');
        addButton.innerHTML = `
          <img src="./assets/images/icon-add-to-cart.svg" alt="Add to cart">
          Add to Cart
        `;
      }
    });
  }
}

// Modal management
class Modal {
  constructor() {
    this.overlay = document.getElementById('modalOverlay');
    this.setupEventListeners();
  }

  show() {
    this.overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  hide() {
    this.overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  setupEventListeners() {
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.hide();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.overlay.style.display === 'flex') {
        this.hide();
      }
    });
  }
}

// Product rendering
class ProductRenderer {
  constructor() {
    this.productsGrid = document.getElementById('productsGrid');
  }

  async loadProducts() {
    try {
      const response = await fetch('./data.json');
      const products = await response.json();
      this.renderProducts(products);
    } catch (error) {
      console.error('Error loading products:', error);
      this.showError();
    }
  }

  renderProducts(products) {
    this.productsGrid.innerHTML = '';
    
    products.forEach(product => {
      const productCard = this.createProductCard(product);
      this.productsGrid.appendChild(productCard);
    });
  }

  createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Determine which image to use based on screen size
    const imageSrc = this.getResponsiveImage(product.image);
    
    card.innerHTML = `
      <img src="${imageSrc}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <div class="product-actions">
          <button class="btn btn-primary" data-product='${JSON.stringify(product)}'>
            <img src="./assets/images/icon-add-to-cart.svg" alt="Add to cart">
            Add to Cart
          </button>
        </div>
      </div>
    `;
    
    // Add event listener to the button
    const addButton = card.querySelector('.btn-primary');
    addButton.addEventListener('click', () => {
      cart.addItem(product);
    });
    
    return card;
  }

  getResponsiveImage(images) {
    // Default to desktop image, will be overridden by CSS media queries
    return images.desktop;
  }

  showError() {
    this.productsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
        <p style="color: var(--color-rose-400);">Failed to load products. Please refresh the page.</p>
      </div>
    `;
  }
}

// Initialize the application
let cart;
let modal;
let productRenderer;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  cart = new Cart();
  modal = new Modal();
  productRenderer = new ProductRenderer();

  // Load products
  productRenderer.loadProducts();

  // Setup event listeners
  setupEventListeners();
});

function setupEventListeners() {
  // Confirm order button
  const confirmOrderBtn = document.getElementById('confirmOrderBtn');
  confirmOrderBtn.addEventListener('click', () => {
    if (cart.getTotalItems() > 0) {
      modal.show();
    }
  });

  // Start new order button
  const startNewOrderBtn = document.getElementById('startNewOrderBtn');
  startNewOrderBtn.addEventListener('click', () => {
    cart.clear();
    modal.hide();
  });

  // Handle responsive images
  window.addEventListener('resize', debounce(() => {
    updateResponsiveImages();
  }, 250));
}

function updateResponsiveImages() {
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    const img = card.querySelector('.product-image');
    const productName = card.querySelector('.product-name').textContent;
    
    // Find the product data to get image sources
    // This is a simplified approach - in a real app you'd store product data more efficiently
    const width = window.innerWidth;
    let imageSrc = '';
    
    if (width < 768) {
      imageSrc = img.src.replace('-desktop', '-mobile');
    } else if (width < 1024) {
      imageSrc = img.src.replace('-desktop', '-tablet');
    } else {
      imageSrc = img.src.replace(/-mobile|-tablet/, '-desktop');
    }
    
    if (img.src !== imageSrc) {
      img.src = imageSrc;
    }
  });
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add CSS for responsive images
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 767px) {
    .product-image {
      content: url(var(--mobile-image));
    }
  }
  
  @media (min-width: 768px) and (max-width: 1023px) {
    .product-image {
      content: url(var(--tablet-image));
    }
  }
  
  @media (min-width: 1024px) {
    .product-image {
      content: url(var(--desktop-image));
    }
  }
`;
document.head.appendChild(style); 