const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `This is not a valid email`);
  }
}

function checkRequired(inputArray) {
  inputArray.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldId(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldId(input)} needs to be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldId(input)} needs to be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

function getFieldId(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

async function sendUserData(userData) {
  try {
    const response = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById("success-message").innerText = 'User registered successfully';
      console.log(userData);
      form.reset();
      document.getElementById("form").reset();
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    alert('An error occurred: ' + error.message);
  }
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  checkRequired([username, email, password]);
  checkLength(username, 3, 10);
  checkLength(password, 6, 30);
  checkEmail(email);

  const formControls = document.querySelectorAll('.form-control');
  const hasError = Array.from(formControls).some(control => control.classList.contains('error'));

  if (!hasError) {
    const userData = {
      name: username.value,
      email: email.value,
      password: password.value,
    };
    await sendUserData(userData);
  }
});