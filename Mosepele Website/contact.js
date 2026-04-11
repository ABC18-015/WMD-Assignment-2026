// Form Validation for Contact & Book Page
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inquiryForm');
    const successMessage = document.getElementById('successMessage');
    
    // Get form elements
    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const tour = document.getElementById('tour');
    const travelDate = document.getElementById('travelDate');
    const adults = document.getElementById('adults');
    const children = document.getElementById('children');
    
    // Error message spans
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const tourError = document.getElementById('tourError');
    const dateError = document.getElementById('dateError');
    
    // Helper function to clear all errors
    function clearErrors() {
        nameError.textContent = '';
        emailError.textContent = '';
        phoneError.textContent = '';
        tourError.textContent = '';
        dateError.textContent = '';
        
        fullname.classList.remove('error');
        email.classList.remove('error');
        phone.classList.remove('error');
        tour.classList.remove('error');
        travelDate.classList.remove('error');
    }
    
    // Helper function to validate email format
    function isValidEmail(emailValue) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailValue);
    }
    
    // Helper function to validate phone number (Botswana format or international)
    function isValidPhone(phoneValue) {
        if (phoneValue === '') return true; // Phone is optional
        const phoneRegex = /^[\+\d\s\-\(\)]{8,20}$/;
        return phoneRegex.test(phoneValue);
    }
    
    // Helper function to validate date (not in past)
    function isValidDate(dateValue) {
        if (!dateValue) return false;
        const selectedDate = new Date(dateValue);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
    }
    
    // Form submit handler
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent actual form submission
        clearErrors();
        
        let isValid = true;
        
        // Validate Full Name
        if (fullname.value.trim() === '') {
            nameError.textContent = 'Full name is required';
            fullname.classList.add('error');
            isValid = false;
        } else if (fullname.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            fullname.classList.add('error');
            isValid = false;
        }
        
        // Validate Email
        if (email.value.trim() === '') {
            emailError.textContent = 'Email address is required';
            email.classList.add('error');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            emailError.textContent = 'Please enter a valid email address (e.g., name@example.com)';
            email.classList.add('error');
            isValid = false;
        }
        
        // Validate Phone (optional but must be valid if provided)
        if (phone.value.trim() !== '' && !isValidPhone(phone.value.trim())) {
            phoneError.textContent = 'Please enter a valid phone number';
            phone.classList.add('error');
            isValid = false;
        }
        
        // Validate Tour Selection
        if (tour.value === '') {
            tourError.textContent = 'Please select a tour package';
            tour.classList.add('error');
            isValid = false;
        }
        
        // Validate Travel Date
        if (travelDate.value === '') {
            dateError.textContent = 'Preferred travel date is required';
            travelDate.classList.add('error');
            isValid = false;
        } else if (!isValidDate(travelDate.value)) {
            dateError.textContent = 'Travel date cannot be in the past. Please select a future date';
            travelDate.classList.add('error');
            isValid = false;
        }
        
        // Validate Adults (must be at least 0, but if 0 and children also 0, warn)
        if (parseInt(adults.value) < 0) {
            adults.value = 0;
        }
        
        if (parseInt(children.value) < 0) {
            children.value = 0;
        }
        
        if (parseInt(adults.value) === 0 && parseInt(children.value) === 0) {
            // Optional: Add a warning for no travelers
            // This is not a critical error but could be flagged
            console.log('No travelers selected');
        }
        
        // If form is valid, show success message
        if (isValid) {
            // Hide the form
            form.style.display = 'none';
            // Show success message
            successMessage.style.display = 'block';
            
            // Log form data to console (for testing)
            console.log('Form Submitted Successfully!');
            console.log('Name:', fullname.value);
            console.log('Email:', email.value);
            console.log('Phone:', phone.value);
            console.log('Tour:', tour.options[tour.selectedIndex]?.text);
            console.log('Travel Date:', travelDate.value);
            console.log('Adults:', adults.value);
            console.log('Children:', children.value);
            console.log('Message:', document.getElementById('message').value);
            
            // Optional: Reset form after 3 seconds and redirect or show button to start over
            setTimeout(() => {
                // You can add a "Send Another Inquiry" button if needed
            }, 1000);
        }
    });
    
    // Real-time validation (remove error when user starts typing)
    fullname.addEventListener('input', function() {
        if (fullname.value.trim() !== '') {
            nameError.textContent = '';
            fullname.classList.remove('error');
        }
    });
    
    email.addEventListener('input', function() {
        if (email.value.trim() !== '') {
            emailError.textContent = '';
            email.classList.remove('error');
        }
    });
    
    phone.addEventListener('input', function() {
        phoneError.textContent = '';
        phone.classList.remove('error');
    });
    
    tour.addEventListener('change', function() {
        if (tour.value !== '') {
            tourError.textContent = '';
            tour.classList.remove('error');
        }
    });
    
    travelDate.addEventListener('change', function() {
        if (travelDate.value !== '') {
            dateError.textContent = '';
            travelDate.classList.remove('error');
        }
    });
    
    // Set minimum date for travel date picker to today
    const today = new Date().toISOString().split('T')[0];
    travelDate.setAttribute('min', today);
});