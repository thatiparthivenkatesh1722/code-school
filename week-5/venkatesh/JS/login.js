$(document).ready(function () {
  let token = localStorage.getItem("token");
  if (token && token !== "undefined") {
    window.location.href = "dashboard.html";
  }

  $("#username, #password").on("input", function () {
    $(this).removeClass("is-invalid");
    $(this).addClass("is-valid");
  });

  $("#loginBtn").click(function () {
    let username = $("#username");
    let password = $("#password");

    let userError = $("#usernameerror");
    let passError = $("#passworderror");

    let isUserValid = validateField(username, userError, 4, 20, "Username");
    let isPassValid = validateField(password, passError, 6, 20, "Password");

    if (!isUserValid || !isPassValid) return;

    $("#btnText").text("Logging in...");
    $("#btnSpinner").removeClass("d-none");
    $("#loginBtn").prop("disabled", true);

    $.ajax({
      type: "POST",
      url: "https://dummyjson.com/auth/login",
      contentType: "application/json",

      data: JSON.stringify({
        username: username.val(),
        password: password.val(),
      }),

      success: function (res) {
        console.log("success", res);

        let token = res.accessToken || res.token;

        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(res));

          Swal.fire({
            icon: "success",
            title: "Welcome!",
            text: "Login successful 🎉",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            window.location.href = "dashboard.html";
          });
        } else {
          showError("Login failed. Try again.");
        }
      },

      error: function (err) {
        console.log("error", err);

        let msg = "Invalid username or password";

        if (err.responseJSON && err.responseJSON.message) {
          msg = err.responseJSON.message;
        }

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: msg,
        });
      },

      complete: function () {
        $("#btnText").text("Login");
        $("#btnSpinner").addClass("d-none");
        $("#loginBtn").prop("disabled", false);
      },
    });
  });
});

function validateField(input, errorElement, min, max, fieldName) {
  let value = input.val().trim();

  if (value === "") {
    errorElement.text(fieldName + " is required");
    input.addClass("is-invalid");
    return false;
  }

  if (value.length < min) {
    errorElement.text(`${fieldName} must be at least ${min} characters`);
    input.addClass("is-invalid");
    return false;
  }

  if (value.length > max) {
    errorElement.text(`${fieldName} must not exceed ${max} characters`);
    input.addClass("is-invalid");
    return false;
  }

  errorElement.text("");
  input.removeClass("is-invalid");
  input.addClass("is-valid");

  return true;
}
