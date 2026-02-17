const loadCategories = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((data) => {
      data.unshift("All");
      displayCategories(data);
    });
};

const loadCategory = (name) => {
  const url = `https://fakestoreapi.com/products/category/${encodeURIComponent(name)}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategoryWiseProducts(data));
};

const displayCategoryWiseProducts = (products) => {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";
  products.forEach((element) => {
    console.log(element);
    const product = document.createElement("div");
    product.innerHTML = `
        <div class="card bg-base-100 shadow">
                    <figure>
                        <img class="h-32" src="${element.image}" alt="T-Shirt" />
                    </figure>
                    <div class="card-body">
                        <div class="flex justify-between items-center">
                            <span class="badge capital badge-primary badge-outline w-fit  bg-blue-100">
                                ${element.category}
                            </span>
                            <span class="text-sm text-warning">
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
                            <button class="btn btn-outline btn-sm">
                                <i class="fa-solid fa-eye mr-1"></i> Details</button>
                            <button class="btn btn-primary btn-sm">
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
    <button  onclick="loadCategory('${category.replace(/'/g, "\\'")}')"
    class="btn capital btn-outline btn-primary rounded-4xl">
         ${category}
        </button>
    `;

    categoryContainer.append(btnDiv);
  }
};

//fakestoreapi.com/products/category/${category}
https: loadCategories();
