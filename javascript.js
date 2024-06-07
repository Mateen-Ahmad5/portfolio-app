document.getElementById('validationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
   
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const messageDiv = document.getElementById('message');

    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    messageDiv.style.display = 'none';
    messageDiv.classList.remove('success', 'failure');
    messageDiv.textContent = '';

    let isValid = true;

    if (!username) {
        isValid = false;
        usernameError.textContent = 'Username is required.';
    }
    if (!email) {
        isValid = false;
        emailError.textContent = 'Email is required.';
    }
    if (password.length < 8) {
        isValid = false;
        passwordError.textContent = 'Password must be at least 8 characters long.';
    }
    if (isValid) {
        messageDiv.classList.add('success');
        messageDiv.textContent = 'Registration successful';
    } else {
        messageDiv.classList.add('failure');
        messageDiv.textContent = 'Failure! Please correct the errors and try again.';
    }

    
    messageDiv.style.display = 'block';
});