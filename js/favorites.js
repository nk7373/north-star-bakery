const PRODUCTS = [
  { id: "breads", name: "Breads" },
  { id: "pastries", name: "Pastries" },
  { id: "cakes", name: "Cakes" }
];

function getFavorites() {
  const stored = localStorage.getItem("bakeryFavorites");
  return stored ? JSON.parse(stored) : [];
}

function saveFavorites(favorites) {
  localStorage.setItem("bakeryFavorites", JSON.stringify(favorites));
}

function toggleFavorite(productId) {
  const favorites = getFavorites();
  const index = favorites.indexOf(productId);

  if (index === -1) {
    favorites.push(productId);
  } else {
    favorites.splice(index, 1);
  }

  saveFavorites(favorites);
  renderFavoritesList();
  updateButtonLabels();
}

function renderFavoritesList() {
  const favorites = getFavorites();
  const list = document.getElementById("favorites-list");
  list.innerHTML = "";

  if (favorites.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No favorites yet.";
    list.appendChild(item);
    return;
  }

  favorites.forEach(function (productId) {
    const product = PRODUCTS.find(function (p) {
      return p.id === productId;
    });
    if (!product) {
      return;
    }
    const item = document.createElement("li");
    item.textContent = product.name;
    list.appendChild(item);
  });
}

function updateButtonLabels() {
  const favorites = getFavorites();
  const buttons = document.querySelectorAll(".favorite-btn");

  buttons.forEach(function (button) {
    const productId = button.dataset.product;
    if (favorites.indexOf(productId) === -1) {
      button.textContent = "☆ Save as Favorite";
    } else {
      button.textContent = "★ Saved to Favorites";
    }
  });
}

function setUpFavoriteButtons() {
  const buttons = document.querySelectorAll(".favorite-btn");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      toggleFavorite(button.dataset.product);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderFavoritesList();
  updateButtonLabels();
  setUpFavoriteButtons();
});
