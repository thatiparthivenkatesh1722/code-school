$(document).ready(function () {
 
  let token = localStorage.getItem("token");
  if (token) {
    window.location.href = "home.html";
  }

  $("#loginForm").submit(function (e) {
    e.preventDefault();

    let userInput = $("#userInput").val().trim();
    let password = $("#password").val().trim();

    let userError = $("#userError");
    let passwordError = $("#passwordError");

    userError.html("");
    passwordError.html("");

    let isValid = true;

    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    let usernamePattern = /^[A-Za-z0-9]{4,}$/;

    if (userInput === "") {
      userError.html("Username or Email is required");
      isValid = false;
    } else if (userInput.includes("@")) {
      if (!emailPattern.test(userInput)) {
        userError.html("Enter valid email");
        isValid = false;
      }
    } else {
      if (!usernamePattern.test(userInput)) {
        userError.html("Username must be at least 4 characters");
        isValid = false;
      }
    }

    if (password === "") {
      passwordError.html("Password is required");
      isValid = false;
    }

    if (!isValid) return;

    $.ajax({
      type: "POST",
      url: "https://dummyjson.com/auth/login",
      contentType: "application/json",

      data: JSON.stringify({
        username: userInput,
        password: password,
      }),

      success: function (res) {
        console.log("Login Success:", res);

        if (res.accessToken) {
  
          localStorage.setItem("token", res.accessToken);
          localStorage.setItem("user", JSON.stringify(res));

          Swal.fire({
            icon: "success",
            title: "Welcome!",
            text: "Login successful 🎉",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            window.location.href = "home.html";
          });
        } else {
          alert("Login failed");
        }
      },

      error: function (err) {
        console.log(err);
        alert("Invalid username or password ❌");
      },
    });
  });
});
