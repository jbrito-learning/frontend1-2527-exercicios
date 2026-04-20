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
        <div class="product-actions">
          <button class="product-edit" data-id="${product.id}">Editar</button>
          <button class="product-delete" data-id="${product.id}">Apagar</button>
        </div>
        </div>
      `;
      productList.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function createProduct(product) {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
        <img class="product-image" src="${data.image}" alt="${data.name}">
        <div class="product-content">
        <div class="product-category">${data.category}</div>
        <h2 class="product-name">${data.name}</h2>
        <p class="product-description">${data.description}</p>
        <div class="product-price">${data.price} €</div>        
        <div class="product-actions">
          <button class="product-edit" data-id="${data.id}">Editar</button>
          <button class="product-delete" data-id="${data.id}">Apagar</button>
        </div>
        </div>
      `;
    document.getElementById("product-list").appendChild(productCard);
    alert("Produto criado com sucesso");
    document.getElementById("create-product-form").reset();
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
}

document
  .getElementById("create-product-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const product = {
      name: document.getElementById("product-name").value,
      price: document.getElementById("product-price").value,
      category: document.getElementById("product-category").value,
      description: document.getElementById("product-description").value,
      image: document.getElementById("product-image").value,
    };
    createProduct(product);
  });

document.getElementById("product-list").addEventListener("click", (event) => {
  if (event.target.classList.contains("product-delete")) {
    deleteProduct(event.target.dataset.id);
    alert("Produto apagado com sucesso");
    getProducts();
  }
  if (event.target.classList.contains("product-edit")) {
    editProduct(event.target.dataset.id);
    alert("Produto editado com sucesso");
    getProducts();
  }
});

async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting product:", error);
    return null;
  }
}

async function editProduct(id) {
  try {
    const product = {
      name: document.getElementById("product-name").value,
      price: document.getElementById("product-price").value,
      category: document.getElementById("product-category").value,
      description: document.getElementById("product-description").value,
      image: document.getElementById("product-image").value,
    };
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error editing product:", error);
    return null;
  }
}

getProducts();
