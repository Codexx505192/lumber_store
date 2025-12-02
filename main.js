// --- МАССИВ ТОВАРОВ ---
const products = [
  {
    id: 1,
    title: "Вагонка из кедра штиль сорт ВС ",
    price: "300 руб.",
    img: "./public/img/item.png",
  },
  {
    id: 2,
    title: "Вагонка из кедра штиль сорт ВС",
    price: "300 руб.",
    img: "./public/img/item.png",
  },
  {
    id: 3,
    title: "Вагонка из кедра штиль сорт ВС ",
    price: "300 руб.",
    img: "./public/img/item.png",
  },
  {
    id: 4,
    title: "Вагонка из кедра штиль сорт ВС ",
    price: "300 руб.",
    img: "./public/img/item.png",
  },
  {
    id: 5,
    title: "Вагонка из кедра штиль сорт ВС ",
    price: "300 руб.",
    img: "./public/img/item.png",
  },
 
];

// --- ЭЛЕМЕНТЫ ---
const productsContainer = document.getElementById("product_containerr");
const favoritesContainer = document.getElementById("favorites-container");
const modal = document.getElementById("favorites-modal");
const openBtn = document.getElementById("open-favorites");
const closeBtn = document.getElementById("close-modal");

// --- ИЗБРАННОЕ ---
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// --- ОТОБРАЖЕНИЕ ТОВАРОВ ---
function renderProducts() {
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const isFavorite = favorites.find((item) => item.id === product.id);
    const card = document.createElement("div");
    card.classList.add("itemg");

    card.innerHTML = `
   
    <div id="prouct_continerr" class="product_container">
        
    <div class="itemg">

        <div class="img_left">
         <div>
          <img src="${product.img}" alt="" class="imgp">
         </div>

          <p class="txt3">
          ${product.title}
          </p>

          <p class="txt4">
          ${product.price}
          </p>
        </div>


        <div class="info_left">

          <p class="txt5">
          ${product.price}
          </p>

          <button  class="btn2 ${isFavorite ? "active" : ""}" onclick="toggleFavorite(${product.id})">
          ${isFavorite ? "💖" : "🤍"} 
            В Избранное
          </button>
        </div>
      </div>
      </div>

    `;
    productsContainer.appendChild(card);
  });
}

// --- ПЕРЕКЛЮЧЕНИЕ ИЗБРАННОГО ---
function toggleFavorite(id) {
  const product = products.find((p) => p.id === id);
  const index = favorites.findIndex((item) => item.id === id);

  if (index === -1) {
    favorites.push(product);
  } else {
    favorites.splice(index, 1);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderProducts();
  renderFavorites();
}

// Делаем функцию доступной для onclick в HTML
window.toggleFavorite = toggleFavorite;


// --- ОТОБРАЖЕНИЕ ИЗБРАННОГО В МОДАЛКЕ ---
function renderFavorites() {
  favoritesContainer.innerHTML = "";

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = "<p>Избранное пусто</p>";
    return;
  }

  favorites.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("favorite-item");
    card.innerHTML = `

    <div class="lftr">

    <img src="${item.img}" alt="${item.title}" class="fav-img">
    <h4 class="txt6">${item.title}</h4>
    </div>
    
    <div class="bll">
    <p class="txt7">${item.price}</p>
           </div>
    `;
    favoritesContainer.appendChild(card);
  });
}

// --- МОДАЛЬНОЕ ОКНО ---
openBtn.onclick = () => {
  renderFavorites();
  modal.style.display = "flex";
};

closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

// --- АККОРДЕОН ---
const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const content = item.querySelector(".accordion-content");
    const isOpen = item.classList.contains("active");

    document.querySelectorAll(".accordion-item").forEach((i) => {
      i.classList.remove("active");
      i.querySelector(".accordion-content").style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// --- ЗАПУСК ---
renderProducts();
