$(document).ready(function () {
  let token = localStorage.getItem("token");

  if (token) {
    $("#loginBtn").text("Logout");

    $("#loginBtn").click(function () {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Logout successful 🎉",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "login.html";
      });
    });
  } else {
    $("#loginBtn").text("Login");

    $("#loginBtn").click(function () {
      window.location.href = "login.html";
    });
  }

  let apiUrl =
    "https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=4f90da5b80b544f292b26fb73ab0ad94";

  $.ajax({
    url: apiUrl,
    type: "GET",

    success: function (res) {
      console.log("API success");

      let articles = res.articles;

      if (!articles || articles.length === 0) return;

      let first = articles[0];

      let headlineNews = `
        <div class="col-lg-6">
          <img src="${first.urlToImage || "https://via.placeholder.com/600"}" 
               class="img-fluid rounded-4 w-100" 
               style="height:300px; object-fit:cover;">
        </div>

        <div class="col-lg-6 d-flex flex-column justify-content-center">
          <p class="text-muted mb-1">
            ${first.source.name} • ${timeAgo(first.publishedAt)}
          </p>
          <h2 class="fw-bold">${first.title}</h2>
          <p class="text-muted">${first.description || ""}</p>
        </div>
      `;

      $("#News").html(headlineNews);

      let latestNews = "";

      for (let i = 1; i < 7; i++) {
        let article = articles[i];
        if (!article) continue;

        latestNews += `
          <div class="col-md-3">
            <div class="card border-0 shadow-sm h-100">
              <img src="${article.urlToImage || "https://via.placeholder.com/300"}" 
                   class="card-img-top rounded-3" 
                   style="height:180px; object-fit:cover;">
              
              <div class="card-body">
                <p class="text-muted small mb-1">
                  ${article.source.name}  ${timeAgo(article.publishedAt)}
                </p>
                <h6 class="fw-bold">${article.title}</h6>
              </div>
            </div>
          </div>
        `;
      }

      $("#latestNews").html(latestNews);
    },

    error: function (err) {
      console.log("API ERROR ", err);
    },
  });

  function timeAgo(date) {
    let now = new Date();
    let past = new Date(date);
    let diff = Math.floor((now - past) / 1000 / 60);

    if (diff < 60) return diff + " min ago";
    if (diff < 1440) return Math.floor(diff / 60) + " hrs ago";
    return Math.floor(diff / 1440) + " days ago";
  }
});
