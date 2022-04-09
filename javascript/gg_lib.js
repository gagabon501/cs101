function addToCart(item_num) {
  let cartItems =
    JSON.parse(localStorage.getItem("cartItems")) === null
      ? []
      : JSON.parse(localStorage.getItem("cartItems"));
  const products = JSON.parse(localStorage.getItem("products"));
  const product = products.filter((p) => parseInt(p.id) == item_num + 1);
  cartItems.push(product[0]);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // localStorage.setItem("cartItems", JSON.stringify(cartItems));
  const cart_qty = JSON.parse(localStorage.getItem("cartItems")).length;
  document.getElementById("total_items").innerHTML = `${cart_qty}`;
  console.log(JSON.parse(localStorage.getItem("cartItems")));
}

function showCart() {
  let cart_qty =
    JSON.parse(localStorage.getItem("cartItems")) === null
      ? 0
      : JSON.parse(localStorage.getItem("cartItems")).length;
  document.getElementById("total_items").innerHTML = `${cart_qty}`;
  console.log(localStorage.getItem("cartItems"));
}

function removeItem(item_num, id) {
  console.log("prod_" + item_num);
  document.getElementById("prod_" + item_num).style.display = "none";
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const cartRemain = cartItems.filter((p) => p.id !== id);
  localStorage.setItem("cartItems", JSON.stringify(cartRemain));
  if (JSON.parse(localStorage.getItem("cartItems")).length === 0)
    document.getElementById("order_summary").style.display = "none";
  showCart();
  totalCost();
}

function viewCart() {
  showCart();
  totalCost();
  if (JSON.parse(localStorage.getItem("cartItems")).length === 0) {
    document.getElementById("order_summary").style.display = "none";
  }
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const products_div = document.getElementById("products");

  products = JSON.parse(localStorage.getItem("cartItems"));
  console.log(products);

  for (i = 0; i < cartItems.length; i++) {
    //create containing div for the product
    div_product = document.createElement("div");
    div_product.className = "product_card";
    div_product.id = "prod_" + i;
    products_div.appendChild(div_product); //add to the DOM

    div_product_container = document.createElement("div");
    div_product_container.className = "prod_container";
    div_product_container.id = "prod_container_" + i;
    document.getElementById("prod_" + i).appendChild(div_product_container); //add to the DOM

    div_product_desc = document.createElement("div");
    div_product_desc.className = "prod_desc";
    div_product_desc.id = "prod_desc_" + i;
    document
      .getElementById("prod_container_" + i)
      .appendChild(div_product_desc); //add to the DOM

    img_container = document.createElement("div");
    img_container.className = "cart_img_container";
    img_container.id = "img_container_" + i;
    document.getElementById(`prod_desc_${i}`).appendChild(img_container);

    // create the product image element
    img = document.createElement("img");
    img.className = "product_image";
    img.src = products[i].image;
    img.id = "product_image_" + i;
    document.getElementById(`img_container_${i}`).appendChild(img);
    // document.getElementById(`prod_desc_${i}`).appendChild(img);
    // create h5
    prod_name = document.createElement("h5");
    prod_name.className = "prod_name";
    prod_name.id = "prod_name_" + i;
    prod_name.innerText = products[i].name;
    document.getElementById(`prod_desc_${i}`).appendChild(prod_name);

    // create div element for the product description
    p_div = document.createElement("div");
    p_div.innerText = products[i].description;
    p_div.className = "prod_desc_cart";
    p_div.id = "prod_desc_cart_" + i;
    document.getElementById(`prod_desc_${i}`).appendChild(p_div);

    vert_strip = document.createElement("div");
    vert_strip.className = "vert_strip";
    vert_strip.id = "vert_strip_" + i;
    document.getElementById("prod_container_" + i).appendChild(vert_strip);

    my_input = document.createElement("div");
    my_input.className = "my_input";
    my_input.id = "my_input_" + i;
    document.getElementById("vert_strip_" + i).appendChild(my_input);

    qty = document.createElement("input");
    qty.className = "qty";
    qty.id = "qty_" + i;
    document.getElementById("my_input_" + i).appendChild(qty);
    qty.setAttribute("type", "text");
    qty.setAttribute("value", "1");

    btn = document.createElement("button");
    btn.className = "close";
    btn.id = "btn_" + i;
    document.getElementById("my_input_" + i).appendChild(btn);
    btn.setAttribute("onclick", `removeItem(${i},${products[i].id})`);
    // button.setAttribute("onclick", `addToCart(${i})`); //way to go! this is the way to add the onclick method on to the button
    icon = document.createElement("i");
    icon.className = "fa-solid fa-circle-minus";
    icon.id = "icon_" + i;
    document.getElementById("btn_" + i).appendChild(icon);

    price = document.createElement("h5");
    price.className = "price_cart";
    price.id = "price_" + i;
    document.getElementById("vert_strip_" + i).appendChild(price);
    price.innerText = "$" + parseInt(products[i].price).toLocaleString("en-US");
  }
}

