function addToCart(item_num) {
  let cartItems =
    JSON.parse(localStorage.getItem("cartItems")) === null
      ? []
      : JSON.parse(localStorage.getItem("cartItems"));
  const products = JSON.parse(localStorage.getItem("products"));
  let product = products.filter((p) => parseInt(p.id) == item_num + 1);
  product[0].qty = 1; //update the qty
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

function inputHandler(e) {
  const id = e.path[0].id;
  const index = parseInt(id.substr(4, 1));
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  cartItems[index].qty = e.target.value;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  totalCost();
}

function setProtect(index, fee) {
  // // console.log(e);
  // // const id = e.target.id;
  // console.log(id);
  // const index = parseInt(id.substr(4, 1));
  console.log(index);
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  cartItems[index].protect_fee = fee;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
    div_product.className = "gg_card";
    div_product.id = "prod_" + i;
    products_div.appendChild(div_product); //add to the DOM

    div_product_container = document.createElement("div");
    div_product_container.className = "prod_container";
    div_product_container.id = "prod_container_" + i;
    document.getElementById("prod_" + i).appendChild(div_product_container); //add to the DOM

    // create the product image element
    img = document.createElement("img");
    img.setAttribute("align", "left");
    img.className = "product_image_cart";
    img.src = products[i].image;
    img.id = "product_image_" + i;
    document.getElementById(`prod_container_${i}`).appendChild(img);

    // create h5
    prod_name = document.createElement("h5");
    prod_name.className = "prod_name";
    prod_name.id = "prod_name_" + i;
    prod_name.innerText = products[i].name;
    document.getElementById(`prod_container_${i}`).appendChild(prod_name);

    // create div element for the product description
    p_div = document.createElement("p");
    p_div.innerText = products[i].description;
    p_div.id = "prod_desc_cart_" + i;
    document.getElementById(`prod_container_${i}`).appendChild(p_div);

    protect_div = document.createElement("div");
    protect_div.className = "protect";
    protect_div.id = "protect_" + i;
    document.getElementById(`prod_container_${i}`).appendChild(protect_div);

    p_protect = document.createElement("p");
    p_protect.id = "p_protect_" + i;
    p_protect.className = "p_protect";
    p_protect.innerText = "Protect your product:";
    document.getElementById(`protect_${i}`).appendChild(p_protect);

    protect_form = document.createElement("form");
    protect_form.id = "protect_form_" + i;
    protect_form.className = "protect_form";
    document.getElementById(`protect_${i}`).appendChild(protect_form);

    // 3-year protection
    protect_radio_3 = document.createElement("input");
    protect_radio_3.id = "yr3_" + i;
    protect_radio_3.className = "protect_radio";
    protect_radio_3.setAttribute("name", "protect_" + i);
    protect_radio_3.setAttribute("value", "330");
    protect_radio_3.setAttribute("type", "radio");
    protect_radio_3.setAttribute("onclick", `setProtect(${i},330)`);
    // protect_radio_3.addEventListener("click", (e) => setProtect(e));
    //  qty.addEventListener("change", (e) => inputHandler(e));
    document.getElementById(`protect_form_${i}`).appendChild(protect_radio_3);

    protect_radio_3_label = document.createElement("label");
    protect_radio_3_label.id = "protect_radio_3_label_" + i;
    protect_radio_3_label.className = "protect_radio_label";
    protect_radio_3_label.setAttribute("for", `yr3_${i}`);
    protect_radio_3_label.innerText = "3 year protection - $330.00";
    document
      .getElementById(`protect_form_${i}`)
      .appendChild(protect_radio_3_label);

    protect_br = document.createElement("br");
    document.getElementById(`protect_form_${i}`).appendChild(protect_br);
    // 3-year end

    // 2-year protection
    protect_radio_2 = document.createElement("input");
    protect_radio_2.id = "yr2_" + i;
    protect_radio_2.className = "protect_radio";
    protect_radio_2.setAttribute("name", "protect_" + i);
    protect_radio_2.setAttribute("value", "250");
    protect_radio_2.setAttribute("type", "radio");
    protect_radio_2.setAttribute("onclick", `setProtect(${i},250)`);

    document.getElementById(`protect_form_${i}`).appendChild(protect_radio_2);

    protect_radio_2_label = document.createElement("label");
    protect_radio_2_label.id = "protect_radio_2_label_" + i;
    protect_radio_2_label.className = "protect_radio_label";
    protect_radio_2_label.setAttribute("for", `yr2_${i}`);
    protect_radio_2_label.innerText = "2 year protection - $250.00";
    document
      .getElementById(`protect_form_${i}`)
      .appendChild(protect_radio_2_label);

    protect_br = document.createElement("br");
    document.getElementById(`protect_form_${i}`).appendChild(protect_br);
    // 2-year end

    // 1-year protection
    protect_radio_1 = document.createElement("input");
    protect_radio_1.id = "yr1_" + i;
    protect_radio_1.className = "protect_radio";
    protect_radio_1.setAttribute("name", "protect_" + i);
    protect_radio_1.setAttribute("value", "150");
    protect_radio_1.setAttribute("type", "radio");
    protect_radio_1.setAttribute("onclick", `setProtect(${i},150)`);

    document.getElementById(`protect_form_${i}`).appendChild(protect_radio_1);

    protect_radio_1_label = document.createElement("label");
    protect_radio_1_label.id = "protect_radio_1_label_" + i;
    protect_radio_1_label.className = "protect_radio_label";
    protect_radio_1_label.setAttribute("for", `yr1_${i}`);
    protect_radio_1_label.innerText = "1 year protection - $150.00";
    document
      .getElementById(`protect_form_${i}`)
      .appendChild(protect_radio_1_label);

    protect_br = document.createElement("br");
    document.getElementById(`protect_form_${i}`).appendChild(protect_br);
    // 1-year end

    // no protection
    protect_radio_0 = document.createElement("input");
    protect_radio_0.id = "yr0_" + i;
    protect_radio_0.className = "protect_radio";
    protect_radio_0.setAttribute("name", "protect_" + i);
    protect_radio_0.setAttribute("value", "0");
    protect_radio_0.setAttribute("type", "radio");
    protect_radio_0.setAttribute("checked", "true");
    protect_radio_0.setAttribute("onclick", `setProtect(${i},0)`);

    document.getElementById(`protect_form_${i}`).appendChild(protect_radio_0);

    protect_radio_0_label = document.createElement("label");
    protect_radio_0_label.id = "protect_radio_0_label_" + i;
    protect_radio_0_label.className = "protect_radio_label";
    protect_radio_0_label.setAttribute("for", `yr0_${i}`);

    protect_radio_0_label.innerText = "No thanks";
    document
      .getElementById(`protect_form_${i}`)
      .appendChild(protect_radio_0_label);

    protect_br = document.createElement("br");
    document.getElementById(`protect_form_${i}`).appendChild(protect_br);
    // no protection end

    vert_strip = document.createElement("div");
    vert_strip.className = "vert_strip";
    vert_strip.id = "vert_strip_" + i;
    // document.getElementById(`prod_container_${i}`).appendChild(vert_strip);
    document.getElementById("prod_" + i).appendChild(vert_strip); //add to the DOM

    my_input = document.createElement("div");
    my_input.className = "my_input";
    my_input.id = "my_input_" + i;
    document.getElementById("vert_strip_" + i).appendChild(my_input);

    qty = document.createElement("input");
    qty.className = "qty";
    qty.id = "qty_" + i;
    // document.getElementById("my_input_" + i).appendChild(qty);
    document.getElementById(`vert_strip_${i}`).appendChild(qty);

    qty.setAttribute("type", "text");
    qty.setAttribute("value", products[i].qty);

    qty.addEventListener("change", (e) => inputHandler(e));
    div_button = document.createElement("div");
    div_button.id = "div_button_" + i;
    div_button.className = "close";
    document.getElementById(`prod_` + i).appendChild(div_button);

    btn = document.createElement("button");
    btn.className = "close_button";
    btn.id = "btn_" + i;
    // document.getElementById("my_input_" + i).appendChild(btn);
    document.getElementById("div_button_" + i).appendChild(btn);
    btn.setAttribute("onclick", `removeItem(${i},${products[i].id})`);
    icon = document.createElement("i");
    icon.className = "fa-solid fa-trash-can fa-2x";
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
  localStorage.setItem("delvFee", delivery === "free" ? 0 : 6);
  document.getElementById("click_collect_value").innerText =
    delivery === "free" ? "FREE" : "$6";
  totalCost();
}

function totalCost() {
  let totalCost = 0;
  let subTotal = 0;
  let delvFee =
    localStorage.getItem("delvFee") === null
      ? 0
      : parseInt(localStorage.getItem("delvFee"));

  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  for (i = 0; i < cartItems.length; i++) {
    totalCost +=
      parseInt(cartItems[i].price) * parseInt(cartItems[i].qty) +
      parseInt(cartItems[i].protect_fee);
  }
  subTotal = totalCost;
  totalCost += delvFee;

  document.getElementById("sub_total_amount").innerText =
    "$" + subTotal.toLocaleString("en-US");
  document.getElementById("total_amount").innerText =
    "$" + totalCost.toLocaleString("en-US");
  if (delvFee === 0) {
    document.getElementById("click_collect").setAttribute("checked", "checked");
    document.getElementById("click_collect_value").innerText = "FREE";
  } else {
    document.getElementById("std_deliver").setAttribute("checked", "checked");
    document.getElementById("click_collect_value").innerText = "$6";
  }
}

// Load products dynamically
function loadProducts() {
  showCart(); //shows how many items in the cart - updates the cart info in the navbar

  // Create the product object array. The image value is the actual location of the image file
  let arrProduct = [];

  arrProduct.push({
    id: 1,
    name: "iPhone 13",
    description:
      "iPhone 13. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XD display.",
    price: 1429,
    image: "image/iphone13.png",
    qty: 0,
    protect_fee: 0,
  });

  arrProduct.push({
    id: 2,
    name: "Huawei Y6p (Midnight Black)",
    description:
      "The 6.3inch Dewdrop Display4 with an 88.4% screen-to-body ratio provides a wide and immersive visual experience5. With a diameter of 2.65 mm, the tiny and discreet front camera with a narrow frame achieves more room to showcase the exciting game graphics and fantastic images with less interruptions.",
    price: 129,
    image: "image/huawuei_phone.png",
    qty: 0,
    protect_fee: 0,
  });

  arrProduct.push({
    id: 3,
    name: "OPPO Find X5 Lite 5G 256GB (Starry Black)",
    description:
      "Portrait Retouching AI has 193 control points that will identify your features so you can spotlight your natural charms. With 8 adjustable retouching options for the front camera, you???ll always be ready for the big screen. 64MP Rear Camera, 32MP Front Camera, 118?? Ultra Wide-Angle Camera, 4cm Maco Camera",
    price: 899,
    image: "image/oppo_phone.png",
    qty: 0,
    protect_fee: 0,
  });

  arrProduct.push({
    id: 4,
    name: "GoPro Hero9 Black",
    description:
      "5K Video Shoot stunning video with up to 5K resolution, perfect for maintaining serious detail even when zooming in. Packing a new 23.6MP sensor that is an absolute powerhouse, HERO9 Black brings lifelike image sharpness, fluid motion and in-camera horizon leveling that always impresses. 20MP Photo with SuperPhoto Capture crisp, pro-quality photos with 20MP clarity.",
    price: 699,
    image: "image/go_pro_camera.png",
    qty: 0,
    protect_fee: 0,
  });

  arrProduct.push({
    id: 5,
    name: "Asus X515EA-BQ1189W 15.6in i5 256GB Laptop",
    description:
      "15.6-inch Full HD (1920 x 1080) display, Intel Core i5-1135G7 quad core processor (8MB cache, 2.4GHz up to 4.2 GHz), 8GB RAM, 256GB SSD, Intel UHD graphics, 1 x HDMI port, 1 x USB-C port, 1 x USB-A 3.1 port, 2 x USB-A 2.0 ports, VGA Camera, Bluetooth v4.1, Wi-Fi 5 (802.11ac), 37WHrs, 2-cell battery, Windows 11 Home",
    price: 1433,
    image: "image/asus_laptop.png",
    qty: 0,
    protect_fee: 0,
  });

  arrProduct.push({
    id: 6,
    name: "Zero-X Evo 4K Photo & Full HD Video Drone",
    description:
      "4K Photo, 1080p Full HD Video & Automatic GimbalExperience 4K Photo and 1080p Full High-Definition crystal clear video recording. Direct the action from your remote control by adjusting the camera up and down using the Automatic Gimbal. WIFI FPV Mode Fly with Evo 4K's point of view using your iOS or Android Smartphone or compatible VR Headset. Foldable design Take your drone and remote anywhere with its compact and foldable design.",
    price: 349,
    image: "image/drone.png",
    qty: 0,
    protect_fee: 0,
  });

  arrProduct.push({
    id: 7,
    name: "Sony CH510 Wireless On-Ear Headphones (Black)",
    description:
      "The WH-CH510 is a compact wireless headphone designed for everyday use. The soft ear-pads, adjustable headband and swivel design make this headphone ideal for commuting and everyday music enjoyment. A long battery-life, music playback controls and support for hands-free calls also make this headphone a great smartphone companion.",
    price: 79,
    image: "image/sony_headphone.png",
    qty: 0,
    protect_fee: 0,
  });

  arrProduct.push({
    id: 8,
    name: "Samsung AU7000 55in. 4K UHD Smart TV [2021]",
    description:
      "PurColour - Fine tuned colour for a vibrant, lifelike picture.PurColour makes watching films feel almost like you're there. It enables the TV to express a huge range of colours for optimal picture performance, and an immersive viewing experience. Crystal Processor 4K - Lifelike shades of colour in powerful 4K Powerful 4K upscaling ensures you get up to 4K resolution for the content you love.",
    price: 1096,
    image: "image/samsung_hd_50.png",
    qty: 0,
    protect_fee: 0,
  });

  //store product object array into the localStorage - used localStorage as some sort of database for the products
  localStorage.setItem("products", JSON.stringify(arrProduct));

  // the main 'div' for the 'best sellers' section
  let best_sellers_div = document.getElementById("prod_best_sellers");

  let div_product,
    img,
    product_div,
    products,
    button,
    price_div,
    product_desc_div,
    price;

  // retrieve the products stored in the localStorage - parse the object to get an array of products using JSON.parse()
  products = JSON.parse(localStorage.getItem("products"));

  // This is where the magic begins - loop through the product array and dynamically attach the elements into the DOM

  for (i = 0; i < products.length; i++) {
    //create containing div for the product
    div_product = document.createElement("div");
    div_product.className = "product";
    div_product.id = "product_" + i;
    best_sellers_div.appendChild(div_product); //add to the DOM

    // main 'div' to contain all the product info i.e. image, price, name, and description
    product_div = document.getElementById(`product_${i}`);

    // create the div for the image container - have to use a 'div' with a class 'image_container' to have better control at the sizing of the image without skewing or lossing quality of the image
    div_product_img = document.createElement("div");
    div_product_img.className = "img_container";
    div_product_img.id = "img_container_" + i;

    // create the product image element
    img = document.createElement("img");
    img.className = "product_image";
    img.src = products[i].image;
    img.id = "product_image_" + i;
    product_div.append(div_product_img);

    // attach image to its containing 'div'
    document.getElementById(`img_container_${i}`).appendChild(img);

    //create the 'div' for the price
    price_div = document.createElement("div");
    price_div.className = "price";
    price_div.id = "price_" + i;
    price = products[i].price.toFixed(2);

    // toLocaleString() is used to put comma separator
    price_div.innerText = "$" + parseInt(price).toLocaleString("en-US");

    product_div.appendChild(price_div); //attach to the main 'div' for the product

    //create the div for the product name
    product_name_div = document.createElement("div");
    product_name_div.className = "prod_name";
    product_name_div.id = "prod_name_" + i;
    product_name_div.innerText = products[i].name;

    product_div.appendChild(product_name_div); //attach to the main 'div' for the product

    //create the div for the description
    product_desc_div = document.createElement("div");
    product_desc_div.className = "product_description";
    product_desc_div.id = "prod_desc_" + i;
    product_desc_div.innerText = products[i].description;

    product_div.appendChild(product_desc_div); //attach to the main 'div' for the product

    //create the button for the 'add to cart'
    button = document.createElement("button");
    button.className = "add_cart";
    button.innerText = "Add to Cart";
    button.id = "button_" + i;
    button.setAttribute("onclick", `addToCart(${i})`); //way to go! this is the way to add the onclick method on to the button - used template string here to pass parameters dynamically

    product_div.appendChild(button); //attach to the main 'div' for the product
  }
}
