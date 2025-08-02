document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    const loadingScreen = document.getElementById('loading');
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingScreen.classList.add('fade-out');
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    });

    // Search toggle
    const searchToggle = document.getElementById('search-toggle');
    const searchBar = document.getElementById('search-bar');
    
    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', function() {
            searchBar.classList.toggle('active');
            
            if (searchBar.classList.contains('active')) {
                document.getElementById('search-input').focus();
            }
        });
        
        // Close search when clicking outside
        document.addEventListener('click', function(event) {
            if (!searchBar.contains(event.target) && 
                !searchToggle.contains(event.target) && 
                searchBar.classList.contains('active')) {
                searchBar.classList.remove('active');
            }
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.product-btn');
    const cartCountElement = document.querySelector('.cart-count');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const product = this.closest('.product-card').querySelector('.product-title').textContent;
            alert(`Added ${product} to cart!`);
            
            // Update cart count
            if (cartCountElement) {
                let count = parseInt(cartCountElement.textContent) || 0;
                cartCountElement.textContent = count + 1;
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = document.getElementById('newsletter-email');
            const email = emailInput.value;
            
            if (email) {
                alert(`Thank you for subscribing with ${email}!`);
                emailInput.value = '';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Don't prevent default for empty hrefs
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.querySelector('i')
                            .classList.remove('fa-times')
                            .classList.add('fa-bars');
                    }
                }
                
                // Close search bar
                if (searchBar && searchBar.classList.contains('active')) {
                    searchBar.classList.remove('active');
                }
            }
        });
    });
});