function selectDelivery(delivery) {
  // console.log(delivery);
  const delvFee = localStorage.setItem("delvFee", delivery === "free" ? 0 : 6);
  document.getElementById("click_collect_value").innerText =
    delivery === "free" ? "FREE" : "$6";
  totalCost();
}

function totalCost() {
  let totalCost = 0;
  // const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  for (i = 0; i < cartItems.length; i++) {
    totalCost += parseInt(cartItems[i].price);
  }
  totalCost += parseInt(localStorage.getItem("delvFee"));
  console.log(totalCost);
  document.getElementById("sub_total_amount").innerText =
    "$" + totalCost.toLocaleString("en-US");
  document.getElementById("total_amount").innerText =
    "$" + totalCost.toLocaleString("en-US");
}

function loadProducts() {
  showCart();
  let arrProduct = [];
  arrProduct.push({
    id: 1,
    name: "iPhone 13",
    description:
      "iPhone 13. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XD display.",
    price: 1429,
    image: "image/iphone-13_best_seller.png",
  });
  arrProduct.push({
    id: 2,
    name: "iPhone 14",
    description:
      "iPhone 14. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XD display.",
    price: 1430,
    image: "image/iphone-13_best_seller.png",
  });
  arrProduct.push({
    id: 3,
    name: "iPhone 15",
    description:
      "iPhone 15. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XD display.",
    price: 1431,
    image: "image/iphone-13_best_seller.png",
  });
  arrProduct.push({
    id: 4,
    name: "iPhone 16",
    description:
      "iPhone 16. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XD display.",
    price: 1432,
    image: "image/iphone-13_best_seller.png",
  });

  arrProduct.push({
    id: 5,
    name: "iPhone 17",
    description:
      "iPhone 17. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XD display.",
    price: 1433,
    image: "image/iphone-13_best_seller.png",
  });

  arrProduct.push({
    id: 6,
    name: "iPhone 18",
    description:
      "iPhone 18. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XD display.",
    price: 1434,
    image: "image/iphone-13_best_seller.png",
  });

  arrProduct.push({
    id: 7,
    name: "iPhone 19",
    description:
      "iPhone 19. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XD display.",
    price: 1435,
    image: "image/iphone-13_best_seller.png",
  });
  arrProduct.push({
    id: 8,
    name: "iPhone 20",
    description:
      "iPhone 20. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XD display.",
    price: 1445,
    image: "image/iphone-13_best_seller.png",
  });

  localStorage.setItem("products", JSON.stringify(arrProduct)); //store product array into the localStorage

  let best_sellers_div = document.getElementById("prod_best_sellers");

  let div_product,
    img,
    product_div,
    products,
    button,
    price_div,
    product_desc_div,
    price;

  products = JSON.parse(localStorage.getItem("products"));

  for (i = 0; i < arrProduct.length; i++) {
    //create containing div for the product
    div_product = document.createElement("div");
    // div_product.className = "product gg_container";
    div_product.className = "product";
    div_product.id = "product_" + i;
    // div_product.innerText = products[i].description;
    best_sellers_div.appendChild(div_product); //add to the DOM
    // main_prod_div.appendChild(div_product); //add to the DOM

    // create the product image element
    img = document.createElement("img");
    // img.className = "product_image";
    img.src = products[i].image;
    img.id = "product_image_" + i;
    product_div = document.getElementById(`product_${i}`);
    // product_div.appendChild(img); //add the image element to the product 'div'

    div_product_img = document.createElement("div");
    div_product_img.className = "img_container";
    div_product_img.id = "img_container_" + i;
    product_div.append(div_product_img);
    document.getElementById(`img_container_${i}`).appendChild(img);

    //create the 'div' for the price
    price_div = document.createElement("div");
    price_div.className = "price";
    price_div.id = "price_" + i;
    price = products[i].price.toFixed(2);

    price_div.innerText = "$" + parseInt(price).toLocaleString("en-US");

    product_div.appendChild(price_div);

    //create the div for the description
    product_name_div = document.createElement("div");
    product_name_div.className = "prod_name";
    product_name_div.id = "prod_name_" + i;
    product_name_div.innerText = products[i].name;
    product_div.appendChild(product_name_div);

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
