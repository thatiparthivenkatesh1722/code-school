$(document).ready(function () {

  function toggleSidebar() {
    if ($(window).width() < 768) {
      $("#sidebar").toggleClass("show");
    } else {
      $("#sidebar").toggleClass("hide-sidebar");
      $("#mainContent").toggleClass("full-content");
      $("#navbar").toggleClass("navbar-full");
    }
  }

  window.toggleSidebar = toggleSidebar;

  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "./login.html";
  }



  let user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    $("#username").text(user.firstName + " " + user.lastName);
  }

  $.ajax({
    url: "https://dummyjson.com/posts",
    type: "GET",
    success: function (res) {
      $("#totalPosts").text(res.total);
    },
    error: function () {
      console.log("Failed to load posts");
    }
  });



  $.ajax({
    url: "https://dummyjson.com/users",
    type: "GET",
    success: function (res) {
      $("#totalUsers").text(res.total);
    },
    error: function () {
      console.log("Failed to load users");
    }
  });

});