let username = document.getElementById("username"); //username input box id
let password = document.getElementById("password"); //password input box id
let userError = document.getElementById("usernameerror"); // username error  id
let passError = document.getElementById("passworderror"); //password error id
let button = document.getElementById("loginBtn"); //login button id
let btnText = document.getElementById("btnText"); //login button text id
let btnSpinner = document.getElementById("btnSpinner"); //login button spinner id

function validateField(input, errorElement, min, max, fieldName) {
  let value = input.value.trim();

  if (value === "") {
    errorElement.innerText = fieldName + " is required";
    input.classList.add("is-invalid");
    return false;
  }

  if (value.length < min) {
    errorElement.innerText = `${fieldName} must be at least ${min} characters`;
    input.classList.add("is-invalid");
    return false;
  }

  if (value.length > max) {
    errorElement.innerText = `${fieldName} must not exceed ${max} characters`;
    input.classList.add("is-invalid");
    return false;
  }

  errorElement.innerText = "";
  input.classList.remove("is-invalid");
  return true;
}
username.addEventListener("keydown", (q) => {
  if (q.key === "Enter") {
    if (username.value.trim() === "") {
      username.classList.add("is-invalid");
      return false;
    } else username.classList.remove("is-invalid");
    password.focus();
  }
});
password.addEventListener("keydown", (q) => {
  if (q.key === "Enter") {
    if (password.value.trim() === "") {
      password.classList.add("is-invalid");
      return false;
    } else {
      password.classList.remove("is-invalid");
      validateField(password, passError, 6, 16, "Password");
    }
  }
});
button.addEventListener("keydown", (q) => {
  if (q.key === "Enter") {
    validateField(username, userError, 4, 12, "Username");
    validateField(password, passError, 6, 16, "Password");
  }
});

function clearError(input, errorElement) {
  input.addEventListener("input", () => {
    errorElement.innerText = "";
    input.classList.remove("is-invalid");
    input.classList.remove("is-valid");
  });
}

clearError(username, userError);
clearError(password, passError);

button.addEventListener("click", () => {
  let userValid = validateField(username, userError, 4, 12, "Username");
  let passValid = validateField(password, passError, 6, 16, "Password");

  if (!userValid || !passValid) return;
  btnText.style.display = "none";
  btnSpinner.classList.remove("d-none");
  button.disabled = true;

  fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      expiresInMins: 180,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.accessToken) {
        alert("Login Successful");

        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data));

        window.location.href = "dashboard.html";
      } else {
        alert(data.message || "Invalid credentials");
      }
    })
    .catch(() => {
      alert("Something went wrong");
    })
    .finally(() => {
      button.innerHTML = "Login";
      button.disabled = false;
    });
});

let token = localStorage.getItem("token");

if (token) {
  fetch("https://dummyjson.com/auth/me", { // if the token is valid it automatically move to dashboard page 
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = "./dashboard.html";
      } else {
        localStorage.removeItem("token");
      }
    })
    .catch(() => {
      localStorage.removeItem("token");
    });
}
