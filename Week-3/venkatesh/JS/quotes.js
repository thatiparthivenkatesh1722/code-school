const container = document.getElementById("quotesContainer");
const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");
const navbar = document.getElementById("navbar");
const logoutBtn = document.getElementById("logoutBtn");
const search = document.getElementById("search");

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

logoutBtn.onclick = () => {
  localStorage.removeItem("token");
  window.location.href = "./login.html";
};

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

let allQuotes = [];

fetch("https://dummyjson.com/quotes")
  .then((res) => res.json())
  .then((data) => {
    allQuotes = data.quotes;
    displayQuotes(allQuotes);
  })
  .catch(() => {
    container.innerHTML = "<p class='text-danger'>Error loading quotes</p>";
  });

search.addEventListener("input", () => {
  let value = search.value.toLowerCase();

  let filtered = allQuotes.filter(
    (q) =>
      q.quote.toLowerCase().includes(value) ||
      q.author.toLowerCase().includes(value),
  );

  if (filtered.length === 0) {
    container.innerHTML =
      "<p class='text-center text-muted'>No quotes found</p>";
    return;
  }

  displayQuotes(filtered);
});

function displayQuotes(quotes) {
  container.innerHTML = "";

  quotes.forEach((q) => {
    let col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";

    col.innerHTML = `
      <div class="card bg-success shadow-sm p-3 h-100" onclick="openModal('${q.quote}', '${q.author}')">
        <div class="card-body text-white fw-bold d-flex flex-column justify-content-between">
          
          <p class="fs-6">"${q.quote}"</p>

          <p class="text-end text-dark fw-bold mt-3 mb-0">- ${q.author}</p>

        </div>
      </div>
    `;

    container.appendChild(col);
  });
}
function openModal(quote, author) {
  document.getElementById("modalQuote").innerText = `"${quote}"`;
  document.getElementById("modalAuthor").innerText = `- ${author}`;

  let modal = new bootstrap.Modal(document.getElementById("quoteModal"));
  modal.show();
}
