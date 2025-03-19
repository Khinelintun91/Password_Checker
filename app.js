// Purpose: JavaScript code for the password strength checker.
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const strengthMeterFill = document.getElementById('strength-meter-fill');
    const strengthLabel = document.getElementById('strength-label');
    const feedback = document.getElementById('feedback');
    const showPasswordCheckbox = document.getElementById('show-password');
    
    // Criteria icons
    const lengthIcon = document.getElementById('length-icon');
    const uppercaseIcon = document.getElementById('uppercase-icon');
    const lowercaseIcon = document.getElementById('lowercase-icon');
    const numberIcon = document.getElementById('number-icon');
    const specialIcon = document.getElementById('special-icon');
    
    // Function to toggle password visibility
    showPasswordCheckbox.addEventListener('change', function() {
        passwordInput.type = this.checked ? 'text' : 'password';
    });
    
    // Function to check password strength
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        let feedbackText = '';
        
        // Regular expressions for checking criteria
        const lengthRegex = /.{8,}/;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const specialRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        
        // Check criteria and update icons
        if (lengthRegex.test(password)) {
            strength += 20;
            lengthIcon.textContent = "✓";
            lengthIcon.className = "criteria-icon valid";
        } else {
            lengthIcon.textContent = "✗";
            lengthIcon.className = "criteria-icon invalid";
        }
        
        if (uppercaseRegex.test(password)) {
            strength += 20;
            uppercaseIcon.textContent = "✓";
            uppercaseIcon.className = "criteria-icon valid";
        } else {
            uppercaseIcon.textContent = "✗";
            uppercaseIcon.className = "criteria-icon invalid";
        }
        
        if (lowercaseRegex.test(password)) {
            strength += 20;
            lowercaseIcon.textContent = "✓";
            lowercaseIcon.className = "criteria-icon valid";
        } else {
            lowercaseIcon.textContent = "✗";
            lowercaseIcon.className = "criteria-icon invalid";
        }
        
        if (numberRegex.test(password)) {
            strength += 20;
            numberIcon.textContent = "✓";
            numberIcon.className = "criteria-icon valid";
        } else {
            numberIcon.textContent = "✗";
            numberIcon.className = "criteria-icon invalid";
        }
        
        if (specialRegex.test(password)) {
            strength += 20;
            specialIcon.textContent = "✓";
            specialIcon.className = "criteria-icon valid";
        } else {
            specialIcon.textContent = "✗";
            specialIcon.className = "criteria-icon invalid";
        }
        
        // Update strength meter
        strengthMeterFill.style.width = strength + '%';
        
        // Update strength label and color
        if (strength === 0) {
            strengthLabel.textContent = 'Strength: Enter a password';
            strengthMeterFill.style.backgroundColor = '#e1e1e1';
        } else if (strength <= 20) {
            strengthLabel.textContent = 'Strength: Very Weak';
            strengthMeterFill.style.backgroundColor = '#f44336';
            feedbackText = 'Your password is very weak. It needs significant improvement.';
        } else if (strength <= 40) {
            strengthLabel.textContent = 'Strength: Weak';
            strengthMeterFill.style.backgroundColor = '#FF9800';
            feedbackText = 'Your password is weak. Try adding more variety.';
        } else if (strength <= 60) {
            strengthLabel.textContent = 'Strength: Medium';
            strengthMeterFill.style.backgroundColor = '#FFEB3B';
            feedbackText = 'Your password has medium strength. Keep improving!';
        } else if (strength <= 80) {
            strengthLabel.textContent = 'Strength: Strong';
            strengthMeterFill.style.backgroundColor = '#8BC34A';
            feedbackText = 'Your password is strong, but could be better.';
        } else {
            strengthLabel.textContent = 'Strength: Very Strong';
            strengthMeterFill.style.backgroundColor = '#4CAF50';
            feedbackText = 'Excellent! Your password is very strong.';
        }
        
        // Additional feedback based on password content
        let suggestions = [];
        
        if (password.length < 8) {
            suggestions.push('Make your password at least 8 characters long.');
        }
        
        if (!uppercaseRegex.test(password)) {
            suggestions.push('Add uppercase letters (A-Z).');
        }
        
        if (!lowercaseRegex.test(password)) {
            suggestions.push('Add lowercase letters (a-z).');
        }
        
        if (!numberRegex.test(password)) {
            suggestions.push('Add numbers (0-9).');
        }
        
        if (!specialRegex.test(password)) {
            suggestions.push('Add special characters (like !@#$%^&*).');
        }
        
        // Check for common patterns
        if (/^[0-9]+$/.test(password)) {
            suggestions.push('Using only numbers is not secure.');
        }
        
        if (/^[a-zA-Z]+$/.test(password)) {
            suggestions.push('Using only letters is not secure.');
        }
        
        if (/(.)\1{2,}/.test(password)) {
            suggestions.push('Avoid repeating characters (like "aaa" or "111").');
        }
        
        // Update feedback text
        if (password.length === 0) {
            feedback.textContent = '';
        } else {
            let feedbackHTML = `<p>${feedbackText}</p>`;
            
            if (suggestions.length > 0) {
                feedbackHTML += '<p>Suggestions:</p><ul>';
                suggestions.forEach(suggestion => {
                    feedbackHTML += `<li>${suggestion}</li>`;
                });
                feedbackHTML += '</ul>';
            }
            
            feedback.innerHTML = feedbackHTML;
        }
    });
});
