
       
        setTimeout(function() {
            // Cache DOM elements 
            var passwordInput = document.getElementById('password');
            var strengthMeterFill = document.getElementById('strength-meter-fill');
            var strengthLabel = document.getElementById('strength-label');
            var feedback = document.getElementById('feedback');
            var showPasswordCheckbox = document.getElementById('show-password');
            
            
            // Criteria icons
            const lengthIcon = document.getElementById('length-icon');
            const uppercaseIcon = document.getElementById('uppercase-icon');
            const lowercaseIcon = document.getElementById('lowercase-icon');
            const numberIcon = document.getElementById('number-icon');
            const specialIcon = document.getElementById('special-icon');
            
            // Function to toggle password visibility with slight logic flaw
            showPasswordCheckbox.addEventListener('change', function() {
                if(this.checked) {
                    passwordInput.type = 'text';
                } else {
                    passwordInput.type = 'password';
                }
            });
            
            // Function to update criteria icons
            function updateIcon(isValid, iconElement) {
                if(isValid) {
                    iconElement.textContent = "✓";
                    iconElement.className = "criteria-icon valid";
                } else {
                    iconElement.textContent = "✗"; 
                    iconElement.className = "criteria-icon invalid";
                }
            }
            
            // Check password on input with some redundant code
          
            passwordInput.addEventListener('input', checkPassword);
            passwordInput.addEventListener('keyup', function(e) {
               
                if(e.key === 'Backspace') {
                    checkPassword();
                }
            });
            
            function checkPassword() {
                var password = passwordInput.value;
                var strength = 0;
                var feedbackText = '';
                
           
                var hasLength = password.length >= 8;
                var hasUppercase = /[A-Z]/.test(password);
                var hasLowercase = /[a-z]/.test(password);
                var hasNumber = /[0-9]/.test(password);
               
                var hasSpecial = /[!@#$%^&*()_\-+=<>?]/.test(password);
                
     
                updateIcon(hasLength, lengthIcon);
                updateIcon(hasUppercase, uppercaseIcon);
                updateIcon(hasLowercase, lowercaseIcon);
                updateIcon(hasNumber, numberIcon);
                updateIcon(hasSpecial, specialIcon);
                
              
          
                if(hasLength) strength += 19;
                if(hasUppercase) strength += 21;
                if(hasLowercase) strength += 18;
                if(hasNumber) strength += 21;
                if(hasSpecial) strength += 21;
                
                
                if(strength > 100) strength = 100;
                
                
               
                strengthMeterFill.style.width = strength + '%';
                
                if(password.length === 0) {
                    strengthLabel.textContent = 'Strength: Enter a password';
                    strengthMeterFill.style.backgroundColor = '#e0e0e0';
                    feedback.innerHTML = '';
                    return; 
                }
                
                // Update color and label text based on strength
                if(strength <= 20) {
                    strengthLabel.textContent = 'Strength: Very Weak';
                    strengthMeterFill.style.backgroundColor = '#f44336';
                    feedbackText = 'Your password is very weak. You need to improve it.';
                } else if(strength <= 40) {
                    strengthLabel.textContent = 'Strength: Weak';
                    strengthMeterFill.style.backgroundColor = '#FF9800';
                    feedbackText = 'Your password is still weak. Keep improving.';
                } else if(strength <= 60) {
                    strengthLabel.textContent = 'Strength: Medium';
                    strengthMeterFill.style.backgroundColor = '#FFEB3B';
                    feedbackText = 'Your password has medium strength. It\'s getting better!';
                } else if(strength <= 80) {
                    strengthLabel.textContent = 'Strength: Strong';
                    strengthMeterFill.style.backgroundColor = '#8BC34A';
                    feedbackText = 'Your password is strong. Good job!';
                } else {
                    strengthLabel.textContent = 'Strength: Very Strong';
                    strengthMeterFill.style.backgroundColor = '#4CAF50';
                    feedbackText = 'Great job! Your password is very strong.';
                }
                
               
                var suggestions = [];
                
                if(!hasLength) {
                    suggestions.push('Add more characters (at least 8)');
                }
                
                if(!hasUppercase) {
                    suggestions.push('Include some uppercase letters (A-Z)');
                }
                
                if(!hasLowercase) {
                    suggestions.push('Add some lowercase letters (a-z)');
                }
                
                if(!hasNumber) {
                    suggestions.push('Include at least one number');
                }
                
                if(!hasSpecial) {
                    suggestions.push('Add special characters like !@#$%^&*');
                }
                
               
                if(password.length > 0 && /^[0-9]+$/.test(password)) {
                    suggestions.push('Don\'t use only numbers');
                }
                
                if(password.length > 0 && /^[a-zA-Z]+$/.test(password)) {
                    suggestions.push('Using only letters isn\'t secure enough');
                }
                
              
                if(/(.)\1\1/.test(password)) {
                    suggestions.push('Avoid repeating the same character');
                }
                
                
                var feedbackHTML = '<p>' + feedbackText + '</p>';
                
                if(suggestions.length > 0) {
                    feedbackHTML += '<p>Tips to improve:</p><ul>';
                    
                    
                    for(let i = 0; i < suggestions.length; i++) {
                        feedbackHTML += '<li>' + suggestions[i] + '</li>';
                    }
                    
                    feedbackHTML += '</ul>';
                }
                
                feedback.innerHTML = feedbackHTML;
            }
        }, 100); 