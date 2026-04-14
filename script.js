const API_URL = "https://69de7ffdd6de26e1192801dd.mockapi.io/";

async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();

    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    data.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <img class="product-image" src="${product.image}" alt="${product.name}">
        <div class="product-content">
        <div class="product-category">${product.category}</div>
        <h2 class="product-name">${product.name}</h2>
        <p class="product-description">${product.description}</p>
        <div class="product-price">${product.price} €</div>
        </div>
      `;
      productList.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

getProducts();
