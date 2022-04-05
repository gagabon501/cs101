function addToCart(item_num) {
  console.log(`item ${item_num} added`);
  let cart_qty = parseInt(sessionStorage.getItem("cart_qty"));
  let cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
  let products = JSON.parse(sessionStorage.getItem("products"));
  const product = products.filter((p) => parseInt(p.id) == item_num + 1);
  cartItems.push(product[0]);
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  cart_qty++;
  sessionStorage.setItem("cart_qty", cart_qty);
  document.getElementById("total_items").innerHTML = `${cart_qty}`;
  console.log(JSON.parse(sessionStorage.getItem("cartItems")));
}

function loadProducts() {
  let arrProduct = [];
  let cartItems = [];
  arrProduct.push({
    id: 1,
    description:
      "iPhone 13. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XD display.",
    price: "$1,429.00",
    image: "image/iphone-13-pro-2022-gallery-1 1.png",
  });
  arrProduct.push({
    id: 2,
    description:
      "iPhone 14. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XD display.",
    price: "$1,430.00",
    image: "image/iphone-13-pro-2022-gallery-1 1.png",
  });
  arrProduct.push({
    id: 3,
    description:
      "iPhone 15. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XD display.",
    price: "$1,431.00",
    image: "image/iphone-13-pro-2022-gallery-1 1.png",
  });
  arrProduct.push({
    id: 4,
    description:
      "iPhone 16. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XD display.",
    price: "$1,432.00",
    image: "image/iphone-13-pro-2022-gallery-1 1.png",
  });

  arrProduct.push({
    id: 5,
    description:
      "iPhone 17. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XD display.",
    price: "$1,433.00",
    image: "image/iphone-13-pro-2022-gallery-1 1.png",
  });

  arrProduct.push({
    id: 6,
    description:
      "iPhone 18. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XD display.",
    price: "$1,434.00",
    image: "image/iphone-13-pro-2022-gallery-1 1.png",
  });
  arrProduct.push({
    id: 7,
    description:
      "iPhone 19. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XD display.",
    price: "$1,435.00",
    image: "image/iphone-13-pro-2022-gallery-1 1.png",
  });

  //   arrProduct.push({
  //     id: 8,
  //     description:
  //       "iPhone 20. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XD display.",
  //     price: "$1,445.00",
  //     image: "image/iphone-13-pro-2022-gallery-1 1.png",
  //   });

  //   arrProduct.push({
  //     id: 9,
  //     description:
  //       "iPhone 21. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XD display.",
  //     price: "$1,450.00",
  //     image: "image/iphone-13-pro-2022-gallery-1 1.png",
  //   });

  //   console.log(arrProduct);
  sessionStorage.setItem("products", JSON.stringify(arrProduct)); //store product array into the sessionStorage
  sessionStorage.setItem("cart_qty", 0);
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

  let best_sellers_div = document.getElementById("prod_best_sellers");

  let div_product,
    img,
    product_div,
    products,
    button,
    price_div,
    product_desc_div;

  products = JSON.parse(sessionStorage.getItem("products"));

  for (i = 0; i < arrProduct.length; i++) {
    //create containing div for the product
    div_product = document.createElement("div");
    div_product.className = "product";
    div_product.id = "product_" + i;
    // div_product.innerText = products[i].description;
    best_sellers_div.appendChild(div_product); //add to the DOM

    // create the product image element
    img = document.createElement("img");
    img.className = "product_image";
    img.src = products[i].image;
    img.id = "product_image_" + i;
    product_div = document.getElementById(`product_${i}`);
    product_div.appendChild(img); //add the image element to the product 'div'

    //create the 'div' for the price
    price_div = document.createElement("div");
    price_div.className = "price";
    price_div.id = "price_" + i;
    price_div.innerText = products[i].price;
    product_div.appendChild(price_div);

    //create the div for the description
    product_desc_div = document.createElement("div");
    product_desc_div.className = "product_description";
    product_desc_div.id = "prod_desc_" + i;
    product_desc_div.innerText = products[i].description;
    product_div.appendChild(product_desc_div);

    //create the button for the 'add to cart'
    button = document.createElement("button");
    button.className = "add_cart";
    button.innerText = "Add to Cart";
    button.id = "button_" + i;
    button.setAttribute("onclick", `addToCart(${i})`); //way to go! this is the way to add the onclick method on to the button
    product_div.appendChild(button);
  }
}
