const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");
const navbar = document.getElementById("navbar");

const logoutBtn = document.getElementById("logoutBtn");
fetch("https://dummyjson.com/quotes")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    document.getElementById("totalQuotes").innerText = data.total;
    let authors = new Set(data.quotes.map((q) => q.author));
    document.getElementById("totalAuthors").innerText = authors.size;

    let recentContainer = document.getElementById("recentQuotes");

    data.quotes.slice(0, 3).forEach((q) => {
      let col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-4";

      col.innerHTML = `
        <div class="card p-3 shadow-sm h-100">
          <p class="text-white fw-bold">"${q.quote}"</p>
          <p class="text-end text-dark fw-bold">- ${q.author}</p>
        </div>
      `;

      recentContainer.appendChild(col);
    });
  });

function sidebartoggle() {
  sidebar.classList.toggle("d-none");

  if (sidebar.classList.contains("d-none")) {
    main.style.marginLeft = "0";
    navbar.style.left = "0";
    navbar.style.width = "100%";
  } else {
    if (window.innerWidth < 992) {
      sidebar.style.width = "100%";
      main.style.marginLeft = "0";
      navbar.style.left = "0";
    } else {
      sidebar.style.width = "280px";
      main.style.marginLeft = "280px";
      navbar.style.left = "280px";
      navbar.style.width = "calc(100% - 280px)";
    }
  }
}
window.onload = function () {
  checkAuth();
};

function checkAuth() {
  let userToken = localStorage.getItem("token");

  if (!userToken) {
    window.location.href = "./login.html";
    return;
  }

  fetch("https://dummyjson.com/auth/me", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.error("Invalid Token");
        window.location.href = "./login.html";
      }
      return res.json();
    })
    .then((data) => {
      console.log("User:", data);
    })
    .catch(() => {
      alert("Error while fetching data");
      window.location.href = "./login.html";
    });
}

logoutBtn.onclick = () => {
  localStorage.removeItem("token");
  window.location.href = "./login.html";
};
