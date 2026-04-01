$(document).ready(function () {

    $(document).on("click", ".tweet", function () {
    let userId = $(this).data("user");
    let body = $(this).data("body");
    let tags = $(this).data("tags");
    let likes = $(this).data("likes");
    let views = $(this).data("views");

    
    $("#modalUserImg").attr("src", `https://i.pravatar.cc/50?img=${userId}`);
    $("#modalUserName").text(`User ${userId}`);
    $("#modalPostBody").text(body);

    let tagHtml = "";
    $.each(tags, function(i, tag){
        tagHtml += `<span class="tag">#${tag}</span> `;
    });

    $("#modalTags").html(tagHtml);
    $("#modalLikes").text(`❤️ ${likes}`);
    $("#modalViews").text(`👁️ ${views}`);

    
    let modal = new bootstrap.Modal($('#postModal'));
    modal.show();
    });
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

  if (!token || token === "undefined") {
    window.location.href = "login.html";
  }



  $.ajax({
    url: "https://dummyjson.com/posts",
    type: "GET",

    success: function (res) {

      let posts = res.posts;

      $.each(posts, function (index, post) {

        let tags = "", postHtml="";

        $.each(post.tags, function (i, tag) {
          tags += `<span class="tag">#${tag}</span> `;
        });

        postHtml=`
          <div class="tweet"
            data-id="${post.id}"
            data-user="${post.userId}"
            data-body="${post.body}"
            data-tags='${JSON.stringify(post.tags)}'
            data-likes="${post.reactions.likes}"
            data-views="${post.views}">
            
            <img src="https://i.pravatar.cc/45?img=${post.userId}"/>

            <div class="content">
              <div class="fw-bold">User ${post.userId}</div>

              <p class="mb-1">${post.body}</p>

              <div>${tags}</div>

              <div class="actions mt-2 d-flex justify-content-between align-items-center gap-2">
                <span class="d-flex justify-content-center align-items-center gap-2">❤️ ${post.reactions.likes}</span>
                <span class="d-flex justify-content-center align-items-center gap-2"><i class="bi bi-eye text-dark fs-4"></i> ${post.views}</span>
              </div>
            </div>

          </div>
        `;
        $("#feed").append(postHtml)

      });

    },

    error: function () {
      console.log("Failed to load posts");
    }

  });

});