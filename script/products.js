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
    categoryContainer.append(btnDiv);
  }
};

//fakestoreapi.com/products/category/${category}
https: loadCategories();
