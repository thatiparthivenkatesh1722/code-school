$(document).ready(function () {

  let token = localStorage.getItem("token");
  if(token){
    window.location.href = "dashboard.html"
  }

  $("#username, #password").on("input", function () {
        $(this).removeClass("is-invalid");
    });

  $("#loginBtn").click(function () {

    let username = $("#username");
    let password = $("#password");

    let userError = $("#usernameerror");
    let passError = $("#passworderror");

    let isUserValid = validateField(username, userError, 4, 12, "Username");
    let isPassValid = validateField(password, passError, 6, 16, "Password");

    
    if (isUserValid && isPassValid) {
      $("#btnSpinner").removeClass("d-none");

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
          if(token){
              localStorage.setItem("token", token);
              localStorage.setItem("user", JSON.stringify(res))
              alert("Login successful");
              window.location.href = "dashboard.html";
          }
          else{
            alert("token not found")
          }
        },

        error: function (err) {
          console.log("error", err);
          alert("Invalid credentials");
        },

        complete: function () {
          $("#btnText").text("Login");
          $("#btnSpinner").addClass("d-none");
        }
      });
    }
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
  return true;
}