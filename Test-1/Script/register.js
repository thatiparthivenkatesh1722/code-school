$(document).ready(function () {
  $("#registerForm").submit(function (e) {
    e.preventDefault();

    let isValid = true;

    let firstname = $("#firstname");
    let lastname = $("#lastname");
    let email = $("#email");
    let phone = $("#phone");
    let dob = $("#dob");
    let pan = $("#pan");
    let password = $("#password");

    $("input").removeClass("is-invalid is-valid");
    $(".error").text("");

    if (firstname.val().length < 3) {
      showError(firstname, "Min 3 characters");
      isValid = false;
    } else showSuccess(firstname);

    if (lastname.val().length < 3) {
      showError(lastname, "Min 3 characters");
      isValid = false;
    } else showSuccess(lastname);

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.val())) {
      showError(email, "Invalid email");
      isValid = false;
    } else showSuccess(email);

    let phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(phone.val())) {
      showError(phone, "Invalid Indian number");
      isValid = false;
    } else showSuccess(phone);

    let today = new Date();
    let birthDate = new Date(dob.val());
    let age = today.getFullYear() - birthDate.getFullYear();

    if (age < 18) {
      showError(dob, "You must be at least 18 years old");
      isValid = false;
    } else showError(dob);

    let panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panPattern.test(pan.val())) {
      showError(pan, "Invalid PAN details");
      isValid = false;
    } else showSuccess(pan);

    let passPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passPattern.test(password.val())) {
      showError(password, "Invalid Password check once....");
      isValid = false;
    } else showSuccess(password);

    if (isValid) {
      let userData = {
        firstname: firstname.val(),
        lastname: lastname.val(),
        email: email.val(),
        password: password.val(),
      };

      localStorage.setItem("registeredUser", JSON.stringify(userData));

      Swal.fire({
        icon: "success",
        title: "Registration Successful 🎉",
        text: "Redirecting to login...",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "login.html";
      });

      $("#registerForm")[0].reset();
      $("input").removeClass("is-valid");
    }
  });
});

function showError(input, message) {
  input.addClass("is-invalid");
  input.next(".error").text(message);
}

function showSuccess(input) {
  input.addClass("is-valid");
}
