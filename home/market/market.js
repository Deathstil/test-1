// ===== State Management =====
    const state = {
      cart: [],
      wishlist: [],
      user: null,
      theme: localStorage.getItem('theme') || 'light',
      currentPage: {
        trending: 1,
        recent: 1,
        budget: 1
      }
    };

    // ===== Constants =====
    const ITEMS_PER_PAGE = 5;
    
    // ===== DOM Elements =====
    const elements = {
      darkModeToggle: document.getElementById('darkModeToggle'),
      searchToggle: document.getElementById('searchToggle'),
      searchContainer: document.getElementById('searchContainer'),
      searchForm: document.getElementById('searchForm'),
      searchBox: document.getElementById('searchBox'),
      searchError: document.getElementById('searchError'),
      cartBtn: document.querySelector('.cart-btn'),
      backToTopBtn: document.getElementById('backToTop'),
      toast: document.getElementById('toast'),
      toastMessage: document.getElementById('toastMessage'),
      scrollLeftBtns: document.querySelectorAll('.scroll-left'),
      scrollRightBtns: document.querySelectorAll('.scroll-right'),
      horizontalScrolls: document.querySelectorAll('.horizontal-scroll'),
      seeAllLinks: document.querySelectorAll('.see-all'),
      loadingSpinners: document.querySelectorAll('.loading-spinner'),
      mobileMenuBtn: document.getElementById('mobileMenuBtn'),
      mobileNav: document.getElementById('mobileNav'),
      browseBtn: document.getElementById('browseBtn'),
      sellBtn: document.getElementById('sellBtn'),
      logoutBtn: document.getElementById('logoutBtn'),
      offlineMessage: document.getElementById('offlineMessage'),
      trendingPagination: document.getElementById('trendingPagination'),
      recentPagination: document.getElementById('recentPagination'),
      budgetPagination: document.getElementById('budgetPagination')
    };

    // ===== Product Data =====
    const products = {
      trending: [
        { id: 1, title: "Calculus Textbook", price: 45, oldPrice: 75, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Jane D.", rating: 4, badge: "Popular" },
        { id: 2, title: "Wireless Earbuds", price: 35, oldPrice: 60, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Mike T.", rating: 5, badge: "New" },
        { id: 3, title: "Graphic T-Shirt", price: 12, image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Sarah K.", rating: 3, badge: "Sale" },
        { id: 4, title: "Desk Lamp", price: 18, oldPrice: 25, image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Alex P.", rating: 4, badge: "Trending" },
        { id: 5, title: "Coffee Maker", price: 30, oldPrice: 50, image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "David L.", rating: 5, badge: "Best Deal" },
        { id: 16, title: "Psychology Textbook", price: 40, image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Emma S.", rating: 4, badge: "New" },
        { id: 17, title: "Backpack", price: 25, oldPrice: 40, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Ryan H.", rating: 5, badge: "Popular" },
        { id: 18, title: "Smart Watch", price: 80, oldPrice: 120, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Olivia M.", rating: 4, badge: "Just Added" },
        { id: 19, title: "Jeans", price: 20, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Lucas G.", rating: 3, badge: "Sale" },
        { id: 20, title: "Microwave", price: 50, oldPrice: 80, image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Sophia T.", rating: 4, badge: "Trending" }
      ],
      recent: [
        { id: 6, title: "Psychology Textbook", price: 40, image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Emma S.", rating: 4, badge: "New" },
        { id: 7, title: "Backpack", price: 25, oldPrice: 40, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Ryan H.", rating: 5, badge: "Popular" },
        { id: 8, title: "Smart Watch", price: 80, oldPrice: 120, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Olivia M.", rating: 4, badge: "Just Added" },
        { id: 9, title: "Jeans", price: 20, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Lucas G.", rating: 3, badge: "Sale" },
        { id: 10, title: "Microwave", price: 50, oldPrice: 80, image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Sophia T.", rating: 4, badge: "Trending" },
        { id: 21, title: "Notebook Set", price: 5, image: "https://images.unsplash.com/photo-1586232702098-4973c12f1bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Noah W.", rating: 4, badge: "Under $10" },
        { id: 22, title: "Coffee Mug", price: 3, image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Ava R.", rating: 5, badge: "Best Deal" },
        { id: 23, title: "Phone Stand", price: 8, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Ethan K.", rating: 3, badge: "Budget" },
        { id: 24, title: "Water Bottle", price: 7, oldPrice: 15, image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Mia B.", rating: 4, badge: "Sale" },
        { id: 25, title: "Desk Organizer", price: 10, image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "James L.", rating: 4, badge: "Under $15" }
      ],
      budget: [
        { id: 11, title: "Notebook Set", price: 5, image: "https://images.unsplash.com/photo-1586232702098-4973c12f1bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Noah W.", rating: 4, badge: "Under $10" },
        { id: 12, title: "Coffee Mug", price: 3, image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Ava R.", rating: 5, badge: "Best Deal" },
        { id: 13, title: "Phone Stand", price: 8, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Ethan K.", rating: 3, badge: "Budget" },
        { id: 14, title: "Water Bottle", price: 7, oldPrice: 15, image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Mia B.", rating: 4, badge: "Sale" },
        { id: 15, title: "Desk Organizer", price: 10, image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "James L.", rating: 4, badge: "Under $15" },
        { id: 26, title: "Pens", price: 2, image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Lily P.", rating: 4, badge: "Under $5" },
        { id: 27, title: "Sticky Notes", price: 3, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Oliver T.", rating: 3, badge: "Budget" },
        { id: 28, title: "Keychain", price: 4, image: "https://images.unsplash.com/photo-1600267165477-6d4cc741b379?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Chloe M.", rating: 4, badge: "Under $5" },
        { id: 29, title: "Bookmark", price: 1, image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Henry F.", rating: 3, badge: "Under $5" },
        { id: 30, title: "Phone Case", price: 8, oldPrice: 15, image: "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", seller: "Zoe R.", rating: 4, badge: "Sale" }
      ]
    };

    // ===== Utility Functions =====
    function debounce(func, wait) {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }

    function sanitizeText(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    function validateImageUrl(url) {
      return /^https?:\/\/.+\..+/.test(url) ? url : '/images/default-product.jpg';
    }

    // ===== Core Functions =====
    function createProductCard(product) {
      const safeProduct = {
        ...product,
        title: sanitizeText(product.title),
        seller: sanitizeText(product.seller),
        image: validateImageUrl(product.image)
      };

      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        ${safeProduct.badge ? `<span class="product-badge">${safeProduct.badge}</span>` : ''}
        <div class="product-image-container">
          <img src="${safeProduct.image}" alt="${safeProduct.title}" class="product-image" loading="lazy">
        </div>
        <div class="card-content">
          <h3 class="product-title">${safeProduct.title}</h3>
          <div class="rating">
            ${'<i class="fas fa-star"></i>'.repeat(safeProduct.rating)}
            ${safeProduct.rating < 5 ? '<i class="far fa-star"></i>'.repeat(5 - safeProduct.rating) : ''}
            <span class="rating-count">(${Math.floor(Math.random() * 50) + 10})</span>
          </div>
          <div class="product-price">
            $${safeProduct.price}
            ${safeProduct.oldPrice ? `<span class="old-price">$${safeProduct.oldPrice}</span>` : ''}
          </div>
          <div class="product-seller">
            <img src="https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}" alt="${safeProduct.seller}" class="seller-avatar">
            <span class="seller-name">${safeProduct.seller}</span>
          </div>
          <div class="card-actions">
            <button class="add-to-cart" data-id="${safeProduct.id}" aria-label="Add ${safeProduct.title} to cart">
              <i class="fas fa-cart-plus"></i> Add
            </button>
            <i class="far fa-heart wishlist-icon" data-id="${safeProduct.id}" aria-label="Add ${safeProduct.title} to wishlist"></i>
          </div>
        </div>
      `;
      return card;
    }

    function loadProducts(category, page = 1) {
      const productList = products[category];
      const container = document.getElementById(category);
      const paginationContainer = document.getElementById(`${category}Pagination`);
      
      // Update state
      state.currentPage[category] = page;
      
      // Show loading spinner
      container.innerHTML = '<div class="loading-spinner" style="display:block;"></div>';
      
      // Calculate pagination
      const totalPages = Math.ceil(productList.length / ITEMS_PER_PAGE);
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedProducts = productList.slice(startIndex, endIndex);
      
      // Simulate API delay
      setTimeout(() => {
        // Clear container
        container.innerHTML = '';
        
        // Add products
        paginatedProducts.forEach(product => {
          container.appendChild(createProductCard(product));
        });
        
        // Create pagination
        createPagination(paginationContainer, page, totalPages, category);
        
        // Add event listeners to new elements
        addDynamicEventListeners();
      }, 500);
    }

    function createPagination(container, currentPage, totalPages, category) {
      container.innerHTML = '';
      
      if (totalPages <= 1) return;
      
      // Previous button
      const prevBtn = document.createElement('button');
      prevBtn.className = `page-btn ${currentPage === 1 ? 'disabled' : ''}`;
      prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          loadProducts(category, currentPage - 1);
        }
      });
      container.appendChild(prevBtn);
      
      // Page buttons
      const maxVisiblePages = 5;
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      if (startPage > 1) {
        const firstBtn = document.createElement('button');
        firstBtn.className = 'page-btn';
        firstBtn.textContent = '1';
        firstBtn.addEventListener('click', () => loadProducts(category, 1));
        container.appendChild(firstBtn);
        
        if (startPage > 2) {
          const ellipsis = document.createElement('span');
          ellipsis.textContent = '...';
          ellipsis.style.padding = '0 10px';
          container.appendChild(ellipsis);
        }
      }
      
      for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => loadProducts(category, i));
        container.appendChild(pageBtn);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          const ellipsis = document.createElement('span');
          ellipsis.textContent = '...';
          ellipsis.style.padding = '0 10px';
          container.appendChild(ellipsis);
        }
        
        const lastBtn = document.createElement('button');
        lastBtn.className = 'page-btn';
        lastBtn.textContent = totalPages;
        lastBtn.addEventListener('click', () => loadProducts(category, totalPages));
        container.appendChild(lastBtn);
      }
      
      // Next button
      const nextBtn = document.createElement('button');
      nextBtn.className = `page-btn ${currentPage === totalPages ? 'disabled' : ''}`;
      nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
      nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
          loadProducts(category, currentPage + 1);
        }
      });
      container.appendChild(nextBtn);
    }

    function showToast(message, type = 'success') {
      let icon = '<i class="fas fa-check-circle"></i>';
      let bgColor = 'var(--primary-color)';
      
      if (type === 'error') {
        icon = '<i class="fas fa-exclamation-circle"></i>';
        bgColor = 'var(--error-color)';
      } else if (type === 'warning') {
        icon = '<i class="fas fa-exclamation-triangle"></i>';
        bgColor = 'var(--warning-color)';
      }
      
      elements.toast.innerHTML = `${icon} <span id="toastMessage">${sanitizeText(message)}</span>`;
      elements.toast.style.backgroundColor = bgColor;
      elements.toast.classList.add('show');
      
      setTimeout(() => {
        elements.toast.classList.remove('show');
      }, 3000);
    }

    function handleRouting() {
      const hash = window.location.hash.substring(1);
      
      if (!hash) {
        document.querySelector('.hero-banner').scrollIntoView({ behavior: 'smooth' });
        return;
      }
      
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Update active nav link
      document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${hash}`) {
          link.classList.add('active');
        }
      });
    }

    function addDynamicEventListeners() {
  // Remove previous wishlist listeners
  document.querySelectorAll('.wishlist-icon').forEach(icon => {
    const newIcon = icon.cloneNode(true);
    icon.parentNode.replaceChild(newIcon, icon);
  });

  // Wishlist click handler
  document.querySelectorAll('.wishlist-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      this.classList.toggle('far');
      this.classList.toggle('fas');
      this.classList.toggle('active');

      const productId = this.getAttribute('data-id');
      const product = [...products.trending, ...products.recent, ...products.budget]
        .find(p => String(p.id) === String(productId));

      if (!product) {
        showToast('Product not found', 'error');
        return;
      }

      let wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];

      if (this.classList.contains('active')) {
        // Add if not already there
        if (!wishlistData.find(item => item.id == product.id)) {
          wishlistData.push(product);
        }
        showToast(`${product.title} added to wishlist`);
      } else {
        // Remove if there
        wishlistData = wishlistData.filter(item => item.id != product.id);
        showToast(`${product.title} removed from wishlist`);
      }

      localStorage.setItem('wishlist', JSON.stringify(wishlistData));
    });
  });

  // Pre-fill heart icons for saved wishlist
  let wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];
  document.querySelectorAll('.wishlist-icon').forEach(icon => {
    const productId = icon.getAttribute('data-id');
    if (wishlistData.find(item => String(item.id) === String(productId))) {
      icon.classList.remove('far');
      icon.classList.add('fas', 'active');
    }
  });

  // Remove previous cart listeners
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
  });

  // Cart click handler
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'), 10);
      const product = [...products.trending, ...products.recent, ...products.budget]
        .find(p => p.id === productId);

      if (!product) {
        showToast('Product not found', 'error');
        return;
      }

      state.cart = JSON.parse(localStorage.getItem('cart')) || state.cart || [];
      const existingItem = state.cart.find(item => String(item.id) === String(productId));

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
        showToast(`Added another "${product.title}" to cart`);
      } else {
        state.cart.push({ ...product, quantity: 1 });
        showToast(`"${product.title}" added to cart`);
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
      const totalItems = state.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      elements.cartBtn.setAttribute('data-count', totalItems);

      this.innerHTML = '<i class="fas fa-check"></i> Added';
      this.style.backgroundColor = 'var(--success-color)';
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-cart-plus"></i> Add';
        this.style.backgroundColor = '';
      }, 1500);
    });
  });
}



    function checkNetworkStatus() {
      if (!navigator.onLine) {
        elements.offlineMessage.style.display = 'block';
      }
      
      window.addEventListener('online', () => {
        elements.offlineMessage.style.display = 'none';
        showToast('You are back online', 'success');
      });
      
      window.addEventListener('offline', () => {
        elements.offlineMessage.style.display = 'block';
      });
    }

    function initializeServiceWorker() {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
          }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
          });
        });
      }
    }

    // ===== Initialize App =====
    function initApp() {
      // Load initial state
      state.cart = JSON.parse(localStorage.getItem('cart')) || [];
      state.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      state.theme = localStorage.getItem('theme') || 'light';
      
      // Set initial cart count
      const initialCount = (state.cart || []).reduce((s, i) => s + (i.quantity || 1), 0);
      elements.cartBtn.setAttribute('data-count', initialCount);

      
      // Set initial theme
      if (state.theme === 'dark') {
        document.body.classList.add('dark-mode');
        elements.darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }
      
      // Load initial products
      loadProducts('trending');
      loadProducts('recent');
      loadProducts('budget');
      
      // Check network status
      checkNetworkStatus();
      
      // Initialize service worker
      initializeServiceWorker();
      
      // Set up event listeners
      setupEventListeners();
    }

    function setupEventListeners() {
      // Mobile menu toggle
      elements.mobileMenuBtn.addEventListener('click', () => {
        elements.mobileNav.classList.toggle('active');
        elements.mobileMenuBtn.innerHTML = elements.mobileNav.classList.contains('active') 
          ? '<i class="fas fa-times"></i>' 
          : '<i class="fas fa-bars"></i>';
      });
      
      // Search form validation
      elements.searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (elements.searchBox.value.length < 3) {
          elements.searchError.style.display = 'block';
          return;
        }
        
        elements.searchError.style.display = 'none';
        showToast(`Searching for "${elements.searchBox.value}"`);
        elements.searchBox.value = '';
      });
      
      // Search toggle
      elements.searchToggle.addEventListener('click', () => {
        elements.searchContainer.classList.toggle('active');
        if (elements.searchContainer.classList.contains('active')) {
          elements.searchBox.focus();
        }
      });
      
      // Hero buttons
      elements.browseBtn.addEventListener('click', () => {
        window.location.hash = 'trending';
        handleRouting();
      });

      elements.sellBtn.addEventListener('click', () => {
        window.location.href = '/home/shopping/add item/add.html';
      });
      
      // See All links
      document.getElementById('seeAllTrending').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = 'trending';
        handleRouting();
      });
      
      document.getElementById('seeAllRecent').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = 'recent';
        handleRouting();
      });
      
      document.getElementById('seeAllBudget').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = 'budget';
        handleRouting();
      });
      
      // Dark Mode Toggle
      elements.darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
          elements.darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
          state.theme = 'dark';
          showToast('Dark mode enabled');
        } else {
          elements.darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
          state.theme = 'light';
          showToast('Light mode enabled');
        }
        
        localStorage.setItem('theme', state.theme);
      });
      
      // Scroll to Top
      elements.backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
      
      // Show/Hide Back to Top button based on scroll position
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          elements.backToTopBtn.style.display = 'flex';
          document.querySelector('.site-header').classList.add('scrolled');
        } else {
          elements.backToTopBtn.style.display = 'none';
          document.querySelector('.site-header').classList.remove('scrolled');
        }
      });
      
      // Horizontal Scroll Controls
      elements.scrollLeftBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
          elements.horizontalScrolls[index].scrollBy({
            left: -300,
            behavior: 'smooth'
          });
        });
      });
      
      elements.scrollRightBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
          elements.horizontalScrolls[index].scrollBy({
            left: 300,
            behavior: 'smooth'
          });
        });
      });
      
      // Handle hash changes for routing
      window.addEventListener('hashchange', handleRouting);
      
      // Handle initial route
      handleRouting();
      
      // Logout functionality
      if (elements.logoutBtn) {
        elements.logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          // In a real app, you would call your authentication service here
          showToast('Successfully logged out');
          setTimeout(() => {
            window.location.href = '/signin/signin.html';
          }, 1500);
        });
      }
    }

    // Start the app
    document.addEventListener('DOMContentLoaded', initApp);