const container = document.getElementById("authors-container");
const btn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");
const navbar = document.getElementById("navbar");
const logoutBtn = document.getElementById("logoutBtn");

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

const authors = [
  {
    name: "Rumi",
    bio: "Rumi was a 13th-century Persian poet and Sufi mystic known for his deeply spiritual and inspirational poetry about love and the divine.",
    image: "../images/rumi.jpeg",
  },
  {
    name: "Abdul Kalam",
    bio: "A. P. J. Abdul Kalam inspired millions through his quotes that emphasize dreams, hard work, education, and the power of youth to build a better nation.",
    image: "../images/kalam.avif",
  },
  {
    name: "Abu Bakr (R.A)",
    bio: "Abu Bakr (R.A) inspired people through his quotes that emphasize truthfulness, humility, faith in God, and leading a simple and righteous life..",
    image: "../images/Abu.jpeg",
  },
  {
    name: "Bill Gates",
    bio: "Bill Gates is known for quotes that emphasize learning from failure, innovation, hard work, and using technology to improve lives.",
    image: "../images/bill.webp",
  },
  {
    name: "Albert Einstein",
    bio: " Albert Einstein is known for quotes that highlight curiosity, imagination, simplicity, and the importance of questioning and lifelong learning.",
    image: "../images/albert.jpeg",
  },
  {
    name: " Oprah Winfrey",
    bio: "Oprah Winfrey is known for quotes that inspire self-belief, resilience, personal growth, and the power of gratitude and positivity.",
    image: "../images/oprah.png",
  },
];

function displayAuthors(data) {
  container.innerHTML = "";

  data.forEach((author) => {
    let col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4";

    col.innerHTML = `
      <div class="card bg-success text-white h-100 shadow">
        
        <img src="${author.image}" 
             class="author-img"
           ">

        <div class="card-body p-3">
          <h5 class="fw-bold">${author.name}</h5>
          <p>${author.bio}</p>
        </div>

      </div>
    `;

    container.appendChild(col);
  });
}

displayAuthors(authors);
