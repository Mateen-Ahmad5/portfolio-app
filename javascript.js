function validateForm(event) {
    event.preventDefault(); 

    let isValid = true;
    
    function validateEmail(email) {
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    let name = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let nameError = document.getElementById('usernameError');
    let emailError = document.getElementById('emailError');
    let passwordError = document.getElementById('passwordError');
    let successMessage = document.getElementById('successMessage');
 
    nameError.innerText = '';
    emailError.innerText = '';
    passwordError.innerText = '';
    successMessage.innerText = '';

    if (name === '') {
        nameError.innerText = 'Name is required';
        nameError.style.display = 'block';
        isValid = false;
    }
    if (!validateEmail(email)) {
        emailError.innerText = 'Email is required and must be valid.';
        isValid = false
    }

    if  (password.length < 8) {
        passwordError.innerText = 'Password must be at least 8 characters long';
        passwordError.style.display = 'block';
        isValid = false;
    }
   
    if (isValid) {
        successMessage.innerText = 'Registration successful 🙂';
        
    } else {
        successMessage.innerText = 'Failure! Please enter correct data';
    }
    
    
}

