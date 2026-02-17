const loadCategories = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((data) => {
      data.unshift("All");
      displayCategories(data);
    });

  loadCategory("All");
};

const removeActive = () => {
  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadCategory = (name) => {
  const url =
    name === "All"
      ? `https://fakestoreapi.com/products`
      : `https://fakestoreapi.com/products/category/${encodeURIComponent(name)}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(
        `category-btn-${name.replace(/'/g, "\\'")}`,
      );
      clickBtn.classList.add("active");
      displayCategoryWiseProducts(data);
    });
};

const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadProductDetail = async (id) => {
  manageSpinner(true);
  const url = `https://fakestoreapi.com/products/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayProductDetails(details);
};

const displayProductDetails = (product) => {
  const detailBox = document.getElementById("details-container");
  detailBox.innerHTML = `
   <div class="">
                    <h2 class="text-2xl font-bold">${product.title}</h2>                   
                </div>
                <div class="">
                    <h2 class="font-bold ">Description</h2>
                    <p class="text-[14px]">${product.description}</p>
                </div>
                <div class="flex justify-between items-center  text-left  whitespace-nowrap ">
                    <span class="text-[14px] ">
                       $${product.price}
                    </span>
                    <span class="text-warning  text-[14px] ">
                        ★${product.rating?.rate} (${product.rating?.count})
                    </span>
                </div>
                <div class="card-actions justify-between">
                    <button onClick="addToCartById(${product.id})" class="btn btn-primary btn-sm">
                        <i class="fa-solid fa-cart-plus mr-1"></i> Add To Card</button>
                  
                </div>`;
  document.getElementById("product_modal").showModal();
  manageSpinner(false);
};

const displayCategoryWiseProducts = (products) => {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";
  products.forEach((element) => {
    const product = document.createElement("div");
    product.innerHTML = `
        <div class="card bg-base-100 shadow">
                    <figure>
                        <img class="h-32" src="${element.image}" alt="T-Shirt" />
                    </figure>
                    <div class="card-body">
                        <div class="flex justify-between items-center  text-left  whitespace-nowrap ">
                            <span class="badge  text-[12px]  capital badge-primary badge-outline w-fit  bg-blue-100">
                                ${element.category}
                            </span>
                            <span class="text-warning  text-[12px] ">
                                ★ ${element.rating?.rate} (${element.rating?.count})
                            </span>
                        </div>
                        <h3 class="font-semibold truncate text-left">
                            ${element.title}
                        </h3>
                        <div class="flex justify-between items-center">
                            <span class="font-bold">$${element.price}</span>
                        </div>
                        <div class="card-actions justify-between">
                            <button  onClick="loadProductDetail(${element.id})" class="btn btn-outline btn-sm">
                                <i class="fa-solid fa-eye mr-1"></i> Details</button>
                            <button onClick="addToCartById(${element.id})" class="btn btn-primary btn-sm">
                                <i class="fa-solid fa-cart-plus mr-1"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
    `;

    productContainer.append(product);
  });
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";

  for (let category of categories) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="category-btn-${category.replace(/'/g, "\\'")}" onclick="loadCategory('${category.replace(/'/g, "\\'")}')"
    class="btn capital btn-outline btn-primary rounded-4xl category-btn">
         ${category}
        </button>
    `;
    //console.log(btnDiv);
    categoryContainer.append(btnDiv);
  }
};

let cart = [];

const openCart = () => {
  renderCart();
  document.getElementById("cart_modal").showModal();
};

const renderCart = () => {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "flex justify-between items-center border p-3 rounded";

    div.innerHTML = `
      <div class="flex items-center gap-3">
        <img src="${item.image}" class="w-14 h-14 object-contain" />
        <div>
          <h4 class="font-semibold text-sm">${item.title}</h4>
          <p class="text-sm">$${item.price}</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button
          class="btn btn-xs"
          onclick="updateQty(${item.id}, -1)">−</button>

        <span class="px-2">${item.quantity}</span>

        <button
          class="btn btn-xs"
          onclick="updateQty(${item.id}, 1)">+</button>

        <button
          class="btn btn-xs btn-error"
          onclick="removeFromCart(${item.id})">
          ✕
        </button>
      </div>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = total.toFixed(2);
};

const updateQty = (id, change) => {
  const item = cart.find((p) => p.id === id);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter((p) => p.id !== id);
  }

  updateCartCount();
  renderCart();
};

const removeFromCart = (id) => {
  cart = cart.filter((item) => item.id !== id);
  updateCartCount();
  renderCart();
};

const updateCartCount = () => {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cart-count");

  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
};

const addToCartById = async (id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();
  addToCart(product);
};

const addToCart = (product) => {
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartCount();
};

//fakestoreapi.com/products/category/${category}
https: loadCategories();
