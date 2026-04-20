// Mosepele Travel & Tours - Main JavaScript File


document.addEventListener('DOMContentLoaded', function() {

    
    // 1. TOUR CATEGORY FILTERING (Homepage)
    
    const filterButtons = document.querySelectorAll('.category-btn');
    const tourCards = document.querySelectorAll('.tour-card');

    if (filterButtons.length > 0 && tourCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const category = this.getAttribute('data-category');

                tourCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        // Add fade-in animation
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    
    // 2. NEWSLETTER SUBSCRIPTION (All Pages)
    
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email === '') {
                alert('Please enter your email address.');
            } else if (!email.includes('@') || !email.includes('.')) {
                alert('Please enter a valid email address (e.g., name@example.com).');
            } else {
                alert('Thank you for subscribing! You will receive our newsletter at ' + email);
                emailInput.value = '';
            }
        });
    });

    
    // 3. MOBILE HAMBURGER MENU 
    
    // Add hamburger menu for mobile devices
    const navbar = document.querySelector('.navbar');
    const nav = document.querySelector('.navbar nav');
    
    if (navbar && nav && window.innerWidth <= 768) {
        // Check if hamburger button exists, if not create it
        let hamburger = document.querySelector('.hamburger');
        if (!hamburger) {
            hamburger = document.createElement('div');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            hamburger.style.cssText = 'display: none; font-size: 24px; cursor: pointer;';
            navbar.insertBefore(hamburger, nav);
        }
        
        function toggleMenu() {
            if (window.innerWidth <= 768) {
                hamburger.style.display = 'block';
                nav.style.display = 'none';
                
                hamburger.onclick = function() {
                    if (nav.style.display === 'none' || nav.style.display === '') {
                        nav.style.display = 'flex';
                        nav.style.flexDirection = 'column';
                        nav.style.width = '100%';
                        nav.style.marginTop = '15px';
                        hamburger.innerHTML = '<i class="fas fa-times"></i>';
                    } else {
                        nav.style.display = 'none';
                        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                };
            } else {
                if (hamburger) hamburger.style.display = 'none';
                if (nav) nav.style.display = 'flex';
            }
        }
        
        toggleMenu();
        window.addEventListener('resize', toggleMenu);
    }

    
    // 4. SMOOTH SCROLL FOR ANCHOR LINKS
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    
    // 5. ACTIVE NAVIGATION LINK HIGHLIGHTING
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else if (currentPage === 'index.html' && linkPage === 'index.html') {
            link.classList.add('active');
        } else if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    
    // 6. CONTACT PAGE FORM VALIDATION
    
    const inquiryForm = document.getElementById('inquiryForm');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const fullname = document.getElementById('fullname');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const tour = document.getElementById('tour');
            const travelDate = document.getElementById('travelDate');
            
            let isValid = true;
            let errorMessage = '';
            
            // Validate Full Name
            if (!fullname.value.trim()) {
                errorMessage += '• Full Name is required\n';
                fullname.style.borderColor = '#E76F51';
                isValid = false;
            } else {
                fullname.style.borderColor = '#ddd';
            }
            
            // Validate Email
            if (!email.value.trim()) {
                errorMessage += '• Email Address is required\n';
                email.style.borderColor = '#E76F51';
                isValid = false;
            } else if (!email.value.includes('@') || !email.value.includes('.')) {
                errorMessage += '• Please enter a valid email address\n';
                email.style.borderColor = '#E76F51';
                isValid = false;
            } else {
                email.style.borderColor = '#ddd';
            }
            
            // Validate Tour
            if (!tour.value) {
                errorMessage += '• Please select a tour package\n';
                tour.style.borderColor = '#E76F51';
                isValid = false;
            } else {
                tour.style.borderColor = '#ddd';
            }
            
            // Validate Travel Date
            if (!travelDate.value) {
                errorMessage += '• Preferred travel date is required\n';
                travelDate.style.borderColor = '#E76F51';
                isValid = false;
            } else {
                travelDate.style.borderColor = '#ddd';
            }
            
            if (!isValid) {
                alert('Please fix the following errors:\n\n' + errorMessage);
            } else {
                // Show success message
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    inquiryForm.style.display = 'none';
                    successMessage.style.display = 'block';
                } else {
                    alert('Thank you! Your inquiry has been sent. We will respond within 24 hours.');
                    inquiryForm.reset();
                }
                
                // Log to console for debugging
                console.log('Form submitted:', {
                    name: fullname.value,
                    email: email.value,
                    tour: tour.value,
                    date: travelDate.value
                });
            }
        });
        
        // Remove error styling on input
        const formInputs = inquiryForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#ddd';
            });
        });
    }

    
    // 7. FEEDBACK PAGE FORM VALIDATION
    
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const email = document.getElementById('email');
            const tourTaken = document.getElementById('tourTaken');
            const likedMost = document.getElementById('likedMost');
            
            let isValid = true;
            let errorMessage = '';
            
            if (!firstName.value.trim()) {
                errorMessage += '• First Name is required\n';
                firstName.style.borderColor = '#E76F51';
                isValid = false;
            } else {
                firstName.style.borderColor = '#ddd';
            }
            
            if (!lastName.value.trim()) {
                errorMessage += '• Last Name is required\n';
                lastName.style.borderColor = '#E76F51';
                isValid = false;
            } else {
                lastName.style.borderColor = '#ddd';
            }
            
            if (!email.value.trim()) {
                errorMessage += '• Email Address is required\n';
                email.style.borderColor = '#E76F51';
                isValid = false;
            } else if (!email.value.includes('@') || !email.value.includes('.')) {
                errorMessage += '• Please enter a valid email address\n';
                email.style.borderColor = '#E76F51';
                isValid = false;
            } else {
                email.style.borderColor = '#ddd';
            }
            
            if (!tourTaken.value) {
                errorMessage += '• Please select a tour\n';
                tourTaken.style.borderColor = '#E76F51';
                isValid = false;
            } else {
                tourTaken.style.borderColor = '#ddd';
            }
            
            if (!likedMost.value.trim()) {
                errorMessage += '• Please tell us what you liked most\n';
                likedMost.style.borderColor = '#E76F51';
                isValid = false;
            } else {
                likedMost.style.borderColor = '#ddd';
            }
            
            if (!isValid) {
                alert('Please fix the following errors:\n\n' + errorMessage);
            } else {
                feedbackForm.style.display = 'none';
                const successDiv = document.getElementById('feedbackSuccess');
                if (successDiv) successDiv.style.display = 'block';
                
                console.log('Feedback submitted:', {
                    name: firstName.value + ' ' + lastName.value,
                    email: email.value,
                    tour: tourTaken.value
                });
            }
        });
    }

    
    // 8. TOUR DETAIL PAGE - TAB FUNCTIONALITY
    
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update button styles
                tabBtns.forEach(b => {
                    b.style.color = '#666';
                    b.style.borderBottom = 'none';
                });
                this.style.color = '#2C5F2D';
                this.style.borderBottom = '2px solid #E76F51';
                
                // Show selected tab content
                tabContents.forEach(content => {
                    content.style.display = 'none';
                });
                const activeContent = document.getElementById(tabId);
                if (activeContent) activeContent.style.display = 'block';
            });
        });
    }

    
    // 9. TOUR DETAIL PAGE - QUICK INQUIRY FORM
    
    const quickForm = document.getElementById('quickInquiryForm');
    
    if (quickForm) {
        quickForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('quickName');
            const email = document.getElementById('quickEmail');
            
            if (!name.value.trim() || !email.value.trim()) {
                alert('Please fill in your name and email address.');
                return;
            }
            
            if (!email.value.includes('@') || !email.value.includes('.')) {
                alert('Please enter a valid email address.');
                return;
            }
            
            const successDiv = document.getElementById('quickInquirySuccess');
            if (successDiv) successDiv.style.display = 'block';
            quickForm.reset();
            
            setTimeout(() => {
                successDiv.style.display = 'none';
            }, 3000);
        });
    }

    
    // 10. SET MINIMUM DATE FOR DATE PICKERS
    
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        // For travel dates, set min to today
        if (input.id === 'travelDate' || input.id === 'quickDate') {
            input.setAttribute('min', today);
        }
        // For feedback travel date, set max to today
        if (input.id === 'travelDate' && input.closest('#feedbackForm')) {
            input.setAttribute('max', today);
        }
    });

    
    // 11. RESPONSIVE PRICE BOX (Tour Detail Page)
    
    function checkScreenSize() {
        const priceBoxMobile = document.querySelector('.price-box-mobile');
        if (priceBoxMobile) {
            if (window.innerWidth <= 992) {
                priceBoxMobile.style.display = 'block';
            } else {
                priceBoxMobile.style.display = 'none';
            }
        }
    }
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    
    // 12. IMAGE LIGHTBOX (Tour Detail Page)
    
    window.openLightbox = function(src) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        if (lightbox && lightboxImg) {
            lightbox.style.display = 'block';
            lightboxImg.src = src;
            document.body.style.overflow = 'hidden';
        }
    };
    
    window.closeLightbox = function() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            window.closeLightbox();
        }
    });

    // 13. BLOG PAGE - CATEGORY FILTERING
    
    const categoryLinks = document.querySelectorAll('.category-link');
    const blogCards = document.querySelectorAll('.blog-card');
    const featuredPost = document.querySelector('.featured-post');
    
    if (categoryLinks.length > 0 && blogCards.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                
                // Update active styling
                categoryLinks.forEach(l => {
                    l.style.backgroundColor = '#FDF8F0';
                    l.style.color = '#333';
                });
                this.style.backgroundColor = '#2C5F2D';
                this.style.color = 'white';
                
                // Filter cards
                let visibleCount = 0;
                blogCards.forEach(card => {
                    const cardCategory = card.querySelector('.fa-tag')?.parentElement.innerText.trim() || '';
                    let cardCategoryValue = '';
                    
                    if (cardCategory.includes('Safari Tips')) cardCategoryValue = 'safari-tips';
                    else if (cardCategory.includes('Destination Guides')) cardCategoryValue = 'destination-guides';
                    else if (cardCategory.includes('Conservation')) cardCategoryValue = 'conservation';
                    else if (cardCategory.includes('Company News')) cardCategoryValue = 'company-news';
                    
                    if (category === 'all' || cardCategoryValue === category) {
                        card.style.display = 'block';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                if (featuredPost) {
                    featuredPost.style.display = category === 'all' ? 'block' : 'none';
                }
            });
        });
    }

    
    // 14. BLOG PAGE - SEARCH FUNCTIONALITY
    
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    function searchArticles() {
        if (!searchInput) return;
        const searchTerm = searchInput.value.toLowerCase();
        
        blogCards.forEach(card => {
            const title = card.querySelector('h4')?.innerText.toLowerCase() || '';
            const excerpt = card.querySelector('p')?.innerText.toLowerCase() || '';
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm) || searchTerm === '') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        if (featuredPost && featuredPost.querySelector('h2')) {
            const featuredTitle = featuredPost.querySelector('h2').innerText.toLowerCase();
            const featuredExcerpt = featuredPost.querySelector('p')?.innerText.toLowerCase() || '';
            featuredPost.style.display = (featuredTitle.includes(searchTerm) || featuredExcerpt.includes(searchTerm) || searchTerm === '') ? 'block' : 'none';
        }
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', searchArticles);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchArticles();
            }
        });
    }

    
    // 15. CONSOLE LOG (For debugging)
    
    console.log('Mosepele Travel & Tours website loaded successfully!');
    console.log('Current page:', currentPage);
});