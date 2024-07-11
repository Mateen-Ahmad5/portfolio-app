
function validateForm(event) {
  event.preventDefault();

  let isValid = true;

  function validateEmail(email) {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  let name = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let nameError = document.getElementById("usernameError");
  let emailError = document.getElementById("emailError");
  let passwordError = document.getElementById("passwordError");
  let Message = document.getElementById("message");

  nameError.innerText = "";
  emailError.innerText = "";
  passwordError.innerText = "";
  Message.innerText = "";

  if (name === "") {
    nameError.innerText = "Name is required";
    nameError.style.display = "block";
    isValid = false;
  }
  if (!validateEmail(email)) {
    emailError.innerText = "Email is required and must be valid.";
    emailError.style.display = "block";
    isValid = false;
  }

  if (password.length < 8) {
    passwordError.innerText = "Password must be at least 8 characters long";
    passwordError.style.display = "block";
    isValid = false;
  }
  if (isValid) {
    Message.innerText = "Registration successful 🙂";
    Message.style.color = "green";
  } else {
    Message.innerText = "Failure! Please enter correct data";
    Message.style.color = "red";
  }
}
